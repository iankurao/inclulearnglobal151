"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, School } from "lucide-react"
import { useState } from "react"

export default function SchoolSearchFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")

  const handleSearch = () => {
    console.log("Searching schools with:", { searchQuery, location, type })
    // Implement actual search logic here
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Find Special Needs Schools</CardTitle>
        <CardDescription>Discover educational institutions that support children with special needs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by school name or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Location (e.g., Kisumu)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="relative">
          <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Type of school (e.g., Autism Support)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="w-full">
          Search Schools
        </Button>
        <div className="mt-6 text-center text-gray-500">
          <p>Search results will appear here.</p>
          {/* Placeholder for search results */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bright Minds Academy</CardTitle>
                <CardDescription>Inclusive Primary School</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                <p className="text-sm text-gray-600">Specializes in learning disabilities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hope & Growth Center</CardTitle>
                <CardDescription>Therapeutic Learning Environment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Eldoret, Kenya</p>
                <p className="text-sm text-gray-600">Focus on behavioral support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
