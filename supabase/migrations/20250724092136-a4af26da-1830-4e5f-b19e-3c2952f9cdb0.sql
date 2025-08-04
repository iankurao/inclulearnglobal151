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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for schools
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Public schools are viewable by everyone."
ON public.schools FOR SELECT
USING (true);

-- Policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert schools."
ON public.schools FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update their own records (assuming user_id column for ownership)
CREATE POLICY "Authenticated users can update their own schools."
ON public.schools FOR UPDATE
USING (auth.uid() = user_id); -- Placeholder: replace 'user_id' with actual user_id column if exists

-- Policy for authenticated users to delete their own records
CREATE POLICY "Authenticated users can delete their own schools."
ON public.schools FOR DELETE
USING (auth.uid() = user_id); -- Placeholder: replace 'user_id' with actual user_id column if exists

-- This is an empty migration file.
-- It serves as a placeholder for the schools schema update.
-- The actual schema creation is handled in `supabase/complete_setup.sql`.
