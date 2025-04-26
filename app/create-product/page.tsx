"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Upload, Smartphone, Database, Shield, ChevronRight, Check, Eye } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { SuccessModal } from "@/components/success-modal"
import { ProductPreview } from "@/components/product-preview"
import { QRCodeCustomizer } from "@/components/qr-code-customizer"
import { ProductTemplates } from "@/components/product-templates"
import { NotificationCenter } from "@/components/notification-center"

// Define a simpler form schema to avoid potential issues
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .or(z.string().optional()),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .or(z.string().optional()),
  type: z.string().optional(),
  serialNumber: z
    .string()
    .min(1, {
      message: "Serial number is required.",
    })
    .or(z.string().optional()),
  edition: z.string().optional(),
  blockchain: z.string().optional(),
})

export default function CreateProduct() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [productImage, setProductImage] = useState<string | null>(null)

  // Form state for non-form components
  const [nfcContent, setNfcContent] = useState("url")
  const [nftType, setNftType] = useState("erc1155")
  const [passwordProtection, setPasswordProtection] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [encryption, setEncryption] = useState(false)
  const [transferable, setTransferable] = useState(true)
  const [theftProtection, setTheftProtection] = useState(true)
  const [historyTracking, setHistoryTracking] = useState(true)
  const [wearToEarn, setWearToEarn] = useState(false)
  const [socialSharing, setSocialSharing] = useState(false)
  const [communityAccess, setCommunityAccess] = useState(false)
  const [privacyLevel, setPrivacyLevel] = useState("balanced")
  const [anonymousScans, setAnonymousScans] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [newTemplate, setNewTemplate] = useState({ name: "", description: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      serialNumber: "",
      edition: "",
    },
  })

  // Get current form values for preview
  const currentValues = form.watch()

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Combine form values with state values
    const allValues = {
      ...values,
      nfcContent,
      nftType,
      passwordProtection,
      readOnly,
      encryption,
      transferable,
      theftProtection,
      historyTracking,
      wearToEarn,
      socialSharing,
      communityAccess,
      privacyLevel,
      anonymousScans,
      image: productImage,
    }

    // Simulate API call
    setTimeout(() => {
      console.log(allValues)
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }, 2000)
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProductImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProductImage(null)
    }
  }

  const handleTemplateSelect = (template: any) => {
    // Apply template values to form
    form.setValue("name", template.name)
    form.setValue("description", template.description)
    form.setValue("type", template.type)
    form.setValue("blockchain", template.blockchain)

    // Apply template values to state
    setNftType(template.nftType)
    setNfcContent(template.nfcContent)
    setTransferable(template.transferable)
    setTheftProtection(template.theftProtection)
    setHistoryTracking(template.historyTracking)
    setWearToEarn(template.wearToEarn)
    setSocialSharing(template.socialSharing)
    setCommunityAccess(template.communityAccess)
    setPrivacyLevel(template.privacyLevel)

    setShowTemplates(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className={`border-white/10 ${showTemplates ? "bg-white/10" : ""}`}
            onClick={() => {
              setShowTemplates(!showTemplates)
              if (showPreview && !showTemplates) setShowPreview(false)
            }}
          >
            Templates
          </Button>
          <Button
            variant="outline"
            className={`border-white/10 ${showPreview ? "bg-white/10" : ""}`}
            onClick={() => {
              setShowPreview(!showPreview)
              if (showTemplates && !showPreview) setShowTemplates(false)
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <NotificationCenter />
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
          <p className="text-white/70">Create a digital passport for your physical product</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />

            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 1 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  {currentStep > 1 ? <Check className="h-5 w-5" /> : <span>1</span>}
                </div>
                <span className="mt-2 text-sm font-medium">Product Details</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 2 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  {currentStep > 2 ? <Check className="h-5 w-5" /> : <span>2</span>}
                </div>
                <span className="mt-2 text-sm font-medium">NFC Encoding</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 3 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  {currentStep > 3 ? <Check className="h-5 w-5" /> : <span>3</span>}
                </div>
                <span className="mt-2 text-sm font-medium">NFT Minting</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 4 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  <span>4</span>
                </div>
                <span className="mt-2 text-sm font-medium">Asset Vault</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`${showPreview ? "lg:w-1/2" : "w-full"}`}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {currentStep === 1 && (
                  <Card className="glass-panel border-white/10">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-white/10 p-2">
                          <Upload className="h-5 w-5" />
                        </div>
                        <CardTitle>Product Details</CardTitle>
                      </div>
                      <CardDescription>Enter the basic information about your physical product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Limited Edition Sneakers"
                                {...field}
                                className="bg-white/5 border-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your product..."
                                {...field}
                                className="bg-white/5 border-white/10 min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select product type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="glass-panel border-white/10">
                                  <SelectItem value="footwear">Footwear</SelectItem>
                                  <SelectItem value="apparel">Apparel</SelectItem>
                                  <SelectItem value="accessory">Accessory</SelectItem>
                                  <SelectItem value="electronics">Electronics</SelectItem>
                                  <SelectItem value="collectible">Collectible</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="serialNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Serial Number</FormLabel>
                              <FormControl>
                                <Input placeholder="SN-2023-0001" {...field} className="bg-white/5 border-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="edition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Edition (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 1/100" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormDescription>For limited edition products, specify the edition number</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <label className="block text-sm font-medium mb-1">Product Image</label>
                        <ImageUpload onImageChange={handleImageChange} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      >
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {currentStep === 2 && (
                  <Card className="glass-panel border-white/10">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-white/10 p-2">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <CardTitle>NFC Encoding</CardTitle>
                      </div>
                      <CardDescription>Configure the NFC tag settings for your physical product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">NFC Tag Type</h3>
                        <Tabs defaultValue="ntag213">
                          <TabsList className="bg-white/5 mb-6">
                            <TabsTrigger value="ntag213">NTAG 213</TabsTrigger>
                            <TabsTrigger value="ntag215">NTAG 215</TabsTrigger>
                            <TabsTrigger value="ntag216">NTAG 216</TabsTrigger>
                            <TabsTrigger value="custom">Custom</TabsTrigger>
                          </TabsList>

                          <TabsContent value="ntag213" className="m-0">
                            <Card className="bg-white/5 border-white/10">
                              <CardContent className="p-4">
                                <p className="text-sm text-white/70 mb-2">
                                  NTAG 213 has 144 bytes of user memory and is suitable for most product authentication
                                  use cases.
                                </p>
                                <ul className="text-sm space-y-1 list-disc pl-5 text-white/70">
                                  <li>144 bytes user memory</li>
                                  <li>UID mirror functionality</li>
                                  <li>NFC Forum Type 2 Tag compliant</li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="ntag215" className="m-0">
                            <Card className="bg-white/5 border-white/10">
                              <CardContent className="p-4">
                                <p className="text-sm text-white/70 mb-2">
                                  NTAG 215 has 504 bytes of user memory, ideal for more complex product data.
                                </p>
                                <ul className="text-sm space-y-1 list-disc pl-5 text-white/70">
                                  <li>504 bytes user memory</li>
                                  <li>UID mirror functionality</li>
                                  <li>NFC Forum Type 2 Tag compliant</li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="ntag216" className="m-0">
                            <Card className="bg-white/5 border-white/10">
                              <CardContent className="p-4">
                                <p className="text-sm text-white/70 mb-2">
                                  NTAG 216 has 888 bytes of user memory, perfect for rich product experiences.
                                </p>
                                <ul className="text-sm space-y-1 list-disc pl-5 text-white/70">
                                  <li>888 bytes user memory</li>
                                  <li>UID mirror functionality</li>
                                  <li>NFC Forum Type 2 Tag compliant</li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="custom" className="m-0">
                            <Card className="bg-white/5 border-white/10">
                              <CardContent className="p-4">
                                <p className="text-sm text-white/70">
                                  Contact our team for custom NFC tag solutions for your specific requirements.
                                </p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">NFC Content</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="url"
                              type="radio"
                              value="url"
                              checked={nfcContent === "url"}
                              onChange={() => setNfcContent("url")}
                              className="h-4 w-4 border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="url" className="ml-3 block">
                              <span className="font-medium">Dynamic URL</span>
                              <span className="block text-sm text-white/70">
                                Link to a web experience that can be updated over time
                              </span>
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              id="static"
                              type="radio"
                              value="static"
                              checked={nfcContent === "static"}
                              onChange={() => setNfcContent("static")}
                              className="h-4 w-4 border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="static" className="ml-3 block">
                              <span className="font-medium">Static Data</span>
                              <span className="block text-sm text-white/70">
                                Embed fixed information directly on the NFC tag
                              </span>
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              id="blockchain"
                              type="radio"
                              value="blockchain"
                              checked={nfcContent === "blockchain"}
                              onChange={() => setNfcContent("blockchain")}
                              className="h-4 w-4 border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="blockchain" className="ml-3 block">
                              <span className="font-medium">Blockchain Verification</span>
                              <span className="block text-sm text-white/70">
                                Direct link to on-chain verification of the product
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Security Options</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="password-protection"
                                type="checkbox"
                                checked={passwordProtection}
                                onChange={(e) => setPasswordProtection(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="password-protection" className="font-medium">
                                Password Protection
                              </label>
                              <p className="text-sm text-white/70">Require a password to modify the NFC tag content</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="read-only"
                                type="checkbox"
                                checked={readOnly}
                                onChange={(e) => setReadOnly(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="read-only" className="font-medium">
                                Read-Only Mode
                              </label>
                              <p className="text-sm text-white/70">
                                Permanently lock the NFC tag to prevent modifications
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="encryption"
                                type="checkbox"
                                checked={encryption}
                                onChange={(e) => setEncryption(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="encryption" className="font-medium">
                                Data Encryption
                              </label>
                              <p className="text-sm text-white/70">Encrypt the data stored on the NFC tag</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="border-white/10">
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      >
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {currentStep === 3 && (
                  <Card className="glass-panel border-white/10">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-white/10 p-2">
                          <Database className="h-5 w-5" />
                        </div>
                        <CardTitle>NFT Minting</CardTitle>
                      </div>
                      <CardDescription>Configure the blockchain NFT settings for your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="blockchain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blockchain</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                  <SelectValue placeholder="Select blockchain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="glass-panel border-white/10">
                                <SelectItem value="ethereum">Ethereum</SelectItem>
                                <SelectItem value="polygon">Polygon</SelectItem>
                                <SelectItem value="base">Base</SelectItem>
                                <SelectItem value="apechain">Apechain</SelectItem>
                                <SelectItem value="sui">Sui</SelectItem>
                                <SelectItem value="abstract">Abstract</SelectItem>
                                <SelectItem value="vechain">VeChain</SelectItem>
                                <SelectItem value="skale">Skale</SelectItem>
                                <SelectItem value="solana">Solana</SelectItem>
                                <SelectItem value="tron">Tron</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Select the blockchain where your NFT will be minted</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">NFT Type</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="erc1155"
                              type="radio"
                              value="erc1155"
                              checked={nftType === "erc1155"}
                              onChange={() => setNftType("erc1155")}
                              className="h-4 w-4 border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="erc1155" className="ml-3 block">
                              <span className="font-medium">ERC-1155 Dynamic NFT</span>
                              <span className="block text-sm text-white/70">
                                Updatable NFT that can change over time (recommended)
                              </span>
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              id="erc721"
                              type="radio"
                              value="erc721"
                              checked={nftType === "erc721"}
                              onChange={() => setNftType("erc721")}
                              className="h-4 w-4 border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="erc721" className="ml-3 block">
                              <span className="font-medium">ERC-721 Standard NFT</span>
                              <span className="block text-sm text-white/70">
                                Traditional non-fungible token with fixed metadata
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Metadata</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="nft-name" className="block text-sm font-medium mb-1">
                              NFT Name
                            </label>
                            <Input
                              id="nft-name"
                              placeholder="Limited Edition Sneakers #42"
                              className="bg-white/5 border-white/10"
                            />
                          </div>

                          <div>
                            <label htmlFor="nft-description" className="block text-sm font-medium mb-1">
                              NFT Description
                            </label>
                            <Textarea
                              id="nft-description"
                              placeholder="Describe your NFT..."
                              className="bg-white/5 border-white/10 min-h-[100px]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Attributes</label>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <Input placeholder="Trait name" className="bg-white/5 border-white/10" />
                                <Input placeholder="Value" className="bg-white/5 border-white/10" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <Input placeholder="Trait name" className="bg-white/5 border-white/10" />
                                <Input placeholder="Value" className="bg-white/5 border-white/10" />
                              </div>
                              <Button variant="outline" type="button" className="w-full border-white/10">
                                + Add Attribute
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Royalties</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="royalty-percentage" className="block text-sm font-medium mb-1">
                              Royalty Percentage
                            </label>
                            <div className="relative">
                              <Input
                                id="royalty-percentage"
                                type="number"
                                placeholder="5"
                                className="bg-white/5 border-white/10 pr-8"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-white/50">%</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="royalty-address" className="block text-sm font-medium mb-1">
                              Royalty Address
                            </label>
                            <Input id="royalty-address" placeholder="0x..." className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="border-white/10">
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      >
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {currentStep === 4 && (
                  <Card className="glass-panel border-white/10">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-white/10 p-2">
                          <Shield className="h-5 w-5" />
                        </div>
                        <CardTitle>Asset Vault</CardTitle>
                      </div>
                      <CardDescription>Configure security and ownership settings for your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Ownership Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="transferable"
                                type="checkbox"
                                checked={transferable}
                                onChange={(e) => setTransferable(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="transferable" className="font-medium">
                                Transferable Ownership
                              </label>
                              <p className="text-sm text-white/70">
                                Allow the product ownership to be transferred to another user
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="theft-protection"
                                type="checkbox"
                                checked={theftProtection}
                                onChange={(e) => setTheftProtection(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="theft-protection" className="font-medium">
                                Theft Protection
                              </label>
                              <p className="text-sm text-white/70">
                                Enable reporting of lost or stolen items in the Asset Vault
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="history-tracking"
                                type="checkbox"
                                checked={historyTracking}
                                onChange={(e) => setHistoryTracking(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="history-tracking" className="font-medium">
                                History Tracking
                              </label>
                              <p className="text-sm text-white/70">
                                Track and display the complete history of the product
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Social Engagement</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="wear-to-earn"
                                type="checkbox"
                                checked={wearToEarn}
                                onChange={(e) => setWearToEarn(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="wear-to-earn" className="font-medium">
                                Wear-to-Earn
                              </label>
                              <p className="text-sm text-white/70">
                                Enable rewards for product usage and social engagement
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="social-sharing"
                                type="checkbox"
                                checked={socialSharing}
                                onChange={(e) => setSocialSharing(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="social-sharing" className="font-medium">
                                Social Sharing
                              </label>
                              <p className="text-sm text-white/70">
                                Allow users to share their product on social media
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="community-access"
                                type="checkbox"
                                checked={communityAccess}
                                onChange={(e) => setCommunityAccess(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="community-access" className="font-medium">
                                Community Access
                              </label>
                              <p className="text-sm text-white/70">
                                Grant access to exclusive community features for product owners
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="privacy-level" className="block text-sm font-medium mb-1">
                              Privacy Level
                            </label>
                            <select
                              id="privacy-level"
                              value={privacyLevel}
                              onChange={(e) => setPrivacyLevel(e.target.value)}
                              className="w-full rounded-md bg-white/5 border-white/10 py-2 px-3 text-sm"
                            >
                              <option value="public">Public - All information visible</option>
                              <option value="balanced">Balanced - Limited public information</option>
                              <option value="private">Private - Minimal public information</option>
                            </select>
                          </div>

                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="anonymous-scans"
                                type="checkbox"
                                checked={anonymousScans}
                                onChange={(e) => setAnonymousScans(e.target.checked)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor="anonymous-scans" className="font-medium">
                                Anonymous Scans
                              </label>
                              <p className="text-sm text-white/70">
                                Allow users to scan products without revealing their identity
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="border-white/10">
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                      >
                        {isSubmitting ? "Creating..." : "Create Product"}
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </form>
            </Form>
          </div>

          {showPreview && (
            <div className="lg:w-1/2 space-y-6">
              <Card className="glass-panel border-white/10 mb-6">
                <CardHeader>
                  <CardTitle>Product Preview</CardTitle>
                  <CardDescription>Live preview of how your product will appear</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductPreview
                    productData={{
                      name: currentValues.name || "Product Name",
                      description: currentValues.description || "Product description will appear here.",
                      type: currentValues.type || "Not specified",
                      serialNumber: currentValues.serialNumber || "SN-0000-0000",
                      edition: currentValues.edition || "",
                      image: productImage,
                      blockchain: currentValues.blockchain || "Not specified",
                      nftType,
                      nfcContent,
                      transferable,
                      theftProtection,
                      historyTracking,
                      wearToEarn,
                      socialSharing,
                      communityAccess,
                      privacyLevel,
                    }}
                  />
                </CardContent>
              </Card>

              {currentStep === 2 && (
                <QRCodeCustomizer
                  productUrl={`https://primephygital.com/product/${currentValues.serialNumber || "demo"}`}
                />
              )}
            </div>
          )}

          {showTemplates && (
            <div className="lg:w-1/2">
              <ProductTemplates
                onSelectTemplate={handleTemplateSelect}
                onSaveCurrentAsTemplate={() => {
                  setNewTemplate({
                    name: "",
                    description: "",
                  })
                  setIsDialogOpen(true)
                }}
                currentSettings={{
                  name: currentValues.name,
                  description: currentValues.description,
                  type: currentValues.type,
                  blockchain: currentValues.blockchain,
                  nftType,
                  nfcContent,
                  transferable,
                  theftProtection,
                  historyTracking,
                  wearToEarn,
                  socialSharing,
                  communityAccess,
                  privacyLevel,
                }}
              />
            </div>
          )}
        </div>
      </main>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  )
}
