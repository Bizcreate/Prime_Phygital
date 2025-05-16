"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Award, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ScheduledContentCalendar } from "@/components/social-engagement/scheduled-content-calendar"
import { EngagementMetrics } from "@/components/social-engagement/engagement-metrics"
import { ActiveChallenges } from "@/components/social-engagement/active-challenges"
import { ContentPerformance } from "@/components/social-engagement/content-performance"

export default function SocialEngagementDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Social Engagement Hub</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/social-engagement/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Content
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">4 posts this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Points Awarded</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,550</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>User engagement across all social activities</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <EngagementMetrics />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
                <CardDescription>Currently running challenges and quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                <ActiveChallenges />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Effectiveness of different content types</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentPerformance />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>Manage your scheduled social media posts and challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduledContentCalendar />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Challenges & Interactive Content</CardTitle>
                <CardDescription>Manage your challenges, quizzes, and interactive content</CardDescription>
              </div>
              <Link href="/dashboard/social-engagement/create-challenge">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Challenge
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Challenge list would go here */}
                <p className="text-center text-muted-foreground py-8">Loading challenges...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Analytics</CardTitle>
              <CardDescription>Detailed metrics on user engagement and points earned</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              {/* Analytics content would go here */}
              <p className="text-center text-muted-foreground py-8">Loading analytics...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Engagement Settings</CardTitle>
              <CardDescription>Configure your social engagement and wear-to-earn settings</CardDescription>
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
