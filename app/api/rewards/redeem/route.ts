import { type NextRequest, NextResponse } from "next/server"
import { RewardsService } from "@/services/rewards-service"

export async function POST(request: NextRequest) {
  try {
    const { userId, rewardId, userEmail } = await request.json()

    if (!userId || !rewardId || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const rewardsService = RewardsService.getInstance()
    const result = await rewardsService.redeemReward(userId, rewardId, userEmail)

    if (result.success) {
      return NextResponse.json({
        success: true,
        rewardCode: result.rewardCode,
        message: result.message,
      })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Reward redemption error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
