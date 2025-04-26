"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LikeButton } from "@/components/engagement/like-button"
import { CommentSection } from "@/components/engagement/comment-section"
import { generateQRCode } from "@/utils/qr-generator"
import { encodeNFCTag, checkNFCSupport, type NFCOptions } from "@/utils/nfc-encoder"
import { shareContent, socialPlatforms } from "@/utils/social-share"
import {
  ArrowLeft,
  QrCode,
  Smartphone,
  Edit,
  Share2,
  Shield,
  History,
  Users,
  BarChart3,
  ExternalLink,
  Copy,
  CheckCircle2,
  Download,
  Trash2,
  Pencil,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [nfcDialogOpen, setNfcDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [qrURL, setQrURL] = useState(`https://prime-phygital.com/p/${params.id}`)
  const [qrSize, setQrSize] = useState(200)
  const [isNFCSupported, setIsNFCSupported] = useState(false)
  const [isNFCEncoding, setIsNFCEncoding] = useState(false)
  const [nfcEncodingSuccess, setNfcEncodingSuccess] = useState<boolean | null>(null)
  const [hasNfcEngagement, setHasNfcEngagement] = useState(false)
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false)

  // Mock product data
  const product = {
    id: params.id,
    name: "Limited Edition Sneakers",
    image: "/vibrant-kicks.png",
    description: "Exclusive limited edition sneakers with NFC authentication and digital collectible.",
    type: "Footwear",
    status: "Active",
    scans: 128,
    chain: "Ethereum",
    created: "2023-11-15",
    nftAddress: "0x935ebbfa1b28f545b6607f0f3f52c3dfdf1849c0",
    owner: "Prime Collectibles",
    lastScan: "2024-04-22",
    serialNumber: "SN-2023-0042",
    edition: "42/100",
    likes: 47,
    views: 312,
    engagementRate: 78,
  }

  const scanHistory = [
    { date: "2024-04-22", location: "New York, USA", user: "Anonymous" },
    { date: "2024-04-15", location: "Los Angeles, USA", user: "Verified Owner" },
    { date: "2024-04-10", location: "Chicago, USA", user: "Retailer" },
    { date: "2024-04-05", location: "Miami, USA", user: "Distributor" },
    { date: "2024-03-28", location: "Manufacturing Facility", user: "Quality Control" },
  ]

  const mockComments = [
    {
      id: "1",
      user: { name: "Alex", avatar: "/letter-a-abstract.png" },
      text: "These sneakers are amazing! The NFC authentication gives me peace of mind.",
      timestamp: "2024-04-15T14:24:00Z",
    },
    {
      id: "2",
      user: { name: "Jordan", avatar: "/abstract-letter-j.png" },
      text: "I love the digital collectible that came with these. Really adds value!",
      timestamp: "2024-04-10T09:15:00Z",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

  const handleSocialShare = async (platform: string) => {
    const shareOptions = {
      url: `https://prime-phygital.com/p/${params.id}`,
      title: `Check out the ${product.name}`,
      text: `I found this amazing ${product.name} with blockchain authentication and digital collectible.`,
    }

    try {
      if (platform in socialPlatforms) {
        await socialPlatforms[platform].action(shareOptions)
        toast({
          title: "Shared Successfully",
          description: `Your product has been shared on ${socialPlatforms[platform].name}.`,
        })
      } else if (platform === "native") {
        const success = await shareContent(shareOptions)
        if (success) {
          toast({
            title: "Shared Successfully",
            description: "Your product has been shared.",
          })
        }
      }
    } catch (error) {
      console.error("Error sharing content:", error)
      toast({
        title: "Sharing Failed",
        description: "Could not share your product. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Generate QR code when URL changes
  useEffect(() => {
    generateQRCode(qrURL, { width: qrSize })
      .then((url) => {
        setQrCode(url)
      })
      .catch((error) => {
        console.error("Failed to generate QR code:", error)
        toast({
          title: "QR Code Generation Failed",
          description: "Could not generate the QR code. Please try again.",
          variant: "destructive",
        })
      })
  }, [qrURL, qrSize])

  // Check NFC support on component mount
  useEffect(() => {
    setIsNFCSupported(checkNFCSupport())
  }, [])

  // Function to handle NFC encoding
  const handleNFCEncode = async () => {
    setIsNFCEncoding(true)
    setNfcEncodingSuccess(null)

    // Configure NFC options
    const nfcOptions: NFCOptions = {
      records: [
        {
          recordType: "uri",
          data: `https://prime-phygital.com/p/${params.id}`,
        },
        {
          recordType: "text",
          data: JSON.stringify({
            productId: params.id,
            name: product.name,
            serialNumber: product.serialNumber,
            nftAddress: product.nftAddress,
          }),
        },
      ],
    }

    try {
      const success = await encodeNFCTag(nfcOptions)
      setNfcEncodingSuccess(success)
      if (success) {
        setHasNfcEngagement(true)
        toast({
          title: "NFC Tag Encoded Successfully",
          description: "The NFC tag has been successfully programmed.",
        })
      } else {
        toast({
          title: "NFC Encoding Failed",
          description: "Could not encode the NFC tag. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error encoding NFC tag:", error)
      setNfcEncodingSuccess(false)
      toast({
        title: "NFC Encoding Error",
        description: "An error occurred while encoding the NFC tag.",
        variant: "destructive",
      })
    } finally {
      setIsNFCEncoding(false)
    }
  }

  const handleDownloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement("a")
    link.href = qrCode
    link.download = `${product.name.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been downloaded to your device.",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Product Image */}
          <div className="md:col-span-1">
            <Card className="glass-panel border-white/10 overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={
                    product.image ||
                    `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(product.name) || "/placeholder.svg"}` ||
                    "/placeholder.svg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <CardFooter className="flex justify-between gap-4 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/10 bg-black/30 hover:bg-white/10"
                  onClick={() => setQrDialogOpen(true)}
                >
                  <QrCode className="mr-2 h-4 w-4" /> View QR
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/10 bg-black/30 hover:bg-white/10"
                  onClick={() => setNfcDialogOpen(true)}
                >
                  <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/10 bg-black/30 hover:bg-white/10"
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/10 bg-black/30 hover:bg-white/10"
                onClick={() => setShareDialogOpen(true)}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>

            {/* Engagement Section */}
            <Card className="glass-panel border-white/10 mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white/70">Likes</p>
                  <p className="text-xs">{product.likes}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white/70">Views</p>
                  <p className="text-xs">{product.views}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white/70">Engagement Rate</p>
                  <div className="flex items-center gap-2">
                    <Progress value={product.engagementRate} className="h-1.5 w-16" />
                    <p className="text-xs">{product.engagementRate}%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white/70">NFC Engagement</p>
                  <Badge
                    variant={hasNfcEngagement ? "default" : "outline"}
                    className={
                      hasNfcEngagement ? "bg-neon-green/20 text-neon-green border-neon-green/30" : "border-white/20"
                    }
                  >
                    {hasNfcEngagement ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="pt-2 flex gap-2 justify-center">
                  <LikeButton initialLikes={product.likes} productId={product.id} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5"
                    onClick={() => handleSocialShare("native")}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="md:col-span-2">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">{product.status}</Badge>
                  <Badge variant="outline" className="border-white/20">
                    {product.type}
                  </Badge>
                  <Badge variant="outline" className="border-white/20">
                    {product.chain}
                  </Badge>
                  <Badge variant="outline" className="border-white/20">
                    Edition: {product.edition}
                  </Badge>
                </div>
                <p className="text-white/70 mb-6">{product.description}</p>
              </div>
              <div className="hidden md:block">
                <DropdownMenu open={actionsMenuOpen} onOpenChange={setActionsMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.5 1.5C1.5 2.32843 2.17157 3 3 3C3.82843 3 4.5 2.32843 4.5 1.5C4.5 0.671573 3.82843 0 3 0C2.17157 0 1.5 0.671573 1.5 1.5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M6 1.5C6 2.32843 6.67157 3 7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M10.5 1.5C10.5 2.32843 11.1716 3 12 3C12.8284 3 13.5 2.32843 13.5 1.5C13.5 0.671573 12.8284 0 12 0C11.1716 0 10.5 0.671573 10.5 1.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-black border-white/10">
                    <DropdownMenuItem onClick={() => setQrDialogOpen(true)} className="cursor-pointer">
                      <QrCode className="mr-2 h-4 w-4" /> View QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNfcDialogOpen(true)} className="cursor-pointer">
                      <Smartphone className="mr-2 h-4 w-4" /> NFC Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setEditDialogOpen(true)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShareDialogOpen(true)} className="cursor-pointer">
                      <Share2 className="mr-2 h-4 w-4" /> Share Product
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              <Card className="glass-panel border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">NFT Contract</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-white/5 p-1 rounded truncate flex-1">{product.nftAddress}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(product.nftAddress)}
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-neon-green" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Serial Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-white/5 p-1 rounded truncate flex-1">{product.serialNumber}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(product.serialNumber)}
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-neon-green" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="bg-white/5 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">Scan History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="m-0">
                <Card className="glass-panel border-white/10">
                  <CardContent className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Owner</p>
                        <p>{product.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Created</p>
                        <p>{product.created}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Last Scan</p>
                        <p>{product.lastScan}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Total Scans</p>
                        <p>{product.scans}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Blockchain</p>
                        <p>{product.chain}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 mb-1">Status</p>
                        <p>{product.status}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold mb-4">Asset Vault Status</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-neon-green/20 p-2">
                          <Shield className="h-5 w-5 text-neon-green" />
                        </div>
                        <div>
                          <p className="font-medium">Secure</p>
                          <p className="text-sm text-white/70">No reported issues with this product</p>
                        </div>
                      </div>

                      <Button variant="outline" className="mt-2 border-white/10">
                        Report Lost or Stolen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="m-0">
                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <History className="h-5 w-5" />
                      </div>
                      <CardTitle>Scan History</CardTitle>
                    </div>
                    <CardDescription>Track when and where your product has been scanned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {scanHistory.map((scan, index) => (
                        <div key={index} className="relative pl-6 pb-6 last:pb-0">
                          <div className="absolute top-0 left-0 h-full w-px bg-white/10" />
                          <div className="absolute top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <p className="font-medium">{scan.date}</p>
                              <p className="text-sm text-white/70">{scan.location}</p>
                            </div>
                            <Badge variant="outline" className="w-fit border-white/20">
                              {scan.user}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="m-0">
                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <CardTitle>Analytics</CardTitle>
                    </div>
                    <CardDescription>Engagement metrics for your product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Scan Locations</h3>
                        <div className="h-64 rounded-lg bg-white/5 flex items-center justify-center">
                          <p className="text-white/50">Geographic scan distribution map</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <Card className="bg-white/5 border-white/10">
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center">
                                <div className="rounded-full bg-white/10 p-2 mb-2">
                                  <Users className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-medium text-white/70">Unique Users</p>
                                <p className="text-2xl font-bold">42</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white/5 border-white/10">
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center">
                                <div className="rounded-full bg-white/10 p-2 mb-2">
                                  <Smartphone className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-medium text-white/70">Total Scans</p>
                                <p className="text-2xl font-bold">{product.scans}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white/5 border-white/10">
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center">
                                <div className="rounded-full bg-white/10 p-2 mb-2">
                                  <ExternalLink className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-medium text-white/70">Conversion Rate</p>
                                <p className="text-2xl font-bold">68%</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community" className="m-0">
                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <Users className="h-5 w-5" />
                      </div>
                      <CardTitle>Community</CardTitle>
                    </div>
                    <CardDescription>Connect with others who own this product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CommentSection productId={product.id} initialComments={mockComments} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Product QR Code</DialogTitle>
            <DialogDescription>Scan this QR code to access the digital passport for this product.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="qr-url">URL</Label>
              <Input
                id="qr-url"
                value={qrURL}
                onChange={(e) => setQrURL(e.target.value)}
                className="bg-black/30 border-white/10"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="qr-size">Size</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="qr-size"
                  min={100}
                  max={400}
                  step={10}
                  value={[qrSize]}
                  onValueChange={(values) => setQrSize(values[0])}
                  className="flex-1"
                />
                <span className="w-12 text-right">{qrSize}px</span>
              </div>
            </div>

            <div className="flex items-center justify-center p-6">
              {qrCode ? (
                <div className="bg-white p-4 rounded-lg">
                  <Image
                    src={qrCode || "/placeholder.svg"}
                    alt="Product QR Code"
                    width={qrSize}
                    height={qrSize}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div
                  className="bg-white/5 rounded-lg flex items-center justify-center"
                  style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
                >
                  <p className="text-white/50">Generating QR code...</p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setQrDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleDownloadQRCode} disabled={!qrCode}>
              <Download className="mr-2 h-4 w-4" /> Download QR Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NFC Settings Dialog */}
      <Dialog open={nfcDialogOpen} onOpenChange={setNfcDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>NFC Settings</DialogTitle>
            <DialogDescription>Configure the NFC tag settings for this product.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">NFC Status</h4>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${hasNfcEngagement ? "bg-neon-green" : "bg-gray-500"}`}></div>
                <span>{hasNfcEngagement ? "Active and Functioning" : "Inactive"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Tag Information</h4>
              <div className="rounded bg-white/5 p-3">
                <p className="text-sm">Tag ID: NFC-2023-0042</p>
                <p className="text-sm">Type: NTAG 424 DNA</p>
                <p className="text-sm">Last Encoded: {hasNfcEngagement ? new Date().toLocaleDateString() : "Never"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">NFC Content</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-url">Include Product URL</Label>
                  <Switch id="include-url" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-metadata">Include Product Metadata</Label>
                  <Switch id="include-metadata" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-auth">Include Authentication Data</Label>
                  <Switch id="include-auth" defaultChecked />
                </div>
              </div>
            </div>

            {!isNFCSupported && (
              <div className="rounded-md bg-yellow-900/20 border border-yellow-900/30 p-3 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-500">Browser Compatibility Issue</p>
                  <p className="text-xs text-yellow-500/80 mt-1">
                    Your browser doesn't support the Web NFC API required for encoding NFC tags. Please use Chrome for
                    Android or another compatible browser.
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setNfcDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={handleNFCEncode}
              disabled={isNFCEncoding || !isNFCSupported}
              className={nfcEncodingSuccess ? "bg-neon-green text-black hover:bg-neon-green/90" : ""}
            >
              {isNFCEncoding ? (
                <>Encoding Tag...</>
              ) : nfcEncodingSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Successfully Encoded
                </>
              ) : (
                <>Encode NFC Tag</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-xl bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details for this product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-name" className="text-right">
                Name
              </Label>
              <Input id="product-name" defaultValue={product.name} className="col-span-3 bg-black/30 border-white/10" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="product-description"
                defaultValue={product.description}
                className="col-span-3 bg-black/30 border-white/10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-type" className="text-right">
                Type
              </Label>
              <Input id="product-type" defaultValue={product.type} className="col-span-3 bg-black/30 border-white/10" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-status" className="text-right">
                Status
              </Label>
              <Input
                id="product-status"
                defaultValue={product.status}
                className="col-span-3 bg-black/30 border-white/10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-edition" className="text-right">
                Edition
              </Label>
              <Input
                id="product-edition"
                defaultValue={product.edition}
                className="col-span-3 bg-black/30 border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Pencil className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Share Product</DialogTitle>
            <DialogDescription>Share this product's digital passport with others.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 rounded bg-white/5 p-3">
              <code className="text-xs truncate flex-1">https://prime-phygital.com/p/{product.id}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => copyToClipboard(`https://prime-phygital.com/p/${product.id}`)}
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-neon-green" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("facebook")}
              >
                <Facebook className="h-5 w-5" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("twitter")}
              >
                <Twitter className="h-5 w-5" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("linkedin")}
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-xs">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("email")}
              >
                <Mail className="h-5 w-5" />
                <span className="text-xs">Email</span>
              </Button>
            </div>
          </div>
          <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
