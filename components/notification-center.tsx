"use client"

import { useState } from "react"
import { Bell, X, Check, Eye, ShoppingBag, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Notification {
  id: string
  type: "scan" | "transfer" | "security" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  productId?: string
  productName?: string
  actionUrl?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "scan",
      title: "Product Scanned",
      message: "Your Limited Edition Sneakers were scanned in New York, USA",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      productId: "PRD001",
      productName: "Limited Edition Sneakers",
      actionUrl: "/product/PRD001",
    },
    {
      id: "2",
      type: "transfer",
      title: "Ownership Transfer Request",
      message: "User 0x1a2b...3c4d has requested to transfer ownership of Designer Handbag",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      productId: "PRD002",
      productName: "Designer Handbag",
      actionUrl: "/transfers",
    },
    {
      id: "3",
      type: "security",
      title: "Suspicious Activity Detected",
      message: "Multiple failed authentication attempts for Limited Edition Watch",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
      productId: "PRD003",
      productName: "Limited Edition Watch",
      actionUrl: "/security",
    },
    {
      id: "4",
      type: "system",
      title: "System Update",
      message: "Prime Phygital Platform has been updated to version 2.1.0",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: "5",
      type: "scan",
      title: "Product Scanned",
      message: "Your Collector's Jacket was scanned in London, UK",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
      read: true,
      productId: "PRD004",
      productName: "Collector's Jacket",
      actionUrl: "/product/PRD004",
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    productScans: true,
    ownershipTransfers: true,
    securityAlerts: true,
    systemUpdates: true,
    emailNotifications: false,
    pushNotifications: true,
  })

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} ${days === 1 ? "day" : "days"} ago`
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "scan":
        return <Eye className="h-5 w-5 text-neon-blue" />
      case "transfer":
        return <ShoppingBag className="h-5 w-5 text-neon-purple" />
      case "security":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "system":
        return <Shield className="h-5 w-5 text-neon-green" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="rounded-full relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon-purple text-xs">
            {unreadCount}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 z-50">
          <Card className="glass-panel border-white/10 bg-black/90 backdrop-blur-lg shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Notifications</CardTitle>
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                  Mark all as read
                </Button>
              </div>
              <CardDescription>Stay updated on your products and account</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[70vh] overflow-y-auto">
              <Tabs defaultValue="all">
                <TabsList className="bg-white/5 mb-4 w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                    {unreadCount > 0 && <Badge className="ml-2 bg-neon-purple text-white">{unreadCount}</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="m-0 space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/50">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg ${notification.read ? "bg-white/5" : "bg-white/10"} relative group`}
                      >
                        <div className="flex gap-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <span className="text-xs text-white/50">{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            <p className="text-sm text-white/70 mt-1">{notification.message}</p>
                            {notification.actionUrl && (
                              <Button
                                variant="link"
                                className="p-0 h-auto text-xs text-neon-blue"
                                onClick={() => {
                                  markAsRead(notification.id)
                                  // Navigate to action URL
                                }}
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="unread" className="m-0 space-y-2">
                  {notifications.filter((n) => !n.read).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/50">No unread notifications</p>
                    </div>
                  ) : (
                    notifications
                      .filter((notification) => !notification.read)
                      .map((notification) => (
                        <div key={notification.id} className="p-3 rounded-lg bg-white/10 relative group">
                          <div className="flex gap-3">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                <span className="text-xs text-white/50">{formatTimestamp(notification.timestamp)}</span>
                              </div>
                              <p className="text-sm text-white/70 mt-1">{notification.message}</p>
                              {notification.actionUrl && (
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-xs text-neon-blue"
                                  onClick={() => {
                                    markAsRead(notification.id)
                                    // Navigate to action URL
                                  }}
                                >
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>

                <TabsContent value="settings" className="m-0 space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Notification Types</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="product-scans" className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-neon-blue" />
                          Product Scans
                        </Label>
                        <Switch
                          id="product-scans"
                          checked={notificationSettings.productScans}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, productScans: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ownership-transfers" className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4 text-neon-purple" />
                          Ownership Transfers
                        </Label>
                        <Switch
                          id="ownership-transfers"
                          checked={notificationSettings.ownershipTransfers}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, ownershipTransfers: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="security-alerts" className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Security Alerts
                        </Label>
                        <Switch
                          id="security-alerts"
                          checked={notificationSettings.securityAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, securityAlerts: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-updates" className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-neon-green" />
                          System Updates
                        </Label>
                        <Switch
                          id="system-updates"
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Delivery Methods</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <Switch
                          id="email-notifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <Switch
                          id="push-notifications"
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4">
              <Button variant="outline" className="w-full border-white/10" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
