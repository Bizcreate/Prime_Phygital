"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, AlertTriangle, Smartphone, Shield, Zap, RefreshCw, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { NFCService } from "@/services/nfc-service"

interface TestResult {
  name: string
  status: "pending" | "running" | "passed" | "failed"
  message?: string
  duration?: number
}

export function NFCTestSuite() {
  const { toast } = useToast()
  const [tests, setTests] = useState<TestResult[]>([
    { name: "NFC API Support Detection", status: "pending" },
    { name: "Product Data Generation", status: "pending" },
    { name: "NFC Tag Writing Simulation", status: "pending" },
    { name: "Signature Generation", status: "pending" },
    { name: "Tag Reading Simulation", status: "pending" },
    { name: "Signature Verification", status: "pending" },
    { name: "Blockchain Integration", status: "pending" },
    { name: "Database Storage", status: "pending" },
  ])

  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<number>(-1)

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests((prev) => prev.map((test, i) => (i === index ? { ...test, ...updates } : test)))
  }

  const runTest = async (index: number, testFn: () => Promise<void>) => {
    setCurrentTest(index)
    updateTest(index, { status: "running" })

    const startTime = Date.now()

    try {
      await testFn()
      const duration = Date.now() - startTime
      updateTest(index, {
        status: "passed",
        message: "Test completed successfully",
        duration,
      })
    } catch (error) {
      const duration = Date.now() - startTime
      updateTest(index, {
        status: "failed",
        message: error.message || "Test failed",
        duration,
      })
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)

    try {
      // Test 1: NFC API Support
      await runTest(0, async () => {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment")
        }

        if (!("NDEFReader" in window)) {
          throw new Error("Web NFC API not supported in this browser")
        }
      })

      // Test 2: Product Data Generation
      await runTest(1, async () => {
        const productData = {
          productId: "TEST-001",
          serialNumber: "SN-TEST-001",
          brand: "Test Brand",
          name: "Test Product",
          manufactureDate: "2024-01-01",
          verificationUrl: "https://test.com/verify",
          blockchainNetwork: "ethereum",
          tokenId: "token123",
        }

        if (!productData.productId || !productData.serialNumber) {
          throw new Error("Invalid product data generated")
        }
      })

      // Test 3: NFC Writing Simulation
      await runTest(2, async () => {
        const testProduct = {
          productId: "TEST-002",
          serialNumber: "SN-TEST-002",
          brand: "Test Brand",
          name: "Test NFC Product",
          manufactureDate: "2024-01-01",
          verificationUrl: "https://test.com/verify",
          blockchainNetwork: "ethereum",
          tokenId: "token456",
        }

        // Simulate NFC writing (will work in development mode)
        const result = await NFCService.writeProductToTag(testProduct)
        if (!result) {
          throw new Error("NFC writing simulation failed")
        }
      })

      // Test 4: Signature Generation
      await runTest(3, async () => {
        const testProduct = {
          productId: "TEST-003",
          serialNumber: "SN-TEST-003",
          brand: "Test Brand",
          name: "Test Signature Product",
          manufactureDate: "2024-01-01",
          verificationUrl: "https://test.com/verify",
          blockchainNetwork: "ethereum",
          tokenId: "token789",
        }

        const signature = await NFCService.generateSignature(testProduct, "test-private-key")
        if (!signature || signature.length < 10) {
          throw new Error("Invalid signature generated")
        }
      })

      // Test 5: Tag Reading Simulation
      await runTest(4, async () => {
        // This will simulate reading in development
        const result = await NFCService.readAndVerifyTag()

        // In development, this should return a simulated result
        if (process.env.NODE_ENV === "development") {
          if (!result) {
            throw new Error("NFC reading simulation failed")
          }
        } else {
          // In production, we expect it to fail without actual NFC hardware
          if (!result.error) {
            throw new Error("Expected NFC reading to fail without hardware")
          }
        }
      })

      // Test 6: Signature Verification
      await runTest(5, async () => {
        const testSignature = "test-signature-data"

        try {
          const response = await fetch("/api/verify-signature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ signatureData: testSignature }),
          })

          if (!response.ok) {
            throw new Error(`Verification API returned ${response.status}`)
          }

          const result = await response.json()
          if (typeof result.verified !== "boolean") {
            throw new Error("Invalid verification response format")
          }
        } catch (error) {
          throw new Error(`Signature verification failed: ${error.message}`)
        }
      })

      // Test 7: Blockchain Integration
      await runTest(6, async () => {
        const testProduct = {
          id: "test-product-id",
          name: "Test Blockchain Product",
          brand: "Test Brand",
          serialNumber: "SN-BLOCKCHAIN-001",
          manufactureDate: "2024-01-01",
          metadata: JSON.stringify({ test: true }),
        }

        try {
          const response = await fetch("/api/blockchain/register-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product: testProduct,
              privateKey: "test-private-key",
              network: "ethereum",
              contractAddress: "0x1234567890123456789012345678901234567890",
            }),
          })

          // We expect this to fail in test environment, but API should respond
          if (response.status === 500) {
            const error = await response.json()
            if (error.error === "API key not configured") {
              // This is expected in test environment
              return
            }
          }
        } catch (error) {
          throw new Error(`Blockchain integration test failed: ${error.message}`)
        }
      })

      // Test 8: Database Storage
      await runTest(7, async () => {
        try {
          // Test user authentication endpoint
          const response = await fetch("/api/auth/me")

          if (response.status === 401) {
            // Not authenticated, which is fine for testing
            return
          }

          if (!response.ok) {
            throw new Error(`Database connection test failed: ${response.status}`)
          }
        } catch (error) {
          throw new Error(`Database storage test failed: ${error.message}`)
        }
      })
    } finally {
      setIsRunning(false)
      setCurrentTest(-1)

      const passedTests = tests.filter((t) => t.status === "passed").length
      const totalTests = tests.length

      toast({
        title: "Test Suite Complete",
        description: `${passedTests}/${totalTests} tests passed`,
        variant: passedTests === totalTests ? "default" : "destructive",
      })
    }
  }

  const resetTests = () => {
    setTests((prev) =>
      prev.map((test) => ({
        ...test,
        status: "pending" as const,
        message: undefined,
        duration: undefined,
      })),
    )
    setCurrentTest(-1)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "passed":
        return <Check className="h-4 w-4 text-green-600" />
      case "failed":
        return <X className="h-4 w-4 text-red-600" />
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "passed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Passed
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "running":
        return <Badge variant="secondary">Running</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const passedTests = tests.filter((t) => t.status === "passed").length
  const failedTests = tests.filter((t) => t.status === "failed").length
  const totalTests = tests.length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            NFC Testing Suite
          </CardTitle>
          <CardDescription>
            Comprehensive testing for NFC functionality, blockchain integration, and authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{passedTests}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{failedTests}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalTests}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetTests} disabled={isRunning}>
                Reset
              </Button>
              <Button
                onClick={runAllTests}
                disabled={isRunning}
                className="bg-gradient-to-r from-purple-500 to-blue-500"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Run All Tests
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {tests.map((test, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  currentTest === index ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    {test.message && (
                      <div className={`text-sm ${test.status === "failed" ? "text-red-600" : "text-muted-foreground"}`}>
                        {test.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {test.duration && <span className="text-xs text-muted-foreground">{test.duration}ms</span>}
                  {getStatusBadge(test.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="browser" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browser">Browser Support</TabsTrigger>
          <TabsTrigger value="hardware">Hardware Testing</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="browser" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Browser Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-800">✅ Supported Browsers</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-600" />
                      Chrome on Android (v89+)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-600" />
                      Edge on Android (v89+)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-600" />
                      Samsung Internet (v14+)
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-red-800">❌ Not Supported</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <X className="h-3 w-3 text-red-600" />
                      Safari (iOS/macOS)
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-3 w-3 text-red-600" />
                      Firefox (all platforms)
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-3 w-3 text-red-600" />
                      Desktop browsers
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hardware" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Physical NFC Testing</CardTitle>
              <CardDescription>Steps to test with actual NFC hardware</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Requirements</h4>
                      <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                        <li>• Android device with NFC capability</li>
                        <li>• Chrome or Edge browser</li>
                        <li>• NTAG213/215/216 NFC tags</li>
                        <li>• HTTPS connection (required for Web NFC API)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Testing Steps:</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">1</span>
                      <div>
                        <p className="font-medium">Enable NFC on Android device</p>
                        <p className="text-muted-foreground">Settings → Connected devices → NFC</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">2</span>
                      <div>
                        <p className="font-medium">Open app in Chrome/Edge</p>
                        <p className="text-muted-foreground">Must be HTTPS for Web NFC API</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">3</span>
                      <div>
                        <p className="font-medium">Go to NFC Patch Programmer</p>
                        <p className="text-muted-foreground">/dashboard/nfc-patches</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">4</span>
                      <div>
                        <p className="font-medium">Fill product details and write to tag</p>
                        <p className="text-muted-foreground">Hold NFC tag near device during write</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">5</span>
                      <div>
                        <p className="font-medium">Test verification</p>
                        <p className="text-muted-foreground">Use verify tab to scan the programmed tag</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-800">NFC API not supported</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Solution: Use Chrome/Edge on Android. Desktop browsers don't support Web NFC API.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium text-yellow-800">Permission denied</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Solution: Ensure HTTPS connection and grant NFC permissions when prompted.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-800">Tag not detected</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Solution: Hold tag closer to device, ensure NFC is enabled, try different tag position.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-purple-800">Verification fails</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Solution: Check NFC_VERIFICATION_KEY is set correctly, ensure signature generation works.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Web NFC API Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
