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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for outdoor_clubs
ALTER TABLE public.outdoor_clubs ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Public outdoor_clubs are viewable by everyone."
ON public.outdoor_clubs FOR SELECT
USING (true);

-- Policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert outdoor_clubs."
ON public.outdoor_clubs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update their own records (assuming user_id column for ownership)
CREATE POLICY "Authenticated users can update their own outdoor_clubs."
ON public.outdoor_clubs FOR UPDATE
USING (auth.uid() = id); -- Placeholder: replace 'id' with actual user_id column if exists

-- Policy for authenticated users to delete their own records
CREATE POLICY "Authenticated users can delete their own outdoor_clubs."
ON public.outdoor_clubs FOR DELETE
USING (auth.uid() = id); -- Placeholder: replace 'id' with actual user_id column if exists

-- This is an empty migration file.
-- It serves as a placeholder for future schema changes.
-- You can add SQL statements here to modify your database schema.
