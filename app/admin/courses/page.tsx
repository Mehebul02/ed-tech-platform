"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { BookOpen, Plus, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  instructor: string
  students: number
  price: number
  status: "published" | "draft"
  created: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    instructor: "Sarah Chen",
    students: 150,
    price: 49.99,
    status: "published",
    created: "2024-01-15",
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    instructor: "James Wilson",
    students: 85,
    price: 59.99,
    status: "published",
    created: "2024-02-20",
  },
  {
    id: "3",
    title: "Full-Stack MERN",
    instructor: "Alex Kumar",
    students: 120,
    price: 79.99,
    status: "published",
    created: "2024-03-10",
  },
  {
    id: "4",
    title: "Machine Learning 101",
    instructor: "Dr. Priya Patel",
    students: 0,
    price: 89.99,
    status: "draft",
    created: "2024-05-01",
  },
]

export default function AdminCoursesPage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState(mockCourses)

  // if (!isAuthenticated || user?.role !== "admin") {
  //   router.push("/login")
  //   return null
  // }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId))
    }
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
                <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
                <p className="text-muted-foreground">Create, edit, and manage all courses</p>
              </div>
              <Link href="/admin/courses/new">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input border-border pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          {/* Courses Table */}
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Course</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Instructor</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Students</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 rounded-lg p-2">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{course.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{course.instructor}</td>
                        <td className="py-4 px-4 text-foreground">{course.students}</td>
                        <td className="py-4 px-4 font-medium text-foreground">${course.price}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              course.status === "published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-sm">
                          {new Date(course.created).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/courses/${course.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(course.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
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
