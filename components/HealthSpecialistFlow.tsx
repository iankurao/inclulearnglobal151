"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star } from "lucide-react"

interface HealthSpecialist {
  id: string
  name: string
  specialty: string
  location: string
  phone: string
  rating: number
  availability: string
  distance: string
}

const mockSpecialists: HealthSpecialist[] = [
  {
    id: "1",
    name: "Dr. Sarah Mwangi",
    specialty: "Pediatric Occupational Therapist",
    location: "Westlands, Nairobi",
    phone: "+254 700 123 456",
    rating: 4.8,
    availability: "Mon-Fri 9AM-5PM",
    distance: "2.3 km",
  },
  {
    id: "2",
    name: "Dr. James Kiprotich",
    specialty: "Speech Language Pathologist",
    location: "Karen, Nairobi",
    phone: "+254 700 234 567",
    rating: 4.9,
    availability: "Mon-Sat 8AM-6PM",
    distance: "5.1 km",
  },
  {
    id: "3",
    name: "Dr. Grace Wanjiku",
    specialty: "Developmental Pediatrician",
    location: "Kilimani, Nairobi",
    phone: "+254 700 345 678",
    rating: 4.7,
    availability: "Tue-Thu 10AM-4PM",
    distance: "3.8 km",
  },
]

export default function HealthSpecialistFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [specialists, setSpecialists] = useState<HealthSpecialist[]>(mockSpecialists)

  const handleSearch = () => {
    let filtered = mockSpecialists

    if (searchQuery) {
      filtered = filtered.filter(
        (specialist) =>
          specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedSpecialty) {
      filtered = filtered.filter((specialist) =>
        specialist.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()),
      )
    }

    if (selectedLocation) {
      filtered = filtered.filter((specialist) =>
        specialist.location.toLowerCase().includes(selectedLocation.toLowerCase()),
      )
    }

    setSpecialists(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Health Specialists</h2>
        <p className="text-gray-600">Connect with qualified health professionals for special needs support</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>Find the right specialist for your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="occupational">Occupational Therapy</SelectItem>
                  <SelectItem value="speech">Speech Therapy</SelectItem>
                  <SelectItem value="developmental">Developmental Pediatrics</SelectItem>
                  <SelectItem value="behavioral">Behavioral Therapy</SelectItem>
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
                  <SelectItem value="westlands">Westlands</SelectItem>
                  <SelectItem value="karen">Karen</SelectItem>
                  <SelectItem value="kilimani">Kilimani</SelectItem>
                  <SelectItem value="upperhill">Upper Hill</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search Specialists
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialists.map((specialist) => (
          <Card key={specialist.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{specialist.name}</CardTitle>
                  <CardDescription>{specialist.specialty}</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {specialist.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{specialist.location}</span>
                <Badge variant="outline" className="ml-auto">
                  {specialist.distance}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{specialist.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{specialist.availability}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Book Appointment
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {specialists.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">
              No specialists found matching your criteria. Try adjusting your search filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
