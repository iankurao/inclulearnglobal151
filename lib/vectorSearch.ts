import { createClient } from "@supabase/supabase-js"
import OpenAI from "openai"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const openaiApiKey = process.env.OPENAI_API_KEY // Use server-side key

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const openai = new OpenAI({ apiKey: openaiApiKey })

export async function generateEmbedding(text: string) {
  if (!openaiApiKey) {
    console.error("OPENAI_API_KEY is not set. Cannot generate embeddings.")
    return null
  }
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error("Error generating embedding:", error)
    return null
  }
}

export async function searchHealthSpecialists(query: string) {
  const embedding = await generateEmbedding(query)
  if (!embedding) return []

  const { data, error } = await supabase.rpc("match_health_specialists", {
    query_embedding: embedding,
    match_threshold: 0.78, // Adjust as needed
    match_count: 10,
  })
  if (error) console.error("Error searching health specialists:", error)
  return data
}

export async function searchSchools(query: string) {
  const embedding = await generateEmbedding(query)
  if (!embedding) return []

  const { data, error } = await supabase.rpc("match_schools", {
    query_embedding: embedding,
    match_threshold: 0.78, // Adjust as needed
    match_count: 10,
  })
  if (error) console.error("Error searching schools:", error)
  return data
}

export async function searchOutdoorClubs(query: string) {
  const embedding = await generateEmbedding(query)
  if (!embedding) return []

  const { data, error } = await supabase.rpc("match_outdoor_clubs", {
    query_embedding: embedding,
    match_threshold: 0.78, // Adjust as needed
    match_count: 10,
  })
  if (error) console.error("Error searching outdoor clubs:", error)
  return data
}
