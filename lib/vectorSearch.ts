interface FormData {
  childAge: string
  disabilityType: string[]
  therapyType: string[]
  location: string
  supportNeeds: string[]
  languagePreference: string[]
  budgetRange: string
}

export function createSearchQuery(formData: FormData, category: string): string {
  const parts = []

  if (formData.childAge) {
    parts.push(`child age ${formData.childAge} years`)
  }

  if (formData.disabilityType.length > 0) {
    parts.push(`disability types: ${formData.disabilityType.join(", ")}`)
  }

  if (formData.therapyType.length > 0) {
    parts.push(`therapy services: ${formData.therapyType.join(", ")}`)
  }

  if (formData.location) {
    parts.push(`location: ${formData.location}`)
  }

  if (formData.supportNeeds.length > 0) {
    parts.push(`support needs: ${formData.supportNeeds.join(", ")}`)
  }

  if (formData.languagePreference.length > 0) {
    parts.push(`languages: ${formData.languagePreference.join(", ")}`)
  }

  if (formData.budgetRange) {
    parts.push(`budget: ${formData.budgetRange}`)
  }

  return parts.join(". ")
}

export async function generateEmbedding(text: string): Promise<number[]> {
  // For now, return a mock embedding
  // In production, you'd call OpenAI or another embedding service
  return new Array(1536).fill(0).map(() => Math.random())
}

export function calculateMatchPercentage(similarity: number): number {
  return Math.round(similarity * 100)
}

export function generateAIReasoning(specialist: any, query: string, similarity: number): string {
  const matchPercentage = calculateMatchPercentage(similarity)
  return `This specialist is a ${matchPercentage}% match based on your requirements. They offer relevant services and are located in your preferred area.`
}

// This file would contain logic for vector search, e.g., using Supabase pg_vector
// For now, it's a placeholder as the core issue is authentication.

export async function performVectorSearch(query: string, tableName: string) {
  console.log(`Performing vector search for "${query}" in table "${tableName}"`)
  // Example:
  // const { data, error } = await supabase.rpc('match_documents', {
  //   query_embedding: your_embedding_function(query),
  //   match_threshold: 0.7,
  //   match_count: 10,
  //   table_name: tableName,
  // });
  // if (error) console.error('Vector search error:', error);
  // return data;
  return [] // Return empty array for now
}
