"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Search, User, LogOut, Menu } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import HealthSpecialistFlow from "./HealthSpecialistFlow"
import SchoolSearchFlow from "./SchoolSearchFlow"
import OutdoorClubsFlow from "./OutdoorClubsFlow"
import { toast } from "sonner"

type ActiveFlow = "home" | "specialists" | "schools" | "clubs" | "profile"

export default function MainAppClient() {
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>("home")
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully!")
      router.push("/auth")
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out.")
    }
  }

  const renderContent = () => {
    switch (activeFlow) {
      case "home":
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to IncluLearn Global</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your comprehensive platform for connecting with special needs resources in Kenya.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              <Card
                className="p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("specialists")}
              >
                <Search className="h-10 w-10 mb-3 text-primary" />
                <h3 className="text-xl font-semibold">Health Specialists</h3>
                <p className="text-sm text-muted-foreground mt-2">Find pediatricians, therapists, and more.</p>
              </Card>
              <Card
                className="p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("schools")}
              >
                <Search className="h-10 w-10 mb-3 text-primary" />
                <h3 className="text-xl font-semibold">Schools & Institutions</h3>
                <p className="text-sm text-muted-foreground mt-2">Discover inclusive educational environments.</p>
              </Card>
              <Card
                className="p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveFlow("clubs")}
              >
                <Search className="h-10 w-10 mb-3 text-primary" />
                <h3 className="text-xl font-semibold">Outdoor & Social Clubs</h3>
                <p className="text-sm text-muted-foreground mt-2">Explore recreational activities and communities.</p>
              </Card>
            </div>
          </div>
        )
      case "specialists":
        return <HealthSpecialistFlow />
      case "schools":
        return <SchoolSearchFlow />
      case "clubs":
        return <OutdoorClubsFlow />
      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">User Profile</h2>
            <Card className="p-6">
              <p className="text-lg">**Email:** {user?.email}</p>
              <p className="text-lg mt-2">**User ID:** {user?.id}</p>
              {/* Add more profile details here */}
              <Button onClick={handleSignOut} className="mt-6" variant="destructive">
                Sign Out
              </Button>
            </Card>
          </div>
        )
      default:
        return null
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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Button variant="ghost" className="justify-start" onClick={() => setActiveFlow("home")}>
                <Home className="h-5 w-5 mr-2" /> Home
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => setActiveFlow("specialists")}>
                <Search className="h-5 w-5 mr-2" /> Health Specialists
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => setActiveFlow("schools")}>
                <Search className="h-5 w-5 mr-2" /> Schools & Institutions
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => setActiveFlow("clubs")}>
                <Search className="h-5 w-5 mr-2" /> Outdoor & Social Clubs
              </Button>
            </nav>
            <div className="mt-auto">
              <Button variant="ghost" className="justify-start w-full" onClick={() => setActiveFlow("profile")}>
                <User className="h-5 w-5 mr-2" /> Profile
              </Button>
              <Button variant="ghost" className="justify-start w-full text-destructive" onClick={handleSignOut}>
                <LogOut className="h-5 w-5 mr-2" /> Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Button variant="ghost" onClick={() => setActiveFlow("home")}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => setActiveFlow("specialists")}>
            Health Specialists
          </Button>
          <Button variant="ghost" onClick={() => setActiveFlow("schools")}>
            Schools & Institutions
          </Button>
          <Button variant="ghost" onClick={() => setActiveFlow("clubs")}>
            Outdoor & Social Clubs
          </Button>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveFlow("profile")}>My Account</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{renderContent()}</main>
    </div>
  )
}
