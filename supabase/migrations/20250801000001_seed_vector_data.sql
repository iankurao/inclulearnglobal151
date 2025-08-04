-- This migration is for seeding initial vector data.
-- It's typically run after the `add_vector_support.sql` migration.

-- You would typically run a script (e.g., a Python script) to generate embeddings
-- for your existing data and then insert/update them into the respective tables.

-- Example of updating embeddings for existing data (conceptual, not direct SQL execution):
-- For health_specialists:
-- UPDATE public.health_specialists
-- SET description_embedding = generate_embedding(description) -- assuming generate_embedding is a function or external process
-- WHERE description_embedding IS NULL;

-- For schools:
-- UPDATE public.schools
-- SET description_embedding = generate_embedding(description)
-- WHERE description_embedding IS NULL;

-- For outdoor_clubs:
-- UPDATE public.outdoor_clubs
-- SET description_embedding = generate_embedding(description)
-- WHERE description_embedding IS NULL;

-- In a real application, you would run the `scripts/generate_embeddings.py`
-- script to populate these columns with actual embeddings.

-- Example data for health_specialists
INSERT INTO public.health_specialists (name, specialty, location, contact_email, phone_number, description, embedding)
VALUES
('Dr. Jane Doe', 'Pediatric Physical Therapist', 'Nairobi', 'jane.doe@example.com', '+254712345678', 'Specializes in early intervention and motor development for children with cerebral palsy and Down syndrome.', '[...embedding array...]'),
('Mr. John Smith', 'Occupational Therapist', 'Mombasa', 'john.smith@example.com', '+254723456789', 'Focuses on sensory integration and daily living skills for children with autism spectrum disorder.', '[...embedding array...]'),
('Ms. Emily White', 'Speech-Language Pathologist', 'Kisumu', 'emily.white@example.com', '+254734567890', 'Works with children and adults on communication disorders, including stuttering and articulation.', '[...embedding array...]'),
('Dr. Alex Green', 'Developmental Pediatrician', 'Nairobi', 'alex.green@example.com', '+254745678901', 'Provides comprehensive developmental assessments and management plans for children with complex needs.', '[...embedding array...]');

-- Example data for schools
INSERT INTO public.schools (name, location, education_level, contact_email, phone_number, description, embedding)
VALUES
('Bright Minds Academy', 'Nairobi', 'Primary', 'info@brightminds.ke', '+254700112233', 'An inclusive primary school with dedicated special education needs support units and trained staff.', '[...embedding array...]'),
('Coastal Learning Centre', 'Mombasa', 'Special Needs', 'admin@coastallearning.ke', '+254701223344', 'A specialized center offering individualized education programs for children with intellectual disabilities and learning difficulties.', '[...embedding array...]'),
('Highland Inclusive School', 'Eldoret', 'Secondary', 'contact@highlandinclusive.ke', '+254702334455', 'Provides a mainstream curriculum with integrated support for students with physical disabilities and visual impairments.', '[...embedding array...]');

-- Example data for outdoor_clubs
INSERT INTO public.outdoor_clubs (name, activity_type, location, contact_email, phone_number, description, embedding)
VALUES
('Nairobi Nature Explorers', 'Nature Walks', 'Nairobi', 'explorers@example.com', '+254750111222', 'An outdoor club organizing accessible nature walks and birdwatching for all abilities, including wheelchair-friendly trails.', '[...embedding array...]'),
('Mountain Adventurers Kenya', 'Hiking', 'Nakuru', 'adventures@example.com', '+254751222333', 'Offers guided hiking trips with adaptive equipment and support for individuals with mobility challenges.', '[...embedding array...]'),
('Lake Victoria Kayaking Club', 'Kayaking', 'Kisumu', 'kayak@example.com', '+254752333444', 'Provides adaptive kayaking lessons and tours on Lake Victoria, welcoming participants of all physical abilities.', '[...embedding array...]');

-- IMPORTANT: After inserting data, you must run the `scripts/generate_embeddings.py`
-- or a similar process to populate the `embedding` columns.
-- For example, if using the Python script:
-- python scripts/generate_embeddings.py
