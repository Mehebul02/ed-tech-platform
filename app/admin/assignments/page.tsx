"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { FileText, Search, Eye, CheckCircle2 } from "lucide-react"

interface Assignment {
  id: string
  title: string
  course: string
  studentName: string
  studentEmail: string
  submittedDate: string
  status: "submitted" | "graded" | "pending"
  score?: number
  maxScore: number
}

const mockAssignments: Assignment[] = [
  {
    id: "a1",
    title: "Build a Todo App",
    course: "React Fundamentals",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    submittedDate: "2024-01-20",
    status: "graded",
    score: 95,
    maxScore: 100,
  },
  {
    id: "a2",
    title: "State Management Project",
    course: "React Fundamentals",
    studentName: "Jane Smith",
    studentEmail: "jane@example.com",
    submittedDate: "2024-01-18",
    status: "graded",
    score: 88,
    maxScore: 100,
  },
  {
    id: "a3",
    title: "TypeScript Generics",
    course: "Advanced TypeScript",
    studentName: "Mike Johnson",
    studentEmail: "mike@example.com",
    submittedDate: "2024-02-10",
    status: "submitted",
    maxScore: 100,
  },
  {
    id: "a4",
    title: "Component Library",
    course: "React Fundamentals",
    studentName: "Sarah Williams",
    studentEmail: "sarah@example.com",
    submittedDate: "2024-01-25",
    status: "graded",
    score: 92,
    maxScore: 100,
  },
  {
    id: "a5",
    title: "Database Design",
    course: "Full-Stack MERN",
    studentName: "Alex Brown",
    studentEmail: "alex@example.com",
    submittedDate: "2024-02-12",
    status: "submitted",
    maxScore: 150,
  },
  {
    id: "a6",
    title: "API Integration",
    course: "Full-Stack MERN",
    studentName: "Emma Davis",
    studentEmail: "emma@example.com",
    submittedDate: "2024-02-08",
    status: "pending",
    maxScore: 100,
  },
]

export default function AssignmentsPage() {
  // const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [score, setScore] = useState("")

  const filteredAssignments = useMemo(() => {
    return mockAssignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const stats = {
    total: mockAssignments.length,
    pending: mockAssignments.filter((a) => a.status === "pending").length,
    submitted: mockAssignments.filter((a) => a.status === "submitted").length,
    graded: mockAssignments.filter((a) => a.status === "graded").length,
  }

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAssignment) {
      // Mock grading
      selectedAssignment.status = "graded"
      selectedAssignment.score = Number.parseInt(score)
      setSelectedAssignment(null)
      setScore("")
    }
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Assignment Submissions</h1>
            <p className="text-muted-foreground">Review and grade student assignments</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.submitted}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Graded</p>
                  <p className="text-3xl font-bold text-green-600">{stats.graded}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input border-border pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>

          {/* Assignments Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <Card
                    key={assignment.id}
                    className={`border cursor-pointer transition-all ${
                      selectedAssignment?.id === assignment.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => {
                      setSelectedAssignment(assignment)
                      setScore(assignment.score?.toString() || "")
                    }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{assignment.course}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Student</p>
                              <p className="text-foreground font-medium">{assignment.studentName}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Submitted</p>
                              <p className="text-foreground font-medium">
                                {new Date(assignment.submittedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                              assignment.status === "pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                : assignment.status === "submitted"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }`}
                          >
                            {assignment.status}
                          </span>
                          {assignment.score && (
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                {assignment.score}/{assignment.maxScore}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border border-border">
                  <CardContent className="pt-12 pb-12 text-center">
                    <FileText className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No assignments found</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Grading Panel */}
            {selectedAssignment ? (
              <Card className="border border-border h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Grade Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">STUDENT</p>
                      <p className="text-foreground font-medium">{selectedAssignment.studentName}</p>
                      <p className="text-sm text-muted-foreground">{selectedAssignment.studentEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">ASSIGNMENT</p>
                      <p className="text-foreground font-medium">{selectedAssignment.title}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">SUBMITTED</p>
                      <p className="text-foreground">
                        {new Date(selectedAssignment.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {selectedAssignment.status !== "graded" ? (
                    <form onSubmit={handleGrade} className="space-y-4">
                      <div>
                        <a
                          href="#"
                          className="text-primary hover:text-primary/90 text-sm font-medium mb-3 inline-flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View Submission
                        </a>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                          Score (out of {selectedAssignment.maxScore})
                        </label>
                        <Input
                          type="number"
                          min="0"
                          max={selectedAssignment.maxScore}
                          value={score}
                          onChange={(e) => setScore(e.target.value)}
                          placeholder="Enter score"
                          className="bg-input border-border"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Feedback (optional)</label>
                        <textarea
                          placeholder="Provide feedback for the student..."
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-20 resize-none"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Submit Grade
                      </Button>
                    </form>
                  ) : (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <p className="font-semibold text-green-900 dark:text-green-100">Graded</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Score</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedAssignment.score}/{selectedAssignment.maxScore}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-border h-fit sticky top-24">
                <CardContent className="pt-6 text-center">
                  <FileText className="w-12 h-12 text-muted/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">Select an assignment to grade</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
