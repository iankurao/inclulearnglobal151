-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create health_specialists table
CREATE TABLE IF NOT EXISTS health_specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    contact_phone TEXT,
    contact_email TEXT,
    years_experience INTEGER,
    rating DECIMAL(3,2),
    hourly_rate DECIMAL(10,2),
    description TEXT,
    therapy_services TEXT[],
    accessibility_features TEXT[],
    languages_spoken TEXT[],
    embedding vector(384),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    contact_phone TEXT,
    contact_email TEXT,
    website TEXT,
    age_range TEXT,
    capacity INTEGER,
    current_enrollment INTEGER,
    tuition_fees DECIMAL(10,2),
    description TEXT,
    special_programs TEXT[],
    accessibility_features TEXT[],
    languages_of_instruction TEXT[],
    extracurricular_activities TEXT[],
    embedding vector(384),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create outdoor_clubs table
CREATE TABLE IF NOT EXISTS outdoor_clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    location TEXT NOT NULL,
    contact_phone TEXT,
    contact_email TEXT,
    website TEXT,
    age_range TEXT,
    max_participants INTEGER,
    current_participants INTEGER,
    monthly_fee DECIMAL(10,2),
    description TEXT,
    activities TEXT[],
    support_services TEXT[],
    accessibility_features TEXT[],
    meeting_schedule TEXT,
    embedding vector(384),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample health specialists
INSERT INTO health_specialists (name, specialty, location, contact_phone, contact_email, years_experience, rating, hourly_rate, description, therapy_services, accessibility_features, languages_spoken) VALUES
('Dr. Sarah Mwangi', 'Speech Therapy', 'Nairobi', '+254711123456', 'sarah.mwangi@email.com', 8, 4.8, 3000, 'Specialized in autism spectrum disorder and speech development with extensive experience in pediatric therapy.', ARRAY['Speech Therapy', 'Language Development', 'Autism Support'], ARRAY['Wheelchair accessible', 'Sensory-friendly environment'], ARRAY['English', 'Swahili', 'Kikuyu']),
('Dr. James Kiprotich', 'Occupational Therapy', 'Mombasa', '+254722234567', 'james.kiprotich@email.com', 12, 4.7, 2500, 'Expert in sensory integration and adaptive skills training for children with developmental disabilities.', ARRAY['Occupational Therapy', 'Sensory Integration', 'Motor Skills'], ARRAY['Adaptive equipment available', 'Flexible scheduling'], ARRAY['English', 'Swahili']),
('Dr. Grace Wanjiku', 'Behavioral Therapy', 'Kisumu', '+254733345678', 'grace.wanjiku@email.com', 6, 4.9, 3500, 'Specializes in Applied Behavior Analysis (ABA) and behavioral interventions for children with ADHD and autism.', ARRAY['ABA Therapy', 'Behavioral Support', 'ADHD Management'], ARRAY['Quiet therapy rooms', 'Parent observation area'], ARRAY['English', 'Swahili', 'Luo']),
('Dr. Peter Mutua', 'Physical Therapy', 'Nakuru', '+254744456789', 'peter.mutua@email.com', 10, 4.6, 2800, 'Experienced in pediatric physical therapy and rehabilitation for children with cerebral palsy and mobility challenges.', ARRAY['Physical Therapy', 'Mobility Training', 'Rehabilitation'], ARRAY['Wheelchair accessible', 'Specialized equipment'], ARRAY['English', 'Swahili', 'Kamba']);

