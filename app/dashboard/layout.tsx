import type React from "react"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { UserProvider } from "@/contexts/user-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <DashboardNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </UserProvider>
  )
}
