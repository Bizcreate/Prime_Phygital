import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { NavbarWrapper, HeroSectionWrapper } from "@/components/home-client-components"

// Import static components normally
import { Features } from "@/components/features"
import { ChainSupport } from "@/components/chain-support"
import { UseCases } from "@/components/use-cases"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="h-16 border-b border-white/10"></div>}>
        <NavbarWrapper />
      </Suspense>

      <main className="flex-1">
        <Suspense fallback={<div className="h-[600px] flex items-center justify-center">Loading hero section...</div>}>
          <HeroSectionWrapper />
        </Suspense>

        <div className="container py-8 text-center">
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90">
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
