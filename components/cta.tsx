"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-[100px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel neon-border rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Transform Your Products?</h2>
          <p className="mx-auto max-w-2xl text-white/70 mb-8">
            Join the phygital revolution and connect your physical products to the blockchain. Create authentic digital
            experiences that engage customers and build brand loyalty.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
              <Link href="/get-started" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
