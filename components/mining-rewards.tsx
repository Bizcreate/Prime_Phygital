"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Award,
  Clock,
  Calendar,
  MapPin,
  Share2,
  Users,
  BarChart3,
  ArrowUpRight,
  Zap,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface MiningActivity {
  id: string
  type: string
  timestamp: string
  location?: string
  tokensEarned: number
  verified: boolean
  description: string
}

interface MiningRewardsProps {
  productId: string
  tokenName?: string
  tokenSymbol?: string
  tokenLogo?: string
  miningMethod?: string
  dailyLimit?: number
  totalEarned?: number
  activities?: MiningActivity[]
  onVerifyActivity?: (activityId: string) => void
}

export function MiningRewards({
  productId,
  tokenName = "Prime Token",
  tokenSymbol = "PRIME",
  tokenLogo = "/prime-token-logo.png",
  miningMethod = "nfc",
  dailyLimit = 10,
  totalEarned = 0,
  activities: initialActivities = [],
  onVerifyActivity,
}: MiningRewardsProps) {
  const [activities, setActivities] = useState<MiningActivity[]>(initialActivities)
  const [activeTab, setActiveTab] = useState("overview")
  const [todayEarned, setTodayEarned] = useState(0)
  const [dailyProgress, setDailyProgress] = useState(0)
  const [nextMiningAvailable, setNextMiningAvailable] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState("")

  useEffect(() => {
    // Calculate today's earnings
    const today = new Date().toISOString().split("T")[0]
    const todayActivities = activities.filter(
      (activity) => activity.timestamp.split("T")[0] === today && activity.verified,
    )
    const earned = todayActivities.reduce((sum, activity) => sum + activity.tokensEarned, 0)
    setTodayEarned(earned)
    setDailyProgress((earned / dailyLimit) * 100)

    // Set next mining time (for demo purposes)
    if (earned >= dailyLimit) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      setNextMiningAvailable(tomorrow)
    } else if (todayActivities.length > 0) {
      const lastActivity = new Date(Math.max(...todayActivities.map((a) => new Date(a.timestamp).getTime())))
      const nextTime = new Date(lastActivity.getTime() + 3600000) // 1 hour cooldown
      setNextMiningAvailable(nextTime)
    } else {
      setNextMiningAvailable(null)
    }
  }, [activities, dailyLimit])

  useEffect(() => {
    if (!nextMiningAvailable) return

    const timer = setInterval(() => {
      const now = new Date()
      const diff = nextMiningAvailable.getTime() - now.getTime()

      if (diff <= 0) {
        setNextMiningAvailable(null)
        setCountdown("")
        clearInterval(timer)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [nextMiningAvailable])

  const handleMineTokens = () => {
    if (nextMiningAvailable && new Date() < nextMiningAvailable) return

    const newActivity: MiningActivity = {
      id: Date.now().toString(),
      type: miningMethod,
      timestamp: new Date().toISOString(),
      tokensEarned: 1,
      verified: false,
      description: getMiningDescription(miningMethod),
    }

    setActivities([newActivity, ...activities])
  }

  const handleVerifyActivity = (activityId: string) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === activityId ? { ...activity, verified: true } : activity,
    )
    setActivities(updatedActivities)

    if (onVerifyActivity) {
      onVerifyActivity(activityId)
    }
  }

  const getMiningDescription = (method: string) => {
    switch (method) {
      case "nfc":
        return "NFC tag scanned for product verification"
      case "wear":
        return "Product usage tracked via wear-to-earn"
      case "social":
        return "Product shared on social media"
      case "activity":
        return "Community activity completed"
      default:
        return "Token mining activity"
    }
  }

  const getMiningIcon = (method: string) => {
    switch (method) {
      case "nfc":
        return <Smartphone className="h-5 w-5 text-neon-blue" />
      case "wear":
        return <Clock className="h-5 w-5 text-neon-purple" />
      case "social":
        return <Share2 className="h-5 w-5 text-green-500" />
      case "activity":
        return <Users className="h-5 w-5 text-amber-500" />
      default:
        return <Award className="h-5 w-5" />
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Mining & Rewards</CardTitle>
            <CardDescription>Earn tokens through product interaction</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-white/10">
              <img src={tokenLogo || "/placeholder.svg"} alt={tokenName} className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="font-bold">{tokenSymbol}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white/5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Activity History</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Total Earned</h3>
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">Lifetime</Badge>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{totalEarned}</span>
                  <span className="text-white/70">{tokenSymbol}</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Today's Earnings</h3>
                  <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">Daily</Badge>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{todayEarned}</span>
                  <span className="text-white/70">
                    / {dailyLimit} {tokenSymbol}
                  </span>
                </div>
                <Progress value={dailyProgress} className="h-2 mt-2" />
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-medium mb-4">Mining Method</h3>
              <div className="flex items-center gap-3 mb-4">
                {getMiningIcon(miningMethod)}
                <div>
                  <p className="font-medium">
                    {miningMethod === "nfc"
                      ? "NFC Tap Mining"
                      : miningMethod === "wear"
                        ? "Wear-to-Earn"
                        : miningMethod === "social"
                          ? "Social Engagement"
                          : "Activity Completion"}
                  </p>
                  <p className="text-sm text-white/70">{getMiningDescription(miningMethod)}</p>
                </div>
              </div>

              <Button
                onClick={handleMineTokens}
                disabled={nextMiningAvailable !== null && new Date() < nextMiningAvailable}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                {nextMiningAvailable && new Date() < nextMiningAvailable ? (
                  <>
                    <Clock className="h-4 w-4 mr-2" /> Next Mining in {countdown}
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" /> Mine Tokens Now
                  </>
                )}
              </Button>
            </div>

            {activities.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getMiningIcon(activity.type)}
                        <div>
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-white/70">{formatDate(activity.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">+{activity.tokensEarned}</span>
                        {activity.verified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-lg">
                <BarChart3 className="h-12 w-12 mx-auto text-white/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Mining Activity</h3>
                <p className="text-white/70 max-w-md mx-auto mb-6">
                  Start interacting with your product to earn tokens and track your mining activity.
                </p>
                <Button
                  onClick={handleMineTokens}
                  disabled={nextMiningAvailable !== null && new Date() < nextMiningAvailable}
                  className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                >
                  <Zap className="h-4 w-4 mr-2" /> Start Mining
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-white/10 p-2 mt-1">{getMiningIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{activity.description}</h3>
                            {activity.verified ? (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Verified</Badge>
                            ) : (
                              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">Pending</Badge>
                            )}
                          </div>
                          <div className="flex items-center text-white/70 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(activity.timestamp)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                          {activity.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {activity.location}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-1" />
                            Earned {activity.tokensEarned} {tokenSymbol}
                          </div>
                        </div>
                        {!activity.verified && (
                          <Button
                            size="sm"
                            onClick={() => handleVerifyActivity(activity.id)}
                            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Verify Activity
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Token Balance</h3>
                <Button variant="outline" size="sm" className="border-white/10">
                  <ArrowUpRight className="h-4 w-4 mr-2" /> View on Explorer
                </Button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10">
                  <img src={tokenLogo || "/placeholder.svg"} alt={tokenName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{totalEarned}</span>
                    <span className="text-white/70">{tokenSymbol}</span>
                  </div>
                  <p className="text-sm text-white/70">{tokenName}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-medium mb-4">Available Rewards</h3>
              <div className="space-y-3">
                <div className="border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Exclusive Community Access</h4>
                    <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">50 {tokenSymbol}</Badge>
                  </div>
                  <p className="text-sm text-white/70 mb-3">Gain access to exclusive community features and content</p>
                  <Button variant="outline" size="sm" className="w-full border-white/10" disabled={totalEarned < 50}>
                    {totalEarned < 50 ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" /> {50 - totalEarned} more tokens needed
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" /> Claim Reward
                      </>
                    )}
                  </Button>
                </div>

                <div className="border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Product Discount</h4>
                    <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                      100 {tokenSymbol}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/70 mb-3">Redeem for a 15% discount on your next purchase</p>
                  <Button variant="outline" size="sm" className="w-full border-white/10" disabled={totalEarned < 100}>
                    {totalEarned < 100 ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" /> {100 - totalEarned} more tokens needed
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" /> Claim Reward
                      </>
                    )}
                  </Button>
                </div>

                <div className="border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Limited Edition NFT</h4>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">250 {tokenSymbol}</Badge>
                  </div>
                  <p className="text-sm text-white/70 mb-3">Exclusive digital collectible for loyal customers</p>
                  <Button variant="outline" size="sm" className="w-full border-white/10" disabled={totalEarned < 250}>
                    {totalEarned < 250 ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" /> {250 - totalEarned} more tokens needed
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" /> Claim Reward
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="w-full text-center text-sm text-white/70">
          Mining rewards are subject to daily limits and verification
        </div>
      </CardFooter>
    </Card>
  )
}
