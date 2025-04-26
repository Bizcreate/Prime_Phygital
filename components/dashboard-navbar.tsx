"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, CircleUser, Home, LogOut, Menu, Package, Search, Settings, Users, BarChart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function DashboardNavbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  const isActive = (path: string) => {
    return pathname === path
  }

  const clearNotifications = () => {
    setNotificationCount(0)
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read.",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text">
              Prime<span className="text-white">Phygital</span>
            </span>
          </Link>
        </div>

        <nav
          className={`mx-6 hidden md:flex md:items-center md:gap-5 lg:gap-6 ${isMobileMenuOpen ? "flex" : "hidden"}`}
        >
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/dashboard") ? "text-white" : "text-white/60"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/dashboard/products") ? "text-white" : "text-white/60"
            }`}
          >
            Products
          </Link>
          <Link
            href="/dashboard/customers"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/dashboard/customers") ? "text-white" : "text-white/60"
            }`}
          >
            Customers
          </Link>
          <Link
            href="/dashboard/analytics"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/dashboard/analytics") ? "text-white" : "text-white/60"
            }`}
          >
            Analytics
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/profile") ? "text-white" : "text-white/60"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/dashboard/staking"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/dashboard/staking") ? "text-white" : "text-white/60"
            }`}
          >
            Staking
          </Link>
          <Link
            href="/dashboard/settings"
            className={`text-sm font-medium transition-colors hover:text-white ${
              isActive("/dashboard/settings") ? "text-white" : "text-white/60"
            }`}
          >
            Settings
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 bg-white/5 border-white/10 text-white"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              if (notificationCount > 0) {
                clearNotifications()
              } else {
                toast({
                  title: "No New Notifications",
                  description: "You have no new notifications at this time.",
                })
              }
            }}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-neon-purple text-[10px] font-medium flex items-center justify-center">
                {notificationCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-black border border-white/10 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer" onClick={() => (window.location.href = "/profile")}>
                <CircleUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => (window.location.href = "/dashboard")}>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/products")}
              >
                <Package className="mr-2 h-4 w-4" />
                <span>Products</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/customers")}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>Customers</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/analytics")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="cursor-pointer text-red-500"
                onClick={() => (window.location.href = "/login")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
