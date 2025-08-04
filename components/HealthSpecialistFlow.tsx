import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Phone, Mail, Globe } from "lucide-react"

interface HealthSpecialist {
  id: string
  name: string
  specialty: string
  location: string
  contact: {
    phone: string
    email: string
    website?: string
  }
  description: string
}

const mockHealthSpecialists: HealthSpecialist[] = [
  {
    id: "1",
    name: "Dr. Aisha Khan",
    specialty: "Pediatric Occupational Therapist",
    location: "Nairobi, Kenya",
    contact: { phone: "+254712345678", email: "aisha.khan@example.com" },
    description: "Specializes in sensory integration and fine motor skills for children.",
  },
  {
    id: "2",
    name: "Mr. David Omondi",
    specialty: "Speech and Language Pathologist",
    location: "Mombasa, Kenya",
    contact: { phone: "+254723456789", email: "david.omondi@example.com", website: "www.davidspeech.co.ke" },
    description: "Focuses on communication disorders and early intervention.",
  },
  {
    id: "3",
    name: "Ms. Grace Wanjiru",
    specialty: "Special Education Teacher",
    location: "Kisumu, Kenya",
    contact: { phone: "+254734567890", email: "grace.wanjiru@example.com" },
    description: "Provides individualized education plans and learning support.",
  },
]

export default function HealthSpecialistFlow() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Find Health Specialists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input placeholder="Search by specialty or name..." className="w-full" />
        <Input placeholder="Filter by location..." className="w-full" />
        <Button className="w-full md:col-span-2">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHealthSpecialists.map((specialist) => (
          <Card key={specialist.id}>
            <CardHeader>
              <CardTitle>{specialist.name}</CardTitle>
              <p className="text-sm text-gray-500">{specialist.specialty}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="mr-2 h-4 w-4 text-gray-500" /> {specialist.location}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="mr-2 h-4 w-4 text-gray-500" /> {specialist.contact.phone}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Mail className="mr-2 h-4 w-4 text-gray-500" /> {specialist.contact.email}
              </div>
              {specialist.contact.website && (
                <div className="flex items-center text-sm text-gray-700">
                  <Globe className="mr-2 h-4 w-4 text-gray-500" />{" "}
                  <a
                    href={specialist.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {specialist.contact.website}
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2">{specialist.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
