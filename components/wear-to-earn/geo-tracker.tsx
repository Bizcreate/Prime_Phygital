"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Play, Pause, Square, Smartphone, Shield, Clock, Route, Zap, CheckCircle2, Target } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface GeoTrackerProps {
  productName: string
  challengeId: string
  onSessionComplete?: (data: SessionData) => void
}

interface SessionData {
  duration: number
  distance: number
  points: number
  verified: boolean
  nfcVerified: boolean
  locationVerified: boolean
}

export function GeoTracker({ productName, challengeId, onSessionComplete }: GeoTrackerProps) {
  const { toast } = useToast()

  // State management
  const [trackingState, setTrackingState] = useState<"idle" | "preparing" | "active" | "paused">("idle")
  const [sessionData, setSessionData] = useState<SessionData>({
    duration: 0,
    distance: 0,
    points: 0,
    verified: false,
    nfcVerified: false,
    locationVerified: false,
  })

  // Verification states
  const [nfcStatus, setNfcStatus] = useState<"pending" | "verifying" | "verified" | "failed">("pending")
  const [locationStatus, setLocationStatus] = useState<"pending" | "requesting" | "granted" | "denied">("pending")

  // Tracking refs
  const startTimeRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const watchIdRef = useRef<number | null>(null)
  const lastPositionRef = useRef<GeolocationPosition | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current)
    }
  }, [])

  // NFC Verification Process
  const handleNFCVerification = async () => {
    setNfcStatus("verifying")

    try {
      // Simulate NFC verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would communicate with the NFC chip
      const verified = Math.random() > 0.2 // 80% success rate for demo

      if (verified) {
        setNfcStatus("verified")
        setSessionData((prev) => ({ ...prev, nfcVerified: true }))
        toast({
          title: "NFC Verified! ✅",
          description: "Product authenticated. You'll earn 50% bonus points!",
        })
      } else {
        setNfcStatus("failed")
        toast({
          title: "NFC Verification Failed",
          description: "Please ensure your device is close to the NFC tag and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setNfcStatus("failed")
      toast({
        title: "NFC Error",
        description: "Unable to verify NFC. You can still track without verification.",
        variant: "destructive",
      })
    }
  }

  // Location Permission Process
  const handleLocationRequest = async () => {
    setLocationStatus("requesting")

    if (!navigator.geolocation) {
      setLocationStatus("denied")
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      })
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        })
      })

      setLocationStatus("granted")
      setSessionData((prev) => ({ ...prev, locationVerified: true }))
      lastPositionRef.current = position

      toast({
        title: "Location Enabled! 📍",
        description: "GPS tracking is now active for verified rewards.",
      })
    } catch (error) {
      setLocationStatus("denied")
      toast({
        title: "Location Access Denied",
        description: "Please enable location access for geo-verified tracking.",
        variant: "destructive",
      })
    }
  }

  // Start tracking session
  const startTracking = () => {
    if (locationStatus !== "granted") {
      toast({
        title: "Location Required",
        description: "Please enable location access first.",
        variant: "destructive",
      })
      return
    }

    setTrackingState("active")
    startTimeRef.current = Date.now()

    // Start the tracking interval
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const minutes = elapsed / (1000 * 60)

      // Simulate distance calculation (in a real app, this would use GPS)
      const simulatedDistance = minutes * 50 // 50 meters per minute average

      // Calculate points based on time and verification status
      const basePoints = Math.floor(minutes * 25) // 25 points per minute
      const multiplier = sessionData.nfcVerified ? 1.5 : 1
      const totalPoints = Math.floor(basePoints * multiplier)

      setSessionData((prev) => ({
        ...prev,
        duration: elapsed,
        distance: simulatedDistance,
        points: totalPoints,
        verified: prev.nfcVerified && prev.locationVerified,
      }))
    }, 1000)

    // Start GPS tracking
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          if (lastPositionRef.current) {
            // Calculate actual distance moved (simplified)
            const distance = calculateDistance(
              lastPositionRef.current.coords.latitude,
              lastPositionRef.current.coords.longitude,
              position.coords.latitude,
              position.coords.longitude,
            )

            setSessionData((prev) => ({
              ...prev,
              distance: prev.distance + distance,
            }))
          }
          lastPositionRef.current = position
        },
        (error) => console.error("GPS tracking error:", error),
        { enableHighAccuracy: true, maximumAge: 5000 },
      )
    }

    toast({
      title: "Tracking Started! 🏃‍♂️",
      description: `Now tracking your activity with ${productName}`,
    })
  }

  // Pause tracking
  const pauseTracking = () => {
    setTrackingState("paused")
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    toast({
      title: "Tracking Paused ⏸️",
      description: "Your session has been paused. Resume when ready!",
    })
  }

  // Resume tracking
  const resumeTracking = () => {
    setTrackingState("active")
    startTracking() // Restart the tracking process
  }

  // Stop tracking
  const stopTracking = () => {
    setTrackingState("idle")

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    const finalData = { ...sessionData }

    toast({
      title: "Session Complete! 🎉",
      description: `You earned ${finalData.points} points in ${formatDuration(finalData.duration)}!`,
    })

    onSessionComplete?.(finalData)

    // Reset for next session
    setSessionData({
      duration: 0,
      distance: 0,
      points: 0,
      verified: false,
      nfcVerified: sessionData.nfcVerified, // Keep NFC verification
      locationVerified: sessionData.locationVerified, // Keep location permission
    })
  }

  // Helper functions
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatDistance = (meters: number): string => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`
    }
    return `${Math.round(meters)} m`
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Geo-Verified Activity Tracker
        </CardTitle>
        <p className="text-white/80">Verify your product and location for bonus rewards</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Verification Section */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Step 1: Verify Your Setup</h3>

          {/* NFC Verification */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  nfcStatus === "verified" ? "bg-green-100" : nfcStatus === "failed" ? "bg-red-100" : "bg-gray-100"
                }`}
              >
                <Smartphone
                  className={`h-4 w-4 ${
                    nfcStatus === "verified"
                      ? "text-green-600"
                      : nfcStatus === "failed"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium">{productName}</p>
                <p className="text-sm text-muted-foreground">
                  {nfcStatus === "verified"
                    ? "Product verified - 50% bonus active!"
                    : nfcStatus === "failed"
                      ? "Verification failed - try again"
                      : "Tap your device on the product's NFC tag"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleNFCVerification}
              disabled={nfcStatus === "verifying" || nfcStatus === "verified"}
              variant={nfcStatus === "verified" ? "outline" : "default"}
              size="sm"
            >
              {nfcStatus === "verifying" ? (
                "Verifying..."
              ) : nfcStatus === "verified" ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Verified
                </>
              ) : nfcStatus === "failed" ? (
                "Retry NFC"
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-1" />
                  Tap NFC
                </>
              )}
            </Button>
          </div>

          {/* Location Permission */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  locationStatus === "granted"
                    ? "bg-green-100"
                    : locationStatus === "denied"
                      ? "bg-red-100"
                      : "bg-gray-100"
                }`}
              >
                <MapPin
                  className={`h-4 w-4 ${
                    locationStatus === "granted"
                      ? "text-green-600"
                      : locationStatus === "denied"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium">Location Tracking</p>
                <p className="text-sm text-muted-foreground">
                  {locationStatus === "granted"
                    ? "GPS enabled for geo-verification"
                    : locationStatus === "denied"
                      ? "Location access denied"
                      : "Enable GPS for location verification"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLocationRequest}
              disabled={locationStatus === "requesting" || locationStatus === "granted"}
              variant={locationStatus === "granted" ? "outline" : "default"}
              size="sm"
            >
              {locationStatus === "requesting" ? (
                "Requesting..."
              ) : locationStatus === "granted" ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Enabled
                </>
              ) : locationStatus === "denied" ? (
                "Retry GPS"
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-1" />
                  Enable GPS
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Live Tracking Stats */}
        {trackingState !== "idle" && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Step 2: Live Activity</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-bold text-blue-700">{formatDuration(sessionData.duration)}</div>
                <div className="text-xs text-blue-600">Duration</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Route className="h-5 w-5 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-bold text-green-700">{formatDistance(sessionData.distance)}</div>
                <div className="text-xs text-green-600">Distance</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <Target className="h-5 w-5 mx-auto mb-2 text-purple-500" />
                <div className="text-lg font-bold text-purple-700">{sessionData.points}</div>
                <div className="text-xs text-purple-600">Points</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <Zap className="h-5 w-5 mx-auto mb-2 text-orange-500" />
                <div className="text-lg font-bold text-orange-700">{sessionData.nfcVerified ? "1.5x" : "1x"}</div>
                <div className="text-xs text-orange-600">Multiplier</div>
              </div>
            </div>

            {/* Progress towards goal */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Session Progress</span>
                <span>{Math.floor(sessionData.duration / 60000)} / 30 minutes</span>
              </div>
              <Progress value={Math.min((sessionData.duration / (30 * 60 * 1000)) * 100, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground">Recommended: 30+ minutes for optimal rewards</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Step 3: Track Activity</h3>

          <div className="flex gap-2">
            {trackingState === "idle" && (
              <Button
                onClick={startTracking}
                disabled={locationStatus !== "granted"}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                size="lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Geo-Tracking
              </Button>
            )}

            {trackingState === "active" && (
              <>
                <Button onClick={pauseTracking} variant="outline" className="flex-1" size="lg">
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </Button>
                <Button onClick={stopTracking} variant="destructive" className="flex-1" size="lg">
                  <Square className="h-5 w-5 mr-2" />
                  Stop & Save
                </Button>
              </>
            )}

            {trackingState === "paused" && (
              <>
                <Button onClick={resumeTracking} className="flex-1" size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Resume
                </Button>
                <Button onClick={stopTracking} variant="destructive" className="flex-1" size="lg">
                  <Square className="h-5 w-5 mr-2" />
                  Stop & Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex gap-2 flex-wrap">
          {sessionData.nfcVerified && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              NFC Verified
            </Badge>
          )}
          {sessionData.locationVerified && (
            <Badge className="bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              GPS Active
            </Badge>
          )}
          {trackingState === "active" && (
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              Tracking Active
            </Badge>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 mt-0.5 text-gray-500" />
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">Privacy & Security</p>
              <p>
                Your location data is encrypted and only used for activity verification. We never share your precise
                location with third parties.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
