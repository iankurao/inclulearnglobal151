"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Filter } from "lucide-react"
import { useState } from "react"

export default function HealthSpecialistFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [specialty, setSpecialty] = useState("")

  const handleSearch = () => {
    console.log("Searching health specialists with:", { searchQuery, location, specialty })
    // Implement actual search logic here
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Find Health Specialists</CardTitle>
        <CardDescription>Search for therapists, doctors, and other health professionals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Location (e.g., Nairobi)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Specialty (e.g., Occupational Therapy)"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="w-full">
          Search Specialists
        </Button>
        <div className="mt-6 text-center text-gray-500">
          <p>Search results will appear here.</p>
          {/* Placeholder for search results */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Dr. Jane Doe</CardTitle>
                <CardDescription>Pediatric Occupational Therapist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                <p className="text-sm text-gray-600">5+ years experience</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mr. John Smith</CardTitle>
                <CardDescription>Speech-Language Pathologist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Mombasa, Kenya</p>
                <p className="text-sm text-gray-600">8 years experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
