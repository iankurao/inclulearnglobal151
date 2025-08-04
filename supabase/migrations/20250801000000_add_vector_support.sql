-- This migration adds vector support to the database.
-- It enables the `vector` extension and adds `embedding` columns to relevant tables.

-- Enable the `vector` extension
CREATE EXTENSION IF NOT EXISTS "vector";

-- Add embedding column to `health_specialists` table if it doesn't exist
DO $$ BEGIN
    ALTER TABLE public.health_specialists ADD COLUMN embedding VECTOR(1536);
EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'column embedding already exists in health_specialists.';
END $$;

-- Add embedding column to `schools` table if it doesn't exist
DO $$ BEGIN
    ALTER TABLE public.schools ADD COLUMN embedding VECTOR(1536);
EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'column embedding already exists in schools.';
END $$;

-- Add embedding column to `outdoor_clubs` table if it doesn't exist
DO $$ BEGIN
    ALTER TABLE public.outdoor_clubs ADD COLUMN embedding VECTOR(1536);
EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'column embedding already exists in outdoor_clubs.';
END $$;

-- Create a function for vector similarity search
CREATE OR REPLACE FUNCTION public.match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  _table text,
  _column text
)
RETURNS TABLE (
  id uuid,
  name text,
  location text,
  specialty text, -- For health_specialists
  education_level text, -- For schools
  activity_type text, -- For outdoor_clubs
  contact_email text,
  phone_number text,
  description text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY EXECUTE format('
    SELECT
      id,
      name,
      location,
      %s, -- This will be specialty, education_level, or activity_type
      contact_email,
      phone_number,
      description,
      1 - (embedding <=> $1) AS similarity
    FROM
      public.%I
    WHERE
      1 - (embedding <=> $1) > $2
    ORDER BY
      similarity DESC
    LIMIT $3',
    CASE _table
      WHEN 'health_specialists' THEN 'specialty'
      WHEN 'schools' THEN 'education_level'
      WHEN 'outdoor_clubs' THEN 'activity_type'
      ELSE 'NULL' -- Fallback if table name doesn't match
    END,
    _table
  )
  USING query_embedding, match_threshold, match_count;
END;
$$;

-- Optional: Create a function to generate embeddings (if done directly in DB)
-- This would typically call an external AI service via a Supabase Edge Function
-- For demonstration, this is a placeholder.
CREATE OR REPLACE FUNCTION public.generate_embedding(text_input TEXT)
RETURNS VECTOR(1536)
LANGUAGE plpgsql
AS $$
DECLARE
  embedding_result VECTOR(1536);
BEGIN
  -- In a real scenario, this would call an external AI service (e.g., OpenAI)
  -- via a Supabase Edge Function or a custom API.
  -- For now, return a dummy embedding or raise an error if not implemented.
  RAISE EXCEPTION 'Embedding generation function not implemented yet. Use external script.';
  -- SELECT ARRAY(SELECT random() FROM generate_series(1, 1536))::VECTOR(1536) INTO embedding_result;
  -- RETURN embedding_result;
END;
$$;
