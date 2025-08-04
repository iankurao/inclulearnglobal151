"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { searchSchools, addSchool } from "@/app/actions" // Import Server Actions

interface School {
  id: string
  name: string
  location: string
  programs: string[]
  description: string
  contact_email: string
  contact_phone: string
}

export default function SchoolSearchFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)
  const [newSchool, setNewSchool] = useState({
    name: "",
    location: "",
    programs: "",
    description: "",
    contact_email: "",
    contact_phone: "",
  })
  const [isAddingSchool, setIsAddingSchool] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Search query cannot be empty.")
      return
    }
    setLoading(true)
    try {
      const { data, error } = await searchSchools(searchQuery)
      if (error) throw error
      setSchools(data || [])
      toast.success("Search complete!", { description: `${data.length} schools found.` })
    } catch (error: any) {
      toast.error("Search Error", { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await addSchool({
        name: newSchool.name,
        location: newSchool.location,
        programs: newSchool.programs.split(",").map((p) => p.trim()),
        description: newSchool.description,
        contact_email: newSchool.contact_email,
        contact_phone: newSchool.contact_phone,
      })

      if (error) throw error

      toast.success("School Added", { description: `${newSchool.name} has been added.` })
      setNewSchool({
        name: "",
        location: "",
        programs: "",
        description: "",
        contact_email: "",
        contact_phone: "",
      })
      setIsAddingSchool(false)
    } catch (error: any) {
      toast.error("Add School Error", { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Schools</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Schools</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Search by programs, location, or description (e.g., 'autism support Nairobi inclusive education')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </CardContent>
      </Card>

      {schools.length > 0 && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <Card key={school.id}>
              <CardHeader>
                <CardTitle>{school.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{school.location}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Programs:</strong> {school.programs.join(", ")}
                </p>
                <p>{school.description}</p>
                <p>
                  <strong>Contact:</strong> {school.contact_email} | {school.contact_phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{isAddingSchool ? "Add New School" : "Contribute a School"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!isAddingSchool ? (
            <Button onClick={() => setIsAddingSchool(true)}>Add New School</Button>
          ) : (
            <form onSubmit={handleAddSchool} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newSchool.location}
                  onChange={(e) => setNewSchool({ ...newSchool, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="programs">Programs (comma-separated)</Label>
                <Input
                  id="programs"
                  value={newSchool.programs}
                  onChange={(e) => setNewSchool({ ...newSchool, programs: e.target.value })}
                  placeholder="e.g., special education, therapy, vocational training"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSchool.description}
                  onChange={(e) => setNewSchool({ ...newSchool, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={newSchool.contact_email}
                  onChange={(e) => setNewSchool({ ...newSchool, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={newSchool.contact_phone}
                  onChange={(e) => setNewSchool({ ...newSchool, contact_phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit School"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingSchool(false)} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
