"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Users, Clock, Award, Gift, Zap, BarChart } from "lucide-react"

export function KpiOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">Active Participants</p>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between space-y-0 pt-2">
            <h3 className="text-2xl font-bold">1,284</h3>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>12.5%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">vs. previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">Total Wear Hours</p>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between space-y-0 pt-2">
            <h3 className="text-2xl font-bold">18,450</h3>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>8.2%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">vs. previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">Points Awarded</p>
            <Award className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between space-y-0 pt-2">
            <h3 className="text-2xl font-bold">128,550</h3>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>18.2%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">vs. previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">Rewards Redeemed</p>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between space-y-0 pt-2">
            <h3 className="text-2xl font-bold">245</h3>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>5.8%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">vs. previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between space-y-0 pt-2">
            <h3 className="text-2xl font-bold">68.4%</h3>
            <div className="flex items-center text-sm text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>2.1%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">vs. previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-y-0">
            <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between space-y-0 pt-2">
            <h3 className="text-2xl font-bold">78.2%</h3>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>3.5%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">vs. previous period</p>
        </CardContent>
      </Card>
    </div>
  )
}
