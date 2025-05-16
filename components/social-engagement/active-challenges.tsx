"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Calendar, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Mock data for active challenges
const mockChallenges = [
  {
    id: 1,
    title: "Summer Sneaker Challenge",
    participants: 328,
    points: 10000,
    dateRange: "01/06/2023 - 01/10/2023",
    status: "Active",
  },
  {
    id: 2,
    title: "Hoodie Rewards Program",
    participants: 156,
    points: 5000,
    dateRange: "15/08/2023 (Ongoing)",
    status: "Active",
  },
  {
    id: 3,
    title: "T-Shirt Loyalty Program",
    participants: 89,
    points: 3000,
    dateRange: "01/07/2023 - 01/01/2024",
    status: "Active",
  },
  {
    id: 4,
    title: "Limited Edition Watch Challenge",
    participants: 42,
    points: 7500,
    dateRange: "Coming Soon",
    status: "Draft",
  },
]

export function ActiveChallenges() {
  const [challenges] = useState(mockChallenges)

  return (
    <div className="space-y-3">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{challenge.title}</h4>
                    <Badge variant={challenge.status === "Active" ? "default" : "outline"}>{challenge.status}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {challenge.participants} participants
                    </div>
                    <div className="flex items-center">
                      <Award className="h-3.5 w-3.5 mr-1" />
                      {challenge.points.toLocaleString()} points
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {challenge.dateRange}
                    </div>
                  </div>
                </div>

                <Link href={`/dashboard/social-engagement/challenges/${challenge.id}`}>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="h-1.5 w-full bg-gray-100">
              <div className="h-full bg-purple-500" style={{ width: challenge.status === "Active" ? "65%" : "0%" }} />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-2">
        <Link href="/dashboard/social-engagement/create-challenge">
          <Button variant="outline" size="sm">
            Create New Challenge
          </Button>
        </Link>
      </div>
    </div>
  )
}
