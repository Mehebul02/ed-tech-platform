"use client"

import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { Star, Users, Clock, BookOpen, CheckCircle2, Loader2 } from "lucide-react"
import { useState } from "react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  rating: number
  students: number
  category: string
  level: string
  duration: string
  lessons: number
  syllabus: string[]
}

const mockCourses: Record<string, Course> = {
  "1": {
    id: "1",
    title: "React Fundamentals",
    description:
      "Learn React from scratch with practical examples and projects. This comprehensive course covers all the basics and advanced concepts you need to become a React developer.",
    instructor: "Sarah Chen",
    price: 49.99,
    rating: 4.8,
    students: 15230,
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 42,
    syllabus: [
      "Introduction to React",
      "JSX and Components",
      "State and Props",
      "Hooks Deep Dive",
      "Routing with React Router",
      "State Management with Redux",
      "API Integration",
      "Final Project",
    ],
  },
  "2": {
    id: "2",
    title: "Advanced TypeScript",
    description: "Master TypeScript and build type-safe applications.",
    instructor: "James Wilson",
    price: 59.99,
    rating: 4.9,
    students: 8540,
    category: "Web Development",
    level: "Advanced",
    duration: "6 weeks",
    lessons: 35,
    syllabus: [
      "TypeScript Basics",
      "Advanced Types",
      "Generics",
      "Decorators",
      "Modules and Namespaces",
      "Error Handling",
      "Performance Optimization",
      "Real-world Projects",
    ],
  },
}

export default function CourseDetailsPage() {
  const params = useParams()
 
  const router = useRouter()
  const [isEnrolling, setIsEnrolling] = useState(false)

  const courseId = params.id as string
  const course = mockCourses[courseId]

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Card className="border border-border">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Course not found</p>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  const handleEnroll = async () => {
    

    setIsEnrolling(true)
    // Mock enrollment
    setTimeout(() => {
      setIsEnrolling(false)
      router.push(`/dashboard?enrolled=${courseId}`)
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-medium">
                    {course.category} • {course.level}
                  </p>
                  <h1 className="text-4xl font-bold text-foreground">{course.title}</h1>
                </div>
                <p className="text-lg text-muted-foreground">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.students.toLocaleString()} students</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Instructor</p>
                  <p className="font-semibold text-foreground">{course.instructor}</p>
                </div>
              </div>

              {/* Enrollment Card */}
              <div>
                <Card className="border border-border sticky top-24">
                  <CardContent className="pt-6 space-y-4">
                    <div className="text-4xl font-bold text-primary">${course.price}</div>
                    <Button
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                      className="w-full bg-primary hover:bg-primary/90 h-11"
                    >
                      {isEnrolling ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enrolling...
                        </>
                      ) : isAuthenticated ? (
                        "Enroll Now"
                      ) : (
                        "Sign in to Enroll"
                      )}
                    </Button>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{course.lessons} lessons</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Syllabus */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Course Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.syllabus.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* What You'll Learn */}
            <Card className="border border-border h-fit">
              <CardHeader>
                <CardTitle className="text-lg">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">Master core concepts and best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">Build real-world projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">Get certified upon completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">Access lifetime resources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
