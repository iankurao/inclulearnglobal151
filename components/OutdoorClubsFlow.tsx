"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Clock, Star } from "lucide-react"

interface OutdoorClub {
  id: string
  name: string
  activity: string
  location: string
  meetingTime: string
  ageRange: string
  maxParticipants: number
  currentMembers: number
  rating: number
  description: string
  nextMeeting: string
  distance: string
}

const mockClubs: OutdoorClub[] = [
  {
    id: "1",
    name: "Adaptive Sports Club",
    activity: "Multi-Sport Activities",
    location: "Uhuru Park, Nairobi",
    meetingTime: "Saturdays 9:00 AM",
    ageRange: "8-16 years",
    maxParticipants: 20,
    currentMembers: 15,
    rating: 4.8,
    description: "Inclusive sports activities adapted for children with various abilities",
    nextMeeting: "January 13, 2024",
    distance: "3.2 km",
  },
  {
    id: "2",
    name: "Nature Explorers",
    activity: "Nature Walks & Education",
    location: "Karura Forest, Nairobi",
    meetingTime: "Sundays 10:00 AM",
    ageRange: "6-14 years",
    maxParticipants: 15,
    currentMembers: 12,
    rating: 4.9,
    description: "Gentle nature walks with educational activities for special needs children",
    nextMeeting: "January 14, 2024",
    distance: "5.7 km",
  },
  {
    id: "3",
    name: "Sensory Garden Club",
    activity: "Gardening & Sensory Play",
    location: "City Park, Nairobi",
    meetingTime: "Fridays 4:00 PM",
    ageRange: "4-12 years",
    maxParticipants: 12,
    currentMembers: 8,
    rating: 4.7,
    description: "Therapeutic gardening activities designed for sensory development",
    nextMeeting: "January 12, 2024",
    distance: "2.1 km",
  },
]

export default function OutdoorClubsFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedActivity, setSelectedActivity] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedAgeRange, setSelectedAgeRange] = useState("")
  const [clubs, setClubs] = useState<OutdoorClub[]>(mockClubs)

  const handleSearch = () => {
    let filtered = mockClubs

    if (searchQuery) {
      filtered = filtered.filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedActivity) {
      filtered = filtered.filter((club) => club.activity.toLowerCase().includes(selectedActivity.toLowerCase()))
    }

    if (selectedLocation) {
      filtered = filtered.filter((club) => club.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    setClubs(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Outdoor Clubs & Activities</h2>
        <p className="text-gray-600">Join inclusive outdoor activities designed for children with special needs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>Find the perfect outdoor activity for your child</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Type</Label>
              <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="nature">Nature Activities</SelectItem>
                  <SelectItem value="gardening">Gardening</SelectItem>
                  <SelectItem value="arts">Arts & Crafts</SelectItem>
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
                  <SelectItem value="uhuru">Uhuru Park</SelectItem>
                  <SelectItem value="karura">Karura Forest</SelectItem>
                  <SelectItem value="city">City Park</SelectItem>
                  <SelectItem value="central">Central Park</SelectItem>
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
                  <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                  <SelectItem value="primary">Primary (6-12)</SelectItem>
                  <SelectItem value="teen">Teen (13-18)</SelectItem>
                  <SelectItem value="all">All Ages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search Clubs
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <Card key={club.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{club.name}</CardTitle>
                  <CardDescription>{club.activity}</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {club.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{club.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{club.location}</span>
                  <Badge variant="outline" className="ml-auto">
                    {club.distance}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{club.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Ages: {club.ageRange}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Next meeting: {club.nextMeeting}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">{club.currentMembers}</span>
                  <span className="text-gray-500">/{club.maxParticipants} members</span>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(club.currentMembers / club.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Join Club
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clubs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No clubs found matching your criteria. Try adjusting your search filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
