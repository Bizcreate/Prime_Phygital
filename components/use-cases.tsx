"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Truck, BadgeCheck, Shirt, ArrowRight } from "lucide-react"
import Link from "next/link"

export function UseCases() {
  const useCases = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-neon-green" />,
      title: "Product Authentication",
      description:
        "Verify product authenticity with blockchain-backed digital certificates, eliminating counterfeits and building consumer trust.",
      link: "/solutions/authentication",
    },
    {
      icon: <Truck className="h-6 w-6 text-neon-blue" />,
      title: "Supply Chain Tracking",
      description:
        "Track products from manufacturing to retail with immutable blockchain records for complete transparency and traceability.",
      link: "/solutions/supply-chain",
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-neon-purple" />,
      title: "Loyalty Programs",
      description:
        "Create engaging loyalty programs with token-gated experiences, exclusive content, and digital collectibles for your customers.",
      link: "/solutions/loyalty",
    },
    {
      icon: <Shirt className="h-6 w-6 text-neon-yellow" />,
      title: "Wear-to-Earn",
      description:
        "Reward customers for using and engaging with your products through our innovative wear-to-earn social engagement tools.",
      link: "/solutions/wear-to-earn",
    },
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
    <section className="py-20 relative overflow-hidden" id="use-cases">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powerful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-green">
              Use Cases
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Discover how Prime Phygital can transform your products and enhance customer experiences.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glass-panel p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="mb-4 rounded-full bg-white/10 p-3 w-fit">{useCase.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-white/70 mb-4">{useCase.description}</p>
              <Link
                href={useCase.link}
                className="inline-flex items-center text-sm font-medium text-neon-blue hover:text-neon-purple transition-colors"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