-- Insert sample schools
INSERT INTO schools (name, type, location, contact_phone, contact_email, website, age_range, capacity, current_enrollment, tuition_fees, description, special_programs, accessibility_features, languages_of_instruction, extracurricular_activities) VALUES
('Sunshine Special School', 'Special Needs School', 'Nairobi', '+254711987654', 'info@sunshinespecial.ac.ke', 'www.sunshinespecial.ac.ke', '3-18 years', 200, 180, 85000, 'Premier inclusive education with specialized therapy programs and individualized learning plans.', ARRAY['Autism Support Program', 'Speech Therapy', 'Occupational Therapy', 'Individualized Education Plans'], ARRAY['Wheelchair accessible', 'Sensory rooms', 'Adaptive technology'], ARRAY['English', 'Swahili'], ARRAY['Art Therapy', 'Music Therapy', 'Adaptive Sports']),
('Hope Valley Academy', 'Inclusive School', 'Mombasa', '+254722876543', 'admissions@hopevalley.ac.ke', 'www.hopevalley.ac.ke', '5-16 years', 300, 250, 65000, 'Innovative learning approaches for children with diverse needs in an inclusive environment.', ARRAY['Learning Support', 'Dyslexia Program', 'ADHD Support', 'Peer Mentoring'], ARRAY['Learning support center', 'Quiet study areas', 'Assistive technology'], ARRAY['English', 'Swahili'], ARRAY['Drama Club', 'Science Club', 'Peer Support Groups']),
('Rainbow Bridge School', 'Therapeutic School', 'Kisumu', '+254733765432', 'contact@rainbowbridge.ac.ke', 'www.rainbowbridge.ac.ke', '4-17 years', 150, 120, 75000, 'Fully accessible campus with expert physiotherapy support and therapeutic interventions.', ARRAY['Physical Therapy', 'Mobility Support', 'Adaptive PE', 'Life Skills Training'], ARRAY['Fully wheelchair accessible', 'Therapy pools', 'Adaptive playground'], ARRAY['English', 'Swahili', 'Luo'], ARRAY['Adaptive Swimming', 'Wheelchair Basketball', 'Life Skills Club']),
('Bright Minds Academy', 'Learning Support School', 'Eldoret', '+254744654321', 'info@brightminds.ac.ke', 'www.brightminds.ac.ke', '6-15 years', 180, 160, 70000, 'Specialized in supporting children with learning disabilities and intellectual challenges.', ARRAY['Learning Disabilities Support', 'Intellectual Disability Program', 'Behavioral Support'], ARRAY['Sensory-friendly classrooms', 'Quiet zones', 'Visual supports'], ARRAY['English', 'Swahili', 'Kalenjin'], ARRAY['Special Olympics', 'Art Club', 'Music Therapy']),
('Unity Special School', 'Special Needs School', 'Thika', '+254755543210', 'admissions@unityspecial.ac.ke', 'www.unityspecial.ac.ke', '3-16 years', 120, 100, 60000, 'Community-focused special education with strong family involvement and support.', ARRAY['Family Support Program', 'Community Integration', 'Vocational Training'], ARRAY['Family resource center', 'Community garden', 'Vocational workshops'], ARRAY['English', 'Swahili', 'Kikuyu'], ARRAY['Gardening Club', 'Cooking Classes', 'Community Service']),
('Inclusive Learning Center', 'Mainstream with Support', 'Machakos', '+254766432109', 'support@inclusivelc.ac.ke', 'www.inclusivelc.ac.ke', '5-18 years', 400, 350, 55000, 'Mainstream education with comprehensive support services for children with special needs.', ARRAY['Inclusion Support', 'Resource Room', 'Transition Planning'], ARRAY['Resource rooms', 'Assistive technology lab', 'Counseling center'], ARRAY['English', 'Swahili', 'Kamba'], ARRAY['Inclusive Sports', 'Technology Club', 'Peer Tutoring']),
('New Dawn School', 'Therapeutic School', 'Meru', '+254777321098', 'info@newdawn.ac.ke', 'www.newdawn.ac.ke', '4-16 years', 100, 85, 80000, 'Holistic approach combining education with therapeutic interventions for optimal development.', ARRAY['Multi-disciplinary Therapy', 'Holistic Education', 'Parent Training'], ARRAY['Therapy suites', 'Sensory garden', 'Parent training rooms'], ARRAY['English', 'Swahili', 'Meru'], ARRAY['Nature Club', 'Therapeutic Riding', 'Parent Support Groups']),
('Ability First Academy', 'Special Needs School', 'Nakuru', '+254788210987', 'contact@abilityfirst.ac.ke', 'www.abilityfirst.ac.ke', '3-17 years', 160, 140, 72000, 'Empowering students with disabilities through innovative teaching methods and technology.', ARRAY['Assistive Technology', 'Communication Support', 'Independence Training'], ARRAY['High-tech classrooms', 'Communication devices', 'Independence training center'], ARRAY['English', 'Swahili'], ARRAY['Tech Club', 'Communication Club', 'Independence Skills']);

-- Insert sample outdoor clubs
INSERT INTO outdoor_clubs (name, activity_type, location, contact_phone, contact_email, website, age_range, max_participants, current_participants, monthly_fee, description, activities, support_services, accessibility_features, meeting_schedule) VALUES
('Nature Explorers Club', 'Nature & Science', 'Nairobi', '+254711555666', 'info@natureexplorers.co.ke', 'www.natureexplorers.co.ke', '6-16 years', 25, 20, 2500, 'Weekly nature walks and hands-on science activities designed for children with diverse abilities.', ARRAY['Nature walks', 'Science experiments', 'Wildlife observation', 'Environmental education'], ARRAY['One-on-one support', 'Sensory accommodations', 'Flexible participation'], ARRAY['Wheelchair accessible trails', 'Sensory-friendly activities', 'Visual supports'], 'Saturdays 9:00 AM - 12:00 PM'),
('Young Artists Collective', 'Arts & Crafts', 'Mombasa', '+254722666777', 'contact@youngartists.co.ke', 'www.youngartists.co.ke', '5-15 years', 20, 18, 3000, 'Creative workshops combining visual arts and theater for children with special needs.', ARRAY['Painting', 'Sculpture', 'Drama', 'Music'], ARRAY['Art therapy support', 'Adaptive tools', 'Individual assistance'], ARRAY['Adaptive art tools', 'Quiet spaces', 'Flexible seating'], 'Sundays 2:00 PM - 5:00 PM'),
('Adventure Seekers', 'Outdoor Adventure', 'Kisumu', '+254733777888', 'adventures@seekers.co.ke', 'www.adventureseekers.co.ke', '8-18 years', 15, 12, 3500, 'Adaptive outdoor adventures including hiking, camping, and water activities.', ARRAY['Adaptive hiking', 'Camping', 'Water sports', 'Team building'], ARRAY['Specialized equipment', 'Trained guides', 'Medical support'], ARRAY['Adaptive equipment', 'Accessible campsites', 'Modified activities'], 'Monthly weekend trips'),
('Harmony Music Club', 'Music & Performance', 'Eldoret', '+254744888999', 'harmony@musicclub.co.ke', 'www.harmonymusicclub.co.ke', '4-14 years', 30, 25, 2000, 'Music therapy and performance opportunities for children with developmental disabilities.', ARRAY['Music therapy', 'Instrument lessons', 'Choir', 'Performances'], ARRAY['Music therapy', 'Adaptive instruments', 'Individual coaching'], ARRAY['Adaptive instruments', 'Sound-proof rooms', 'Visual cues'], 'Wednesdays 4:00 PM - 6:00 PM');

