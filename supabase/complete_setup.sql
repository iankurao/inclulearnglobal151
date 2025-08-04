-- Create the `public` schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS public;

-- Enable the `uuid-ossp` extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable the `vector` extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create `profiles` table for user metadata
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Set up Row Level Security (RLS) for `profiles`
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create `health_specialists` table
CREATE TABLE IF NOT EXISTS public.health_specialists (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  specialty text NOT NULL,
  location text NOT NULL,
  phone text,
  email text,
  website text,
  description text,
  rating numeric(2,1),
  availability text,
  distance text,
  embedding vector(1536), -- For vector search
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Health specialists are viewable by authenticated users." ON public.health_specialists
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create `schools` table
CREATE TABLE IF NOT EXISTS public.schools (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  phone text,
  email text,
  website text,
  description text,
  rating numeric(2,1),
  capacity int,
  age_range text,
  specialties text[], -- Array of text for multiple specialties
  distance text,
  embedding vector(1536), -- For vector search
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schools are viewable by authenticated users." ON public.schools
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create `outdoor_clubs` table
CREATE TABLE IF NOT EXISTS public.outdoor_clubs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  activity text NOT NULL,
  location text NOT NULL,
  meeting_time text,
  age_range text,
  max_participants int,
  current_members int,
  rating numeric(2,1),
  description text,
  next_meeting text,
  distance text,
  inclusive_features text[], -- Array of text for inclusive features
  embedding vector(1536), -- For vector search
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.outdoor_clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Outdoor clubs are viewable by authenticated users." ON public.outdoor_clubs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create `user_preferences` table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE UNIQUE NOT NULL,
  preferred_specialties text[],
  preferred_locations text[],
  preferred_age_ranges text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own preferences." ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create `search_history` table
CREATE TABLE IF NOT EXISTS public.search_history (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  query text NOT NULL,
  search_type text NOT NULL, -- e.g., 'health_specialist', 'school', 'outdoor_club'
  search_date timestamp with time zone DEFAULT now()
);

ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own search history." ON public.search_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search history." ON public.search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create `favorites` table
CREATE TABLE IF NOT EXISTS public.favorites (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  item_id uuid NOT NULL, -- ID of the favorited specialist, school, or club
  item_type text NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
  favorited_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, item_id, item_type) -- Ensure a user can't favorite the same item multiple times
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites." ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites." ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites." ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function for similarity search (if not already done by Supabase)
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  table_name text
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query EXECUTE format('
    SELECT
      id,
      description AS content, -- or other relevant text column
      1 - (embedding <=> %L) AS similarity
    FROM
      %I
    WHERE
      1 - (embedding <=> %L) > %L
    ORDER BY
      similarity DESC
    LIMIT %L
  ', query_embedding, table_name, query_embedding, match_threshold, match_count);
END;
$$;

-- Seed initial data (optional, for testing/development)
INSERT INTO public.health_specialists (name, specialty, location, phone, email, website, description, rating, availability, distance) VALUES
('Dr. Sarah Mwangi', 'Pediatric Occupational Therapist', 'Westlands, Nairobi', '+254 700 123 456', 'sarah.mwangi@example.com', 'www.sarahmwangi.com', 'Specializes in sensory integration and fine motor skills for children.', 4.8, 'Mon-Fri 9AM-5PM', '2.3 km'),
('Dr. James Kiprotich', 'Speech Language Pathologist', 'Karen, Nairobi', '+254 700 234 567', 'james.kiprotich@example.com', NULL, 'Focuses on communication disorders and early intervention.', 4.9, 'Mon-Sat 8AM-6PM', '5.1 km'),
('Dr. Grace Wanjiku', 'Developmental Pediatrician', 'Kilimani, Nairobi', '+254 700 345 678', 'grace.wanjiku@example.com', 'www.gracewanjiku.org', 'Provides comprehensive developmental assessments and management.', 4.7, 'Tue-Thu 10AM-4PM', '3.8 km');

INSERT INTO public.schools (name, type, location, phone, email, website, description, rating, capacity, age_range, specialties, distance) VALUES
('Sunshine Special Needs Academy', 'Special Needs School', 'Karen, Nairobi', '+254 700 111 222', 'info@sunshineacademy.org', 'www.sunshineacademy.org', 'Dedicated to providing inclusive education for children with various special needs.', 4.8, 150, '3-18 years', ARRAY['Autism', 'ADHD', 'Learning Disabilities'], '2.1 km'),
('Hope Center for Special Education', 'Inclusive School', 'Westlands, Nairobi', '+254 700 333 444', 'contact@hopecenter.co.ke', NULL, 'Offers an integrated curriculum for children with and without special needs.', 4.6, 200, '5-16 years', ARRAY['Intellectual Disabilities', 'Physical Disabilities'], '4.3 km'),
('Bright Minds Learning Center', 'Therapy Center', 'Kilimani, Nairobi', '+254 700 555 666', 'admin@brightminds.org', 'www.brightminds.org', 'Focuses on individualized learning plans and therapy services.', 4.9, 80, '2-12 years', ARRAY['Speech Therapy', 'Occupational Therapy', 'Behavioral Support'], '1.8 km');

INSERT INTO public.outdoor_clubs (name, activity, location, meeting_time, age_range, max_participants, current_members, rating, description, next_meeting, distance, inclusive_features) VALUES
('Adaptive Sports Club', 'Multi-Sport Activities', 'Uhuru Park, Nairobi', 'Saturdays 9:00 AM', '8-16 years', 20, 15, 4.8, 'Inclusive sports activities adapted for children with various abilities', 'January 13, 2024', '3.2 km', ARRAY['Sensory-friendly trails', 'Wheelchair accessible paths', 'Trained support staff']),
('Nature Explorers', 'Nature Walks & Education', 'Karura Forest, Nairobi', 'Sundays 10:00 AM', '6-14 years', 15, 12, 4.9, 'Gentle nature walks with educational activities for special needs children', 'January 14, 2024', '5.7 km', ARRAY['Adapted equipment', 'Quiet zones', 'One-on-one support available']),
('Sensory Garden Club', 'Gardening & Sensory Play', 'City Park, Nairobi', 'Fridays 4:00 PM', '4-12 years', 12, 8, 4.7, 'Therapeutic gardening activities designed for sensory development', 'January 12, 2024', '2.1 km', ARRAY['Raised garden beds', 'Visual schedules', 'Therapeutic activities']);
