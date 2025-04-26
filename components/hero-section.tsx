"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, RefreshCw } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsMounted(true)

    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Safe transform calculation that returns string values for CSS
  const getTransformStyle = (x: number, y: number, strength = 10) => {
    if (!isMounted || windowSize.width === 0) {
      return {}
    }

    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    // Convert to pixel values as strings to avoid object-to-primitive conversion issues
    const translateX = `${deltaX * strength}px`
    const translateY = `${deltaY * strength}px`

    return {
      transform: `translate(${translateX}, ${translateY})`,
    }
  }

  // Background element transform
  const getBackgroundTransform = () => {
    if (!isMounted) return {}

    const x = mousePosition.x
    const y = mousePosition.y

    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    return {
      transform: `translate(calc(-50% + ${deltaX * 2}px), calc(-50% + ${deltaY * 2}px))`,
    }
  }

  // Image transform
  const getImageTransform = () => {
    if (!isMounted) return {}

    const x = mousePosition.x
    const y = mousePosition.y

    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    return {
      transform: `translate(${deltaX * -0.5}px, ${deltaY * -0.5}px)`,
    }
  }

  // Floating element transform
  const getFloatingElementTransform = () => {
    if (!isMounted) return {}

    const x = mousePosition.x
    const y = mousePosition.y

    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    return {
      transform: `translate(${deltaX * 0.8}px, ${deltaY * 0.8}px)`,
    }
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-[100px]"
        style={getBackgroundTransform()}
      />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <Zap className="mr-1 h-3.5 w-3.5 text-neon-yellow" />
              Revolutionizing Physical-Digital Product Experiences
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Transform Products Into</span>
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green animate-glow">
              Digital Experiences
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            Prime Phygital connects physical products to the blockchain with NFC technology, enabling authentication,
            ownership tracking, and interactive experiences across multiple chains including Ethereum, Polygon, Base,
            and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
              <Link href="/get-started" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              <Link href="/demo">Request Demo</Link>
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-neon-green to-neon-blue hover:opacity-90">
              <Link href="/dashboard" className="flex items-center">
                Dashboard Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-white/10 p-3 backdrop-blur-sm">
                <Shield className="h-6 w-6 text-neon-green" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Authentic Products</h3>
              <p className="text-center text-sm text-white/70">
                Verify authenticity with blockchain-backed digital passports
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-white/10 p-3 backdrop-blur-sm">
                <Zap className="h-6 w-6 text-neon-yellow" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Multi-Chain Support</h3>
              <p className="text-center text-sm text-white/70">Deploy on ETH, Polygon, Base, Apechain, Sui, and more</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-white/10 p-3 backdrop-blur-sm">
                <RefreshCw className="h-6 w-6 text-neon-blue" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Updatable Passports</h3>
              <p className="text-center text-sm text-white/70">
                Dynamic product data with theft protection and asset vaults
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="glass-panel neon-border overflow-hidden rounded-lg">
            <div className="relative aspect-[16/9]">
              <Image
                src="/digital-passport-interface.png"
                alt="Prime Phygital Platform Dashboard"
                fill
                className="object-cover"
                style={getImageTransform()}
              />
            </div>
          </div>

          {/* Floating elements */}
          <div
            className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-neon-purple/30 blur-xl"
            style={getFloatingElementTransform()}
          />
          <div
            className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-neon-blue/30 blur-xl"
            style={getFloatingElementTransform()}
          />
        </motion.div>
      </div>
    </section>
  )
}
