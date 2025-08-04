"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, BookOpen, Star } from "lucide-react"

export default function SchoolSearchFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [specialization, setSpecialization] = useState("")

  const handleSearch = () => {
    console.log("Searching schools with:", { searchTerm, location, specialization })
    // Implement actual search logic here
  }

  const schools = [
    {
      id: 1,
      name: "Bright Future Academy",
      specialization: "Autism Spectrum Disorder",
      location: "Nairobi",
      rating: 4.7,
      programs: "Early Intervention, Primary",
    },
    {
      id: 2,
      name: "Inclusive Learning Center",
      specialization: "Down Syndrome, Learning Disabilities",
      location: "Kisumu",
      rating: 4.5,
      programs: "Primary, Secondary",
    },
    {
      id: 3,
      name: "Hope Springs School",
      specialization: "Cerebral Palsy, Physical Disabilities",
      location: "Mombasa",
      rating: 4.8,
      programs: "Therapeutic Education",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Special Needs Schools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by school name or keyword"
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
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Specialization (e.g., Autism)"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search Schools
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <Card key={school.id}>
            <CardHeader>
              <CardTitle>{school.name}</CardTitle>
              <p className="text-sm text-gray-500">{school.specialization}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {school.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                {school.programs}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                {school.rating} (Rating)
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
