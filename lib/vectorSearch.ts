import { createClient } from "@supabase/supabase-js"
import { OpenAI } from "openai"
import type { Database } from "@/integrations/supabase/types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const openaiApiKey = process.env.OPENAI_API_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey)
const openai = new OpenAI({ apiKey: openaiApiKey })

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  })
  return response.data[0].embedding
}

export async function performVectorSearch(
  query: string,
  table: string,
  column: string,
  match_threshold = 0.78,
  limit = 10,
) {
  try {
    const queryEmbedding = await generateEmbedding(query)

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: match_threshold,
      match_count: limit,
      table_name: table,
      text_column: column, // Pass the text column name to the RPC function
    })

    if (error) {
      console.error("Error performing vector search:", error)
      return []
    }
    return data
  } catch (error) {
    console.error("Error in performVectorSearch:", error)
    return []
  }
}
