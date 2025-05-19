import type { Metadata } from "next"
import { Bell, Clock, Mail, User, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Notifications | Prime Phygital",
  description: "Your notification center for Prime Phygital platform",
}

const notifications = [
  {
    id: 1,
    type: "product",
    title: "Your Neon Streak Sneakers were authenticated",
    description: "Authentication verified 2 hours ago",
    time: "2 hours ago",
    read: false,
    icon: Bell,
  },
  {
    id: 2,
    type: "reward",
    title: "You've earned 500 points!",
    description: "For wearing your Neon Streak Sneakers for 5 days",
    time: "Yesterday",
    read: false,
    icon: Mail,
  },
  {
    id: 3,
    type: "system",
    title: "System maintenance scheduled",
    description: "Our platform will be down for maintenance on June 1st from 2AM-4AM UTC",
    time: "2 days ago",
    read: false,
    icon: Info,
  },
  {
    id: 4,
    type: "product",
    title: "Ownership transfer completed",
    description: "Modern Commute Audio has been transferred to your collection",
    time: "3 days ago",
    read: true,
    icon: User,
  },
  {
    id: 5,
    type: "reward",
    title: "Weekly wear streak achieved!",
    description: "You've maintained your wear streak for 7 days",
    time: "5 days ago",
    read: true,
    icon: Clock,
  },
]

export default function NotificationsPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">
            All
            <Badge className="ml-2" variant="secondary">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="product">
            Products
            <Badge className="ml-2" variant="secondary">
              {notifications.filter((n) => n.type === "product").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="reward">
            Rewards
            <Badge className="ml-2" variant="secondary">
              {notifications.filter((n) => n.type === "reward").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="system">
            System
            <Badge className="ml-2" variant="secondary">
              {notifications.filter((n) => n.type === "system").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {["all", "product", "reward", "system"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {notifications
              .filter((n) => tab === "all" || n.type === tab)
              .map((notification) => (
                <Card key={notification.id} className={notification.read ? "bg-background" : "bg-muted/30"}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <notification.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                      </div>
                      {!notification.read && (
                        <Badge variant="default" className="rounded-full">
                          New
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="text-sm mt-1">{notification.description}</CardDescription>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      <Button variant="ghost" size="sm">
                        {notification.read ? "Mark as unread" : "Mark as read"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
