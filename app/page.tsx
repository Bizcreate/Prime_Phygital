import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { Navbar } from "@/components/navbar"
import { ChainSupport } from "@/components/chain-support"
import { UseCases } from "@/components/use-cases"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="container py-8 text-center">
          <Button size="lg" className="bg-gradient-to-r from-neon-green to-neon-blue hover:opacity-90 animate-pulse">
            <Link href="/dashboard" className="flex items-center">
              <span className="mr-2">🔥</span> Access Dashboard Demo <span className="ml-2">🔥</span>
            </Link>
          </Button>
        </div>
        <Features />
        <ChainSupport />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