-- Create vector search functions
CREATE OR REPLACE FUNCTION match_health_specialists(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  name text,
  specialty text,
  location text,
  contact_phone text,
  contact_email text,
  years_experience int,
  rating decimal,
  hourly_rate decimal,
  description text,
  therapy_services text[],
  accessibility_features text[],
  languages_spoken text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    health_specialists.id,
    health_specialists.name,
    health_specialists.specialty,
    health_specialists.location,
    health_specialists.contact_phone,
    health_specialists.contact_email,
    health_specialists.years_experience,
    health_specialists.rating,
    health_specialists.hourly_rate,
    health_specialists.description,
    health_specialists.therapy_services,
    health_specialists.accessibility_features,
    health_specialists.languages_spoken,
    1 - (health_specialists.embedding <=> query_embedding) as similarity
  FROM health_specialists
  WHERE health_specialists.embedding IS NOT NULL
    AND 1 - (health_specialists.embedding <=> query_embedding) > match_threshold
  ORDER BY health_specialists.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

CREATE OR REPLACE FUNCTION match_schools(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  name text,
  type text,
  location text,
  contact_phone text,
  contact_email text,
  website text,
  age_range text,
  capacity int,
  current_enrollment int,
  tuition_fees decimal,
  description text,
  special_programs text[],
  accessibility_features text[],
  languages_of_instruction text[],
  extracurricular_activities text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    schools.id,
    schools.name,
    schools.type,
    schools.location,
    schools.contact_phone,
    schools.contact_email,
    schools.website,
    schools.age_range,
    schools.capacity,
    schools.current_enrollment,
    schools.tuition_fees,
    schools.description,
    schools.special_programs,
    schools.accessibility_features,
    schools.languages_of_instruction,
    schools.extracurricular_activities,
    1 - (schools.embedding <=> query_embedding) as similarity
  FROM schools
  WHERE schools.embedding IS NOT NULL
    AND 1 - (schools.embedding <=> query_embedding) > match_threshold
  ORDER BY schools.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

CREATE OR REPLACE FUNCTION match_outdoor_clubs(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  name text,
  activity_type text,
  location text,
  contact_phone text,
  contact_email text,
  website text,
  age_range text,
  max_participants int,
  current_participants int,
  monthly_fee decimal,
  description text,
  activities text[],
  support_services text[],
  accessibility_features text[],
  meeting_schedule text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    outdoor_clubs.id,
    outdoor_clubs.name,
    outdoor_clubs.activity_type,
    outdoor_clubs.location,
    outdoor_clubs.contact_phone,
    outdoor_clubs.contact_email,
    outdoor_clubs.website,
    outdoor_clubs.age_range,
    outdoor_clubs.max_participants,
    outdoor_clubs.current_participants,
    outdoor_clubs.monthly_fee,
    outdoor_clubs.description,
    outdoor_clubs.activities,
    outdoor_clubs.support_services,
    outdoor_clubs.accessibility_features,
    outdoor_clubs.meeting_schedule,
    1 - (outdoor_clubs.embedding <=> query_embedding) as similarity
  FROM outdoor_clubs
  WHERE outdoor_clubs.embedding IS NOT NULL
    AND 1 - (outdoor_clubs.embedding <=> query_embedding) > match_threshold
  ORDER BY outdoor_clubs.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Generate simple embeddings for demo data
UPDATE health_specialists SET embedding = (
  SELECT array_agg(random() - 0.5)::vector(384)
  FROM generate_series(1, 384)
) WHERE embedding IS NULL;

UPDATE schools SET embedding = (
  SELECT array_agg(random() - 0.5)::vector(384)
  FROM generate_series(1, 384)
) WHERE embedding IS NULL;

UPDATE outdoor_clubs SET embedding = (
  SELECT array_agg(random() - 0.5)::vector(384)
  FROM generate_series(1, 384)
) WHERE embedding IS NULL;
