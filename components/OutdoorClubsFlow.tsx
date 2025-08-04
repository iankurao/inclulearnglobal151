"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Users, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { OutdoorClub } from "@/integrations/supabase/types"

export default function OutdoorClubsFlow() {
  const { user } = useAuth()
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [activity, setActivity] = useState("")
  const [clubs, setClubs] = useState<OutdoorClub[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      let query = supabase.from("outdoor_clubs").select("*")

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`)
      }
      if (location) {
        query = query.ilike("location", `%${location}%`)
      }
      if (activity) {
        query = query.ilike("activities_offered", `%${activity}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }
      setClubs(data || [])
      toast.success(`Found ${data?.length || 0} clubs.`)
    } catch (error: any) {
      toast.error(`Error searching: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async (clubId: string) => {
    if (!user) {
      toast.error("You need to be logged in to favorite clubs.")
      return
    }
    try {
      const { data, error } = await supabase.from("favorites").insert({
        user_id: user.id,
        resource_id: clubId,
        resource_type: "outdoor_club",
      })
      if (error) {
        throw error
      }
      toast.success("Club added to favorites!")
    } catch (error: any) {
      toast.error(`Error adding to favorites: ${error.message}`)
    }
  }

  return (
    <div className="flex h-full flex-col p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Find Outdoor Clubs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Search by name or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search className="h-4 w-4 text-gray-500" />}
          />
          <Input
            placeholder="Location (e.g., Rift Valley)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            prefix={<MapPin className="h-4 w-4 text-gray-500" />}
          />
          <Select value={activity} onValueChange={setActivity}>
            <SelectTrigger>
              <Users className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Select Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hiking">Hiking</SelectItem>
              <SelectItem value="Camping">Camping</SelectItem>
              <SelectItem value="Bird Watching">Bird Watching</SelectItem>
              <SelectItem value="Nature Walks">Nature Walks</SelectItem>
              <SelectItem value="Cycling">Cycling</SelectItem>
              <SelectItem value="Swimming">Swimming</SelectItem>
              <SelectItem value="Horse Riding">Horse Riding</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} disabled={loading} className="md:col-span-3">
            {loading ? "Searching..." : "Search Clubs"}
          </Button>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          {clubs.length === 0 && !loading ? (
            <p className="text-center text-gray-500">No outdoor clubs found. Try a different search.</p>
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid gap-4">
                {clubs.map((club) => (
                  <div key={club.id} className="flex items-center gap-4 rounded-md border p-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={club.logo_url || "/placeholder-logo.png"} />
                      <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{club.name}</h3>
                      <p className="text-sm text-gray-500">
                        <MapPin className="mr-1 inline-block h-3 w-3" />
                        {club.location}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {club.activities_offered?.map((activity, index) => (
                          <Badge key={index} variant="secondary">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleFavorite(club.id)}>
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
