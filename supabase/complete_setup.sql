-- This script combines all necessary SQL commands for a complete Supabase setup,
-- including enabling extensions, creating tables, RLS policies, and functions.

-- Enable pg_vector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create health_specialists table
CREATE TABLE public.health_specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    contact_info TEXT,
    description TEXT,
    services TEXT[],
    qualifications TEXT[],
    experience_years INT,
    rating NUMERIC(2,1),
    website TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    embedding vector(1536) -- For storing OpenAI embeddings (ada-002 is 1536 dimensions)
);

-- Create RLS policies for health_specialists
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public health_specialists are viewable by everyone."
ON public.health_specialists FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert health_specialists."
ON public.health_specialists FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their own health_specialists."
ON public.health_specialists FOR UPDATE
USING (auth.uid() = id); -- Assuming 'id' here refers to a user_id column if specialists are users

CREATE POLICY "Authenticated users can delete their own health_specialists."
ON public.health_specialists FOR DELETE
USING (auth.uid() = id); -- Assuming 'id' here refers to a user_id column if specialists are users

-- Create schools table
CREATE TABLE public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    specialization TEXT NOT NULL,
    programs TEXT[],
    contact_info TEXT,
    description TEXT,
    website TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    rating NUMERIC(2,1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    embedding vector(1536)
);

-- Create RLS policies for schools
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public schools are viewable by everyone."
ON public.schools FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert schools."
ON public.schools FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their own schools."
ON public.schools FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Authenticated users can delete their own schools."
ON public.schools FOR DELETE
USING (auth.uid() = id);

-- Create outdoor_clubs table
CREATE TABLE public.outdoor_clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    activity TEXT NOT NULL,
    location TEXT NOT NULL,
    schedule TEXT,
    age_group TEXT,
    contact_info TEXT,
    description TEXT,
    website TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    rating NUMERIC(2,1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    embedding vector(1536)
);

-- Create RLS policies for outdoor_clubs
ALTER TABLE public.outdoor_clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public outdoor_clubs are viewable by everyone."
ON public.outdoor_clubs FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert outdoor_clubs."
ON public.outdoor_clubs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their own outdoor_clubs."
ON public.outdoor_clubs FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Authenticated users can delete their own outdoor_clubs."
ON public.outdoor_clubs FOR DELETE
USING (auth.uid() = id);

-- Create user_preferences table
CREATE TABLE public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    preferred_specialties TEXT[],
    preferred_locations TEXT[],
    notification_settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences."
ON public.user_preferences FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences."
ON public.user_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences."
ON public.user_preferences FOR UPDATE
USING (auth.uid() = user_id);

-- Create search_history table
CREATE TABLE public.search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    search_type TEXT NOT NULL, -- e.g., 'health_specialist', 'school', 'outdoor_club'
    results_count INT,
    searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for search_history
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own search history."
ON public.search_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search history."
ON public.search_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create favorites table
CREATE TABLE public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL,
    resource_type TEXT NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, resource_id, resource_type) -- Prevent duplicate favorites
);

-- Create RLS policies for favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites."
ON public.favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites."
ON public.favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites."
ON public.favorites FOR DELETE
USING (auth.uid() = user_id);

