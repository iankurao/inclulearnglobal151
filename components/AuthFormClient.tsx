"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function AuthFormClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        await signUp(email, password)
        toast.success("Sign up successful! Please check your email to confirm your account.")
      } else {
        await signIn(email, password)
        toast.success("Sign in successful!")
        router.push("/")
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription>{isSignUp ? "Create an account to get started." : "Sign in to your account."}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (isSignUp ? "Signing Up..." : "Signing In...") : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="p-0 h-auto">
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
