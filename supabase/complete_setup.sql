-- This script combines all necessary SQL commands for a complete Supabase setup.
-- It includes creating extensions, tables, and RLS policies.

-- Enable pg_vector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the 'users' table
CREATE TABLE public.users (
    id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email text UNIQUE NOT NULL,
    user_type text DEFAULT 'user'
);

-- Set up Row Level Security (RLS) for 'users' table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow authenticated update access" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow authenticated delete access" ON public.users FOR DELETE USING (auth.uid() = id);

-- Create the 'health_specialists' table
CREATE TABLE public.health_specialists (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    specialty text,
    location text,
    services text[],
    bio text,
    contact_email text,
    contact_phone text,
    vector_embedding vector(1536), -- For OpenAI's text-embedding-ada-002
    created_at timestamp with time zone DEFAULT now()
);

-- Set up RLS for 'health_specialists' table
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Health specialists are viewable by everyone." ON public.health_specialists FOR SELECT USING (true);
CREATE POLICY "Users can insert their own health specialists." ON public.health_specialists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own health specialists." ON public.health_specialists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own health specialists." ON public.health_specialists FOR DELETE USING (auth.uid() = user_id);

-- Create the 'schools' table
CREATE TABLE public.schools (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    location text,
    programs text[],
    description text,
    contact_email text,
    contact_phone text,
    vector_embedding vector(1536),
    created_at timestamp with time zone DEFAULT now()
);

-- Set up RLS for 'schools' table
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schools are viewable by everyone." ON public.schools FOR SELECT USING (true);
CREATE POLICY "Users can insert their own schools." ON public.schools FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own schools." ON public.schools FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own schools." ON public.schools FOR DELETE USING (auth.uid() = user_id);

-- Create the 'outdoor_clubs' table
CREATE TABLE public.outdoor_clubs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    location text,
    activities text[],
    description text,
    contact_email text,
    contact_phone text,
    vector_embedding vector(1536),
    created_at timestamp with time zone DEFAULT now()
);

-- Set up RLS for 'outdoor_clubs' table
ALTER TABLE public.outdoor_clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Outdoor clubs are viewable by everyone." ON public.outdoor_clubs FOR SELECT USING (true);
CREATE POLICY "Users can insert their own outdoor clubs." ON public.outdoor_clubs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own outdoor clubs." ON public.outdoor_clubs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own outdoor clubs." ON public.outdoor_clubs FOR DELETE USING (auth.uid() = user_id);

-- Create the 'user_preferences' table
CREATE TABLE public.user_preferences (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    preferences jsonb, -- Store preferences as JSON
    created_at timestamp with time zone DEFAULT now()
);

-- Set up RLS for 'user_preferences' table
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences." ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences." ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences." ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own preferences." ON public.user_preferences FOR DELETE USING (auth.uid() = user_id);

-- Create the 'search_history' table
CREATE TABLE public.search_history (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    query text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Set up RLS for 'search_history' table
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own search history." ON public.search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own search history." ON public.search_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own search history." ON public.search_history FOR DELETE USING (auth.uid() = user_id);

-- Create the 'favorites' table
CREATE TABLE public.favorites (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    item_id text NOT NULL, -- ID of the favorited item (specialist, school, club)
    item_type text NOT NULL, -- Type of item ('specialist', 'school', 'club')
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, item_id, item_type) -- Ensure a user can only favorite an item once
);

-- Set up RLS for 'favorites' table
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites." ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites." ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites." ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Create the `match_documents` function for vector search
-- This function allows searching across different tables based on vector embeddings.
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE(id uuid, content text, similarity float)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY
  SELECT
    id,
    COALESCE(
      name || ' ' || specialty || ' ' || location || ' ' || array_to_string(services, ' ') || ' ' || bio,
      name || ' ' || location || ' ' || array_to_string(programs, ' ') || ' ' || description,
      name || ' ' || location || ' ' || array_to_string(activities, ' ') || ' ' || description
    ) AS content,
    1 - (vector_embedding <=> query_embedding) AS similarity
  FROM (
    SELECT
      id, name, specialty, location, services, bio, NULL AS programs, NULL AS description, NULL AS activities, vector_embedding
    FROM health_specialists
    WHERE vector_embedding IS NOT NULL
    UNION ALL
    SELECT
      id, name, NULL AS specialty, location, NULL AS services, NULL AS bio, programs, description, NULL AS activities, vector_embedding
    FROM schools
    WHERE vector_embedding IS NOT NULL
    UNION ALL
    SELECT
      id, name, NULL AS specialty, location, NULL AS services, NULL AS bio, NULL AS programs, description, activities, vector_embedding
    FROM outdoor_clubs
    WHERE vector_embedding IS NOT NULL
  ) AS combined_data
  WHERE 1 - (vector_embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Trigger to create a public.users entry when a new user signs up via auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Set up the trigger to run as the supabase_admin role
ALTER FUNCTION public.handle_new_user() OWNER TO supabase_admin;
