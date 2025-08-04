"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ArrowRight, GraduationCap, MapPin, Phone, Mail, Users, Brain, Loader2, Globe } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { generateEmbedding, createSearchQuery, calculateMatchPercentage, generateAIReasoning } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface SchoolSearchFlowProps {
  onBack: () => void
}

interface FormData {
  childAge: string
  disabilityType: string[]
  schoolType: string
  location: string
  supportNeeds: string[]
  interests: string[]
  budgetRange: string
}

interface School {
  id: string
  name: string
  type: string
  location: string
  contact_phone: string | null
  contact_email: string | null
  website: string | null
  age_range: string | null
  capacity: number | null
  current_enrollment: number | null
  tuition_fees: number | null
  description: string | null
  special_programs: string[] | null
  accessibility_features: string[] | null
  languages_of_instruction: string[] | null
  extracurricular_activities: string[] | null
  similarity?: number
}

export default function SchoolSearchFlow({ onBack }: SchoolSearchFlowProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(true)
  const [results, setResults] = useState<School[]>([])
  const [formData, setFormData] = useState<FormData>({
    childAge: "",
    disabilityType: [],
    schoolType: "",
    location: "",
    supportNeeds: [],
    interests: [],
    budgetRange: "",
  })

  const disabilityTypes = [
    "Autism Spectrum Disorder",
    "ADHD",
    "Cerebral Palsy",
    "Down Syndrome",
    "Learning Disabilities",
    "Speech Delays",
    "Hearing Impairment",
    "Visual Impairment",
    "Intellectual Disability",
    "Multiple Disabilities",
  ]

  const schoolTypes = [
    "Special Needs School",
    "Inclusive School",
    "Mainstream with Support",
    "Learning Support School",
    "Therapeutic School",
  ]

  const supportNeeds = [
    "Individualized Education Plans",
    "Speech Therapy",
    "Occupational Therapy",
    "Behavioral Support",
    "Learning Support",
    "Mobility Assistance",
    "Communication Support",
    "Transition Planning",
  ]

  const interests = [
    "Arts & Crafts",
    "Music",
    "Sports",
    "Science",
    "Technology",
    "Drama",
    "Reading",
    "Mathematics",
    "Social Activities",
    "Life Skills",
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
        const searchQuery = createSearchQuery(formData, "schools")
        const embedding = await generateEmbedding(searchQuery)

        const { data, error } = await supabase.rpc("match_schools", {
          query_embedding: embedding,
          match_threshold: 0.3,
          match_count: 10,
        })

        if (error) throw error

        const resultsWithAI = data.map((school: any) => ({
          ...school,
          matchPercentage: calculateMatchPercentage(school.similarity),
          aiReasoning: generateAIReasoning(school, searchQuery, school.similarity),
        }))

        setResults(resultsWithAI)
      } else {
        // Traditional search
        let query = supabase.from("schools").select("*")

        if (formData.location) {
          query = query.ilike("location", `%${formData.location}%`)
        }

        if (formData.schoolType) {
          query = query.ilike("type", `%${formData.schoolType}%`)
        }

        if (formData.supportNeeds.length > 0) {
          query = query.overlaps("special_programs", formData.supportNeeds)
        }

        const { data, error } = await query.limit(10)

        if (error) throw error
        setResults(data || [])
      }

      setStep(3)
      toast.success(`Found ${results.length} schools`)
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
          <GraduationCap className="w-5 h-5 text-green-600" />
          Child & Educational Needs
        </CardTitle>
        <CardDescription>Help us understand your child's educational requirements</CardDescription>
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
          <Label>Disability Type(s)</Label>
          <div className="grid grid-cols-2 gap-2">
            {disabilityTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={formData.disabilityType.includes(type)}
                  onCheckedChange={(checked) => handleCheckboxChange("disabilityType", type, checked as boolean)}
                />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolType">Preferred School Type</Label>
          <select
            id="schoolType"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.schoolType}
            onChange={(e) => setFormData((prev) => ({ ...prev, schoolType: e.target.value }))}
          >
            <option value="">Select school type</option>
            {schoolTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={() => setStep(2)}
          className="w-full"
          disabled={!formData.childAge || formData.disabilityType.length === 0}
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
        <CardTitle>Location & Preferences</CardTitle>
        <CardDescription>Specify your location and educational preferences</CardDescription>
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

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range (KES per term)</Label>
          <select
            id="budget"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.budgetRange}
            onChange={(e) => setFormData((prev) => ({ ...prev, budgetRange: e.target.value }))}
          >
            <option value="">Select budget range</option>
            <option value="50000-100000">KES 50,000 - 100,000</option>
            <option value="100000-150000">KES 100,000 - 150,000</option>
            <option value="150000-200000">KES 150,000 - 200,000</option>
            <option value="200000+">KES 200,000+</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-green-600" />
            <div>
              <Label htmlFor="ai-toggle" className="font-medium">
                AI-Powered Search
              </Label>
              <p className="text-sm text-gray-600">Get personalized school recommendations</p>
            </div>
          </div>
          <Switch id="ai-toggle" checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSearch} className="flex-1 bg-green-600 hover:bg-green-700" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Schools
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
            <span>Schools Found</span>
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
        {results.map((school) => (
          <Card key={school.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{school.name}</h3>
                  <p className="text-green-600 font-medium">{school.type}</p>
                </div>
                <div className="text-right">
                  {aiEnabled && school.similarity && (
                    <Badge className="mb-2 bg-green-600">{calculateMatchPercentage(school.similarity)}% Match</Badge>
                  )}
                  {school.age_range && <p className="text-sm text-gray-600">Ages: {school.age_range}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{school.location}</span>
                  </div>
                  {school.contact_phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{school.contact_phone}</span>
                    </div>
                  )}
                  {school.contact_email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{school.contact_email}</span>
                    </div>
                  )}
                  {school.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href={school.website}
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
                  {school.capacity && school.current_enrollment && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>
                        {school.current_enrollment}/{school.capacity} students
                      </span>
                    </div>
                  )}
                  {school.tuition_fees && (
                    <p className="text-sm text-gray-600">
                      <strong>Tuition:</strong> KES {school.tuition_fees.toLocaleString()}/term
                    </p>
                  )}
                </div>
              </div>

              {school.description && <p className="text-gray-700 mb-4">{school.description}</p>}

              {school.special_programs && school.special_programs.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Special Programs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.special_programs.map((program, index) => (
                      <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {school.accessibility_features && school.accessibility_features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Accessibility Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.accessibility_features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {school.extracurricular_activities && school.extracurricular_activities.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Extracurricular Activities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.extracurricular_activities.map((activity, index) => (
                      <Badge key={index} variant="outline">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {school.languages_of_instruction && school.languages_of_instruction.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Languages of Instruction:</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.languages_of_instruction.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {aiEnabled && (school as any).aiReasoning && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">AI Recommendation</h4>
                      <p className="text-green-800 text-sm">{(school as any).aiReasoning}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">Contact School</Button>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
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
