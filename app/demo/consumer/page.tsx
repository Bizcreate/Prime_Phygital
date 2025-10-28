"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Scan, Loader2, QrCode } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createBlockchainService } from "@/services/blockchain-service"

export default function ConsumerDemoPage() {
  const { toast } = useToast()
  const [productId, setProductId] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "failed">("idle")
  const [productDetails, setProductDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isNFCSupported, setIsNFCSupported] = useState(false)

  useEffect(() => {
    // Check for NFC support only on client side
    if (typeof window !== "undefined" && "NDEFReader" in window) {
      setIsNFCSupported(true)
    }
  }, [])

  const handleScanNFC = async () => {
    if (!isNFCSupported) {
      toast({
        title: "NFC Not Supported",
        description: "Your browser or device does not support Web NFC.",
        variant: "destructive",
      })
      return
    }

    setVerificationStatus("verifying")
    setProductDetails(null)
    setError(null)

    try {
      // Ensure NDEFReader is available before trying to instantiate
      if (typeof window === "undefined" || !("NDEFReader" in window)) {
        throw new Error("Web NFC is not supported in this environment.")
      }
      const reader = new (window as any).NDEFReader()
      await reader.scan()
      console.log("NFC scan started...")

      reader.onreading = async (event: any) => {
        const decoder = new TextDecoder()
        for (const record of event.message.records) {
          if (record.recordType === "text") {
            const scannedId = decoder.decode(record.data)
            setProductId(scannedId)
            await verifyProduct(scannedId)
            reader.cancel() // Stop scanning after first read
            break
          }
        }
      }

      reader.onerror = (event: any) => {
        console.error("NFC read error:", event)
        setError("Failed to read NFC tag. Please try again.")
        setVerificationStatus("failed")
        toast({
          title: "NFC Scan Failed",
          description: "Could not read the NFC tag.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      console.error("Error starting NFC scan:", err)
      setError(err.message || "Failed to start NFC scan. Ensure NFC is enabled and permissions are granted.")
      setVerificationStatus("failed")
      toast({
        title: "NFC Scan Error",
        description: err.message || "Failed to start NFC scan.",
        variant: "destructive",
      })
    }
  }

  const verifyProduct = async (id: string) => {
    setVerificationStatus("verifying")
    setProductDetails(null)
    setError(null)

    try {
      // In a real app, you'd fetch this from your backend API route
      // For demo, we'll use a mock blockchain service
      const blockchainService = createBlockchainService(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK || "ethereum")
      await blockchainService.initialize() // Ensure service is initialized

      const result = await blockchainService.verifyProduct(id)

      if (result.isValid) {
        setVerificationStatus("success")
        setProductDetails(result.productData)
        toast({
          title: "Product Verified!",
          description: "This product is authentic.",
          variant: "default",
        })
      } else {
        setVerificationStatus("failed")
        setError(result.error || "Product verification failed.")
        toast({
          title: "Verification Failed",
          description: result.error || "This product could not be verified.",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error during product verification:", err)
      setVerificationStatus("failed")
      setError("An unexpected error occurred during verification.")
      toast({
        title: "Verification Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    }
  }

  const handleManualVerify = () => {
    if (productId) {
      verifyProduct(productId)
    } else {
      toast({
        title: "Missing Product ID",
        description: "Please enter a product ID to verify.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Product Verification</CardTitle>
          <CardDescription>Scan an NFC tag or enter a product ID to verify authenticity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              {isNFCSupported ? (
                <Button onClick={handleScanNFC} disabled={verificationStatus === "verifying"} className="flex-1">
                  {verificationStatus === "verifying" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning NFC...
                    </>
                  ) : (
                    <>
                      <Scan className="mr-2 h-4 w-4" /> Scan NFC Product
                    </>
                  )}
                </Button>
              ) : (
                <Button disabled className="flex-1">
                  <Scan className="mr-2 h-4 w-4" /> NFC Not Supported
                </Button>
              )}
            </div>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productId">Manual Product ID</Label>
              <Input
                id="productId"
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={verificationStatus === "verifying"}
              />
              <Button onClick={handleManualVerify} disabled={verificationStatus === "verifying"} className="w-full">
                {verificationStatus === "verifying" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" /> Verify Product ID
                  </>
                )}
              </Button>
            </div>
          </div>

          {verificationStatus === "success" && productDetails && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Authentic Product</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                This product has been successfully verified on the blockchain.
              </p>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Name:</strong> {productDetails.name}
                </p>
                <p>
                  <strong>Brand:</strong> {productDetails.brand}
                </p>
                <p>
                  <strong>Serial:</strong> {productDetails.serialNumber}
                </p>
                <p>
                  <strong>Manufacture Date:</strong> {productDetails.manufactureDate}
                </p>
              </div>
            </div>
          )}

          {verificationStatus === "failed" && error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <XCircle className="h-5 w-5" />
                <span className="font-semibold">Verification Failed</span>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
