"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react"

export default function GetStartedPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    website: "",
    name: "",
    email: "",
    phone: "",
    productType: "",
    productCount: "",
    useCase: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setStep(4) // Success step
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="container py-12 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Get Started with Prime Phygital</h1>
          <p className="text-white/70">
            Complete the form below to start your journey into the world of phygital products
          </p>
        </div>

        <div className="mb-10">
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />

            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= 1 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  {step > 1 ? <Check className="h-5 w-5" /> : <span>1</span>}
                </div>
                <span className="mt-2 text-sm font-medium">Business Info</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= 2 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  {step > 2 ? <Check className="h-5 w-5" /> : <span>2</span>}
                </div>
                <span className="mt-2 text-sm font-medium">Product Details</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= 3 ? "bg-neon-purple border-neon-purple" : "bg-white/5 border-white/20"
                  }`}
                >
                  {step > 3 ? <Check className="h-5 w-5" /> : <span>3</span>}
                </div>
                <span className="mt-2 text-sm font-medium">Requirements</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium">
                    Business Name
                  </label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </label>
                  <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                      <SelectItem value="luxury">Luxury Goods</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="art">Art & Design</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="sports">Sports & Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-medium">
                    Website (Optional)
                  </label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourcompany.com"
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
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

          {step === 2 && (
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Tell us about the products you want to tokenize</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="productType" className="text-sm font-medium">
                    Product Type
                  </label>
                  <Select
                    value={formData.productType}
                    onValueChange={(value) => handleSelectChange("productType", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="footwear">Footwear</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="mixed">Mixed Products</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="productCount" className="text-sm font-medium">
                    Estimated Product Quantity
                  </label>
                  <Select
                    value={formData.productCount}
                    onValueChange={(value) => handleSelectChange("productCount", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select quantity range" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="1-10">1-10 products</SelectItem>
                      <SelectItem value="11-100">11-100 products</SelectItem>
                      <SelectItem value="101-1000">101-1,000 products</SelectItem>
                      <SelectItem value="1001-10000">1,001-10,000 products</SelectItem>
                      <SelectItem value="10000+">10,000+ products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="useCase" className="text-sm font-medium">
                    Primary Use Case
                  </label>
                  <Select value={formData.useCase} onValueChange={(value) => handleSelectChange("useCase", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select primary use case" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/10">
                      <SelectItem value="authentication">Product Authentication</SelectItem>
                      <SelectItem value="supply-chain">Supply Chain Tracking</SelectItem>
                      <SelectItem value="loyalty">Customer Loyalty Program</SelectItem>
                      <SelectItem value="wear-to-earn">Wear-to-Earn Program</SelectItem>
                      <SelectItem value="collectible">Digital Collectibles</SelectItem>
                      <SelectItem value="resale">Resale Verification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-sm font-medium mb-4">Blockchain Preferences (Select all that apply)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Ethereum", "Polygon", "Base", "Apechain", "Sui", "Other"].map((chain) => (
                      <div key={chain} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`chain-${chain.toLowerCase()}`}
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                        />
                        <label htmlFor={`chain-${chain.toLowerCase()}`} className="text-sm">
                          {chain}
                        </label>
                      </div>
                    ))}
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

          {step === 3 && (
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle>Additional Requirements</CardTitle>
                <CardDescription>Help us understand your specific needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-4">Features of Interest (Select all that apply)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "NFC Tag Encoding",
                      "NFT Minting",
                      "Asset Vault",
                      "Theft Protection",
                      "Wear-to-Earn",
                      "Analytics Dashboard",
                      "Mobile App",
                      "API Integration",
                      "White Label Solution",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                        />
                        <label htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Additional Information
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project, requirements, or any questions you have..."
                    className="bg-white/5 border-white/10 min-h-[150px]"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                  />
                  <label htmlFor="consent" className="text-sm text-white/70">
                    I agree to be contacted about Prime Phygital products and services. See our{" "}
                    <Link href="/privacy" className="text-neon-blue hover:text-neon-purple">
                      Privacy Policy
                    </Link>{" "}
                    for more details.
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} className="border-white/10">
                  Previous
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  Submit Request
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card className="glass-panel border-white/10 text-center">
              <CardContent className="pt-10 pb-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neon-green/20">
                  <Check className="h-10 w-10 text-neon-green" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Request Submitted Successfully!</h2>
                <p className="text-white/70 mb-8">
                  Thank you for your interest in Prime Phygital. Our team will review your information and contact you
                  within 1-2 business days.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild variant="outline" className="border-white/10">
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                    <Link href="/demo">
                      View Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>

        {step < 4 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-panel border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Image src="/classic-shield.png" alt="Authentication" width={24} height={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Product Authentication</h3>
                  <p className="text-sm text-white/70">
                    Verify authenticity with blockchain-backed digital certificates
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Image src="/modern-smartphone-icon.png" alt="NFC Technology" width={24} height={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">NFC Technology</h3>
                  <p className="text-sm text-white/70">
                    Connect physical products to digital experiences with NFC tags
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Image src="/interconnected-blocks.png" alt="Multi-Chain Support" width={24} height={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Multi-Chain Support</h3>
                  <p className="text-sm text-white/70">Deploy on ETH, Polygon, Base, Apechain, Sui, and more</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
