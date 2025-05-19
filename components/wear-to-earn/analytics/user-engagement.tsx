"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for user engagement over time
const engagementData = [
  { date: "Week 1", daily: 45, weekly: 65, monthly: 80 },
  { date: "Week 2", daily: 50, weekly: 68, monthly: 82 },
  { date: "Week 3", daily: 55, weekly: 72, monthly: 85 },
  { date: "Week 4", daily: 48, weekly: 70, monthly: 83 },
  { date: "Week 5", daily: 52, weekly: 75, monthly: 88 },
  { date: "Week 6", daily: 58, weekly: 78, monthly: 90 },
  { date: "Week 7", daily: 60, weekly: 80, monthly: 92 },
  { date: "Week 8", daily: 62, weekly: 82, monthly: 93 },
]

// Mock data for engagement distribution
const engagementDistribution = [
  { name: "Daily Active", value: 35 },
  { name: "Weekly Active", value: 45 },
  { name: "Monthly Active", value: 20 },
]

// Mock data for top users
const topUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/user-avatar.png",
    wearTime: 120,
    points: 3600,
    streak: 15,
    level: "Gold",
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/letter-a-abstract.png",
    wearTime: 105,
    points: 3150,
    streak: 12,
    level: "Gold",
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/abstract-letter-j.png",
    wearTime: 95,
    points: 2850,
    streak: 10,
    level: "Silver",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "/user-avatar.png",
    wearTime: 85,
    points: 2550,
    streak: 8,
    level: "Silver",
  },
  {
    id: 5,
    name: "David Wilson",
    avatar: "/letter-a-abstract.png",
    wearTime: 75,
    points: 2250,
    streak: 7,
    level: "Bronze",
  },
]

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function UserEngagement({ detailed = false }: { detailed?: boolean }) {
  const [engagementType, setEngagementType] = useState<"daily" | "weekly" | "monthly">("daily")

  return (
    <div className="space-y-4">
      {!detailed ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="h-[300px]">
            <div className="flex gap-2 mb-2">
              <Button
                variant={engagementType === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setEngagementType("daily")}
              >
                Daily
              </Button>
              <Button
                variant={engagementType === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setEngagementType("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={engagementType === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setEngagementType("monthly")}
              >
                Monthly
              </Button>
            </div>
            <ChartContainer
              config={{
                [engagementType]: {
                  label: `${engagementType.charAt(0).toUpperCase() + engagementType.slice(1)} Engagement Rate`,
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey={engagementType}
                    stroke="var(--color-daily)"
                    name={`${engagementType.charAt(0).toUpperCase() + engagementType.slice(1)} Engagement Rate`}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="h-[300px] flex flex-col">
            <h4 className="text-sm font-medium mb-2">Engagement Distribution</h4>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {engagementDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="h-[300px]">
            <ChartContainer
              config={{
                daily: {
                  label: "Daily Engagement Rate",
                  color: "hsl(var(--chart-1))",
                },
                weekly: {
                  label: "Weekly Engagement Rate",
                  color: "hsl(var(--chart-2))",
                },
                monthly: {
                  label: "Monthly Engagement Rate",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="daily"
                    stroke="var(--color-daily)"
                    name="Daily Engagement Rate"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="weekly"
                    stroke="var(--color-weekly)"
                    name="Weekly Engagement Rate"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="monthly"
                    stroke="var(--color-monthly)"
                    name="Monthly Engagement Rate"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Top Engaged Users</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Wear Time (h)</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Streak</TableHead>
                    <TableHead>Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.wearTime}</TableCell>
                      <TableCell>{user.points}</TableCell>
                      <TableCell>{user.streak} days</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.level === "Gold"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : user.level === "Silver"
                                ? "bg-gray-100 text-gray-800 border-gray-300"
                                : "bg-amber-100 text-amber-800 border-amber-300"
                          }
                        >
                          {user.level}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
