"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Route, Zap, CheckCircle2, XCircle, Calendar, TrendingUp } from "lucide-react"
import { GeoTrackingService, type ActivitySession } from "@/services/geo-tracking-service"

interface ActivityHistoryProps {
  userId: string
}

export function ActivityHistory({ userId }: ActivityHistoryProps) {
  const [sessions, setSessions] = useState<ActivitySession[]>([])
  const [loading, setLoading] = useState(true)
  const [geoService] = useState(() => GeoTrackingService.getInstance())

  useEffect(() => {
    loadActivityHistory()
  }, [userId])

  const loadActivityHistory = async () => {
    try {
      const history = await geoService.getSessionHistory(userId)
      setSessions(history)
    } catch (error) {
      console.error("Error loading activity history:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`
    }
    return `${Math.round(meters)} m`
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "walking":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "cycling":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalStats = () => {
    const validSessions = sessions.filter((s) => s.isValid)
    return {
      totalSessions: validSessions.length,
      totalDuration: validSessions.reduce((sum, s) => sum + s.duration, 0),
      totalDistance: validSessions.reduce((sum, s) => sum + s.distance, 0),
      totalPoints: validSessions.reduce((sum, s) => sum + geoService.calculateRewardPoints(s), 0),
    }
  }

  const stats = getTotalStats()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading activity history...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Activity Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalSessions}</div>
              <div className="text-sm text-muted-foreground">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatTime(stats.totalDuration)}</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{formatDistance(stats.totalDistance)}</div>
              <div className="text-sm text-muted-foreground">Distance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activity sessions found. Start tracking to see your history!
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`border rounded-lg p-4 ${
                    session.isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${session.isValid ? "bg-green-100" : "bg-red-100"}`}>
                        {session.isValid ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {new Date(session.startTime).toLocaleDateString()} at{" "}
                          {new Date(session.startTime).toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {session.isValid ? "Verified Activity" : "Invalid Session"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getActivityTypeColor(session.activityType)}>{session.activityType}</Badge>
                      {session.nfcVerified && <Badge className="bg-blue-100 text-blue-800">NFC Verified</Badge>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{formatTime(session.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-gray-500" />
                      <span>{formatDistance(session.distance)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{session.trackingPoints.length} points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">
                        {session.isValid ? geoService.calculateRewardPoints(session) : 0} points
                      </span>
                    </div>
                  </div>

                  {!session.isValid && (
                    <div className="mt-3 text-sm text-red-600">
                      <p>This session was marked as invalid due to:</p>
                      <ul className="list-disc list-inside mt-1 text-xs">
                        <li>Insufficient movement or duration</li>
                        <li>Suspicious speed patterns</li>
                        <li>Location accuracy issues</li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
