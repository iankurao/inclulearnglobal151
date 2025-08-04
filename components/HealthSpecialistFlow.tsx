"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Mail } from "lucide-react"

interface Specialist {
  id: string
  name: string
  specialty: string
  location: string
  contact: {
    phone: string
    email: string
  }
}

const mockSpecialists: Specialist[] = [
  {
    id: "1",
    name: "Dr. Jane Doe",
    specialty: "Pediatric Occupational Therapist",
    location: "Nairobi",
    contact: { phone: "+254712345678", email: "jane.doe@example.com" },
  },
  {
    id: "2",
    name: "Mr. John Smith",
    specialty: "Speech-Language Pathologist",
    location: "Mombasa",
    contact: { phone: "+254723456789", email: "john.smith@example.com" },
  },
  {
    id: "3",
    name: "Ms. Emily White",
    specialty: "Child Psychologist",
    location: "Kisumu",
    contact: { phone: "+254734567890", email: "emily.white@example.com" },
  },
  {
    id: "4",
    name: "Dr. David Green",
    specialty: "Developmental Pediatrician",
    location: "Nairobi",
    contact: { phone: "+254745678901", email: "david.green@example.com" },
  },
]

export default function HealthSpecialistFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const filteredSpecialists = mockSpecialists
    .filter(
      (specialist) =>
        specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialist.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(
      (specialist) => locationFilter === "" || specialist.location.toLowerCase().includes(locationFilter.toLowerCase()),
    )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Health Specialists</CardTitle>
          <CardDescription>Search for therapists, doctors, and other health professionals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Filter by location (e.g., Nairobi)"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((specialist) => (
            <Card key={specialist.id}>
              <CardHeader>
                <CardTitle>{specialist.name}</CardTitle>
                <CardDescription>{specialist.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{specialist.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${specialist.contact.phone}`} className="hover:underline">
                    {specialist.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href={`mailto:${specialist.contact.email}`} className="hover:underline">
                    {specialist.contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No specialists found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
