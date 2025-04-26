"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Layers,
  Shield,
  BarChart4,
  RefreshCw,
  Database,
  QrCode,
  LinkIcon,
  UserCheck,
  FileCheck,
  Fingerprint,
  Wallet,
} from "lucide-react"

export function Features() {
  const [activeTab, setActiveTab] = useState("token-creation")

  const features = [
    {
      id: "token-creation",
      title: "Token Creation",
      description:
        "Create digital tokens for physical products with customizable metadata, ownership details, and product specifications.",
      icon: <Layers className="h-5 w-5" />,
      image: "/neon-token-forge.png",
      benefits: [
        { icon: <FileCheck className="h-4 w-4 text-neon-green" />, text: "Customizable product metadata" },
        { icon: <Fingerprint className="h-4 w-4 text-neon-blue" />, text: "Unique digital identifiers" },
        { icon: <RefreshCw className="h-4 w-4 text-neon-yellow" />, text: "Updatable product information" },
      ],
    },
    {
      id: "nfc-encoding",
      title: "NFC Encoding",
      description:
        "Seamlessly encode NFC tags with your digital tokens, creating a bridge between physical products and their digital counterparts.",
      icon: <Smartphone className="h-5 w-5" />,
      image: "/nfc-neon-encode.png",
      benefits: [
        { icon: <QrCode className="h-4 w-4 text-neon-green" />, text: "Secure tag encryption" },
        { icon: <Smartphone className="h-4 w-4 text-neon-blue" />, text: "Mobile-friendly scanning" },
        { icon: <LinkIcon className="h-4 w-4 text-neon-purple" />, text: "Blockchain connection" },
      ],
    },
    {
      id: "nft-minting",
      title: "NFT Minting",
      description:
        "Mint NFTs linked to physical products across multiple blockchains including Ethereum, Polygon, Base, Apechain, Sui, and more.",
      icon: <Database className="h-5 w-5" />,
      image: "/neon-nft-flow.png",
      benefits: [
        { icon: <Wallet className="h-4 w-4 text-neon-green" />, text: "Multi-chain deployment" },
        { icon: <Shield className="h-4 w-4 text-neon-blue" />, text: "ERC-1155 dynamic NFTs" },
        { icon: <UserCheck className="h-4 w-4 text-neon-purple" />, text: "Verifiable ownership" },
      ],
    },
    {
      id: "asset-vault",
      title: "Asset Vault",
      description:
        "Secure digital ledger for your physical products, enabling theft reporting, ownership transfers, and product history tracking.",
      icon: <Shield className="h-5 w-5" />,
      image: "/neon-vault-history.png",
      benefits: [
        { icon: <Shield className="h-4 w-4 text-neon-green" />, text: "Theft protection" },
        { icon: <RefreshCw className="h-4 w-4 text-neon-blue" />, text: "Ownership transfers" },
        { icon: <BarChart4 className="h-4 w-4 text-neon-yellow" />, text: "Complete product history" },
      ],
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
              Phygital
            </span>{" "}
            Platform
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Our end-to-end solution connects physical products to the blockchain with powerful features for creators,
            brands, and consumers.
          </p>
        </div>

        <Tabs defaultValue="token-creation" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-transparent">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className={`flex items-center gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none border border-transparent data-[state=active]:border-white/20 backdrop-blur-sm`}
              >
                {feature.icon}
                <span className="hidden sm:inline">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-white/70 mb-6">{feature.description}</p>

                  <div className="space-y-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/10 p-1.5 backdrop-blur-sm">{benefit.icon}</div>
                        <p>{benefit.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="glass-panel neon-border overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
