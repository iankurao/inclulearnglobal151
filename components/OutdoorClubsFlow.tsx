"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Mail } from "lucide-react"

interface OutdoorClub {
  id: string
  name: string
  activity: string
  location: string
  contact: {
    phone: string
    email: string
  }
}

const mockOutdoorClubs: OutdoorClub[] = [
  {
    id: "1",
    name: "Nature Explorers Club",
    activity: "Hiking & Nature Walks",
    location: "Nairobi National Park",
    contact: { phone: "+254755112233", email: "nature.explorers@example.com" },
  },
  {
    id: "2",
    name: "Adaptive Sports Kenya",
    activity: "Wheelchair Basketball",
    location: "Mombasa Sports Club",
    contact: { phone: "+254766223344", email: "adaptive.sports@example.com" },
  },
  {
    id: "3",
    name: "Sensory Garden Adventures",
    activity: "Gardening & Sensory Play",
    location: "Kisumu Botanical Gardens",
    contact: { phone: "+254777334455", email: "sensory.garden@example.com" },
  },
  {
    id: "4",
    name: "Inclusive Cycling Group",
    activity: "Tandem Cycling",
    location: "Karura Forest, Nairobi",
    contact: { phone: "+254788445566", email: "inclusive.cycling@example.com" },
  },
]

export default function OutdoorClubsFlow() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const filteredClubs = mockOutdoorClubs
    .filter(
      (club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.activity.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((club) => locationFilter === "" || club.location.toLowerCase().includes(locationFilter.toLowerCase()))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Outdoor Clubs</CardTitle>
          <CardDescription>Explore accessible outdoor activities and clubs for special needs children.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by club name or activity..."
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
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <Card key={club.id}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription>{club.activity}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{club.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${club.contact.phone}`} className="hover:underline">
                    {club.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href={`mailto:${club.contact.email}`} className="hover:underline">
                    {club.contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No outdoor clubs found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
