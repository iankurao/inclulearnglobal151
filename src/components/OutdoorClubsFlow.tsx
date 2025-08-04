"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ArrowRight, TreePine, MapPin, Phone, Mail, Users, Brain, Loader2, Globe, Clock } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { generateEmbedding, createSearchQuery, calculateMatchPercentage, generateAIReasoning } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface OutdoorClubsFlowProps {
  onBack: () => void
}

interface FormData {
  childAge: string
  interests: string[]
  activityType: string[]
  location: string
  supportNeeds: string[]
  budgetRange: string
}

interface OutdoorClub {
  id: string
  name: string
  activity_type: string
  location: string
  contact_phone: string | null
  contact_email: string | null
  website: string | null
  age_range: string | null
  max_participants: number | null
  current_participants: number | null
  monthly_fee: number | null
  description: string | null
  activities: string[] | null
  support_services: string[] | null
  accessibility_features: string[] | null
  meeting_schedule: string | null
  similarity?: number
}

export default function OutdoorClubsFlow({ onBack }: OutdoorClubsFlowProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(true)
  const [results, setResults] = useState<OutdoorClub[]>([])
  const [formData, setFormData] = useState<FormData>({
    childAge: "",
    interests: [],
    activityType: [],
    location: "",
    supportNeeds: [],
    budgetRange: "",
  })

  const interests = [
    "Nature & Wildlife",
    "Arts & Crafts",
    "Sports & Fitness",
    "Music & Dance",
    "Science & Discovery",
    "Adventure Activities",
    "Social Games",
    "Photography",
    "Gardening",
    "Cooking",
  ]

  const activityTypes = [
    "Nature & Science",
    "Arts & Crafts",
    "Adaptive Sports",
    "Outdoor Adventure",
    "Music & Performance",
    "Social Skills Groups",
    "Life Skills Training",
    "Therapeutic Activities",
  ]

  const supportNeeds = [
    "One-on-one assistance",
    "Sensory support",
    "Communication support",
    "Behavioral support",
    "Mobility assistance",
    "Medical support",
    "Transportation",
    "Flexible participation",
  ]

  const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Meru"]

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value),
    }))
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      if (aiEnabled) {
        // AI-powered search
        const searchQuery = createSearchQuery(formData, "outdoor_clubs")
        const embedding = await generateEmbedding(searchQuery)

        const { data, error } = await supabase.rpc("match_outdoor_clubs", {
          query_embedding: embedding,
          match_threshold: 0.3,
          match_count: 10,
        })

        if (error) throw error

        const resultsWithAI = data.map((club: any) => ({
          ...club,
          matchPercentage: calculateMatchPercentage(club.similarity),
          aiReasoning: generateAIReasoning(club, searchQuery, club.similarity),
        }))

        setResults(resultsWithAI)
      } else {
        // Traditional search
        let query = supabase.from("outdoor_clubs").select("*")

        if (formData.location) {
          query = query.ilike("location", `%${formData.location}%`)
        }

        if (formData.activityType.length > 0) {
          query = query.overlaps("activities", formData.activityType)
        }

        const { data, error } = await query.limit(10)

        if (error) throw error
        setResults(data || [])
      }

      setStep(3)
      toast.success(`Found ${results.length} outdoor clubs`)
    } catch (error) {
      console.error("Search error:", error)
      toast.error("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TreePine className="w-5 h-5 text-orange-600" />
          Child's Interests & Age
        </CardTitle>
        <CardDescription>Tell us about your child's interests and activity preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="childAge">Child's Age</Label>
          <Input
            id="childAge"
            type="number"
            placeholder="Enter age in years"
            value={formData.childAge}
            onChange={(e) => setFormData((prev) => ({ ...prev, childAge: e.target.value }))}
          />
        </div>

        <div className="space-y-3">
          <Label>Child's Interests</Label>
          <div className="grid grid-cols-2 gap-2">
            {interests.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={formData.interests.includes(interest)}
                  onCheckedChange={(checked) => handleCheckboxChange("interests", interest, checked as boolean)}
                />
                <Label htmlFor={interest} className="text-sm">
                  {interest}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Preferred Activity Types</Label>
          <div className="grid grid-cols-2 gap-2">
            {activityTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={formData.activityType.includes(type)}
                  onCheckedChange={(checked) => handleCheckboxChange("activityType", type, checked as boolean)}
                />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => setStep(2)}
          className="w-full"
          disabled={!formData.childAge || formData.interests.length === 0}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Location & Support Needs</CardTitle>
        <CardDescription>Specify location preferences and any support your child might need</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="location">Preferred Location</Label>
          <select
            id="location"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <Label>Support Services Needed</Label>
          <div className="grid grid-cols-2 gap-2">
            {supportNeeds.map((need) => (
              <div key={need} className="flex items-center space-x-2">
                <Checkbox
                  id={need}
                  checked={formData.supportNeeds.includes(need)}
                  onCheckedChange={(checked) => handleCheckboxChange("supportNeeds", need, checked as boolean)}
                />
                <Label htmlFor={need} className="text-sm">
                  {need}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range (KES per month)</Label>
          <select
            id="budget"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.budgetRange}
            onChange={(e) => setFormData((prev) => ({ ...prev, budgetRange: e.target.value }))}
          >
            <option value="">Select budget range</option>
            <option value="1000-2000">KES 1,000 - 2,000</option>
            <option value="2000-3000">KES 2,000 - 3,000</option>
            <option value="3000-4000">KES 3,000 - 4,000</option>
            <option value="4000+">KES 4,000+</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-orange-600" />
            <div>
              <Label htmlFor="ai-toggle" className="font-medium">
                AI-Powered Search
              </Label>
              <p className="text-sm text-gray-600">Get personalized activity recommendations</p>
            </div>
          </div>
          <Switch id="ai-toggle" checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSearch} className="flex-1 bg-orange-600 hover:bg-orange-700" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Outdoor Clubs & Activities Found</span>
            <Badge variant="secondary">{results.length} results</Badge>
          </CardTitle>
          <CardDescription>
            {aiEnabled
              ? "AI-powered recommendations based on your requirements"
              : "Search results matching your criteria"}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {results.map((club) => (
          <Card key={club.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
                  <p className="text-orange-600 font-medium">{club.activity_type}</p>
                </div>
                <div className="text-right">
                  {aiEnabled && club.similarity && (
                    <Badge className="mb-2 bg-orange-600">{calculateMatchPercentage(club.similarity)}% Match</Badge>
                  )}
                  {club.age_range && <p className="text-sm text-gray-600">Ages: {club.age_range}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{club.location}</span>
                  </div>
                  {club.contact_phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{club.contact_phone}</span>
                    </div>
                  )}
                  {club.contact_email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{club.contact_email}</span>
                    </div>
                  )}
                  {club.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href={club.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {club.max_participants && club.current_participants && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>
                        {club.current_participants}/{club.max_participants} participants
                      </span>
                    </div>
                  )}
                  {club.monthly_fee && (
                    <p className="text-sm text-gray-600">
                      <strong>Monthly Fee:</strong> KES {club.monthly_fee.toLocaleString()}
                    </p>
                  )}
                  {club.meeting_schedule && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{club.meeting_schedule}</span>
                    </div>
                  )}
                </div>
              </div>

              {club.description && <p className="text-gray-700 mb-4">{club.description}</p>}

              {club.activities && club.activities.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Activities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {club.activities.map((activity, index) => (
                      <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {club.support_services && club.support_services.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Support Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {club.support_services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {club.accessibility_features && club.accessibility_features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Accessibility Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {club.accessibility_features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {aiEnabled && (club as any).aiReasoning && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900 mb-1">AI Recommendation</h4>
                      <p className="text-orange-800 text-sm">{(club as any).aiReasoning}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Join Club</Button>
                <Button variant="outline">Save to Favorites</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Search
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-orange-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-orange-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  )
}
