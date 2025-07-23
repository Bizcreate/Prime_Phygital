import { RewardsService } from "./rewards-service"

export interface PointsEarningActivity {
  id: string
  name: string
  description: string
  points: number
  category: "authentication" | "social" | "purchase" | "referral" | "daily" | "challenge"
  isRepeatable: boolean
  cooldownHours?: number
  maxPerDay?: number
  requirements?: string[]
}

export class PointsEarningService {
  private static instance: PointsEarningService
  private rewardsService: RewardsService
  private activities: Map<string, PointsEarningActivity> = new Map()
  private userActivityLog: Map<string, Map<string, Date[]>> = new Map()

  private constructor() {
    this.rewardsService = RewardsService.getInstance()
    this.initializeActivities()
  }

  public static getInstance(): PointsEarningService {
    if (!PointsEarningService.instance) {
      PointsEarningService.instance = new PointsEarningService()
    }
    return PointsEarningService.instance
  }

  private initializeActivities() {
    const activities: PointsEarningActivity[] = [
      {
        id: "product-authentication",
        name: "Product Authentication",
        description: "Authenticate a new product with NFC",
        points: 100,
        category: "authentication",
        isRepeatable: true,
        maxPerDay: 10,
      },
      {
        id: "first-authentication",
        name: "First Authentication",
        description: "Authenticate your first product",
        points: 500,
        category: "authentication",
        isRepeatable: false,
      },
      {
        id: "daily-check-in",
        name: "Daily Check-in",
        description: "Open the app and check in daily",
        points: 50,
        category: "daily",
        isRepeatable: true,
        cooldownHours: 24,
        maxPerDay: 1,
      },
      {
        id: "social-share",
        name: "Social Share",
        description: "Share a product on social media",
        points: 75,
        category: "social",
        isRepeatable: true,
        maxPerDay: 3,
      },
      {
        id: "product-review",
        name: "Product Review",
        description: "Write a review for an authenticated product",
        points: 150,
        category: "social",
        isRepeatable: true,
        maxPerDay: 5,
      },
      {
        id: "referral-signup",
        name: "Referral Signup",
        description: "Refer a friend who signs up",
        points: 1000,
        category: "referral",
        isRepeatable: true,
      },
      {
        id: "wear-to-earn-session",
        name: "Wear-to-Earn Session",
        description: "Complete a wear-to-earn tracking session",
        points: 25,
        category: "challenge",
        isRepeatable: true,
        maxPerDay: 20,
      },
      {
        id: "challenge-completion",
        name: "Challenge Completion",
        description: "Complete a brand challenge",
        points: 500,
        category: "challenge",
        isRepeatable: true,
      },
      {
        id: "purchase-verification",
        name: "Purchase Verification",
        description: "Verify a purchase through the platform",
        points: 200,
        category: "purchase",
        isRepeatable: true,
      },
      {
        id: "profile-completion",
        name: "Profile Completion",
        description: "Complete your profile with all details",
        points: 300,
        category: "authentication",
        isRepeatable: false,
      },
    ]

    activities.forEach((activity) => {
      this.activities.set(activity.id, activity)
    })
  }

  async earnPoints(
    userId: string,
    activityId: string,
    userEmail?: string,
    metadata?: Record<string, any>,
  ): Promise<{ success: boolean; points: number; message: string }> {
    const activity = this.activities.get(activityId)
    if (!activity) {
      return { success: false, points: 0, message: "Activity not found" }
    }

    // Check if user can perform this activity
    const canEarn = this.canUserEarnFromActivity(userId, activity)
    if (!canEarn.allowed) {
      return { success: false, points: 0, message: canEarn.reason }
    }

    // Calculate points (with potential bonuses)
    let pointsToEarn = activity.points

    // Apply bonuses
    if (this.isWeekend() && activity.category === "social") {
      pointsToEarn = Math.floor(pointsToEarn * 1.5) // 50% weekend bonus for social activities
    }

    if (this.isFirstTimeToday(userId, activityId)) {
      pointsToEarn += 25 // First time today bonus
    }

    // Record the activity
    this.recordUserActivity(userId, activityId)

    // Award points
    const success = await this.rewardsService.earnPoints(
      userId,
      pointsToEarn,
      activity.name,
      activity.description,
      userEmail,
    )

    if (success) {
      return {
        success: true,
        points: pointsToEarn,
        message: `Earned ${pointsToEarn} points for ${activity.name}!`,
      }
    } else {
      return {
        success: false,
        points: 0,
        message: "Failed to award points",
      }
    }
  }

