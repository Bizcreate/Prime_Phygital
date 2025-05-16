import Link from "next/link"
import { Zap, Shield, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChainSupport } from "@/components/chain-support"
import { Features } from "@/components/features"
import { UseCases } from "@/components/use-cases"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-20 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.3),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.25),transparent_40%)]"></div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto inline-flex items-center rounded-full bg-black/20 px-3 py-1 text-sm font-medium backdrop-blur-xl mb-6 border border-white/10">
              <Zap className="mr-1 h-3.5 w-3.5 text-purple-400" />
              <span>Revolutionizing Physical-Digital Product Experiences</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Products Into{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
              Prime Phygital connects physical products to the blockchain with NFC technology, enabling authentication,
              ownership tracking, and interactive experiences across multiple chains including Ethereum, Polygon, Base,
              and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-started">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                  Get Started
                </Button>
              </Link>
              <Link href="/customer/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-white/10 hover:bg-white/10"
                >
                  Customer Demo
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
                >
                  Dashboard Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Icons */}
        <section className="bg-black py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-black/50 p-4 backdrop-blur-sm border border-white/10">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Authentic Products</h3>
                <p className="text-gray-400">
                  Verify authenticity with blockchain-backed digital passports for your products
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-black/50 p-4 backdrop-blur-sm border border-white/10">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Multi-Chain Support</h3>
                <p className="text-gray-400">Deploy on ETH, Polygon, Base, Apechain, Sui, and more</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-black/50 p-4 backdrop-blur-sm border border-white/10">
                  <Layers className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Updatable Passports</h3>
                <p className="text-gray-400">Dynamic product data with theft protection and asset management</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chain Support */}
        <ChainSupport />

        {/* Features */}
        <Features />

        {/* Use Cases */}
        <UseCases />

        {/* CTA */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Products?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              Join the future of product authentication and customer engagement with Prime Phygital's comprehensive
              platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-started">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
