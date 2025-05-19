"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for user segments
const segmentData = [
  { name: "Power Users", value: 15, description: "Users with daily engagement and high wear time" },
  { name: "Regular Users", value: 35, description: "Users with consistent weekly engagement" },
  { name: "Casual Users", value: 30, description: "Users with occasional engagement" },
  { name: "At-Risk Users", value: 20, description: "Users with declining engagement" },
]

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Mock data for segment metrics
const segmentMetrics = [
  {
    segment: "Power Users",
    users: 192,
    avgWearTime: 4.5,
    avgPoints: 135,
    retention: 95,
    status: "Excellent",
  },
  {
    segment: "Regular Users",
    users: 449,
    avgWearTime: 2.8,
    avgPoints: 84,
    retention: 82,
    status: "Good",
  },
  {
    segment: "Casual Users",
    users: 385,
    avgWearTime: 1.2,
    avgPoints: 36,
    retention: 65,
    status: "Average",
  },
  {
    segment: "At-Risk Users",
    users: 258,
    avgWearTime: 0.5,
    avgPoints: 15,
    retention: 35,
    status: "Poor",
  },
]

export function UserSegmentation() {
  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {segmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Segment</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Avg. Wear Time (h/day)</TableHead>
              <TableHead>Avg. Points/Week</TableHead>
              <TableHead>Retention</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segmentMetrics.map((segment) => (
              <TableRow key={segment.segment}>
                <TableCell className="font-medium">{segment.segment}</TableCell>
                <TableCell>{segment.users}</TableCell>
                <TableCell>{segment.avgWearTime}</TableCell>
                <TableCell>{segment.avgPoints}</TableCell>
                <TableCell>{segment.retention}%</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      segment.status === "Excellent"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : segment.status === "Good"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : segment.status === "Average"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : "bg-red-100 text-red-800 border-red-300"
                    }
                  >
                    {segment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
