-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS health_specialists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    specialty TEXT,
    location TEXT,
    services TEXT[],
    bio TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
