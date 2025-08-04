"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Briefcase, Star } from "lucide-react"

export default function HealthSpecialistFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [specialty, setSpecialty] = useState("")

  const handleSearch = () => {
    console.log("Searching health specialists with:", { searchTerm, location, specialty })
    // Implement actual search logic here
  }

  const specialists = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      specialty: "Pediatric Occupational Therapist",
      location: "Nairobi",
      rating: 4.8,
      experience: "10+ years",
      contact: "jane.doe@example.com",
    },
    {
      id: 2,
      name: "Mr. John Smith",
      specialty: "Speech-Language Pathologist",
      location: "Mombasa",
      rating: 4.5,
      experience: "7 years",
      contact: "john.smith@example.com",
    },
    {
      id: 3,
      name: "Ms. Emily White",
      specialty: "Physical Therapist",
      location: "Kisumu",
      rating: 4.9,
      experience: "12 years",
      contact: "emily.white@example.com",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Health Specialists</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or keyword"
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
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Specialty (e.g., Occupational Therapy)"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search Specialists
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialists.map((specialist) => (
          <Card key={specialist.id}>
            <CardHeader>
              <CardTitle>{specialist.name}</CardTitle>
              <p className="text-sm text-gray-500">{specialist.specialty}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {specialist.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                {specialist.experience}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                {specialist.rating} (Rating)
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
