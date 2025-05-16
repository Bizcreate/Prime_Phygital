"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for engagement metrics
const mockData = {
  weekly: [
    { name: "Mon", posts: 12, challenges: 8, quizzes: 5, points: 1250 },
    { name: "Tue", posts: 18, challenges: 10, quizzes: 7, points: 1800 },
    { name: "Wed", posts: 15, challenges: 12, quizzes: 9, points: 2200 },
    { name: "Thu", posts: 20, challenges: 15, quizzes: 8, points: 2500 },
    { name: "Fri", posts: 25, challenges: 18, quizzes: 12, points: 3000 },
    { name: "Sat", posts: 22, challenges: 20, quizzes: 15, points: 3500 },
    { name: "Sun", posts: 18, challenges: 15, quizzes: 10, points: 2800 },
  ],
  monthly: [
    { name: "Week 1", posts: 85, challenges: 45, quizzes: 30, points: 8000 },
    { name: "Week 2", posts: 95, challenges: 55, quizzes: 35, points: 9500 },
    { name: "Week 3", posts: 110, challenges: 65, quizzes: 40, points: 11000 },
    { name: "Week 4", posts: 130, challenges: 75, quizzes: 50, points: 13500 },
  ],
  yearly: [
    { name: "Jan", posts: 350, challenges: 180, quizzes: 120, points: 32000 },
    { name: "Feb", posts: 380, challenges: 200, quizzes: 130, points: 35000 },
    { name: "Mar", posts: 420, challenges: 220, quizzes: 140, points: 38000 },
    { name: "Apr", posts: 450, challenges: 240, quizzes: 150, points: 42000 },
    { name: "May", posts: 480, challenges: 260, quizzes: 160, points: 45000 },
    { name: "Jun", posts: 510, challenges: 280, quizzes: 170, points: 48000 },
    { name: "Jul", posts: 540, challenges: 300, quizzes: 180, points: 52000 },
    { name: "Aug", posts: 570, challenges: 320, quizzes: 190, points: 55000 },
    { name: "Sep", posts: 600, challenges: 340, quizzes: 200, points: 58000 },
    { name: "Oct", posts: 630, challenges: 360, quizzes: 210, points: 62000 },
    { name: "Nov", posts: 660, challenges: 380, quizzes: 220, points: 65000 },
    { name: "Dec", posts: 690, challenges: 400, quizzes: 230, points: 68000 },
  ],
}

export function EngagementMetrics() {
  const [timeRange, setTimeRange] = useState("weekly")
  const [dataType, setDataType] = useState("engagement")

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

          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="points">Points Awarded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        {dataType === "engagement" ? (
          <ChartContainer
            config={{
              posts: {
                label: "Posts",
                color: "hsl(var(--chart-1))",
              },
              challenges: {
                label: "Challenges",
                color: "hsl(var(--chart-2))",
              },
              quizzes: {
                label: "Quizzes",
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
                <Bar dataKey="posts" fill="var(--color-posts)" name="Posts" />
                <Bar dataKey="challenges" fill="var(--color-challenges)" name="Challenges" />
                <Bar dataKey="quizzes" fill="var(--color-quizzes)" name="Quizzes" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <ChartContainer
            config={{
              points: {
                label: "Points Awarded",
                color: "hsl(var(--chart-1))",
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
