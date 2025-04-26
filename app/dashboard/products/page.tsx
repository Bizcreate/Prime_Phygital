"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Edit, Trash2, QrCode, Smartphone, Eye, Search, Filter, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { QRCodeModal } from "@/components/qr-code-modal"
import { NFCSettingsModal } from "@/components/nfc-settings-modal"
import { ShareProductModal } from "@/components/share-product-modal"

export default function ProductsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showQrModal, setShowQrModal] = useState(false)
  const [showNfcModal, setShowNfcModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

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

  const filteredProducts = products.filter((product) => {
    // Filter by tab
    if (activeTab !== "all" && product.status.toLowerCase() !== activeTab) {
      return false
    }

    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  const handleViewProduct = (product: any) => {
    router.push(`/product/${product.id}`)
  }

  const handleViewQRCode = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProduct(product)
    setShowQrModal(true)
  }

  const handleNFCSettings = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProduct(product)
    setShowNfcModal(true)
  }

  const handleShareProduct = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProduct(product)
    setShowShareModal(true)
  }

  const handleEditProduct = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, this would navigate to an edit page
    alert(`Edit product: ${product.name}`)
  }

  const handleDeleteProduct = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, this would show a confirmation dialog
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      alert(`Product ${product.name} deleted`)
    }
  }

  // Custom status badge component that doesn't use form components
  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "Active") {
      return (
        <div className="inline-flex items-center rounded-full border border-neon-green/30 bg-neon-green/20 px-2.5 py-0.5 text-xs font-semibold text-neon-green">
          {status}
        </div>
      )
    } else {
      return (
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/70">
          {status}
        </div>
      )
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-white/70">Manage your digital product passports</p>
        </div>

        <Link href="/create-product" passHref>
          <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" /> Create New Product
          </Button>
        </Link>
      </div>

      <Card className="glass-panel border-white/10">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your digital product passports</CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 bg-white/5 border-white/10 w-full sm:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                    {filteredProducts.map((product) => (
                      <TableRow
                        key={product.id}
                        className="border-white/10 hover:bg-white/5 cursor-pointer"
                        onClick={() => handleViewProduct(product)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
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
                          <StatusBadge status={product.status} />
                        </TableCell>
                        <TableCell>{product.scans}</TableCell>
                        <TableCell>{product.chain}</TableCell>
                        <TableCell>{product.created}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="glass-panel border-white/10 bg-black/80 backdrop-blur-md"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleViewProduct(product)}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleViewQRCode(product, e)}
                              >
                                <QrCode className="mr-2 h-4 w-4" /> View QR Code
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleNFCSettings(product, e)}
                              >
                                <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleEditProduct(product, e)}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10 text-red-500"
                                onClick={(e) => handleDeleteProduct(product, e)}
                              >
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
                    {filteredProducts.map((product) => (
                      <TableRow
                        key={product.id}
                        className="border-white/10 hover:bg-white/5 cursor-pointer"
                        onClick={() => handleViewProduct(product)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
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
                          <StatusBadge status={product.status} />
                        </TableCell>
                        <TableCell>{product.scans}</TableCell>
                        <TableCell>{product.chain}</TableCell>
                        <TableCell>{product.created}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="glass-panel border-white/10 bg-black/80 backdrop-blur-md"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleViewProduct(product)}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleViewQRCode(product, e)}
                              >
                                <QrCode className="mr-2 h-4 w-4" /> View QR Code
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleNFCSettings(product, e)}
                              >
                                <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleEditProduct(product, e)}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10 text-red-500"
                                onClick={(e) => handleDeleteProduct(product, e)}
                              >
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
                    {filteredProducts.map((product) => (
                      <TableRow
                        key={product.id}
                        className="border-white/10 hover:bg-white/5 cursor-pointer"
                        onClick={() => handleViewProduct(product)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
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
                          <StatusBadge status={product.status} />
                        </TableCell>
                        <TableCell>{product.scans}</TableCell>
                        <TableCell>{product.chain}</TableCell>
                        <TableCell>{product.created}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="glass-panel border-white/10 bg-black/80 backdrop-blur-md"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleViewProduct(product)}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleViewQRCode(product, e)}
                              >
                                <QrCode className="mr-2 h-4 w-4" /> View QR Code
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleNFCSettings(product, e)}
                              >
                                <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10"
                                onClick={(e) => handleEditProduct(product, e)}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-white/10 text-red-500"
                                onClick={(e) => handleDeleteProduct(product, e)}
                              >
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
          <p className="text-sm text-white/70">Showing {filteredProducts.length} of 156 products</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-white/10" disabled={true}>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-white/10">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modals */}
      {selectedProduct && (
        <>
          <QRCodeModal
            isOpen={showQrModal}
            onClose={() => setShowQrModal(false)}
            productId={selectedProduct.id}
            productName={selectedProduct.name}
            serialNumber={selectedProduct.id}
          />

          <NFCSettingsModal
            isOpen={showNfcModal}
            onClose={() => setShowNfcModal(false)}
            productId={selectedProduct.id}
            productName={selectedProduct.name}
            serialNumber={selectedProduct.id}
          />

          <ShareProductModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            productId={selectedProduct.id}
            productName={selectedProduct.name}
            productImage={selectedProduct.image}
          />
        </>
      )}
    </div>
  )
}
