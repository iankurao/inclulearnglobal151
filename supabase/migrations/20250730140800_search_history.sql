-- Create the `search_history` table
CREATE TABLE public.search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    search_type TEXT, -- e.g., 'specialist', 'school', 'club'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for `search_history`
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for own search history" ON public.search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for own search history" ON public.search_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable delete for own search history" ON public.search_history FOR DELETE USING (auth.uid() = user_id);
