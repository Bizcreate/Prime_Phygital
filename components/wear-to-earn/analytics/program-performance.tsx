"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for program performance
const programData = [
  {
    name: "Sneakers Challenge",
    participants: 520,
    participantsChange: 12.5,
    hours: 7800,
    hoursChange: 8.2,
    points: 58500,
    pointsChange: 15.3,
    rewards: 105,
    rewardsChange: 7.1,
    engagement: 72.5,
    engagementChange: 3.2,
    retention: 81.2,
    retentionChange: 4.5,
  },
  {
    name: "Luxury Watches",
    participants: 320,
    participantsChange: 8.7,
    hours: 4800,
    hoursChange: 5.4,
    points: 36000,
    pointsChange: 10.2,
    rewards: 65,
    rewardsChange: 3.8,
    engagement: 68.3,
    engagementChange: -1.5,
    retention: 75.8,
    retentionChange: 2.1,
  },
  {
    name: "Designer Bags",
    participants: 280,
    participantsChange: 15.2,
    hours: 3360,
    hoursChange: 12.8,
    points: 25200,
    pointsChange: 18.5,
    rewards: 48,
    rewardsChange: 9.2,
    engagement: 65.7,
    engagementChange: 5.3,
    retention: 72.4,
    retentionChange: 6.7,
  },
  {
    name: "Premium Apparel",
    participants: 164,
    participantsChange: 5.8,
    hours: 2460,
    hoursChange: 3.5,
    points: 18450,
    pointsChange: 7.2,
    rewards: 27,
    rewardsChange: 2.5,
    engagement: 62.8,
    engagementChange: -3.1,
    retention: 68.5,
    retentionChange: -1.2,
  },
]

// Colors for the chart
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

type SortKey = keyof (typeof programData)[0]
type SortDirection = "asc" | "desc"

export function ProgramPerformance({ detailed = false }: { detailed?: boolean }) {
  const [sortKey, setSortKey] = useState<SortKey>("participants")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [chartMetric, setChartMetric] = useState<"participants" | "hours" | "points">("participants")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const sortedData = [...programData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1
    }
  })

  return (
    <div className="space-y-4">
      {!detailed && (
        <div className="flex gap-2">
          <Button
            variant={chartMetric === "participants" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartMetric("participants")}
          >
            Participants
          </Button>
          <Button
            variant={chartMetric === "hours" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartMetric("hours")}
          >
            Wear Hours
          </Button>
          <Button
            variant={chartMetric === "points" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartMetric("points")}
          >
            Points
          </Button>
        </div>
      )}

      {!detailed ? (
        <div className="h-[300px]">
          <ChartContainer
            config={{
              [chartMetric]: {
                label:
                  chartMetric === "participants" ? "Participants" : chartMetric === "hours" ? "Wear Hours" : "Points",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey={chartMetric}
                  fill="var(--color-participants)"
                  name={
                    chartMetric === "participants" ? "Participants" : chartMetric === "hours" ? "Wear Hours" : "Points"
                  }
                >
                  {sortedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Program</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("participants")}>
                  <div className="flex items-center">
                    Participants
                    {sortKey === "participants" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("hours")}>
                  <div className="flex items-center">
                    Wear Hours
                    {sortKey === "hours" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("points")}>
                  <div className="flex items-center">
                    Points
                    {sortKey === "points" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("rewards")}>
                  <div className="flex items-center">
                    Rewards
                    {sortKey === "rewards" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("engagement")}>
                  <div className="flex items-center">
                    Engagement
                    {sortKey === "engagement" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("retention")}>
                  <div className="flex items-center">
                    Retention
                    {sortKey === "retention" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((program) => (
                <TableRow key={program.name}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{program.participants}</span>
                      <span
                        className={`text-xs flex items-center ${
                          program.participantsChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {program.participantsChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(program.participantsChange)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{program.hours}</span>
                      <span
                        className={`text-xs flex items-center ${
                          program.hoursChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {program.hoursChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(program.hoursChange)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{program.points}</span>
                      <span
                        className={`text-xs flex items-center ${
                          program.pointsChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {program.pointsChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(program.pointsChange)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{program.rewards}</span>
                      <span
                        className={`text-xs flex items-center ${
                          program.rewardsChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {program.rewardsChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(program.rewardsChange)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{program.engagement}%</span>
                      <span
                        className={`text-xs flex items-center ${
                          program.engagementChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {program.engagementChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(program.engagementChange)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{program.retention}%</span>
                      <span
                        className={`text-xs flex items-center ${
                          program.retentionChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {program.retentionChange > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(program.retentionChange)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
