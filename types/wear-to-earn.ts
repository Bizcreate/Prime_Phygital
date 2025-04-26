export type ProofType = "wear" | "use" | "scan" | "location" | "time" | "social" | "custom"

export type VerificationMethod = "nfc" | "qr" | "gps" | "accelerometer" | "photo" | "social" | "manual"

export type RewardType = "token" | "nft" | "discount" | "access" | "experience"

export type ActivityFrequency = "once" | "daily" | "weekly" | "monthly" | "custom"

export interface ProofRequirement {
  id: string
  name: string
  description: string
  type: ProofType
  verificationMethod: VerificationMethod
  pointsValue: number
  frequency: ActivityFrequency
  cooldownPeriod?: number // in minutes
  locationRequired?: boolean
  locationRadius?: number // in meters
  customFields?: Record<string, any>
  minimumDuration?: number // in minutes (for wear/use activities)
}

export interface ProofProtocol {
  id: string
  name: string
  description: string
  creatorId: string
  productIds: string[]
  requirements: ProofRequirement[]
  startDate: string
  endDate?: string
  isActive: boolean
  totalRewards: number
  rewardType: RewardType
  rewardDistribution: "equal" | "proportional" | "tiered"
  tiers?: {
    threshold: number
    reward: number
    name: string
  }[]
  maxParticipants?: number
  currentParticipants: number
  termsAndConditions?: string
}

export interface UserActivity {
  id: string
  userId: string
  protocolId: string
  requirementId: string
  timestamp: string
  status: "pending" | "verified" | "rejected"
  verificationData?: any
  pointsEarned: number
  location?: {
    latitude: number
    longitude: number
  }
  duration?: number // in minutes
  verifiedAt?: string
  rejectionReason?: string
}

export interface UserProtocolProgress {
  userId: string
  protocolId: string
  joinedAt: string
  totalPointsEarned: number
  currentTier?: string
  lastActivityAt?: string
  completedRequirements: Record<string, number> // requirementId -> count
  rewardsEarned: number
  rewardsClaimed: number
}
