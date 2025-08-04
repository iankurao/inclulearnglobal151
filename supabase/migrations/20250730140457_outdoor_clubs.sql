-- Create the `outdoor_clubs` table
CREATE TABLE public.outdoor_clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- e.g., "Hiking", "Art Therapy", "Sports"
    location TEXT NOT NULL,
    age_group TEXT, -- e.g., "Children", "Teens", "Adults", "All Ages"
    schedule TEXT,
    contact_email TEXT,
    phone_number TEXT,
    website TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for `outdoor_clubs`
ALTER TABLE public.outdoor_clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users on outdoor_clubs" ON public.outdoor_clubs FOR SELECT USING (TRUE);
CREATE POLICY "Enable insert for authenticated users on outdoor_clubs" ON public.outdoor_clubs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users on outdoor_clubs" ON public.outdoor_clubs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users on outdoor_clubs" ON public.outdoor_clubs FOR DELETE USING (auth.role() = 'authenticated');

-- Trigger for `outdoor_clubs` table
CREATE TRIGGER update_outdoor_clubs_timestamp
BEFORE UPDATE ON public.outdoor_clubs
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
