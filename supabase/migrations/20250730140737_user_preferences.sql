-- Create the `user_preferences` table
CREATE TABLE public.user_preferences (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    preferred_specialties TEXT[],
    preferred_locations TEXT[],
    preferred_school_type TEXT,
    preferred_activity_type TEXT,
    notification_settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for `user_preferences`
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Enable insert for own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Enable update for own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Enable delete for own preferences" ON public.user_preferences FOR DELETE USING (auth.uid() = id);

-- Trigger for `user_preferences` table
CREATE TRIGGER update_user_preferences_timestamp
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
