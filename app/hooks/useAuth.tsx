"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext, useCallback } from "react"
import { createClient } from "@/app/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    // Initial check
    supabase.auth.getUser().then(({ data: { user: initialUser } }) => {
      setUser(initialUser)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    return { error }
  }, [supabase])

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
