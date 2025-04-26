"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Smartphone,
  Award,
  Clock,
  Calendar,
  MapPin,
  Zap,
  CheckCircle,
  XCircle,
  Camera,
  AlertCircle,
  Timer,
  BarChart3,
  History,
  Users,
} from "lucide-react"
import type { ProofProtocol, ProofRequirement, UserActivity, UserProtocolProgress } from "@/types/wear-to-earn"

interface ActivityTrackerProps {
  userId: string
  protocol: ProofProtocol
  userProgress?: UserProtocolProgress
  activities?: UserActivity[]
  onStartActivity: (requirementId: string) => Promise<void>
  onVerifyActivity: (activityId: string) => Promise<void>
  onClaimRewards: () => Promise<void>
}

export function ActivityTracker({
  userId,
  protocol,
  userProgress,
  activities = [],
  onStartActivity,
  onVerifyActivity,
  onClaimRewards,
}: ActivityTrackerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRequirement, setSelectedRequirement] = useState<ProofRequirement | null>(null)
  const [isActivityInProgress, setIsActivityInProgress] = useState(false)
  const [activityTimer, setActivityTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  // Calculate progress for each requirement
  const requirementProgress = protocol.requirements.map((req) => {
    const completedCount = userProgress?.completedRequirements[req.id] || 0
    let progress = 0

    // For one-time requirements, it's either 0 or 100%
    if (req.frequency === "once") {
      progress = completedCount > 0 ? 100 : 0
    } else {
      // For recurring requirements, show progress toward daily/weekly limit
      const maxDaily = req.frequency === "daily" ? 1 : req.frequency === "weekly" ? 7 : 30
      progress = Math.min(100, (completedCount / maxDaily) * 100)
    }

    return {
      requirement: req,
      completedCount,
      progress,
    }
  })

  // Check if a requirement is on cooldown
  const isOnCooldown = (requirementId: string): { onCooldown: boolean; remainingTime?: number } => {
    const requirement = protocol.requirements.find((r) => r.id === requirementId)
    if (!requirement || !requirement.cooldownPeriod) {
      return { onCooldown: false }
    }

    const lastActivity = activities
      .filter((a) => a.requirementId === requirementId && a.status === "verified")
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]

    if (!lastActivity) {
      return { onCooldown: false }
    }

    const lastActivityTime = new Date(lastActivity.timestamp).getTime()
    const cooldownEndTime = lastActivityTime + requirement.cooldownPeriod * 60 * 1000
    const now = Date.now()

    if (now < cooldownEndTime) {
      return {
        onCooldown: true,
        remainingTime: Math.ceil((cooldownEndTime - now) / (60 * 1000)), // in minutes
      }
    }

    return { onCooldown: false }
  }

  // Format time for display
  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}`
    }

    return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`
  }

  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle starting an activity
  const handleStartActivity = async (requirement: ProofRequirement) => {
    setSelectedRequirement(requirement)

    // For activities that require duration tracking
    if (requirement.minimumDuration && (requirement.type === "wear" || requirement.type === "use")) {
      setIsActivityInProgress(true)
      setActivityTimer(0)

      // Start the timer
      const interval = setInterval(() => {
        setActivityTimer((prev) => prev + 1)
      }, 1000)

      setTimerInterval(interval)

      toast({
        title: "Activity Started",
        description: `Keep using your product for at least ${requirement.minimumDuration} minutes to earn rewards.`,
      })
    } else {
      // For immediate activities
      try {
        await onStartActivity(requirement.id)
        toast({
          title: "Activity Recorded",
          description: "Your activity has been recorded and is pending verification.",
        })
      } catch (error) {
        console.error("Error starting activity:", error)
        toast({
          title: "Error",
          description: "There was an error recording your activity. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Handle completing a timed activity
  const handleCompleteActivity = async () => {
    if (!selectedRequirement) return

    // Clear the timer
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }

    // Check if the minimum duration was met
    const minutesElapsed = Math.floor(activityTimer / 60)
    if (selectedRequirement.minimumDuration && minutesElapsed < selectedRequirement.minimumDuration) {
      toast({
        title: "Minimum Duration Not Met",
        description: `You need to use the product for at least ${selectedRequirement.minimumDuration} minutes.`,
        variant: "destructive",
      })
      setIsActivityInProgress(false)
      setActivityTimer(0)
      setSelectedRequirement(null)
      return
    }

    // Record the activity
    try {
      await onStartActivity(selectedRequirement.id)
      toast({
        title: "Activity Completed",
        description: `You've successfully completed this activity and earned points!`,
      })
    } catch (error) {
      console.error("Error completing activity:", error)
      toast({
        title: "Error",
        description: "There was an error recording your activity. Please try again.",
        variant: "destructive",
      })
    }

    // Reset the state
    setIsActivityInProgress(false)
    setActivityTimer(0)
    setSelectedRequirement(null)
  }

  // Handle canceling a timed activity
  const handleCancelActivity = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }

    setIsActivityInProgress(false)
    setActivityTimer(0)
    setSelectedRequirement(null)

    toast({
      title: "Activity Canceled",
      description: "You've canceled the current activity.",
    })
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, [timerInterval])

  // Format timer display
  const formatTimerDisplay = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Get the appropriate icon for a requirement
  const getRequirementIcon = (type: string) => {
    switch (type) {
      case "wear":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "use":
        return <Zap className="h-5 w-5 text-purple-500" />
      case "scan":
        return <Smartphone className="h-5 w-5 text-green-500" />
      case "location":
        return <MapPin className="h-5 w-5 text-red-500" />
      case "time":
        return <Calendar className="h-5 w-5 text-orange-500" />
      case "social":
        return <Users className="h-5 w-5 text-pink-500" />
      default:
        return <Award className="h-5 w-5 text-gray-500" />
    }
  }

  // Calculate the current tier based on points
  const getCurrentTier = () => {
    if (!protocol.tiers || protocol.tiers.length === 0 || !userProgress) {
      return null
    }

    // Sort tiers by threshold in descending order
    const sortedTiers = [...protocol.tiers].sort((a, b) => b.threshold - a.threshold)

    // Find the highest tier the user qualifies for
    return sortedTiers.find((tier) => userProgress.totalPointsEarned >= tier.threshold) || null
  }

  // Calculate rewards available to claim
  const getClaimableRewards = (): number => {
    if (!userProgress) return 0
    return Math.max(0, userProgress.rewardsEarned - userProgress.rewardsClaimed)
  }

  const currentTier = getCurrentTier()
  const claimableRewards = getClaimableRewards()

  return (
    <div className="space-y-6">
      {isActivityInProgress ? (
        <Card className="border-primary">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 animate-pulse" />
              Activity in Progress
            </CardTitle>
            <CardDescription>{selectedRequirement?.name} - Keep using your product</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono mb-2">{formatTimerDisplay(activityTimer)}</div>
              <p className="text-muted-foreground">Minimum required: {selectedRequirement?.minimumDuration} minutes</p>
            </div>

            <Progress
              value={
                selectedRequirement?.minimumDuration
                  ? Math.min(100, (activityTimer / 60 / selectedRequirement.minimumDuration) * 100)
                  : 0
              }
              className="h-2"
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleCancelActivity}>
              <XCircle className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleCompleteActivity}
              disabled={
                selectedRequirement?.minimumDuration
                  ? Math.floor(activityTimer / 60) < selectedRequirement.minimumDuration
                  : false
              }
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{protocol.name}</CardTitle>
                <CardDescription>{protocol.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Total Points</h3>
                      <Badge variant="outline">Lifetime</Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{userProgress?.totalPointsEarned || 0}</span>
                      <span className="text-muted-foreground">points</span>
                    </div>
                  </div>

                  <div className="bg-secondary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Rewards Earned</h3>
                      <Badge variant="outline">Total</Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{userProgress?.rewardsEarned || 0}</span>
                      <span className="text-muted-foreground">rewards</span>
                    </div>
                  </div>
                </div>

                {protocol.rewardDistribution === "tiered" && protocol.tiers && protocol.tiers.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Your Current Tier</h3>
                    <div className="relative pt-2">
                      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary/30 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-2 bg-primary rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              userProgress?.totalPointsEarned
                                ? (userProgress.totalPointsEarned /
                                    Math.max(...protocol.tiers.map((t) => t.threshold))) *
                                    100
                                : 0,
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {protocol.tiers.map((tier, index) => (
                          <div
                            key={index}
                            className={`text-center p-3 rounded-lg border ${
                              currentTier?.name === tier.name ? "border-primary bg-primary/10" : "border-secondary/30"
                            }`}
                          >
                            <div className="font-medium">{tier.name}</div>
                            <div className="text-sm text-muted-foreground">{tier.threshold} points</div>
                            <div className="mt-1 text-xs">
                              {userProgress?.totalPointsEarned && userProgress.totalPointsEarned >= tier.threshold ? (
                                <Badge variant="success" className="bg-green-500/20 text-green-500 border-green-500/30">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Unlocked
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {userProgress?.totalPointsEarned
                                    ? tier.threshold - userProgress.totalPointsEarned
                                    : tier.threshold}{" "}
                                  points needed
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Available Activities</h3>
                    <Badge variant="outline">{protocol.requirements.length} total</Badge>
                  </div>

                  <div className="space-y-3">
                    {requirementProgress.map(({ requirement, completedCount, progress }) => {
                      const cooldownInfo = isOnCooldown(requirement.id)

                      return (
                        <div key={requirement.id} className="bg-secondary/20 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getRequirementIcon(requirement.type)}
                              <div>
                                <h4 className="font-medium">{requirement.name}</h4>
                                <p className="text-sm text-muted-foreground">{requirement.description}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {requirement.pointsValue} points
                            </Badge>
                          </div>

                          <div className="space-y-2 mt-3">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                {completedCount}{" "}
                                {requirement.frequency !== "once"
                                  ? `/ ${
                                      requirement.frequency === "daily"
                                        ? "1 daily"
                                        : requirement.frequency === "weekly"
                                          ? "7 weekly"
                                          : "30 monthly"
                                    }`
                                  : ""}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div className="mt-3">
                            <Button
                              className="w-full"
                              disabled={cooldownInfo.onCooldown}
                              onClick={() => handleStartActivity(requirement)}
                            >
                              {cooldownInfo.onCooldown ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Cooldown: {formatTime(cooldownInfo.remainingTime || 0)}
                                </>
                              ) : (
                                <>
                                  <Zap className="h-4 w-4 mr-2" />
                                  Start Activity
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {claimableRewards > 0 && (
                  <Card className="border-primary">
                    <CardHeader className="bg-primary/10">
                      <CardTitle>Rewards Available</CardTitle>
                      <CardDescription>You have rewards ready to claim</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">{claimableRewards} rewards</p>
                          <p className="text-sm text-muted-foreground">Ready to claim</p>
                        </div>
                        <Button onClick={onClaimRewards}>
                          <Award className="h-4 w-4 mr-2" />
                          Claim Rewards
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your recent participation in this protocol</CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.map((activity) => {
                      const requirement = protocol.requirements.find((r) => r.id === activity.requirementId)

                      return (
                        <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-md">
                          <div className="rounded-full bg-secondary/20 p-2 mt-1">
                            {requirement ? getRequirementIcon(requirement.type) : <Award className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-medium">{requirement?.name || "Activity"}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{formatDate(activity.timestamp)}</span>
                                {activity.status === "pending" ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                                  >
                                    Pending
                                  </Badge>
                                ) : activity.status === "verified" ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/20 text-green-500 border-green-500/30"
                                  >
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30">
                                    Rejected
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center">
                                <Award className="h-4 w-4 mr-1" />
                                {activity.pointsEarned} points
                              </div>
                              {activity.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  Location verified
                                </div>
                              )}
                              {activity.duration && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {activity.duration} minutes
                                </div>
                              )}
                            </div>

                            {activity.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-2"
                                onClick={() => onVerifyActivity(activity.id)}
                              >
                                <Camera className="h-4 w-4 mr-2" />
                                Verify Now
                              </Button>
                            )}

                            {activity.status === "rejected" && activity.rejectionReason && (
                              <div className="mt-2 text-sm text-red-500">Reason: {activity.rejectionReason}</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Activities Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      You haven't participated in any activities for this protocol yet. Start an activity to earn
                      rewards!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rewards History</CardTitle>
                <CardDescription>Track your earnings and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Points Earned</h3>
                      <p className="text-2xl font-bold">{userProgress?.totalPointsEarned || 0}</p>
                    </div>
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Total Rewards Earned</h3>
                      <p className="text-2xl font-bold">{userProgress?.rewardsEarned || 0}</p>
                    </div>
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Rewards Claimed</h3>
                      <p className="text-2xl font-bold">{userProgress?.rewardsClaimed || 0}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Activity Stats</h3>
                    <div className="space-y-2">
                      {protocol.requirements.map((req) => {
                        const count = userProgress?.completedRequirements[req.id] || 0
                        return (
                          <div
                            key={req.id}
                            className="flex items-center justify-between p-3 bg-secondary/10 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              {getRequirementIcon(req.type)}
                              <span>{req.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{count} completed</span>
                              <Badge variant="outline">{count * req.pointsValue} points</Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {protocol.rewardDistribution === "tiered" && protocol.tiers && protocol.tiers.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Tier Progress</h3>
                      <div className="space-y-2">
                        {protocol.tiers.map((tier, index) => {
                          const isUnlocked = userProgress?.totalPointsEarned
                            ? userProgress.totalPointsEarned >= tier.threshold
                            : false

                          return (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-3 rounded-md ${
                                isUnlocked ? "bg-primary/10 border border-primary/30" : "bg-secondary/10"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {isUnlocked ? (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span>{tier.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{tier.threshold} points required</span>
                                <Badge variant={isUnlocked ? "default" : "outline"}>{tier.reward} rewards</Badge>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Performance Over Time</h3>
                      <Badge variant="outline">Last 30 days</Badge>
                    </div>
                    <div className="h-48 flex items-center justify-center bg-secondary/10 rounded-md">
                      <BarChart3 className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      Activity chart would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
