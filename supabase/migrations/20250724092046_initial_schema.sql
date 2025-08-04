-- Initial schema for IncluLearn Global

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

-- Create the `health_specialists` table
CREATE TABLE public.health_specialists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    embedding VECTOR(1536) -- Assuming OpenAI's text-embedding-ada-002 dimension
);

-- Set up Row Level Security (RLS) for `health_specialists`
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.health_specialists FOR SELECT USING (TRUE);
CREATE POLICY "Enable insert for authenticated users" ON public.health_specialists FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.health_specialists FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.health_specialists FOR DELETE USING (auth.role() = 'authenticated');

-- Create `schools` table
CREATE TABLE public.schools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    education_level TEXT NOT NULL, -- e.g., 'Primary', 'Secondary', 'Special Needs'
    embedding VECTOR(1536)
);

-- Create `outdoor_clubs` table
CREATE TABLE public.outdoor_clubs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- e.g., 'Hiking', 'Camping', 'Nature Walks'
    location TEXT NOT NULL,
    embedding VECTOR(1536)
);

-- Function to update `updated_at` timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for `health_specialists` table
CREATE TRIGGER update_health_specialists_timestamp
BEFORE UPDATE ON public.health_specialists
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

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

-- This is a migration file. Its content should be managed by Supabase CLI.
-- It's typically a timestamped file for schema changes.
-- Example content:
-- create table public.profiles (
--   id uuid not null references auth.users on delete cascade,
--   updated_at timestamp with time zone,
--   username text unique,
--   avatar_url text,
--   website text,
--   primary key (id),
--   constraint username_length check (char_length(username) >= 3)
-- );
