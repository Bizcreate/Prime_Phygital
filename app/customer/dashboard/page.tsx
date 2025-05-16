"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, QrCode, History, Award, Bell, ArrowUpRight, Wallet, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function CustomerDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search initiated",
      description: "Searching for products...",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Digital Collection</h2>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="hidden md:flex">
            <Input placeholder="Search products..." className="w-[200px] lg:w-[300px]" />
          </form>
          <Link href="/customer/scan">
            <Button>
              <QrCode className="mr-2 h-4 w-4" />
              Scan Product
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collection">My Collection</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
              <CardFooter>
                <Link href="/customer/collection" className="text-xs text-blue-500 flex items-center">
                  View collection
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 completing soon</p>
              </CardContent>
              <CardFooter>
                <Link href="/customer/wear-to-earn" className="text-xs text-blue-500 flex items-center">
                  View challenges
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rewards Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,450</div>
                <p className="text-xs text-muted-foreground">+350 from activities</p>
              </CardContent>
              <CardFooter>
                <Link href="/customer/rewards" className="text-xs text-blue-500 flex items-center">
                  View rewards
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">2 unread messages</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-xs text-blue-500 flex items-center p-0 h-auto"
                  onClick={() => {
                    toast({
                      title: "Viewing notifications",
                      description: "Navigating to notifications page",
                    })
                  }}
                >
                  View notifications
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>My Digital Products</CardTitle>
                <CardDescription>Your authenticated products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Neon Streak Sneakers",
                      brand: "Urban Athletics",
                      date: "Authenticated 2 weeks ago",
                      image: "/neon-streak-sneakers.png",
                    },
                    {
                      name: "Designer Hoodie",
                      brand: "Streetwear Co.",
                      date: "Authenticated 1 month ago",
                      image: "/stylish-urban-jacket.png",
                    },
                    {
                      name: "Limited Edition Watch",
                      brand: "Timepiece Masters",
                      date: "Authenticated 2 months ago",
                      image: "/elegant-timepiece.png",
                    },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center space-x-4 border-b pb-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <p className="text-xs text-muted-foreground">{product.date}</p>
                      </div>
                      <Link href={`/customer/product/${i}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/customer/collection">
                  <Button variant="outline">View All Products</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
                <CardDescription>Earn rewards by wearing your products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      name: "Summer Sneaker Challenge",
                      progress: 65,
                      reward: "10,000 points",
                      daysLeft: 12,
                    },
                    {
                      name: "Hoodie Rewards Program",
                      progress: 30,
                      reward: "5,000 points",
                      daysLeft: 45,
                    },
                    {
                      name: "T-Shirt Loyalty Program",
                      progress: 15,
                      reward: "3,000 points",
                      daysLeft: 180,
                    },
                  ].map((challenge, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{challenge.name}</span>
                        <span className="text-sm">{challenge.progress}%</span>
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
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/customer/wear-to-earn">
                  <Button>View All Challenges</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Product Collection</CardTitle>
              <CardDescription>All your authenticated products in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Neon Streak Sneakers",
                    brand: "Urban Athletics",
                    date: "Authenticated 2 weeks ago",
                    image: "/neon-streak-sneakers.png",
                    challenges: 2,
                  },
                  {
                    name: "Designer Hoodie",
                    brand: "Streetwear Co.",
                    date: "Authenticated 1 month ago",
                    image: "/stylish-urban-jacket.png",
                    challenges: 1,
                  },
                  {
                    name: "Limited Edition Watch",
                    brand: "Timepiece Masters",
                    date: "Authenticated 2 months ago",
                    image: "/elegant-timepiece.png",
                    challenges: 0,
                  },
                  {
                    name: "Premium Headphones",
                    brand: "Audio Masters",
                    date: "Authenticated 3 months ago",
                    image: "/modern-commute-audio.png",
                    challenges: 0,
                  },
                  {
                    name: "Designer Tote Bag",
                    brand: "Luxury Accessories",
                    date: "Authenticated 4 months ago",
                    image: "/elegant-leather-tote.png",
                    challenges: 0,
                  },
                ].map((product, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        {product.challenges > 0 && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            {product.challenges} active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <p className="text-xs text-muted-foreground mt-1">{product.date}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <History className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Track your product usage and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "wear",
                    product: "Neon Streak Sneakers",
                    date: "Today, 2:30 PM",
                    points: 150,
                    duration: "4 hours",
                  },
                  {
                    type: "authentication",
                    product: "Designer Cap",
                    date: "Yesterday, 10:15 AM",
                    points: 500,
                    duration: null,
                  },
                  {
                    type: "wear",
                    product: "Designer Hoodie",
                    date: "May 15, 2025",
                    points: 120,
                    duration: "3 hours",
                  },
                  {
                    type: "reward",
                    product: "Summer Sneaker Challenge",
                    date: "May 14, 2025",
                    points: 1000,
                    duration: null,
                  },
                  {
                    type: "wear",
                    product: "Neon Streak Sneakers",
                    date: "May 13, 2025",
                    points: 150,
                    duration: "4 hours",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center space-x-4 border-b pb-4">
                    <div
                      className={`rounded-full p-2 ${
                        activity.type === "wear"
                          ? "bg-green-100"
                          : activity.type === "authentication"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                      }`}
                    >
                      {activity.type === "wear" ? (
                        <ShoppingBag
                          className={`h-5 w-5 ${
                            activity.type === "wear"
                              ? "text-green-600"
                              : activity.type === "authentication"
                                ? "text-blue-600"
                                : "text-purple-600"
                          }`}
                        />
                      ) : activity.type === "authentication" ? (
                        <QrCode className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Award className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">
                          {activity.type === "wear"
                            ? "Wore Product"
                            : activity.type === "authentication"
                              ? "Authenticated Product"
                              : "Challenge Reward"}
                        </h4>
                        <span className="text-sm font-medium text-green-600">+{activity.points} pts</span>
                      </div>
                      <p className="text-sm">{activity.product}</p>
                      <div className="flex justify-between">
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                        {activity.duration && (
                          <p className="text-xs text-muted-foreground">Duration: {activity.duration}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Activities</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Rewards</CardTitle>
              <CardDescription>Track and redeem your earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-white/80">Total Balance</p>
                        <h3 className="text-3xl font-bold mt-1">2,450</h3>
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
                      >
                        Redeem
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        Transfer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium mb-2">Available Rewards</h4>
                {[
                  {
                    name: "15% Off Next Purchase",
                    points: 1000,
                    brand: "Urban Athletics",
                    expires: "June 30, 2025",
                  },
                  {
                    name: "Exclusive Access to New Collection",
                    points: 2500,
                    brand: "Streetwear Co.",
                    expires: "July 15, 2025",
                  },
                  {
                    name: "Limited Edition NFT",
                    points: 5000,
                    brand: "Digital Collectibles",
                    expires: "No expiration",
                  },
                  {
                    name: "Free Shipping Voucher",
                    points: 500,
                    brand: "Multiple Brands",
                    expires: "December 31, 2025",
                  },
                ].map((reward, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{reward.name}</h3>
                          <p className="text-sm text-muted-foreground">{reward.brand}</p>
                          <p className="text-xs text-muted-foreground mt-1">Expires: {reward.expires}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-purple-600">{reward.points} pts</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full" disabled={reward.points > 2450}>
                        {reward.points > 2450 ? "Not Enough Points" : "Redeem Reward"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
