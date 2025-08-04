-- This script combines all necessary SQL for a complete Supabase setup,
-- including schema creation, RLS, and any necessary functions.

-- Create the `public` schema if it doesn't exist (usually exists by default)
-- CREATE SCHEMA public;

-- Enable the `uuid-ossp` extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable the `vector` extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create `profiles` table for user profiles
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    CONSTRAINT username_length CHECK (LENGTH(username) >= 3)
);

-- Set up Row Level Security (RLS) for `profiles` table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create `health_specialists` table
CREATE TABLE public.health_specialists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    contact_email TEXT,
    phone_number TEXT,
    description TEXT,
    embedding VECTOR(1536) -- Assuming OpenAI's text-embedding-ada-002 dimension
);

-- Create `schools` table
CREATE TABLE public.schools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    education_level TEXT NOT NULL, -- e.g., 'Primary', 'Secondary', 'Special Needs'
    contact_email TEXT,
    phone_number TEXT,
    description TEXT,
    embedding VECTOR(1536)
);

-- Create `outdoor_clubs` table
CREATE TABLE public.outdoor_clubs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- e.g., 'Hiking', 'Camping', 'Nature Walks'
    location TEXT NOT NULL,
    contact_email TEXT,
    phone_number TEXT,
    description TEXT,
    embedding VECTOR(1536)
);

-- Create `user_preferences` table
CREATE TABLE public.user_preferences (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    preferred_specialties TEXT[],
    preferred_locations TEXT[],
    notification_settings JSONB DEFAULT '{}'::jsonb
);

-- Create `search_history` table
CREATE TABLE public.search_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    query TEXT NOT NULL,
    search_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    results_count INT
);

-- Create `favorites` table
CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    resource_id UUID NOT NULL,
    resource_type TEXT NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, resource_id, resource_type)
);

-- Create a function for vector similarity search
CREATE OR REPLACE FUNCTION public.match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  _table text,
  _column text
)
RETURNS TABLE (
  id uuid,
  name text,
  location text,
  specialty text, -- For health_specialists
  education_level text, -- For schools
  activity_type text, -- For outdoor_clubs
  contact_email text,
  phone_number text,
  description text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY EXECUTE format('
    SELECT
      id,
      name,
      location,
      %s, -- This will be specialty, education_level, or activity_type
      contact_email,
      phone_number,
      description,
      1 - (embedding <=> $1) AS similarity
    FROM
      public.%I
    WHERE
      1 - (embedding <=> $1) > $2
    ORDER BY
      similarity DESC
    LIMIT $3',
    CASE _table
      WHEN 'health_specialists' THEN 'specialty'
      WHEN 'schools' THEN 'education_level'
      WHEN 'outdoor_clubs' THEN 'activity_type'
      ELSE 'NULL' -- Fallback if table name doesn't match
    END,
    _table
  )
  USING query_embedding, match_threshold, match_count;
END;
$$;

-- Set up trigger for new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Set up trigger for updating user profiles
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET
    full_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- Optional: Create a function to generate embeddings (if done directly in DB)
-- This would typically call an external AI service via a Supabase Edge Function
-- For demonstration, this is a placeholder.
CREATE OR REPLACE FUNCTION public.generate_embedding(text_input TEXT)
RETURNS VECTOR(1536)
LANGUAGE plpgsql
AS $$
DECLARE
  embedding_result VECTOR(1536);
BEGIN
  -- In a real scenario, this would call an external AI service (e.g., OpenAI)
  -- via a Supabase Edge Function or a custom API.
  -- For now, return a dummy embedding or raise an error if not implemented.
  RAISE EXCEPTION 'Embedding generation function not implemented yet. Use external script.';
  -- SELECT ARRAY(SELECT random() FROM generate_series(1, 1536))::VECTOR(1536) INTO embedding_result;
  -- RETURN embedding_result;
END;
$$;
