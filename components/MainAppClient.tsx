"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import HealthSpecialistFlow from "./HealthSpecialistFlow"
import SchoolSearchFlow from "./SchoolSearchFlow"
import OutdoorClubsFlow from "./OutdoorClubsFlow"
import { LogOutIcon, UserIcon, HeartIcon, HistoryIcon } from "lucide-react"
import { toast } from "sonner"

type FlowType = "specialists" | "schools" | "clubs" | "profile" | "favorites" | "history" | null

export default function MainAppClient() {
  const { user, signOut } = useAuth()
  const [activeFlow, setActiveFlow] = useState<FlowType>("specialists")

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Signed out successfully!")
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 p-4 dark:bg-gray-900">
      <header className="flex w-full max-w-6xl items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-primary">IncluLearn Global</h1>
        <div className="flex items-center gap-4">
          {user && <span className="text-gray-700 dark:text-gray-300">Welcome, {user.email || "User"}!</span>}
          <Button variant="ghost" size="icon" onClick={() => setActiveFlow("profile")} aria-label="User Profile">
            <UserIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setActiveFlow("favorites")} aria-label="Favorites">
            <HeartIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setActiveFlow("history")} aria-label="Search History">
            <HistoryIcon className="h-5 w-5" />
          </Button>
          <Button onClick={handleSignOut} variant="outline">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <nav className="mt-4 flex w-full max-w-6xl justify-center gap-4 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
        <Button
          variant={activeFlow === "specialists" ? "default" : "ghost"}
          onClick={() => setActiveFlow("specialists")}
        >
          Health Specialists
        </Button>
        <Button variant={activeFlow === "schools" ? "default" : "ghost"} onClick={() => setActiveFlow("schools")}>
          Schools
        </Button>
        <Button variant={activeFlow === "clubs" ? "default" : "ghost"} onClick={() => setActiveFlow("clubs")}>
          Outdoor Clubs
        </Button>
      </nav>

      <main className="mt-4 w-full max-w-6xl">
        {activeFlow === "specialists" && <HealthSpecialistFlow />}
        {activeFlow === "schools" && <SchoolSearchFlow />}
        {activeFlow === "clubs" && <OutdoorClubsFlow />}
        {activeFlow === "profile" && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <p className="mt-2">Email: {user?.email}</p>
            <p className="mt-2 text-sm text-gray-500">
              This section will be expanded to manage user preferences, profile details, etc.
            </p>
          </Card>
        )}
        {activeFlow === "favorites" && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold">My Favorites</h2>
            <p className="mt-2 text-sm text-gray-500">
              This section will display your favorited specialists, schools, and clubs.
            </p>
          </Card>
        )}
        {activeFlow === "history" && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold">Search History</h2>
            <p className="mt-2 text-sm text-gray-500">This section will show your past search queries.</p>
          </Card>
        )}
      </main>
    </div>
  )
}
