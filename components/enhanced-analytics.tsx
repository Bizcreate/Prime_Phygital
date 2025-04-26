"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, Download, BarChart3, PieChart, MapPin, TrendingUp, Users, Clock } from "lucide-react"

export function EnhancedAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [productFilter, setProductFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Analytics</h2>
          <p className="text-white/70">Detailed insights into your product performance</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white/5 border-white/10">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </div>
            </SelectTrigger>
            <SelectContent className="glass-panel border-white/10">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white/5 border-white/10">
              <div className="flex items-center">
                <ChevronDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Products" />
              </div>
            </SelectTrigger>
            <SelectContent className="glass-panel border-white/10">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="footwear">Footwear</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="collectibles">Collectibles</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-white/10">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-panel border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Scans</p>
                <p className="text-3xl font-bold">2,845</p>
              </div>
              <div className="flex items-center text-neon-green">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">+24%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Unique Users</p>
                <p className="text-3xl font-bold">1,267</p>
              </div>
              <div className="flex items-center text-neon-green">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">+18%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Avg. Engagement Time</p>
                <p className="text-3xl font-bold">2:34</p>
              </div>
              <div className="flex items-center text-neon-green">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">+7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Conversion Rate</p>
                <p className="text-3xl font-bold">5.2%</p>
              </div>
              <div className="flex items-center text-neon-purple">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">+2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <BarChart3 className="h-5 w-5 text-neon-blue" />
                  </div>
                  <CardTitle>Scan Activity</CardTitle>
                </div>
                <CardDescription>Product scan activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Scan activity chart visualization</p>
                    <p className="text-xs text-white/30 mt-2">Shows scan frequency over the selected time period</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <PieChart className="h-5 w-5 text-neon-purple" />
                  </div>
                  <CardTitle>Product Distribution</CardTitle>
                </div>
                <CardDescription>Distribution of scans by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Product distribution chart visualization</p>
                    <p className="text-xs text-white/30 mt-2">Shows percentage breakdown by product type</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-white/10 p-2">
                  <TrendingUp className="h-5 w-5 text-neon-green" />
                </div>
                <CardTitle>Top Performing Products</CardTitle>
              </div>
              <CardDescription>Products with the highest engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/50">Top products performance visualization</p>
                  <p className="text-xs text-white/30 mt-2">
                    Ranks products by scan count, engagement time, and conversion rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <Clock className="h-5 w-5 text-neon-blue" />
                  </div>
                  <CardTitle>Engagement Duration</CardTitle>
                </div>
                <CardDescription>Time spent interacting with product experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Engagement duration visualization</p>
                    <p className="text-xs text-white/30 mt-2">Shows average time spent by users on product pages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <Users className="h-5 w-5 text-neon-purple" />
                  </div>
                  <CardTitle>User Retention</CardTitle>
                </div>
                <CardDescription>Returning users and repeat engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">User retention visualization</p>
                    <p className="text-xs text-white/30 mt-2">Shows percentage of users who return after first scan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-white/10 p-2">
                  <TrendingUp className="h-5 w-5 text-neon-green" />
                </div>
                <CardTitle>Engagement Funnel</CardTitle>
              </div>
              <CardDescription>User journey from scan to conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/50">Engagement funnel visualization</p>
                  <p className="text-xs text-white/30 mt-2">
                    Tracks user flow from initial scan through various engagement points
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6 m-0">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-white/10 p-2">
                  <MapPin className="h-5 w-5 text-neon-blue" />
                </div>
                <CardTitle>Global Scan Distribution</CardTitle>
              </div>
              <CardDescription>Product scan locations worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/50">Geographic scan distribution map</p>
                  <p className="text-xs text-white/30 mt-2">Interactive world map showing scan density by region</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <BarChart3 className="h-5 w-5 text-neon-purple" />
                  </div>
                  <CardTitle>Top Locations</CardTitle>
                </div>
                <CardDescription>Cities with highest scan activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Top locations chart</p>
                    <p className="text-xs text-white/30 mt-2">Ranks cities and regions by scan frequency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <Clock className="h-5 w-5 text-neon-green" />
                  </div>
                  <CardTitle>Scan Time Analysis</CardTitle>
                </div>
                <CardDescription>Scan activity by time of day and day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Scan time heatmap</p>
                    <p className="text-xs text-white/30 mt-2">Shows peak scanning times across different time zones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <Users className="h-5 w-5 text-neon-blue" />
                  </div>
                  <CardTitle>Age Distribution</CardTitle>
                </div>
                <CardDescription>User age demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Age distribution chart</p>
                    <p className="text-xs text-white/30 mt-2">Shows percentage breakdown of users by age group</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-white/10 p-2">
                    <PieChart className="h-5 w-5 text-neon-purple" />
                  </div>
                  <CardTitle>Interest Categories</CardTitle>
                </div>
                <CardDescription>User interests and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50">Interest categories visualization</p>
                    <p className="text-xs text-white/30 mt-2">Shows common interests among your product users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-full bg-white/10 p-2">
                  <TrendingUp className="h-5 w-5 text-neon-green" />
                </div>
                <CardTitle>User Segmentation</CardTitle>
              </div>
              <CardDescription>Detailed breakdown of user types and behaviors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/50">User segmentation visualization</p>
                  <p className="text-xs text-white/30 mt-2">
                    Categorizes users based on engagement patterns and preferences
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
