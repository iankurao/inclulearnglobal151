import { createClient } from "@/lib/supabase/server"
import AuthFormClient from "@/components/AuthFormClient"
import MainAppClient from "@/components/MainAppClient"

export default async function IndexPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? <MainAppClient /> : <AuthFormClient />
}
