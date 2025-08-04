import os
import openai
from supabase import create_client, Client

# Initialize OpenAI client
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Initialize Supabase client
supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

def generate_embedding(text: str):
    response = openai.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding

def update_specialist_embeddings():
    print("Updating health specialist embeddings...")
    response = supabase.from_("health_specialists").select("*").execute()
    specialists = response.data

    for specialist in specialists:
        text_to_embed = f"{specialist['name']} {specialist['specialty']} {specialist['location']} {' '.join(specialist['services'])} {specialist['bio']}"
        embedding = generate_embedding(text_to_embed)
        supabase.from_("health_specialists").update({"vector_embedding": embedding}).eq("id", specialist['id']).execute()
        print(f"Updated embedding for specialist: {specialist['name']}")

def update_school_embeddings():
    print("Updating school embeddings...")
    response = supabase.from_("schools").select("*").execute()
    schools = response.data

    for school in schools:
        text_to_embed = f"{school['name']} {school['location']} {' '.join(school['programs'])} {school['description']}"
        embedding = generate_embedding(text_to_embed)
        supabase.from_("schools").update({"vector_embedding": embedding}).eq("id", school['id']).execute()
        print(f"Updated embedding for school: {school['name']}")

def update_club_embeddings():
    print("Updating outdoor club embeddings...")
    response = supabase.from_("outdoor_clubs").select("*").execute()
    clubs = response.data

    for club in clubs:
        text_to_embed = f"{club['name']} {club['location']} {' '.join(club['activities'])} {club['description']}"
        embedding = generate_embedding(text_to_embed)
        supabase.from_("outdoor_clubs").update({"vector_embedding": embedding}).eq("id", club['id']).execute()
        print(f"Updated embedding for club: {club['name']}")

if __name__ == "__main__":
    update_specialist_embeddings()
    update_school_embeddings()
    update_club_embeddings()
    print("All embeddings updated successfully!")
