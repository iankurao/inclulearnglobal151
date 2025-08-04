"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { performVectorSearch } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface HealthSpecialist {
  id: string
  name: string
  specialty: string
  location: string
  contact_email?: string
  phone_number?: string
  description?: string
}

export default function HealthSpecialistFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialists, setSpecialists] = useState<HealthSpecialist[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.info("Please enter a search query.")
      return
    }
    setLoading(true)
    try {
      const results = await performVectorSearch(searchQuery, "health_specialists", "description")
      setSpecialists(results as HealthSpecialist[])
      if (results.length === 0) {
        toast.info("No specialists found matching your query.")
      } else {
        toast.success(`${results.length} specialists found!`)
      }
    } catch (error) {
      console.error("Error searching for specialists:", error)
      toast.error("Failed to search for specialists. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Find Health Specialists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by specialty, location, or needs (e.g., 'pediatric physical therapist Nairobi autism')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {specialists.length > 0 && (
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Search Results:</h3>
            {specialists.map((specialist) => (
              <Card key={specialist.id} className="p-4">
                <CardTitle className="text-xl">{specialist.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {specialist.specialty} - {specialist.location}
                </p>
                {specialist.description && <p className="mt-2 text-sm">{specialist.description}</p>}
                <div className="mt-2 text-sm">
                  {specialist.contact_email && <p>Email: {specialist.contact_email}</p>}
                  {specialist.phone_number && <p>Phone: {specialist.phone_number}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
