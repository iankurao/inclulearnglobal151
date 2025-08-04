-- Create the `user_preferences` table
CREATE TABLE public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    preferred_specialty TEXT,
    preferred_location TEXT,
    preferred_school_type TEXT,
    preferred_activity_type TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for `user_preferences`
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable update for own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Enable delete for own preferences" ON public.user_preferences FOR DELETE USING (auth.uid() = user_id);

-- Trigger for `user_preferences` table
CREATE TRIGGER update_user_preferences_timestamp
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
