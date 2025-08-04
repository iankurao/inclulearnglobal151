"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, GraduationCap, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { School } from "@/integrations/supabase/types"

export default function SchoolSearchFlow() {
  const { user } = useAuth()
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      let query = supabase.from("schools").select("*")

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`)
      }
      if (location) {
        query = query.ilike("location", `%${location}%`)
      }
      if (specialization) {
        query = query.ilike("specialization", `%${specialization}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }
      setSchools(data || [])
      toast.success(`Found ${data?.length || 0} schools.`)
    } catch (error: any) {
      toast.error(`Error searching: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async (schoolId: string) => {
    if (!user) {
      toast.error("You need to be logged in to favorite schools.")
      return
    }
    try {
      const { data, error } = await supabase.from("favorites").insert({
        user_id: user.id,
        resource_id: schoolId,
        resource_type: "school",
      })
      if (error) {
        throw error
      }
      toast.success("School added to favorites!")
    } catch (error: any) {
      toast.error(`Error adding to favorites: ${error.message}`)
    }
  }

  return (
    <div className="flex h-full flex-col p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Find Schools</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Search by name or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search className="h-4 w-4 text-gray-500" />}
          />
          <Input
            placeholder="Location (e.g., Mombasa)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            prefix={<MapPin className="h-4 w-4 text-gray-500" />}
          />
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger>
              <GraduationCap className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Autism Spectrum Disorder">Autism Spectrum Disorder</SelectItem>
              <SelectItem value="Down Syndrome">Down Syndrome</SelectItem>
              <SelectItem value="Learning Disabilities">Learning Disabilities</SelectItem>
              <SelectItem value="ADHD">ADHD</SelectItem>
              <SelectItem value="Physical Disabilities">Physical Disabilities</SelectItem>
              <SelectItem value="Sensory Impairments">Sensory Impairments</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} disabled={loading} className="md:col-span-3">
            {loading ? "Searching..." : "Search Schools"}
          </Button>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          {schools.length === 0 && !loading ? (
            <p className="text-center text-gray-500">No schools found. Try a different search.</p>
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid gap-4">
                {schools.map((school) => (
                  <div key={school.id} className="flex items-center gap-4 rounded-md border p-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={school.logo_url || "/placeholder-logo.png"} />
                      <AvatarFallback>{school.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{school.name}</h3>
                      <p className="text-sm text-gray-500">
                        <MapPin className="mr-1 inline-block h-3 w-3" />
                        {school.location}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {school.specialization?.map((spec, index) => (
                          <Badge key={index} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleFavorite(school.id)}>
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
