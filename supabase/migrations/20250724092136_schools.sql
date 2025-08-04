-- Create schools table
CREATE TABLE IF NOT EXISTS public.schools (
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public schools are viewable by everyone." ON public.schools
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert schools." ON public.schools
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their own schools." ON public.schools
  FOR UPDATE USING (auth.uid() = id); -- Placeholder: replace 'id' with actual user_id column if exists

CREATE POLICY "Authenticated users can delete their own schools." ON public.schools
  FOR DELETE USING (auth.uid() = id); -- Placeholder: replace 'id' with actual user_id column if exists

-- Insert sample data
INSERT INTO public.schools (
  name, location, specialization, programs, contact_info, description, website, email, phone, rating
) VALUES 
(
  'Nairobi Special Needs Academy',
  'Nairobi, Westlands',
  'special_needs',
  ARRAY['Autism Support', 'Speech Therapy', 'Occupational Therapy', 'Behavioral Support'],
  'Contact: +254-700-111111, info@nairobisna.ac.ke',
  'Specialized school for children with autism, ADHD, and other developmental disabilities. Small class sizes with individualized education plans.',
  'www.nairobisna.ac.ke',
  'info@nairobisna.ac.ke',
  '+254-700-111111',
  4.5
),
(
  'Mombasa Inclusive Primary School',
  'Mombasa, Nyali',
  'public',
  ARRAY['Inclusive Education', 'Special Needs Support', 'Remedial Classes'],
  'Contact: +254-700-222222, info@mombasainclusive.sc.ke',
  'Public school with strong inclusive education program. Welcomes children with disabilities alongside typical peers.',
  'www.mombasainclusive.sc.ke',
  'info@mombasainclusive.sc.ke',
  '+254-700-222222',
  4.7
),
(
  'Kisumu International School',
  'Kisumu, Milimani',
  'international',
  ARRAY['IB Program', 'Special Education Services', 'Gifted and Talented'],
  'Contact: +254-700-333333, admissions@kisumuint.ac.ke',
  'International school offering IB curriculum with comprehensive special education services and support for diverse learners.',
  'www.kisumuint.ac.ke',
  'admissions@kisumuint.ac.ke',
  '+254-700-333333',
  4.8
),
(
  'Eldoret Community School',
  'Eldoret, Kapsoya',
  'private',
  ARRAY['Learning Disabilities Support', 'Counseling Services', 'Peer Tutoring'],
  'Contact: +254-700-444444, info@eldoretcommunity.sc.ke',
  'Community-focused private school with dedicated support for children with learning disabilities and behavioral challenges.',
  'www.eldoretcommunity.sc.ke',
  'info@eldoretcommunity.sc.ke',
  '+254-700-444444',
  4.6
),
(
  'Nakuru Autism Center School',
  'Nakuru, Milimani',
  'special_needs',
  ARRAY['Applied Behavior Analysis', 'Speech Therapy', 'Life Skills Training'],
  'Contact: +254-700-555555, info@nakuruautism.ac.ke',
  'Specialized school exclusively for children with autism spectrum disorders. Evidence-based interventions and family support.',
  'www.nakuruautism.ac.ke',
  'info@nakuruautism.ac.ke',
  '+254-700-555555',
  4.4
),
(
  'Thika Inclusive Secondary School',
  'Thika, Blue Post',
  'public',
  ARRAY['Inclusive Education', 'Vocational Training', 'Career Counseling'],
  'Contact: +254-700-666666, info@thikainclusive.sc.ke',
  'Public secondary school with strong commitment to inclusive education and preparing students with disabilities for higher education or employment.',
  'www.thikainclusive.sc.ke',
  'info@thikainclusive.sc.ke',
  '+254-700-666666',
  4.3
),
(
  'Machakos Special Education Center',
  'Machakos, Town',
  'special_needs',
  ARRAY['Intellectual Disabilities Support', 'Physical Therapy', 'Adaptive PE'],
  'Contact: +254-700-777777, info@machakosspecial.ac.ke',
  'Specialized center for children with intellectual and physical disabilities. Focus on functional life skills and community integration.',
  'www.machakosspecial.ac.ke',
  'info@machakosspecial.ac.ke',
  '+254-700-777777',
  4.2
),
(
  'Karen International Academy',
  'Nairobi, Karen',
  'international',
  ARRAY['Cambridge Curriculum', 'Learning Support', 'Gifted Education'],
  'Contact: +254-700-888888, admissions@karenacademy.ac.ke',
  'Premium international school offering Cambridge curriculum with comprehensive learning support services for students with diverse needs.',
  'www.karenacademy.ac.ke',
  'admissions@karenacademy.ac.ke',
  '+254-700-888888',
  4.9
);

-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.
