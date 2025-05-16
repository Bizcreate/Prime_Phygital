"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Smartphone, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ScanPage() {
  const { toast } = useToast()
  const [scanState, setScanState] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [productData, setProductData] = useState<any>(null)

  const handleScan = () => {
    setScanState("scanning")

    // Simulate scanning process
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo

      if (success) {
        setProductData({
          name: "Neon Streak Sneakers",
          brand: "Urban Athletics",
          serialNumber: "NS-" + Math.floor(Math.random() * 10000),
          manufactureDate: "January 15, 2025",
          image: "/neon-streak-sneakers.png",
        })
        setScanState("success")
        toast({
          title: "Product Authenticated",
          description: "This product has been verified as authentic",
        })
      } else {
        setScanState("error")
        toast({
          title: "Authentication Failed",
          description: "Unable to verify this product. Please try again.",
          variant: "destructive",
        })
      }
    }, 2000)
  }

  const resetScan = () => {
    setScanState("idle")
    setProductData(null)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Scan Product</h2>
        <p className="text-muted-foreground">Authenticate and add products to your collection</p>
      </div>

      <Tabs defaultValue="nfc" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="nfc">NFC Scan</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
        </TabsList>

        <TabsContent value="nfc">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>NFC Authentication</CardTitle>
              <CardDescription>Hold your phone near the NFC tag on your product to authenticate</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              {scanState === "idle" && (
                <>
                  <div className="relative h-48 w-48 mb-6">
                    <Image src="/nfc-neon-encode.png" alt="NFC Scan" fill className="object-contain" />
                  </div>
                  <p className="text-center mb-6">
                    Place your phone near the NFC tag embedded in your product to begin the authentication process.
                  </p>
                </>
              )}

              {scanState === "scanning" && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Scanning...</h3>
                  <p className="text-muted-foreground text-center">Hold your device steady near the NFC tag</p>
                </div>
              )}

              {scanState === "success" && productData && (
                <div className="w-full">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-center mb-6">Product Authenticated!</h3>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative h-48 w-full md:w-48 flex-shrink-0">
                      <Image
                        src={productData.image || "/placeholder.svg"}
                        alt={productData.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{productData.name}</h4>
                        <p className="text-muted-foreground">{productData.brand}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm font-medium">Serial Number:</p>
                          <p className="text-sm">{productData.serialNumber}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm font-medium">Manufacture Date:</p>
                          <p className="text-sm">{productData.manufactureDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {scanState === "error" && (
                <div className="flex flex-col items-center justify-center py-12">
                  <XCircle className="h-16 w-16 text-red-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Authentication Failed</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    We couldn't authenticate this product. Please try again or contact support.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {scanState === "idle" && (
                <Button onClick={handleScan}>
                  <Smartphone className="mr-2 h-4 w-4" />
                  Start NFC Scan
                </Button>
              )}

              {scanState === "scanning" && (
                <Button variant="outline" onClick={resetScan}>
                  Cancel
                </Button>
              )}

              {(scanState === "success" || scanState === "error") && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetScan}>
                    Scan Again
                  </Button>
                  {scanState === "success" && <Button>Add to Collection</Button>}
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="qr">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Authentication</CardTitle>
              <CardDescription>Scan the QR code on your product or packaging</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              {scanState === "idle" && (
                <>
                  <div className="relative h-48 w-48 mb-6">
                    <Image src="/abstract-qr-code.png" alt="QR Code Scan" fill className="object-contain" />
                  </div>
                  <p className="text-center mb-6">
                    Use your camera to scan the QR code on your product or packaging to verify authenticity.
                  </p>
                </>
              )}

              {scanState === "scanning" && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Scanning...</h3>
                  <p className="text-muted-foreground text-center">Processing QR code information</p>
                </div>
              )}

              {scanState === "success" && productData && (
                <div className="w-full">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-center mb-6">Product Authenticated!</h3>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative h-48 w-full md:w-48 flex-shrink-0">
                      <Image
                        src={productData.image || "/placeholder.svg"}
                        alt={productData.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{productData.name}</h4>
                        <p className="text-muted-foreground">{productData.brand}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm font-medium">Serial Number:</p>
                          <p className="text-sm">{productData.serialNumber}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm font-medium">Manufacture Date:</p>
                          <p className="text-sm">{productData.manufactureDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {scanState === "error" && (
                <div className="flex flex-col items-center justify-center py-12">
                  <XCircle className="h-16 w-16 text-red-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Authentication Failed</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    We couldn't authenticate this product. Please try again or contact support.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {scanState === "idle" && (
                <Button onClick={handleScan}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
              )}

              {scanState === "scanning" && (
                <Button variant="outline" onClick={resetScan}>
                  Cancel
                </Button>
              )}

              {(scanState === "success" || scanState === "error") && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetScan}>
                    Scan Again
                  </Button>
                  {scanState === "success" && <Button>Add to Collection</Button>}
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
