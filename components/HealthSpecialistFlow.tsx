"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Filter, Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Specialist {
  id: string
  name: string
  specialty: string
  location: string
  rating: number
  experience: number
  image: string
}

const mockSpecialists: Specialist[] = [
  {
    id: "1",
    name: "Dr. Jane Doe",
    specialty: "Pediatric Occupational Therapist",
    location: "Nairobi",
    rating: 4.8,
    experience: 10,
    image: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Mr. John Smith",
    specialty: "Speech-Language Pathologist",
    location: "Mombasa",
    rating: 4.5,
    experience: 7,
    image: "/placeholder-user.jpg",
  },
  {
    id: "3",
    name: "Ms. Emily White",
    specialty: "Child Psychologist",
    location: "Kisumu",
    rating: 4.9,
    experience: 12,
    image: "/placeholder-user.jpg",
  },
  {
    id: "4",
    name: "Dr. David Green",
    specialty: "Developmental Pediatrician",
    location: "Nairobi",
    rating: 4.7,
    experience: 15,
    image: "/placeholder-user.jpg",
  },
  {
    id: "5",
    name: "Ms. Sarah Brown",
    specialty: "Special Education Teacher",
    location: "Nakuru",
    rating: 4.6,
    experience: 8,
    image: "/placeholder-user.jpg",
  },
]

export default function HealthSpecialistFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties")
  const [minRating, setMinRating] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredSpecialists = mockSpecialists.filter((specialist) => {
    const matchesSearch =
      specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "All Locations" || specialist.location === locationFilter
    const matchesSpecialty = specialtyFilter === "All Specialties" || specialist.specialty === specialtyFilter
    const matchesRating = specialist.rating >= minRating

    return matchesSearch && matchesLocation && matchesSpecialty && matchesRating
  })

  const uniqueLocations = Array.from(new Set(mockSpecialists.map((s) => s.location)))
  const uniqueSpecialties = Array.from(new Set(mockSpecialists.map((s) => s.specialty)))

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
          <CardDescription>Refine your search for health specialists.</CardDescription>
        </CardHeader>
        <CardContent className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-6`}>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="Search by name or specialty"
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
            <Label htmlFor="specialty">Specialty</Label>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Specialties">All Specialties</SelectItem>
                {uniqueSpecialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
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
        {filteredSpecialists.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-600">
              No specialists found matching your criteria.
            </CardContent>
          </Card>
        ) : (
          filteredSpecialists.map((specialist) => (
            <Card key={specialist.id}>
              <CardContent className="flex items-center p-6 gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                  <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{specialist.name}</h3>
                  <p className="text-blue-600 font-medium">{specialist.specialty}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {specialist.location}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {specialist.rating.toFixed(1)} ({specialist.experience} years experience)
                  </div>
                </div>
                <Button>View Profile</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
