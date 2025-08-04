-- Create the `public` schema if it doesn't exist (usually exists by default)
CREATE SCHEMA IF NOT EXISTS public;

-- Enable the `uuid-ossp` extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable the `vector` extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the `health_specialists` table
CREATE TABLE IF NOT EXISTS public.health_specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    experience_years INT,
    contact_email TEXT,
    phone_number TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description_embedding VECTOR(1536) -- For OpenAI's text-embedding-ada-002
);

-- Create the `schools` table
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., "Primary", "Secondary", "Special Needs School"
    location TEXT NOT NULL,
    special_needs_support TEXT, -- e.g., "Autism Spectrum", "ADHD", "Learning Disabilities"
    curriculum TEXT,
    contact_email TEXT,
    phone_number TEXT,
    website TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description_embedding VECTOR(1536)
);

-- Create the `outdoor_clubs` table
CREATE TABLE IF NOT EXISTS public.outdoor_clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- e.g., "Hiking", "Art Therapy", "Sports"
    location TEXT NOT NULL,
    age_group TEXT, -- e.g., "Children", "Teens", "Adults", "All Ages"
    schedule TEXT,
    contact_email TEXT,
    phone_number TEXT,
    website TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description_embedding VECTOR(1536)
);

-- Create the `user_preferences` table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    preferred_specialty TEXT,
    preferred_location TEXT,
    preferred_school_type TEXT,
    preferred_activity_type TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the `search_history` table
CREATE TABLE IF NOT EXISTS public.search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    search_type TEXT, -- e.g., 'specialist', 'school', 'club'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the `favorites` table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL, -- ID of the favorited specialist, school, or club
    resource_type TEXT NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, resource_id, resource_type) -- Ensure a user can only favorite an item once
);

-- Create a function for vector similarity search
CREATE OR REPLACE FUNCTION public.match_documents (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT,
  _table TEXT,
  _column TEXT
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY EXECUTE format('
    SELECT
      id,
      %I AS content,
      1 - (%I <=> $1) AS similarity
    FROM
      public.%I
    WHERE
      1 - (%I <=> $1) > $2
    ORDER BY
      %I <=> $1
    LIMIT $3
  ', _column, _column, _table, _column, _column)
  USING query_embedding, match_threshold, match_count;
END;
$$;

-- Set up Row Level Security (RLS) for tables
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outdoor_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for `health_specialists`
CREATE POLICY "Enable read access for all users" ON public.health_specialists FOR SELECT USING (TRUE);
CREATE POLICY "Enable insert for authenticated users" ON public.health_specialists FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.health_specialists FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.health_specialists FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for `schools`
CREATE POLICY "Enable read access for all users" ON public.schools FOR SELECT USING (TRUE);
CREATE POLICY "Enable insert for authenticated users" ON public.schools FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.schools FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.schools FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for `outdoor_clubs`
CREATE POLICY "Enable read access for all users" ON public.outdoor_clubs FOR SELECT USING (TRUE);
CREATE POLICY "Enable insert for authenticated users" ON public.outdoor_clubs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.outdoor_clubs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.outdoor_clubs FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for `user_preferences`
CREATE POLICY "Enable read access for own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable update for own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Enable delete for own preferences" ON public.user_preferences FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for `search_history`
CREATE POLICY "Enable read access for own search history" ON public.search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for own search history" ON public.search_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable delete for own search history" ON public.search_history FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for `favorites`
CREATE POLICY "Enable read access for own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable delete for own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Seed initial data (optional, for demonstration/testing)
INSERT INTO public.health_specialists (name, specialty, location, experience_years, contact_email, phone_number, description) VALUES
('Dr. Jane Doe', 'Pediatrician', 'Nairobi', 10, 'jane.doe@example.com', '+254712345678', 'Experienced pediatrician specializing in neurodevelopmental disorders.'),
('Mr. John Smith', 'Occupational Therapist', 'Mombasa', 7, 'john.smith@example.com', '+254723456789', 'Dedicated occupational therapist focusing on sensory integration.'),
('Ms. Emily White', 'Speech Therapist', 'Kisumu', 5, 'emily.white@example.com', '+254734567890', 'Passionate speech therapist helping children with communication challenges.');

INSERT INTO public.schools (name, type, location, special_needs_support, curriculum, contact_email, website, description) VALUES
('Greenwood Academy', 'Primary School', 'Nairobi', 'Autism Spectrum, ADHD', 'CBC, Adapted Curriculum', 'info@greenwood.ac.ke', 'http://www.greenwood.ac.ke', 'An inclusive primary school with dedicated support units for various special needs.'),
('Coastline Special School', 'Special Needs School', 'Mombasa', 'Intellectual Disabilities, Physical Disabilities', 'Individualized Education Programs (IEPs)', 'coastline@example.com', 'http://www.coastline.org', 'A specialized institution offering comprehensive education for children with severe disabilities.'),
('Highlands Inclusive College', 'Secondary School', 'Nakuru', 'Learning Disabilities, Dyslexia', 'CBC, Remedial Classes', 'highlands@college.ke', 'http://www.highlands.ac.ke', 'A secondary school committed to providing an inclusive learning environment with strong academic support.');

INSERT INTO public.outdoor_clubs (name, activity_type, location, age_group, schedule, contact_email, website, description) VALUES
('Nature Explorers Club', 'Hiking, Nature Walks', 'Nairobi National Park', 'All Ages', 'Weekends', 'info@natureexplorers.org', 'http://www.natureexplorers.org', 'A club dedicated to exploring Kenya''s natural beauty through guided hikes and nature walks.'),
('Art & Play Collective', 'Art Therapy, Sensory Play', 'Karen, Nairobi', 'Children (5-12)', 'Afternoons, weekdays', 'artplay@example.com', 'http://www.artplay.co.ke', 'Creative and sensory-rich activities for children with diverse needs.'),
('Inclusive Sports League', 'Football, Basketball', 'Mombasa Sports Club', 'Teens (13-18)', 'Saturdays', 'sports@inclusiveleague.co.ke', 'http://www.inclusiveleague.co.ke', 'A league promoting inclusive sports for teenagers of all abilities.');

-- Update `updated_at` column automatically on row update
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_health_specialists_timestamp
BEFORE UPDATE ON public.health_specialists
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_schools_timestamp
BEFORE UPDATE ON public.schools
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_outdoor_clubs_timestamp
BEFORE UPDATE ON public.outdoor_clubs
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_preferences_timestamp
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
