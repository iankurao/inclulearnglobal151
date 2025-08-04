"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Filter, Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface School {
  id: string
  name: string
  type: string
  location: string
  rating: number
  curriculum: string
  inclusivePrograms: string[]
  image: string
}

const mockSchools: School[] = [
  {
    id: "1",
    name: "Bright Minds Academy",
    type: "Primary School",
    location: "Nairobi",
    rating: 4.7,
    curriculum: "CBC",
    inclusivePrograms: ["IEP support", "Sensory room", "Speech therapy"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Coastal Inclusive School",
    type: "Special Needs School",
    location: "Mombasa",
    rating: 4.9,
    curriculum: "Adapted",
    inclusivePrograms: ["Occupational therapy", "Life skills training", "Vocational programs"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Highlands Learning Center",
    type: "Secondary School",
    location: "Nakuru",
    rating: 4.5,
    curriculum: "IGCSE",
    inclusivePrograms: ["Learning support unit", "Counseling services", "Peer mentorship"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Valley View Academy",
    type: "Primary School",
    location: "Kisumu",
    rating: 4.6,
    curriculum: "CBC",
    inclusivePrograms: ["Resource room", "Behavioral support", "Assistive technology"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function SchoolSearchFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [minRating, setMinRating] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredSchools = mockSchools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.curriculum.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "All Locations" || school.location === locationFilter
    const matchesType = typeFilter === "All Types" || school.type === typeFilter
    const matchesRating = school.rating >= minRating

    return matchesSearch && matchesLocation && matchesType && matchesRating
  })

  const uniqueLocations = Array.from(new Set(mockSchools.map((s) => s.location)))
  const uniqueTypes = Array.from(new Set(mockSchools.map((s) => s.type)))

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
          <CardDescription>Refine your search for schools.</CardDescription>
        </CardHeader>
        <CardContent className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-6`}>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="Search by name or curriculum"
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
                <SelectItem value="All Locations">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">School Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select school type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-rating">Minimum Rating: {minRating.toFixed(1)} stars</Label>
            <Slider
              id="min-rating"
              min={0}
              max={5}
              step={0.1}
              value={[minRating]}
              onValueChange={(val) => setMinRating(val[0])}
              className="w-full"
            />
          </div>
          <Button className="w-full" onClick={() => setFiltersOpen(false)}>
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {filteredSchools.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-600">
              No schools found matching your criteria.
            </CardContent>
          </Card>
        ) : (
          filteredSchools.map((school) => (
            <Card key={school.id}>
              <CardContent className="flex flex-col md:flex-row items-start md:items-center p-6 gap-4">
                <img
                  src={school.image || "/placeholder.svg"}
                  alt={school.name}
                  className="w-full md:w-32 h-32 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{school.name}</h3>
                  <p className="text-blue-600 font-medium">{school.type}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {school.location}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {school.rating.toFixed(1)} ({school.curriculum} Curriculum)
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Inclusive Programs:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {school.inclusivePrograms.map((program, index) => (
                        <li key={index}>{program}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button className="mt-4 md:mt-0">View Details</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
