"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, Share2 } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  serialNumber: string
}

// Export with both naming conventions to ensure compatibility
export function QrCodeModal({ isOpen, onClose, productId, productName, serialNumber }: QRCodeModalProps) {
  const [qrSize, setQrSize] = useState(200)
  const qrValue = `https://primephygital.com/verify/${productId}`

  const downloadQR = () => {
    const svg = document.getElementById("product-qr-code")
    if (!svg) return

    try {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        canvas.width = qrSize
        canvas.height = qrSize
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL("image/png")

        const downloadLink = document.createElement("a")
        downloadLink.download = `${serialNumber}-qrcode.png`
        downloadLink.href = pngFile
        downloadLink.click()

        toast({
          title: "QR Code Downloaded",
          description: "The QR code has been downloaded successfully.",
        })
      }

      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    } catch (error) {
      console.error("Error downloading QR code:", error)
      toast({
        title: "Download Failed",
        description: "There was an error downloading the QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareQR = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `QR Code for ${productName}`,
          text: `Scan this QR code to verify ${productName} (Serial: ${serialNumber})`,
          url: qrValue,
        })
        .then(() => {
          toast({
            title: "Shared Successfully",
            description: "The QR code has been shared.",
          })
        })
        .catch((error) => {
          console.error("Error sharing:", error)
          toast({
            title: "Share Failed",
            description: "There was an error sharing the QR code.",
            variant: "destructive",
          })
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(qrValue)
        .then(() => {
          toast({
            title: "URL Copied",
            description: "The verification URL has been copied to your clipboard.",
          })
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error)
          toast({
            title: "Copy Failed",
            description: "There was an error copying the URL to your clipboard.",
            variant: "destructive",
          })
        })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code for {productName}</DialogTitle>
          <DialogDescription className="text-white/70">
            Scan this QR code to view and verify this product.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG
              id="product-qr-code"
              value={qrValue}
              size={qrSize}
              level="H"
              includeMargin={true}
              className="qr-canvas"
            />
          </div>
        </div>
        <div className="text-center text-sm text-white/70">
          <p>Serial Number: {serialNumber}</p>
          <p className="mt-1">URL: {qrValue}</p>
        </div>
        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
          <Button variant="outline" className="border-white/10" onClick={downloadQR}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button className="bg-gradient-to-r from-neon-purple to-neon-blue" onClick={shareQR}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// For backward compatibility
export { QrCodeModal as QRCodeModal }
