import AuthFormClient from "@/components/AuthFormClient"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <AuthFormClient />
    </div>
  )
}
