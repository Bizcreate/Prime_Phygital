"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Award,
  Calendar,
  Users,
  Share2,
  CheckCircle2,
  BarChart3,
  Smartphone,
  ShoppingBag,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

const protocols = [
  {
    id: 1,
    name: "Summer Sneaker Challenge",
    description:
      "Wear your limited edition sneakers and earn rewards all summer long! Track your daily wear time and earn points for each hour of activity.",
    status: "Active",
    products: 1,
    participants: 328,
    rewards: 10000,
    dateRange: "01/06/2023 - 01/10/2023",
    progress: 65,
    image: "/neon-streak-sneakers.png",
    brand: "Urban Athletics",
    rules: [
      "Wear your authenticated sneakers for at least 2 hours per day",
      "Points are awarded based on duration of wear",
      "Bonus points for outdoor activities",
      "Maximum 8 hours of tracking per day",
      "Weekly leaderboard rewards for top participants",
    ],
    milestones: [
      { name: "Bronze Level", points: 2500, completed: true },
      { name: "Silver Level", points: 5000, completed: true },
      { name: "Gold Level", points: 7500, completed: false },
      { name: "Platinum Level", points: 10000, completed: false },
    ],
    activities: [
      { date: "May 16, 2025", duration: "4 hours", points: 150, status: "Verified" },
      { date: "May 15, 2025", duration: "3 hours", points: 120, status: "Verified" },
      { date: "May 14, 2025", duration: "5 hours", points: 200, status: "Verified" },
      { date: "May 13, 2025", duration: "2 hours", points: 80, status: "Verified" },
      { date: "May 12, 2025", duration: "6 hours", points: 240, status: "Verified" },
    ],
    leaderboard: [
      { rank: 1, name: "Alex S.", points: 8750 },
      { rank: 2, name: "Jamie T.", points: 8320 },
      { rank: 3, name: "Morgan L.", points: 7950 },
      { rank: 4, name: "You", points: 6500 },
      { rank: 5, name: "Taylor R.", points: 6200 },
    ],
  },
  {
    id: 2,
    name: "Hoodie Rewards Program",
    description: "Earn rewards by wearing your designer hoodie. Perfect for casual outings and everyday wear.",
    status: "Active",
    products: 1,
    participants: 156,
    rewards: 5000,
    dateRange: "15/08/2023 (Ongoing)",
    progress: 30,
    image: "/stylish-urban-jacket.png",
    brand: "Streetwear Co.",
    rules: [
      "Wear your authenticated hoodie for at least 1 hour per day",
      "Points are awarded based on duration of wear",
      "Bonus points for social media shares",
      "Maximum 10 hours of tracking per day",
      "Monthly rewards for consistent participation",
    ],
    milestones: [
      { name: "Starter Level", points: 1000, completed: true },
      { name: "Enthusiast Level", points: 2500, completed: false },
      { name: "Collector Level", points: 4000, completed: false },
      { name: "Elite Level", points: 5000, completed: false },
    ],
    activities: [
      { date: "May 16, 2025", duration: "2 hours", points: 80, status: "Verified" },
      { date: "May 14, 2025", duration: "3 hours", points: 120, status: "Verified" },
      { date: "May 12, 2025", duration: "1 hour", points: 40, status: "Verified" },
      { date: "May 10, 2025", duration: "4 hours", points: 160, status: "Verified" },
      { date: "May 8, 2025", duration: "2 hours", points: 80, status: "Verified" },
    ],
    leaderboard: [
      { rank: 1, name: "Jordan K.", points: 3200 },
      { rank: 2, name: "Casey P.", points: 2950 },
      { rank: 3, name: "Riley M.", points: 2780 },
      { rank: 4, name: "Quinn B.", points: 2600 },
      { rank: 5, name: "You", points: 1500 },
    ],
  },
  {
    id: 3,
    name: "T-Shirt Loyalty Program",
    description: "Wear your premium t-shirt and earn exclusive rewards. Great for casual everyday wear.",
    status: "Active",
    products: 1,
    participants: 89,
    rewards: 3000,
    dateRange: "01/07/2023 - 01/01/2024",
    progress: 15,
    image: "/products/tshirt.png",
    brand: "Fashion Forward",
    rules: [
      "Wear your authenticated t-shirt for at least 1 hour per day",
      "Points are awarded based on duration of wear",
      "Bonus points for attending brand events",
      "Maximum 8 hours of tracking per day",
      "Special rewards for weekend participation",
    ],
    milestones: [
      { name: "Beginner Level", points: 500, completed: true },
      { name: "Casual Level", points: 1000, completed: false },
      { name: "Regular Level", points: 2000, completed: false },
      { name: "Dedicated Level", points: 3000, completed: false },
    ],
    activities: [
      { date: "May 15, 2025", duration: "2 hours", points: 80, status: "Verified" },
      { date: "May 12, 2025", duration: "1 hour", points: 40, status: "Verified" },
      { date: "May 9, 2025", duration: "3 hours", points: 120, status: "Verified" },
      { date: "May 6, 2025", duration: "2 hours", points: 80, status: "Verified" },
      { date: "May 3, 2025", duration: "1 hour", points: 40, status: "Verified" },
    ],
    leaderboard: [
      { rank: 1, name: "Sam J.", points: 1250 },
      { rank: 2, name: "Avery T.", points: 1120 },
      { rank: 3, name: "You", points: 450 },
      { rank: 4, name: "Drew P.", points: 420 },
      { rank: 5, name: "Cameron S.", points: 380 },
    ],
  },
]

