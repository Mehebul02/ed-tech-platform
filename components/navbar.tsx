"use client"

import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  // const { user, logout, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // logout()
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline">CourseMaster</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground transition">
              Courses
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* {isAuthenticated ? ( */}
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-foreground">
                    Dashboard
                  </Button>
                </Link>
                <button onClick={handleLogout} className="text-foreground">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            {/* ) : ( */}
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            {/* )} */}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* {isOpen && ( */}
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/courses" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Courses
            </Link>
            <Link href="#" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="#" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <div className="px-4 py-2 space-y-2 border-t border-border mt-2 pt-2">
              {/* {isAuthenticated ? ( */}
                <>
                  <Link href="/dashboard" className="block">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-foreground">
                      Dashboard
                    </Button>
                  </Link>
                  <button onClick={handleLogout} className="w-full text-foreground">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              {/* ) : ( */}
                <>
                  <Link href="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              {/* )} */}
            </div>
          </div>
        {/* )} */}
      </div>
    </nav>
  )
}
