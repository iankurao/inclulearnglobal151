import { OpenAI } from "openai"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/integrations/supabase/types"

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
  tableName: keyof Database["public"]["Tables"],
  matchCount = 5,
): Promise<T[]> {
  const supabase = createClient()
  try {
    const queryEmbedding = await generateEmbedding(query)

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold: 0.78, // Adjust as needed
      match_count: matchCount,
      _table: tableName, // Pass table name to the RPC function
      _column: "embedding", // Assuming the embedding column is named 'embedding'
    })

    if (error) {
      console.error(`Error searching vector database for ${tableName}:`, error)
      throw new Error(`Failed to search ${tableName} in vector database.`)
    }

    // The RPC function returns a generic structure, we need to cast it
    // and potentially fetch full data if the RPC only returns IDs/similarity
    const resultsWithSimilarity = data as { id: string; similarity: number }[]

    // Fetch full records based on IDs, maintaining order by similarity
    if (resultsWithSimilarity.length > 0) {
      const ids = resultsWithSimilarity.map((r) => r.id)
      const { data: fullRecords, error: fetchError } = await supabase.from(tableName).select("*").in("id", ids)

      if (fetchError) {
        console.error(`Error fetching full records for ${tableName}:`, fetchError)
        throw new Error(`Failed to fetch full records for ${tableName}.`)
      }

      // Re-sort the full records based on the similarity order from the RPC
      const orderedRecords = resultsWithSimilarity
        .map((result) => fullRecords?.find((record: any) => record.id === result.id))
        .filter(Boolean) as T[]

      return orderedRecords
    }

    return [] as T[]
  } catch (error) {
    console.error("Error in searchVectorDatabase:", error)
    throw error
  }
}
