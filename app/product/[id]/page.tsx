"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QrCodeModal } from "@/components/qr-code-modal"
import { NfcSettingsModal } from "@/components/nfc-settings-modal"
import { ShareProductModal } from "@/components/share-product-modal"
import { HistoryModal } from "@/components/history-modal"
import { ReportStolenModal } from "@/components/report-stolen-modal"
import { TransferOwnershipModal } from "@/components/transfer-ownership-modal"
import { MiningStatus } from "@/components/mining-status"
import { Clock, QrCode, Smartphone, Share2, Shield, UserPlus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock product data
const product = {
  id: "PRD001",
  name: "Neon Streak Sneakers",
  brand: "UrbanGlow",
  description:
    "Limited edition sneakers with embedded NFC authentication. These sneakers feature a unique design with neon accents that glow in the dark.",
  price: "$299.99",
  serialNumber: "NS-2023-8842",
  manufactureDate: "2023-05-15",
  status: "Authentic",
  owner: "Alex Johnson",
  blockchain: "Ethereum",
  tokenId: "0x3a8d...e5c2",
  image: "/neon-streak-sneakers.png",
  category: "Footwear",
  color: "Black/Neon Green",
  size: "US 10",
  material: "Synthetic Leather, Mesh",
  features: ["NFC Authentication", "Glow-in-dark Accents", "Limited Edition", "Blockchain Verified"],
  careInstructions: "Wipe with a damp cloth. Do not machine wash. Keep away from extreme heat.",
  warranty: "1 Year Limited Warranty",
  sustainabilityScore: 8.5,
  authenticity: "Verified",
  lastVerified: "2023-09-28",
}

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isNfcModalOpen, setIsNfcModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)

  const handleVerify = () => {
    toast({
      title: "Verification Successful",
      description: "This product has been verified as authentic.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-black">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 hover:bg-green-600">{product.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
              onClick={() => setIsQrModalOpen(true)}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
              onClick={() => setIsNfcModalOpen(true)}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              NFC Settings
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={handleVerify}>
              <Shield className="h-4 w-4 mr-2" />
              Verify
            </Button>
          </div>

          <Card className="bg-black border border-white/10 text-white">
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription className="text-white/70">Verify this product's authenticity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Status</span>
                <Badge className="bg-green-500 hover:bg-green-600">{product.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Last Verified</span>
                <span>{product.lastVerified}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Blockchain</span>
                <span>{product.blockchain}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Token ID</span>
                <span className="text-xs">{product.tokenId}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue"
                onClick={() => setIsHistoryModalOpen(true)}
              >
                <Clock className="h-4 w-4 mr-2" />
                View Full History
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5"
                onClick={() => setIsReportModalOpen(true)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Report Stolen
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5"
                onClick={() => setIsTransferModalOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Transfer Ownership
              </Button>
            </CardFooter>
          </Card>

          <MiningStatus productId={product.id} />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-white/70">{product.brand}</p>
          </div>

          <p className="text-2xl font-bold">{product.price}</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <p>{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-white/70">Serial Number</h3>
                  <p>{product.serialNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/70">Manufacture Date</h3>
                  <p>{product.manufactureDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/70">Category</h3>
                  <p>{product.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/70">Color</h3>
                  <p>{product.color}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/70">Size</h3>
                  <p>{product.size}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/70">Material</h3>
                  <p>{product.material}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="space-y-4">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="mt-4">
                <h3 className="font-semibold text-white/70">Sustainability Score</h3>
                <div className="flex items-center mt-1">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-300 to-green-500"
                    style={{ width: `${product.sustainabilityScore * 10}%` }}
                  ></div>
                  <span className="ml-2">{product.sustainabilityScore}/10</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="care" className="space-y-4">
              <div>
                <h3 className="font-semibold text-white/70">Care Instructions</h3>
                <p>{product.careInstructions}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-white/70">Warranty</h3>
                <p>{product.warranty}</p>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="bg-black border border-white/10 text-white">
            <CardHeader>
              <CardTitle>Current Owner</CardTitle>
              <CardDescription className="text-white/70">Information about the current owner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center">
                  <span className="text-lg font-bold">{product.owner.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold">{product.owner}</p>
                  <p className="text-sm text-white/70">Owner since {product.lastVerified}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        productId={product.id}
        productName={product.name}
        serialNumber={product.serialNumber}
      />

      <NfcSettingsModal
        isOpen={isNfcModalOpen}
        onClose={() => setIsNfcModalOpen(false)}
        productId={product.id}
        productName={product.name}
        serialNumber={product.serialNumber}
      />

      <ShareProductModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productId={product.id}
        productName={product.name}
        productImage={product.image}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        productId={product.id}
        productName={product.name}
      />

      <ReportStolenModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        productId={product.id}
        productName={product.name}
        serialNumber={product.serialNumber}
      />

      <TransferOwnershipModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        productId={product.id}
        productName={product.name}
        currentOwner={product.owner}
      />
    </div>
  )
}
