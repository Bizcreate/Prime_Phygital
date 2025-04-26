"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Camera, MapPin, CheckCircle, XCircle, AlertCircle, Smartphone, QrCode } from "lucide-react"
import type { UserActivity, ProofRequirement } from "@/types/wear-to-earn"

interface ActivityVerificationProps {
  activity: UserActivity
  requirement: ProofRequirement
  onVerify: (activityId: string, verificationData: any) => Promise<void>
  onReject: (activityId: string, reason: string) => Promise<void>
}

export function ActivityVerification({ activity, requirement, onVerify, onReject }: ActivityVerificationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState<"photo" | "nfc" | "qr" | "manual">("photo")
  const [verificationData, setVerificationData] = useState<any>({})
  const [rejectionReason, setRejectionReason] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview
    const reader = new FileReader()
    reader.onload = () => {
      setPhotoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Store the file in verification data
    setVerificationData({
      ...verificationData,
      photo: file,
    })
  }

  const handleLocationCapture = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setVerificationData({
            ...verificationData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          })
          toast({
            title: "Location Captured",
            description: "Your current location has been recorded for verification.",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Unable to capture your location. Please check your device settings.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      })
    }
  }

  const handleVerify = async () => {
    if (verificationMethod === "photo" && !verificationData.photo) {
      toast({
        title: "Photo Required",
        description: "Please take or upload a photo for verification.",
        variant: "destructive",
      })
      return
    }

    if (requirement.locationRequired && !verificationData.location) {
      toast({
        title: "Location Required",
        description: "Please capture your location for verification.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await onVerify(activity.id, {
        ...verificationData,
        method: verificationMethod,
      })
      toast({
        title: "Verification Submitted",
        description: "Your activity has been verified successfully.",
      })
    } catch (error) {
      console.error("Error verifying activity:", error)
      toast({
        title: "Verification Failed",
        description: "There was an error verifying your activity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejecting this activity.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await onReject(activity.id, rejectionReason)
      toast({
        title: "Activity Rejected",
        description: "The activity has been rejected.",
      })
    } catch (error) {
      console.error("Error rejecting activity:", error)
      toast({
        title: "Error",
        description: "There was an error rejecting this activity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Activity</CardTitle>
        <CardDescription>Provide verification for your "{requirement.name}" activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Verification Method</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              type="button"
              variant={verificationMethod === "photo" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-20 gap-1"
              onClick={() => setVerificationMethod("photo")}
            >
              <Camera className="h-6 w-6" />
              <span>Photo</span>
            </Button>
            <Button
              type="button"
              variant={verificationMethod === "nfc" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-20 gap-1"
              onClick={() => setVerificationMethod("nfc")}
            >
              <Smartphone className="h-6 w-6" />
              <span>NFC Scan</span>
            </Button>
            <Button
              type="button"
              variant={verificationMethod === "qr" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-20 gap-1"
              onClick={() => setVerificationMethod("qr")}
            >
              <QrCode className="h-6 w-6" />
              <span>QR Code</span>
            </Button>
            <Button
              type="button"
              variant={verificationMethod === "manual" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-20 gap-1"
              onClick={() => setVerificationMethod("manual")}
            >
              <CheckCircle className="h-6 w-6" />
              <span>Manual</span>
            </Button>
          </div>
        </div>

        {verificationMethod === "photo" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-upload">Upload Photo Evidence</Label>
              <div className="flex items-center gap-4">
                <Input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // This would trigger the device camera in a real app
                    toast({
                      title: "Camera Activated",
                      description: "In a real app, this would open your device camera.",
                    })
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>

            {photoPreview && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 relative aspect-video bg-secondary/20 rounded-md overflow-hidden">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Verification"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {verificationMethod === "nfc" && (
          <div className="text-center py-8 border rounded-md">
            <Smartphone className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">NFC Verification</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Tap your device against the NFC tag on your product to verify your activity.
            </p>
            <Button
              onClick={() => {
                // This would trigger NFC scanning in a real app
                toast({
                  title: "NFC Scanner Activated",
                  description: "In a real app, this would activate your device's NFC scanner.",
                })

                // Simulate successful scan after 2 seconds
                setTimeout(() => {
                  setVerificationData({
                    ...verificationData,
                    nfc: {
                      tagId: "nfc-" + Math.random().toString(36).substring(2, 10),
                      timestamp: new Date().toISOString(),
                    },
                  })

                  toast({
                    title: "NFC Tag Scanned",
                    description: "NFC tag successfully scanned and verified.",
                  })
                }, 2000)
              }}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Scan NFC Tag
            </Button>
          </div>
        )}

        {verificationMethod === "qr" && (
          <div className="text-center py-8 border rounded-md">
            <QrCode className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">QR Code Verification</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Scan the QR code on your product to verify your activity.
            </p>
            <Button
              onClick={() => {
                // This would trigger QR scanning in a real app
                toast({
                  title: "QR Scanner Activated",
                  description: "In a real app, this would activate your device's camera for QR scanning.",
                })

                // Simulate successful scan after 2 seconds
                setTimeout(() => {
                  setVerificationData({
                    ...verificationData,
                    qr: {
                      code: "qr-" + Math.random().toString(36).substring(2, 10),
                      timestamp: new Date().toISOString(),
                    },
                  })

                  toast({
                    title: "QR Code Scanned",
                    description: "QR code successfully scanned and verified.",
                  })
                }, 2000)
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Scan QR Code
            </Button>
          </div>
        )}

        {verificationMethod === "manual" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-notes">Verification Notes</Label>
              <Textarea
                id="verification-notes"
                placeholder="Describe how you completed this activity..."
                value={verificationData.notes || ""}
                onChange={(e) =>
                  setVerificationData({
                    ...verificationData,
                    notes: e.target.value,
                  })
                }
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}

        {requirement.locationRequired && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label>Location Verification</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleLocationCapture}>
                <MapPin className="h-4 w-4 mr-2" />
                Capture Location
              </Button>
            </div>
            {verificationData.location ? (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>
                  Location captured: {verificationData.location.latitude.toFixed(6)},{" "}
                  {verificationData.location.longitude.toFixed(6)}
                </span>
              </div>
            ) : (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>Location verification required</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="rejection-reason">Rejection Reason (Optional)</Label>
          <Textarea
            id="rejection-reason"
            placeholder="If you need to reject this activity, provide a reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="destructive" onClick={handleReject} disabled={isSubmitting || !rejectionReason}>
          <XCircle className="h-4 w-4 mr-2" />
          Reject Activity
        </Button>
        <Button type="button" onClick={handleVerify} disabled={isSubmitting}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Verify Activity
        </Button>
      </CardFooter>
    </Card>
  )
}
