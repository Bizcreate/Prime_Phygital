"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProofProtocol, UserProtocolProgress, UserActivity } from "@/types/wear-to-earn"

// Mock data for demonstration
const MOCK_PROTOCOLS: ProofProtocol[] = [
  {
    id: "protocol-1",
    name: "Summer Sneaker Challenge",
    description: "Wear your limited edition sneakers and earn rewards all summer long!",
    creatorId: "user_1",
    productIds: ["product-1", "product-2"],
    requirements: [
      {
        id: "req-1",
        name: "Daily Walk",
        description: "Take a walk with your sneakers for at least 30 minutes",
        type: "wear",
        verificationMethod: "nfc",
        pointsValue: 10,
        frequency: "daily",
        cooldownPeriod: 1440, // 24 hours in minutes
        minimumDuration: 30,
      },
      {
        id: "req-2",
        name: "Share on Social",
        description: "Share a photo of your sneakers on social media",
        type: "social",
        verificationMethod: "photo",
        pointsValue: 20,
        frequency: "weekly",
      },
      {
        id: "req-3",
        name: "Visit Store",
        description: "Visit one of our physical stores",
        type: "location",
        verificationMethod: "gps",
        pointsValue: 50,
        frequency: "monthly",
        locationRequired: true,
        locationRadius: 100,
      },
    ],
    startDate: "2023-06-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    isActive: true,
    totalRewards: 10000,
    rewardType: "token",
    rewardDistribution: "tiered",
    tiers: [
      {
        threshold: 100,
        reward: 50,
        name: "Bronze",
      },
      {
        threshold: 500,
        reward: 250,
        name: "Silver",
      },
      {
        threshold: 1000,
        reward: 500,
        name: "Gold",
      },
    ],
    currentParticipants: 1243,
  },
  {
    id: "protocol-2",
    name: "Luxury Watch Ownership",
    description: "Verify ownership and wear of your luxury timepiece to earn exclusive rewards",
    creatorId: "user_2",
    productIds: ["product-3"],
    requirements: [
      {
        id: "req-4",
        name: "Daily Wear",
        description: "Wear your watch for at least 8 hours",
        type: "wear",
        verificationMethod: "nfc",
        pointsValue: 5,
        frequency: "daily",
        cooldownPeriod: 1440,
        minimumDuration: 480,
      },
      {
        id: "req-5",
        name: "Authentication Check",
        description: "Verify your watch's authenticity",
        type: "scan",
        verificationMethod: "qr",
        pointsValue: 100,
        frequency: "once",
      },
    ],
    startDate: "2023-01-01T00:00:00Z",
    isActive: true,
    totalRewards: 5000,
    rewardType: "access",
    rewardDistribution: "proportional",
    currentParticipants: 587,
  },
]

const MOCK_USER_PROGRESS: Record<string, UserProtocolProgress> = {
  "protocol-1": {
    userId: "current-user",
    protocolId: "protocol-1",
    joinedAt: "2023-06-05T10:30:00Z",
    totalPointsEarned: 320,
    currentTier: "Silver",
    lastActivityAt: "2023-06-20T15:45:00Z",
    completedRequirements: {
      "req-1": 15,
      "req-2": 3,
      "req-3": 1,
    },
    rewardsEarned: 150,
    rewardsClaimed: 100,
  },
}

const MOCK_ACTIVITIES: Record<string, UserActivity[]> = {
  "protocol-1": [
    {
      id: "activity-1",
      userId: "current-user",
      protocolId: "protocol-1",
      requirementId: "req-1",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "verified",
      pointsEarned: 10,
      duration: 45,
      verifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
    },
    {
      id: "activity-2",
      userId: "current-user",
      protocolId: "protocol-1",
      requirementId: "req-2",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: "verified",
      pointsEarned: 20,
      verifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 7200000).toISOString(),
    },
    {
      id: "activity-3",
      userId: "current-user",
      protocolId: "protocol-1",
      requirementId: "req-1",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      pointsEarned: 0,
    },
  ],
}

export default function WearToEarnPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wear-to-Earn</h2>
          <p className="text-muted-foreground">Earn rewards by participating in proof-of-protocol activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Summer Sneaker Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Wear your limited edition sneakers and earn rewards all summer long!</p>
            <Button className="w-full">View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Luxury Watch Ownership</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Verify ownership and wear of your luxury timepiece to earn exclusive rewards.</p>
            <Button className="w-full">View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create your first Wear-to-Earn protocol to engage with your customers.</p>
            <Button className="w-full">Create Protocol</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
