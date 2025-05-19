"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Notification = {
  id: number
  read: boolean
  title: string
  description: string
  time: string
  type: string
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: number) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "product",
      title: "Your Neon Streak Sneakers were authenticated",
      description: "Authentication verified 2 hours ago",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "reward",
      title: "You've earned 500 points!",
      description: "For wearing your Neon Streak Sneakers for 5 days",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      type: "system",
      title: "System maintenance scheduled",
      description: "Our platform will be down for maintenance on June 1st from 2AM-4AM UTC",
      time: "2 days ago",
      read: false,
    },
    {
      id: 4,
      type: "product",
      title: "Ownership transfer completed",
      description: "Modern Commute Audio has been transferred to your collection",
      time: "3 days ago",
      read: true,
    },
  ])

  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