-- Create match_health_specialists function for vector search
CREATE OR REPLACE FUNCTION match_health_specialists (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  specialty TEXT,
  location TEXT,
  contact_info TEXT,
  description TEXT,
  services TEXT[],
  qualifications TEXT[],
  experience_years INT,
  rating NUMERIC(2,1),
  website TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    name,
    specialty,
    location,
    contact_info,
    description,
    services,
    qualifications,
    experience_years,
    rating,
    website,
    email,
    phone,
    created_at,
    updated_at,
    1 - (health_specialists.embedding <=> query_embedding) AS similarity
  FROM
    health_specialists
  WHERE
    1 - (health_specialists.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;

-- Create match_schools function for vector search
CREATE OR REPLACE FUNCTION match_schools (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  location TEXT,
  specialization TEXT,
  programs TEXT[],
  contact_info TEXT,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  rating NUMERIC(2,1),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    name,
    location,
    specialization,
    programs,
    contact_info,
    description,
    website,
    email,
    phone,
    rating,
    created_at,
    updated_at,
    1 - (schools.embedding <=> query_embedding) AS similarity
  FROM
    schools
  WHERE
    1 - (schools.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;

-- Create match_outdoor_clubs function for vector search
CREATE OR REPLACE FUNCTION match_outdoor_clubs (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  activity TEXT,
  location TEXT,
  schedule TEXT,
  age_group TEXT,
  contact_info TEXT,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  rating NUMERIC(2,1),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    name,
    activity,
    location,
    schedule,
    age_group,
    contact_info,
    description,
    website,
    email,
    phone,
    rating,
    created_at,
    updated_at,
    1 - (outdoor_clubs.embedding <=> query_embedding) AS similarity
  FROM
    outdoor_clubs
  WHERE
    1 - (outdoor_clubs.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;

-- Seed initial data (optional, can be done via Python script or CSV import)
INSERT INTO public.health_specialists (name, specialty, location, contact_info, description, services, qualifications, experience_years, rating, website, email, phone)
VALUES
('Dr. Jane Doe', 'Pediatric Occupational Therapist', 'Nairobi', 'jane.doe@example.com', 'Specializes in sensory integration and fine motor skills.', '{"Sensory Integration Therapy", "Fine Motor Skills Development"}', '{"MSc Occupational Therapy", "Certified SI Therapist"}', 10, 4.8, 'https://janedoeot.com', 'jane.doe@example.com', '+254712345678'),
('Mr. John Smith', 'Speech-Language Pathologist', 'Mombasa', 'john.smith@example.com', 'Focuses on early language development and articulation.', '{"Articulation Therapy", "Language Delay Intervention"}', '{"BSc Speech Pathology", "ASHA Certified"}', 7, 4.5, 'https://johnsmithslp.com', 'john.smith@example.com', '+254723456789'),
('Ms. Emily White', 'Physical Therapist', 'Kisumu', 'emily.white@example.com', 'Expert in gross motor skills and mobility for children with special needs.', '{"Gross Motor Development", "Mobility Training"}', '{"DPT Physical Therapy", "Pediatric PT Specialist"}', 12, 4.9, 'https://emilywhitept.com', 'emily.white@example.com', '+254734567890');

INSERT INTO public.schools (name, location, specialization, programs, contact_info, description, website, email, phone, rating)
VALUES
('Bright Future Academy', 'Nairobi', 'Autism Spectrum Disorder', '{"Early Intervention", "Primary Education"}', 'info@brightfuture.org', 'A school dedicated to providing individualized education for children with autism.', 'https://brightfuture.org', 'info@brightfuture.org', '+254701122334', 4.7),
('Inclusive Learning Center', 'Kisumu', 'Down Syndrome, Learning Disabilities', '{"Primary Education", "Secondary Education"}', 'contact@inclusivelearning.org', 'Creating an inclusive environment for students with diverse learning needs.', 'https://inclusivelearning.org', 'contact@inclusivelearning.org', '+254702233445', 4.5),
('Hope Springs School', 'Mombasa', 'Cerebral Palsy, Physical Disabilities', '{"Therapeutic Education", "Rehabilitation Programs"}', 'admin@hopesprings.org', 'Specialized education and therapy for children with physical disabilities.', 'https://hopesprings.org', 'admin@hopesprings.org', '+254703344556', 4.8);

INSERT INTO public.outdoor_clubs (name, activity, location, schedule, age_group, contact_info, description, website, email, phone, rating)
VALUES
('Nature Explorers Club', 'Hiking & Nature Walks', 'Karura Forest, Nairobi', 'Saturdays 9 AM - 12 PM', '5-12 years', 'info@natureexplorers.org', 'An inclusive club for children to explore nature and develop outdoor skills.', 'https://natureexplorers.org', 'info@natureexplorers.org', '+254704455667', 4.6),
('Adaptive Sports League', 'Wheelchair Basketball', 'Moi International Sports Centre, Kasarani', 'Sundays 2 PM - 4 PM', 'All ages', 'sports@adaptivesports.org', 'Promoting adaptive sports for individuals with physical disabilities.', 'https://adaptivesports.org', 'sports@adaptivesports.org', '+254705566778', 4.9),
('Sensory Garden Club', 'Gardening & Sensory Play', 'Arboretum, Nairobi', 'Wednesdays 10 AM - 11 AM', '3-8 years', 'garden@sensorygarden.org', 'A therapeutic gardening club focusing on sensory experiences for young children.', 'https://sensorygarden.org', 'garden@sensorygarden.org', '+254706677889', 4.7);
