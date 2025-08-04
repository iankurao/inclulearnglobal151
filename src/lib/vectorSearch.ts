// Generate embeddings using HuggingFace API (free tier)
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // For demo purposes, we'll use a simple text-to-vector conversion
    // In production, you'd use a proper embedding service
    const response = await fetch(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true },
        }),
      },
    )

    if (!response.ok) {
      // Fallback to simple hash-based embedding for demo
      return generateSimpleEmbedding(text)
    }

    const embedding = await response.json()
    return Array.isArray(embedding[0]) ? embedding[0] : embedding
  } catch (error) {
    console.error("Error generating embedding:", error)
    return generateSimpleEmbedding(text)
  }
}

// Simple fallback embedding generation
function generateSimpleEmbedding(text: string): number[] {
  const embedding = new Array(384).fill(0)
  for (let i = 0; i < text.length && i < 384; i++) {
    embedding[i] = text.charCodeAt(i) / 255 - 0.5
  }
  return embedding
}

// Create search query from form data
export function createSearchQuery(formData: any, category: string): string {
  const parts = []

  if (formData.childAge) parts.push(`child age ${formData.childAge}`)
  if (formData.disabilityType?.length) parts.push(formData.disabilityType.join(" "))
  if (formData.therapyType?.length) parts.push(formData.therapyType.join(" "))
  if (formData.schoolType) parts.push(formData.schoolType)
  if (formData.activityType?.length) parts.push(formData.activityType.join(" "))
  if (formData.interests?.length) parts.push(formData.interests.join(" "))
  if (formData.location) parts.push(formData.location)
  if (formData.supportNeeds?.length) parts.push(formData.supportNeeds.join(" "))
  if (formData.languagePreference?.length) parts.push(formData.languagePreference.join(" "))

  return parts.join(" ")
}

// Calculate match percentage from similarity score
export function calculateMatchPercentage(similarity: number): number {
  return Math.round(similarity * 100)
}

// Generate AI reasoning for recommendations
export function generateAIReasoning(item: any, searchQuery: string, similarity: number): string {
  const matchPercentage = calculateMatchPercentage(similarity)

  const reasons = []

  if (item.location && searchQuery.toLowerCase().includes(item.location.toLowerCase())) {
    reasons.push(`located in your preferred area (${item.location})`)
  }

  if (item.specialty && searchQuery.toLowerCase().includes(item.specialty.toLowerCase())) {
    reasons.push(`specializes in ${item.specialty}`)
  }

  if (item.type && searchQuery.toLowerCase().includes(item.type.toLowerCase())) {
    reasons.push(`offers ${item.type} services`)
  }

  if (matchPercentage > 80) {
    reasons.push("excellent match for your requirements")
  } else if (matchPercentage > 60) {
    reasons.push("good match for your needs")
  } else {
    reasons.push("suitable option based on your criteria")
  }

  return `This is a ${matchPercentage}% match because it ${reasons.join(", ")}.`
}
