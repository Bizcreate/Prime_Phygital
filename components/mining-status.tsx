"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface MiningStatusProps {
  productId: string
}

export function MiningStatus({ productId }: MiningStatusProps) {
  const [totalEarned, setTotalEarned] = useState(25)
  const [isMining, setIsMining] = useState(false)
  const [miningProgress, setMiningProgress] = useState(0)
  const [lastMined, setLastMined] = useState<Date | null>(null)
  const [canMine, setCanMine] = useState(true)

  useEffect(() => {
    // Check if mining is allowed (once per day)
    const lastMinedDate = localStorage.getItem(`lastMined-${productId}`)
    if (lastMinedDate) {
      const lastDate = new Date(lastMinedDate)
      const now = new Date()

      // If last mined was today, disable mining
      if (
        lastDate.getDate() === now.getDate() &&
        lastDate.getMonth() === now.getMonth() &&
        lastDate.getFullYear() === now.getFullYear()
      ) {
        setCanMine(false)
        setLastMined(lastDate)
      }
    }
  }, [productId])

  const startMining = () => {
    if (!canMine) {
      toast({
        title: "Mining Limit Reached",
        description: "You can only mine tokens once per day for this product.",
        variant: "destructive",
      })
      return
    }

    setIsMining(true)
    setMiningProgress(0)

    // Simulate mining progress
    const interval = setInterval(() => {
      setMiningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          completeMining()
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const completeMining = () => {
    // Add random amount between 1-5 tokens
    const earned = Math.floor(Math.random() * 5) + 1
    setTotalEarned((prev) => prev + earned)

    // Set last mined date
    const now = new Date()
    localStorage.setItem(`lastMined-${productId}`, now.toISOString())
    setLastMined(now)
    setCanMine(false)

    // Reset mining state
    setTimeout(() => {
      setIsMining(false)
      setMiningProgress(0)

      toast({
        title: "Mining Successful",
        description: `You earned ${earned} PRIME tokens!`,
      })
    }, 500)
  }

  return (
    <Card className="bg-black border border-white/10 text-white overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <h3 className="text-xl font-bold">Mining Status</h3>
          <div className="mt-2">
            <div className="text-sm text-white/70">Total Earned</div>
            <div className="text-4xl font-bold">
              {totalEarned} <span className="text-lg">PRIME</span>
            </div>
          </div>
        </div>

        {isMining ? (
          <div className="relative">
            <div
              className="h-12 bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-300 flex items-center justify-center"
              style={{ width: `${miningProgress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              Mining in progress... {miningProgress}%
            </div>
          </div>
        ) : (
          <Button
            className="w-full h-12 rounded-none bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/90 hover:to-neon-blue/90 transition-all"
            onClick={startMining}
            disabled={!canMine}
          >
            <Zap className="h-5 w-5 mr-2" />
            Mine Tokens Now
          </Button>
        )}

        {lastMined && !canMine && (
          <div className="p-2 text-center text-xs text-white/50">
            Last mined: {lastMined.toLocaleDateString()} at {lastMined.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
