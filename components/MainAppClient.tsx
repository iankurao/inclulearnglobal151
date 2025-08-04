"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Stethoscope, School, Users, LogOut } from "lucide-react"
import HealthSpecialistFlow from "@/components/HealthSpecialistFlow"
import SchoolSearchFlow from "@/components/SchoolSearchFlow"
import OutdoorClubsFlow from "@/components/OutdoorClubsFlow"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { ModeToggle } from "@/components/mode-toggle"

type ActiveFlow = "home" | "specialists" | "schools" | "clubs"

export default function MainAppClient() {
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>("home")
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Signed out successfully!")
    }
  }

  const renderFlow = () => {
    switch (activeFlow) {
      case "specialists":
        return <HealthSpecialistFlow />
      case "schools":
        return <SchoolSearchFlow />
      case "clubs":
        return <OutdoorClubsFlow />
      case "home":
      default:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to IncluLearn Global</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your comprehensive platform for connecting with special needs resources in Kenya. Use the navigation
                  to explore different categories of resources.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("specialists")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" /> Health Specialists
                  </CardTitle>
                </CardHeader>
                <CardContent>Find qualified health professionals specializing in various needs.</CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("schools")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" /> Schools
                  </CardTitle>
                </CardHeader>
                <CardContent>Discover educational institutions offering inclusive learning environments.</CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveFlow("clubs")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Outdoor Clubs
                  </CardTitle>
                </CardHeader>
                <CardContent>Explore clubs and activities promoting outdoor engagement for all abilities.</CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setActiveFlow("home")} className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span className="font-semibold">IncluLearn Global</span>
          </Button>
          <Button variant="ghost" onClick={() => setActiveFlow("specialists")}>
            Specialists
          </Button>
          <Button variant="ghost" onClick={() => setActiveFlow("schools")}>
            Schools
          </Button>
          <Button variant="ghost" onClick={() => setActiveFlow("clubs")}>
            Clubs
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">{renderFlow()}</main>
    </div>
  )
}
