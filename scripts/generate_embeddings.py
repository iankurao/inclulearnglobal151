import os
import asyncio
import asyncpg
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Dict, Any
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the sentence transformer model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

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

async def update_health_specialists_embeddings(conn):
    """Update embeddings for health specialists"""
    logger.info("Updating health specialists embeddings...")
    
    # Fetch all health specialists
    rows = await conn.fetch("SELECT id, name, specialty, description FROM health_specialists")
    
    for row in rows:
        # Create text for embedding
        text = f"{row['name']} {row['specialty']} {row['description'] or ''}"
        
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
    rows = await conn.fetch("SELECT id, name, type, description FROM schools")
    
    for row in rows:
        # Create text for embedding
        text = f"{row['name']} {row['type']} {row['description'] or ''}"
        
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
    rows = await conn.fetch("SELECT id, name, type, description FROM outdoor_clubs")
    
    for row in rows:
        # Create text for embedding
        text = f"{row['name']} {row['type']} {row['description'] or ''}"
        
        # Generate embedding
        embedding = generate_embedding(text)
        
        # Update the record
        await conn.execute(
            "UPDATE outdoor_clubs SET embedding = $1 WHERE id = $2",
            embedding, row['id']
        )
        
        logger.info(f"Updated embedding for outdoor club: {row['name']}")

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
