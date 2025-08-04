"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import HealthSpecialistFlow from "@/components/HealthSpecialistFlow"
import SchoolSearchFlow from "@/components/SchoolSearchFlow"
import OutdoorClubsFlow from "@/components/OutdoorClubsFlow"
import { ModeToggle } from "@/components/mode-toggle"
import { LogOut, Home, Stethoscope, School, Mountain } from "lucide-react"

type FlowType = "home" | "specialists" | "schools" | "clubs"

export default function MainAppClient() {
  const { user, signOut } = useAuth()
  const [currentFlow, setCurrentFlow] = useState<FlowType>("home")

  const handleSignOut = async () => {
    await signOut()
  }

  const renderFlow = () => {
    switch (currentFlow) {
      case "specialists":
        return <HealthSpecialistFlow />
      case "schools":
        return <SchoolSearchFlow />
      case "clubs":
        return <OutdoorClubsFlow />
      case "home":
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
            <Card className="w-full max-w-2xl text-center">
              <CardHeader>
                <CardTitle className="text-3xl">Welcome to IncluLearn Global, {user?.email}!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Your comprehensive platform for connecting with special needs resources in Kenya.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={() => setCurrentFlow("specialists")} className="h-auto py-4">
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Find Health Specialists
                  </Button>
                  <Button onClick={() => setCurrentFlow("schools")} className="h-auto py-4">
                    <School className="mr-2 h-5 w-5" />
                    Discover Schools
                  </Button>
                  <Button onClick={() => setCurrentFlow("clubs")} className="h-auto py-4">
                    <Mountain className="mr-2 h-5 w-5" />
                    Explore Outdoor Clubs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Button variant="ghost" onClick={() => setCurrentFlow("home")} className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span className="font-bold">Home</span>
            </Button>
            <Button variant="ghost" onClick={() => setCurrentFlow("specialists")}>
              Specialists
            </Button>
            <Button variant="ghost" onClick={() => setCurrentFlow("schools")}>
              Schools
            </Button>
            <Button variant="ghost" onClick={() => setCurrentFlow("clubs")}>
              Clubs
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{renderFlow()}</main>
      <footer className="border-t bg-background/80 py-4 text-center text-sm text-muted-foreground">
        © 2025 IncluLearn Global. All rights reserved.
      </footer>
    </div>
  )
}
