-- This is an auto-generated migration file by Supabase CLI.
-- It's typically used for schema changes.
-- The content is usually specific to your database state at the time of generation.
-- For a complete setup, refer to `supabase/complete_setup.sql`.

-- Create user_preferences table
CREATE TABLE public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    preferred_specialties TEXT[],
    preferred_locations TEXT[],
    notification_settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own preferences
CREATE POLICY "Users can view their own preferences."
ON public.user_preferences FOR SELECT
USING (auth.uid() = user_id);

-- Policy for users to insert their own preferences
CREATE POLICY "Users can insert their own preferences."
ON public.user_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own preferences
CREATE POLICY "Users can update their own preferences."
ON public.user_preferences FOR UPDATE
USING (auth.uid() = user_id);

-- This is an empty migration file.
-- It serves as a placeholder for future schema changes.
-- You can add SQL statements here to modify your database schema.

-- /** rest of code here **/
