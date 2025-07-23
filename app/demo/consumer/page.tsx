"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { NFCService } from "@/services/nfc-service"
import { ScanSearch, CheckCircle2, XCircle, SmartphoneNfc } from "lucide-react"

/**
 * Consumer-side demo that:
 * 1. Asks the user to tap the product’s NFC patch.
 * 2. Verifies the embedded signature via the `/api/verify-signature` route.
 * 3. Shows clear success / error states without crashing the page.
 */
export default function ConsumerDemoPage() {
  const { toast } = useToast()

  const [status, setStatus] = useState<"idle" | "scanning" | "verified" | "failed">("idle")
  const [details, setDetails] = useState<string | null>(null)

  const handleScan = async () => {
    setStatus("scanning")
    setDetails(null)

    // 1) Ask the NFCService to read the tag & verify its signature
    try {
      const { isVerified, productData, error } = await NFCService.readAndVerifyTag()

      if (isVerified) {
        setStatus("verified")
        setDetails(`Product ${productData?.brand ?? ""} ${productData?.name ?? ""} verified ✅`)
        toast({
          title: "Product authenticated",
          description: "Signature passed – this item is officially recognised.",
        })
      } else {
        throw new Error(error ?? "Unknown verification failure")
      }
    } catch (err: any) {
      console.error("Verification error:", err)
      setStatus("failed")
      setDetails(err.message ?? "Unexpected error")
      toast({
        title: "Verification failed",
        description: err.message ?? "We couldn’t verify this tag, please retry.",
        variant: "destructive",
      })
    }
  }

  const reset = () => {
    setStatus("idle")
    setDetails(null)
  }

  return (
    <main className="mx-auto max-w-lg p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SmartphoneNfc className="h-5 w-5 text-blue-600" />
            Consumer NFC Verification
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* current state badge */}
          {status !== "idle" && (
            <Badge
              className={
                status === "verified"
                  ? "bg-green-100 text-green-800"
                  : status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }
            >
              {status === "verified" && (
                <>
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                </>
              )}
              {status === "failed" && (
                <>
                  <XCircle className="h-3 w-3 mr-1" /> Failed
                </>
              )}
              {status === "scanning" && (
                <>
                  <ScanSearch className="h-3 w-3 mr-1 animate-pulse" />
                  Scanning…
                </>
              )}
            </Badge>
          )}

          {/* explanatory text */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tap your phone on the product’s NFC patch to confirm authenticity. We’ll validate the embedded cryptographic
            signature on-chain. No location or personal data is stored.
          </p>

          {/* action buttons */}
          {status === "idle" && (
            <Button onClick={handleScan} className="w-full">
              <ScanSearch className="h-4 w-4 mr-2" />
              Tap to verify
            </Button>
          )}

          {status === "scanning" && (
            <Button disabled className="w-full">
              Scanning tag…
            </Button>
          )}

          {status === "verified" && (
            <Button variant="outline" onClick={reset} className="w-full bg-transparent">
              Verify another item
            </Button>
          )}

          {status === "failed" && (
            <div className="space-y-3">
              <Button onClick={handleScan} className="w-full">
                Retry
              </Button>
              <Button variant="outline" onClick={reset} className="w-full bg-transparent">
                Cancel
              </Button>
            </div>
          )}

          {/* debug / detail text */}
          {details && <p className="text-xs text-gray-500 break-all">{details}</p>}
        </CardContent>
      </Card>

      {/* browser-support notice */}
      {!("NDEFReader" in window) && (
        <Card>
          <CardContent className="text-xs p-4 text-orange-700 bg-orange-50 rounded">
            Your browser doesn’t support Web NFC. You can still preview the flow – we’ll simulate verification in
            development – but real NFC works only on Chrome for Android (v89+) and Edge (v110+) with a secure context
            (HTTPS).
          </CardContent>
        </Card>
      )}
    </main>
  )
}
