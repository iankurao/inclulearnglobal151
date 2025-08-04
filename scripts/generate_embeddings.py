import os
import asyncio
import asyncpg
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Dict, Any
import logging
import openai
from supabase import create_client, Client

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the sentence transformer model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Initialize Supabase client
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Initialize OpenAI client (ensure OPENAI_API_KEY is set in your environment)
openai.api_key = os.environ.get("OPENAI_API_KEY")

async def connect_to_db():
    """Connect to the Supabase PostgreSQL database"""
    try:
        conn = await asyncpg.connect(
            host=os.getenv('SUPABASE_DB_HOST'),
            port=os.getenv('SUPABASE_DB_PORT', 5432),
            user=os.getenv('SUPABASE_DB_USER'),
            password=os.getenv('SUPABASE_DB_PASSWORD'),
            database=os.getenv('SUPABASE_DB_NAME')
        )
        logger.info("Successfully connected to database")
        return conn
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        raise

def generate_embedding(text: str) -> List[float]:
    """Generate embedding for a given text"""
    try:
        embedding = model.encode(text)
        return embedding.tolist()
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        return [0.0] * 384  # Return zero vector as fallback

def get_embedding(text, model="text-embedding-ada-002"):
    """Generates an embedding for the given text using OpenAI's API."""
    text = text.replace("\n", " ")
    return openai.Embedding.create(input=[text], model=model)['data'][0]['embedding']

async def update_health_specialists_embeddings(conn):
    """Update embeddings for health specialists"""
    logger.info("Updating health specialists embeddings...")
    
    # Fetch all health specialists
    rows = await conn.fetch("SELECT id, name, specialty, location, description FROM health_specialists")
    
    for row in rows:
        # Create text for embedding
        text = f"{row['name']} {row['specialty']} {row['location']} {row['description'] or ''}"
        
        # Generate embedding
        embedding = generate_embedding(text)
        
        # Update the record
        await conn.execute(
            "UPDATE health_specialists SET embedding = $1 WHERE id = $2",
            embedding, row['id']
        )
        
        logger.info(f"Updated embedding for health specialist: {row['name']}")

async def update_schools_embeddings(conn):
    """Update embeddings for schools"""
    logger.info("Updating schools embeddings...")
    
    # Fetch all schools
    rows = await conn.fetch("SELECT id, name, type, location, specialties FROM schools")
    
    for row in rows:
        # Create text for embedding
        text = f"{row['name']} {row['type']} {row['location']} {row['specialties'] or ''}"
        
        # Generate embedding
        embedding = generate_embedding(text)
        
        # Update the record
        await conn.execute(
            "UPDATE schools SET embedding = $1 WHERE id = $2",
            embedding, row['id']
        )
        
        logger.info(f"Updated embedding for school: {row['name']}")

async def update_outdoor_clubs_embeddings(conn):
    """Update embeddings for outdoor clubs"""
    logger.info("Updating outdoor clubs embeddings...")
    
    # Fetch all outdoor clubs
    rows = await conn.fetch("SELECT id, name, activity, location, description FROM outdoor_clubs")
    
    for row in rows:
        # Create text for embedding
        text = f"{row['name']} {row['activity']} {row['location']} {row['description'] or ''}"
        
        # Generate embedding
        embedding = generate_embedding(text)
        
        # Update the record
        await conn.execute(
            "UPDATE outdoor_clubs SET embedding = $1 WHERE id = $2",
            embedding, row['id']
        )
        
        logger.info(f"Updated embedding for outdoor club: {row['name']}")

def generate_and_store_embeddings():
    """
    Fetches data from Supabase tables, generates embeddings,
    and updates the respective tables with these embeddings.
    """
    tables_to_process = {
        "health_specialists": ["name", "specialty", "location", "description"],
        "schools": ["name", "type", "location", "specialties"],
        "outdoor_clubs": ["name", "activity", "location", "description"]
    }

    for table_name, fields in tables_to_process.items():
        print(f"Processing table: {table_name}")
        response = supabase.from_(table_name).select("*").execute()
        data = response.data

        if not data:
            print(f"No data found in {table_name}.")
            continue

        for item in data:
            # Concatenate relevant fields to create a single text for embedding
            text_to_embed = " ".join([str(item.get(field, "")) for field in fields if item.get(field) is not None])
            
            if not text_to_embed.strip():
                print(f"Skipping item {item.get('id')} in {table_name} due to empty text for embedding.")
                continue

            try:
                embedding = get_embedding(text_to_embed)
                
                # Update the item with its embedding
                update_response = supabase.from_(table_name).update({"embedding": embedding}).eq("id", item["id"]).execute()
                if update_response.data:
                    print(f"Updated item {item['id']} in {table_name} with embedding.")
                else:
                    print(f"Failed to update item {item['id']} in {table_name}: {update_response.error}")
            except Exception as e:
                print(f"Error generating embedding for item {item.get('id')} in {table_name}: {e}")

async def main():
    """Main function to generate all embeddings"""
    try:
        # Connect to database
        conn = await connect_to_db()
        
        # Update embeddings for all tables
        await update_health_specialists_embeddings(conn)
        await update_schools_embeddings(conn)
        await update_outdoor_clubs_embeddings(conn)
        
        logger.info("All embeddings updated successfully!")
        
    except Exception as e:
        logger.error(f"Error in main function: {e}")
    finally:
        if conn:
            await conn.close()
            logger.info("Database connection closed")

if __name__ == "__main__":
    asyncio.run(main())
    generate_and_store_embeddings()
