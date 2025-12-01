"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { FileText, Calendar, CheckCircle2, Clock, Send, Loader2 } from "lucide-react"
import Link from "next/link"

interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  maxScore: number
  submitted: boolean
  score?: number
  submittedDate?: string
}

const mockAssignments: Record<string, Assignment[]> = {
  "1": [
    {
      id: "a1",
      title: "Build a Todo App",
      description: "Create a simple todo application using React with add, delete, and mark complete functionality.",
      dueDate: "2025-01-15",
      maxScore: 100,
      submitted: true,
      score: 95,
      submittedDate: "2025-01-14",
    },
    {
      id: "a2",
      title: "Implement State Management",
      description: "Build a component that uses React hooks (useState, useEffect) to manage complex state.",
      dueDate: "2025-01-22",
      maxScore: 100,
      submitted: false,
    },
    {
      id: "a3",
      title: "Create a Reusable Component Library",
      description: "Build at least 5 reusable React components with proper PropTypes validation.",
      dueDate: "2025-02-05",
      maxScore: 150,
      submitted: false,
    },
  ],
}

export default function AssignmentsPage() {
  const params = useParams()
  const router = useRouter()

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionLink, setSubmissionLink] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const courseId = params.id as string
  const assignments = mockAssignments[courseId] || []

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAssignment) return

    setIsSubmitting(true)
    // Mock submission
    setTimeout(() => {
      selectedAssignment.submitted = true
      selectedAssignment.submittedDate = new Date().toISOString().split("T")[0]
      setSubmissionLink("")
      setIsSubmitting(false)
      setSelectedAssignment(null)
    }, 1500)
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
                <p className="text-muted-foreground">Submit and track your course assignments</p>
              </div>
              <Link href={`/course/${courseId}/learn`}>
                <Button variant="outline">Back to Course</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Assignments List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">{assignments.length} Total Assignments</h2>
              {assignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className={`border cursor-pointer transition-all ${
                    selectedAssignment?.id === assignment.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{assignment.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            Max Score: {assignment.maxScore}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {assignment.submitted ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm font-medium">Submitted</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-600">
                            <Clock className="w-5 h-5" />
                            <span className="text-sm font-medium">Pending</span>
                          </div>
                        )}
                        {assignment.score !== undefined && (
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              {assignment.score}/{assignment.maxScore}
                            </p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Assignment Details */}
            {selectedAssignment ? (
              <Card className="border border-border h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Submit Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">TITLE</p>
                      <p className="text-foreground font-medium">{selectedAssignment.title}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">DUE DATE</p>
                      <p className="text-foreground">{new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">POINTS</p>
                      <p className="text-foreground">{selectedAssignment.maxScore} points</p>
                    </div>
                  </div>

                  {selectedAssignment.submitted ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <p className="font-semibold text-green-900 dark:text-green-100">Assignment Submitted</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted on</p>
                        <p className="text-foreground font-medium">
                          {new Date(selectedAssignment.submittedDate!).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedAssignment.score !== undefined && (
                        <div className="border-t border-green-200 dark:border-green-800 pt-3">
                          <p className="text-sm text-muted-foreground mb-1">Score</p>
                          <p className="text-2xl font-bold text-green-600">
                            {selectedAssignment.score}/{selectedAssignment.maxScore}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Google Drive Link or Text Submission
                        </label>
                        <textarea
                          value={submissionLink}
                          onChange={(e) => setSubmissionLink(e.target.value)}
                          placeholder="Paste your Google Drive link or write your submission here..."
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-24 resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || !submissionLink.trim()}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Assignment
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-border h-fit sticky top-24">
                <CardContent className="pt-6 text-center">
                  <FileText className="w-12 h-12 text-muted/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">Select an assignment to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
