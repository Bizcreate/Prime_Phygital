"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Smartphone, QrCode, Shield, RefreshCw, Zap } from "lucide-react"

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("consumer")

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="container py-12">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Interactive Demo Experience</h1>
          <p className="text-white/70">
            Explore how Prime Phygital works from both consumer and brand perspectives. Select a view below to get
            started.
          </p>
        </div>

        <Tabs defaultValue="consumer" value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-8">
            <TabsTrigger value="consumer">Consumer Experience</TabsTrigger>
            <TabsTrigger value="brand">Brand Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="consumer" className="m-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Scan & Authenticate</h2>
                <p className="text-white/70 mb-6">
                  Experience how consumers interact with phygital products. Simply tap an NFC-enabled product with your
                  smartphone to verify authenticity and unlock digital experiences.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">
                      <Smartphone className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Tap to Authenticate</h3>
                      <p className="text-sm text-white/70">
                        Hold your phone near the NFC tag to instantly verify product authenticity
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">
                      <Shield className="h-5 w-5 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">View Digital Passport</h3>
                      <p className="text-sm text-white/70">Access the complete history and details of your product</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">
                      <Zap className="h-5 w-5 text-neon-yellow" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Unlock Experiences</h3>
                      <p className="text-sm text-white/70">
                        Engage with exclusive content and earn rewards for product usage
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                    onClick={() => window.open("/demo/consumer", "_blank")}
                  >
                    Try Consumer Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="glass-panel neon-border rounded-lg overflow-hidden">
                <div className="relative aspect-[9/16] md:aspect-[3/4]">
                  <Image src="/sneaker-nfc-scan.png" alt="Consumer scanning product" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-white/10 p-2">
                      <QrCode className="h-5 w-5 text-neon-blue" />
                    </div>
                    <CardTitle className="text-lg">Scan & Verify</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">
                    Instantly verify product authenticity with a simple tap of your smartphone
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-white/10 p-2">
                      <RefreshCw className="h-5 w-5 text-neon-green" />
                    </div>
                    <CardTitle className="text-lg">Digital History</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">Access complete product history and ownership information</p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-white/10 p-2">
                      <Zap className="h-5 w-5 text-neon-yellow" />
                    </div>
                    <CardTitle className="text-lg">Earn Rewards</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">
                    Participate in wear-to-earn programs and unlock exclusive content
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="brand" className="m-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Brand Management Dashboard</h2>
                <p className="text-white/70 mb-6">
                  Explore how brands can create, manage, and analyze their phygital products. The dashboard provides
                  complete control over your digital product passports.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">
                      <QrCode className="h-5 w-5 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Create Digital Passports</h3>
                      <p className="text-sm text-white/70">
                        Generate unique digital identities for your physical products
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">
                      <Smartphone className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">NFC Tag Management</h3>
                      <p className="text-sm text-white/70">
                        Configure and encode NFC tags for seamless physical-digital connection
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">
                      <RefreshCw className="h-5 w-5 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Analytics & Insights</h3>
                      <p className="text-sm text-white/70">
                        Track engagement, scan locations, and customer interactions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                    onClick={() => window.open("/dashboard", "_blank")}
                  >
                    Try Brand Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="glass-panel neon-border rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image src="/product-nfc-dashboard.png" alt="Brand dashboard" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="mt-16">
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <CardTitle>Ready to transform your products?</CardTitle>
                  <CardDescription>
                    Get started with Prime Phygital today and connect your physical products to the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6">
                    Our platform provides everything you need to create authentic digital experiences that engage
                    customers and build brand loyalty. Schedule a personalized demo with our team to learn more.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/10">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <div className="mt-12 text-center">
            <div className="glass-panel border-white/10 p-6 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Ready to explore the full dashboard?</h3>
              <p className="text-white/70 mb-6">
                Get hands-on with our interactive dashboard demo and experience the complete platform.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-green to-neon-blue hover:opacity-90 animate-pulse"
                onClick={() => window.open("/dashboard", "_blank")}
              >
                <span className="mr-2">🔥</span> Access Dashboard Demo <span className="ml-2">🔥</span>
              </Button>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
