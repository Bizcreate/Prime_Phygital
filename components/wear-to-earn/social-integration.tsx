"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Camera, MapPin, Award, Instagram, Twitter, Facebook, Youtube } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SocialIntegrationProps {
  productId: string
  productName: string
  pointsPerShare?: number
  pointsPerPhoto?: number
  pointsPerCheckIn?: number
}

export function SocialIntegration({
  productId,
  productName,
  pointsPerShare = 50,
  pointsPerPhoto = 100,
  pointsPerCheckIn = 75,
}: SocialIntegrationProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("share")
  const [isSharing, setIsSharing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isCheckingIn, setIsCheckingIn] = useState(false)

  const handleShare = (platform: string) => {
    setIsSharing(true)

    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false)

      toast({
        title: "Shared Successfully",
        description: `You earned ${pointsPerShare} points for sharing on ${platform}!`,
      })
    }, 1500)
  }

  const handlePhotoUpload = () => {
    setIsUploading(true)

    // Simulate photo upload process
    setTimeout(() => {
      setIsUploading(false)

      toast({
        title: "Photo Uploaded",
        description: `Your photo has been submitted for verification. You'll earn ${pointsPerPhoto} points once approved!`,
      })
    }, 2000)
  }

  const handleCheckIn = () => {
    setIsCheckingIn(true)

    // Simulate location check-in process
    setTimeout(() => {
      setIsCheckingIn(false)

      toast({
        title: "Checked In Successfully",
        description: `You earned ${pointsPerCheckIn} points for checking in with your ${productName}!`,
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Engagement</CardTitle>
        <CardDescription>Earn additional points by sharing your experience with {productName}</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="share" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="share">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </TabsTrigger>
            <TabsTrigger value="photo">
              <Camera className="h-4 w-4 mr-2" />
              Photo
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="h-4 w-4 mr-2" />
              Check-In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="mt-4 space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center text-blue-700 mb-2">
                <Award className="h-5 w-5 mr-2" />
                <span className="font-medium">Earn {pointsPerShare} Points</span>
              </div>
              <p className="text-sm text-blue-600">
                Share your {productName} on social media and earn points! Choose a platform below to share.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-12"
                onClick={() => handleShare("Instagram")}
                disabled={isSharing}
              >
                <Instagram className="h-5 w-5 text-pink-600" />
                Instagram
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-12"
                onClick={() => handleShare("Twitter")}
                disabled={isSharing}
              >
                <Twitter className="h-5 w-5 text-blue-400" />
                Twitter
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-12"
                onClick={() => handleShare("Facebook")}
                disabled={isSharing}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                Facebook
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-12"
                onClick={() => handleShare("TikTok")}
                disabled={isSharing}
              >
                <Youtube className="h-5 w-5 text-red-500" />
                TikTok
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="photo" className="mt-4 space-y-4">
            <div className="bg-green-50 p-4 rounded-md">
              <div className="flex items-center text-green-700 mb-2">
                <Award className="h-5 w-5 mr-2" />
                <span className="font-medium">Earn {pointsPerPhoto} Points</span>
              </div>
              <p className="text-sm text-green-600">
                Upload a photo of you wearing or using your {productName} to earn points after verification.
              </p>
            </div>

            <div className="border-2 border-dashed rounded-md p-8 text-center">
              <Camera className="h-10 w-10 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium mb-2">Upload Product Photo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Take a clear photo showing you with the product to earn points
              </p>
              <Button
                onClick={handlePhotoUpload}
                disabled={isUploading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
              >
                {isUploading ? "Uploading..." : "Upload Photo"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="location" className="mt-4 space-y-4">
            <div className="bg-amber-50 p-4 rounded-md">
              <div className="flex items-center text-amber-700 mb-2">
                <Award className="h-5 w-5 mr-2" />
                <span className="font-medium">Earn {pointsPerCheckIn} Points</span>
              </div>
              <p className="text-sm text-amber-600">
                Check in at a store or event location while wearing your {productName} to earn bonus points.
              </p>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Nearby Locations</h3>
              <div className="space-y-3">
                {[
                  { name: "Flagship Store - Downtown", distance: "0.8 miles away" },
                  { name: "Shopping Mall Location", distance: "1.2 miles away" },
                  { name: "Pop-up Event at Central Park", distance: "2.5 miles away" },
                ].map((location, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-muted-foreground">{location.distance}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleCheckIn} disabled={isCheckingIn}>
                      Check In
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t p-6">
        <div className="w-full text-center text-sm text-muted-foreground">
          Social activities are subject to verification and daily limits
        </div>
      </CardFooter>
    </Card>
  )
}
