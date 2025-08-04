"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Briefcase, Star } from "lucide-react"
import { performVectorSearch } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface Specialist {
  id: string
  name: string
  specialty: string
  location: string
  description: string
  services_offered: string
  rating: number
}

export default function HealthSpecialistFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    setSpecialists([])
    try {
      const results = await performVectorSearch(searchQuery, "health_specialists", "description")
      setSpecialists(results as Specialist[])
      if (results.length === 0) {
        toast.info("No health specialists found matching your search.")
      }
    } catch (error) {
      console.error("Failed to search health specialists:", error)
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
            <Search className="h-5 w-5" /> Search Health Specialists
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="e.g., 'pediatrician for autism in Nairobi' or 'speech therapist for children'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </CardContent>
      </Card>

      {specialists.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {specialists.map((specialist) => (
            <Card key={specialist.id}>
              <CardHeader>
                <CardTitle>{specialist.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {specialist.specialty}
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {specialist.location}
                </p>
                <p className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {specialist.rating.toFixed(1)}
                </p>
                <p>{specialist.description}</p>
                <p className="font-medium">Services: {specialist.services_offered}</p>
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
