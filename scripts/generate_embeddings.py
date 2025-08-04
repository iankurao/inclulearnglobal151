import os
from supabase import create_client, Client
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(dotenv_path='.env.local')

# Initialize Supabase client
supabase_url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_service_role_key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(supabase_url, supabase_service_role_key)

# Initialize OpenAI client
openai_api_key: str = os.environ.get("OPENAI_API_KEY")
openai_client = OpenAI(api_key=openai_api_key)

def generate_embedding(text: str) -> list[float]:
    """Generates an embedding for the given text using OpenAI."""
    response = openai_client.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding

async def update_embeddings_for_table(table_name: str, text_columns: list[str]):
    """
    Fetches data from a table, generates embeddings for specified text columns,
    and updates the 'vector_embedding' column.
    """
    print(f"Processing table: {table_name}")
    
    # Fetch data
    response = supabase.from(table_name).select("*").execute()
    data = response.data
    
    if not data:
        print(f"No data found in {table_name}.")
        return

    for row in data:
        # Concatenate text from specified columns
        text_to_embed = " ".join([str(row.get(col, "")) for col in text_columns if row.get(col) is not None])
        
        if not text_to_embed.strip():
            print(f"Skipping row {row['id']} in {table_name}: No text to embed.")
            continue

        try:
            embedding = generate_embedding(text_to_embed)
            
            # Update the row with the new embedding
            update_response = supabase.from(table_name).update({
                "vector_embedding": embedding
            }).eq("id", row["id"]).execute()
            
            if update_response.data:
                print(f"Updated embedding for row {row['id']} in {table_name}.")
            else:
                print(f"Failed to update embedding for row {row['id']} in {table_name}: {update_response.error}")
        except Exception as e:
            print(f"Error generating embedding for row {row['id']} in {table_name}: {e}")

async def main():
    # Define tables and their text columns for embedding
    tables_to_process = {
        "health_specialists": ["name", "specialty", "description", "services_offered"],
        "schools": ["name", "location", "description", "specialization"],
        "outdoor_clubs": ["name", "location", "description", "activities_offered"]
    }

    for table, columns in tables_to_process.items():
        await update_embeddings_for_table(table, columns)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
