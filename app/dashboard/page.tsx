"use client"

import { useAuth } from "@/components/AuthProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { companies } from "@/data/companies"
import { getProgress, getAllProgress } from "@/utils/progress"
import { Trophy, Target, Clock, TrendingUp, Code, ArrowRight, Star, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [progressData, setProgressData] = useState<any>({})
  const [recentActivity, setRecentActivity] = useState<any[]>([])


  const [companyProgressList, setCompanyProgressList] = useState<
    Array<{
      company: typeof companies[number]
      completed: number
      total: number
      percentage: number
    }>
  >([])





  useEffect(() => {
    if (!user) return

    const fetchProgress = async () => {
      const allProgress = await getAllProgress(user.uid)
      setProgressData(allProgress)

      // Get recent activity (last 10 completed problems)
      const recent = Object.entries(allProgress)
        .flatMap(([company, progress]: [string, any]) =>
          Object.entries(progress.completed || {})
            .filter(([_, completed]) => completed)
            .map(([problemId, _]) => {
              const companyData = companies.find(
                (c) => c.name.toLowerCase().replace(/\s+/g, "-") === company
              )
              const problem = companyData?.problems.find(
                (p) => p.id === Number.parseInt(problemId)
              )
              return {
                company: companyData?.name || company,
                problem: problem?.title || `Problem ${problemId}`,
                difficulty: problem?.difficulty || "Medium",
                completedAt: progress.completed[problemId],
              }
            })
        )
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
        .slice(0, 10)

      setRecentActivity(recent)
    }

    fetchProgress()
  }, [user])



  useEffect(() => {
  if (!user) return

  const fetchCompanyProgress = async () => {
    const progressData = await Promise.all(
      companies.map(async (company) => {
        const companyKey = company.name.toLowerCase().replace(/\s+/g, "-")
        const progress = await getProgress(user.uid, companyKey) // 👈 Firestore call

        const completed = Object.values(progress.completed || {}).filter(Boolean).length
        const total = company.problems.length
        const percentage = total > 0 ? (completed / total) * 100 : 0

        return {
          company,
          completed,
          total,
          percentage,
        }
      })
    )

    setCompanyProgressList(progressData)
  }

  fetchCompanyProgress()
}, [user])













  // useEffect(() => {
  //   if (user) {
  //     const allProgress = getAllProgress()
  //     setProgressData(allProgress)

  //     // Get recent activity (last 10 completed problems)
  //     const recent = Object.entries(allProgress)
  //       .flatMap(([company, progress]: [string, any]) =>
  //         Object.entries(progress.completed || {})
  //           .filter(([_, completed]) => completed)
  //           .map(([problemId, _]) => {
  //             const companyData = companies.find((c) => c.name.toLowerCase().replace(/\s+/g, "-") === company)
  //             const problem = companyData?.problems.find((p) => p.id === Number.parseInt(problemId))
  //             return {
  //               company: companyData?.name || company,
  //               problem: problem?.title || `Problem ${problemId}`,
  //               difficulty: problem?.difficulty || "Medium",
  //               completedAt: progress.completed[problemId],
  //             }
  //           }),
  //       )
  //       .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
  //       .slice(0, 10)

  //     setRecentActivity(recent)
  //   }
  // }, [user])



  // Total problems across all companies
  const totalProblems = companies.reduce(
    (sum, company) => sum + company.problems.length,
    0
  )

  // Completed problems from fetched progressData
  const completedProblems = Object.values(progressData).reduce(
    (sum: number, progress: any) => {
      return sum + Object.values(progress.completed || {}).filter(Boolean).length
    },
    0
  )

  // Overall completion percentage
  const overallProgress =
    totalProblems > 0 ? (completedProblems / totalProblems) * 100 : 0

  // Difficulty breakdown
  const difficultyStats = user
    ? companies.reduce((stats, company) => {
      const companyKey = company.name.toLowerCase().replace(/\s+/g, "-")
      const progress = progressData[companyKey]?.completed || {}

      company.problems.forEach((problem) => {
        if (progress[problem.id]) {
          stats[problem.difficulty] = (stats[problem.difficulty] || 0) + 1
        }
      })

      return stats
    }, {} as Record<string, number>)
    : {}







  // Calculate difficulty breakdown
  // const difficultyStats = companies.reduce(
  //   (stats, company) => {
  //     const companyKey = company.name.toLowerCase().replace(/\s+/g, "-")
  //     const companyProgress = progressData[companyKey]?.completed || {}

  //     company.problems.forEach((problem) => {
  //       if (companyProgress[problem.id]) {
  //         stats[problem.difficulty] = (stats[problem.difficulty] || 0) + 1
  //       }
  //     })
  //     return stats
  //   },
  //   {} as Record<string, number>,
  // )

  // Achievement levels
  const getAchievementLevel = (completed: number) => {
    if (completed >= 200) return { level: "Expert", icon: "🏆", color: "text-yellow-600" }
    if (completed >= 100) return { level: "Advanced", icon: "⭐", color: "text-purple-600" }
    if (completed >= 50) return { level: "Intermediate", icon: "🚀", color: "text-blue-600" }
    if (completed >= 10) return { level: "Beginner", icon: "🌟", color: "text-green-600" }
    return { level: "Newcomer", icon: "🌱", color: "text-slate-600" }
  }

  const achievement = getAchievementLevel(completedProblems)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Track your coding progress and continue your journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Solved</p>
                  <p className="text-3xl font-bold">{completedProblems}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Progress</p>
                  <p className="text-3xl font-bold">{Math.round(overallProgress)}%</p>
                </div>
                <Target className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Achievement</p>
                  <p className="text-xl font-bold">{achievement.level}</p>
                </div>
                <div className="text-2xl">{achievement.icon}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Companies</p>
                  <p className="text-3xl font-bold">{Object.keys(progressData).length}</p>
                </div>
                <Code className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Progress */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Company Progress</span>
                </CardTitle>
                <CardDescription>Your progress across different companies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {companyProgressList.map(({ company, completed, total, percentage }) => {
                  const companyKey = company.name.toLowerCase().replace(/\s+/g, "-")

                  return (
                    <div key={company.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{company.icon}</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{company.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {completed} of {total} problems
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {Math.round(percentage)}%
                          </p>
                          <Link href={`/company/${companyKey}`}>
                            <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                              <span>Continue</span>
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Difficulty Breakdown */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Difficulty Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { difficulty: "Easy", color: "bg-green-500", count: difficultyStats.Easy || 0 },
                  { difficulty: "Medium", color: "bg-yellow-500", count: difficultyStats.Medium || 0 },
                  { difficulty: "Hard", color: "bg-red-500", count: difficultyStats.Hard || 0 },
                ].map(({ difficulty, color, count }) => (
                  <div key={difficulty} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="text-sm font-medium">{difficulty}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                      >
                        <Zap className="h-4 w-4 text-green-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {activity.problem}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{activity.company}</p>
                        </div>
                        <Badge
                          variant={
                            activity.difficulty === "Easy"
                              ? "default"
                              : activity.difficulty === "Medium"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {activity.difficulty}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-4">
                    No recent activity. Start solving problems!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Ready to practice?</h3>
                <div className="space-y-3">
                  <Link href="/">
                    <Button variant="secondary" className="w-full">
                      Browse Companies
                    </Button>
                  </Link>
                  <Link href="/company/google">
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Continue Google Problems
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
