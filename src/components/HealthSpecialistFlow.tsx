"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ArrowRight, Heart, MapPin, Phone, Mail, Star, Brain, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { generateEmbedding, createSearchQuery, calculateMatchPercentage, generateAIReasoning } from "@/lib/vectorSearch"
import { toast } from "sonner"

interface HealthSpecialistFlowProps {
  onBack: () => void
}

interface FormData {
  childAge: string
  disabilityType: string[]
  therapyType: string[]
  location: string
  supportNeeds: string[]
  languagePreference: string[]
  budgetRange: string
}

interface HealthSpecialist {
  id: string
  name: string
  specialty: string
  location: string
  contact_phone: string | null
  contact_email: string | null
  years_experience: number | null
  rating: number | null
  hourly_rate: number | null
  description: string | null
  therapy_services: string[] | null
  accessibility_features: string[] | null
  languages_spoken: string[] | null
  similarity?: number
}

export default function HealthSpecialistFlow({ onBack }: HealthSpecialistFlowProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(true)
  const [results, setResults] = useState<HealthSpecialist[]>([])
  const [formData, setFormData] = useState<FormData>({
    childAge: "",
    disabilityType: [],
    therapyType: [],
    location: "",
    supportNeeds: [],
    languagePreference: [],
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

  const therapyTypes = [
    "Speech Therapy",
    "Occupational Therapy",
    "Physical Therapy",
    "Behavioral Therapy",
    "Applied Behavior Analysis (ABA)",
    "Sensory Integration Therapy",
    "Music Therapy",
    "Art Therapy",
  ]

  const supportNeeds = [
    "Communication Support",
    "Mobility Assistance",
    "Behavioral Support",
    "Sensory Support",
    "Learning Support",
    "Social Skills Training",
    "Daily Living Skills",
    "Transition Planning",
  ]

  const languages = ["English", "Swahili", "Kikuyu", "Luo", "Kalenjin", "Kamba", "Sign Language"]

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
        const searchQuery = createSearchQuery(formData, "health_specialists")
        const embedding = await generateEmbedding(searchQuery)

        const { data, error } = await supabase.rpc("match_health_specialists", {
          query_embedding: embedding,
          match_threshold: 0.3,
          match_count: 10,
        })

        if (error) throw error

        const resultsWithAI = data.map((specialist: any) => ({
          ...specialist,
          matchPercentage: calculateMatchPercentage(specialist.similarity),
          aiReasoning: generateAIReasoning(specialist, searchQuery, specialist.similarity),
        }))

        setResults(resultsWithAI)
      } else {
        // Traditional search
        let query = supabase.from("health_specialists").select("*")

        if (formData.location) {
          query = query.ilike("location", `%${formData.location}%`)
        }

        if (formData.therapyType.length > 0) {
          query = query.overlaps("therapy_services", formData.therapyType)
        }

        const { data, error } = await query.limit(10)

        if (error) throw error
        setResults(data || [])
      }

      setStep(3)
      toast.success(`Found ${results.length} specialists`)
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
          <Heart className="w-5 h-5 text-blue-600" />
          Child Information
        </CardTitle>
        <CardDescription>Tell us about your child to find the best health specialists</CardDescription>
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

        <div className="space-y-3">
          <Label>Therapy Types Needed</Label>
          <div className="grid grid-cols-2 gap-2">
            {therapyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={formData.therapyType.includes(type)}
                  onCheckedChange={(checked) => handleCheckboxChange("therapyType", type, checked as boolean)}
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
        <CardTitle>Preferences & Location</CardTitle>
        <CardDescription>Help us find specialists that match your specific needs</CardDescription>
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
          <Label>Support Needs</Label>
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
          <Label>Language Preferences</Label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={formData.languagePreference.includes(language)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("languagePreference", language, checked as boolean)
                  }
                />
                <Label htmlFor={language} className="text-sm">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range (KES per session)</Label>
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

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <div>
              <Label htmlFor="ai-toggle" className="font-medium">
                AI-Powered Search
              </Label>
              <p className="text-sm text-gray-600">Get personalized recommendations</p>
            </div>
          </div>
          <Switch id="ai-toggle" checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSearch} className="flex-1" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Specialists
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
            <span>Health Specialists Found</span>
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
        {results.map((specialist) => (
          <Card key={specialist.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{specialist.name}</h3>
                  <p className="text-blue-600 font-medium">{specialist.specialty}</p>
                </div>
                <div className="text-right">
                  {aiEnabled && specialist.similarity && (
                    <Badge className="mb-2">{calculateMatchPercentage(specialist.similarity)}% Match</Badge>
                  )}
                  {specialist.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{specialist.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{specialist.location}</span>
                  </div>
                  {specialist.contact_phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{specialist.contact_phone}</span>
                    </div>
                  )}
                  {specialist.contact_email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{specialist.contact_email}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {specialist.years_experience && (
                    <p className="text-sm text-gray-600">
                      <strong>Experience:</strong> {specialist.years_experience} years
                    </p>
                  )}
                  {specialist.hourly_rate && (
                    <p className="text-sm text-gray-600">
                      <strong>Rate:</strong> KES {specialist.hourly_rate}/session
                    </p>
                  )}
                </div>
              </div>

              {specialist.description && <p className="text-gray-700 mb-4">{specialist.description}</p>}

              {specialist.therapy_services && specialist.therapy_services.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialist.therapy_services.map((service, index) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {specialist.accessibility_features && specialist.accessibility_features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Accessibility Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialist.accessibility_features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {specialist.languages_spoken && specialist.languages_spoken.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialist.languages_spoken.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {aiEnabled && (specialist as any).aiReasoning && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">AI Recommendation</h4>
                      <p className="text-blue-800 text-sm">{(specialist as any).aiReasoning}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <Button className="flex-1">Contact Specialist</Button>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
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
