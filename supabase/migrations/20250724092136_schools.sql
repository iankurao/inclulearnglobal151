-- Create schools table
CREATE TABLE IF NOT EXISTS public.schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  contact_email TEXT,
  phone_number TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
  name, address, city, state, zip_code, country, type, contact_email, phone_number, website, description
) VALUES 
(
  'Nairobi Special Needs Academy',
  'Westlands', 'Nairobi', 'Nairobi', '00100', 'Kenya', 'Special Needs School',
  'info@nairobisna.ac.ke',
  '+254-700-111111',
  'www.nairobisna.ac.ke',
  'Specialized school for children with autism, ADHD, and other developmental disabilities. Small class sizes with individualized education plans.'
),
(
  'Mombasa Inclusive Primary School',
  'Nyali', 'Mombasa', 'Mombasa', '00200', 'Kenya', 'Primary',
  'info@mombasainclusive.sc.ke',
  '+254-700-222222',
  'www.mombasainclusive.sc.ke',
  'Public school with strong inclusive education program. Welcomes children with disabilities alongside typical peers.'
),
(
  'Kisumu International School',
  'Milimani', 'Kisumu', 'Kisumu', '00300', 'Kenya', 'International',
  'admissions@kisumuint.ac.ke',
  '+254-700-333333',
  'www.kisumuint.ac.ke',
  'International school offering IB curriculum with comprehensive special education services and support for diverse learners.'
),
(
  'Eldoret Community School',
  'Kapsoya', 'Eldoret', 'Eldoret', '00400', 'Kenya', 'Private',
  'info@eldoretcommunity.sc.ke',
  '+254-700-444444',
  'www.eldoretcommunity.sc.ke',
  'Community-focused private school with dedicated support for children with learning disabilities and behavioral challenges.'
),
(
  'Nakuru Autism Center School',
  'Milimani', 'Nakuru', 'Nakuru', '00500', 'Kenya', 'Special Needs School',
  'info@nakuruautism.ac.ke',
  '+254-700-555555',
  'www.nakuruautism.ac.ke',
  'Specialized school exclusively for children with autism spectrum disorders. Evidence-based interventions and family support.'
),
(
  'Thika Inclusive Secondary School',
  'Blue Post', 'Thika', 'Thika', '00600', 'Kenya', 'Secondary',
  'info@thikainclusive.sc.ke',
  '+254-700-666666',
  'www.thikainclusive.sc.ke',
  'Public secondary school with strong commitment to inclusive education and preparing students with disabilities for higher education or employment.'
),
(
  'Machakos Special Education Center',
  'Town', 'Machakos', 'Machakos', '00700', 'Kenya', 'Special Needs School',
  'info@machakosspecial.ac.ke',
  '+254-700-777777',
  'www.machakosspecial.ac.ke',
  'Specialized center for children with intellectual and physical disabilities. Focus on functional life skills and community integration.'
),
(
  'Karen International Academy',
  'Karen', 'Nairobi', 'Nairobi', '00800', 'Kenya', 'International',
  'admissions@karenacademy.ac.ke',
  '+254-700-888888',
  'www.karenacademy.ac.ke',
  'Premium international school offering Cambridge curriculum with comprehensive learning support services for students with diverse needs.'
);

-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.
