-- Create the `favorites` table
CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resource_id UUID NOT NULL,
    resource_type TEXT NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, resource_id, resource_type) -- Ensure a user can only favorite an item once
);

-- Set up Row Level Security (RLS) for `favorites`
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable delete for own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);
