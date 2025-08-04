-- Update health specialists with embeddings (example - you would run this after generating embeddings)
-- This is a template - actual embeddings would come from the Python script

-- Update existing health specialists with sample embeddings
UPDATE health_specialists 
SET embedding = '[0.1, 0.2, 0.3, 0.4, 0.5]'::vector
WHERE name = 'Dr. Sarah Mwangi';

-- Create function to update embeddings from JSON data
CREATE OR REPLACE FUNCTION update_embeddings_from_json(
    table_name text,
    json_data jsonb
) RETURNS void AS $$
DECLARE
    item jsonb;
BEGIN
    FOR item IN SELECT * FROM jsonb_array_elements(json_data)
    LOOP
        IF table_name = 'health_specialists' THEN
            UPDATE health_specialists 
            SET embedding = (item->>'embedding')::vector
            WHERE name = item->>'name';
        ELSIF table_name = 'schools' THEN
            UPDATE schools 
            SET embedding = (item->>'embedding')::vector  
            WHERE name = item->>'name';
        ELSIF table_name = 'outdoor_clubs' THEN
            UPDATE outdoor_clubs
            SET embedding = (item->>'embedding')::vector
            WHERE name = item->>'name';
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Example usage (you would call this with actual JSON data from Python script):
-- SELECT update_embeddings_from_json('health_specialists', '[{"name": "Dr. Sarah Mwangi", "embedding": [0.1, 0.2, ...]}]'::jsonb);
