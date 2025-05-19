"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, QrCode, Shield, Check, AlertTriangle, RefreshCw } from "lucide-react"
import { NFCService, type NFCProductData } from "@/services/nfc-service"
import { createBlockchainService, type ProductData } from "@/services/blockchain-service"
import { useToast } from "@/components/ui/use-toast"

export function NFCPatchProgrammer() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("write")
  const [isProcessing, setIsProcessing] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    isVerified: boolean
    productData?: NFCProductData
    error?: string
  } | null>(null)

  // Product data form state
  const [productData, setProductData] = useState<NFCProductData>({
    productId: "",
    serialNumber: "",
    brand: "",
    name: "",
    manufactureDate: new Date().toISOString().split("T")[0],
    verificationUrl: "",
    blockchainNetwork: "ethereum",
    tokenId: "",
  })

  // Blockchain registration state
  const [privateKey, setPrivateKey] = useState("")
  const [isRegisteredOnChain, setIsRegisteredOnChain] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle blockchain network selection
  const handleNetworkChange = (value: string) => {
    setProductData((prev) => ({ ...prev, blockchainNetwork: value }))
  }

  // Register product on blockchain
  const handleBlockchainRegistration = async () => {
    if (!productData.productId || !productData.serialNumber || !privateKey) {
      toast({
        title: "Missing Information",
        description: "Please provide product ID, serial number, and private key",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Create blockchain service
      const blockchainService = createBlockchainService()
      await blockchainService.initialize()

      // Prepare product data for blockchain
      const chainProductData: ProductData = {
        id: productData.productId,
        name: productData.name,
        brand: productData.brand,
        serialNumber: productData.serialNumber,
        manufactureDate: productData.manufactureDate,
        metadata: JSON.stringify({
          type: "clothing-patch",
          tokenId: productData.tokenId,
        }),
      }

      // Register on blockchain
      const txHash = await blockchainService.registerProduct(chainProductData, privateKey)

      setTransactionHash(txHash)
      setIsRegisteredOnChain(true)

      toast({
        title: "Registration Successful",
        description: "Product registered on blockchain successfully",
      })

      // Update token ID if not already set
      if (!productData.tokenId) {
        setProductData((prev) => ({
          ...prev,
          tokenId: txHash.substring(0, 10), // Use part of tx hash as token ID
        }))
      }
    } catch (error) {
      console.error("Blockchain registration error:", error)
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register product on blockchain",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Write to NFC patch
  const handleWriteToNFC = async () => {
    if (!productData.productId || !productData.serialNumber) {
      toast({
        title: "Missing Information",
        description: "Please provide at least product ID and serial number",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Write to NFC tag
      const success = await NFCService.writeProductToTag(productData)

      if (success) {
        toast({
          title: "NFC Write Successful",
          description: "Product data written to NFC patch successfully",
        })
      } else {
        throw new Error("Failed to write to NFC patch")
      }
    } catch (error) {
      console.error("NFC write error:", error)
      toast({
        title: "NFC Write Failed",
        description: error.message || "Failed to write to NFC patch",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Read and verify NFC patch
  const handleVerifyNFC = async () => {
    setIsProcessing(true)
    setVerificationResult(null)

    try {
      // Read and verify NFC tag
      const result = await NFCService.readAndVerifyTag()
      setVerificationResult(result)

      if (result.isVerified) {
        toast({
          title: "Verification Successful",
          description: "NFC patch verified successfully",
        })
      } else if (result.productData) {
        toast({
          title: "Verification Warning",
          description: result.error || "Product data found but not verified",
          variant: "warning",
        })
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "Failed to verify NFC patch",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("NFC verification error:", error)
      toast({
        title: "Verification Error",
        description: error.message || "An error occurred during verification",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Generate a new product ID
  const generateProductId = () => {
    const prefix = "PATCH"
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
    const timestamp = Date.now().toString().substring(9, 13)

    setProductData((prev) => ({
      ...prev,
      productId: `${prefix}-${randomPart}-${timestamp}`,
    }))
  }

  // Generate a new serial number
  const generateSerialNumber = () => {
    const prefix = productData.brand ? productData.brand.substring(0, 3).toUpperCase() : "SN"
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase()
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "").substring(2)

    setProductData((prev) => ({
      ...prev,
      serialNumber: `${prefix}${timestamp}${randomPart}`,
    }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>NFC Patch Programmer</CardTitle>
        <CardDescription>Program and verify your NFC iron-on patches</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="write">Write Patch</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="verify">Verify Patch</TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">Product ID</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="productId"
                      name="productId"
                      value={productData.productId}
                      onChange={handleInputChange}
                      placeholder="PATCH-ABC123"
                    />
                    <Button variant="outline" size="icon" onClick={generateProductId} title="Generate Product ID">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="serialNumber"
                      name="serialNumber"
                      value={productData.serialNumber}
                      onChange={handleInputChange}
                      placeholder="SN230501ABC"
                    />
                    <Button variant="outline" size="icon" onClick={generateSerialNumber} title="Generate Serial Number">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={productData.brand}
                    onChange={handleInputChange}
                    placeholder="Your Brand"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Limited Edition Patch"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="manufactureDate">Manufacture Date</Label>
                  <Input
                    id="manufactureDate"
                    name="manufactureDate"
                    type="date"
                    value={productData.manufactureDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blockchainNetwork">Blockchain Network</Label>
                  <Select value={productData.blockchainNetwork} onValueChange={handleNetworkChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum (Goerli Testnet)</SelectItem>
                      <SelectItem value="polygon">Polygon (Mumbai Testnet)</SelectItem>
                      <SelectItem value="base">Base (Goerli Testnet)</SelectItem>
                      <SelectItem value="solana">Solana (Devnet)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenId">Token ID (Optional)</Label>
                  <Input
                    id="tokenId"
                    name="tokenId"
                    value={productData.tokenId}
                    onChange={handleInputChange}
                    placeholder="0x123abc..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Will be auto-generated after blockchain registration if left empty
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
                    onClick={handleWriteToNFC}
                    disabled={isProcessing}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    {isProcessing ? "Writing..." : "Write to NFC Patch"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Fill in the product details above</li>
                <li>Place your NFC iron-on patch near the device's NFC reader</li>
                <li>Click "Write to NFC Patch" and keep the patch near the reader</li>
                <li>Wait for confirmation (this may take a few seconds)</li>
                <li>For best results, register on blockchain before writing to NFC</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                  <p>
                    You're about to register this product on a public testnet blockchain. Make sure you're using a test
                    private key, not your main wallet key.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="privateKey">Private Key (for testnet only)</Label>
                    <Input
                      id="privateKey"
                      type="password"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      placeholder="0x..."
                    />
                    <p className="text-xs text-muted-foreground">
                      This key is only used for signing transactions and is not stored
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Selected Network</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">
                      {productData.blockchainNetwork === "ethereum" && "Ethereum (Goerli Testnet)"}
                      {productData.blockchainNetwork === "polygon" && "Polygon (Mumbai Testnet)"}
                      {productData.blockchainNetwork === "base" && "Base (Goerli Testnet)"}
                      {productData.blockchainNetwork === "solana" && "Solana (Devnet)"}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full" variant="outline" onClick={() => setActiveTab("write")}>
                      Back to Product Details
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Summary</Label>
                    <div className="p-3 bg-muted rounded-md text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product ID:</span>
                        <span className="font-mono">{productData.productId || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Serial Number:</span>
                        <span className="font-mono">{productData.serialNumber || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brand/Name:</span>
                        <span>
                          {productData.brand} {productData.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
                      onClick={handleBlockchainRegistration}
                      disabled={isProcessing || isRegisteredOnChain}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {isProcessing ? "Registering..." : isRegisteredOnChain ? "Registered" : "Register on Blockchain"}
                    </Button>
                  </div>

                  {isRegisteredOnChain && transactionHash && (
                    <div className="bg-green-50 p-3 rounded-md text-sm">
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-green-800">Registration Successful</p>
                          <p className="text-green-700 mt-1">Transaction Hash:</p>
                          <p className="font-mono text-xs break-all mt-1">{transactionHash}</p>
                          <a
                            href={`https://${
                              productData.blockchainNetwork === "ethereum"
                                ? "goerli.etherscan.io"
                                : productData.blockchainNetwork === "polygon"
                                  ? "mumbai.polygonscan.com"
                                  : productData.blockchainNetwork === "base"
                                    ? "goerli.basescan.org"
                                    : "explorer.solana.com"
                            }/tx/${transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline mt-2 inline-block"
                          >
                            View on Explorer
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            <div className="text-center py-8">
              <Smartphone className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Scan NFC Patch</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Place your NFC iron-on patch near your device's NFC reader to verify its authenticity and view product
                details.
              </p>

              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500"
                size="lg"
                onClick={handleVerifyNFC}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Scan & Verify Patch
                  </>
                )}
              </Button>
            </div>

            {verificationResult && (
              <div
                className={`border rounded-md p-4 ${
                  verificationResult.isVerified
                    ? "bg-green-50 border-green-200"
                    : verificationResult.productData
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start">
                  {verificationResult.isVerified ? (
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : verificationResult.productData ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  )}

                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-2">
                      {verificationResult.isVerified
                        ? "Verification Successful"
                        : verificationResult.productData
                          ? "Product Found (Unverified)"
                          : "Verification Failed"}
                    </h3>

                    {verificationResult.error && !verificationResult.isVerified && (
                      <p
                        className={`text-sm mb-4 ${verificationResult.productData ? "text-yellow-700" : "text-red-700"}`}
                      >
                        {verificationResult.error}
                      </p>
                    )}

                    {verificationResult.productData && (
                      <div className="space-y-3 mt-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="text-muted-foreground">Product ID:</div>
                          <div className="font-medium">{verificationResult.productData.productId}</div>

                          <div className="text-muted-foreground">Serial Number:</div>
                          <div className="font-medium">{verificationResult.productData.serialNumber}</div>

                          <div className="text-muted-foreground">Brand:</div>
                          <div className="font-medium">{verificationResult.productData.brand}</div>

                          <div className="text-muted-foreground">Product Name:</div>
                          <div className="font-medium">{verificationResult.productData.name}</div>

                          <div className="text-muted-foreground">Manufacture Date:</div>
                          <div className="font-medium">{verificationResult.productData.manufactureDate}</div>

                          {verificationResult.productData.blockchainNetwork && (
                            <>
                              <div className="text-muted-foreground">Blockchain:</div>
                              <div className="font-medium">{verificationResult.productData.blockchainNetwork}</div>
                            </>
                          )}

                          {verificationResult.productData.tokenId && (
                            <>
                              <div className="text-muted-foreground">Token ID:</div>
                              <div className="font-medium font-mono text-xs">
                                {verificationResult.productData.tokenId}
                              </div>
                            </>
                          )}
                        </div>

                        {verificationResult.productData.verificationUrl && (
                          <div className="pt-2">
                            <a
                              href={verificationResult.productData.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm inline-flex items-center"
                            >
                              <QrCode className="h-3.5 w-3.5 mr-1" />
                              View Verification Page
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 border-t pt-6">
        <div className="text-sm text-muted-foreground">
          <p>This tool is designed for programming NFC iron-on patches with product authentication data.</p>
          <p className="mt-1">For best results, use Chrome on Android or Safari on iOS 14+ with NFC capabilities.</p>
        </div>
      </CardFooter>
    </Card>
  )
}
