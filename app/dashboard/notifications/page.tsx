"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, BellOff, CheckCircle, Clock, Settings, Smartphone, Volume2 } from "lucide-react"
import { PushNotifications } from "@/components/push-notifications"

export default function NotificationsPage() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    productScans: true,
    ownershipTransfers: true,
    securityAlerts: true,
    platformUpdates: false,
    marketplaceActivity: true,
    dailyDigest: false,
  })

  const togglePreference = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Push Notifications</h1>
            <p className="text-white/70">Manage your notification preferences and push notification settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="setup">
              <TabsList className="bg-white/5 mb-6">
                <TabsTrigger value="setup" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Setup
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="space-y-6">
                <PushNotifications
                  onSubscribe={() => console.log("Subscribed to push notifications")}
                  onUnsubscribe={() => console.log("Unsubscribed from push notifications")}
                />
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose which notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Product Scans</Label>
                        <p className="text-sm text-white/70">Receive notifications when your products are scanned</p>
                      </div>
                      <Switch
                        checked={notificationPreferences.productScans}
                        onCheckedChange={() => togglePreference("productScans")}
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Ownership Transfers</Label>
                        <p className="text-sm text-white/70">Notifications about ownership transfer requests</p>
                      </div>
                      <Switch
                        checked={notificationPreferences.ownershipTransfers}
                        onCheckedChange={() => togglePreference("ownershipTransfers")}
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Security Alerts</Label>
                        <p className="text-sm text-white/70">Alerts about suspicious activities with your products</p>
                      </div>
                      <Switch
                        checked={notificationPreferences.securityAlerts}
                        onCheckedChange={() => togglePreference("securityAlerts")}
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Platform Updates</Label>
                        <p className="text-sm text-white/70">Updates about new features and platform changes</p>
                      </div>
                      <Switch
                        checked={notificationPreferences.platformUpdates}
                        onCheckedChange={() => togglePreference("platformUpdates")}
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketplace Activity</Label>
                        <p className="text-sm text-white/70">Updates about marketplace listings and sales</p>
                      </div>
                      <Switch
                        checked={notificationPreferences.marketplaceActivity}
                        onCheckedChange={() => togglePreference("marketplaceActivity")}
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base">Daily Digest</Label>
                        <p className="text-sm text-white/70">A daily summary of all activities</p>
                      </div>
                      <Switch
                        checked={notificationPreferences.dailyDigest}
                        onCheckedChange={() => togglePreference("dailyDigest")}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <CardTitle>Notification Channels</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-neon-purple" />
                        </div>
                        <div>
                          <h3 className="font-medium">Browser Push</h3>
                          <p className="text-sm text-white/70">Real-time notifications in your browser</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-white/10">
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-neon-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium">Mobile Push</h3>
                          <p className="text-sm text-white/70">Notifications on your mobile device</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-white/10">
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Volume2 className="h-5 w-5 text-neon-green" />
                        </div>
                        <div>
                          <h3 className="font-medium">Sound Alerts</h3>
                          <p className="text-sm text-white/70">Audio notifications for important events</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-white/10">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <CardTitle>Notification History</CardTitle>
                    <CardDescription>Your recent notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="rounded-full bg-white/10 p-2 mt-1">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                            <h3 className="font-medium">Product Authentication</h3>
                            <div className="text-white/70 text-sm">20 minutes ago</div>
                          </div>
                          <p className="text-sm text-white/80">
                            Your Limited Edition Sneakers (SN-2023-0001) were successfully authenticated in New York.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="rounded-full bg-white/10 p-2 mt-1">
                          <Smartphone className="h-5 w-5 text-neon-blue" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                            <h3 className="font-medium">NFC Scan Detected</h3>
                            <div className="text-white/70 text-sm">3 hours ago</div>
                          </div>
                          <p className="text-sm text-white/80">
                            Your Designer Handbag (SN-2023-0002) was scanned for verification.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="rounded-full bg-white/10 p-2 mt-1">
                          <BellOff className="h-5 w-5 text-white/70" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                            <h3 className="font-medium">Push Notifications Enabled</h3>
                            <div className="text-white/70 text-sm">Yesterday</div>
                          </div>
                          <p className="text-sm text-white/80">
                            You've successfully enabled push notifications for this device.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle>Notification Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Total Notifications</h3>
                    <p className="text-2xl font-bold">183</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-neon-purple" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Product Scans</span>
                    <span className="text-sm font-medium">78</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-neon-purple h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Alerts</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Platform Updates</span>
                    <span className="text-sm font-medium">35</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-neon-blue h-2 rounded-full" style={{ width: "19%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">58</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-neon-green h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <h3 className="font-medium mb-1">Enable Browser Notifications</h3>
                  <p className="text-sm text-white/80">
                    Make sure to allow browser notifications to receive real-time updates about your products.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <h3 className="font-medium mb-1">Mobile App Sync</h3>
                  <p className="text-sm text-white/80">
                    Install our mobile app to receive notifications on your phone even when you're not browsing.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <h3 className="font-medium mb-1">Customize Preferences</h3>
                  <p className="text-sm text-white/80">
                    Adjust your notification preferences to only receive the alerts that matter most to you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
