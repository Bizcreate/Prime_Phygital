import { type NextRequest, NextResponse } from "next/server"
import { PointsEarningService } from "@/services/points-earning-service"

export async function POST(request: NextRequest) {
  try {
    const { userId, activityId, userEmail, metadata } = await request.json()

    if (!userId || !activityId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const pointsService = PointsEarningService.getInstance()
    const result = await pointsService.earnPoints(userId, activityId, userEmail, metadata)

    return NextResponse.json({
      success: result.success,
      points: result.points,
      message: result.message,
    })
  } catch (error) {
    console.error("Points earning error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
