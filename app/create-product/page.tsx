"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Loader2, Package, Upload, CalendarIcon, CheckCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { createBlockchainService } from "@/services/blockchain-service"

interface ProductFormData {
  name: string
  brand: string
  category: string
  description: string
  serialNumber: string
  manufactureDate: string
  price: string
  image: File | null
}

export default function CreateProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [productName, setProductName] = useState("")
  const [brand, setBrand] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [manufactureDate, setManufactureDate] = useState<Date | undefined>(undefined)
  const [metadata, setMetadata] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [network, setNetwork] = useState("ethereum") // Default network
  const [contractAddress, setContractAddress] = useState("") // Contract address for the selected network
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    category: "",
    description: "",
    serialNumber: "",
    manufactureDate: "",
    price: "",
    image: null,
  })

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))
  }

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.name.trim()) errors.push("Product name is required")
    if (!formData.brand.trim()) errors.push("Brand is required")
    if (!formData.category) errors.push("Category is required")
    if (!formData.description.trim()) errors.push("Description is required")
    if (!formData.serialNumber.trim()) errors.push("Serial number is required")
    if (!formData.manufactureDate) errors.push("Manufacture date is required")
    if (!formData.price.trim()) errors.push("Price is required")

    // Validate price is a number
    if (formData.price && isNaN(Number(formData.price))) {
      errors.push("Price must be a valid number")
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTransactionHash(null)
    setError(null)

    if (!productName || !brand || !serialNumber || !manufactureDate || !privateKey || !network || !contractAddress) {
      setError("Please fill in all required fields.")
      setIsLoading(false)
      return
    }

    try {
      const productId = `${brand}-${serialNumber}` // Simple product ID generation

      const productData = {
        id: productId,
        name: productName,
        brand: brand,
        serialNumber: serialNumber,
        manufactureDate: format(manufactureDate, "yyyy-MM-dd"),
        metadata: metadata,
      }

      // In a real application, you would send this to your backend API route
      // For demo, we'll use the mock blockchain service directly
      const blockchainService = createBlockchainService(network)
      await blockchainService.initialize() // Ensure service is initialized

      const txHash = await blockchainService.registerProduct(productData, privateKey)
      setTransactionHash(txHash)
      toast({
        title: "Product Registered!",
        description: `Transaction: ${txHash.substring(0, 10)}...`,
      })

      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "",
        description: "",
        serialNumber: "",
        manufactureDate: "",
        price: "",
        image: null,
      })

      setProductName("")
      setBrand("")
      setSerialNumber("")
      setManufactureDate(undefined)
      setMetadata("")
      setPrivateKey("")
      setError(null)
    } catch (err) {
      console.error("Error registering product:", err)
      setError(err.message || "Failed to register product on blockchain.")
      toast({
        title: "Registration Failed",
        description: err.message || "Failed to register product.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Register New Product</CardTitle>
          <CardDescription>Register a new physical product on the blockchain.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g., Neon Streak Sneakers"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="e.g., PrimeWear"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  placeholder="e.g., SN-123456789"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufactureDate">Manufacture Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {manufactureDate ? format(manufactureDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={manufactureDate}
                      onSelect={setManufactureDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="luxury">Luxury Goods</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="flex items-center gap-4">
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {formData.image && <p className="text-sm text-muted-foreground">Selected: {formData.image.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="network">Blockchain Network</Label>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum (Goerli)</SelectItem>
                    <SelectItem value="polygon">Polygon (Mumbai)</SelectItem>
                    <SelectItem value="base">Base (Goerli)</SelectItem>
                    {/* Add more networks as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractAddress">Contract Address</Label>
                <Input
                  id="contractAddress"
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="privateKey">Your Wallet Private Key (for signing)</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Enter your private key (e.g., 0x...)"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                ⚠️ For testing only. Never expose private keys in production.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metadata">Additional Metadata (JSON)</Label>
              <Textarea
                id="metadata"
                placeholder='e.g., {"color": "blue", "size": "10"}'
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
                rows={3}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading || isSubmitting} className="flex-1">
                {isLoading || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Create Product
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/products")}
                disabled={isLoading || isSubmitting}
              >
                Cancel
              </Button>
            </div>

            {transactionHash && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  Product registered! Transaction Hash:{" "}
                  <a
                    href={`https://goerli.etherscan.io/tx/${transactionHash}`} // Adjust explorer link based on network
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {transactionHash.substring(0, 10)}...
                  </a>
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
