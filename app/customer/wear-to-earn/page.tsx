"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Filter,
  Trophy,
  Clock,
  Users,
  Award,
  MoreVertical,
  ChevronRight,
  MapPin,
  Shield,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export default function WearToEarn() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}"`,
    })
  }

  const protocols = [
    {
      id: 1,
      name: "Summer Sneaker Challenge",
      description: "Wear your limited edition sneakers and earn rewards all summer long!",
      status: "Active",
      products: 1,
      participants: 328,
      rewards: 10000,
      dateRange: "01/06/2023 - 01/10/2023",
      progress: 65,
      image: "/neon-streak-sneakers.png",
      brand: "Urban Athletics",
      geoEnabled: true,
    },
    {
      id: 2,
      name: "Hoodie Rewards Program",
      description: "Earn rewards by wearing your designer hoodie",
      status: "Active",
      products: 1,
      participants: 156,
      rewards: 5000,
      dateRange: "15/08/2023 (Ongoing)",
      progress: 30,
      image: "/stylish-urban-jacket.png",
      brand: "Streetwear Co.",
      geoEnabled: true,
    },
    {
      id: 3,
      name: "T-Shirt Loyalty Program",
      description: "Wear your premium t-shirt and earn exclusive rewards",
      status: "Active",
      products: 1,
      participants: 89,
      rewards: 3000,
      dateRange: "01/07/2023 - 01/01/2024",
      progress: 15,
      image: "/products/tshirt.png",
      brand: "Fashion Forward",
      geoEnabled: false,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wear-to-Earn</h2>
          <p className="text-muted-foreground">Earn rewards for wearing your authenticated products</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Geo-Tracking Feature Highlight */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">New: Geo-Verified Tracking</CardTitle>
              <CardDescription>Earn up to 50% bonus points with location-verified activity tracking</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>NFC Product Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>GPS Location Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-500" />
              <span>Anti-Fraud Protection</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="secondary">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {protocols.map((protocol) => (
              <Card key={protocol.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="relative h-48 w-full md:w-48 md:h-auto">
                    <Image
                      src={protocol.image || "/placeholder.svg"}
                      alt={protocol.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            {protocol.status}
                          </Badge>
                          {protocol.geoEnabled && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <MapPin className="h-3 w-3 mr-1" />
                              Geo-Enabled
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold">{protocol.name}</h3>
                        <p className="text-sm text-muted-foreground">{protocol.brand}</p>
                        <p className="mt-2">{protocol.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Share Challenge</DropdownMenuItem>
                          <DropdownMenuItem>Leave Challenge</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

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
                          <Clock className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm font-medium">
                            {protocol.id === 1 ? "12 days" : protocol.id === 2 ? "Ongoing" : "180 days"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Remaining</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        Track Activity
                      </Button>
                      <Link
                        href={`/customer/wear-to-earn/${protocol.id}`}
                        className="flex items-center text-sm text-blue-500"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Completed Challenges Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Keep participating in your active challenges to earn rewards and see them here once completed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Challenges</CardTitle>
              <CardDescription>Discover new ways to earn rewards with your products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Winter Collection Challenge",
                    brand: "Seasonal Styles",
                    description: "Participate in our upcoming winter collection challenge",
                    rewards: 15000,
                    duration: "3 months",
                    startDate: "November 1, 2025",
                    geoEnabled: true,
                  },
                  {
                    name: "Luxury Accessories Program",
                    brand: "Luxury Accessories",
                    description: "Exclusive rewards for luxury accessory owners",
                    rewards: 8000,
                    duration: "6 months",
                    startDate: "August 15, 2025",
                    geoEnabled: false,
                  },
                ].map((challenge, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {challenge.geoEnabled && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <MapPin className="h-3 w-3 mr-1" />
                                Geo-Enabled
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold">{challenge.name}</h3>
                          <p className="text-sm text-muted-foreground">{challenge.brand}</p>
                          <p className="mt-2 text-sm">{challenge.description}</p>

                          <div className="mt-4 flex space-x-4 text-sm">
                            <div className="flex items-center">
                              <Award className="h-4 w-4 mr-1 text-purple-500" />
                              <span>{challenge.rewards.toLocaleString()} points</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{challenge.duration}</span>
                            </div>
                          </div>

                          <p className="mt-4 text-xs text-muted-foreground">Starts on {challenge.startDate}</p>
                        </div>
                        <Button>Join Challenge</Button>
                      </div>
                    </CardContent>
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
