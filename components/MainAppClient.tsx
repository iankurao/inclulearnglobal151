"use client"

import { useState } from "react"
import { Home, Search, Heart, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import HealthSpecialistFlow from "./HealthSpecialistFlow"
import SchoolSearchFlow from "./SchoolSearchFlow"
import OutdoorClubsFlow from "./OutdoorClubsFlow"
import { toast } from "sonner"
import { ModeToggle } from "./mode-toggle" // Assuming you have a ModeToggle component

type FlowType = "home" | "specialists" | "schools" | "clubs" | "profile" | "favorites" | "searchHistory"

export default function MainAppClient() {
  const [activeFlow, setActiveFlow] = useState<FlowType>("home")
  const { user, signOut, loading } = useAuth()

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
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <h1 className="text-3xl font-bold">Welcome to IncluLearn Global</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Your comprehensive platform for connecting with special needs resources in Kenya.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Button onClick={() => setActiveFlow("specialists")} className="h-auto p-6 text-lg">
                <Search className="mr-2 h-6 w-6" /> Find Specialists
              </Button>
              <Button onClick={() => setActiveFlow("schools")} className="h-auto p-6 text-lg">
                <Search className="mr-2 h-6 w-6" /> Search Schools
              </Button>
              <Button onClick={() => setActiveFlow("clubs")} className="h-auto p-6 text-lg">
                <Search className="mr-2 h-6 w-6" /> Explore Clubs
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
        <div className="mb-6 text-2xl font-bold">IncluLearn</div>
        <nav className="flex-1 space-y-2">
          <Button
            variant={activeFlow === "home" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFlow("home")}
          >
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <Button
            variant={activeFlow === "specialists" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFlow("specialists")}
          >
            <Search className="mr-2 h-4 w-4" /> Health Specialists
          </Button>
          <Button
            variant={activeFlow === "schools" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFlow("schools")}
          >
            <Search className="mr-2 h-4 w-4" /> Schools
          </Button>
          <Button
            variant={activeFlow === "clubs" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFlow("clubs")}
          >
            <Search className="mr-2 h-4 w-4" /> Outdoor Clubs
          </Button>
          <Separator />
          <Button
            variant={activeFlow === "favorites" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFlow("favorites")}
          >
            <Heart className="mr-2 h-4 w-4" /> Favorites
          </Button>
          <Button
            variant={activeFlow === "profile" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFlow("profile")}
          >
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <ModeToggle />
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" /> {loading ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex flex-1 flex-col">
        {/* Top bar for mobile */}
        <header className="flex items-center justify-between border-b bg-background p-4 md:hidden">
          <div className="text-xl font-bold">IncluLearn</div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="mb-6 text-2xl font-bold">IncluLearn</div>
              <nav className="flex-1 space-y-2">
                <Button
                  variant={activeFlow === "home" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveFlow("home")
                  }}
                >
                  <Home className="mr-2 h-4 w-4" /> Home
                </Button>
                <Button
                  variant={activeFlow === "specialists" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveFlow("specialists")
                  }}
                >
                  <Search className="mr-2 h-4 w-4" /> Health Specialists
                </Button>
                <Button
                  variant={activeFlow === "schools" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveFlow("schools")
                  }}
                >
                  <Search className="mr-2 h-4 w-4" /> Schools
                </Button>
                <Button
                  variant={activeFlow === "clubs" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveFlow("clubs")
                  }}
                >
                  <Search className="mr-2 h-4 w-4" /> Outdoor Clubs
                </Button>
                <Separator />
                <Button
                  variant={activeFlow === "favorites" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveFlow("favorites")}
                >
                  <Heart className="mr-2 h-4 w-4" /> Favorites
                </Button>
                <Button
                  variant={activeFlow === "profile" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveFlow("profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <ModeToggle />
                <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut} disabled={loading}>
                  <LogOut className="mr-2 h-4 w-4" /> {loading ? "Signing out..." : "Sign Out"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <div className="flex-1 overflow-auto">{renderFlow()}</div>
      </main>
    </div>
  )
}
