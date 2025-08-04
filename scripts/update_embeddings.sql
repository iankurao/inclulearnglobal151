-- This script is intended to be run manually or as part of a CI/CD pipeline
-- after new data is added or existing data is updated in the tables.
-- It assumes the 'generate_embeddings.py' script has been run to populate
-- the 'vector_embedding' column.

-- Example: Update embeddings for a specific health specialist
-- UPDATE health_specialists
-- SET vector_embedding = '[...new_embedding_array...]' -- Replace with actual embedding
-- WHERE id = 'some-specialist-id';

-- Example: Update embeddings for a specific school
-- UPDATE schools
-- SET vector_embedding = '[...new_embedding_array...]' -- Replace with actual embedding
-- WHERE id = 'some-school-id';

-- Example: Update embeddings for a specific outdoor club
-- UPDATE outdoor_clubs
-- SET vector_embedding = '[...new_embedding_array...]' -- Replace with actual embedding
-- WHERE id = 'some-club-id';

-- Function to search for similar documents based on vector embedding
-- This function is defined in supabase/migrations/20250801000000_add_vector_support.sql
-- You can call it like this:
-- SELECT * FROM match_documents(
--   query_embedding := '[0.1, 0.2, 0.3, ...]', -- Replace with embedding of your query
--   match_threshold := 0.78,
--   match_count := 10,
--   table_name := 'health_specialists'
-- );

-- Note: For bulk updates or initial population, it's recommended to use
-- the Python script 'generate_embeddings.py' which automates this process
-- by fetching data, generating embeddings via OpenAI, and updating Supabase.
