"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { searchVectorDatabase } from "@/lib/vectorSearch"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

interface Club {
  id: string
  name: string
  location: string
  activities: string[]
  description: string
  contact_email: string
  contact_phone: string
}

export default function OutdoorClubsFlow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(false)
  const [newClub, setNewClub] = useState({
    name: "",
    location: "",
    activities: "",
    description: "",
    contact_email: "",
    contact_phone: "",
  })
  const [isAddingClub, setIsAddingClub] = useState(false)
  const supabase = createClient()
  const { user } = useAuth()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Search query cannot be empty.")
      return
    }
    setLoading(true)
    try {
      const results = await searchVectorDatabase(searchQuery, 10)
      const clubIds = results.map((r: any) => r.id)

      const { data, error } = await supabase.from("outdoor_clubs").select("*").in("id", clubIds)

      if (error) throw error

      const sortedClubs = data.sort((a: any, b: any) => {
        const simA = results.find((r: any) => r.id === a.id)?.similarity || 0
        const simB = results.find((r: any) => r.id === b.id)?.similarity || 0
        return simB - simA
      })

      setClubs(sortedClubs as Club[])
      toast.success("Search complete!", { description: `${data.length} clubs found.` })
    } catch (error: any) {
      toast.error("Search Error", { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleAddClub = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("Authentication Required", { description: "Please sign in to add a club." })
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("outdoor_clubs")
        .insert({
          user_id: user.id,
          name: newClub.name,
          location: newClub.location,
          activities: newClub.activities.split(",").map((a) => a.trim()),
          description: newClub.description,
          contact_email: newClub.contact_email,
          contact_phone: newClub.contact_phone,
        })
        .select()

      if (error) throw error

      toast.success("Club Added", { description: `${newClub.name} has been added.` })
      setNewClub({
        name: "",
        location: "",
        activities: "",
        description: "",
        contact_email: "",
        contact_phone: "",
      })
      setIsAddingClub(false)
    } catch (error: any) {
      toast.error("Add Club Error", { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Outdoor Clubs</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Outdoor Clubs</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Search by activities, location, or description (e.g., 'hiking Nairobi nature walks')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </CardContent>
      </Card>

      {clubs.length > 0 && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Card key={club.id}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{club.location}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Activities:</strong> {club.activities.join(", ")}
                </p>
                <p>{club.description}</p>
                <p>
                  <strong>Contact:</strong> {club.contact_email} | {club.contact_phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{isAddingClub ? "Add New Club" : "Contribute an Outdoor Club"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!isAddingClub ? (
            <Button onClick={() => setIsAddingClub(true)}>Add New Club</Button>
          ) : (
            <form onSubmit={handleAddClub} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newClub.location}
                  onChange={(e) => setNewClub({ ...newClub, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activities">Activities (comma-separated)</Label>
                <Input
                  id="activities"
                  value={newClub.activities}
                  onChange={(e) => setNewClub({ ...newClub, activities: e.target.value })}
                  placeholder="e.g., hiking, bird watching, camping"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newClub.description}
                  onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={newClub.contact_email}
                  onChange={(e) => setNewClub({ ...newClub, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={newClub.contact_phone}
                  onChange={(e) => setNewClub({ ...newClub, contact_phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Club"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingClub(false)} disabled={loading}>
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
