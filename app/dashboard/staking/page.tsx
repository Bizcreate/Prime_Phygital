"use client"

import { ArrowLeft } from "lucide-react"
import { TokenStaking } from "@/components/token-staking"
import Link from "next/link"

export default function StakingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Token Staking</h2>
          <p className="text-muted-foreground">Stake your PRIME tokens to earn rewards and unlock exclusive benefits</p>
        </div>
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4 inline" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <TokenStaking />
      </div>
    </div>
  )
}
