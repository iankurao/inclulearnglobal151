"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, CalendarDays } from "lucide-react"
import { useState } from "react"

export default function OutdoorClubsFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [activity, setActivity] = useState("")

  const handleSearch = () => {
    console.log("Searching outdoor clubs with:", { searchQuery, location, activity })
    // Implement actual search logic here
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Join Inclusive Outdoor Clubs</CardTitle>
        <CardDescription>Participate in outdoor activities designed for children with special needs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by club name or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Location (e.g., Nakuru)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Activity (e.g., Hiking, Swimming)"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="w-full">
          Search Clubs
        </Button>
        <div className="mt-6 text-center text-gray-500">
          <p>Search results will appear here.</p>
          {/* Placeholder for search results */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Nature Explorers Club</CardTitle>
                <CardDescription>Inclusive Hiking Group</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Aberdare National Park, Kenya</p>
                <p className="text-sm text-gray-600">Monthly excursions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Aqua Buddies</CardTitle>
                <CardDescription>Adaptive Swimming Lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Diani Beach, Kenya</p>
                <p className="text-sm text-gray-600">Weekly sessions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
