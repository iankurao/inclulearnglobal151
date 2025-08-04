-- This script is intended to be run manually or via a tool that can execute SQL.
-- It assumes the `generate_embeddings.py` script has already populated the `vector_embedding` columns.
-- This SQL script is primarily for demonstrating how to update embeddings if needed directly via SQL,
-- but the Python script is the primary method for initial generation.

-- Example: Update a single health specialist's embedding (replace with actual data)
-- UPDATE health_specialists
-- SET vector_embedding = '[0.1, 0.2, 0.3, ...]' -- Replace with actual embedding array
-- WHERE id = 'some-specialist-id';

-- Example: Update a single school's embedding (replace with actual data)
-- UPDATE schools
-- SET vector_embedding = '[0.4, 0.5, 0.6, ...]' -- Replace with actual embedding array
-- WHERE id = 'some-school-id';

-- Example: Update a single outdoor club's embedding (replace with actual data)
-- UPDATE outdoor_clubs
-- SET vector_embedding = '[0.7, 0.8, 0.9, ...]' -- Replace with actual embedding array
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
