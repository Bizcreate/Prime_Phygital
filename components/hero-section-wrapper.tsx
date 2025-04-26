"use client"

import dynamic from "next/dynamic"

// Dynamically import the HeroSection component with SSR disabled
const DynamicHeroSection = dynamic(() => import("./hero-section").then((mod) => ({ default: mod.HeroSection })), {
  ssr: false,
  loading: () => (
    <div className="py-20 md:py-32 flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-8 w-64 bg-white/10 rounded mb-4 mx-auto"></div>
        <div className="h-16 w-80 bg-white/20 rounded mb-6 mx-auto"></div>
        <div className="h-4 w-96 bg-white/10 rounded mb-2 mx-auto"></div>
        <div className="h-4 w-80 bg-white/10 rounded mb-8 mx-auto"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-10 w-32 bg-white/20 rounded"></div>
          <div className="h-10 w-32 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  ),
})

export function HeroSectionWrapper() {
  return <DynamicHeroSection />
}
