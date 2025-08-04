import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, GraduationCap, TreePine, ArrowRight, Star, MapPin, Phone, Mail } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import HealthSpecialistFlow from "@/components/HealthSpecialistFlow"
import SchoolSearchFlow from "@/components/SchoolSearchFlow"
import OutdoorClubsFlow from "@/components/OutdoorClubsFlow"

export default function Index() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null)
  const { user, signOut } = useAuth()

  if (activeFlow === "health") {
    return <HealthSpecialistFlow onBack={() => setActiveFlow(null)} />
  }

  if (activeFlow === "schools") {
    return <SchoolSearchFlow onBack={() => setActiveFlow(null)} />
  }

  if (activeFlow === "outdoor") {
    return <OutdoorClubsFlow onBack={() => setActiveFlow(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">IncluLearn Global</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <Button variant="outline" onClick={signOut}>
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting Families with
            <span className="text-blue-600"> Special Needs Resources</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the perfect health specialists, inclusive schools, and outdoor activities for children with special
            needs in Kenya. Powered by AI for personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Matching
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Kenya-Wide Coverage
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Trusted by Families
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Path to Support</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Health Specialists */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Health Specialists</CardTitle>
                <CardDescription>Connect with qualified therapists and healthcare professionals</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Speech & Language Therapists</li>
                  <li>• Occupational Therapists</li>
                  <li>• Behavioral Specialists</li>
                  <li>• Physical Therapists</li>
                </ul>
                <Button
                  className="w-full group-hover:bg-blue-700 transition-colors"
                  onClick={() => setActiveFlow("health")}
                >
                  Find Specialists
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Schools */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Inclusive Schools</CardTitle>
                <CardDescription>Discover schools that provide excellent special needs education</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Special Needs Schools</li>
                  <li>• Inclusive Mainstream Schools</li>
                  <li>• Individualized Programs</li>
                  <li>• Accessibility Features</li>
                </ul>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                  onClick={() => setActiveFlow("schools")}
                >
                  Explore Schools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Outdoor Clubs */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <TreePine className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Outdoor Clubs</CardTitle>
                <CardDescription>Join inclusive outdoor activities and social groups</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Nature & Adventure Clubs</li>
                  <li>• Arts & Crafts Groups</li>
                  <li>• Adaptive Sports Programs</li>
                  <li>• Social Skills Activities</li>
                </ul>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 transition-colors"
                  onClick={() => setActiveFlow("outdoor")}
                >
                  Join Activities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose IncluLearn Global?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered Matching</h4>
              <p className="text-sm text-gray-600">
                Our intelligent system finds the best matches based on your child's specific needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Verified Professionals</h4>
              <p className="text-sm text-gray-600">
                All specialists and institutions are thoroughly vetted and verified
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Local Focus</h4>
              <p className="text-sm text-gray-600">Comprehensive coverage across Kenya with local expertise</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Family-Centered</h4>
              <p className="text-sm text-gray-600">
                Designed by families, for families navigating special needs journeys
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">IncluLearn Global</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering families with special needs children through technology and community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Health Specialists</li>
                <li>Inclusive Schools</li>
                <li>Outdoor Activities</li>
                <li>AI Matching</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community Forum</li>
                <li>Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+254-700-INCLU</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@inclulearn.ke</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 IncluLearn Global. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}