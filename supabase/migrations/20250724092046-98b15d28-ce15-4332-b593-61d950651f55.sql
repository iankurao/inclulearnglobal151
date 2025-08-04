-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  phone TEXT,
  location TEXT,
  user_type TEXT CHECK (user_type IN ('parent', 'health_specialist')) NOT NULL DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, user_type)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'parent')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create health specialists table
CREATE TABLE public.health_specialists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  speciality TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  experience_years INTEGER,
  rating DECIMAL(2,1) DEFAULT 0.0,
  fees TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for health specialists
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

-- Create policy for health specialists (readable by all authenticated users)
CREATE POLICY "Health specialists are viewable by authenticated users" 
ON public.health_specialists 
FOR SELECT 
TO authenticated
USING (true);

-- Insert sample health specialists data
INSERT INTO public.health_specialists (name, speciality, location, phone, email, experience_years, rating, fees, description) VALUES
('Dr. Sarah Mwangi', 'Speech Therapy', 'Nairobi', '+254 711 123456', 'sarah.mwangi@email.com', 8, 4.8, 'KSh 3,000/session', 'Specialized in autism spectrum disorder and speech development'),
('Dr. James Kiprotich', 'Occupational Therapy', 'Mombasa', '+254 722 234567', 'james.kiprotich@email.com', 12, 4.7, 'KSh 2,500/session', 'Expert in sensory integration and adaptive skills training'),
('Dr. Grace Wanjiku', 'Behavioral Therapy', 'Kisumu', '+254 733 345678', 'grace.wanjiku@email.com', 6, 4.9, 'KSh 4,000/session', 'Specialized in ADHD and behavioral intervention strategies'),
('Dr. Michael Ochieng', 'Physical Therapy', 'Nakuru', '+254 744 456789', 'michael.ochieng@email.com', 10, 4.6, 'KSh 2,800/session', 'Expert in cerebral palsy and motor development'),
('Dr. Ruth Njeri', 'Psychological Assessment', 'Eldoret', '+254 755 567890', 'ruth.njeri@email.com', 15, 4.8, 'KSh 5,000/assessment', 'Comprehensive psychological evaluations for learning disabilities'),
('Dr. Peter Makau', 'Audiologist', 'Thika', '+254 766 678901', 'peter.makau@email.com', 7, 4.5, 'KSh 3,500/session', 'Hearing assessments and auditory processing support');

-- This is an empty migration file.
-- It serves as a placeholder for future schema changes.
-- You can add SQL statements here to modify your database schema.
