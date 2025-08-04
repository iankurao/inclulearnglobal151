-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.

-- Create search_history table
CREATE TABLE public.search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    search_type TEXT NOT NULL, -- e.g., 'health_specialist', 'school', 'outdoor_club'
    results_count INT,
    searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for search_history
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own search history
CREATE POLICY "Users can view their own search history."
ON public.search_history FOR SELECT
USING (auth.uid() = user_id);

-- Policy for users to insert their own search history
CREATE POLICY "Users can insert their own search history."
ON public.search_history FOR INSERT
WITH CHECK (auth.uid() = user_id);
