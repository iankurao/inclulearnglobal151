import OpenAI from "openai"
import { createClient } from "@/app/lib/supabase/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error("Error generating embedding:", error)
    throw new Error("Failed to generate embedding.")
  }
}

export async function searchVectorDatabase<T>(
  query: string,
  tableName: string,
  matchThreshold = 0.78,
  matchCount = 10,
): Promise<T[]> {
  const supabase = createClient()
  const match_threshold = matchThreshold
  const match_count = matchCount

  try {
    const queryEmbedding = await generateEmbedding(query)

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold,
      match_count,
      table_name: tableName,
    })

    if (error) {
      console.error(`Error searching ${tableName}:`, error)
      throw error
    }

    return data as T[]
  } catch (error) {
    console.error("Error in searchVectorDatabase:", error)
    throw new Error(`Failed to search ${tableName} in vector database.`)
  }
}
