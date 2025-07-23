"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Play, Pause, Smartphone, Shield, Clock, Route, Zap } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SimpleGeoTrackerProps {
  productName: string
  onComplete?: (points: number) => void
}

export function SimpleGeoTracker({ productName, onComplete }: SimpleGeoTrackerProps) {
  const { toast } = useToast()
  const [isTracking, setIsTracking] = useState(false)
  const [duration, setDuration] = useState(0)
  const [distance, setDistance] = useState(0)
  const [points, setPoints] = useState(0)
  const [nfcVerified, setNfcVerified] = useState(false)
  const [locationEnabled, setLocationEnabled] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1000)
        setDistance((prev) => prev + Math.random() * 10) // Simulate movement
        setPoints((prev) => Math.floor((duration / 60000) * (nfcVerified ? 37.5 : 25)))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking, duration, nfcVerified])

  const handleNFCVerify = () => {
    setNfcVerified(true)
    toast({
      title: "NFC Verified! ✅",
      description: "Product authenticated. You'll earn 50% bonus points!",
    })
  }

  const handleLocationEnable = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationEnabled(true)
          toast({
            title: "Location Enabled! 📍",
            description: "GPS tracking is now active for verified rewards.",
          })
        },
        () => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location access for geo-verified tracking.",
            variant: "destructive",
          })
        },
      )
    }
  }

  const startTracking = () => {
    if (!locationEnabled) {
      handleLocationEnable()
      return
    }

    setIsTracking(true)
    setDuration(0)
    setDistance(0)
    setPoints(0)

    toast({
      title: "Geo-Tracking Started! 🏃‍♂️",
      description: `Tracking your activity with ${productName}`,
    })
  }

  const stopTracking = () => {
    setIsTracking(false)
    const finalPoints = Math.floor((duration / 60000) * (nfcVerified ? 37.5 : 25))

    toast({
      title: "Activity Complete! 🎉",
      description: `You earned ${finalPoints} points for ${Math.floor(duration / 60000)} minutes!`,
    })

    onComplete?.(finalPoints)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Geo-Verified Tracking
        </CardTitle>
        <p className="text-white/80">Track with location verification for bonus rewards</p>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Status Badges */}
        <div className="flex gap-2">
          {nfcVerified && (
            <Badge className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              NFC Verified
            </Badge>
          )}
          {locationEnabled && (
            <Badge className="bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              GPS Active
            </Badge>
          )}
        </div>

        {/* Verification Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{productName}</p>
              <p className="text-sm text-muted-foreground">
                {nfcVerified ? "Verified - 50% bonus active!" : "Tap to verify for bonus points"}
              </p>
            </div>
            <Button
              onClick={handleNFCVerify}
              disabled={nfcVerified}
              variant={nfcVerified ? "outline" : "default"}
              size="sm"
            >
              {nfcVerified ? "Verified" : "Tap NFC"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Location Tracking</p>
              <p className="text-sm text-muted-foreground">
                {locationEnabled ? "GPS enabled for verification" : "Enable GPS for geo-verification"}
              </p>
            </div>
            <Button
              onClick={handleLocationEnable}
              disabled={locationEnabled}
              variant={locationEnabled ? "outline" : "default"}
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-1" />
              {locationEnabled ? "Enabled" : "Enable GPS"}
            </Button>
          </div>
        </div>

        {/* Live Stats */}
        {isTracking && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <Clock className="h-4 w-4 mx-auto mb-1 text-blue-500" />
              <div className="font-bold text-blue-700">{formatTime(duration)}</div>
              <div className="text-xs text-blue-600">Time</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <Route className="h-4 w-4 mx-auto mb-1 text-green-500" />
              <div className="font-bold text-green-700">{Math.round(distance)}m</div>
              <div className="text-xs text-green-600">Distance</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <Zap className="h-4 w-4 mx-auto mb-1 text-purple-500" />
              <div className="font-bold text-purple-700">{points}</div>
              <div className="text-xs text-purple-600">Points</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <Smartphone className="h-4 w-4 mx-auto mb-1 text-orange-500" />
              <div className="font-bold text-orange-700">{nfcVerified ? "1.5x" : "1x"}</div>
              <div className="text-xs text-orange-600">Multiplier</div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={isTracking ? stopTracking : startTracking}
          className={`w-full ${isTracking ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}
          size="lg"
        >
          {isTracking ? (
            <>
              <Pause className="h-5 w-5 mr-2" />
              Stop Geo-Tracking
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Start Geo-Tracking
            </>
          )}
        </Button>

        {/* Privacy Notice */}
        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3" />
            <span className="font-medium">Privacy Protected:</span>
          </div>
          <p className="mt-1">Location data is encrypted and only used for activity verification.</p>
        </div>
      </CardContent>
    </Card>
  )
}
