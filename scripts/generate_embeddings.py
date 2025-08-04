import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    raise ValueError("Supabase URL and Anon Key must be set in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Dummy function to simulate embedding generation
# In a real scenario, you would use an actual AI model API (e.g., OpenAI, Cohere)
async def get_embedding(text: str) -> list[float]:
    print(f"Generating dummy embedding for: {text[:50]}...")
    # Replace this with actual API call to an embedding model
    # Example:
    # from openai import OpenAI
    # client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    # response = client.embeddings.create(input=[text], model="text-embedding-ada-002")
    # return response.data[0].embedding
    return [0.1] * 1536 # Return a dummy embedding of 1536 dimensions

async def generate_and_upload_embeddings():
    # Health Specialists
    health_specialists_data = [
        {"id": 1, "name": "Dr. Jane Doe", "specialty": "Pediatric Occupational Therapist", "location": "Nairobi", "experience": "10+ years"},
        {"id": 2, "name": "Mr. John Smith", "specialty": "Speech-Language Pathologist", "location": "Mombasa", "experience": "7 years"},
        {"id": 3, "name": "Ms. Emily White", "specialty": "Physical Therapist", "location": "Kisumu", "experience": "12 years"},
    ]
    for specialist in health_specialists_data:
        text_to_embed = f"{specialist['name']} is a {specialist['specialty']} with {specialist['experience']} experience, located in {specialist['location']}."
        embedding = await get_embedding(text_to_embed)
        response = supabase.table("health_specialists").update({"embedding": embedding}).eq("id", specialist["id"]).execute()
        if response.data:
            print(f"Updated embedding for health specialist {specialist['name']}")
        else:
            print(f"Error updating embedding for health specialist {specialist['name']}: {response.error}")

    # Schools
    schools_data = [
        {"id": 1, "name": "Bright Future Academy", "specialization": "Autism Spectrum Disorder", "location": "Nairobi", "programs": "Early Intervention, Primary"},
        {"id": 2, "name": "Inclusive Learning Center", "specialization": "Down Syndrome, Learning Disabilities", "location": "Kisumu", "programs": "Primary, Secondary"},
        {"id": 3, "name": "Hope Springs School", "specialization": "Cerebral Palsy, Physical Disabilities", "location": "Mombasa", "programs": "Therapeutic Education"},
    ]
    for school in schools_data:
        text_to_embed = f"{school['name']} specializes in {school['specialization']} with programs like {school['programs']}, located in {school['location']}."
        embedding = await get_embedding(text_to_embed)
        response = supabase.table("schools").update({"embedding": embedding}).eq("id", school["id"]).execute()
        if response.data:
            print(f"Updated embedding for school {school['name']}")
        else:
            print(f"Error updating embedding for school {school['name']}: {response.error}")

    # Outdoor Clubs
    outdoor_clubs_data = [
        {"id": 1, "name": "Nature Explorers Club", "activity": "Hiking & Nature Walks", "location": "Karura Forest, Nairobi", "schedule": "Saturdays", "age_group": "5-12 years"},
        {"id": 2, "name": "Adaptive Sports League", "activity": "Wheelchair Basketball", "location": "Moi International Sports Centre, Kasarani", "schedule": "Sundays", "age_group": "All ages"},
        {"id": 3, "name": "Sensory Garden Club", "activity": "Gardening & Sensory Play", "location": "Arboretum, Nairobi", "schedule": "Wednesdays", "age_group": "3-8 years"},
    ]
    for club in outdoor_clubs_data:
        text_to_embed = f"{club['name']} offers {club['activity']} activities on {club['schedule']} for {club['age_group']} in {club['location']}."
        embedding = await get_embedding(text_to_embed)
        response = supabase.table("outdoor_clubs").update({"embedding": embedding}).eq("id", club["id"]).execute()
        if response.data:
            print(f"Updated embedding for outdoor club {club['name']}")
        else:
            print(f"Error updating embedding for outdoor club {club['name']}: {response.error}")

if __name__ == "__main__":
    import asyncio
    asyncio.run(generate_and_upload_embeddings())
