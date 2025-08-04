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
import { Search, MapPin, GraduationCap, School } from "lucide-react"

export default function SchoolSearchFlow() {
  const [schoolType, setSchoolType] = useState("")
  const [location, setLocation] = useState("")
  const [specialNeedsSupport, setSpecialNeedsSupport] = useState("Any")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults([]) // Clear previous results
    toast.info("Searching for schools and institutions...")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockResults = [
      {
        id: 1,
        name: "Greenwood Academy",
        type: "Primary School",
        location: "Nairobi",
        support: "Autism Spectrum, ADHD",
        curriculum: "CBC, Adapted Curriculum",
        contact: "info@greenwood.ac.ke",
        description: "An inclusive primary school with dedicated support units for various special needs.",
      },
      {
        id: 2,
        name: "Coastline Special School",
        type: "Special Needs School",
        location: "Mombasa",
        support: "Intellectual Disabilities, Physical Disabilities",
        curriculum: "Individualized Education Programs (IEPs)",
        contact: "coastline@example.com",
        description:
          "A specialized institution offering comprehensive education for children with severe disabilities.",
      },
      {
        id: 3,
        name: "Highlands Inclusive College",
        type: "Secondary School",
        location: "Nakuru",
        support: "Learning Disabilities, Dyslexia",
        curriculum: "CBC, Remedial Classes",
        contact: "highlands@college.ke",
        description:
          "A secondary school committed to providing an inclusive learning environment with strong academic support.",
      },
    ].filter((school) => {
      const matchesType = schoolType ? school.type.toLowerCase().includes(schoolType.toLowerCase()) : true
      const matchesLocation = location ? school.location.toLowerCase().includes(location.toLowerCase()) : true
      const matchesSupport =
        specialNeedsSupport !== "Any" ? school.support.toLowerCase().includes(specialNeedsSupport.toLowerCase()) : true
      return matchesType && matchesLocation && matchesSupport
    })

    setResults(mockResults)
    setLoading(false)
    if (mockResults.length > 0) {
      toast.success(`Found ${mockResults.length} schools!`)
    } else {
      toast.info("No schools found matching your criteria.")
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Find Schools & Institutions
          </CardTitle>
          <CardDescription>Search for inclusive schools, special needs centers, and colleges.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="schoolType">School Type</Label>
              <Input
                id="schoolType"
                placeholder="e.g., Primary, Secondary, Special Needs"
                value={schoolType}
                onChange={(e) => setSchoolType(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Nairobi, Kisumu"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="specialNeedsSupport">Special Needs Support</Label>
              <Select value={specialNeedsSupport} onValueChange={setSpecialNeedsSupport}>
                <SelectTrigger id="specialNeedsSupport">
                  <SelectValue placeholder="Select support type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="Autism Spectrum">Autism Spectrum</SelectItem>
                  <SelectItem value="ADHD">ADHD</SelectItem>
                  <SelectItem value="Learning Disabilities">Learning Disabilities</SelectItem>
                  <SelectItem value="Physical Disabilities">Physical Disabilities</SelectItem>
                  <SelectItem value="Intellectual Disabilities">Intellectual Disabilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Searching..." : "Search Schools"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((school) => (
            <Card key={school.id}>
              <CardHeader>
                <CardTitle>{school.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <School className="h-4 w-4 text-muted-foreground" /> {school.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {school.location}
                </p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" /> Supports: {school.support}
                </p>
                <Textarea value={school.description} readOnly className="mt-2 h-24 resize-none" />
                <Button variant="outline" className="w-full bg-transparent">
                  Contact School
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
