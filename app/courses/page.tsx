"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Star, Search, SlidersHorizontal, BookOpen } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  rating: number
  students: number
  category: string
  image: string
  level: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn React from scratch with practical examples and projects.",
    instructor: "Sarah Chen",
    price: 49.99,
    rating: 4.8,
    students: 15230,
    category: "Web Development",
    image: "/react-course.png",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    description: "Master TypeScript and build type-safe applications.",
    instructor: "James Wilson",
    price: 59.99,
    rating: 4.9,
    students: 8540,
    category: "Web Development",
    image: "/typescript-course.jpg",
    level: "Advanced",
  },
  {
    id: "3",
    title: "Full-Stack MERN",
    description: "Build complete applications with MongoDB, Express, React, and Node.js.",
    instructor: "Alex Kumar",
    price: 79.99,
    rating: 4.7,
    students: 12100,
    category: "Web Development",
    image: "/mern-stack-course.jpg",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description: "Create beautiful and intuitive user interfaces.",
    instructor: "Emma Rodriguez",
    price: 44.99,
    rating: 4.6,
    students: 9870,
    category: "Design",
    image: "/ui-ux-design-course.jpg",
    level: "Beginner",
  },
  {
    id: "5",
    title: "Python for Data Science",
    description: "Analyze data with Python, Pandas, and NumPy.",
    instructor: "Dr. Michael Lee",
    price: 69.99,
    rating: 4.9,
    students: 18900,
    category: "Data Science",
    image: "/python-data-science.png",
    level: "Intermediate",
  },
  {
    id: "6",
    title: "Machine Learning Basics",
    description: "Introduction to ML algorithms and implementations.",
    instructor: "Dr. Priya Patel",
    price: 89.99,
    rating: 4.8,
    students: 11230,
    category: "Data Science",
    image: "/machine-learning-course.jpg",
    level: "Advanced",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = ["all", "Web Development", "Design", "Data Science", "Business"]

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = mockCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort courses
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else {
      filtered.sort((a, b) => b.students - a.students)
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Explore Courses</h1>
            <p className="text-muted-foreground text-lg">Discover thousands of courses from expert instructors</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
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

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">Showing {filteredAndSortedCourses.length} courses</p>
              </div>

              {filteredAndSortedCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredAndSortedCourses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <Card className="h-full border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-primary/30" />
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
                              {course.level}
                            </span>
                          </div>
                          <CardDescription className="text-muted-foreground">By {course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="text-sm font-medium">{course.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                ({course.students.toLocaleString()})
                              </span>
                            </div>
                            <p className="text-lg font-bold text-primary">${course.price}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
