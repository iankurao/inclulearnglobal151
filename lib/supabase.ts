import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.")
}

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// This file is deprecated and should not be used.
// The correct Supabase client files are `lib/supabase/client.ts` and `lib/supabase/server.ts`.
