import AuthFormClient from "@/app/components/AuthFormClient"
import { createClient } from "@/app/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/")
  }

  return <AuthFormClient />
}
