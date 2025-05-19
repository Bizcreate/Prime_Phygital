import type React from "react"
import { CustomerNavbar } from "@/components/customer/customer-navbar"
import { NotificationProvider } from "@/contexts/notification-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Dashboard | Prime Phygital",
  description: "Manage your phygital products and rewards",
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col">
        <CustomerNavbar />
        <main className="flex-1 bg-muted/30">{children}</main>
      </div>
    </NotificationProvider>
  )
}
