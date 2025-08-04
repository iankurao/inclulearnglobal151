import os
import openai
from supabase import create_client, Client

# Initialize Supabase client
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") # Use service role key for server-side operations
supabase: Client = create_client(url, key)

# Initialize OpenAI client (ensure OPENAI_API_KEY is set in environment variables)
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

def update_embeddings_for_table(table_name: str, text_column: str, embedding_column: str):
    """
    Fetches data from a Supabase table, generates embeddings for a specified text column,
    and updates the corresponding embedding column.
    """
    print(f"Processing table: {table_name}")
    try:
        # Fetch data from the table
        response = supabase.from(table_name).select(f"id, {text_column}").execute()
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
                    # Update the row with the new embedding
                    update_response = supabase.from(table_name).update({embedding_column: embedding}).eq("id", item_id).execute()
                    if update_response.data:
                        print(f"Updated embedding for {table_name} ID: {item_id}")
                    else:
                        print(f"Failed to update embedding for {table_name} ID: {item_id}. Error: {update_response.error}")
                else:
                    print(f"Skipping {table_name} ID: {item_id} due to embedding generation failure.")
            else:
                print(f"Skipping {table_name} ID: {item_id} due to empty text in {text_column}.")

    except Exception as e:
        print(f"An error occurred while processing table {table_name}: {e}")

if __name__ == "__main__":
    # Example usage for different tables
    # Ensure your environment variables (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY) are set.

    # For health_specialists
    update_embeddings_for_table("health_specialists", "description", "description_embedding")

    # For schools
    update_embeddings_for_table("schools", "description", "description_embedding")

    # For outdoor_clubs
    update_embeddings_for_table("outdoor_clubs", "description", "description_embedding")

    print("Embedding generation process completed.")