export default function ProtocolDetails() {
  const { toast } = useToast()
  const params = useParams()
  const id = Number(params.id)

  // Find the protocol based on the ID from the URL
  const protocol = protocols.find((p) => p.id === id) || protocols[0]

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Challenge link has been copied to clipboard",
    })
  }

  const handleTrackActivity = () => {
    toast({
      title: "Activity tracking started",
      description: "Your wear time is now being tracked",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/customer/wear-to-earn">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">{protocol.name}</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 ml-2">
          {protocol.status}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <div className="md:flex">
              <div className="relative h-48 w-full md:w-48 md:h-auto">
                <Image src={protocol.image || "/placeholder.svg"} alt={protocol.name} fill className="object-cover" />
              </div>
              <div className="flex-1 p-6">
                <h3 className="text-xl font-bold">{protocol.name}</h3>
                <p className="text-sm text-muted-foreground">{protocol.brand}</p>
                <p className="mt-2">{protocol.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{protocol.progress}%</span>
                  </div>
                  <Progress value={protocol.progress} className="h-2" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center">
                      <Award className="h-4 w-4 mr-1 text-purple-500" />
                      <span className="text-sm font-medium">{protocol.rewards.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rewards</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="text-sm font-medium">{protocol.participants}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Participants</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-sm font-medium">
                        {protocol.id === 1 ? "12 days" : protocol.id === 2 ? "Ongoing" : "180 days"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button onClick={handleTrackActivity}>Track Activity</Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="activities" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your tracked wear time and earned points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {protocol.activities.map((activity, i) => (
                      <div key={i} className="flex items-center space-x-4 border-b pb-4">
                        <div className="rounded-full p-2 bg-green-100">
                          <ShoppingBag className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Wore Product</h4>
                            <span className="text-sm font-medium text-green-600">+{activity.points} pts</span>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                            <p className="text-xs text-muted-foreground">Duration: {activity.duration}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View All Activities</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Rules</CardTitle>
                  <CardDescription>How to participate and earn rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {protocol.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <h4 className="font-medium mb-3">How to Track Activity</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                          <h5 className="font-medium">Mobile App</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            Use our mobile app to automatically track your wear time
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                          <h5 className="font-medium">NFC Tag</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            Scan the NFC tag in your product to start/stop tracking
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                          <h5 className="font-medium">Manual Entry</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            Manually log your wear time through the dashboard
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>See how you rank against other participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {protocol.leaderboard.map((entry, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.name === "You" ? "bg-blue-50 border border-blue-100" : "border-b"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              entry.rank === 1
                                ? "bg-yellow-100 text-yellow-700"
                                : entry.rank === 2
                                  ? "bg-gray-200 text-gray-700"
                                  : entry.rank === 3
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {entry.rank}
                          </div>
                          <span className={entry.name === "You" ? "font-medium" : ""}>{entry.name}</span>
                        </div>
                        <div className="font-medium">{entry.points.toLocaleString()} pts</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
              <CardDescription>Track your progress through challenge levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {protocol.milestones.map((milestone, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            milestone.completed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          {milestone.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <span className="text-xs text-gray-600">{i + 1}</span>
                          )}
                        </div>
                        <span className="font-medium">{milestone.name}</span>
                      </div>
                      <span className={`text-sm ${milestone.completed ? "text-green-600" : ""}`}>
                        {milestone.points.toLocaleString()} pts
                      </span>
                    </div>
                    {i < protocol.milestones.length - 1 && (
                      <div className="ml-3 pl-3 border-l-2 h-6 border-dashed border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rewards</CardTitle>
              <CardDescription>What you can earn in this challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Exclusive Digital Badge",
                    points: protocol.id === 1 ? 2500 : protocol.id === 2 ? 1000 : 500,
                    description: "Show off your participation with a digital collectible",
                    unlocked: true,
                  },
                  {
                    name:
                      protocol.id === 1
                        ? "Limited Edition NFT"
                        : protocol.id === 2
                          ? "Early Access to New Collection"
                          : "Brand Merchandise",
                    points: protocol.id === 1 ? 5000 : protocol.id === 2 ? 2500 : 1000,
                    description:
                      protocol.id === 1
                        ? "Exclusive digital collectible for challenge participants"
                        : protocol.id === 2
                          ? "Get early access to upcoming product releases"
                          : "Exclusive brand merchandise for participants",
                    unlocked: protocol.id === 1 ? true : false,
                  },
                  {
                    name:
                      protocol.id === 1
                        ? "Discount Voucher"
                        : protocol.id === 2
                          ? "VIP Event Access"
                          : "Discount Coupon",
                    points: protocol.id === 1 ? 7500 : protocol.id === 2 ? 4000 : 2000,
                    description:
                      protocol.id === 1
                        ? "15% off your next purchase"
                        : protocol.id === 2
                          ? "Access to exclusive brand events"
                          : "10% off your next purchase",
                    unlocked: false,
                  },
                  {
                    name:
                      protocol.id === 1
                        ? "Limited Edition Product"
                        : protocol.id === 2
                          ? "Custom Product Design"
                          : "Brand Ambassador Status",
                    points: protocol.id === 1 ? 10000 : protocol.id === 2 ? 5000 : 3000,
                    description:
                      protocol.id === 1
                        ? "Exclusive product only available to challenge completers"
                        : protocol.id === 2
                          ? "Opportunity to help design a future product"
                          : "Become an official brand ambassador",
                    unlocked: false,
                  },
                ].map((reward, i) => (
                  <Card key={i} className={reward.unlocked ? "border-green-200" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{reward.name}</h4>
                            {reward.unlocked && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Unlocked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                        </div>
                        <div className="text-sm font-medium">{reward.points.toLocaleString()} pts</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
