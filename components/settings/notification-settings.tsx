"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    productScans: true,
    newCustomers: true,
    securityAlerts: true,
    marketingUpdates: false,
  })

  const handleToggle = (setting: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [setting]: checked }))
  }

  const handleSavePreferences = () => {
    console.log("Saving notification preferences:", notifications)
    // You would typically send this data to your API here
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Product Scans</p>
              <p className="text-sm text-white/70">Receive notifications when your products are scanned</p>
            </div>
            <Switch
              checked={notifications.productScans}
              onCheckedChange={(checked) => handleToggle("productScans", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Customers</p>
              <p className="text-sm text-white/70">Receive notifications when new customers register</p>
            </div>
            <Switch
              checked={notifications.newCustomers}
              onCheckedChange={(checked) => handleToggle("newCustomers", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-sm text-white/70">Receive notifications about security events</p>
            </div>
            <Switch
              checked={notifications.securityAlerts}
              onCheckedChange={(checked) => handleToggle("securityAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Updates</p>
              <p className="text-sm text-white/70">Receive updates about new features and promotions</p>
            </div>
            <Switch
              checked={notifications.marketingUpdates}
              onCheckedChange={(checked) => handleToggle("marketingUpdates", checked)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSavePreferences}
          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
        >
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
