"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ChainSupport() {
  const chains = [
    { name: "Ethereum", logo: "/blockchain-logos/ethereum.png" },
    { name: "Polygon", logo: "/blockchain-logos/polygon.png" },
    { name: "Base", logo: "/blockchain-logos/base.png" },
    { name: "Apechain", logo: "/blockchain-logos/apechain.png" },
    { name: "Sui", logo: "/blockchain-logos/sui.png" },
    { name: "Abstract", logo: "/blockchain-logos/abstract.png" },
    { name: "VeChain", logo: "/blockchain-logos/vechain.png" },
    { name: "Skale", logo: "/blockchain-logos/skale.png" },
    { name: "Solana", logo: "/blockchain-logos/solana.png" },
    { name: "Tron", logo: "/blockchain-logos/tron.png" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-black/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-blue/10 to-neon-green/10 blur-[100px]" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Multi-Chain{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Support</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Deploy your NFTs and digital assets across multiple blockchains for maximum flexibility and reach.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-12"
        >
          {chains.map((chain) => (
            <motion.div key={chain.name} variants={item} className="flex flex-col items-center">
              <div className="glass-panel p-4 rounded-full mb-3 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <div className="relative w-10 h-10 md:w-12 md:h-12">
                  <Image
                    src={chain.logo || "/placeholder.svg"}
                    alt={`${chain.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-white/80">{chain.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
