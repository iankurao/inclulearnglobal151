"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, GraduationCap, Star, Phone } from "lucide-react"

interface School {
  id: string
  name: string
  type: string
  location: string
  phone: string
  rating: number
  capacity: number
  ageRange: string
  specialties: string[]
  distance: string
}

const mockSchools: School[] = [
  {
    id: "1",
    name: "Sunshine Special Needs Academy",
    type: "Special Needs School",
    location: "Karen, Nairobi",
    phone: "+254 700 111 222",
    rating: 4.8,
    capacity: 150,
    ageRange: "3-18 years",
    specialties: ["Autism", "ADHD", "Learning Disabilities"],
    distance: "2.1 km",
  },
  {
    id: "2",
    name: "Hope Center for Special Education",
    type: "Inclusive School",
    location: "Westlands, Nairobi",
    phone: "+254 700 333 444",
    rating: 4.6,
    capacity: 200,
    ageRange: "5-16 years",
    specialties: ["Intellectual Disabilities", "Physical Disabilities"],
    distance: "4.3 km",
  },
  {
    id: "3",
    name: "Bright Minds Learning Center",
    type: "Therapy Center",
    location: "Kilimani, Nairobi",
    phone: "+254 700 555 666",
    rating: 4.9,
    capacity: 80,
    ageRange: "2-12 years",
    specialties: ["Speech Therapy", "Occupational Therapy", "Behavioral Support"],
    distance: "1.8 km",
  },
]

export default function SchoolSearchFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedAgeRange, setSelectedAgeRange] = useState("")
  const [schools, setSchools] = useState<School[]>(mockSchools)

  const handleSearch = () => {
    let filtered = mockSchools

    if (searchQuery) {
      filtered = filtered.filter(
        (school) =>
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedType) {
      filtered = filtered.filter((school) => school.type.toLowerCase().includes(selectedType.toLowerCase()))
    }

    if (selectedLocation) {
      filtered = filtered.filter((school) => school.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    setSchools(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Special Needs Schools</h2>
        <p className="text-gray-600">Discover educational institutions that support children with special needs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>Find the perfect educational environment for your child</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search schools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">School Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="special">Special Needs School</SelectItem>
                  <SelectItem value="inclusive">Inclusive School</SelectItem>
                  <SelectItem value="therapy">Therapy Center</SelectItem>
                  <SelectItem value="mainstream">Mainstream with Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karen">Karen</SelectItem>
                  <SelectItem value="westlands">Westlands</SelectItem>
                  <SelectItem value="kilimani">Kilimani</SelectItem>
                  <SelectItem value="upperhill">Upper Hill</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age Range</Label>
              <Select value={selectedAgeRange} onValueChange={setSelectedAgeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early">Early Years (2-5)</SelectItem>
                  <SelectItem value="primary">Primary (6-12)</SelectItem>
                  <SelectItem value="secondary">Secondary (13-18)</SelectItem>
                  <SelectItem value="all">All Ages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search Schools
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school) => (
          <Card key={school.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{school.name}</CardTitle>
                  <CardDescription>{school.type}</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {school.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{school.location}</span>
                <Badge variant="outline" className="ml-auto">
                  {school.distance}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{school.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Capacity: {school.capacity} students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>Ages: {school.ageRange}</span>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Specialties:</Label>
                <div className="flex flex-wrap gap-1">
                  {school.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Schedule Visit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {schools.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No schools found matching your criteria. Try adjusting your search filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
