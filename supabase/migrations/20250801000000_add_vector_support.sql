-- Enable vector extension for AI similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding columns to existing tables
ALTER TABLE health_specialists ADD COLUMN IF NOT EXISTS embedding VECTOR(384);
ALTER TABLE schools ADD COLUMN IF NOT EXISTS embedding VECTOR(384);
ALTER TABLE outdoor_clubs ADD COLUMN IF NOT EXISTS embedding VECTOR(384);

-- Create indexes for vector similarity search
CREATE INDEX IF NOT EXISTS health_specialists_embedding_idx ON health_specialists 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS schools_embedding_idx ON schools 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS outdoor_clubs_embedding_idx ON outdoor_clubs 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create function for vector similarity search
CREATE OR REPLACE FUNCTION search_health_specialists_by_vector(
  query_embedding VECTOR(384),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  specialty TEXT,
  location TEXT,
  description TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.id,
    h.name,
    h.specialty,
    h.location,
    h.description,
    1 - (h.embedding <=> query_embedding) AS similarity
  FROM health_specialists h
  WHERE h.embedding IS NOT NULL
    AND 1 - (h.embedding <=> query_embedding) > match_threshold
  ORDER BY h.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create function for schools vector search
CREATE OR REPLACE FUNCTION search_schools_by_vector(
  query_embedding VECTOR(384),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  type TEXT,
  location TEXT,
  description TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.type,
    s.location,
    s.description,
    1 - (s.embedding <=> query_embedding) AS similarity
  FROM schools s
  WHERE s.embedding IS NOT NULL
    AND 1 - (s.embedding <=> query_embedding) > match_threshold
  ORDER BY s.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create function for outdoor clubs vector search
CREATE OR REPLACE FUNCTION search_outdoor_clubs_by_vector(
  query_embedding VECTOR(384),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  type TEXT,
  location TEXT,
  description TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.name,
    o.type,
    o.location,
    o.description,
    1 - (o.embedding <=> query_embedding) AS similarity
  FROM outdoor_clubs o
  WHERE o.embedding IS NOT NULL
    AND 1 - (o.embedding <=> query_embedding) > match_threshold
  ORDER BY o.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
