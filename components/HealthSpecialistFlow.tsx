"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Briefcase, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { HealthSpecialist } from "@/integrations/supabase/types"

export default function HealthSpecialistFlow() {
  const { user } = useAuth()
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [specialists, setSpecialists] = useState<HealthSpecialist[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      let query = supabase.from("health_specialists").select("*")

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`)
      }
      if (location) {
        query = query.ilike("location", `%${location}%`)
      }
      if (specialty) {
        query = query.ilike("specialty", `%${specialty}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }
      setSpecialists(data || [])
      toast.success(`Found ${data?.length || 0} specialists.`)
    } catch (error: any) {
      toast.error(`Error searching: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async (specialistId: string) => {
    if (!user) {
      toast.error("You need to be logged in to favorite specialists.")
      return
    }
    try {
      const { data, error } = await supabase.from("favorites").insert({
        user_id: user.id,
        resource_id: specialistId,
        resource_type: "health_specialist",
      })
      if (error) {
        throw error
      }
      toast.success("Specialist added to favorites!")
    } catch (error: any) {
      toast.error(`Error adding to favorites: ${error.message}`)
    }
  }

  return (
    <div className="flex h-full flex-col p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Find Health Specialists</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Search by name or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search className="h-4 w-4 text-gray-500" />}
          />
          <Input
            placeholder="Location (e.g., Nairobi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            prefix={<MapPin className="h-4 w-4 text-gray-500" />}
          />
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger>
              <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Select Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pediatrician">Pediatrician</SelectItem>
              <SelectItem value="Therapist">Therapist</SelectItem>
              <SelectItem value="Psychologist">Psychologist</SelectItem>
              <SelectItem value="Occupational Therapist">Occupational Therapist</SelectItem>
              <SelectItem value="Speech Therapist">Speech Therapist</SelectItem>
              <SelectItem value="Neurologist">Neurologist</SelectItem>
              <SelectItem value="Dietitian">Dietitian</SelectItem>
              <SelectItem value="Audiologist">Audiologist</SelectItem>
              <SelectItem value="Ophthalmologist">Ophthalmologist</SelectItem>
              <SelectItem value="Physiotherapist">Physiotherapist</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} disabled={loading} className="md:col-span-3">
            {loading ? "Searching..." : "Search Specialists"}
          </Button>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          {specialists.length === 0 && !loading ? (
            <p className="text-center text-gray-500">No specialists found. Try a different search.</p>
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid gap-4">
                {specialists.map((specialist) => (
                  <div key={specialist.id} className="flex items-center gap-4 rounded-md border p-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={specialist.profile_picture_url || "/placeholder-user.png"} />
                      <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{specialist.name}</h3>
                      <p className="text-sm text-gray-500">
                        <Briefcase className="mr-1 inline-block h-3 w-3" />
                        {specialist.specialty}
                      </p>
                      <p className="text-sm text-gray-500">
                        <MapPin className="mr-1 inline-block h-3 w-3" />
                        {specialist.location}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {specialist.services_offered?.map((service, index) => (
                          <Badge key={index} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleFavorite(specialist.id)}>
                      <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
