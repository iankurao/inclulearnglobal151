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
import { searchHealthSpecialists, addHealthSpecialist } from "@/app/actions" // Import Server Actions

interface Specialist {
  id: string
  name: string
  specialty: string
  location: string
  services: string[]
  bio: string
  contact_email: string
  contact_phone: string
}

export default function HealthSpecialistFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [loading, setLoading] = useState(false)
  const [newSpecialist, setNewSpecialist] = useState({
    name: "",
    specialty: "",
    location: "",
    services: "",
    bio: "",
    contact_email: "",
    contact_phone: "",
  })
  const [isAddingSpecialist, setIsAddingSpecialist] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Search query cannot be empty.")
      return
    }
    setLoading(true)
    try {
      const { data, error } = await searchHealthSpecialists(searchQuery)
      if (error) throw error
      setSpecialists(data || [])
      toast.success("Search complete!", { description: `${data.length} specialists found.` })
    } catch (error: any) {
      toast.error("Search Error", { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleAddSpecialist = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await addHealthSpecialist({
        name: newSpecialist.name,
        specialty: newSpecialist.specialty,
        location: newSpecialist.location,
        services: newSpecialist.services.split(",").map((s) => s.trim()),
        bio: newSpecialist.bio,
        contact_email: newSpecialist.contact_email,
        contact_phone: newSpecialist.contact_phone,
      })

      if (error) throw error

      toast.success("Specialist Added", { description: `${newSpecialist.name} has been added.` })
      setNewSpecialist({
        name: "",
        specialty: "",
        location: "",
        services: "",
        bio: "",
        contact_email: "",
        contact_phone: "",
      })
      setIsAddingSpecialist(false)
    } catch (error: any) {
      toast.error("Add Specialist Error", { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Health Specialists</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Specialists</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Search by specialty, location, or services (e.g., 'pediatrician Nairobi therapy')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </CardContent>
      </Card>

      {specialists.length > 0 && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {specialists.map((specialist) => (
            <Card key={specialist.id}>
              <CardHeader>
                <CardTitle>{specialist.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{specialist.specialty}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Location:</strong> {specialist.location}
                </p>
                <p>
                  <strong>Services:</strong> {specialist.services.join(", ")}
                </p>
                <p>{specialist.bio}</p>
                <p>
                  <strong>Contact:</strong> {specialist.contact_email} | {specialist.contact_phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{isAddingSpecialist ? "Add New Specialist" : "Contribute a Specialist"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!isAddingSpecialist ? (
            <Button onClick={() => setIsAddingSpecialist(true)}>Add New Specialist</Button>
          ) : (
            <form onSubmit={handleAddSpecialist} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSpecialist.name}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  value={newSpecialist.specialty}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, specialty: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newSpecialist.location}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">Services (comma-separated)</Label>
                <Input
                  id="services"
                  value={newSpecialist.services}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, services: e.target.value })}
                  placeholder="e.g., therapy, counseling, assessment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={newSpecialist.bio}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, bio: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={newSpecialist.contact_email}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={newSpecialist.contact_phone}
                  onChange={(e) => setNewSpecialist({ ...newSpecialist, contact_phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Specialist"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingSpecialist(false)} disabled={loading}>
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
