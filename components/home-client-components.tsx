"use client"

import dynamic from "next/dynamic"

// Import client components with dynamic imports
export const NavbarWrapper = dynamic(() => import("@/components/navbar-wrapper").then((mod) => mod.NavbarWrapper), {
  ssr: false,
})

export const HeroSectionWrapper = dynamic(
  () => import("@/components/hero-section-wrapper").then((mod) => mod.HeroSectionWrapper),
  {
    ssr: false,
  },
)
