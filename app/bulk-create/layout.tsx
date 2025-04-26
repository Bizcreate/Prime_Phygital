import type React from "react"
import { DashboardNavbar } from "@/components/dashboard-navbar"

export default function BulkCreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
