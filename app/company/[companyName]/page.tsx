"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { companies } from "@/data/companies"
import { getProgress, updateProgress } from "@/utils/progress"
import { useAuth } from "@/components/AuthProvider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, ExternalLink, Play, CheckCircle, Trophy, Target } from "lucide-react"

export default function CompanyProblemsPage() {
  const params = useParams()
  const companyName = params.companyName as string
  const { user } = useAuth()

  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [progress, setProgress] = useState<any>({})

  // Find the company
  const company = companies.find((c) => c.name.toLowerCase().replace(/\s+/g, "-") === companyName)

  useEffect(() => {
  const fetchProgress = async () => {
    if (company && user) {
      const companyProgress = await getProgress(user.uid, companyName)
      setProgress(companyProgress)
    }
  }

  fetchProgress()
}, [company, companyName, user])


  // Filter problems
  const filteredProblems = useMemo(() => {
    if (!company) return []

    return company.problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter

      const isCompleted = progress.completed?.[problem.id] || false
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && isCompleted) ||
        (statusFilter === "todo" && !isCompleted)

      return matchesSearch && matchesDifficulty && matchesStatus
    })
  }, [company, searchTerm, difficultyFilter, statusFilter, progress])

  const handleToggleComplete = async (problemId: number) => {
  if (!user) return

  try {
    // Toggle completion state
    await updateProgress(
      user.uid, // ✅ use uid instead of email
      companyName,
      problemId,
      !progress.completed?.[problemId]
    )

    // ✅ Refresh local state after update
    const updatedProgress = await getProgress(user.uid, companyName)
    setProgress(updatedProgress)
  } catch (error) {
    console.error("Error updating problem progress:", error)
  }
}


  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Company not found</h1>
          <Link href="/home">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedCount = Object.values(progress.completed || {}).filter(Boolean).length
  const totalCount = company.problems.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            {/* <div className="text-4xl">{company.icon}</div> */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">{company.name}</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">{company.problems.length} coding problems</p>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Your Progress</h3>
                  <p className="text-blue-100">
                    {completedCount} of {totalCount} problems completed
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6" />
                  <span className="text-2xl font-bold">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-blue-400" />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search problems by name or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <Target className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Auth Prompt for Non-Users */}
        {!user && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                <p className="mb-4">Sign up to save your progress and track completed problems</p>
                <div className="space-x-4">
                  <Link href="/register">
                    <Button variant="secondary">Sign Up Free</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No problems found</h3>
                <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredProblems.map((problem) => {
              const isCompleted = progress.completed?.[problem.id] || false

              return (
                <Card
                  key={problem.id}
                  className={`border-0 shadow-lg transition-all duration-200 hover:shadow-xl ${
                    isCompleted
                      ? "bg-green-50 dark:bg-green-950/20 border-l-4 border-l-green-500"
                      : "bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900"
                  } backdrop-blur-sm`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      {user && (
                        <div className="pt-1">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => handleToggleComplete(problem.id)}
                            className="h-5 w-5"
                          />
                        </div>
                      )}

                      {/* Problem Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-semibold mb-2 ${
                                isCompleted
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-slate-900 dark:text-slate-100"
                              }`}
                            >
                              {isCompleted && <CheckCircle className="inline h-5 w-5 mr-2 text-green-500" />}
                              {problem.title}
                            </h3>
                            {/* <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{problem.description}</p> */}
                          </div>

                          <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {problem.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Solve on LeetCode
                            </a>
                          </Button>

                          {problem.videoUrl && (
                            <Button asChild variant="outline" size="sm" className="bg-red-400 hover:bg-red-500">
                              <a href={problem.videoUrl} target="_blank" rel="noopener noreferrer">
                                <Play className="h-4 w-4 mr-2" />
                                Watch Solution
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
