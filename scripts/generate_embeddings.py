import os
import openai
from supabase import create_client, Client

# Initialize Supabase client
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Initialize OpenAI client
openai.api_key = os.environ.get("OPENAI_API_KEY")

async def generate_embedding(text: str):
    response = await openai.Embedding.acreate(
        model="text-embedding-ada-002",
        input=text
    )
    return response["data"][0]["embedding"]

async def update_embeddings_for_table(table_name: str, text_fields: list):
    print(f"Updating embeddings for {table_name}...")
    response = supabase.from(table_name).select("*").execute()
    records = response.data

    for record in records:
        text_to_embed = " ".join([str(record.get(field, "")) for field in text_fields])
        embedding = await generate_embedding(text_to_embed)
        
        supabase.from(table_name).update({"embedding": embedding}).eq("id", record["id"]).execute()
        print(f"Updated embedding for {table_name} ID: {record['id']}")

async def main():
    # Define text fields for each table to be embedded
    await update_embeddings_for_table("health_specialists", ["name", "specialty", "location", "services", "bio"])
    await update_embeddings_for_table("schools", ["name", "location", "programs", "description"])
    await update_embeddings_for_table("outdoor_clubs", ["name", "location", "activities", "description"])
    print("All embeddings updated.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
