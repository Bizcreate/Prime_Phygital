import type React from "react"
import { CustomerNavbar } from "@/components/customer/customer-navbar"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
