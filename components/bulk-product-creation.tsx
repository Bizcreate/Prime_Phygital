"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Download, FileSpreadsheet, Upload, X, Plus, Trash, Edit, Copy } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface BulkProductCreationProps {
  onSubmit: (products: any[]) => void
  onCancel: () => void
}

export function BulkProductCreation({ onSubmit, onCancel }: BulkProductCreationProps) {
  const [activeTab, setActiveTab] = useState("manual")
  const [products, setProducts] = useState<any[]>([
    {
      id: "1",
      name: "Limited Edition Sneakers",
      serialNumber: "SN-2023-0001",
      type: "footwear",
      edition: "1/100",
      blockchain: "ethereum",
    },
  ])
  const [newProduct, setNewProduct] = useState({
    name: "",
    serialNumber: "",
    type: "footwear",
    edition: "",
    blockchain: "ethereum",
  })
  const [bulkSettings, setBulkSettings] = useState({
    nfcContent: "url",
    nftType: "erc1155",
    transferable: true,
    theftProtection: true,
    historyTracking: true,
    wearToEarn: false,
    socialSharing: false,
    communityAccess: false,
    privacyLevel: "balanced",
  })
  const [csvData, setCsvData] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.serialNumber) return

    const product = {
      id: Date.now().toString(),
      ...newProduct,
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      serialNumber: "",
      type: "footwear",
      edition: "",
      blockchain: "ethereum",
    })
  }

  const handleEditProduct = (id: string) => {
    const product = products.find((p) => p.id === id)
    if (!product) return

    setEditingId(id)
    setNewProduct({
      name: product.name,
      serialNumber: product.serialNumber,
      type: product.type,
      edition: product.edition,
      blockchain: product.blockchain,
    })
  }

  const handleUpdateProduct = () => {
    if (!editingId) return

    const updatedProducts = products.map((product) =>
      product.id === editingId
        ? {
            ...product,
            ...newProduct,
          }
        : product,
    )

    setProducts(updatedProducts)
    setEditingId(null)
    setNewProduct({
      name: "",
      serialNumber: "",
      type: "footwear",
      edition: "",
      blockchain: "ethereum",
    })
  }

  const handleDuplicateProduct = (id: string) => {
    const product = products.find((p) => p.id === id)
    if (!product) return

    const newSerialNumber = `${product.serialNumber}-copy`

    const duplicatedProduct = {
      ...product,
      id: Date.now().toString(),
      serialNumber: newSerialNumber,
      name: `${product.name} (Copy)`,
    }

    setProducts([...products, duplicatedProduct])
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const csvText = event.target?.result as string
      setCsvData(csvText)

      // Parse CSV and convert to products
      const lines = csvText.split("\n")
      const headers = lines[0].split(",")

      const nameIndex = headers.findIndex((h) => h.trim().toLowerCase() === "name")
      const serialNumberIndex = headers.findIndex((h) => h.trim().toLowerCase() === "serialnumber")
      const typeIndex = headers.findIndex((h) => h.trim().toLowerCase() === "type")
      const editionIndex = headers.findIndex((h) => h.trim().toLowerCase() === "edition")
      const blockchainIndex = headers.findIndex((h) => h.trim().toLowerCase() === "blockchain")

      if (nameIndex === -1 || serialNumberIndex === -1) {
        alert("CSV must contain at least 'name' and 'serialNumber' columns")
        return
      }

      const parsedProducts = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line, index) => {
          const values = line.split(",")
          return {
            id: (Date.now() + index).toString(),
            name: values[nameIndex]?.trim() || "",
            serialNumber: values[serialNumberIndex]?.trim() || "",
            type: typeIndex !== -1 ? values[typeIndex]?.trim() || "footwear" : "footwear",
            edition: editionIndex !== -1 ? values[editionIndex]?.trim() || "" : "",
            blockchain: blockchainIndex !== -1 ? values[blockchainIndex]?.trim() || "ethereum" : "ethereum",
          }
        })
        .filter((product) => product.name && product.serialNumber)

      setProducts(parsedProducts)
    }
    reader.readAsText(file)
  }

  const handleDownloadTemplate = () => {
    const csvContent =
      "name,serialNumber,type,edition,blockchain\nLimited Edition Sneakers,SN-2023-0001,footwear,1/100,ethereum\nDesigner Handbag,SN-2023-0002,accessory,,polygon"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "product_template.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = () => {
    if (products.length === 0) return

    setIsSubmitting(true)

    // Combine products with bulk settings
    const productsWithSettings = products.map((product) => ({
      ...product,
      ...bulkSettings,
    }))

    // Simulate API call
    setTimeout(() => {
      onSubmit(productsWithSettings)
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>Bulk Product Creation</CardTitle>
          <CardDescription>Create multiple products at once</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white/5 mb-6">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              <TabsTrigger value="settings">Bulk Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      placeholder="Limited Edition Sneakers"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serial-number">Serial Number</Label>
                    <Input
                      id="serial-number"
                      placeholder="SN-2023-0001"
                      value={newProduct.serialNumber}
                      onChange={(e) => setNewProduct({ ...newProduct, serialNumber: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-type">Product Type</Label>
                    <Select
                      value={newProduct.type}
                      onValueChange={(value) => setNewProduct({ ...newProduct, type: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10">
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="accessory">Accessory</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="collectible">Collectible</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edition">Edition (Optional)</Label>
                    <Input
                      id="edition"
                      placeholder="e.g. 1/100"
                      value={newProduct.edition}
                      onChange={(e) => setNewProduct({ ...newProduct, edition: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockchain">Blockchain</Label>
                    <Select
                      value={newProduct.blockchain}
                      onValueChange={(value) => setNewProduct({ ...newProduct, blockchain: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel border-white/10">
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                        <SelectItem value="solana">Solana</SelectItem>
                        <SelectItem value="tron">Tron</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  {editingId ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-white/10"
                        onClick={() => {
                          setEditingId(null)
                          setNewProduct({
                            name: "",
                            serialNumber: "",
                            type: "footwear",
                            edition: "",
                            blockchain: "ethereum",
                          })
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpdateProduct}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Update Product
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleAddProduct}
                      className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  )}
                </div>
              </div>

              <div className="border border-white/10 rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-white/5 hover:bg-white/10">
                      <TableHead>Name</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden md:table-cell">Edition</TableHead>
                      <TableHead className="hidden md:table-cell">Blockchain</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-white/50">
                          No products added yet. Add your first product above.
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-white/5">
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.serialNumber}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.type}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.edition || "-"}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.blockchain}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditProduct(product.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDuplicateProduct(product.id)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="csv" className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-8">
                  <FileSpreadsheet className="h-12 w-12 text-white/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
                  <p className="text-sm text-white/70 text-center mb-4">
                    Upload a CSV file with product details. The file should include columns for name, serialNumber,
                    type, edition, and blockchain.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10" onClick={handleDownloadTemplate}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                    <div className="relative">
                      <Button
                        variant="default"
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CSV
                      </Button>
                      <input
                        type="file"
                        accept=".csv"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleCsvUpload}
                      />
                    </div>
                  </div>
                </div>

                {csvData && (
                  <div className="space-y-2">
                    <Label>CSV Preview</Label>
                    <Textarea value={csvData} readOnly className="bg-white/5 border-white/10 h-32 font-mono text-xs" />
                  </div>
                )}

                {products.length > 0 && (
                  <div className="border border-white/10 rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-white/5 hover:bg-white/10">
                          <TableHead>Name</TableHead>
                          <TableHead>Serial Number</TableHead>
                          <TableHead className="hidden md:table-cell">Type</TableHead>
                          <TableHead className="hidden md:table-cell">Edition</TableHead>
                          <TableHead className="hidden md:table-cell">Blockchain</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id} className="hover:bg-white/5">
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.serialNumber}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.type}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.edition || "-"}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.blockchain}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-base">NFC & NFT Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nfc-content">NFC Content</Label>
                        <Select
                          value={bulkSettings.nfcContent}
                          onValueChange={(value) => setBulkSettings({ ...bulkSettings, nfcContent: value })}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Select NFC content type" />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-white/10">
                            <SelectItem value="url">Dynamic URL</SelectItem>
                            <SelectItem value="static">Static Data</SelectItem>
                            <SelectItem value="blockchain">Blockchain Verification</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nft-type">NFT Type</Label>
                        <Select
                          value={bulkSettings.nftType}
                          onValueChange={(value) => setBulkSettings({ ...bulkSettings, nftType: value })}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Select NFT type" />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-white/10">
                            <SelectItem value="erc1155">ERC-1155 Dynamic NFT</SelectItem>
                            <SelectItem value="erc721">ERC-721 Standard NFT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-base">Ownership & Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="transferable" className="cursor-pointer">
                          Transferable Ownership
                        </Label>
                        <Switch
                          id="transferable"
                          checked={bulkSettings.transferable}
                          onCheckedChange={(checked) => setBulkSettings({ ...bulkSettings, transferable: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="theft-protection" className="cursor-pointer">
                          Theft Protection
                        </Label>
                        <Switch
                          id="theft-protection"
                          checked={bulkSettings.theftProtection}
                          onCheckedChange={(checked) => setBulkSettings({ ...bulkSettings, theftProtection: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="history-tracking" className="cursor-pointer">
                          History Tracking
                        </Label>
                        <Switch
                          id="history-tracking"
                          checked={bulkSettings.historyTracking}
                          onCheckedChange={(checked) => setBulkSettings({ ...bulkSettings, historyTracking: checked })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-base">Social & Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wear-to-earn" className="cursor-pointer">
                          Wear-to-Earn
                        </Label>
                        <Switch
                          id="wear-to-earn"
                          checked={bulkSettings.wearToEarn}
                          onCheckedChange={(checked) => setBulkSettings({ ...bulkSettings, wearToEarn: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="social-sharing" className="cursor-pointer">
                          Social Sharing
                        </Label>
                        <Switch
                          id="social-sharing"
                          checked={bulkSettings.socialSharing}
                          onCheckedChange={(checked) => setBulkSettings({ ...bulkSettings, socialSharing: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="community-access" className="cursor-pointer">
                          Community Access
                        </Label>
                        <Switch
                          id="community-access"
                          checked={bulkSettings.communityAccess}
                          onCheckedChange={(checked) => setBulkSettings({ ...bulkSettings, communityAccess: checked })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="privacy-level">Privacy Level</Label>
                      <Select
                        value={bulkSettings.privacyLevel}
                        onValueChange={(value) => setBulkSettings({ ...bulkSettings, privacyLevel: value })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select privacy level" />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-white/10">
                          <SelectItem value="public">Public - All information visible</SelectItem>
                          <SelectItem value="balanced">Balanced - Limited public information</SelectItem>
                          <SelectItem value="private">Private - Minimal public information</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-4">
          <Button variant="outline" className="border-white/10" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={products.length === 0 || isSubmitting}
            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
          >
            {isSubmitting ? "Creating Products..." : `Create ${products.length} Products`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
