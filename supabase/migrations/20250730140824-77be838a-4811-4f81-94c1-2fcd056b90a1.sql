-- Create favorites table
CREATE TABLE public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL,
    resource_type TEXT NOT NULL, -- 'health_specialist', 'school', 'outdoor_club'
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, resource_id, resource_type) -- Prevent duplicate favorites
);

-- Enable Row Level Security (RLS) for favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own favorites
CREATE POLICY "Users can view their own favorites."
ON public.favorites FOR SELECT
USING (auth.uid() = user_id);

-- Policy for users to insert their own favorites
CREATE POLICY "Users can insert their own favorites."
ON public.favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own favorites
CREATE POLICY "Users can delete their own favorites."
ON public.favorites FOR DELETE
USING (auth.uid() = user_id);

-- This migration file is now linked to the favorites schema update.
-- The actual schema creation is handled in `supabase/complete_setup.sql`.
