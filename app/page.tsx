"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import HealthSpecialistFlow from "@/components/HealthSpecialistFlow"
import SchoolSearchFlow from "@/components/SchoolSearchFlow"
import OutdoorClubsFlow from "@/components/OutdoorClubsFlow"
import { toast } from "sonner"

export default function HomePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [activeFlow, setActiveFlow] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    router.push("/auth")
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully!")
    } catch (error) {
      toast.error("Failed to sign out.")
      console.error("Sign out error:", error)
    }
  }

  const renderFlowComponent = () => {
    switch (activeFlow) {
      case "healthSpecialists":
        return <HealthSpecialistFlow />
      case "schools":
        return <SchoolSearchFlow />
      case "outdoorClubs":
        return <OutdoorClubsFlow />
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}!</h2>
            <p className="text-gray-600 mb-6">Please select a category to get started.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("healthSpecialists")}
              >
                <CardHeader>
                  <CardTitle>Health Specialists</CardTitle>
                </CardHeader>
                <CardContent>Find therapists, doctors, and other health professionals.</CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("schools")}
              >
                <CardHeader>
                  <CardTitle>Schools</CardTitle>
                </CardHeader>
                <CardContent>Discover inclusive schools and learning centers.</CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("outdoorClubs")}
              >
                <CardHeader>
                  <CardTitle>Outdoor Clubs</CardTitle>
                </CardHeader>
                <CardContent>Explore accessible outdoor activities and clubs.</CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">IncluLearn Global</h1>
        <div className="flex items-center space-x-4">
          {activeFlow && (
            <Button variant="outline" onClick={() => setActiveFlow(null)}>
              Back to Categories
            </Button>
          )}
          <Button onClick={handleSignOut} variant="destructive">
            Sign Out
          </Button>
        </div>
      </header>
      <main className="p-8">{renderFlowComponent()}</main>
    </div>
  )
}
