"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Clock, Award, TrendingUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ChallengeTrackerProps {
  challengeId: string
  challengeName: string
  pointsPerHour: number
  dailyGoal: number // in minutes
  currentProgress: number
}

export function ChallengeTracker({
  challengeId,
  challengeName,
  pointsPerHour,
  dailyGoal,
  currentProgress,
}: ChallengeTrackerProps) {
  const { toast } = useToast()
  const [isTracking, setIsTracking] = useState(false)
  const [sessionTime, setSessionTime] = useState(0) // in seconds
  const [todayTotal, setTodayTotal] = useState(0) // in seconds
  const [pointsEarned, setPointsEarned] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTracking) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
        // Award points every minute (60 seconds)
        if (sessionTime > 0 && sessionTime % 60 === 0) {
          const pointsToAdd = Math.floor(pointsPerHour / 60)
          setPointsEarned((prev) => prev + pointsToAdd)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, sessionTime, pointsPerHour])

  const startTracking = () => {
    setIsTracking(true)
    setStartTime(new Date())
    setSessionTime(0)

    toast({
      title: "Tracking Started! 🎯",
      description: `Started tracking for ${challengeName}. Earn ${pointsPerHour} points per hour!`,
    })
  }

  const stopTracking = () => {
    setIsTracking(false)
    const finalPoints = Math.floor((sessionTime / 3600) * pointsPerHour)
    setTodayTotal((prev) => prev + sessionTime)

    toast({
      title: "Session Complete! 🏆",
      description: `You earned ${finalPoints} points in ${formatTime(sessionTime)}!`,
    })

    // Reset session
    setSessionTime(0)
    setStartTime(null)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = Math.min(((todayTotal + sessionTime) / 60 / dailyGoal) * 100, 100)

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Activity Tracker
        </CardTitle>
        <CardDescription className="text-white/80">Track your wear time and earn points</CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{formatTime(sessionTime)}</div>
            <p className="text-sm text-muted-foreground">Current Session</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{pointsEarned}</div>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">Goal: {dailyGoal} minutes per day</p>
        </div>

        {isTracking ? (
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex items-center text-green-700 mb-1">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="font-medium">Tracking Active</span>
              </div>
              <p className="text-sm text-green-600">Started at {startTime?.toLocaleTimeString()}</p>
            </div>
            <Button
              onClick={stopTracking}
              variant="outline"
              className="w-full border-red-200 text-red-700 hover:bg-red-50"
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop Tracking
            </Button>
          </div>
        ) : (
          <Button
            onClick={startTracking}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Tracking
          </Button>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Award className="h-4 w-4" />
          <span>Earn {pointsPerHour} points per hour</span>
        </div>
      </CardContent>
    </Card>
  )
}
