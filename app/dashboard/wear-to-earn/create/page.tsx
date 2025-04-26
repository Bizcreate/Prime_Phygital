"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProtocolCreator } from "@/components/wear-to-earn/protocol-creator"
import { toast } from "@/components/ui/use-toast"
import type { ProofProtocol } from "@/types/wear-to-earn"

// Mock products for demonstration
const MOCK_PRODUCTS = [
  {
    id: "product-1",
    name: "Neon Streak Sneakers",
    image: "/neon-streak-sneakers.png",
  },
  {
    id: "product-2",
    name: "Urban Glow Sneakers",
    image: "/vibrant-kicks.png",
  },
  {
    id: "product-3",
    name: "Elegant Timepiece",
    image: "/elegant-timepiece.png",
  },
  {
    id: "product-4",
    name: "Stylish Urban Jacket",
    image: "/stylish-urban-jacket.png",
  },
  {
    id: "product-5",
    name: "Modern Commute Audio",
    image: "/modern-commute-audio.png",
  },
]

export default function CreateProtocolPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveProtocol = async (protocol: ProofProtocol) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to save the protocol
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Protocol Created",
        description: "Your Wear-to-Earn protocol has been created successfully.",
      })

      router.push("/dashboard/wear-to-earn")
    } catch (error) {
      console.error("Error saving protocol:", error)
      toast({
        title: "Error",
        description: "There was an error creating your protocol. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Wear-to-Earn Protocol</h2>
          <p className="text-muted-foreground">
            Define a new protocol for users to earn rewards through product interactions
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/dashboard/wear-to-earn")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Protocols
        </Button>
      </div>

      <ProtocolCreator products={MOCK_PRODUCTS} onSave={handleSaveProtocol} />
    </div>
  )
}
