"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  QrCode,
  Smartphone,
  Eye,
  Bell,
  User,
  Menu,
} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")

  const products = [
    {
      id: "PRD001",
      name: "Limited Edition Sneakers",
      image: "/neon-streak-sneakers.png",
      type: "Footwear",
      status: "Active",
      scans: 128,
      chain: "Ethereum",
      created: "2023-11-15",
    },
    {
      id: "PRD002",
      name: "Designer Handbag",
      image: "/elegant-leather-tote.png",
      type: "Accessory",
      status: "Active",
      scans: 64,
      chain: "Polygon",
      created: "2023-12-03",
    },
    {
      id: "PRD003",
      name: "Limited Edition Watch",
      image: "/elegant-timepiece.png",
      type: "Accessory",
      status: "Active",
      scans: 42,
      chain: "Base",
      created: "2024-01-20",
    },
    {
      id: "PRD004",
      name: "Collector's Jacket",
      image: "/stylish-urban-jacket.png",
      type: "Apparel",
      status: "Inactive",
      scans: 0,
      chain: "Sui",
      created: "2024-02-15",
    },
    {
      id: "PRD005",
      name: "Smart Headphones",
      image: "/modern-commute-audio.png",
      type: "Electronics",
      status: "Active",
      scans: 37,
      chain: "Ethereum",
      created: "2024-03-10",
    },
  ]

  const stats = [
    {
      title: "Total Products",
      value: "156",
      change: "+12%",
      increasing: true,
    },
    {
      title: "Total Scans",
      value: "2,845",
      change: "+24%",
      increasing: true,
    },
    {
      title: "Unique Users",
      value: "1,267",
      change: "+18%",
      increasing: true,
    },
    {
      title: "Engagement Rate",
      value: "68%",
      change: "-3%",
      increasing: false,
    },
  ]

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green opacity-70 blur-sm" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-black">
                <span className="text-xl font-bold text-white">P</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Prime
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                Phygital
              </span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="flex-1 space-y-1 px-3">
            <Link
              href="/dashboard"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-white/10 text-white"
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/products"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Package className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link
              href="/dashboard/customers"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Users className="mr-3 h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 p-4">
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/80 border border-white/10 text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Billing</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-white/70">Welcome back! Here's an overview of your products.</p>
              </div>

              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/create-product" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Create New Product
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-white/10 bg-black/50 backdrop-blur-xl text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-row items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`flex items-center ${stat.increasing ? "text-green-500" : "text-red-500"}`}>
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Products table */}
            <Card className="border-white/10 bg-black/50 backdrop-blur-xl text-white">
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription className="text-white/70">Manage your digital product passports</CardDescription>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-9 bg-white/5 border-white/10 w-full sm:w-[200px] lg:w-[300px]"
                      />
                    </div>

                    <Button variant="outline" size="icon" className="border-white/10">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white/5 mb-6">
                    <TabsTrigger value="all">All Products</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="m-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead>Product</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Scans</TableHead>
                            <TableHead>Chain</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id} className="border-white/10 hover:bg-white/5">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                    <Image
                                      src={product.image || "/placeholder.svg?height=40&width=40&query=product"}
                                      alt={product.name}
                                      width={40}
                                      height={40}
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-xs text-white/50">{product.id}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{product.type}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={product.status === "Active" ? "default" : "secondary"}
                                  className={
                                    product.status === "Active"
                                      ? "bg-green-500/20 text-green-500 border-green-500/30"
                                      : "bg-white/10 text-white/70 border-white/20"
                                  }
                                >
                                  {product.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{product.scans}</TableCell>
                              <TableCell>{product.chain}</TableCell>
                              <TableCell>{product.created}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-black/80 border border-white/10 text-white"
                                  >
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                      <Link href={`/product/${product.id}`} className="flex items-center w-full">
                                        <Eye className="mr-2 h-4 w-4" /> View Details
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                      <QrCode className="mr-2 h-4 w-4" /> View QR Code
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                      <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                      <Edit className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer text-red-500">
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="active" className="m-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead>Product</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Scans</TableHead>
                            <TableHead>Chain</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products
                            .filter((p) => p.status === "Active")
                            .map((product) => (
                              <TableRow key={product.id} className="border-white/10 hover:bg-white/5">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                      <Image
                                        src={product.image || "/placeholder.svg?height=40&width=40&query=product"}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium">{product.name}</p>
                                      <p className="text-xs text-white/50">{product.id}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                                    {product.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{product.scans}</TableCell>
                                <TableCell>{product.chain}</TableCell>
                                <TableCell>{product.created}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="bg-black/80 border border-white/10 text-white"
                                    >
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <Link href={`/product/${product.id}`} className="flex items-center w-full">
                                          <Eye className="mr-2 h-4 w-4" /> View Details
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <QrCode className="mr-2 h-4 w-4" /> View QR Code
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-white/10" />
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer text-red-500">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="inactive" className="m-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead>Product</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Scans</TableHead>
                            <TableHead>Chain</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products
                            .filter((p) => p.status === "Inactive")
                            .map((product) => (
                              <TableRow key={product.id} className="border-white/10 hover:bg-white/5">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                      <Image
                                        src={product.image || "/placeholder.svg?height=40&width=40&query=product"}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium">{product.name}</p>
                                      <p className="text-xs text-white/50">{product.id}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary" className="bg-white/10 text-white/70 border-white/20">
                                    {product.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{product.scans}</TableCell>
                                <TableCell>{product.chain}</TableCell>
                                <TableCell>{product.created}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="bg-black/80 border border-white/10 text-white"
                                    >
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <Link href={`/product/${product.id}`} className="flex items-center w-full">
                                          <Eye className="mr-2 h-4 w-4" /> View Details
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <QrCode className="mr-2 h-4 w-4" /> View QR Code
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-white/10" />
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="focus:bg-white/10 cursor-pointer text-red-500">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-white/10 py-4">
                <p className="text-sm text-white/70">Showing 5 of 156 products</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-white/10" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
