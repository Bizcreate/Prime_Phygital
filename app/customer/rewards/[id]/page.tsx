"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Gift, Store } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function RewardDetail() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [userPoints] = useState(2450) // In real app, get from context/API

  // Mock reward data - in real app, fetch based on params.id
  const rewardData = {
    "reward-1": {
      id: "reward-1",
      name: "15% Off Next Purchase",
      brand: "Urban Athletics",
      description:
        "Get 15% off your next purchase at any Urban Athletics store or online. This exclusive discount can be used on any item in their collection, including limited edition releases.",
      points: 1000,
      expires: "June 30, 2025",
      terms: [
        "Valid for one-time use only",
        "Cannot be combined with other offers",
        "Valid at all Urban Athletics stores and online",
        "Excludes gift cards and previous purchases",
      ],
      category: "Discount",
      image: "/placeholder.svg?height=300&width=400&text=Urban+Athletics+15%+Off",
    },
    "reward-2": {
      id: "reward-2",
      name: "Exclusive Access to New Collection",
      brand: "Streetwear Co.",
      description:
        "Get early access to the upcoming summer collection before public release. Be the first to shop the latest designs and secure your favorite pieces.",
      points: 2500,
      expires: "July 15, 2025",
      terms: [
        "Access granted 48 hours before public launch",
        "Limited quantities available",
        "No additional discounts apply",
        "Access link sent via email",
      ],
      category: "Early Access",
      image: "/placeholder.svg?height=300&width=400&text=Streetwear+Co+Early+Access",
    },
    "reward-3": {
      id: "reward-3",
      name: "Limited Edition NFT",
      brand: "Digital Collectibles",
      description:
        "Exclusive digital collectible only available to Prime Phygital members. This unique NFT represents your membership and can be displayed in your digital wallet.",
      points: 5000,
      expires: "No expiration",
      terms: [
        "One NFT per customer",
        "Delivered to connected wallet",
        "Transferable after 30 days",
        "Includes exclusive community access",
      ],
      category: "Digital Asset",
      image: "/placeholder.svg?height=300&width=400&text=Limited+Edition+NFT",
    },
    "reward-4": {
      id: "reward-4",
      name: "Free Shipping Voucher",
      brand: "Multiple Brands",
      description:
        "Free shipping on your next order with any participating brand. Save on delivery costs for your next Prime Phygital purchase.",
      points: 500,
      expires: "December 31, 2025",
      terms: [
        "Valid on orders over $50",
        "Participating brands only",
        "One-time use per customer",
        "Cannot be combined with other shipping offers",
      ],
      category: "Shipping",
      image: "/placeholder.svg?height=300&width=400&text=Free+Shipping+Voucher",
    },
  }

  const reward = rewardData[params.id as keyof typeof rewardData]

  if (!reward) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Reward Not Found</h2>
          <p className="text-muted-foreground mb-4">The reward you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/customer/rewards")}>Back to Rewards</Button>
        </div>
      </div>
    )
  }

  const handleRedeem = async () => {
    if (userPoints < reward.points) {
      toast({
        title: "Insufficient Points ❌",
        description: `You need ${reward.points - userPoints} more points to redeem this reward.`,
        variant: "destructive",
      })
      return
    }

    setIsRedeeming(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reward Redeemed! 🎉",
        description: `Successfully redeemed ${reward.name}! Check your email for the reward code.`,
      })
      setIsRedeeming(false)
      // In real app, redirect to redeemed rewards or show success page
      router.push("/customer/rewards?tab=redeemed")
    }, 2000)
  }

  const canRedeem = userPoints >= reward.points

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{reward.name}</h1>
          <p className="text-muted-foreground">{reward.brand}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Reward Image */}
        <Card>
          <CardContent className="p-0">
            <img
              src={reward.image || "/placeholder.svg"}
              alt={reward.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Reward Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <span>Reward Details</span>
                </CardTitle>
                <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                  {reward.points} pts
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{reward.description}</p>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Store className="h-4 w-4" />
                <span>{reward.brand}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Expires: {reward.expires}</span>
              </div>

              <Badge variant="secondary">{reward.category}</Badge>
            </CardContent>
          </Card>

          {/* Redemption Action */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Your Points:</span>
                  <span className="text-lg font-bold">{userPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Required:</span>
                  <span className="text-lg font-bold">{reward.points.toLocaleString()}</span>
                </div>
                {!canRedeem && (
                  <div className="text-sm text-red-600">
                    You need {(reward.points - userPoints).toLocaleString()} more points
                  </div>
                )}
                <Button className="w-full" size="lg" disabled={!canRedeem || isRedeeming} onClick={handleRedeem}>
                  {isRedeeming ? "Redeeming..." : !canRedeem ? "Not Enough Points" : "Redeem Reward"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {reward.terms.map((term, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <span className="text-muted-foreground">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
