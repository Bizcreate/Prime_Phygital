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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Twitter, Instagram, Linkedin, Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface ShareProductModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  productImage: string
}

export function ShareProductModal({ isOpen, onClose, productId, productName, productImage }: ShareProductModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://primephygital.com/product/${productId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopied(true)
        toast({
          title: "URL Copied",
          description: "The product URL has been copied to your clipboard.",
        })
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy Failed",
          description: "There was an error copying the URL to your clipboard.",
          variant: "destructive",
        })
      },
    )
  }

  const shareOnSocial = (platform: string) => {
    let shareLink = ""
    const text = `Check out this authenticated ${productName} on Prime Phygital!`

    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      default:
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank")
      toast({
        title: "Sharing on " + platform.charAt(0).toUpperCase() + platform.slice(1),
        description: "Opening share dialog...",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {productName}</DialogTitle>
          <DialogDescription className="text-white/70">Share this product with others.</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden">
              <img src={productImage || "/placeholder.svg"} alt={productName} className="object-cover w-full h-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="share-url">Product URL</Label>
            <div className="flex space-x-2">
              <Input id="share-url" value={shareUrl} readOnly className="bg-white/5 border-white/10" />
              <Button variant="outline" className="border-white/10 px-3" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Share on Social Media</Label>
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-blue-600/10 hover:border-blue-600/50"
                onClick={() => shareOnSocial("twitter")}
              >
                <Twitter className="h-5 w-5 text-blue-400" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-blue-800/10 hover:border-blue-800/50"
                onClick={() => shareOnSocial("facebook")}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-pink-600/10 hover:border-pink-600/50"
                onClick={() => shareOnSocial("instagram")}
              >
                <Instagram className="h-5 w-5 text-pink-500" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-blue-700/10 hover:border-blue-700/50"
                onClick={() => shareOnSocial("linkedin")}
              >
                <Linkedin className="h-5 w-5 text-blue-500" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="border-white/10" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
