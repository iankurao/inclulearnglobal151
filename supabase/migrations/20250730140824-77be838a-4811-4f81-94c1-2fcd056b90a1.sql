-- Drop the existing constraint
ALTER TABLE public.profiles DROP CONSTRAINT profiles_user_type_check;

-- Add the updated constraint with all valid user types including "clubs"
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type = ANY (ARRAY['parent'::text, 'health_specialist'::text, 'schools'::text, 'clubs'::text]));
