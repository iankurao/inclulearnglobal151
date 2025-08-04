import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/app/integrations/supabase/types"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Action or Route Handler
            // This error is typically ignored if this is called from a Server Component
            // or Server Action, as the cookies are set by the browser.
            console.warn("Could not set cookie:", error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Action or Route Handler
            // This error is typically ignored if this is called from a Server Component
            // or Server Action, as the cookies are set by the browser.
            console.warn("Could not remove cookie:", error)
          }
        },
      },
    },
  )
}
