"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { createClient } from "@/app/lib/supabase/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function AuthFormClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let error = null
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        error = signUpError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        error = signInError
      }

      if (error) {
        toast.error("Authentication Error", { description: error.message })
      } else {
        toast.success(
          isSignUp ? "Sign up successful! Check your email for a confirmation link." : "Signed in successfully!",
        )
        // Supabase client-side auth automatically redirects on successful sign-in
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred", { description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} disabled={loading}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
