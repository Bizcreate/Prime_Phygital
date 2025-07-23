"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Play, Pause, Smartphone, Shield, Clock, Route, Zap, CheckCircle2, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { GeoTrackingService, type ActivitySession } from "@/services/geo-tracking-service"

interface GeoActivityTrackerProps {
  productId: string
  productName: string
  userId: string
  onSessionComplete?: (session: ActivitySession) => void
}

export function GeoActivityTracker({ productId, productName, userId, onSessionComplete }: GeoActivityTrackerProps) {
  const { toast } = useToast()
  const [geoService] = useState(() => GeoTrackingService.getInstance())
  const [isTracking, setIsTracking] = useState(false)
  const [currentSession, setCurrentSession] = useState<ActivitySession | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [nfcVerified, setNfcVerified] = useState(false)
  const [isVerifyingNFC, setIsVerifyingNFC] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    duration: 0,
    distance: 0,
    points: 0,
    activityType: "general" as const,
  })

  useEffect(() => {
    checkLocationPermission()

    // Update session stats every second when tracking
    const interval = setInterval(() => {
      if (isTracking) {
        const session = geoService.getCurrentSession()
        if (session) {
          setCurrentSession(session)
          setSessionStats({
            duration: session.duration,
            distance: session.distance,
            points: geoService.calculateRewardPoints(session),
            activityType: session.activityType,
          })
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTracking, geoService])

  const checkLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: "geolocation" })
      setLocationPermission(permission.state)

      permission.addEventListener("change", () => {
        setLocationPermission(permission.state)
      })
    } catch (error) {
      console.error("Error checking location permission:", error)
    }
  }

  const handleNFCVerification = async () => {
    setIsVerifyingNFC(true)

    try {
      const verified = await geoService.verifyNFCTap(productId)
      setNfcVerified(verified)

      if (verified) {
        toast({
          title: "NFC Verified! ✅",
          description: "Product authenticated. You can now start tracking with bonus points!",
        })
      } else {
        toast({
          title: "NFC Verification Failed ❌",
          description: "Please tap your device on the product's NFC chip and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "NFC Error",
        description: "Unable to verify NFC. You can still track without verification.",
        variant: "destructive",
      })
    } finally {
      setIsVerifyingNFC(false)
    }
  }

  const startTracking = async () => {
    try {
      if (locationPermission !== "granted") {
        const hasPermission = await geoService.requestLocationPermission()
        if (!hasPermission) {
          toast({
            title: "Location Permission Required",
            description: "Please enable location access to track your activity.",
            variant: "destructive",
          })
          return
        }
        setLocationPermission("granted")
      }

      const sessionId = await geoService.startActivitySession(userId, productId, nfcVerified)
      setIsTracking(true)

      toast({
        title: "Activity Tracking Started! 🏃‍♂️",
        description: `Tracking your activity with ${productName}. ${nfcVerified ? "NFC verified - bonus points enabled!" : ""}`,
      })
    } catch (error) {
      toast({
        title: "Failed to Start Tracking",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const stopTracking = async () => {
    try {
      const completedSession = await geoService.stopActivitySession()
      setIsTracking(false)
      setCurrentSession(null)

      if (completedSession) {
        const points = geoService.calculateRewardPoints(completedSession)

        toast({
          title: `Activity Complete! 🎉`,
          description: `You earned ${points} points for ${Math.floor(completedSession.duration / 60000)} minutes of activity!`,
        })

        onSessionComplete?.(completedSession)
      }
    } catch (error) {
      toast({
        title: "Error Stopping Tracking",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    } else {
      return `${seconds}s`
    }
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

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geo-Verified Activity Tracking
            </CardTitle>
            <p className="text-white/80 mt-1">Track your activity with location verification</p>
          </div>
          <div className="flex gap-2">
            {nfcVerified && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                NFC Verified
              </Badge>
            )}
            {locationPermission === "granted" && (
              <Badge className="bg-blue-500 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Location Enabled
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Permission Status */}
        {locationPermission !== "granted" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Location Permission Required</span>
            </div>
            <p className="text-yellow-700 mt-1 text-sm">
              Enable location access to track your activity and earn verified rewards.
            </p>
          </div>
        )}

        {/* NFC Verification */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Product Verification
          </h3>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{productName}</p>
              <p className="text-sm text-muted-foreground">
                {nfcVerified ? "Verified - Earn 50% bonus points!" : "Tap to verify and earn bonus points"}
              </p>
            </div>
            <Button
              onClick={handleNFCVerification}
              disabled={isVerifyingNFC || nfcVerified}
              variant={nfcVerified ? "outline" : "default"}
              size="sm"
            >
              {isVerifyingNFC ? (
                "Verifying..."
              ) : nfcVerified ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-1" />
                  Tap to Verify
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Activity Stats */}
        {isTracking && (
          <div className="space-y-4">
            <h3 className="font-medium">Live Activity Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                <div className="text-lg font-bold text-blue-700">{formatTime(sessionStats.duration)}</div>
                <div className="text-xs text-blue-600">Duration</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <Route className="h-5 w-5 mx-auto mb-1 text-green-500" />
                <div className="text-lg font-bold text-green-700">{formatDistance(sessionStats.distance)}</div>
                <div className="text-xs text-green-600">Distance</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <Zap className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                <div className="text-lg font-bold text-purple-700">{sessionStats.points}</div>
                <div className="text-xs text-purple-600">Points</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="mb-1">
                  <Badge className={getActivityTypeColor(sessionStats.activityType)}>{sessionStats.activityType}</Badge>
                </div>
                <div className="text-xs text-orange-600">Activity Type</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isTracking && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Session Progress</span>
              <span>{Math.floor(sessionStats.duration / 60000)} minutes</span>
            </div>
            <Progress value={Math.min((sessionStats.duration / (30 * 60 * 1000)) * 100, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">Recommended: 30+ minutes for optimal rewards</p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4">
          {isTracking ? (
            <Button onClick={stopTracking} variant="destructive" className="w-full" size="lg">
              <Pause className="h-5 w-5 mr-2" />
              Stop Activity Tracking
            </Button>
          ) : (
            <Button
              onClick={startTracking}
              disabled={locationPermission !== "granted"}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Geo-Verified Tracking
            </Button>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 mt-0.5 text-gray-500" />
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">Privacy & Security</p>
              <p>
                Your location data is encrypted and stored securely. We only track during active sessions and never
                share your precise location with third parties.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
