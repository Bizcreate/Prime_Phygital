"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green opacity-70 blur-sm" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-black">
                  <span className="text-2xl font-bold text-white">P</span>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Prime
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                  Phygital
                </span>
              </span>
            </Link>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-white/70 mt-2">Sign in to your account to continue</p>
          </div>

          <Card className="glass-panel border-white/10">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">
                          Password
                        </label>
                        <Link href="/forgot-password" className="text-sm text-neon-blue hover:text-neon-purple">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          className="bg-white/5 border-white/10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-white/70" />
                          ) : (
                            <Eye className="h-4 w-4 text-white/70" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="mt-6 text-center text-sm text-white/70">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        className="text-neon-blue hover:text-neon-purple"
                        onClick={() =>
                          document.querySelector('[value="signup"]')?.dispatchEvent(new MouseEvent("click"))
                        }
                      >
                        Sign up
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input id="first-name" placeholder="John" required className="bg-white/5 border-white/10" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input id="last-name" placeholder="Doe" required className="bg-white/5 border-white/10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          className="bg-white/5 border-white/10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-white/70" />
                          ) : (
                            <Eye className="h-4 w-4 text-white/70" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                      <p className="text-xs text-white/50">
                        Password must be at least 8 characters long with a number and special character.
                      </p>
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-white/70">
                        I agree to the{" "}
                        <Link href="/terms" className="text-neon-blue hover:text-neon-purple">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-neon-blue hover:text-neon-purple">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <div className="mt-6 text-center text-sm text-white/70">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-neon-blue hover:text-neon-purple"
                        onClick={() =>
                          document.querySelector('[value="login"]')?.dispatchEvent(new MouseEvent("click"))
                        }
                      >
                        Sign in
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  )
}
