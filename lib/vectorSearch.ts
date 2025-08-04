import { createClient } from "./supabase"

const supabase = createClient()

export async function searchHealthSpecialists(query: string) {
  const { data, error } = await supabase.rpc("match_health_specialists", {
    query_embedding: await getEmbedding(query),
    match_threshold: 0.78, // Adjust as needed
    match_count: 10,
  })
  if (error) {
    console.error("Error searching health specialists:", error)
    return []
  }
  return data
}

export async function searchSchools(query: string) {
  const { data, error } = await supabase.rpc("match_schools", {
    query_embedding: await getEmbedding(query),
    match_threshold: 0.78, // Adjust as needed
    match_count: 10,
  })
  if (error) {
    console.error("Error searching schools:", error)
    return []
  }
  return data
}

export async function searchOutdoorClubs(query: string) {
  const { data, error } = await supabase.rpc("match_outdoor_clubs", {
    query_embedding: await getEmbedding(query),
    match_threshold: 0.78, // Adjust as needed
    match_count: 10,
  })
  if (error) {
    console.error("Error searching outdoor clubs:", error)
    return []
  }
  return data
}

async function getEmbedding(text: string): Promise<number[]> {
  // This is a placeholder for an actual embedding generation service.
  // In a real application, you would call an AI model (e.g., OpenAI, Cohere)
  // to generate the embedding for the given text.
  console.warn("Using dummy embedding. Replace with actual AI model integration.")
  // Dummy embedding for demonstration purposes
  const dummyEmbedding = Array(1536).fill(0.1) // Example: OpenAI's text-embedding-ada-002 produces 1536 dimensions
  return dummyEmbedding
}
