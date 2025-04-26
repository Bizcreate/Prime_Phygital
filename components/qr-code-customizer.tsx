"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { generateQRCode } from "@/utils/qr-generator"
import { Download, RefreshCw } from "lucide-react"

interface QRCodeCustomizerProps {
  productUrl: string
  onDownload?: (dataUrl: string) => void
}

export function QRCodeCustomizer({ productUrl, onDownload }: QRCodeCustomizerProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [customization, setCustomization] = useState({
    darkColor: "#000000",
    lightColor: "#ffffff",
    margin: 1,
    logoEnabled: false,
    logoUrl: "",
    cornerRadius: 0,
    errorCorrectionLevel: "H",
  })

  useEffect(() => {
    generateQRCode(productUrl || "https://primephygital.com/product/demo", {
      color: {
        dark: customization.darkColor,
        light: customization.lightColor,
      },
      margin: customization.margin,
      errorCorrectionLevel: customization.errorCorrectionLevel as "L" | "M" | "Q" | "H",
    }).then((dataUrl) => {
      setQrCodeDataUrl(dataUrl)
    })
  }, [productUrl, customization])

  const handleDownload = () => {
    if (onDownload && qrCodeDataUrl) {
      onDownload(qrCodeDataUrl)
    } else {
      // Create a temporary link element
      const link = document.createElement("a")
      link.href = qrCodeDataUrl
      link.download = "qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>QR Code Customization</CardTitle>
        <CardDescription>Customize the appearance of your product QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="colors">
              <TabsList className="bg-white/5 mb-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="logo">Logo</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="darkColor">Foreground Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded border border-white/20"
                      style={{ backgroundColor: customization.darkColor }}
                    />
                    <Input
                      id="darkColor"
                      type="color"
                      value={customization.darkColor}
                      onChange={(e) => setCustomization({ ...customization, darkColor: e.target.value })}
                      className="w-full bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lightColor">Background Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded border border-white/20"
                      style={{ backgroundColor: customization.lightColor }}
                    />
                    <Input
                      id="lightColor"
                      type="color"
                      value={customization.lightColor}
                      onChange={(e) => setCustomization({ ...customization, lightColor: e.target.value })}
                      className="w-full bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gradient (Coming Soon)</Label>
                  <div className="h-10 w-full rounded bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-sm text-white/50">Premium Feature</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="margin">Margin Size</Label>
                    <span className="text-sm text-white/70">{customization.margin}</span>
                  </div>
                  <Slider
                    id="margin"
                    min={0}
                    max={5}
                    step={1}
                    value={[customization.margin]}
                    onValueChange={(value) => setCustomization({ ...customization, margin: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cornerRadius">Corner Radius (Coming Soon)</Label>
                    <span className="text-sm text-white/70">{customization.cornerRadius}%</span>
                  </div>
                  <Slider
                    id="cornerRadius"
                    min={0}
                    max={50}
                    step={5}
                    disabled
                    value={[customization.cornerRadius]}
                    onValueChange={(value) => setCustomization({ ...customization, cornerRadius: value[0] })}
                  />
                  <p className="text-xs text-white/50">Premium feature - customize the roundness of QR code blocks</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="errorCorrection">Error Correction Level</Label>
                  <select
                    id="errorCorrection"
                    value={customization.errorCorrectionLevel}
                    onChange={(e) => setCustomization({ ...customization, errorCorrectionLevel: e.target.value })}
                    className="w-full rounded-md bg-white/5 border-white/10 py-2 px-3 text-sm"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                  <p className="text-xs text-white/50">
                    Higher levels allow for more damage to the QR code while remaining scannable
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="logo" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="logoEnabled"
                    checked={customization.logoEnabled}
                    onCheckedChange={(checked) => setCustomization({ ...customization, logoEnabled: checked })}
                    disabled
                  />
                  <Label htmlFor="logoEnabled">Add Logo (Coming Soon)</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://your-logo-url.com/logo.png"
                    value={customization.logoUrl}
                    onChange={(e) => setCustomization({ ...customization, logoUrl: e.target.value })}
                    disabled={!customization.logoEnabled}
                    className="w-full bg-white/5 border-white/10"
                  />
                  <p className="text-xs text-white/50">
                    Premium feature - add your brand logo to the center of the QR code
                  </p>
                </div>

                <div className="h-32 w-full rounded border border-dashed border-white/20 flex items-center justify-center">
                  <span className="text-sm text-white/50">Logo Preview (Premium Feature)</span>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg p-4 mb-4 w-64 h-64 flex items-center justify-center">
              {qrCodeDataUrl ? (
                <img src={qrCodeDataUrl || "/placeholder.svg"} alt="QR Code" className="max-w-full max-h-full" />
              ) : (
                <div className="animate-pulse bg-gray-200 w-48 h-48"></div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10"
                onClick={() => {
                  generateQRCode(productUrl || "https://primephygital.com/product/demo", {
                    color: {
                      dark: customization.darkColor,
                      light: customization.lightColor,
                    },
                    margin: customization.margin,
                    errorCorrectionLevel: customization.errorCorrectionLevel as "L" | "M" | "Q" | "H",
                  }).then((dataUrl) => {
                    setQrCodeDataUrl(dataUrl)
                  })
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <p className="text-xs text-white/50">
          QR codes are automatically generated for all products. Customize the appearance to match your brand.
        </p>
      </CardFooter>
    </Card>
  )
}
