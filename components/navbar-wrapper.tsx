"use client"

import dynamic from "next/dynamic"

// Dynamically import the Navbar component with SSR disabled
const DynamicNavbar = dynamic(() => import("./navbar").then((mod) => ({ default: mod.Navbar })), {
  ssr: false,
  loading: () => (
    <header className="w-full border-b border-white/10 h-16">
      <div className="container flex h-16 items-center justify-between">
        <div className="h-8 w-40 bg-white/10 rounded"></div>
        <div className="hidden md:flex gap-4">
          <div className="h-10 w-32 bg-white/10 rounded"></div>
          <div className="h-10 w-24 bg-white/10 rounded"></div>
        </div>
      </div>
    </header>
  ),
})

export function NavbarWrapper() {
  return <DynamicNavbar />
}
