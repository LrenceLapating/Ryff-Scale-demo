"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, ArrowLeft, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock user accounts
const MOCK_USERS = {
  counselor: { email: "counselor@example.com", password: "counselor123" },
  student: { email: "student@example.com", password: "student123" },
  superadmin: { email: "superadmin@example.com", password: "superadmin123" }
}

// Component to handle search params
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Check for registration success message
  useEffect(() => {
    if (searchParams && searchParams.has("registered")) {
      setSuccessMessage("Registration successful! You can now log in.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real application, you would validate credentials with an API
      // For this demo, we'll simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock login validation with role-based redirection
      if (email === MOCK_USERS.counselor.email && password === MOCK_USERS.counselor.password) {
        // Redirect counselor to dashboard
        router.push("/dashboard")
      } else if (email === MOCK_USERS.student.email && password === MOCK_USERS.student.password) {
        // Redirect student to onboarding if first login, otherwise to student dashboard
        // For this demo, always redirect to onboarding
        router.push("/student-onboarding")
      } else if (email === MOCK_USERS.superadmin.email && password === MOCK_USERS.superadmin.password) {
        // Redirect super admin to dashboard with super admin role
        router.push("/dashboard?role=superadmin")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      {error && (
        <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link 
            href="/forgot-password" 
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
        />
        <Label 
          htmlFor="remember" 
          className="text-sm font-normal cursor-pointer"
        >
          Remember me
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/landing" className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>Ryff PWB</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
              <div className="flex justify-center">
                <Link href="/landing" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" />
                  Back to home
                </Link>
              </div>
            </CardFooter>
          </Card>
          
          {/* Demo credentials */}
          <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-white">
            <p className="text-sm text-center font-medium mb-2">Demo Credentials</p>
            <div className="text-xs text-gray-500 space-y-3">
              <div className="pb-2 border-b">
                <p className="font-medium text-primary mb-1">Counselor Account:</p>
                <p><span className="font-medium">Email:</span> counselor@example.com</p>
                <p><span className="font-medium">Password:</span> counselor123</p>
              </div>
              <div className="pb-2 border-b">
                <p className="font-medium text-primary mb-1">Student Account:</p>
                <p><span className="font-medium">Email:</span> student@example.com</p>
                <p><span className="font-medium">Password:</span> student123</p>
              </div>
              <div>
                <p className="font-medium text-primary mb-1">Super Admin Account:</p>
                <p><span className="font-medium">Email:</span> superadmin@example.com</p>
                <p><span className="font-medium">Password:</span> superadmin123</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t text-center text-xs text-gray-500">
        © 2024 Ryff PWB Assessment System. All rights reserved.
      </footer>
    </div>
  )
} 