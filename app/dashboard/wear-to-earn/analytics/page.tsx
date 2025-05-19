"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, CalendarIcon, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ProgramPerformance } from "@/components/wear-to-earn/analytics/program-performance"
import { UserEngagement } from "@/components/wear-to-earn/analytics/user-engagement"
import { RewardDistribution } from "@/components/wear-to-earn/analytics/reward-distribution"
import { RetentionAnalysis } from "@/components/wear-to-earn/analytics/retention-analysis"
import { UserSegmentation } from "@/components/wear-to-earn/analytics/user-segmentation"
import { TrendAnalysis } from "@/components/wear-to-earn/analytics/trend-analysis"
import { KpiOverview } from "@/components/wear-to-earn/analytics/kpi-overview"
import { ConversionFunnel } from "@/components/wear-to-earn/analytics/conversion-funnel"

export default function WearToEarnAnalytics() {
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Wear-to-Earn Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={cn("mr-2 h-4 w-4", refreshing && "animate-spin")} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newDate) => setDate(newDate as { from: Date; to: Date })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="sneakers-challenge">Sneakers Challenge</SelectItem>
              <SelectItem value="luxury-watches">Luxury Watches</SelectItem>
              <SelectItem value="designer-bags">Designer Bags</SelectItem>
              <SelectItem value="premium-apparel">Premium Apparel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      <KpiOverview />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:w-[800px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Program Performance Overview</CardTitle>
                <CardDescription>Comparative analysis of all wear-to-earn programs</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ProgramPerformance />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Performance trends over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <TrendAnalysis />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Engagement metrics across programs</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <UserEngagement />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reward Distribution</CardTitle>
                <CardDescription>Points and rewards allocation</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <RewardDistribution />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Performance Details</CardTitle>
              <CardDescription>Detailed metrics for each wear-to-earn program</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <ProgramPerformance detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Details</CardTitle>
                <CardDescription>Detailed user engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <UserEngagement detailed />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Segmentation</CardTitle>
                <CardDescription>User segments by engagement level</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <UserSegmentation />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reward Distribution Analysis</CardTitle>
              <CardDescription>Detailed analysis of points and rewards</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <RewardDistribution detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retention Analysis</CardTitle>
              <CardDescription>User retention metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <RetentionAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey and conversion metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <ConversionFunnel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
