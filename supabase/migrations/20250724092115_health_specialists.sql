-- Create health_specialists table
CREATE TABLE public.health_specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    description TEXT,
    contact_email TEXT,
    phone_number TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for health_specialists
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Public health_specialists are viewable by everyone."
ON public.health_specialists FOR SELECT
USING (true);

-- Policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert health_specialists."
ON public.health_specialists FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update their own records (assuming user_id column for ownership)
-- Note: This policy assumes there's a 'user_id' column in 'health_specialists' linking to auth.users.id
-- If specialists are not directly users, this policy might need adjustment or removal.
CREATE POLICY "Authenticated users can update their own health_specialists."
ON public.health_specialists FOR UPDATE
USING (auth.uid() = id); -- Placeholder: replace 'id' with actual user_id column if exists

-- Policy for authenticated users to delete their own records
CREATE POLICY "Authenticated users can delete their own health_specialists."
ON public.health_specialists FOR DELETE
USING (auth.uid() = id); -- Placeholder: replace 'id' with actual user_id column if exists
