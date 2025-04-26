"use client"

import { useState } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Smartphone, LinkIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface NFCSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  serialNumber: string
}

// Export with the expected name
export function NfcSettingsModal({ isOpen, onClose, productId, productName, serialNumber }: NFCSettingsModalProps) {
  const [nfcSettings, setNfcSettings] = useState({
    enabled: true,
    linkType: "product-page",
    customUrl: "",
    requireAuthentication: true,
    showSerialNumber: true,
    allowTransfer: true,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Saving NFC settings:", nfcSettings)
      setIsSaving(false)
      toast({
        title: "Settings Saved",
        description: "NFC settings have been updated successfully.",
      })
      onClose()
    }, 1000)
  }

  const validateSettings = () => {
    if (nfcSettings.linkType === "custom-url" && !nfcSettings.customUrl) {
      toast({
        title: "Validation Error",
        description: "Please enter a custom URL.",
        variant: "destructive",
      })
      return false
    }

    if (nfcSettings.linkType === "custom-url" && !nfcSettings.customUrl.startsWith("https://")) {
      toast({
        title: "Validation Error",
        description: "Custom URL must start with https://",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>NFC Settings for {productName}</DialogTitle>
          <DialogDescription className="text-white/70">
            Configure the NFC tag behavior for this product.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>NFC Tag Enabled</Label>
              <p className="text-sm text-white/70">Activate or deactivate the NFC functionality</p>
            </div>
            <Switch
              checked={nfcSettings.enabled}
              onCheckedChange={(checked) => setNfcSettings({ ...nfcSettings, enabled: checked })}
            />
          </div>

          <div className="space-y-3">
            <Label>NFC Tag Behavior</Label>
            <RadioGroup
              value={nfcSettings.linkType}
              onValueChange={(value) => setNfcSettings({ ...nfcSettings, linkType: value })}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="product-page" id="product-page" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="product-page" className="font-medium cursor-pointer">
                    Product Page
                  </Label>
                  <p className="text-sm text-white/70">Open the official product page with detailed information</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="verification" id="verification" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="verification" className="font-medium cursor-pointer">
                    Verification Only
                  </Label>
                  <p className="text-sm text-white/70">Only show verification status without detailed product info</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="custom-url" id="custom-url" className="mt-1" />
                <div className="grid gap-1.5 w-full">
                  <Label htmlFor="custom-url" className="font-medium cursor-pointer">
                    Custom URL
                  </Label>
                  <p className="text-sm text-white/70 mb-2">Redirect to a custom URL when the NFC tag is scanned</p>
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-white/50" />
                    <Input
                      placeholder="https://example.com/my-campaign"
                      className="bg-white/5 border-white/10"
                      value={nfcSettings.customUrl}
                      onChange={(e) => setNfcSettings({ ...nfcSettings, customUrl: e.target.value })}
                      disabled={nfcSettings.linkType !== "custom-url"}
                    />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Security Settings</Label>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">Require Authentication</Label>
                <p className="text-sm text-white/70">Verify user identity before showing product details</p>
              </div>
              <Switch
                checked={nfcSettings.requireAuthentication}
                onCheckedChange={(checked) => setNfcSettings({ ...nfcSettings, requireAuthentication: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">Display Serial Number</Label>
                <p className="text-sm text-white/70">Show serial number when scanned</p>
              </div>
              <Switch
                checked={nfcSettings.showSerialNumber}
                onCheckedChange={(checked) => setNfcSettings({ ...nfcSettings, showSerialNumber: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">Allow Ownership Transfer</Label>
                <p className="text-sm text-white/70">Enable transfer of ownership via NFC</p>
              </div>
              <Switch
                checked={nfcSettings.allowTransfer}
                onCheckedChange={(checked) => setNfcSettings({ ...nfcSettings, allowTransfer: checked })}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2 mt-2">
          <Button variant="outline" className="border-white/10" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-neon-purple to-neon-blue"
            onClick={() => {
              if (validateSettings()) {
                handleSave()
              }
            }}
            disabled={isSaving}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// For backward compatibility
export { NfcSettingsModal as NFCSettingsModal }
