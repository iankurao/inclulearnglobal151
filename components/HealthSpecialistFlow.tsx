"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Search, MapPin, Briefcase, Star } from "lucide-react"

export default function HealthSpecialistFlow() {
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")
  const [experience, setExperience] = useState("Any")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults([]) // Clear previous results
    toast.info("Searching for health specialists...")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockResults = [
      {
        id: 1,
        name: "Dr. Jane Doe",
        specialty: "Pediatrician",
        location: "Nairobi",
        experience: "10 years",
        rating: 4.8,
        contact: "jane.doe@example.com",
        description: "Experienced pediatrician specializing in neurodevelopmental disorders.",
      },
      {
        id: 2,
        name: "Mr. John Smith",
        specialty: "Occupational Therapist",
        location: "Mombasa",
        experience: "7 years",
        rating: 4.5,
        contact: "john.smith@example.com",
        description: "Dedicated occupational therapist focusing on sensory integration.",
      },
      {
        id: 3,
        name: "Ms. Emily White",
        specialty: "Speech Therapist",
        location: "Kisumu",
        experience: "5 years",
        rating: 4.7,
        contact: "emily.white@example.com",
        description: "Passionate speech therapist helping children with communication challenges.",
      },
    ].filter((specialist) => {
      const matchesSpecialty = specialty ? specialist.specialty.toLowerCase().includes(specialty.toLowerCase()) : true
      const matchesLocation = location ? specialist.location.toLowerCase().includes(location.toLowerCase()) : true
      const matchesExperience = experience ? specialist.experience.includes(experience) : true
      return matchesSpecialty && matchesLocation && matchesExperience
    })

    setResults(mockResults)
    setLoading(false)
    if (mockResults.length > 0) {
      toast.success(`Found ${mockResults.length} specialists!`)
    } else {
      toast.info("No specialists found matching your criteria.")
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Find Health Specialists
          </CardTitle>
          <CardDescription>Search for pediatricians, therapists, and other health professionals.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                placeholder="e.g., Pediatrician, Therapist"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Nairobi, Mombasa"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="1-3 years">1-3 years</SelectItem>
                  <SelectItem value="3-7 years">3-7 years</SelectItem>
                  <SelectItem value="7+ years">7+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Searching..." : "Search Specialists"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((specialist) => (
            <Card key={specialist.id}>
              <CardHeader>
                <CardTitle>{specialist.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-muted-foreground" /> {specialist.specialty}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {specialist.location}
                </p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" /> {specialist.rating} ({specialist.experience})
                </p>
                <Textarea value={specialist.description} readOnly className="mt-2 h-24 resize-none" />
                <Button variant="outline" className="w-full bg-transparent">
                  Contact {specialist.name.split(" ")[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
