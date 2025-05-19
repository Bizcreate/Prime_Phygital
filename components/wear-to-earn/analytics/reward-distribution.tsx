"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for reward distribution by type
const rewardTypeData = [
  { name: "Exclusive Products", value: 35 },
  { name: "Discounts", value: 25 },
  { name: "Early Access", value: 20 },
  { name: "Digital Assets", value: 15 },
  { name: "Event Tickets", value: 5 },
]

// Mock data for points distribution by program
const pointsDistributionData = [
  { name: "Sneakers Challenge", points: 58500, percentage: 45.5 },
  { name: "Luxury Watches", points: 36000, percentage: 28.0 },
  { name: "Designer Bags", points: 25200, percentage: 19.6 },
  { name: "Premium Apparel", points: 8850, percentage: 6.9 },
]

// Mock data for redemption history
const redemptionHistoryData = [
  { month: "Jan", redemptions: 18 },
  { month: "Feb", redemptions: 22 },
  { month: "Mar", redemptions: 28 },
  { month: "Apr", redemptions: 25 },
  { month: "May", redemptions: 32 },
  { month: "Jun", redemptions: 38 },
  { month: "Jul", redemptions: 42 },
  { month: "Aug", redemptions: 48 },
]

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function RewardDistribution({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="space-y-4">
      {!detailed ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="h-[300px]">
            <h4 className="text-sm font-medium mb-2">Reward Types</h4>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={rewardTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {rewardTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[300px]">
            <h4 className="text-sm font-medium mb-2">Points by Program</h4>
            <ChartContainer
              config={{
                points: {
                  label: "Points",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pointsDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="points" fill="var(--color-points)" name="Points" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[300px]">
              <h4 className="text-sm font-medium mb-2">Reward Types Distribution</h4>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={rewardTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {rewardTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[300px]">
              <h4 className="text-sm font-medium mb-2">Redemption History</h4>
              <ChartContainer
                config={{
                  redemptions: {
                    label: "Redemptions",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={redemptionHistoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="redemptions" fill="var(--color-redemptions)" name="Redemptions" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Points Distribution by Program</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Points Awarded</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointsDistributionData.map((program) => (
                    <TableRow key={program.name}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>{program.points.toLocaleString()}</TableCell>
                      <TableCell>{program.percentage}%</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            program.percentage > 30
                              ? "bg-green-100 text-green-800 border-green-300"
                              : program.percentage > 15
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : "bg-yellow-100 text-yellow-800 border-yellow-300"
                          }
                        >
                          {program.percentage > 30
                            ? "High Distribution"
                            : program.percentage > 15
                              ? "Medium Distribution"
                              : "Low Distribution"}
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
