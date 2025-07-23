import { EmailService } from "./email-service"

export interface Reward {
  id: string
  name: string
  points: number
  brand: string
  expires: string
  description: string
  category: "discount" | "access" | "nft" | "shipping" | "event" | "customization"
  isActive: boolean
  maxRedemptions?: number
  currentRedemptions: number
}

export interface RedeemedReward {
  id: string
  rewardId: string
  userId: string
  rewardName: string
  pointsSpent: number
  rewardCode: string
  redeemedAt: Date
  expiresAt: Date
  isUsed: boolean
  usedAt?: Date
}

export interface PointsTransaction {
  id: string
  userId: string
  type: "earned" | "spent" | "bonus" | "refund"
  amount: number
  source: string
  description: string
  timestamp: Date
  metadata?: Record<string, any>
}

export class RewardsService {
  private static instance: RewardsService
  private emailService: EmailService
  private rewards: Map<string, Reward> = new Map()
  private redeemedRewards: Map<string, RedeemedReward> = new Map()
  private pointsTransactions: Map<string, PointsTransaction> = new Map()
  private userPoints: Map<string, number> = new Map()

  private constructor() {
    this.emailService = EmailService.getInstance()
    this.initializeRewards()
    this.initializeUserData()
  }

  public static getInstance(): RewardsService {
    if (!RewardsService.instance) {
      RewardsService.instance = new RewardsService()
    }
    return RewardsService.instance
  }

  private initializeRewards() {
    const defaultRewards: Reward[] = [
      {
        id: "reward-1",
        name: "15% Off Next Purchase",
        points: 1000,
        brand: "Urban Athletics",
        expires: "June 30, 2025",
        description: "Get 15% off your next purchase at any Urban Athletics store or online",
        category: "discount",
        isActive: true,
        maxRedemptions: 1000,
        currentRedemptions: 0,
      },
      {
        id: "reward-2",
        name: "Exclusive Access to New Collection",
        points: 2500,
        brand: "Streetwear Co.",
        expires: "July 15, 2025",
        description: "Early access to the upcoming summer collection before public release",
        category: "access",
        isActive: true,
        currentRedemptions: 0,
      },
      {
        id: "reward-3",
        name: "Limited Edition NFT",
        points: 5000,
        brand: "Digital Collectibles",
        expires: "No expiration",
        description: "Exclusive digital collectible only available to Prime Phygital members",
        category: "nft",
        isActive: true,
        currentRedemptions: 0,
      },
      {
        id: "reward-4",
        name: "Free Shipping Voucher",
        points: 500,
        brand: "Multiple Brands",
        expires: "December 31, 2025",
        description: "Free shipping on your next order with any participating brand",
        category: "shipping",
        isActive: true,
        currentRedemptions: 0,
      },
      {
        id: "reward-5",
        name: "VIP Event Access",
        points: 3000,
        brand: "Streetwear Co.",
        expires: "August 30, 2025",
        description: "Exclusive invitation to the brand's summer launch party",
        category: "event",
        isActive: true,
        currentRedemptions: 0,
      },
      {
        id: "reward-6",
        name: "Product Customization",
        points: 4000,
        brand: "Urban Athletics",
        expires: "September 15, 2025",
        description: "Customize your next sneaker purchase with exclusive designs",
        category: "customization",
        isActive: true,
        currentRedemptions: 0,
      },
    ]

    defaultRewards.forEach((reward) => {
      this.rewards.set(reward.id, reward)
    })
  }

  private initializeUserData() {
    // Initialize demo user with points
    this.userPoints.set("demo-user", 2450)
  }

