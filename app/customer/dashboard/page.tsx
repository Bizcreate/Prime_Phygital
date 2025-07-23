"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Award, Eye, Coins, Wallet, PiggyBank, Target } from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/customer/scan">Scan Product</Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Owned</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">+180 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staked Tokens</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500</div>
            <p className="text-xs text-muted-foreground">PRIME tokens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Challenges</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active challenges</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>Your latest authenticated products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Neon Streak Sneakers",
                    brand: "Urban Athletics",
                    status: "Active",
                    image: "/placeholder.svg?height=60&width=60",
                    authenticated: "2 weeks ago",
                  },
                  {
                    name: "Designer Hoodie",
                    brand: "Streetwear Co.",
                    status: "Active",
                    image: "/placeholder.svg?height=60&width=60",
                    authenticated: "1 month ago",
                  },
                  {
                    name: "Limited Edition Watch",
                    brand: "Timepiece Masters",
                    status: "Active",
                    image: "/placeholder.svg?height=60&width=60",
                    authenticated: "2 months ago",
                  },
                ].map((product, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {product.status}
                      </Badge>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/customer/product/${i + 1}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 space-y-4">
          {/* Staking Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Token Staking
              </CardTitle>
              <CardDescription>Earn rewards by staking PRIME tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Staked</span>
                <span className="font-medium">500 PRIME</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Earned Rewards</span>
                <span className="font-medium text-green-600">12.5 PRIME</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">APY</span>
                <span className="font-medium">12%</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/customer/staking">
                  <Coins className="h-4 w-4 mr-2" />
                  Manage Staking
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Rewards Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Rewards Summary
              </CardTitle>
              <CardDescription>Your points and available rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Points</span>
                <span className="font-medium">2,450 pts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Rewards</span>
                <span className="font-medium">8 rewards</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Next Reward</span>
                <span className="font-medium">550 pts away</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/customer/rewards">
                  <Wallet className="h-4 w-4 mr-2" />
                  View Rewards
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Active Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
              <CardDescription>Complete challenges to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Summer Sneaker Challenge",
                    progress: 65,
                    reward: "10,000 points",
                    daysLeft: 12,
                    geoEnabled: true,
                  },
                  {
                    name: "Hoodie Rewards Program",
                    progress: 30,
                    reward: "5,000 points",
                    daysLeft: 45,
                    geoEnabled: true,
                  },
                  {
                    name: "T-Shirt Loyalty Program",
                    progress: 15,
                    reward: "3,000 points",
                    daysLeft: 180,
                    geoEnabled: false,
                  },
                ].map((challenge, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{challenge.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{challenge.progress}%</span>
                        {challenge.geoEnabled && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            Geo-Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Reward: {challenge.reward}</span>
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/customer/wear-to-earn">View All Challenges</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
