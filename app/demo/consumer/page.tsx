"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  History,
  Share2,
  ExternalLink,
  Smartphone,
  Zap,
  Gift,
  ChevronRight,
} from "lucide-react"

export default function ConsumerDemoPage() {
  const [scanStep, setScanStep] = useState(0)
  const [showAuthenticated, setShowAuthenticated] = useState(false)

  useEffect(() => {
    if (scanStep === 1) {
      const timer = setTimeout(() => {
        setShowAuthenticated(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [scanStep])

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/demo" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Demo</span>
        </Link>
      </header>

      <main className="container py-8 max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Consumer Experience Demo</h1>
          <p className="text-white/70">This simulates the experience when a consumer scans an NFC-enabled product</p>
        </div>

        {scanStep === 0 && (
          <Card className="glass-panel border-white/10 overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg?height=500&width=500&query=limited edition sneaker with nfc tag"
                alt="Product with NFC tag"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                  onClick={() => setScanStep(1)}
                >
                  <Smartphone className="mr-2 h-5 w-5" /> Tap to Scan Product
                </Button>
              </div>
            </div>
          </Card>
        )}

        {scanStep === 1 && (
          <div className="space-y-6">
            <Card className="glass-panel border-white/10 overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=500&width=500&query=limited edition sneaker with nfc tag"
                  alt="Product with NFC tag"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  {!showAuthenticated ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-t-neon-blue border-r-neon-blue border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-lg font-medium">Authenticating Product...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-10 w-10 text-neon-green" />
                      </div>
                      <p className="text-lg font-medium mb-2">Product Authenticated!</p>
                      <p className="text-white/70 mb-4">Limited Edition Sneakers #42</p>
                      <Button
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                        onClick={() => setScanStep(2)}
                      >
                        View Digital Passport <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {scanStep === 2 && (
          <div className="space-y-6">
            <div className="glass-panel neon-border rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=500&width=500&query=limited edition sneaker with nfc tag"
                  alt="Product with NFC tag"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Limited Edition Sneakers</h2>
                <p className="text-white/70">Edition #42 of 100</p>
              </div>
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">Authentic</Badge>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <Card className="glass-panel border-white/10">
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-white/70 mb-1">Product Description</p>
                      <p className="text-sm">
                        Exclusive limited edition sneakers with NFC authentication and digital collectible. Featuring
                        premium materials and unique design.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Brand</p>
                        <p className="text-sm">Prime Collectibles</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Release Date</p>
                        <p className="text-sm">April 15, 2024</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Serial Number</p>
                        <p className="text-sm">SN-2024-0042</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Blockchain</p>
                        <p className="text-sm">Ethereum</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <Shield className="h-4 w-4 text-neon-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Authenticity Verified</p>
                        <p className="text-xs text-white/70">This product has been verified as authentic</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full border-white/10">
                        <ExternalLink className="mr-2 h-4 w-4" /> View on Blockchain
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="glass-panel border-white/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/10 p-2">
                        <History className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-base">Product History</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="relative pl-6 pb-4">
                        <div className="absolute top-0 left-0 h-full w-px bg-white/10" />
                        <div className="absolute top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-blue" />
                        <div>
                          <p className="text-sm font-medium">April 22, 2024</p>
                          <p className="text-xs text-white/70">Product authenticated by you</p>
                        </div>
                      </div>

                      <div className="relative pl-6 pb-4">
                        <div className="absolute top-0 left-0 h-full w-px bg-white/10" />
                        <div className="absolute top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
                        <div>
                          <p className="text-sm font-medium">April 18, 2024</p>
                          <p className="text-xs text-white/70">Purchased from Official Store</p>
                        </div>
                      </div>

                      <div className="relative pl-6 pb-4">
                        <div className="absolute top-0 left-0 h-full w-px bg-white/10" />
                        <div className="absolute top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
                        <div>
                          <p className="text-sm font-medium">April 15, 2024</p>
                          <p className="text-xs text-white/70">Product released</p>
                        </div>
                      </div>

                      <div className="relative pl-6">
                        <div className="absolute top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
                        <div>
                          <p className="text-sm font-medium">April 10, 2024</p>
                          <p className="text-xs text-white/70">NFT minted on Ethereum</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="mt-4">
                <Card className="glass-panel border-white/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/10 p-2">
                        <Zap className="h-4 w-4 text-neon-yellow" />
                      </div>
                      <CardTitle className="text-base">Wear-to-Earn Rewards</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Product Usage</p>
                        <Badge variant="outline" className="border-neon-yellow/30 text-neon-yellow">
                          Level 1
                        </Badge>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 mb-2">
                        <div className="bg-gradient-to-r from-neon-yellow to-neon-green h-2.5 rounded-full w-[15%]"></div>
                      </div>
                      <p className="text-xs text-white/70">15/100 points to next level</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Available Rewards</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <div className="rounded-full bg-white/10 p-2">
                            <Gift className="h-4 w-4 text-neon-purple" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Exclusive Digital Collectible</p>
                            <p className="text-xs text-white/70">Unlock at Level 2</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/10" disabled>
                            Locked
                          </Button>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <div className="rounded-full bg-white/10 p-2">
                            <Gift className="h-4 w-4 text-neon-blue" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">10% Discount on Next Purchase</p>
                            <p className="text-xs text-white/70">Unlock at Level 3</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/10" disabled>
                            Locked
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                        <Share2 className="mr-2 h-4 w-4" /> Share to Earn Points
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-4">
              <Button variant="outline" className="border-white/10" onClick={() => setScanStep(0)}>
                Restart Demo
              </Button>
              <Button
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                onClick={() => window.open("/demo", "_self")}
              >
                Back to Demo Hub
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
