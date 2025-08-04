"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { performVectorSearch } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface OutdoorClub {
  id: string
  name: string
  activity_type: string
  location: string
  contact_email?: string
  phone_number?: string
  description?: string
}

export default function OutdoorClubsFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clubs, setClubs] = useState<OutdoorClub[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.info("Please enter a search query.")
      return
    }
    setLoading(true)
    try {
      const results = await performVectorSearch(searchQuery, "outdoor_clubs", "description")
      setClubs(results as OutdoorClub[])
      if (results.length === 0) {
        toast.info("No outdoor clubs found matching your query.")
      } else {
        toast.success(`${results.length} outdoor clubs found!`)
      }
    } catch (error) {
      console.error("Error searching for outdoor clubs:", error)
      toast.error("Failed to search for outdoor clubs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Find Outdoor Clubs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by activity, location, or needs (e.g., 'hiking club Nairobi inclusive')"
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

        {clubs.length > 0 && (
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Search Results:</h3>
            {clubs.map((club) => (
              <Card key={club.id} className="p-4">
                <CardTitle className="text-xl">{club.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {club.activity_type} - {club.location}
                </p>
                {club.description && <p className="mt-2 text-sm">{club.description}</p>}
                <div className="mt-2 text-sm">
                  {club.contact_email && <p>Email: {club.contact_email}</p>}
                  {club.phone_number && <p>Phone: {club.phone_number}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
