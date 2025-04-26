"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Role, type Permission, hasPermission } from "@/lib/permissions"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  hasPermission: (permission: Permission) => boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUserRole: (userId: string, role: Role) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate loading user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, this would be an API call to get the current user
        // For demo purposes, we'll simulate a logged-in admin user
        setTimeout(() => {
          setUser({
            id: "user_1",
            name: "Admin User",
            email: "admin@primephygital.com",
            role: "admin",
            avatar: "/user-avatar.png",
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Failed to load user:", error)
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false
    return hasPermission(user.role, permission)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate the user
      // For demo purposes, we'll simulate a successful login
      setTimeout(() => {
        setUser({
          id: "user_1",
          name: "Admin User",
          email: email,
          role: "admin",
          avatar: "/user-avatar.png",
        })
        setIsLoading(false)
        toast({
          title: "Login Successful",
          description: "Welcome back to Prime Phygital Platform!",
        })
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const logout = () => {
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const updateUserRole = async (userId: string, role: Role) => {
    try {
      // In a real app, this would be an API call to update the user's role
      // For demo purposes, we'll simulate a successful update
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${role}.`,
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        hasPermission: checkPermission,
        login,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
