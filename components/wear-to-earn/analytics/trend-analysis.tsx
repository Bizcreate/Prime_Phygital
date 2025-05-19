"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for trends
const trendData = {
  daily: [
    { date: "Mon", participants: 850, hours: 2125, points: 53125 },
    { date: "Tue", participants: 920, hours: 2300, points: 57500 },
    { date: "Wed", participants: 980, hours: 2450, points: 61250 },
    { date: "Thu", participants: 1050, hours: 2625, points: 65625 },
    { date: "Fri", participants: 1120, hours: 2800, points: 70000 },
    { date: "Sat", participants: 1200, hours: 3000, points: 75000 },
    { date: "Sun", participants: 1150, hours: 2875, points: 71875 },
  ],
  weekly: [
    { date: "Week 1", participants: 950, hours: 14250, points: 356250 },
    { date: "Week 2", participants: 1050, hours: 15750, points: 393750 },
    { date: "Week 3", participants: 1150, hours: 17250, points: 431250 },
    { date: "Week 4", participants: 1250, hours: 18750, points: 468750 },
  ],
  monthly: [
    { date: "Jan", participants: 800, hours: 48000, points: 1200000 },
    { date: "Feb", participants: 850, hours: 51000, points: 1275000 },
    { date: "Mar", participants: 900, hours: 54000, points: 1350000 },
    { date: "Apr", participants: 950, hours: 57000, points: 1425000 },
    { date: "May", participants: 1000, hours: 60000, points: 1500000 },
    { date: "Jun", participants: 1050, hours: 63000, points: 1575000 },
  ],
}

export function TrendAnalysis() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [metric, setMetric] = useState<"participants" | "hours" | "points">("participants")

  const data = trendData[timeRange]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: "daily" | "weekly" | "monthly") => setTimeRange(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={metric} onValueChange={(value: "participants" | "hours" | "points") => setMetric(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="participants">Participants</SelectItem>
              <SelectItem value="hours">Wear Hours</SelectItem>
              <SelectItem value="points">Points</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ChartContainer
        config={{
          [metric]: {
            label: metric === "participants" ? "Participants" : metric === "hours" ? "Wear Hours" : "Points",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="var(--color-participants)"
              name={metric === "participants" ? "Participants" : metric === "hours" ? "Wear Hours" : "Points"}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
