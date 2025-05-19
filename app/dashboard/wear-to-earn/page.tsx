"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Award, Clock, TrendingUp, Filter, Download } from "lucide-react"
import Link from "next/link"
import { WearToEarnMetrics } from "@/components/wear-to-earn/wear-to-earn-metrics"
import { ActivePrograms } from "@/components/wear-to-earn/active-programs"
import { UserParticipation } from "@/components/wear-to-earn/user-participation"
import { VerificationQueue } from "@/components/wear-to-earn/verification-queue"

export default function WearToEarnDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Wear-to-Earn Management</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/wear-to-earn/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Program
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Daily Wear Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8h</div>
                <p className="text-xs text-muted-foreground">+0.5h from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Points Awarded</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128,550</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Wear-to-Earn Metrics</CardTitle>
                <CardDescription>Participation and engagement across all programs</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <WearToEarnMetrics />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Active Programs</CardTitle>
                <CardDescription>Currently running wear-to-earn programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivePrograms />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Participation</CardTitle>
                  <CardDescription>Top participants and engagement metrics</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <UserParticipation />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Wear-to-Earn Programs</CardTitle>
                <CardDescription>Manage your wear-to-earn programs and challenges</CardDescription>
              </div>
              <Link href="/dashboard/wear-to-earn/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Program
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Program list would go here */}
                <p className="text-center text-muted-foreground py-8">Loading programs...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Participants</CardTitle>
              <CardDescription>Users participating in wear-to-earn programs</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              {/* Participants list would go here */}
              <p className="text-center text-muted-foreground py-8">Loading participants...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Queue</CardTitle>
              <CardDescription>Pending verifications for wear-to-earn activities</CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationQueue />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wear-to-Earn Settings</CardTitle>
              <CardDescription>Configure your wear-to-earn program settings</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Settings content would go here */}
              <p className="text-center text-muted-foreground py-8">Loading settings...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
