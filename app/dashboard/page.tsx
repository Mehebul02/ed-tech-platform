"use client"

import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { BookOpen, Play, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ProgressBar } from "@/components/progress-bar"

interface EnrolledCourse {
  id: string
  title: string
  instructor: string
  progress: number
  lessons_completed: number
  total_lessons: number
  status: "in-progress" | "completed"
}

const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    title: "React Fundamentals",
    instructor: "Sarah Chen",
    progress: 65,
    lessons_completed: 27,
    total_lessons: 42,
    status: "in-progress",
  },
  {
    id: "3",
    title: "Full-Stack MERN",
    instructor: "Alex Kumar",
    progress: 30,
    lessons_completed: 13,
    total_lessons: 42,
    status: "in-progress",
  },
  {
    id: "5",
    title: "Python for Data Science",
    instructor: "Dr. Michael Lee",
    progress: 100,
    lessons_completed: 28,
    total_lessons: 28,
    status: "completed",
  },
]

export default function DashboardPage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("in-progress")

  const filteredCourses = useMemo(() => {
    if (activeTab === "completed") {
      return mockEnrolledCourses.filter((c) => c.status === "completed")
    }
    return mockEnrolledCourses.filter((c) => c.status === "in-progress")
  }, [activeTab])

  const stats = useMemo(() => {
    const total = mockEnrolledCourses.length
    const completed = mockEnrolledCourses.filter((c) => c.status === "completed").length
    const avgProgress = Math.round(mockEnrolledCourses.reduce((sum, c) => sum + c.progress, 0) / total)
    return { total, completed, avgProgress }
  }, [])

  // Redirect to login if not authenticated
  // if (!isAuthenticated) {
  //   router.push("/login")
  //   return null
  // }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-2">
              {/* <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1> */}
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Completed</p>
                    <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Average Progress</p>
                    <p className="text-3xl font-bold text-foreground">{stats.avgProgress}%</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
                <p className="text-muted-foreground">Manage and continue your enrolled courses</p>
              </div>
              <Link href="/courses">
                <Button variant="outline">Browse More Courses</Button>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
              <button
                onClick={() => setActiveTab("in-progress")}
                className={`px-4 py-2 font-medium border-b-2 transition ${
                  activeTab === "in-progress"
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                In Progress ({mockEnrolledCourses.filter((c) => c.status === "in-progress").length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 font-medium border-b-2 transition ${
                  activeTab === "completed"
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Completed ({mockEnrolledCourses.filter((c) => c.status === "completed").length})
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Link key={course.id} href={`/course/${course.id}/learn`}>
                  <Card className="h-full border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-32 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary/30" />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Progress</span>
                          <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <ProgressBar value={course.progress} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {course.lessons_completed} of {course.total_lessons} lessons
                        </span>
                        <div className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          Continue
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card className="border border-border">
                <CardContent className="pt-12 pb-12 text-center">
                  <BookOpen className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No {activeTab === "completed" ? "completed" : "in-progress"} courses
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "completed"
                      ? "Complete your first course to see it here"
                      : "Enroll in a course to get started"}
                  </p>
                  {activeTab === "in-progress" && (
                    <Link href="/courses">
                      <Button className="bg-primary hover:bg-primary/90">Browse Courses</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
