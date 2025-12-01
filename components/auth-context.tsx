"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "student" | "admin" | "instructor"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: "student",
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true)
    try {
      // Mock signup - replace with actual API call
      const mockUser: User = {
        id: Math.random().toString(),
        email,
        name,
        role: role as "student" | "admin" | "instructor",
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  // if (undefined === context) {
  //   throw new Error("useAuth must be used within AuthProvider")
  // }
  return context
}
