"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Search, MapPin, Users, Calendar } from "lucide-react"

export default function OutdoorClubsFlow() {
  const [activity, setActivity] = useState("")
  const [location, setLocation] = useState("")
  const [ageGroup, setAgeGroup] = useState("Any")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults([]) // Clear previous results
    toast.info("Searching for outdoor and social clubs...")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockResults = [
      {
        id: 1,
        name: "Nature Explorers Club",
        activity: "Hiking, Nature Walks",
        location: "Nairobi National Park",
        ageGroup: "All Ages",
        schedule: "Weekends",
        contact: "info@natureexplorers.org",
        description: "A club dedicated to exploring Kenya's natural beauty through guided hikes and nature walks.",
      },
      {
        id: 2,
        name: "Art & Play Collective",
        activity: "Art Therapy, Sensory Play",
        location: "Karen, Nairobi",
        ageGroup: "Children (5-12)",
        schedule: "Afternoons, weekdays",
        contact: "artplay@example.com",
        description: "Creative and sensory-rich activities for children with diverse needs.",
      },
      {
        id: 3,
        name: "Inclusive Sports League",
        activity: "Football, Basketball",
        location: "Mombasa Sports Club",
        ageGroup: "Teens (13-18)",
        schedule: "Saturdays",
        contact: "sports@inclusiveleague.co.ke",
        description: "A league promoting inclusive sports for teenagers of all abilities.",
      },
    ].filter((club) => {
      const matchesActivity = activity ? club.activity.toLowerCase().includes(activity.toLowerCase()) : true
      const matchesLocation = location ? club.location.toLowerCase().includes(location.toLowerCase()) : true
      const matchesAgeGroup = ageGroup ? club.ageGroup.toLowerCase().includes(ageGroup.toLowerCase()) : true
      return matchesActivity && matchesLocation && matchesAgeGroup
    })

    setResults(mockResults)
    setLoading(false)
    if (mockResults.length > 0) {
      toast.success(`Found ${mockResults.length} clubs!`)
    } else {
      toast.info("No clubs found matching your criteria.")
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Find Outdoor & Social Clubs
          </CardTitle>
          <CardDescription>Search for recreational activities, sports, and social groups.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="activity">Activity Type</Label>
              <Input
                id="activity"
                placeholder="e.g., Hiking, Art, Sports"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Nairobi, Kisumu"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ageGroup">Age Group</Label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger id="ageGroup">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="Children (0-12)">Children (0-12)</SelectItem>
                  <SelectItem value="Teens (13-18)">Teens (13-18)</SelectItem>
                  <SelectItem value="Adults (18+)">Adults (18+)</SelectItem>
                  <SelectItem value="All Ages">All Ages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Searching..." : "Search Clubs"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((club) => (
            <Card key={club.id}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" /> {club.activity}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {club.location}
                </p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {club.schedule} ({club.ageGroup})
                </p>
                <Textarea value={club.description} readOnly className="mt-2 h-24 resize-none" />
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Club
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
