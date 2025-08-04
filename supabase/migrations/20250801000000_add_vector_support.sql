-- Enable pg_vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to health_specialists table
ALTER TABLE public.health_specialists
ADD COLUMN embedding vector(1536); -- Assuming OpenAI's text-embedding-ada-002 which has 1536 dimensions

-- Add embedding column to schools table
ALTER TABLE public.schools
ADD COLUMN embedding vector(1536);

-- Add embedding column to outdoor_clubs table
ALTER TABLE public.outdoor_clubs
ADD COLUMN embedding vector(1536);

-- Create a function for vector search on health_specialists
CREATE OR REPLACE FUNCTION match_health_specialists (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  specialty TEXT,
  location TEXT,
  contact_info TEXT,
  description TEXT,
  services TEXT[],
  qualifications TEXT[],
  experience_years INT,
  rating NUMERIC(2,1),
  website TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    name,
    specialty,
    location,
    contact_info,
    description,
    services,
    qualifications,
    experience_years,
    rating,
    website,
    email,
    phone,
    created_at,
    updated_at,
    1 - (health_specialists.embedding <=> query_embedding) AS similarity
  FROM
    health_specialists
  WHERE
    1 - (health_specialists.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;

-- Create a function for vector search on schools
CREATE OR REPLACE FUNCTION match_schools (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  location TEXT,
  specialization TEXT,
  programs TEXT[],
  contact_info TEXT,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  rating NUMERIC(2,1),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    name,
    location,
    specialization,
    programs,
    contact_info,
    description,
    website,
    email,
    phone,
    rating,
    created_at,
    updated_at,
    1 - (schools.embedding <=> query_embedding) AS similarity
  FROM
    schools
  WHERE
    1 - (schools.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;

-- Create a function for vector search on outdoor_clubs
CREATE OR REPLACE FUNCTION match_outdoor_clubs (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  activity TEXT,
  location TEXT,
  schedule TEXT,
  age_group TEXT,
  contact_info TEXT,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  rating NUMERIC(2,1),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    name,
    activity,
    location,
    schedule,
    age_group,
    contact_info,
    description,
    website,
    email,
    phone,
    rating,
    created_at,
    updated_at,
    1 - (outdoor_clubs.embedding <=> query_embedding) AS similarity
  FROM
    outdoor_clubs
  WHERE
    1 - (outdoor_clubs.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT match_count;
END;
$$;
