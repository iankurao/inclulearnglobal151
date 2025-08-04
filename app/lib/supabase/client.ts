import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/app/integrations/supabase/types"

export function createClient() {
  // Create a single supabase client for the app
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
