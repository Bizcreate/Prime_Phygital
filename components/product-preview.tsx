"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Smartphone, Shield, History, Share2, Award } from "lucide-react"

interface ProductPreviewProps {
  productData: {
    name: string
    description: string
    type?: string
    serialNumber?: string
    edition?: string
    image?: string | null
    blockchain?: string
    nftType?: string
    nfcContent?: string
    transferable?: boolean
    theftProtection?: boolean
    historyTracking?: boolean
    wearToEarn?: boolean
    socialSharing?: boolean
    communityAccess?: boolean
    privacyLevel?: string
  }
}

export function ProductPreview({ productData }: ProductPreviewProps) {
  const [activeTab, setActiveTab] = useState("digital-passport")

  return (
    <div className="w-full">
      <Tabs defaultValue="digital-passport" onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 mb-4">
          <TabsTrigger value="digital-passport">Digital Passport</TabsTrigger>
          <TabsTrigger value="consumer-view">Consumer View</TabsTrigger>
          <TabsTrigger value="nft">NFT View</TabsTrigger>
        </TabsList>

        <TabsContent value="digital-passport" className="m-0">
          <Card className="glass-panel border-white/10 overflow-hidden">
            <div className="relative h-48 w-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20">
              {productData.image ? (
                <Image
                  src={productData.image || "/placeholder.svg"}
                  alt={productData.name || "Product"}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-white/50">Product Image</span>
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{productData.name || "Product Name"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {productData.serialNumber || "SN-0000-0000"}
                    {productData.edition && ` • Edition ${productData.edition}`}
                  </CardDescription>
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Authentic</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-white/80">
                {productData.description || "Product description will appear here."}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-white/5 p-3 flex flex-col">
                  <span className="text-xs text-white/50">Product Type</span>
                  <span className="font-medium">{productData.type || "Not specified"}</span>
                </div>
                <div className="rounded-md bg-white/5 p-3 flex flex-col">
                  <span className="text-xs text-white/50">Blockchain</span>
                  <span className="font-medium">{productData.blockchain || "Not specified"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {productData.transferable && (
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    Transferable
                  </Badge>
                )}
                {productData.theftProtection && (
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    Theft Protection
                  </Badge>
                )}
                {productData.historyTracking && (
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    History Tracking
                  </Badge>
                )}
                {productData.wearToEarn && (
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    Wear-to-Earn
                  </Badge>
                )}
                {productData.socialSharing && (
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    Social Sharing
                  </Badge>
                )}
                {productData.communityAccess && (
                  <Badge variant="outline" className="bg-white/5 border-white/10">
                    Community Access
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
              <div className="flex gap-3">
                <QrCode className="h-5 w-5 text-neon-blue" />
                <Smartphone className="h-5 w-5 text-neon-purple" />
                <Shield className="h-5 w-5 text-neon-green" />
              </div>
              <span className="text-xs text-white/50">Created Apr 25, 2025</span>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="consumer-view" className="m-0">
          <Card className="glass-panel border-white/10 overflow-hidden">
            <div className="relative h-64 w-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20">
              {productData.image ? (
                <Image
                  src={productData.image || "/placeholder.svg"}
                  alt={productData.name || "Product"}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-white/50">Product Image</span>
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{productData.name || "Product Name"}</CardTitle>
                  <CardDescription className="text-white/70">
                    Verified Authentic • {productData.edition ? `Edition ${productData.edition}` : "Standard Edition"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Share2 className="h-5 w-5 text-white/70" />
                  <History className="h-5 w-5 text-white/70" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-white/80">
                {productData.description || "Product description will appear here."}
              </p>

              <div className="rounded-md bg-white/5 p-4">
                <h4 className="font-medium mb-2">Product Benefits</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-neon-green" />
                    <span>Authenticity guaranteed</span>
                  </li>
                  {productData.historyTracking && (
                    <li className="flex items-center gap-2">
                      <History className="h-4 w-4 text-neon-blue" />
                      <span>Complete ownership history</span>
                    </li>
                  )}
                  {productData.wearToEarn && (
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-neon-purple" />
                      <span>Earn rewards for product usage</span>
                    </li>
                  )}
                  {productData.communityAccess && (
                    <li className="flex items-center gap-2">
                      <QrCode className="h-4 w-4 text-neon-blue" />
                      <span>Exclusive community access</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="border-t border-white/10 pt-4">
              <div className="w-full flex justify-center">
                <Badge className="bg-gradient-to-r from-neon-purple to-neon-blue text-white">
                  Scan to verify authenticity
                </Badge>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="nft" className="m-0">
          <Card className="glass-panel border-white/10 overflow-hidden">
            <div className="relative h-64 w-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20">
              {productData.image ? (
                <Image
                  src={productData.image || "/placeholder.svg"}
                  alt={productData.name || "Product"}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-white/50">NFT Image</span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge className="bg-black/50 backdrop-blur-sm border-white/20">
                  {productData.nftType === "erc721" ? "ERC-721" : "ERC-1155"}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{productData.name || "NFT Name"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {productData.blockchain || "Ethereum"} • Token ID #1234
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-white/80">{productData.description || "NFT description will appear here."}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-white/5 p-3 flex flex-col">
                  <span className="text-xs text-white/50">Collection</span>
                  <span className="font-medium">Prime Phygital</span>
                </div>
                <div className="rounded-md bg-white/5 p-3 flex flex-col">
                  <span className="text-xs text-white/50">Owner</span>
                  <span className="font-medium truncate">0x1a2...3b4c</span>
                </div>
              </div>

              <div className="rounded-md bg-white/5 p-3">
                <h4 className="text-sm font-medium mb-2">Properties</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/10 rounded p-2 text-center">
                    <div className="text-xs text-white/50">Type</div>
                    <div className="text-sm font-medium truncate">{productData.type || "Unknown"}</div>
                  </div>
                  <div className="bg-white/10 rounded p-2 text-center">
                    <div className="text-xs text-white/50">Edition</div>
                    <div className="text-sm font-medium truncate">{productData.edition || "Standard"}</div>
                  </div>
                  <div className="bg-white/10 rounded p-2 text-center">
                    <div className="text-xs text-white/50">Rarity</div>
                    <div className="text-sm font-medium truncate">Common</div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
              <span className="text-xs text-white/50">Minted Apr 25, 2025</span>
              <span className="text-xs text-white/50">View on {productData.blockchain || "Ethereum"}</span>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
