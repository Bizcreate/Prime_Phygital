"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface ActivityState {
  lastCompleted: string | null
  completedToday: boolean
  timesCompletedToday: number
  requiresAction: boolean
  actionCompleted: boolean
}

export default function Rewards() {
  const { toast } = useToast()
  const [userPoints, setUserPoints] = useState(2450)
  const [activeTab, setActiveTab] = useState("available")
  const router = useRouter()

  // Activity tracking state
  const [activityStates, setActivityStates] = useState<Record<string, ActivityState>>({
    "daily-login": {
      lastCompleted: null,
      completedToday: false,
      timesCompletedToday: 0,
      requiresAction: false,
      actionCompleted: false,
    },
    "product-review": {
      lastCompleted: null,
      completedToday: false,
      timesCompletedToday: 0,
      requiresAction: true,
      actionCompleted: false,
    },
    "social-share": {
      lastCompleted: null,
      completedToday: false,
      timesCompletedToday: 0,
      requiresAction: true,
      actionCompleted: false,
    },
    "wear-tracking": {
      lastCompleted: null,
      completedToday: false,
      timesCompletedToday: 0,
      requiresAction: true,
      actionCompleted: false,
    },
  })

  // Mock data for rewards
  const availableRewards = [
    {
      id: "reward-1",
      name: "15% Off Next Purchase",
      brand: "Urban Athletics",
      description: "Get 15% off your next purchase at any Urban Athletics store or online",
      points: 1000,
      expires: "June 30, 2025",
    },
    {
      id: "reward-2",
      name: "Exclusive Access to New Collection",
      brand: "Streetwear Co.",
      description: "Early access to the upcoming summer collection before public release",
      points: 2500,
      expires: "July 15, 2025",
    },
    {
      id: "reward-3",
      name: "Limited Edition NFT",
      brand: "Digital Collectibles",
      description: "Exclusive digital collectible only available to Prime Phygital members",
      points: 5000,
      expires: "No expiration",
    },
    {
      id: "reward-4",
      name: "Free Shipping Voucher",
      brand: "Multiple Brands",
      description: "Free shipping on your next order with any participating brand",
      points: 500,
      expires: "December 31, 2025",
    },
  ]

  const activities = [
    {
      id: "daily-login",
      name: "Daily Login",
      description: "Log in daily to earn bonus points",
      points: 50,
      category: "Daily",
      maxPerDay: 1,
      requiresAction: false,
      actionDescription: "",
    },
    {
      id: "product-review",
      name: "Write Product Review",
      description: "Share your experience with a product",
      points: 100,
      category: "Social",
      maxPerDay: 3,
      requiresAction: true,
      actionDescription: "Go to a product page and write a review",
    },
    {
      id: "social-share",
      name: "Share on Social Media",
      description: "Share your favorite products on social media",
      points: 75,
      category: "Social",
      maxPerDay: 5,
      requiresAction: true,
      actionDescription: "Share a product on social media first",
    },
    {
      id: "wear-tracking",
      name: "Track Wear Time",
      description: "Use wear-to-earn tracking for 1 hour",
      points: 25,
      category: "Activity",
      maxPerDay: 10,
      requiresAction: true,
      actionDescription: "Complete a wear-to-earn session first",
    },
  ]

  const isToday = (dateString: string | null): boolean => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const canEarnPoints = (activityId: string): { canEarn: boolean; reason: string } => {
    const activity = activities.find((a) => a.id === activityId)
    const state = activityStates[activityId]

    if (!activity || !state) {
      return { canEarn: false, reason: "Activity not found" }
    }

    // Check if already completed today for daily activities
    if (activity.maxPerDay === 1 && state.completedToday) {
      return { canEarn: false, reason: "Already completed today" }
    }

    // Check daily limit
    if (state.timesCompletedToday >= activity.maxPerDay) {
      return { canEarn: false, reason: `Daily limit reached (${activity.maxPerDay}/day)` }
    }

    // Check if action is required but not completed
    if (activity.requiresAction && !state.actionCompleted) {
      return { canEarn: false, reason: activity.actionDescription }
    }

    return { canEarn: true, reason: "" }
  }

  const handleEarnPoints = (activityId: string, activityName: string, points: number) => {
    const { canEarn, reason } = canEarnPoints(activityId)

    if (!canEarn) {
      toast({
        title: "Cannot Earn Points ❌",
        description: reason,
        variant: "destructive",
      })
      return
    }

    // Update activity state
    const now = new Date().toISOString()
    setActivityStates((prev) => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        lastCompleted: now,
        completedToday: true,
        timesCompletedToday: prev[activityId].timesCompletedToday + 1,
        actionCompleted: false, // Reset action completed after earning
      },
    }))

    // Award points
    setUserPoints((prev) => prev + points)

    toast({
      title: "Points Earned! 🎉",
      description: `You earned ${points} points for ${activityName}!`,
    })
  }

  const handleRedeemClick = () => {
    toast({
      title: "Redeem Mode Activated! 🎯",
      description: "Browse available rewards below to redeem your points.",
    })
    setActiveTab("available")
  }

  const handleTransferClick = () => {
    toast({
      title: "Transfer Points 💸",
      description: "Point transfer feature is now available!",
    })
  }

  const handleViewReward = (rewardId: string) => {
    router.push(`/customer/rewards/${rewardId}`)
  }

  // Simulate completing actions (in real app, these would be triggered by actual user actions)
  const simulateAction = (activityId: string, actionName: string) => {
    setActivityStates((prev) => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        actionCompleted: true,
      },
    }))

    toast({
      title: "Action Completed! ✅",
      description: `${actionName} completed. You can now earn points!`,
    })
  }

  // Reset daily states at midnight (simplified for demo)
  useEffect(() => {
    const checkDailyReset = () => {
      const now = new Date()
      setActivityStates((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((activityId) => {
          if (!isToday(updated[activityId].lastCompleted)) {
            updated[activityId] = {
              ...updated[activityId],
              completedToday: false,
              timesCompletedToday: 0,
            }
          }
        })
        return updated
      })
    }

    checkDailyReset()
    const interval = setInterval(checkDailyReset, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Rewards</h2>
        <p className="text-muted-foreground">Track and redeem your earned rewards</p>
      </div>

      <div className="mb-6">
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-white/80">Total Balance</p>
                <h3 className="text-3xl font-bold mt-1">{userPoints.toLocaleString()}</h3>
                <p className="text-sm mt-1">Prime Reward Points</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                <Image src="/prime-token-logo.png" alt="Prime Token" width={40} height={40} />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={handleRedeemClick}
              >
                Redeem
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={handleTransferClick}
              >
                Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="earn">Earn Points</TabsTrigger>
          <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.brand}</p>
                      <p className="mt-2 text-sm">{reward.description}</p>
                      <p className="text-xs text-muted-foreground mt-4">Expires: {reward.expires}</p>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                      {reward.points} pts
                    </Badge>
                  </div>
                  <Button className="w-full mt-4" variant="outline" onClick={() => handleViewReward(reward.id)}>
                    View Reward Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earn More Points</CardTitle>
              <CardDescription>Complete activities to earn reward points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {activities.map((activity) => {
                  const { canEarn, reason } = canEarnPoints(activity.id)
                  const state = activityStates[activity.id]

                  return (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{activity.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{activity.category}</Badge>
                              {state.timesCompletedToday > 0 && (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  {state.timesCompletedToday}/{activity.maxPerDay} today
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge className="bg-green-50 text-green-700 border-green-200">+{activity.points} pts</Badge>
                        </div>

                        {activity.requiresAction && !state.actionCompleted && (
                          <Button
                            className="w-full mt-4"
                            size="sm"
                            variant="outline"
                            onClick={() => simulateAction(activity.id, activity.actionDescription)}
                          >
                            {activity.actionDescription}
                          </Button>
                        )}

                        <Button
                          className="w-full mt-2"
                          size="sm"
                          disabled={!canEarn}
                          onClick={() => handleEarnPoints(activity.id, activity.name, activity.points)}
                        >
                          {canEarn ? "Earn Points" : reason}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redeemed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redeemed Rewards</CardTitle>
              <CardDescription>Rewards you've already claimed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">10% Off Coupon</h3>
                        <p className="text-xs text-muted-foreground mt-1">Redeemed: April 10, 2025</p>
                        <p className="text-xs text-muted-foreground">Expires: July 10, 2025</p>
                      </div>
                      <Badge>800 pts</Badge>
                    </div>
                    <div className="mt-2 p-2 bg-muted rounded text-center">
                      <p className="font-mono text-sm">PRIME10OFF</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Track your points earned and spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    type: "earned",
                    amount: 150,
                    source: "Wore Neon Streak Sneakers",
                    timestamp: "2025-05-16",
                  },
                  {
                    id: "2",
                    type: "spent",
                    amount: 800,
                    source: "Redeemed 10% Off Coupon",
                    timestamp: "2025-04-10",
                  },
                  {
                    id: "3",
                    type: "earned",
                    amount: 500,
                    source: "Authenticated New Product",
                    timestamp: "2025-04-05",
                  },
                ].map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{transaction.source}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        transaction.type === "earned"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.amount} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