  async redeemReward(
    userId: string,
    rewardId: string,
    userEmail: string,
  ): Promise<{ success: boolean; rewardCode?: string; message: string }> {
    const reward = this.rewards.get(rewardId)
    if (!reward) {
      return { success: false, message: "Reward not found" }
    }

    if (!reward.isActive) {
      return { success: false, message: "Reward is no longer available" }
    }

    const userPointBalance = this.userPoints.get(userId) || 0
    if (userPointBalance < reward.points) {
      return { success: false, message: "Insufficient points" }
    }

    // Check if reward has reached max redemptions
    if (reward.maxRedemptions && reward.currentRedemptions >= reward.maxRedemptions) {
      return { success: false, message: "Reward limit reached" }
    }

    // Check if reward has expired
    if (this.isRewardExpired(reward)) {
      return { success: false, message: "Reward has expired" }
    }

    // Generate reward code
    const rewardCode = this.generateRewardCode(reward)

    // Create redeemed reward record
    const redeemedReward: RedeemedReward = {
      id: `redeemed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      rewardId: reward.id,
      userId,
      rewardName: reward.name,
      pointsSpent: reward.points,
      rewardCode,
      redeemedAt: new Date(),
      expiresAt: new Date(reward.expires === "No expiration" ? "2099-12-31" : reward.expires),
      isUsed: false,
    }

    // Update user points
    this.userPoints.set(userId, userPointBalance - reward.points)

    // Add points transaction
    await this.addPointsTransaction(userId, "spent", reward.points, `Redeemed ${reward.name}`, {
      rewardId: reward.id,
      rewardCode,
    })

    // Update reward redemption count
    reward.currentRedemptions++
    this.rewards.set(reward.id, reward)

    // Store redeemed reward
    this.redeemedRewards.set(redeemedReward.id, redeemedReward)

    // Send email with reward code
    try {
      await this.emailService.sendRewardCode({
        userEmail,
        rewardName: reward.name,
        rewardCode,
        brandName: reward.brand,
        expirationDate: reward.expires,
      })
    } catch (error) {
      console.error("Failed to send reward email:", error)
    }

    return {
      success: true,
      rewardCode,
      message: `Successfully redeemed ${reward.name}! Check your email for the reward code.`,
    }
  }

  async earnPoints(
    userId: string,
    amount: number,
    source: string,
    description: string,
    userEmail?: string,
  ): Promise<boolean> {
    try {
      const currentPoints = this.userPoints.get(userId) || 0
      const newTotal = currentPoints + amount

      this.userPoints.set(userId, newTotal)

      await this.addPointsTransaction(userId, "earned", amount, source, { description })

      // Send email notification for significant point earnings
      if (amount >= 100 && userEmail) {
        await this.emailService.sendPointsEarnedNotification({
          userEmail,
          pointsEarned: amount,
          activity: description,
          totalPoints: newTotal,
        })
      }

      return true
    } catch (error) {
      console.error("Failed to earn points:", error)
      return false
    }
  }

  async addPointsTransaction(
    userId: string,
    type: PointsTransaction["type"],
    amount: number,
    source: string,
    metadata?: Record<string, any>,
  ): Promise<void> {
    const transaction: PointsTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      amount,
      source,
      description: source,
      timestamp: new Date(),
      metadata,
    }

    this.pointsTransactions.set(transaction.id, transaction)
  }

  getUserPoints(userId: string): number {
    return this.userPoints.get(userId) || 0
  }

  getAvailableRewards(): Reward[] {
    return Array.from(this.rewards.values()).filter((reward) => reward.isActive && !this.isRewardExpired(reward))
  }

  getUserRedeemedRewards(userId: string): RedeemedReward[] {
    return Array.from(this.redeemedRewards.values())
      .filter((reward) => reward.userId === userId)
      .sort((a, b) => b.redeemedAt.getTime() - a.redeemedAt.getTime())
  }

  getUserPointsHistory(userId: string): PointsTransaction[] {
    return Array.from(this.pointsTransactions.values())
      .filter((tx) => tx.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  private isRewardExpired(reward: Reward): boolean {
    if (reward.expires === "No expiration") return false
    return new Date() > new Date(reward.expires)
  }

  private generateRewardCode(reward: Reward): string {
    const prefix = reward.brand.replace(/\s+/g, "").toUpperCase().substr(0, 4)
    const suffix = Math.random().toString(36).substr(2, 6).toUpperCase()
    return `${prefix}${suffix}`
  }

  // Automatic expiration cleanup (run periodically)
  cleanupExpiredRewards(): void {
    const now = new Date()
    this.redeemedRewards.forEach((reward, id) => {
      if (reward.expiresAt < now && !reward.isUsed) {
        // Mark as expired or remove
        this.redeemedRewards.delete(id)
      }
    })
  }
}
