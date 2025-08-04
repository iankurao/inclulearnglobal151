"use server"

import { createClient } from "@/app/lib/supabase/server"
import { generateEmbedding, searchVectorDatabase } from "@/app/lib/vectorSearch"
import type { Database } from "@/app/integrations/supabase/types"

// Define types for database tables
type HealthSpecialist = Database["public"]["Tables"]["health_specialists"]["Row"]
type School = Database["public"]["Tables"]["schools"]["Row"]
type OutdoorClub = Database["public"]["Tables"]["outdoor_clubs"]["Row"]

// --- Health Specialist Actions ---
export async function searchHealthSpecialists(query: string) {
  try {
    const results = await searchVectorDatabase<HealthSpecialist>(query, "health_specialists")
    return { data: results, error: null }
  } catch (error: any) {
    console.error("Error in searchHealthSpecialists action:", error)
    return { data: null, error: { message: error.message || "Failed to search health specialists." } }
  }
}

export async function addHealthSpecialist(specialistData: {
  name: string
  specialty: string
  location: string
  services: string[]
  bio: string
  contact_email: string
  contact_phone: string
}) {
  const supabase = createClient()
  try {
    const textToEmbed = `${specialistData.name} ${specialistData.specialty} ${specialistData.location} ${specialistData.services.join(" ")} ${specialistData.bio}`
    const embedding = await generateEmbedding(textToEmbed)

    const { data, error } = await supabase
      .from("health_specialists")
      .insert({
        ...specialistData,
        embedding: embedding as any, // Cast to any because Supabase types might not perfectly match vector type
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    console.error("Error in addHealthSpecialist action:", error)
    return { data: null, error: { message: error.message || "Failed to add health specialist." } }
  }
}

// --- School Actions ---
export async function searchSchools(query: string) {
  try {
    const results = await searchVectorDatabase<School>(query, "schools")
    return { data: results, error: null }
  } catch (error: any) {
    console.error("Error in searchSchools action:", error)
    return { data: null, error: { message: error.message || "Failed to search schools." } }
  }
}

export async function addSchool(schoolData: {
  name: string
  location: string
  programs: string[]
  description: string
  contact_email: string
  contact_phone: string
}) {
  const supabase = createClient()
  try {
    const textToEmbed = `${schoolData.name} ${schoolData.location} ${schoolData.programs.join(" ")} ${schoolData.description}`
    const embedding = await generateEmbedding(textToEmbed)

    const { data, error } = await supabase
      .from("schools")
      .insert({
        ...schoolData,
        embedding: embedding as any,
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    console.error("Error in addSchool action:", error)
    return { data: null, error: { message: error.message || "Failed to add school." } }
  }
}

// --- Outdoor Club Actions ---
export async function searchOutdoorClubs(query: string) {
  try {
    const results = await searchVectorDatabase<OutdoorClub>(query, "outdoor_clubs")
    return { data: results, error: null }
  } catch (error: any) {
    console.error("Error in searchOutdoorClubs action:", error)
    return { data: null, error: { message: error.message || "Failed to search outdoor clubs." } }
  }
}

export async function addOutdoorClub(clubData: {
  name: string
  location: string
  activities: string[]
  description: string
  contact_email: string
  contact_phone: string
}) {
  const supabase = createClient()
  try {
    const textToEmbed = `${clubData.name} ${clubData.location} ${clubData.activities.join(" ")} ${clubData.description}`
    const embedding = await generateEmbedding(textToEmbed)

    const { data, error } = await supabase
      .from("outdoor_clubs")
      .insert({
        ...clubData,
        embedding: embedding as any,
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    console.error("Error in addOutdoorClub action:", error)
    return { data: null, error: { message: error.message || "Failed to add outdoor club." } }
  }
}

// --- Auth Actions (if needed, though useAuth hook handles most) ---
// Example: Server Action for sign out if you want to trigger it from a form
export async function signOutAction() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error signing out:", error)
    return { success: false, message: error.message }
  }
  return { success: true, message: "Signed out successfully." }
}
