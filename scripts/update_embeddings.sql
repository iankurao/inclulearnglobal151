-- This script is intended to be run manually or as part of a CI/CD pipeline
-- after new data is inserted or existing data is updated in the tables.
-- It re-generates embeddings for records that have null embeddings or
-- if you want to refresh all embeddings.

-- Function to update embeddings for health_specialists
CREATE OR REPLACE FUNCTION update_health_specialist_embeddings()
RETURNS TRIGGER AS $$
DECLARE
    text_to_embed TEXT;
    new_embedding VECTOR(1536);
BEGIN
    text_to_embed := NEW.name || ' ' || NEW.specialty || ' ' || NEW.location || ' ' || array_to_string(NEW.services, ' ') || ' ' || NEW.bio;
    -- Call your embedding generation service here.
    -- For demonstration, we'll assume a placeholder or a direct call if possible.
    -- In a real application, this would likely be an edge function or a backend service.
    -- Example: SELECT generate_embedding(text_to_embed) INTO new_embedding;
    -- For now, we'll just set it to NULL or a dummy value if not integrated.
    -- You would replace this with actual embedding generation logic.
    -- For local testing, you might run the Python script.
    -- new_embedding := (SELECT embedding FROM generate_embedding_service(text_to_embed));
    
    -- Placeholder: In a real scenario, you'd call an external service or a Supabase Edge Function
    -- to get the actual embedding. For this SQL script, we'll just ensure the field is handled.
    -- If you're running the Python script, this trigger might not be strictly necessary for initial population.
    
    -- If the embedding is not provided or is null, you might want to skip or handle it.
    IF NEW.embedding IS NULL THEN
        -- This part would typically involve calling an external service.
        -- For a pure SQL solution, you'd need a way to call an external API or a PL/pgSQL function
        -- that can interact with an embedding service. This is usually done via Supabase Edge Functions.
        RAISE WARNING 'Embedding for health_specialist % is NULL. Please run embedding generation script.', NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace trigger for health_specialists
CREATE OR REPLACE TRIGGER trg_update_health_specialist_embeddings
BEFORE INSERT OR UPDATE OF name, specialty, location, services, bio ON health_specialists
FOR EACH ROW EXECUTE FUNCTION update_health_specialist_embeddings();


-- Function to update embeddings for schools
CREATE OR REPLACE FUNCTION update_school_embeddings()
RETURNS TRIGGER AS $$
DECLARE
    text_to_embed TEXT;
    new_embedding VECTOR(1536);
BEGIN
    text_to_embed := NEW.name || ' ' || NEW.location || ' ' || array_to_string(NEW.programs, ' ') || ' ' || NEW.description;
    
    IF NEW.embedding IS NULL THEN
        RAISE WARNING 'Embedding for school % is NULL. Please run embedding generation script.', NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace trigger for schools
CREATE OR REPLACE TRIGGER trg_update_school_embeddings
BEFORE INSERT OR UPDATE OF name, location, programs, description ON schools
FOR EACH ROW EXECUTE FUNCTION update_school_embeddings();


-- Function to update embeddings for outdoor_clubs
CREATE OR REPLACE FUNCTION update_outdoor_club_embeddings()
RETURNS TRIGGER AS $$
DECLARE
    text_to_embed TEXT;
    new_embedding VECTOR(1536);
BEGIN
    text_to_embed := NEW.name || ' ' || NEW.location || ' ' || array_to_string(NEW.activities, ' ') || ' ' || NEW.description;
    
    IF NEW.embedding IS NULL THEN
        RAISE WARNING 'Embedding for outdoor_club % is NULL. Please run embedding generation script.', NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace trigger for outdoor_clubs
CREATE OR REPLACE TRIGGER trg_update_outdoor_club_embeddings
BEFORE INSERT OR UPDATE OF name, location, activities, description ON outdoor_clubs
FOR EACH ROW EXECUTE FUNCTION update_outdoor_club_embeddings();

-- Note: These triggers are set up to warn if embeddings are NULL.
-- In a production environment, you would integrate with an actual embedding service
-- (e.g., via a Supabase Edge Function or a backend service) to generate and
-- insert the embeddings automatically on data changes.
-- The Python script `generate_embeddings.py` can be used for initial population
-- and batch updates.
