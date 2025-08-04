-- Create schools table
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
  FOR UPDATE USING (auth.role() = 'authenticated'); -- Updated to check role instead of user_id

CREATE POLICY "Authenticated users can delete their own schools." ON public.schools
  FOR DELETE USING (auth.role() = 'authenticated'); -- Updated to check role instead of user_id

-- Trigger for schools table
CREATE TRIGGER update_schools_timestamp
BEFORE UPDATE ON public.schools
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Insert sample data
INSERT INTO public.schools (
  name, location, type, special_needs_support, curriculum, contact_email, phone_number, website, description
) VALUES 
(
  'Nairobi Special Needs Academy',
  'Nairobi, Westlands',
  'Special Needs School',
  'Autism Spectrum',
  'IB Program',
  'info@nairobisna.ac.ke',
  '+254-700-111111',
  'www.nairobisna.ac.ke',
  'Specialized school for children with autism, ADHD, and other developmental disabilities. Small class sizes with individualized education plans.'
),
(
  'Mombasa Inclusive Primary School',
  'Mombasa, Nyali',
  'Primary',
  'ADHD',
  'Cambridge Curriculum',
  'info@mombasainclusive.sc.ke',
  '+254-700-222222',
  'www.mombasainclusive.sc.ke',
  'Public school with strong inclusive education program. Welcomes children with disabilities alongside typical peers.'
),
(
  'Kisumu International School',
  'Kisumu, Milimani',
  'International',
  'Learning Disabilities',
  'IB Program',
  'admissions@kisumuint.ac.ke',
  '+254-700-333333',
  'www.kisumuint.ac.ke',
  'International school offering IB curriculum with comprehensive special education services and support for diverse learners.'
),
(
  'Eldoret Community School',
  'Eldoret, Kapsoya',
  'Private',
  'Learning Disabilities',
  'Cambridge Curriculum',
  'info@eldoretcommunity.sc.ke',
  '+254-700-444444',
  'www.eldoretcommunity.sc.ke',
  'Community-focused private school with dedicated support for children with learning disabilities and behavioral challenges.'
),
(
  'Nakuru Autism Center School',
  'Nakuru, Milimani',
  'Special Needs School',
  'Autism Spectrum',
  'IB Program',
  'info@nakuruautism.ac.ke',
  '+254-700-555555',
  'www.nakuruautism.ac.ke',
  'Specialized school exclusively for children with autism spectrum disorders. Evidence-based interventions and family support.'
),
(
  'Thika Inclusive Secondary School',
  'Thika, Blue Post',
  'Secondary',
  'ADHD',
  'Cambridge Curriculum',
  'info@thikainclusive.sc.ke',
  '+254-700-666666',
  'www.thikainclusive.sc.ke',
  'Public secondary school with strong commitment to inclusive education and preparing students with disabilities for higher education or employment.'
),
(
  'Machakos Special Education Center',
  'Machakos, Town',
  'Special Needs School',
  'Intellectual and Physical Disabilities',
  'IB Program',
  'info@machakosspecial.ac.ke',
  '+254-700-777777',
  'www.machakosspecial.ac.ke',
  'Specialized center for children with intellectual and physical disabilities. Focus on functional life skills and community integration.'
),
(
  'Karen International Academy',
  'Nairobi, Karen',
  'International',
  'Learning Disabilities',
  'Cambridge Curriculum',
  'admissions@karenacademy.ac.ke',
  '+254-700-888888',
  'www.karenacademy.ac.ke',
  'Premium international school offering Cambridge curriculum with comprehensive learning support services for students with diverse needs.'
);

-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.
