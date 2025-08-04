"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Users, Calendar } from "lucide-react"

export default function OutdoorClubsFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [activityType, setActivityType] = useState("")

  const handleSearch = () => {
    console.log("Searching outdoor clubs with:", { searchTerm, location, activityType })
    // Implement actual search logic here
  }

  const clubs = [
    {
      id: 1,
      name: "Nature Explorers Club",
      activity: "Hiking & Nature Walks",
      location: "Karura Forest, Nairobi",
      schedule: "Saturdays",
      ageGroup: "5-12 years",
    },
    {
      id: 2,
      name: "Adaptive Sports League",
      activity: "Wheelchair Basketball",
      location: "Moi International Sports Centre, Kasarani",
      schedule: "Sundays",
      ageGroup: "All ages",
    },
    {
      id: 3,
      name: "Sensory Garden Club",
      activity: "Gardening & Sensory Play",
      location: "Arboretum, Nairobi",
      schedule: "Wednesdays",
      ageGroup: "3-8 years",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Inclusive Outdoor Clubs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by club name or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Location (e.g., Nairobi)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Activity Type (e.g., Hiking)"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search Clubs
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <Card key={club.id}>
            <CardHeader>
              <CardTitle>{club.name}</CardTitle>
              <p className="text-sm text-gray-500">{club.activity}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {club.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {club.schedule}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {club.ageGroup}
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