  private canUserEarnFromActivity(
    userId: string,
    activity: PointsEarningActivity,
  ): { allowed: boolean; reason: string } {
    if (!activity.isRepeatable) {
      const hasCompleted = this.hasUserCompletedActivity(userId, activity.id)
      if (hasCompleted) {
        return { allowed: false, reason: "Activity can only be completed once" }
      }
    }

    if (activity.cooldownHours) {
      const lastCompletion = this.getLastActivityCompletion(userId, activity.id)
      if (lastCompletion) {
        const cooldownEnd = new Date(lastCompletion.getTime() + activity.cooldownHours * 60 * 60 * 1000)
        if (new Date() < cooldownEnd) {
          const hoursLeft = Math.ceil((cooldownEnd.getTime() - new Date().getTime()) / (60 * 60 * 1000))
          return { allowed: false, reason: `Cooldown active. Try again in ${hoursLeft} hours.` }
        }
      }
    }

    if (activity.maxPerDay) {
      const todayCount = this.getTodayActivityCount(userId, activity.id)
      if (todayCount >= activity.maxPerDay) {
        return { allowed: false, reason: `Daily limit reached (${activity.maxPerDay} per day)` }
      }
    }

    return { allowed: true, reason: "" }
  }

  private recordUserActivity(userId: string, activityId: string): void {
    if (!this.userActivityLog.has(userId)) {
      this.userActivityLog.set(userId, new Map())
    }

    const userLog = this.userActivityLog.get(userId)!
    if (!userLog.has(activityId)) {
      userLog.set(activityId, [])
    }

    userLog.get(activityId)!.push(new Date())
  }

  private hasUserCompletedActivity(userId: string, activityId: string): boolean {
    const userLog = this.userActivityLog.get(userId)
    if (!userLog) return false

    const activityLog = userLog.get(activityId)
    return activityLog ? activityLog.length > 0 : false
  }

  private getLastActivityCompletion(userId: string, activityId: string): Date | null {
    const userLog = this.userActivityLog.get(userId)
    if (!userLog) return null

    const activityLog = userLog.get(activityId)
    if (!activityLog || activityLog.length === 0) return null

    return activityLog[activityLog.length - 1]
  }

  private getTodayActivityCount(userId: string, activityId: string): number {
    const userLog = this.userActivityLog.get(userId)
    if (!userLog) return 0

    const activityLog = userLog.get(activityId)
    if (!activityLog) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return activityLog.filter((date) => {
      const activityDate = new Date(date)
      activityDate.setHours(0, 0, 0, 0)
      return activityDate.getTime() === today.getTime()
    }).length
  }

  private isWeekend(): boolean {
    const day = new Date().getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  private isFirstTimeToday(userId: string, activityId: string): boolean {
    return this.getTodayActivityCount(userId, activityId) === 0
  }

  getAvailableActivities(userId: string): Array<PointsEarningActivity & { canEarn: boolean; reason?: string }> {
    return Array.from(this.activities.values()).map((activity) => {
      const canEarn = this.canUserEarnFromActivity(userId, activity)
      return {
        ...activity,
        canEarn: canEarn.allowed,
        reason: canEarn.reason,
      }
    })
  }

  getUserActivityStats(userId: string): Record<string, number> {
    const userLog = this.userActivityLog.get(userId)
    if (!userLog) return {}

    const stats: Record<string, number> = {}
    userLog.forEach((dates, activityId) => {
      stats[activityId] = dates.length
    })

    return stats
  }
}
