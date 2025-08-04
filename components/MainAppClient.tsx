"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, GraduationCap, TreePine, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import HealthSpecialistFlow from "@/components/HealthSpecialistFlow"
import SchoolSearchFlow from "@/components/SchoolSearchFlow"
import OutdoorClubsFlow from "@/components/OutdoorClubsFlow"
import { toast } from "sonner"

export default function MainAppClient() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("health")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully!")
    } catch (error) {
      toast.error("Failed to sign out.")
      console.error("Sign out error:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">IncluLearn Global</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to IncluLearn Global</h2>
          <p className="text-lg text-gray-600">
            Your comprehensive platform for connecting with special needs resources in Kenya
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Health Specialists
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Schools
            </TabsTrigger>
            <TabsTrigger value="outdoor" className="flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Outdoor Clubs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-6">
            <HealthSpecialistFlow />
          </TabsContent>

          <TabsContent value="schools" className="space-y-6">
            <SchoolSearchFlow />
          </TabsContent>

          <TabsContent value="outdoor" className="space-y-6">
            <OutdoorClubsFlow />
          </TabsContent>
        </Tabs>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Health Specialists
              </CardTitle>
              <CardDescription>Connect with qualified health professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Find occupational therapists, speech pathologists, and other specialists near you.
              </p>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("health")}>
                Explore Specialists
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Special Needs Schools
              </CardTitle>
              <CardDescription>Discover educational institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Find schools and learning centers that support children with special needs.
              </p>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("schools")}>
                Find Schools
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-orange-600" />
                Outdoor Activities
              </CardTitle>
              <CardDescription>Join inclusive outdoor clubs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Participate in outdoor activities designed for children with special needs.
              </p>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("outdoor")}>
                Join Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
