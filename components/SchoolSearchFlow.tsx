"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, GraduationCap } from "lucide-react"
import { performVectorSearch } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface SchoolType {
  id: string
  name: string
  location: string
  description: string
  specialization: string
  contact_email: string
}

export default function SchoolSearchFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [schools, setSchools] = useState<SchoolType[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    setSchools([])
    try {
      const results = await performVectorSearch(searchQuery, "schools", "description")
      setSchools(results as SchoolType[])
      if (results.length === 0) {
        toast.info("No schools found matching your search.")
      }
    } catch (error) {
      console.error("Failed to search schools:", error)
      toast.error("Failed to perform search. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Search Schools
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="e.g., 'inclusive primary school in Mombasa' or 'school for deaf children'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </CardContent>
      </Card>

      {schools.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <Card key={school.id}>
              <CardHeader>
                <CardTitle>{school.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {school.location}
                </p>
                <p className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" /> {school.specialization}
                </p>
                <p>{school.description}</p>
                <p className="font-medium">Contact: {school.contact_email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
        </div>
      )}
    </div>
  )
}
