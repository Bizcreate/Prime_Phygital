"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

// Add a check to prevent duplicate rendering
const NAVBAR_MOUNTED_KEY = "navbar-mounted"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if navbar is already mounted
    if (window[NAVBAR_MOUNTED_KEY as any]) {
      setMounted(false)
      return
    }

    // Mark navbar as mounted
    window[NAVBAR_MOUNTED_KEY as any] = true
    setMounted(true)

    return () => {
      // Clean up when component unmounts
      window[NAVBAR_MOUNTED_KEY as any] = false
    }
  }, [])

  // Don't render if already mounted elsewhere
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/prime-phygital-logo.png"
              alt="PrimePhygital Logo"
              width={150}
              height={30}
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="group text-white/70 hover:text-white">
                  Platform{" "}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-panel w-[220px]">
                <DropdownMenuItem asChild>
                  <Link href="/platform/token-creation" className="cursor-pointer">
                    Token Creation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/platform/nfc-encoding" className="cursor-pointer">
                    NFC Encoding
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/platform/nft-minting" className="cursor-pointer">
                    NFT Minting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/platform/asset-vault" className="cursor-pointer">
                    Asset Vault
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="group text-white/70 hover:text-white">
                  Solutions{" "}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-panel w-[220px]">
                <DropdownMenuItem asChild>
                  <Link href="/solutions/authentication" className="cursor-pointer">
                    Product Authentication
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/solutions/supply-chain" className="cursor-pointer">
                    Supply Chain Tracking
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/solutions/loyalty" className="cursor-pointer">
                    Loyalty Programs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/solutions/wear-to-earn" className="cursor-pointer">
                    Wear-to-Earn
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/pricing" className="text-white/70 hover:text-white">
              Pricing
            </Link>

            <Link href="/about" className="text-white/70 hover:text-white">
              About
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border-white/20 hover:bg-white/10"
            asChild
          >
            <Link href="/dashboard">Dashboard Demo</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="glass-panel border-r border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Image
                  src="/prime-phygital-logo.png"
                  alt="PrimePhygital Logo"
                  width={150}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="mt-8 flex flex-col gap-4">
              <div className="border-b border-white/10 pb-4">
                <p className="mb-2 text-xs uppercase tracking-wider text-white/50">Platform</p>
                <div className="grid gap-2">
                  <Link
                    href="/platform/token-creation"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Token Creation
                  </Link>
                  <Link
                    href="/platform/nfc-encoding"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    NFC Encoding
                  </Link>
                  <Link
                    href="/platform/nft-minting"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    NFT Minting
                  </Link>
                  <Link
                    href="/platform/asset-vault"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Asset Vault
                  </Link>
                </div>
              </div>

              <div className="border-b border-white/10 pb-4">
                <p className="mb-2 text-xs uppercase tracking-wider text-white/50">Solutions</p>
                <div className="grid gap-2">
                  <Link
                    href="/solutions/authentication"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Product Authentication
                  </Link>
                  <Link
                    href="/solutions/supply-chain"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Supply Chain Tracking
                  </Link>
                  <Link
                    href="/solutions/loyalty"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Loyalty Programs
                  </Link>
                  <Link
                    href="/solutions/wear-to-earn"
                    className="text-white/70 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Wear-to-Earn
                  </Link>
                </div>
              </div>

              <Link href="/pricing" className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>

              <Link href="/about" className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>
                About
              </Link>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="w-full bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border-white/20"
                >
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard Demo
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Log In
                  </Link>
                </Button>
                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  <Link href="/get-started" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
