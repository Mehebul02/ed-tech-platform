"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Save, X } from "lucide-react"
import Link from "next/link"

export default function NewCoursePage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    level: "Beginner",
    price: "",
    // instructor: user?.name || "",
    duration: "",
    lessons: "",
  })

  // if (!isAuthenticated || user?.role !== "admin") {
  //   router.push("/login")
  //   return null
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/courses")
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Create New Course</h1>
                <p className="text-muted-foreground">Add a new course to your platform</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Fill in the information about your new course</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Course Title</label>
                  <Input
                    name="title"
                    placeholder="e.g., Advanced React Patterns"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-input border-border"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your course..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-32 resize-none"
                    required
                  />
                </div>

                {/* Row 1: Category, Level */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option>Web Development</option>
                      <option>Design</option>
                      <option>Data Science</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Price, Duration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Price ($)</label>
                    <Input
                      name="price"
                      type="number"
                      placeholder="49.99"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Duration (weeks)</label>
                    <Input
                      name="duration"
                      type="number"
                      placeholder="8"
                      value={formData.duration}
                      onChange={handleChange}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Instructor, Lessons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Instructor</label>
                    <Input
                      name="instructor"
                      placeholder="Instructor name"
                      // value={formData.instructor}
                      onChange={handleChange}
                      className="bg-input border-border"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Total Lessons</label>
                    <Input
                      name="lessons"
                      type="number"
                      placeholder="42"
                      value={formData.lessons}
                      onChange={handleChange}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-border">
                  <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                  <Link href="/admin/courses">
                    <Button variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
