"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-lg bg-black border border-white/10 p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-neon-purple/20 p-3">
            <CheckCircle className="h-8 w-8 text-neon-purple" />
          </div>
          <h3 className="mb-2 text-xl font-bold">Product Created Successfully!</h3>
          <p className="mb-6 text-white/70">Your product has been created and is now available in your dashboard.</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-white/10"
              onClick={() => {
                onClose()
                window.location.href = "/dashboard"
              }}
            >
              Go to Dashboard
            </Button>
            <Button
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              onClick={() => {
                onClose()
                window.location.href = "/dashboard/products"
              }}
            >
              View Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
