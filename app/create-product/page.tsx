"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ImageUpload } from "@/components/image-upload"
import { ProductPreview } from "@/components/product-preview"
import { QRCodeCustomizer } from "@/components/qr-code-customizer"
import { SuccessModal } from "@/components/success-modal"
import { Package, Smartphone, QrCode, Shield, Zap } from "lucide-react"

interface ProductFormData {
  name: string
  brand: string
  description: string
  category: string
  price: string
  serialNumber: string
  manufactureDate: string
  images: string[]
  nfcEnabled: boolean
  blockchainEnabled: boolean
  wearToEarnEnabled: boolean
  qrCodeStyle: string
  qrCodeColor: string
}

export default function CreateProductPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    description: "",
    category: "",
    price: "",
    serialNumber: "",
    manufactureDate: new Date().toISOString().split("T")[0],
    images: [],
    nfcEnabled: true,
    blockchainEnabled: true,
    wearToEarnEnabled: false,
    qrCodeStyle: "square",
    qrCodeColor: "#000000",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdProductId, setCreatedProductId] = useState<string>("")

  // Form validation
  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.name.trim()) errors.push("Product name is required")
    if (!formData.brand.trim()) errors.push("Brand is required")
    if (!formData.description.trim()) errors.push("Description is required")
    if (!formData.category) errors.push("Category is required")
    if (!formData.price.trim()) errors.push("Price is required")
    if (!formData.serialNumber.trim()) errors.push("Serial number is required")
    if (!formData.manufactureDate) errors.push("Manufacture date is required")

    // Validate price format
    if (formData.price && isNaN(Number(formData.price))) {
      errors.push("Price must be a valid number")
    }

    return errors
  }

  const handleInputChange = (field: keyof ProductFormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateSerialNumber = () => {
    const prefix = formData.brand ? formData.brand.substring(0, 3).toUpperCase() : "PRD"
    const timestamp = Date.now().toString().substring(-6)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()

    handleInputChange("serialNumber", `${prefix}-${timestamp}-${random}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to create product
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a mock product ID
      const productId = `PROD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

      setCreatedProductId(productId)
      setShowSuccessModal(true)

      toast({
        title: "Product Created Successfully",
        description: `Product ${formData.name} has been created with ID: ${productId}`,
      })
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    router.push("/dashboard/products")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Product</h1>
          <p className="text-muted-foreground mt-2">
            Add a new product to your phygital inventory with NFC and blockchain integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Product Information
                </CardTitle>
                <CardDescription>Basic details about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your product..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="luxury">Luxury Goods</SelectItem>
                        <SelectItem value="collectibles">Collectibles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Serial Number *</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="serialNumber"
                        value={formData.serialNumber}
                        onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                        placeholder="Enter serial number"
                      />
                      <Button type="button" variant="outline" onClick={generateSerialNumber}>
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manufactureDate">Manufacture Date *</Label>
                    <Input
                      id="manufactureDate"
                      type="date"
                      value={formData.manufactureDate}
                      onChange={(e) => handleInputChange("manufactureDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload images of your product (up to 5 images)</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => handleInputChange("images", images)}
                  maxImages={5}
                />
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Product Features</CardTitle>
                <CardDescription>Enable advanced features for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nfcEnabled"
                    checked={formData.nfcEnabled}
                    onCheckedChange={(checked) => handleInputChange("nfcEnabled", Boolean(checked))}
                  />
                  <Label htmlFor="nfcEnabled" className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    NFC Integration
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="blockchainEnabled"
                    checked={formData.blockchainEnabled}
                    onCheckedChange={(checked) => handleInputChange("blockchainEnabled", Boolean(checked))}
                  />
                  <Label htmlFor="blockchainEnabled" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Blockchain Authentication
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wearToEarnEnabled"
                    checked={formData.wearToEarnEnabled}
                    onCheckedChange={(checked) => handleInputChange("wearToEarnEnabled", Boolean(checked))}
                  />
                  <Label htmlFor="wearToEarnEnabled" className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Wear-to-Earn Program
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  QR Code Customization
                </CardTitle>
                <CardDescription>Customize the appearance of your product's QR code</CardDescription>
              </CardHeader>
              <CardContent>
                <QRCodeCustomizer
                  style={formData.qrCodeStyle}
                  color={formData.qrCodeColor}
                  onStyleChange={(style) => handleInputChange("qrCodeStyle", style)}
                  onColorChange={(color) => handleInputChange("qrCodeColor", color)}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
              size="lg"
            >
              {isSubmitting ? "Creating Product..." : "Create Product"}
            </Button>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Preview</CardTitle>
                <CardDescription>See how your product will appear to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductPreview
                  name={formData.name || "Product Name"}
                  brand={formData.brand || "Brand Name"}
                  description={formData.description || "Product description will appear here..."}
                  price={formData.price || "0.00"}
                  images={formData.images}
                  category={formData.category || "Category"}
                  serialNumber={formData.serialNumber || "Serial Number"}
                  features={{
                    nfc: formData.nfcEnabled,
                    blockchain: formData.blockchainEnabled,
                    wearToEarn: formData.wearToEarnEnabled,
                  }}
                  qrCode={{
                    style: formData.qrCodeStyle,
                    color: formData.qrCodeColor,
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        productId={createdProductId}
        productName={formData.name}
      />
    </div>
  )
}
