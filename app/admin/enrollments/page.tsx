"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Users, Search, Download, CheckCircle2 } from "lucide-react"

interface Enrollment {
  id: string
  studentName: string
  studentEmail: string
  course: string
  enrolledDate: string
  progress: number
  status: "active" | "completed" | "paused"
}

const mockEnrollments: Enrollment[] = [
  {
    id: "e1",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    course: "React Fundamentals",
    enrolledDate: "2024-01-15",
    progress: 65,
    status: "active",
  },
  {
    id: "e2",
    studentName: "Jane Smith",
    studentEmail: "jane@example.com",
    course: "React Fundamentals",
    enrolledDate: "2024-01-10",
    progress: 100,
    status: "completed",
  },
  {
    id: "e3",
    studentName: "Mike Johnson",
    studentEmail: "mike@example.com",
    course: "Advanced TypeScript",
    enrolledDate: "2024-02-01",
    progress: 45,
    status: "active",
  },
  {
    id: "e4",
    studentName: "Sarah Williams",
    studentEmail: "sarah@example.com",
    course: "Full-Stack MERN",
    enrolledDate: "2024-01-20",
    progress: 80,
    status: "active",
  },
  {
    id: "e5",
    studentName: "Alex Brown",
    studentEmail: "alex@example.com",
    course: "Full-Stack MERN",
    enrolledDate: "2024-02-05",
    progress: 30,
    status: "paused",
  },
  {
    id: "e6",
    studentName: "Emma Davis",
    studentEmail: "emma@example.com",
    course: "React Fundamentals",
    enrolledDate: "2024-02-15",
    progress: 50,
    status: "active",
  },
]

export default function EnrollmentsPage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEnrollments = useMemo(() => {
    return mockEnrollments.filter((enrollment) => {
      const matchesSearch =
        enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.course.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCourse = courseFilter === "all" || enrollment.course === courseFilter
      const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter
      return matchesSearch && matchesCourse && matchesStatus
    })
  }, [searchTerm, courseFilter, statusFilter])

  const courses = [...new Set(mockEnrollments.map((e) => e.course))]
  const stats = {
    total: mockEnrollments.length,
    active: mockEnrollments.filter((e) => e.status === "active").length,
    completed: mockEnrollments.filter((e) => e.status === "completed").length,
  }

  // if (!isAuthenticated || user?.role !== "admin") {
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Enrollments</h1>
                <p className="text-muted-foreground">Manage student enrollments and track progress</p>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Enrollments</p>
                    <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active</p>
                    <p className="text-3xl font-bold text-foreground">{stats.active}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Users className="w-6 h-6 text-primary" />
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
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input border-border pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            </div>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          {/* Enrollments Table */}
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Course</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Enrolled</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-foreground">{enrollment.studentName}</p>
                            <p className="text-sm text-muted-foreground">{enrollment.studentEmail}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground">{enrollment.course}</td>
                        <td className="py-4 px-4 text-muted-foreground text-sm">
                          {new Date(enrollment.enrolledDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-full max-w-32">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              enrollment.status === "active"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : enrollment.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
