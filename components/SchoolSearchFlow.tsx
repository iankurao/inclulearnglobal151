"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Mail } from "lucide-react"

interface School {
  id: string
  name: string
  type: string
  location: string
  contact: {
    phone: string
    email: string
  }
}

const mockSchools: School[] = [
  {
    id: "1",
    name: "Bright Minds Academy",
    type: "Special Needs Primary School",
    location: "Nairobi",
    contact: { phone: "+254700111222", email: "info@brightminds.org" },
  },
  {
    id: "2",
    name: "Inclusive Learning Center",
    type: "Therapy & Education Center",
    location: "Mombasa",
    contact: { phone: "+254711222333", email: "contact@inclusivelearning.com" },
  },
  {
    id: "3",
    name: "Hope Springs School",
    type: "Autism Spectrum Support",
    location: "Nakuru",
    contact: { phone: "+254722333444", email: "admin@hopesprings.edu" },
  },
  {
    id: "4",
    name: "Future Stars Academy",
    type: "Integrated Education",
    location: "Eldoret",
    contact: { phone: "+254733444555", email: "admissions@futurestars.ac.ke" },
  },
]

export default function SchoolSearchFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const filteredSchools = mockSchools
    .filter(
      (school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((school) => locationFilter === "" || school.location.toLowerCase().includes(locationFilter.toLowerCase()))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Special Needs Schools</CardTitle>
          <CardDescription>Discover educational institutions and learning centers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by school name or type..."
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
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <Card key={school.id}>
              <CardHeader>
                <CardTitle>{school.name}</CardTitle>
                <CardDescription>{school.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{school.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${school.contact.phone}`} className="hover:underline">
                    {school.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href={`mailto:${school.contact.email}`} className="hover:underline">
                    {school.contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No schools found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
