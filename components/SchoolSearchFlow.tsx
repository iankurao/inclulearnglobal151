import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Phone, Globe, Mail } from "lucide-react"

interface School {
  id: string
  name: string
  location: string
  type: string // e.g., "Special Needs School", "Integrated School"
  contact: {
    phone: string
    email?: string
    website?: string
  }
  description: string
}

const mockSchools: School[] = [
  {
    id: "1",
    name: "Hope Academy for Special Needs",
    location: "Nairobi, Kenya",
    type: "Special Needs School",
    contact: { phone: "+254700112233", website: "www.hopeacademy.org" },
    description: "Dedicated to providing inclusive education for children with various special needs.",
  },
  {
    id: "2",
    name: "Green Valley Integrated School",
    location: "Nakuru, Kenya",
    type: "Integrated School",
    contact: { phone: "+254711223344", email: "info@greenvalley.co.ke" },
    description: "Offers an integrated curriculum for children with and without special needs.",
  },
  {
    id: "3",
    name: "Bright Future Learning Centre",
    location: "Eldoret, Kenya",
    type: "Special Needs School",
    contact: { phone: "+254722334455" },
    description: "Focuses on individualized learning plans and therapy services.",
  },
]

export default function SchoolSearchFlow() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Find Schools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input placeholder="Search by school name or type..." className="w-full" />
        <Input placeholder="Filter by location..." className="w-full" />
        <Button className="w-full md:col-span-2">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSchools.map((school) => (
          <Card key={school.id}>
            <CardHeader>
              <CardTitle>{school.name}</CardTitle>
              <p className="text-sm text-gray-500">{school.type}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="mr-2 h-4 w-4 text-gray-500" /> {school.location}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="mr-2 h-4 w-4 text-gray-500" /> {school.contact.phone}
              </div>
              {school.contact.email && (
                <div className="flex items-center text-sm text-gray-700">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" /> {school.contact.email}
                </div>
              )}
              {school.contact.website && (
                <div className="flex items-center text-sm text-gray-700">
                  <Globe className="mr-2 h-4 w-4 text-gray-500" />{" "}
                  <a
                    href={school.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {school.contact.website}
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2">{school.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
