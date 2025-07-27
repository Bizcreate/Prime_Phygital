"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/image-upload"
import { ProductPreview } from "@/components/product-preview"
import { QRCodeCustomizer } from "@/components/qr-code-customizer"
import { SuccessModal } from "@/components/success-modal"
import { Package, Zap, Shield, Smartphone } from "lucide-react"

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  sku: z.string().min(1, "SKU is required"),
  brand: z.string().min(1, "Brand is required"),
  tags: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

export default function CreateProductPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [productImages, setProductImages] = useState<string[]>([])
  const [qrCodeStyle, setQRCodeStyle] = useState({
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    size: 256,
    includeMargin: true,
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdProduct, setCreatedProduct] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const watchedValues = watch()

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        images: productImages,
        qrCode: qrCodeStyle,
        createdAt: new Date().toISOString(),
      }

      setCreatedProduct(newProduct)
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
    "Health & Beauty",
    "Automotive",
    "Books & Media",
    "Toys & Games",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
        <p className="text-muted-foreground">
          Add a new product to your phygital inventory with blockchain authentication
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="step-1" onClick={() => setCurrentStep(1)}>
                <Package className="w-4 h-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="step-2" onClick={() => setCurrentStep(2)}>
                <Smartphone className="w-4 h-4 mr-2" />
                Images
              </TabsTrigger>
              <TabsTrigger value="step-3" onClick={() => setCurrentStep(3)}>
                <Zap className="w-4 h-4 mr-2" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="step-4" onClick={() => setCurrentStep(4)}>
                <Shield className="w-4 h-4 mr-2" />
                Review
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Enter the basic details about your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter product name"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        {...register("sku")}
                        placeholder="Product SKU"
                        className={errors.sku ? "border-red-500" : ""}
                      />
                      {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Describe your product..."
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setValue("category", value)}>
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        {...register("brand")}
                        placeholder="Brand name"
                        className={errors.brand ? "border-red-500" : ""}
                      />
                      {errors.brand && <p className="text-sm text-red-500">{errors.brand.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", { valueAsNumber: true })}
                        placeholder="0.00"
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" {...register("tags")} placeholder="luxury, premium, limited-edition" />
                  </div>

                  <Button onClick={() => setCurrentStep(2)} className="w-full">
                    Continue to Images
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="step-2" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload high-quality images of your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload images={productImages} onImagesChange={setProductImages} maxImages={5} />
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1">
                      Continue to QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="step-3" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Customization</CardTitle>
                  <CardDescription>Customize the appearance of your product's QR code</CardDescription>
                </CardHeader>
                <CardContent>
                  <QRCodeCustomizer
                    style={qrCodeStyle}
                    onStyleChange={setQRCodeStyle}
                    productUrl={`https://prime-phygital.com/product/${watchedValues.sku || "preview"}`}
                  />
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(4)} className="flex-1">
                      Review Product
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="step-4" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review & Create</CardTitle>
                  <CardDescription>Review your product details before creating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Product Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span> {watchedValues.name || "Not set"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">SKU:</span> {watchedValues.sku || "Not set"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category:</span> {watchedValues.category || "Not set"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Brand:</span> {watchedValues.brand || "Not set"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span> ${watchedValues.price || "0.00"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Images:</span> {productImages.length} uploaded
                        </div>
                      </div>
                    </div>

                    {watchedValues.description && (
                      <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground">{watchedValues.description}</p>
                      </div>
                    )}

                    {watchedValues.tags && (
                      <div>
                        <h3 className="font-semibold mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {watchedValues.tags.split(",").map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(3)}>
                        Back
                      </Button>
                      <Button onClick={handleSubmit(onSubmit)} className="flex-1">
                        Create Product
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <ProductPreview
              product={{
                name: watchedValues.name || "Product Name",
                description: watchedValues.description || "Product description will appear here...",
                price: watchedValues.price || 0,
                category: watchedValues.category || "Category",
                brand: watchedValues.brand || "Brand",
                images: productImages,
                sku: watchedValues.sku || "SKU",
              }}
              qrCodeStyle={qrCodeStyle}
            />
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} product={createdProduct} />
    </div>
  )
}
