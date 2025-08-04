import MainAppClient from "@/components/MainAppClient"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// This is a Server Component. It only renders the client component.
export default async function HomePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  return <MainAppClient />
}
