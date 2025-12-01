"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Users, BarChart3, ArrowRight } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const features = [
    {
      icon: BookOpen,
      title: "Rich Course Content",
      description: "Access comprehensive courses with video lectures, assignments, and quizzes",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and experienced educators",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed progress analytics",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CourseMaster</span>
          </div>
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
            Master Any Skill,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Anywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of students learning from world-class instructors. Start your learning journey today with
            courses in technology, business, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Placeholder for Hero Image */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border h-96 flex items-center justify-center mb-20">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Featured Course Preview</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Why Choose CourseMaster?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-muted-foreground">Active Students</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-muted-foreground">Courses Available</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">200+</p>
            <p className="text-muted-foreground">Expert Instructors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">95%</p>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <CardContent className="pt-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to start learning?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our community of learners and unlock your potential today.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">CourseMaster</span>
              </div>
              <p className="text-sm text-muted-foreground">Learn anything, anytime.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/courses" className="hover:text-foreground transition">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/instructors" className="hover:text-foreground transition">
                    Instructors
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 CourseMaster. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="hover:text-foreground transition">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground transition">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-foreground transition">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
