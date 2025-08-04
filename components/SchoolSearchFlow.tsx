"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { performVectorSearch } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface School {
  id: string
  name: string
  location: string
  education_level: string
  contact_email?: string
  phone_number?: string
  description?: string
}

export default function SchoolSearchFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.info("Please enter a search query.")
      return
    }
    setLoading(true)
    try {
      const results = await performVectorSearch(searchQuery, "schools", "description")
      setSchools(results as School[])
      if (results.length === 0) {
        toast.info("No schools found matching your query.")
      } else {
        toast.success(`${results.length} schools found!`)
      }
    } catch (error) {
      console.error("Error searching for schools:", error)
      toast.error("Failed to search for schools. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Find Schools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by school name, location, or special needs programs (e.g., 'inclusive primary school Nairobi autism support')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {schools.length > 0 && (
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Search Results:</h3>
            {schools.map((school) => (
              <Card key={school.id} className="p-4">
                <CardTitle className="text-xl">{school.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {school.education_level} - {school.location}
                </p>
                {school.description && <p className="mt-2 text-sm">{school.description}</p>}
                <div className="mt-2 text-sm">
                  {school.contact_email && <p>Email: {school.contact_email}</p>}
                  {school.phone_number && <p>Phone: {school.phone_number}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
