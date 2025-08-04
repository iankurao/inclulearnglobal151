import os
import openai
from supabase import create_client, Client

# Initialize Supabase client
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Initialize OpenAI client (ensure OPENAI_API_KEY is set in your environment)
openai.api_key = os.environ.get("OPENAI_API_KEY")

def generate_embedding(text: str):
    """Generates an embedding for the given text using OpenAI's API."""
    try:
        response = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response['data'][0]['embedding']
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return None

def update_embeddings_for_table(table_name: str, text_column: str):
    """
    Fetches data from a Supabase table, generates embeddings for a specified text column,
    and updates the table with these embeddings.
    """
    print(f"Processing table: {table_name}")
    response = supabase.from_(table_name).select('id, ' + text_column).execute()
    data = response.data

    if not data:
        print(f"No data found in {table_name}.")
        return

    for row in data:
        item_id = row['id']
        text_to_embed = row[text_column]
        
        if text_to_embed:
            embedding = generate_embedding(text_to_embed)
            if embedding:
                update_response = supabase.from_(table_name).update({'embedding': embedding}).eq('id', item_id).execute()
                if update_response.data:
                    print(f"Updated embedding for {table_name} ID: {item_id}")
                else:
                    print(f"Failed to update embedding for {table_name} ID: {item_id}: {update_response.error}")
            else:
                print(f"Skipping {table_name} ID: {item_id} due to embedding generation failure.")
        else:
            print(f"Skipping {table_name} ID: {item_id} due to empty text in column '{text_column}'.")

if __name__ == "__main__":
    # Example usage for different tables
    update_embeddings_for_table('health_specialists', 'description')
    update_embeddings_for_table('schools', 'description')
    update_embeddings_for_table('outdoor_clubs', 'description')
    print("Embedding generation process completed.")
