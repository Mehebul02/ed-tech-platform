"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Quiz {
  id: string
  title: string
  description: string
  totalQuestions: number
  timeLimit: number
  questions: QuizQuestion[]
  submitted: boolean
  score?: number
}

const mockQuizzes: Record<string, Quiz> = {
  "1": {
    id: "q1",
    title: "React Fundamentals Quiz",
    description: "Test your knowledge of React basics",
    totalQuestions: 5,
    timeLimit: 15,
    submitted: false,
    questions: [
      {
        id: "q1",
        question: "What is JSX?",
        options: [
          "JavaScript Extension",
          "A JavaScript syntax extension that looks similar to XML",
          "A jQuery plugin",
          "A CSS preprocessor",
        ],
        correctAnswer: 1,
        explanation:
          "JSX is a JavaScript syntax extension that looks similar to XML and is used in React to describe UI.",
      },
      {
        id: "q2",
        question: "What hook is used to manage state in functional components?",
        options: ["useState", "useState", "setState", "useReducer"],
        correctAnswer: 1,
        explanation: "useState is the React hook used to add state to functional components.",
      },
      {
        id: "q3",
        question: "Which hook is used for side effects?",
        options: ["useEffect", "useSideEffect", "useAsync", "useCallback"],
        correctAnswer: 0,
        explanation: "useEffect is used to perform side effects in functional components.",
      },
      {
        id: "q4",
        question: "What is the purpose of keys in lists?",
        options: [
          "To encrypt data",
          "To help React identify which items have changed",
          "To store data",
          "To create unique CSS classes",
        ],
        correctAnswer: 1,
        explanation: "Keys help React identify which items have changed, been added, or been removed.",
      },
      {
        id: "q5",
        question: "What is prop drilling?",
        options: [
          "Passing props through multiple levels of components",
          "Extracting data from databases",
          "Drilling holes in props",
          "Optimization technique",
        ],
        correctAnswer: 0,
        explanation:
          "Prop drilling is when you pass props through multiple levels of components to reach a component that needs them.",
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
 
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const courseId = params.id as string
  const quiz = mockQuizzes["q1"] // In a real app, this would be fetched based on courseId

  const score = useMemo(() => {
    let correct = 0
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quiz.questions.length) * 100)
  }, [answers, quiz])

 

  const handleAnswer = (questionId: string, answerIndex: number) => {
    if (!showResults) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex,
      }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Mock submission
    setTimeout(() => {
      setShowResults(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleRetake = () => {
    setAnswers({})
    setShowResults(false)
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
                <h1 className="text-3xl font-bold text-foreground mb-2">{quiz.title}</h1>
                <p className="text-muted-foreground">{quiz.description}</p>
              </div>
              <Link href={`/course/${courseId}/learn`}>
                <Button variant="outline">Back to Course</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!showResults ? (
            <div className="space-y-6">
              {/* Quiz Info */}
              <Card className="border border-border">
                <CardContent className="pt-6 flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
                      <p className="text-2xl font-bold text-foreground">{quiz.totalQuestions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time Limit</p>
                      <p className="text-2xl font-bold text-foreground">{quiz.timeLimit} mins</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Answered</p>
                      <p className="text-2xl font-bold text-foreground">
                        {Object.keys(answers).length}/{quiz.totalQuestions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              <div className="space-y-6">
                {quiz.questions.map((question, qIndex) => (
                  <Card key={question.id} className="border border-border">
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Question {qIndex + 1} of {quiz.totalQuestions}
                        </p>
                        <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswer(question.id, oIndex)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition ${
                              answers[question.id] === oIndex
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  answers[question.id] === oIndex ? "border-primary bg-primary" : "border-border"
                                }`}
                              >
                                {answers[question.id] === oIndex && (
                                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                                )}
                              </div>
                              <span className="text-foreground">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answers).length < quiz.totalQuestions}
                className="w-full bg-primary hover:bg-primary/90 h-11"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Quiz...
                  </>
                ) : (
                  `Submit Quiz (${Object.keys(answers).length}/${quiz.totalQuestions} answered)`
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results */}
              <Card className="border border-border">
                <CardContent className="pt-12 pb-12 text-center space-y-6">
                  <div>
                    <p className="text-lg text-muted-foreground mb-2">Your Score</p>
                    <p className="text-6xl font-bold text-primary">{score}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">
                      You got {Object.values(answers).filter((a, i) => a === quiz.questions[i]?.correctAnswer).length}{" "}
                      out of {quiz.totalQuestions} correct
                    </p>
                    <p className={`text-lg font-semibold ${score >= 70 ? "text-green-600" : "text-amber-600"}`}>
                      {score >= 70 ? "Passed!" : "Not passed. Try again!"}
                    </p>
                  </div>
                  <Button onClick={handleRetake} className="bg-primary hover:bg-primary/90">
                    Retake Quiz
                  </Button>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Detailed Results</h2>
                {quiz.questions.map((question, qIndex) => {
                  const userAnswer = answers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  return (
                    <Card
                      key={question.id}
                      className={`border ${isCorrect ? "border-green-200 bg-green-50/50 dark:bg-green-900/20" : "border-red-200 bg-red-50/50 dark:bg-red-900/20"}`}
                    >
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-semibold text-foreground">{question.question}</p>
                            <p className={`text-sm font-medium mt-1 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                              Your answer: {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600 mt-1">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3 text-sm text-muted-foreground border border-border">
                          <p className="font-medium text-foreground mb-1">Explanation:</p>
                          {question.explanation}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
