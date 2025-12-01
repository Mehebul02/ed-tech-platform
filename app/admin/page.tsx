"use client"

import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { BarChart3, BookOpen, Users, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const enrollmentData = [
  { month: "Jan", enrollments: 240 },
  { month: "Feb", enrollments: 380 },
  { month: "Mar", enrollments: 520 },
  { month: "Apr", enrollments: 720 },
  { month: "May", enrollments: 890 },
  { month: "Jun", enrollments: 1240 },
]

const coursePerformance = [
  { name: "React Fundamentals", students: 150, completion: 78 },
  { name: "Advanced TypeScript", students: 85, completion: 72 },
  { name: "Full-Stack MERN", students: 120, completion: 65 },
  { name: "UI/UX Design", students: 95, completion: 81 },
  { name: "Python for Data Science", students: 188, completion: 74 },
]

export default function AdminPage() {

  const router = useRouter()

 

  const totalStats = {
    courses: 18,
    students: 2540,
    revenue: 125400,
    avgCompletion: 72.5,
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Platform management and analytics</p>
              </div>
              <Link href="/admin/courses/new">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-foreground">{totalStats.courses}</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                    <p className="text-3xl font-bold text-foreground">{totalStats.students}</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-foreground">${totalStats.revenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Completion</p>
                    <p className="text-3xl font-bold text-foreground">{totalStats.avgCompletion}%</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Enrollment Trend */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Enrollment Trend</CardTitle>
                <CardDescription>Student enrollments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="enrollments"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-primary)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Course Performance */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Completion rates by course</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coursePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completion" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/admin/courses">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    All Courses
                  </Button>
                </Link>
                <Link href="/admin/enrollments">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Enrollments
                  </Button>
                </Link>
                <Link href="/admin/assignments">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Submissions
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
