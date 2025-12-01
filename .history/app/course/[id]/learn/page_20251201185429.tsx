"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { Menu, X, CheckCircle2, BookOpen, Play, FileText, MessageCircle } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "assignment" | "quiz"
  completed: boolean
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

const mockModules: Record<string, Module[]> = {
  "1": [
    {
      id: "mod1",
      title: "Introduction to React",
      lessons: [
        { id: "l1", title: "What is React?", duration: "12 min", type: "video", completed: true },
        { id: "l2", title: "Setting up your environment", duration: "15 min", type: "video", completed: true },
        { id: "l3", title: "Your first component", duration: "25 min", type: "video", completed: true },
        { id: "l4", title: "Module Quiz", duration: "10 min", type: "quiz", completed: false },
      ],
    },
    {
      id: "mod2",
      title: "JSX and Components",
      lessons: [
        { id: "l5", title: "Understanding JSX", duration: "20 min", type: "video", completed: true },
        { id: "l6", title: "Functional Components", duration: "18 min", type: "video", completed: false },
        { id: "l7", title: "Component Composition", duration: "22 min", type: "video", completed: false },
        { id: "l8", title: "Build a component", duration: "30 min", type: "assignment", completed: false },
      ],
    },
  ],
  "3": [
    {
      id: "mod1",
      title: "MERN Stack Basics",
      lessons: [
        { id: "l1", title: "Architecture overview", duration: "15 min", type: "video", completed: true },
        { id: "l2", title: "Setting up MongoDB", duration: "20 min", type: "video", completed: true },
        { id: "l3", title: "Express Server", duration: "25 min", type: "video", completed: false },
      ],
    },
  ],
}

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const courseId = params.id as string
  const modules = mockModules[courseId] || []

  // Calculate progress
  const allLessons = useMemo(() => {
    return modules.flatMap((m) => m.lessons)
  }, [modules])

  const completedCount = useMemo(() => {
    return allLessons.filter((l) => l.completed).length
  }, [allLessons])

  const progress = Math.round((completedCount / allLessons.length) * 100)

  const currentLesson = selectedLesson || allLessons[0]

  

  if (!currentLesson) {
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

  const handleMarkComplete = () => {
    // Mock marking as complete
    if (selectedLesson) {
      selectedLesson.completed = true
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <div
          className={`fixed md:static inset-y-0 left-0 w-80 bg-card border-r border-border overflow-y-auto transform transition-transform duration-200 z-40 md:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Course Modules</h2>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {modules.map((module) => (
              <div key={module.id} className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground px-3 py-2">
                  <BookOpen className="w-4 h-4" />
                  {module.title}
                </div>
                <div className="space-y-1 pl-2">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLesson(lesson)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-sm transition ${
                        selectedLesson?.id === lesson.id
                          ? "bg-primary/10 border-l-2 border-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        ) : lesson.type === "video" ? (
                          <Play className="w-4 h-4" />
                        ) : lesson.type === "assignment" ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <MessageCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div className="text-left min-w-0">
                        <p className="font-medium truncate">{lesson.title}</p>
                        <p className="text-xs opacity-75">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border bg-card sticky top-0 z-30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-foreground">
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <p className="text-sm text-muted-foreground">Module in progress</p>
                  <h1 className="text-lg font-semibold text-foreground">{currentLesson.title}</h1>
                </div>
              </div>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Video/Content Area */}
              <Card className="border border-border mb-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 aspect-video flex items-center justify-center">
                  {currentLesson.type === "video" ? (
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Video: {currentLesson.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">Duration: {currentLesson.duration}</p>
                    </div>
                  ) : currentLesson.type === "quiz" ? (
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Quiz: {currentLesson.title}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Assignment: {currentLesson.title}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Lesson Details */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle>About This Lesson</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        This is an important lesson in the course. Complete this lesson to progress to the next topic.
                      </p>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">What you'll learn:</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            Core concepts
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            Practical examples
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            Best practices
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={handleMarkComplete}
                    disabled={currentLesson.completed}
                    className={`w-full ${
                      currentLesson.completed ? "bg-muted text-muted-foreground" : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {currentLesson.completed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Marked as Complete
                      </>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>

                {/* Progress Sidebar */}
                <div className="space-y-6">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Overall</span>
                          <span className="text-sm text-muted-foreground">{progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {completedCount} of {allLessons.length} lessons completed
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Lesson Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        {currentLesson.type === "video" ? (
                          <>
                            <Play className="w-5 h-5 text-primary" />
                            <span className="text-foreground">Video Lecture</span>
                          </>
                        ) : currentLesson.type === "quiz" ? (
                          <>
                            <MessageCircle className="w-5 h-5 text-primary" />
                            <span className="text-foreground">Quiz</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-5 h-5 text-primary" />
                            <span className="text-foreground">Assignment</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setSidebarOpen(false)} />
        )}
      </main>
    </>
  )
}
