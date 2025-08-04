-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  user_type TEXT, -- e.g., 'individual', 'specialist', 'school', 'club'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS health_specialists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  specialty TEXT, -- e.g., 'Pediatrician', 'Therapist', 'Psychologist'
  description TEXT,
  services_offered TEXT[], -- e.g., ['Speech Therapy', 'Occupational Therapy']
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  profile_picture_url TEXT,
  vector_embedding vector(1536), -- For OpenAI text-embedding-ada-002
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  specialization TEXT[], -- e.g., ['Autism Spectrum Disorder', 'Down Syndrome']
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  vector_embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS outdoor_clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  activities_offered TEXT[], -- e.g., ['Hiking', 'Camping', 'Bird Watching']
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  vector_embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  preferences JSONB, -- e.g., {'theme': 'dark', 'notifications': true}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  search_query TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL, -- ID of the favorited specialist, school, or club
  resource_type TEXT NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, resource_id, resource_type) -- Prevent duplicate favorites
);

-- Create RLS policies for tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE outdoor_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Allow all authenticated users to view their own user profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow authenticated users to insert their own user profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow authenticated users to update their own user profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Policies for health_specialists table
CREATE POLICY "Allow authenticated users to view health specialists" ON health_specialists FOR SELECT USING (true);
CREATE POLICY "Allow specialists to insert their own profile" ON health_specialists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow specialists to update their own profile" ON health_specialists FOR UPDATE USING (auth.uid() = user_id);

-- Policies for schools table
CREATE POLICY "Allow authenticated users to view schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Allow school users to insert their own profile" ON schools FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow school users to update their own profile" ON schools FOR UPDATE USING (auth.uid() = user_id);

-- Policies for outdoor_clubs table
CREATE POLICY "Allow authenticated users to view outdoor clubs" ON outdoor_clubs FOR SELECT USING (true);
CREATE POLICY "Allow club users to insert their own profile" ON outdoor_clubs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow club users to update their own profile" ON outdoor_clubs FOR UPDATE USING (auth.uid() = user_id);

-- Policies for user_preferences table
CREATE POLICY "Allow authenticated users to view their own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to insert their own preferences" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to update their own preferences" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- Policies for search_history table
CREATE POLICY "Allow authenticated users to view their own search history" ON search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to insert their own search history" ON search_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for favorites table
CREATE POLICY "Allow authenticated users to view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Create a function for vector similarity search
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  table_name text
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  location TEXT,
  description TEXT,
  specialty TEXT, -- Can be NULL for schools/clubs
  specialization TEXT[], -- Can be NULL for specialists/clubs
  activities_offered TEXT[], -- Can be NULL for specialists/schools
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
      %s AS specialty,
      %s AS specialization,
      %s AS activities_offered,
      1 - (vector_embedding <=> $1) AS similarity
    FROM
      %I
    WHERE
      1 - (vector_embedding <=> $1) > $2
    ORDER BY
      vector_embedding <=> $1
    LIMIT $3',
    CASE WHEN table_name = 'health_specialists' THEN 'specialty' ELSE 'NULL' END,
    CASE WHEN table_name = 'schools' THEN 'specialization' ELSE 'NULL' END,
    CASE WHEN table_name = 'outdoor_clubs' THEN 'activities_offered' ELSE 'NULL' END,
    table_name
  )
  USING query_embedding, match_threshold, match_count;
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

-- Seed initial data (optional, for development/testing)
INSERT INTO health_specialists (name, specialty, description, services_offered, location, contact_email, contact_phone) VALUES
('Dr. Jane Doe', 'Pediatrician', 'Experienced pediatrician specializing in developmental disorders.', '{"General Check-ups", "Developmental Assessments", "Vaccinations"}', 'Nairobi', 'jane.doe@example.com', '+254712345678'),
('Sarah Smith', 'Speech Therapist', 'Passionate speech therapist helping children with communication challenges.', '{"Speech Therapy", "Language Development", "Swallowing Therapy"}', 'Mombasa', 'sarah.smith@example.com', '+254723456789'),
('John Kimani', 'Occupational Therapist', 'Dedicated OT focusing on sensory integration and fine motor skills.', '{"Occupational Therapy", "Sensory Integration", "Fine Motor Skills Training"}', 'Kisumu', 'john.kimani@example.com', '+254734567890');

INSERT INTO schools (name, location, description, specialization, contact_email, contact_phone) VALUES
('Bright Minds Academy', 'Nairobi', 'Inclusive school with specialized programs for children with learning disabilities.', '{"Learning Disabilities", "ADHD"}', 'brightminds@example.com', '+254745678901'),
('Sunshine Special School', 'Mombasa', 'A nurturing environment for children with autism spectrum disorder.', '{"Autism Spectrum Disorder"}', 'sunshine@example.com', '+254756789012'),
('Green Valley Inclusive', 'Nakuru', 'Offers tailored education for students with physical disabilities.', '{"Physical Disabilities"}', 'greenvalley@example.com', '+254767890123');

INSERT INTO outdoor_clubs (name, location, description, activities_offered, contact_email, contact_phone) VALUES
('Kenya Nature Explorers', 'Nairobi', 'Organizes nature walks and bird watching for all abilities.', '{"Nature Walks", "Bird Watching", "Accessible Trails"}', 'natureexplorers@example.com', '+254778901234'),
('Mountain Movers Club', 'Rift Valley', 'Hiking and camping trips adapted for individuals with special needs.', '{"Hiking", "Camping", "Adaptive Sports"}', 'mountainmovers@example.com', '+254789012345'),
('Coastal Adventures', 'Mombasa', 'Water-based activities including accessible swimming and boat rides.', '{"Swimming", "Boat Rides", "Beach Activities"}', 'coastaladventures@example.com', '+254790123456');
