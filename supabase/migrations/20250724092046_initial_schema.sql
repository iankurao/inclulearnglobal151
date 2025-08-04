-- Initial schema for IncluLearn Global

-- Enable the `uuid-ossp` extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the `health_specialists` table
CREATE TABLE public.health_specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    experience_years INT,
    contact_email TEXT,
    phone_number TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for `health_specialists`
ALTER TABLE public.health_specialists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.health_specialists FOR SELECT USING (TRUE);
CREATE POLICY "Enable insert for authenticated users" ON public.health_specialists FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.health_specialists FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.health_specialists FOR DELETE USING (auth.role() = 'authenticated');

-- Function to update `updated_at` timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for `health_specialists` table
CREATE TRIGGER update_health_specialists_timestamp
BEFORE UPDATE ON public.health_specialists
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
