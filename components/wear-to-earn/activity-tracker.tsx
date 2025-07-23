"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ActivityTrackerProps {
  challengeId: string | number
  pointsPerHour: number
}

export function ActivityTracker({ challengeId, pointsPerHour = 25 }: ActivityTrackerProps) {
  const { toast } = useToast()
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [earnedPoints, setEarnedPoints] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTracking) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsed = startTime ? Math.floor((now.getTime() - startTime.getTime()) / 1000) : 0
        setElapsedTime(elapsed)

        // Calculate points - update every minute
        if (elapsed % 60 === 0 && elapsed > 0) {
          const pointsToAdd = pointsPerHour / 60
          setEarnedPoints((prev) => prev + pointsToAdd)

          // Show milestone toast every 5 minutes
          if (elapsed % 300 === 0) {
            toast({
              title: "Keep going! 🎯",
              description: `You've earned ${earnedPoints.toFixed(0)} points so far!`,
            })
          }
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, startTime, earnedPoints, pointsPerHour, toast])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartTracking = () => {
    setIsTracking(true)
    setStartTime(new Date())
    toast({
      title: "Tracking Started! ⏱️",
      description: "Your wear time is now being tracked",
    })
  }

  const handleStopTracking = () => {
    setIsTracking(false)
    const finalPoints = earnedPoints

    toast({
      title: "Tracking Complete! 🏆",
      description: `You earned ${finalPoints.toFixed(0)} points in ${formatTime(elapsedTime)}!`,
    })

    // Reset for next session
    setElapsedTime(0)
    setEarnedPoints(0)
    setStartTime(null)
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Activity Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isTracking ? (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold">{formatTime(elapsedTime)}</div>
              <p className="text-xs text-muted-foreground">Current Session</p>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">+{earnedPoints.toFixed(0)} points</div>
              <p className="text-xs text-muted-foreground">Earned this session</p>
            </div>

            <Button onClick={handleStopTracking} variant="destructive" className="w-full">
              <Pause className="h-4 w-4 mr-2" />
              Stop Tracking
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleStartTracking}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Tracking
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
