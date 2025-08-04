"use client"

import type React from "react"

import { useState } from "react"
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
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      const { error } = await signUp(email, password)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Sign up successful! Please check your email for a confirmation link.")
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Signed in successfully!")
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription className="text-center">
          {isSignUp ? "Create an account to get started" : "Enter your email and password to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Button variant="link" className="w-full" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Button>
      </CardContent>
    </Card>
  )
}
