"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Clock, Calendar, Award, BarChart3 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface WearTrackerProps {
  productId: string
  productName: string
  programName: string
  dailyGoal?: number // in minutes
  pointsPerHour?: number
}

export function WearTracker({
  productId,
  productName,
  programName,
  dailyGoal = 120, // 2 hours default
  pointsPerHour = 25,
}: WearTrackerProps) {
  const { toast } = useToast()
  const [isTracking, setIsTracking] = useState(false)
  const [wearTime, setWearTime] = useState(0) // in seconds
  const [todayTotal, setTodayTotal] = useState(0) // in seconds
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [progress, setProgress] = useState(0)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [verificationError, setVerificationError] = useState<string | null>(null)

  // Load saved data from localStorage
  useEffect(() => {
    const savedTodayTotal = localStorage.getItem(`wearTime-${productId}-today`)
    const savedPointsEarned = localStorage.getItem(`wearPoints-${productId}-today`)

    if (savedTodayTotal) {
      setTodayTotal(Number.parseInt(savedTodayTotal))
      setProgress(Math.min((Number.parseInt(savedTodayTotal) / 60 / dailyGoal) * 100, 100))
    }

    if (savedPointsEarned) {
      setPointsEarned(Number.parseInt(savedPointsEarned))
    }
  }, [productId, dailyGoal])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTracking) {
      interval = setInterval(() => {
        setWearTime((prev) => prev + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking])

  // Update progress when wear time changes
  useEffect(() => {
    const totalSeconds = todayTotal + wearTime
    setProgress(Math.min((totalSeconds / 60 / dailyGoal) * 100, 100))
  }, [wearTime, todayTotal, dailyGoal])

  const startTracking = () => {
    setIsTracking(true)
    setStartTime(new Date())

    toast({
      title: "Tracking Started",
      description: `Now tracking wear time for ${productName}`,
    })
  }

  const pauseTracking = () => {
    if (!isTracking) return

    setIsTracking(false)

    // Calculate elapsed time and update totals
    const elapsedSeconds = wearTime
    const newTodayTotal = todayTotal + elapsedSeconds
    setTodayTotal(newTodayTotal)
    setWearTime(0)

    // Calculate points (25 points per hour = 25/3600 points per second)
    const newPoints = Math.floor(elapsedSeconds * (pointsPerHour / 3600))
    const totalPointsToday = pointsEarned + newPoints
    setPointsEarned(totalPointsToday)

    // Save to localStorage
    localStorage.setItem(`wearTime-${productId}-today`, newTodayTotal.toString())
    localStorage.setItem(`wearPoints-${productId}-today`, totalPointsToday.toString())

    toast({
      title: "Tracking Paused",
      description: `You earned ${newPoints} points for ${formatTime(elapsedSeconds)} of wear time`,
    })
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatTimeHoursMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const verifyWearSession = async (sessionData) => {
    try {
      // Assuming scanSignatures is defined elsewhere and handles the actual verification
      const scanSignatures = async (signature: string): Promise<boolean> => {
        // Placeholder implementation - replace with actual signature verification logic
        console.log("Verifying signature:", signature)
        return true // Simulate successful verification
      }

      const isValid = await scanSignatures(sessionData.signature)
      if (!isValid) {
        setVerificationError("Failed to verify wear session. Please try again.")
        return false
      }
      setVerificationError(null)
      return true
    } catch (error) {
      console.error("Error verifying wear session:", error)
      setVerificationError("An error occurred while verifying your wear session.")
      return false
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{programName}</CardTitle>
            <CardDescription className="text-white/80">Wear-to-Earn Tracker</CardDescription>
          </div>
          <Badge className="bg-white/20 text-white border-none">{pointsPerHour} pts/hour</Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{productName}</h3>
            <p className="text-sm text-muted-foreground">Daily Goal: {dailyGoal / 60} hours</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{pointsEarned}</div>
            <p className="text-sm text-muted-foreground">Points Today</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Today's Progress</span>
            <span>
              {formatTimeHoursMinutes(todayTotal + wearTime)} / {dailyGoal / 60}h ({Math.round(progress)}%)
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              <span className="text-sm font-medium">Current Session</span>
            </div>
            <div className="text-xl font-mono">{formatTime(wearTime)}</div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="h-4 w-4 mr-1 text-purple-500" />
              <span className="text-sm font-medium">Today's Total</span>
            </div>
            <div className="text-xl font-mono">{formatTimeHoursMinutes(todayTotal)}</div>
          </div>
        </div>

        {isTracking ? (
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="flex items-center text-blue-700 mb-2">
              <Clock className="h-5 w-5 mr-2 animate-pulse" />
              <span className="font-medium">Currently Tracking</span>
            </div>
            <p className="text-sm text-blue-600">
              Started at {startTime?.toLocaleTimeString()}. Keep wearing your product to earn points!
            </p>
          </div>
        ) : todayTotal > 0 ? (
          <div className="bg-green-50 p-4 rounded-md">
            <div className="flex items-center text-green-700 mb-2">
              <Award className="h-5 w-5 mr-2" />
              <span className="font-medium">Today's Earnings</span>
            </div>
            <p className="text-sm text-green-600">
              You've earned {pointsEarned} points today from {formatTimeHoursMinutes(todayTotal)} of wear time.
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center text-gray-700 mb-2">
              <BarChart3 className="h-5 w-5 mr-2" />
              <span className="font-medium">Start Tracking</span>
            </div>
            <p className="text-sm text-gray-600">
              Press the Start button below to begin tracking your wear time and earning points.
            </p>
          </div>
        )}

        {verificationError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{verificationError}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t p-6">
        {isTracking ? (
          <Button
            onClick={pauseTracking}
            variant="outline"
            className="w-full border-red-200 text-red-700 hover:bg-red-50"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause Tracking
          </Button>
        ) : (
          <Button
            onClick={startTracking}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Tracking
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
