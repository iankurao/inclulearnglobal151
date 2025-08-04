"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Activity } from "lucide-react"
import { performVectorSearch } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface OutdoorClub {
  id: string
  name: string
  location: string
  description: string
  activities_offered: string
  contact_email: string
}

export default function OutdoorClubsFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clubs, setClubs] = useState<OutdoorClub[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    setClubs([])
    try {
      const results = await performVectorSearch(searchQuery, "outdoor_clubs", "description")
      setClubs(results as OutdoorClub[])
      if (results.length === 0) {
        toast.info("No outdoor clubs found matching your search.")
      }
    } catch (error) {
      console.error("Failed to search outdoor clubs:", error)
      toast.error("Failed to perform search. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Search Outdoor Clubs
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="e.g., 'hiking club for visually impaired in Rift Valley' or 'adaptive sports club'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </CardContent>
      </Card>

      {clubs.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Card key={club.id}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {club.location}
                </p>
                <p className="flex items-center gap-1">
                  <Activity className="h-4 w-4" /> {club.activities_offered}
                </p>
                <p>{club.description}</p>
                <p className="font-medium">Contact: {club.contact_email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
        </div>
      )}
    </div>
  )
}
