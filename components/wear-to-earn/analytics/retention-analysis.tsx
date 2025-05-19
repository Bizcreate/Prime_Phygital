"use client"

import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts"
import { HeatMap, HeatMapGrid, HeatMapLegend } from "@/components/ui/heatmap"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for retention over time
const retentionData = [
  { week: "Week 1", retention: 100 },
  { week: "Week 2", retention: 85 },
  { week: "Week 3", retention: 78 },
  { week: "Week 4", retention: 72 },
  { week: "Week 5", retention: 68 },
  { week: "Week 6", retention: 65 },
  { week: "Week 7", retention: 62 },
  { week: "Week 8", retention: 60 },
]

// Mock data for cohort retention
const cohortData = [
  { name: "Jan Cohort", week1: 100, week2: 85, week3: 75, week4: 68, week5: 62, week6: 58, week7: 55, week8: 52 },
  { name: "Feb Cohort", week1: 100, week2: 88, week3: 78, week4: 70, week5: 65, week6: 60, week7: 58, week8: 55 },
  { name: "Mar Cohort", week1: 100, week2: 90, week3: 82, week4: 75, week5: 70, week6: 66, week7: 63, week8: 60 },
  { name: "Apr Cohort", week1: 100, week2: 92, week3: 85, week4: 78, week5: 73, week6: 70, week7: 67, week8: 65 },
  { name: "May Cohort", week1: 100, week2: 94, week3: 88, week4: 82, week5: 78, week6: 75, week7: 72, week8: 70 },
]

// Mock data for churn reasons
const churnData = [
  { reason: "Lack of Rewards", percentage: 35 },
  { reason: "Technical Issues", percentage: 25 },
  { reason: "Lost Interest", percentage: 20 },
  { reason: "Competing Programs", percentage: 15 },
  { reason: "Other", percentage: 5 },
]

// Mock data for heatmap
const heatmapData = [
  [100, 85, 75, 68, 62, 58, 55, 52],
  [100, 88, 78, 70, 65, 60, 58, 55],
  [100, 90, 82, 75, 70, 66, 63, 60],
  [100, 92, 85, 78, 73, 70, 67, 65],
  [100, 94, 88, 82, 78, 75, 72, 70],
]

export function RetentionAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[300px]">
          <h4 className="text-sm font-medium mb-2">Retention Over Time</h4>
          <ChartContainer
            config={{
              retention: {
                label: "Retention Rate",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="retention"
                  stroke="var(--color-retention)"
                  fill="var(--color-retention)"
                  fillOpacity={0.3}
                  name="Retention Rate"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="h-[300px]">
          <h4 className="text-sm font-medium mb-2">Churn Reasons</h4>
          <ChartContainer
            config={{
              percentage: {
                label: "Percentage",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="reason" type="category" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentage" fill="var(--color-percentage)" name="Percentage" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Cohort Retention Analysis</h4>
        <div className="h-[250px]">
          <HeatMap
            data={heatmapData}
            xLabels={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"]}
            yLabels={["Jan Cohort", "Feb Cohort", "Mar Cohort", "Apr Cohort", "May Cohort"]}
          >
            <HeatMapGrid />
            <HeatMapLegend title="Retention %" />
          </HeatMap>
        </div>
      </div>
    </div>
  )
}
