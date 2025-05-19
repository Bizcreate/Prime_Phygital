"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Calendar, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Mock data for active programs
const mockPrograms = [
  {
    id: 1,
    title: "Summer Sneaker Challenge",
    participants: 328,
    points: 10000,
    dateRange: "01/06/2023 - 01/10/2023",
    status: "Active",
    progress: 65,
  },
  {
    id: 2,
    title: "Hoodie Rewards Program",
    participants: 156,
    points: 5000,
    dateRange: "15/08/2023 (Ongoing)",
    status: "Active",
    progress: 30,
  },
  {
    id: 3,
    title: "T-Shirt Loyalty Program",
    participants: 89,
    points: 3000,
    dateRange: "01/07/2023 - 01/01/2024",
    status: "Active",
    progress: 15,
  },
  {
    id: 4,
    title: "Limited Edition Watch Challenge",
    participants: 42,
    points: 7500,
    dateRange: "Coming Soon",
    status: "Draft",
    progress: 0,
  },
]

export function ActivePrograms() {
  const [programs] = useState(mockPrograms)

  return (
    <div className="space-y-3">
      {programs.map((program) => (
        <Card key={program.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{program.title}</h4>
                    <Badge variant={program.status === "Active" ? "default" : "outline"}>{program.status}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {program.participants} participants
                    </div>
                    <div className="flex items-center">
                      <Award className="h-3.5 w-3.5 mr-1" />
                      {program.points.toLocaleString()} points
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {program.dateRange}
                    </div>
                  </div>
                </div>

                <Link href={`/dashboard/wear-to-earn/programs/${program.id}`}>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="h-1.5 w-full bg-gray-100">
              <div
                className="h-full bg-purple-500"
                style={{ width: program.status === "Active" ? `${program.progress}%` : "0%" }}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-2">
        <Link href="/dashboard/wear-to-earn/create">
          <Button variant="outline" size="sm">
            Create New Program
          </Button>
        </Link>
      </div>
    </div>
  )
}
