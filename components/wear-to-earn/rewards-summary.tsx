"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Gift, ChevronRight, Clock, Calendar, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface RewardsSummaryProps {
  userId?: string
  totalPoints?: number
  availableRewards?: {
    id: string
    name: string
    description: string
    pointsCost: number
    type: "discount" | "product" | "nft" | "access" | "other"
    expiresAt?: string
  }[]
  recentRewards?: {
    id: string
    name: string
    date: string
    points: number
    status: "pending" | "redeemed" | "expired"
  }[]
}

export function RewardsSummary({
  userId,
  totalPoints = 2450,
  availableRewards = [
    {
      id: "1",
      name: "15% Off Next Purchase",
      description: "Get 15% off your next purchase in our store",
      pointsCost: 1000,
      type: "discount",
      expiresAt: "2023-12-31",
    },
    {
      id: "2",
      name: "Exclusive Digital Badge",
      description: "Show off your loyalty with this exclusive digital collectible",
      pointsCost: 500,
      type: "nft",
    },
    {
      id: "3",
      name: "Early Access to New Collection",
      description: "Get early access to our upcoming product collection",
      pointsCost: 2000,
      type: "access",
      expiresAt: "2023-10-15",
    },
    {
      id: "4",
      name: "Limited Edition Product",
      description: "Redeem for a limited edition product only available to loyal customers",
      pointsCost: 5000,
      type: "product",
    },
  ],
  recentRewards = [
    {
      id: "101",
      name: "10% Off Coupon",
      date: "2023-05-01",
      points: 500,
      status: "redeemed",
    },
    {
      id: "102",
      name: "Digital Collectible",
      date: "2023-04-15",
      points: 250,
      status: "redeemed",
    },
    {
      id: "103",
      name: "Free Shipping Voucher",
      date: "2023-03-22",
      points: 300,
      status: "expired",
    },
  ],
}: RewardsSummaryProps) {
  const { toast } = useToast()
  const [points, setPoints] = useState(totalPoints)

  const handleRedeemReward = (reward: (typeof availableRewards)[0]) => {
    if (points < reward.pointsCost) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.pointsCost - points} more points to redeem this reward.`,
        variant: "destructive",
      })
      return
    }

    setPoints(points - reward.pointsCost)
    toast({
      title: "Reward Redeemed",
      description: `You have successfully redeemed ${reward.name} for ${reward.pointsCost} points.`,
    })
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Gift className="h-5 w-5 text-green-500" />
      case "nft":
        return <Award className="h-5 w-5 text-purple-500" />
      case "access":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "product":
        return <Gift className="h-5 w-5 text-amber-500" />
      default:
        return <Award className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "redeemed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Redeemed</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Expired</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardTitle>Your Rewards</CardTitle>
        <CardDescription className="text-white/80">Redeem your points for exclusive rewards</CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{points}</div>
            <div className="text-white/80">Available Points</div>
          </div>
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
            View History
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-medium mb-4">Available Rewards</h3>
          <div className="space-y-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getRewardIcon(reward.type)}</div>
                      <div>
                        <h4 className="font-medium">{reward.name}</h4>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                        {reward.expiresAt && (
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2 bg-purple-50 text-purple-800 border-purple-200">
                        {reward.pointsCost} pts
                      </Badge>
                      <div>
                        {points >= reward.pointsCost ? (
                          <Button
                            size="sm"
                            onClick={() => handleRedeemReward(reward)}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                          >
                            Redeem
                          </Button>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground text-right">
                              {reward.pointsCost - points} more points needed
                            </div>
                            <Progress
                              value={(points / reward.pointsCost) * 100}
                              className="h-1.5 w-24"
                              indicatorClassName="bg-purple-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Recent Redemptions</h3>
          <div className="space-y-3">
            {recentRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium">{reward.name}</h4>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{reward.points} pts</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {new Date(reward.date).toLocaleDateString()}
                  </div>
                </div>
                {getStatusBadge(reward.status)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-6">
        <Button variant="outline" className="w-full">
          View All Rewards
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
