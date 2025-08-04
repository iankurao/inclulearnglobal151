import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Users } from "lucide-react"

interface OutdoorClub {
  id: string
  name: string
  location: string
  activities: string[]
  ageGroup: string
  contact: {
    email: string
    website?: string
  }
  description: string
}

const mockOutdoorClubs: OutdoorClub[] = [
  {
    id: "1",
    name: "Nature Explorers Club",
    location: "Aberdare National Park, Kenya",
    activities: ["Hiking", "Bird Watching", "Camping"],
    ageGroup: "Children (6-12)",
    contact: { email: "info@natureexplorers.org", website: "www.natureexplorers.org" },
    description: "An inclusive club fostering a love for nature through accessible outdoor activities.",
  },
  {
    id: "2",
    name: "Adventure Seekers Kenya",
    location: "Hell's Gate National Park, Kenya",
    activities: ["Cycling", "Rock Climbing (adapted)", "Wildlife Safaris"],
    ageGroup: "Teens (13-18)",
    contact: { email: "contact@adventureseekers.co.ke" },
    description: "Empowering teens with special needs to experience thrilling outdoor adventures.",
  },
  {
    id: "3",
    name: "Serenity Trails Group",
    location: "Karura Forest, Nairobi",
    activities: ["Nature Walks", "Picnics", "Sensory Trails"],
    ageGroup: "All Ages",
    contact: { email: "serenitytrails@example.com" },
    description: "Gentle outdoor experiences designed for relaxation and sensory engagement.",
  },
]

export default function OutdoorClubsFlow() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Find Outdoor Clubs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input placeholder="Search by club name or activity..." className="w-full" />
        <Input placeholder="Filter by location or age group..." className="w-full" />
        <Button className="w-full md:col-span-2">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOutdoorClubs.map((club) => (
          <Card key={club.id}>
            <CardHeader>
              <CardTitle>{club.name}</CardTitle>
              <p className="text-sm text-gray-500">{club.ageGroup}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="mr-2 h-4 w-4 text-gray-500" /> {club.location}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" /> Activities: {club.activities.join(", ")}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Users className="mr-2 h-4 w-4 text-gray-500" /> Contact: {club.contact.email}
              </div>
              {club.contact.website && (
                <div className="flex items-center text-sm text-gray-700">
                  <a
                    href={club.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2">{club.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
