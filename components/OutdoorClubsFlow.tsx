"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Filter, Users, Calendar } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OutdoorClub {
  id: string
  name: string
  activity: string
  location: string
  ageRange: string
  frequency: string
  inclusiveFeatures: string[]
  image: string
}

const mockOutdoorClubs: OutdoorClub[] = [
  {
    id: "1",
    name: "Nature Explorers Club",
    activity: "Hiking & Nature Walks",
    location: "Karura Forest, Nairobi",
    ageRange: "6-12 years",
    frequency: "Weekly",
    inclusiveFeatures: ["Sensory-friendly trails", "Wheelchair accessible paths", "Trained support staff"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Adventure Seekers",
    activity: "Camping & Outdoor Games",
    location: "Naivasha",
    ageRange: "10-16 years",
    frequency: "Monthly",
    inclusiveFeatures: ["Adapted equipment", "Quiet zones", "One-on-one support available"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Aqua Fun Club",
    activity: "Swimming & Water Sports",
    location: "Mombasa",
    ageRange: "5-14 years",
    frequency: "Bi-weekly",
    inclusiveFeatures: ["Heated pool", "Accessible changing rooms", "Life vests for all abilities"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Green Thumbs Gardeners",
    activity: "Gardening & Farm Visits",
    location: "Limuru",
    ageRange: "4-10 years",
    frequency: "Weekly",
    inclusiveFeatures: ["Raised garden beds", "Visual schedules", "Therapeutic activities"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function OutdoorClubsFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [activityFilter, setActivityFilter] = useState("all")
  const [ageRangeFilter, setAgeRangeFilter] = useState("all")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredClubs = mockOutdoorClubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.activity.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || club.location === locationFilter
    const matchesActivity = activityFilter === "all" || club.activity === activityFilter
    const matchesAgeRange = ageRangeFilter === "all" || club.ageRange === ageRangeFilter

    return matchesSearch && matchesLocation && matchesActivity && matchesAgeRange
  })

  const uniqueLocations = Array.from(new Set(mockOutdoorClubs.map((c) => c.location)))
  const uniqueActivities = Array.from(new Set(mockOutdoorClubs.map((c) => c.activity)))
  const uniqueAgeRanges = Array.from(new Set(mockOutdoorClubs.map((c) => c.ageRange)))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Filters
            <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(!filtersOpen)}>
              <Filter className="w-5 h-5" />
              <span className="sr-only">Toggle filters</span>
            </Button>
          </CardTitle>
          <CardDescription>Refine your search for outdoor clubs.</CardDescription>
        </CardHeader>
        <CardContent className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-6`}>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="Search by name or activity"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Type</Label>
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                {uniqueActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age-range">Age Range</Label>
            <Select value={ageRangeFilter} onValueChange={setAgeRangeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Age Ranges</SelectItem>
                {uniqueAgeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={() => setFiltersOpen(false)}>
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {filteredClubs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-600">
              No outdoor clubs found matching your criteria.
            </CardContent>
          </Card>
        ) : (
          filteredClubs.map((club) => (
            <Card key={club.id}>
              <CardContent className="flex flex-col md:flex-row items-start md:items-center p-6 gap-4">
                <img
                  src={club.image || "/placeholder.svg"}
                  alt={club.name}
                  className="w-full md:w-32 h-32 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{club.name}</h3>
                  <p className="text-blue-600 font-medium">{club.activity}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {club.location}
                  </p>
                  <p className="text-gray-700 text-sm flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Age Range: {club.ageRange}
                  </p>
                  <p className="text-gray-700 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Frequency: {club.frequency}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Inclusive Features:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {club.inclusiveFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button className="mt-4 md:mt-0">Learn More</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
