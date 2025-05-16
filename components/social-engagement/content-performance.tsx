"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, MessageSquare, HelpCircle, BarChart, ArrowUpRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for content performance
const mockContentPerformance = [
  {
    id: 1,
    title: "Summer Sneaker Challenge",
    type: "challenge",
    engagement: 328,
    pointsAwarded: 8750,
    conversionRate: 4.2,
    performance: "High",
  },
  {
    id: 2,
    title: "New Collection Announcement",
    type: "post",
    engagement: 245,
    pointsAwarded: 2450,
    conversionRate: 3.8,
    performance: "Medium",
  },
  {
    id: 3,
    title: "Sneaker Trivia Quiz",
    type: "quiz",
    engagement: 189,
    pointsAwarded: 3780,
    conversionRate: 5.1,
    performance: "High",
  },
  {
    id: 4,
    title: "Style Preference Poll",
    type: "poll",
    engagement: 156,
    pointsAwarded: 1560,
    conversionRate: 2.9,
    performance: "Medium",
  },
  {
    id: 5,
    title: "Limited Edition Watch Teaser",
    type: "post",
    engagement: 132,
    pointsAwarded: 1320,
    conversionRate: 2.1,
    performance: "Low",
  },
]

export function ContentPerformance() {
  const [sortBy, setSortBy] = useState("engagement")
  const [contentPerformance, setContentPerformance] = useState(mockContentPerformance)

  const handleSort = (value: string) => {
    setSortBy(value)

    const sorted = [...mockContentPerformance].sort((a, b) => {
      if (value === "engagement") {
        return b.engagement - a.engagement
      } else if (value === "points") {
        return b.pointsAwarded - a.pointsAwarded
      } else if (value === "conversion") {
        return b.conversionRate - a.conversionRate
      } else {
        return 0
      }
    })

    setContentPerformance(sorted)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "challenge":
        return <Award className="h-4 w-4" />
      case "quiz":
        return <HelpCircle className="h-4 w-4" />
      case "poll":
        return <BarChart className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "High":
        return <Badge className="bg-green-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-red-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Content Performance Metrics</h3>
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engagement">Sort by Engagement</SelectItem>
            <SelectItem value="points">Sort by Points Awarded</SelectItem>
            <SelectItem value="conversion">Sort by Conversion Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead className="text-right">Points Awarded</TableHead>
              <TableHead className="text-right">Conversion Rate</TableHead>
              <TableHead className="text-right">Performance</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentPerformance.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(content.type)}
                    <span className="capitalize">{content.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{content.engagement}</TableCell>
                <TableCell className="text-right">{content.pointsAwarded.toLocaleString()}</TableCell>
                <TableCell className="text-right">{content.conversionRate}%</TableCell>
                <TableCell className="text-right">{getPerformanceBadge(content.performance)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
