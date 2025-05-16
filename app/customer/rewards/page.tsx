"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function Rewards() {
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
                <h3 className="text-3xl font-bold mt-1">2,450</h3>
                <p className="text-sm mt-1">Prime Reward Points</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                <Image src="/prime-token-logo.png" alt="Prime Token" width={40} height={40} />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                Redeem
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "15% Off Next Purchase",
                points: 1000,
                brand: "Urban Athletics",
                expires: "June 30, 2025",
                description: "Get 15% off your next purchase at any Urban Athletics store or online",
              },
              {
                name: "Exclusive Access to New Collection",
                points: 2500,
                brand: "Streetwear Co.",
                expires: "July 15, 2025",
                description: "Early access to the upcoming summer collection before public release",
              },
              {
                name: "Limited Edition NFT",
                points: 5000,
                brand: "Digital Collectibles",
                expires: "No expiration",
                description: "Exclusive digital collectible only available to Prime Phygital members",
              },
              {
                name: "Free Shipping Voucher",
                points: 500,
                brand: "Multiple Brands",
                expires: "December 31, 2025",
                description: "Free shipping on your next order with any participating brand",
              },
              {
                name: "VIP Event Access",
                points: 3000,
                brand: "Streetwear Co.",
                expires: "August 30, 2025",
                description: "Exclusive invitation to the brand's summer launch party",
              },
              {
                name: "Product Customization",
                points: 4000,
                brand: "Urban Athletics",
                expires: "September 15, 2025",
                description: "Customize your next sneaker purchase with exclusive designs",
              },
            ].map((reward, i) => (
              <Card key={i} className="overflow-hidden">
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
                  <Button className="w-full mt-4" variant="outline" disabled={reward.points > 2450}>
                    {reward.points > 2450 ? "Not Enough Points" : "Redeem Reward"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redeemed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redeemed Rewards</CardTitle>
              <CardDescription>Rewards you've already claimed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "10% Off Coupon",
                    points: 800,
                    brand: "Urban Athletics",
                    redeemedDate: "April 10, 2025",
                    expiresDate: "July 10, 2025",
                    code: "PRIME10OFF",
                  },
                  {
                    name: "Digital Badge",
                    points: 500,
                    brand: "Prime Phygital",
                    redeemedDate: "March 15, 2025",
                    expiresDate: "No expiration",
                    code: "Added to your profile",
                  },
                ].map((reward, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{reward.name}</h3>
                          <p className="text-sm text-muted-foreground">{reward.brand}</p>
                          <p className="text-xs text-muted-foreground mt-1">Redeemed: {reward.redeemedDate}</p>
                          <p className="text-xs text-muted-foreground">Expires: {reward.expiresDate}</p>
                        </div>
                        <Badge>{reward.points} pts</Badge>
                      </div>
                      <div className="mt-2 p-2 bg-muted rounded text-center">
                        <p className="font-mono text-sm">{reward.code}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
              <CardDescription>Track your points earned and spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "earned",
                    amount: 150,
                    source: "Wore Neon Streak Sneakers",
                    date: "May 16, 2025",
                  },
                  {
                    type: "spent",
                    amount: 800,
                    source: "Redeemed 10% Off Coupon",
                    date: "April 10, 2025",
                  },
                  {
                    type: "earned",
                    amount: 500,
                    source: "Authenticated New Product",
                    date: "April 5, 2025",
                  },
                  {
                    type: "earned",
                    amount: 1000,
                    source: "Completed Summer Challenge",
                    date: "March 30, 2025",
                  },
                  {
                    type: "spent",
                    amount: 500,
                    source: "Redeemed Digital Badge",
                    date: "March 15, 2025",
                  },
                ].map((transaction, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{transaction.source}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
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
