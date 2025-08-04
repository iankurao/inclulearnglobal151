-- This is a migration file. Its content should be managed by Supabase CLI.
-- It's typically a timestamped file for schema changes.
create table public.outdoor_clubs (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  activity_type text,
  description text,
  contact_email text,
  phone_number text,
  address text,
  city text,
  state text,
  zip_code text,
  country text,
  website text,
  created_at timestamp with time zone default now()
);
