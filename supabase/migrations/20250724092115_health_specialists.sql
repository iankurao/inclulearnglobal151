-- Create health_specialists table
CREATE TABLE IF NOT EXISTS health_specialists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  location TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  years_experience INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  hourly_rate DECIMAL(10,2),
  description TEXT,
  therapy_services TEXT[] DEFAULT '{}',
  accessibility_features TEXT[] DEFAULT '{}',
  languages_spoken TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE health_specialists ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Health specialists are viewable by everyone" ON health_specialists
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO health_specialists (
  name, specialty, location, contact_phone, contact_email, 
  years_experience, rating, hourly_rate, description, 
  therapy_services, accessibility_features, languages_spoken
) VALUES 
(
  'Dr. Sarah Johnson',
  'Clinical Psychologist',
  'Nairobi, Kenya',
  '+254-700-123456',
  'sarah.johnson@email.com',
  12,
  4.8,
  5000.00,
  'Specialized in autism spectrum disorders and developmental disabilities. Experienced in working with children and adults.',
  ARRAY['Behavioral Therapy', 'Cognitive Behavioral Therapy', 'Family Counseling'],
  ARRAY['Wheelchair Accessible', 'Sign Language Interpreter Available', 'Sensory-Friendly Environment'],
  ARRAY['English', 'Swahili']
),
(
  'Dr. Michael Ochieng',
  'Speech Therapist',
  'Kisumu, Kenya',
  '+254-700-234567',
  'michael.ochieng@email.com',
  8,
  4.6,
  3500.00,
  'Expert in speech and language disorders, particularly for children with developmental delays.',
  ARRAY['Speech Therapy', 'Language Development', 'Communication Skills Training'],
  ARRAY['Wheelchair Accessible', 'Visual Aids Available'],
  ARRAY['English', 'Swahili', 'Luo']
),
(
  'Dr. Grace Wanjiku',
  'Occupational Therapist',
  'Mombasa, Kenya',
  '+254-700-345678',
  'grace.wanjiku@email.com',
  15,
  4.9,
  4000.00,
  'Specializes in helping individuals with disabilities develop daily living skills and independence.',
  ARRAY['Occupational Therapy', 'Sensory Integration', 'Adaptive Skills Training'],
  ARRAY['Wheelchair Accessible', 'Adaptive Equipment Available', 'Quiet Environment'],
  ARRAY['English', 'Swahili']
),
(
  'Dr. James Kiprop',
  'Behavioral Analyst',
  'Eldoret, Kenya',
  '+254-700-456789',
  'james.kiprop@email.com',
  10,
  4.7,
  4500.00,
  'Board-certified behavior analyst specializing in Applied Behavior Analysis (ABA) for autism.',
  ARRAY['Applied Behavior Analysis', 'Behavioral Intervention', 'Social Skills Training'],
  ARRAY['Wheelchair Accessible', 'Sensory-Friendly Environment', 'Flexible Scheduling'],
  ARRAY['English', 'Swahili', 'Kalenjin']
);

-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.
