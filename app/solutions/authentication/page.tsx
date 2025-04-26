import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, CheckCircle, Smartphone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-neon-green/20 to-neon-blue/20 blur-[100px]" />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm mb-6">
                <Shield className="mr-1 h-3.5 w-3.5 text-neon-green" />
                Product Authentication Solution
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Verify Authenticity with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
                  Blockchain
                </span>
              </h1>

              <p className="text-lg text-white/70 sm:text-xl">
                Protect your brand and customers with tamper-proof authentication powered by NFC technology and
                blockchain verification.
              </p>
            </div>

            <div className="glass-panel neon-border overflow-hidden rounded-lg max-w-4xl mx-auto">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=600&width=1200&query=product authentication with smartphone and blockchain verification"
                  alt="Product Authentication"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-blue/10 to-neon-green/10 blur-[100px]" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How Product Authentication{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
                  Works
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Our end-to-end authentication solution provides tamper-proof verification for your products
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <Smartphone className="h-6 w-6 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Tap to Scan</h3>
                  <p className="text-white/70">
                    Consumers simply tap their smartphone on the NFC tag embedded in your product to initiate the
                    authentication process.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Verify on Blockchain</h3>
                  <p className="text-white/70">
                    The product's digital identity is verified against its blockchain record, ensuring tamper-proof
                    authentication.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <CheckCircle className="h-6 w-6 text-neon-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Confirm Authenticity</h3>
                  <p className="text-white/70">
                    Instant verification results show the product's authenticity status and complete digital passport.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Benefits of Blockchain{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
                    Authentication
                  </span>
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-neon-green/20 p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Eliminate Counterfeits</h3>
                      <p className="text-white/70">
                        Protect your brand and customers from fake products with tamper-proof authentication
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-neon-blue/20 p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Build Consumer Trust</h3>
                      <p className="text-white/70">
                        Increase customer confidence with transparent and verifiable product information
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-neon-purple/20 p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Protect Brand Value</h3>
                      <p className="text-white/70">
                        Safeguard your brand reputation and maintain product value in the marketplace
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-neon-yellow/20 p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-neon-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Gather Valuable Data</h3>
                      <p className="text-white/70">
                        Collect insights on product usage, authentication patterns, and customer engagement
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="bg-gradient-to-r from-neon-green to-neon-blue hover:opacity-90">
                    <Link href="/get-started" className="flex items-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="glass-panel neon-border overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=600&width=600&query=smartphone scanning authentic product with checkmark verification"
                    alt="Product Authentication Benefits"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-green/20 to-neon-blue/20 blur-[100px]" />

          <div className="container relative z-10">
            <div className="glass-panel neon-border rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Protect Your Products?</h2>
              <p className="mx-auto max-w-2xl text-white/70 mb-8">
                Join the brands that are already using Prime Phygital to authenticate their products and connect with
                customers.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-neon-green to-neon-blue hover:opacity-90">
                  <Link href="/get-started" className="flex items-center">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  <Link href="/demo">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
