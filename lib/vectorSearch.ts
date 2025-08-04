import { createClient } from "@/lib/supabase/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error("Error generating embedding:", error)
    throw error
  }
}

export async function searchVectorDatabase(query: string, matchCount = 5) {
  const supabase = createClient()
  try {
    const queryEmbedding = await generateEmbedding(query)

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold: 0.78, // Adjust as needed
      match_count: matchCount,
    })

    if (error) {
      console.error("Error searching vector database:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in searchVectorDatabase:", error)
    throw error
  }
}
