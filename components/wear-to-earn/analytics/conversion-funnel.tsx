"use client"

import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for conversion funnel
const funnelData = [
  { name: "Program Awareness", value: 5000, fill: "#8884d8" },
  { name: "Program Registration", value: 3200, fill: "#83a6ed" },
  { name: "First Product Scan", value: 2800, fill: "#8dd1e1" },
  { name: "First Wear Session", value: 2200, fill: "#82ca9d" },
  { name: "Regular Engagement", value: 1500, fill: "#a4de6c" },
  { name: "Reward Redemption", value: 800, fill: "#d0ed57" },
]

// Mock data for conversion rates
const conversionRates = [
  {
    stage: "Awareness to Registration",
    rate: 64,
    previousRate: 60,
    change: 4,
    status: "Improved",
  },
  {
    stage: "Registration to First Scan",
    rate: 87.5,
    previousRate: 85,
    change: 2.5,
    status: "Improved",
  },
  {
    stage: "First Scan to First Wear",
    rate: 78.6,
    previousRate: 75,
    change: 3.6,
    status: "Improved",
  },
  {
    stage: "First Wear to Regular Engagement",
    rate: 68.2,
    previousRate: 70,
    change: -1.8,
    status: "Declined",
  },
  {
    stage: "Regular Engagement to Redemption",
    rate: 53.3,
    previousRate: 50,
    change: 3.3,
    status: "Improved",
  },
]

export function ConversionFunnel() {
  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conversion Stage</TableHead>
              <TableHead>Current Rate</TableHead>
              <TableHead>Previous Rate</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversionRates.map((rate) => (
              <TableRow key={rate.stage}>
                <TableCell className="font-medium">{rate.stage}</TableCell>
                <TableCell>{rate.rate}%</TableCell>
                <TableCell>{rate.previousRate}%</TableCell>
                <TableCell className={rate.change > 0 ? "text-green-600" : "text-red-600"}>
                  {rate.change > 0 ? "+" : ""}
                  {rate.change}%
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      rate.status === "Improved"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    }
                  >
                    {rate.status}
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
