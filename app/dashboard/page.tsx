"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Package,
  Users,
  AlertCircle,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  CoinsIcon,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const handleCreateProduct = () => {
    toast({
      title: "Action triggered",
      description: "Navigating to create product page",
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search initiated",
      description: "Searching for products...",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="hidden md:flex">
            <Input placeholder="Search products..." className="w-[200px] lg:w-[300px]" />
          </form>
          <Link href="/create-product">
            <Button onClick={handleCreateProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/products" className="text-xs text-blue-500 flex items-center">
                  View all products
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/customers" className="text-xs text-blue-500 flex items-center">
                  View all customers
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Authentications</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">+24% from last month</p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/analytics" className="text-xs text-blue-500 flex items-center">
                  View analytics
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-2 from last month</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-xs text-blue-500 flex items-center p-0 h-auto"
                  onClick={() => {
                    toast({
                      title: "Viewing alerts",
                      description: "Navigating to alerts page",
                    })
                  }}
                >
                  View all alerts
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>Your recently added products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Neon Streak Sneakers", date: "2 days ago", status: "Active" },
                    { name: "Elegant Timepiece", date: "5 days ago", status: "Active" },
                    { name: "Stylish Urban Jacket", date: "1 week ago", status: "Inactive" },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.date}</p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/products">
                  <Button variant="outline">View All Products</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/create-product">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Product
                  </Button>
                </Link>
                <Link href="/dashboard/social-engagement">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Social Engagement Hub
                  </Button>
                </Link>
                <Link href="/dashboard/notifications">
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Manage Notifications
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Link href="/dashboard/settings/verification">
                  <Button className="w-full justify-start" variant="outline">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Verification Methods
                  </Button>
                </Link>
                <Link href="/dashboard/staking">
                  <Button className="w-full justify-start" variant="outline">
                    <CoinsIcon className="mr-2 h-4 w-4" />
                    Token Staking
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>View detailed analytics about your products and customers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard will appear here</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/analytics">
                <Button>View Full Analytics</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports about your products and customers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Reports will appear here</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  toast({
                    title: "Report Generated",
                    description: "Your report has been generated successfully",
                  })
                }}
              >
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences and view recent notifications</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Notifications will appear here</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/notifications">
                <Button>Manage Notifications</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
