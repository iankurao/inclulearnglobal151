-- Enable the pg_vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the 'health_specialists' table
CREATE TABLE IF NOT EXISTS public.health_specialists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    name text,
    specialty text,
    location text,
    description text,
    services_offered text,
    rating numeric,
    vector_embedding vector(1536) -- Assuming OpenAI's text-embedding-ada-002 which is 1536 dimensions
);

-- Create the 'schools' table
CREATE TABLE IF NOT EXISTS public.schools (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    name text,
    location text,
    description text,
    specialization text,
    contact_email text,
    vector_embedding vector(1536)
);

-- Create the 'outdoor_clubs' table
CREATE TABLE IF NOT EXISTS public.outdoor_clubs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    name text,
    location text,
    description text,
    activities_offered text,
    contact_email text,
    vector_embedding vector(1536)
);

-- Create the 'user_preferences' table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    user_id uuid REFERENCES auth.users(id),
    theme text,
    language text,
    notification_settings jsonb
);

-- Create the 'search_history' table
CREATE TABLE IF NOT EXISTS public.search_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    user_id uuid REFERENCES auth.users(id),
    query_text text NOT NULL
);

-- Create the 'favorites' table
CREATE TABLE IF NOT EXISTS public.favorites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone DEFAULT now(),
    user_id uuid REFERENCES auth.users(id),
    resource_id text NOT NULL, -- Can be specialist_id, school_id, club_id
    resource_type text NOT NULL -- 'specialist', 'school', 'club'
);

-- Create a function for vector search
CREATE OR REPLACE FUNCTION public.match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  table_name text,
  text_column text -- Added text_column parameter
)
RETURNS TABLE (
  id uuid,
  name text,
  location text,
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
      description,
      1 - (vector_embedding &lt;=> $1) AS similarity
    FROM
      public.%I
    WHERE
      1 - (vector_embedding &lt;=> $1) > $2
    ORDER BY
      vector_embedding &lt;=> $1
    LIMIT $3
  ', table_name)
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

-- RLS Policies for health_specialists (read-only for all, insert/update/delete for authenticated users)
CREATE POLICY "Allow public read access to health_specialists" ON public.health_specialists FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access to health_specialists" ON public.health_specialists FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to health_specialists" ON public.health_specialists FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to health_specialists" ON public.health_specialists FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for schools (read-only for all, insert/update/delete for authenticated users)
CREATE POLICY "Allow public read access to schools" ON public.schools FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access to schools" ON public.schools FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to schools" ON public.schools FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to schools" ON public.schools FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for outdoor_clubs (read-only for all, insert/update/delete for authenticated users)
CREATE POLICY "Allow public read access to outdoor_clubs" ON public.outdoor_clubs FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access to outdoor_clubs" ON public.outdoor_clubs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access to outdoor_clubs" ON public.outdoor_clubs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access to outdoor_clubs" ON public.outdoor_clubs FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for user_preferences (only owner can read/write)
CREATE POLICY "Allow owner read access to user_preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow owner insert access to user_preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owner update access to user_preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow owner delete access to user_preferences" ON public.user_preferences FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for search_history (only owner can read/write)
CREATE POLICY "Allow owner read access to search_history" ON public.search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow owner insert access to search_history" ON public.search_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owner delete access to search_history" ON public.search_history FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for favorites (only owner can read/write)
CREATE POLICY "Allow owner read access to favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow owner insert access to favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owner delete access to favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Seed data (optional, for initial setup)
INSERT INTO public.health_specialists (name, specialty, location, description, services_offered, rating) VALUES
('Dr. Jane Doe', 'Pediatrician', 'Nairobi', 'Specializes in developmental disorders in children.', 'Diagnosis, therapy referrals, medication management', 4.8),
('Mr. John Smith', 'Speech Therapist', 'Mombasa', 'Helps children with speech and language delays.', 'Articulation therapy, language intervention, fluency therapy', 4.5),
('Ms. Emily White', 'Occupational Therapist', 'Kisumu', 'Focuses on improving daily living skills for special needs individuals.', 'Sensory integration, fine motor skills, adaptive equipment training', 4.7);

INSERT INTO public.schools (name, location, description, specialization, contact_email) VALUES
('Bright Minds Academy', 'Nairobi', 'An inclusive primary school with a dedicated special education unit.', 'Autism Spectrum Disorder, ADHD', 'info@brightminds.ke'),
('Coastal Learning Center', 'Mombasa', 'Offers individualized education plans for students with learning disabilities.', 'Dyslexia, Dyscalculia', 'contact@coastallearning.ke'),
('Green Valley School', 'Nakuru', 'A boarding school providing a supportive environment for children with physical disabilities.', 'Physical Disabilities, Mobility Support', 'admissions@greenvalley.ke');

INSERT INTO public.outdoor_clubs (name, location, description, activities_offered, contact_email) VALUES
('Safari Explorers', 'Nairobi', 'An outdoor club organizing accessible safaris and nature walks for all abilities.', 'Accessible safaris, nature walks, bird watching', 'safari.explorers@email.com'),
('Mountain Climbers Inclusive', 'Eldoret', 'Promotes adaptive hiking and mountaineering for individuals with physical challenges.', 'Adaptive hiking, rock climbing, camping', 'inclusive.climbers@email.com'),
('Aqua Adventures Kenya', 'Diani', 'Offers adaptive water sports including swimming, snorkeling, and kayaking.', 'Adaptive swimming, snorkeling, kayaking, beach activities', 'aqua.adventures@email.com');
