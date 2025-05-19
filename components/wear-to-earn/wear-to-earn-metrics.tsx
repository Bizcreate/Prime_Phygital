"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for wear-to-earn metrics
const mockData = {
  weekly: [
    { name: "Mon", participants: 850, hours: 2125, points: 53125 },
    { name: "Tue", participants: 920, hours: 2300, points: 57500 },
    { name: "Wed", participants: 980, hours: 2450, points: 61250 },
    { name: "Thu", participants: 1050, hours: 2625, points: 65625 },
    { name: "Fri", participants: 1120, hours: 2800, points: 70000 },
    { name: "Sat", participants: 1200, hours: 3000, points: 75000 },
    { name: "Sun", participants: 1150, hours: 2875, points: 71875 },
  ],
  monthly: [
    { name: "Week 1", participants: 950, hours: 14250, points: 356250 },
    { name: "Week 2", participants: 1050, hours: 15750, points: 393750 },
    { name: "Week 3", participants: 1150, hours: 17250, points: 431250 },
    { name: "Week 4", participants: 1250, hours: 18750, points: 468750 },
  ],
  yearly: [
    { name: "Jan", participants: 800, hours: 48000, points: 1200000 },
    { name: "Feb", participants: 850, hours: 51000, points: 1275000 },
    { name: "Mar", participants: 900, hours: 54000, points: 1350000 },
    { name: "Apr", participants: 950, hours: 57000, points: 1425000 },
    { name: "May", participants: 1000, hours: 60000, points: 1500000 },
    { name: "Jun", participants: 1050, hours: 63000, points: 1575000 },
    { name: "Jul", participants: 1100, hours: 66000, points: 1650000 },
    { name: "Aug", participants: 1150, hours: 69000, points: 1725000 },
    { name: "Sep", participants: 1200, hours: 72000, points: 1800000 },
    { name: "Oct", participants: 1250, hours: 75000, points: 1875000 },
    { name: "Nov", participants: 1300, hours: 78000, points: 1950000 },
    { name: "Dec", participants: 1350, hours: 81000, points: 2025000 },
  ],
}

export function WearToEarnMetrics() {
  const [timeRange, setTimeRange] = useState("weekly")
  const [chartType, setChartType] = useState("participants")

  const data = mockData[timeRange as keyof typeof mockData]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="participants">Participants</SelectItem>
              <SelectItem value="hours">Wear Hours</SelectItem>
              <SelectItem value="points">Points Awarded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        {chartType === "participants" ? (
          <ChartContainer
            config={{
              participants: {
                label: "Active Participants",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="var(--color-participants)"
                  name="Active Participants"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : chartType === "hours" ? (
          <ChartContainer
            config={{
              hours: {
                label: "Wear Hours",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="hours" fill="var(--color-hours)" name="Wear Hours" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <ChartContainer
            config={{
              points: {
                label: "Points Awarded",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="points" fill="var(--color-points)" name="Points Awarded" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
    </div>
  )
}
