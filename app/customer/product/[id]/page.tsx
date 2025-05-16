"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Shield,
  History,
  Share2,
  QrCode,
  Award,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

const products = [
  {
    id: "1",
    name: "Neon Streak Sneakers",
    brand: "Urban Athletics",
    serialNumber: "NS-8742",
    manufactureDate: "January 15, 2025",
    image: "/neon-streak-sneakers.png",
    description:
      "Limited edition sneakers with embedded NFC technology. These sneakers feature a unique design and premium materials for both style and comfort.",
    status: "authentic",
    challenges: [
      {
        name: "Summer Sneaker Challenge",
        progress: 65,
        rewards: 10000,
      },
    ],
    history: [
      {
        event: "Authentication",
        date: "May 2, 2025",
        location: "Urban Athletics Store, New York",
      },
      {
        event: "Ownership Transfer",
        date: "May 2, 2025",
        location: "Urban Athletics Store, New York",
      },
      {
        event: "Manufacture",
        date: "January 15, 2025",
        location: "Urban Athletics Factory, Milan",
      },
    ],
  },
  {
    id: "2",
    name: "Designer Hoodie",
    brand: "Streetwear Co.",
    serialNumber: "DH-3921",
    manufactureDate: "February 10, 2025",
    image: "/stylish-urban-jacket.png",
    description:
      "Premium designer hoodie with embedded authentication technology. Features high-quality materials and exclusive design elements.",
    status: "authentic",
    challenges: [
      {
        name: "Hoodie Rewards Program",
        progress: 30,
        rewards: 5000,
      },
    ],
    history: [
      {
        event: "Authentication",
        date: "April 15, 2025",
        location: "Streetwear Co. Online Store",
      },
      {
        event: "Shipping",
        date: "April 12, 2025",
        location: "Streetwear Co. Distribution Center",
      },
      {
        event: "Manufacture",
        date: "February 10, 2025",
        location: "Streetwear Co. Factory, Paris",
      },
    ],
  },
]

export default function ProductPage() {
  const { toast } = useToast()
  const params = useParams()
  const id = params.id as string

  // Find the product based on the ID from the URL
  const product = products.find((p) => p.id === id) || products[0]
  const [showQR, setShowQR] = useState(false)

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Product link has been copied to clipboard",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/customer/collection">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
        <Badge
          variant="outline"
          className={
            product.status === "authentic"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }
        >
          {product.status === "authentic" ? (
            <>
              <Shield className="h-3 w-3 mr-1" /> Authentic
            </>
          ) : (
            <>
              <AlertTriangle className="h-3 w-3 mr-1" /> Unverified
            </>
          )}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <div className="md:flex">
              <div className="relative h-64 w-full md:w-64 md:h-auto">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 p-6">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <p className="mt-2">{product.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-y-2">
                  <p className="text-sm font-medium">Serial Number:</p>
                  <p className="text-sm">{product.serialNumber}</p>
                  <p className="text-sm font-medium">Manufacture Date:</p>
                  <p className="text-sm">{product.manufactureDate}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => setShowQR(!showQR)}>
                    <QrCode className="h-4 w-4 mr-2" />
                    {showQR ? "Hide QR" : "Show QR"}
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {showQR && (
                  <div className="mt-4 flex justify-center">
                    <div className="relative h-48 w-48">
                      <Image src="/abstract-qr-code.png" alt="Product QR Code" fill className="object-contain" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Tabs defaultValue="challenges" className="space-y-4">
            <TabsList>
              <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
              <TabsTrigger value="history">Product History</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="challenges" className="space-y-4">
              {product.challenges.length > 0 ? (
                <div className="space-y-4">
                  {product.challenges.map((challenge, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{challenge.name}</h3>
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">{challenge.progress}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-secondary">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                                  style={{ width: `${challenge.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {challenge.rewards} pts
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <Link href={`/customer/wear-to-earn/${i + 1}`}>
                            <Button variant="outline" size="sm">
                              View Challenge
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Active Challenges</h3>
                    <p className="text-muted-foreground mb-4">
                      This product doesn't have any active challenges at the moment.
                    </p>
                    <Link href="/customer/wear-to-earn">
                      <Button>Browse Available Challenges</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product History</CardTitle>
                  <CardDescription>Track the journey of your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {product.history.map((event, i) => (
                      <div key={i} className="relative pl-6">
                        {i < product.history.length - 1 && (
                          <div className="absolute top-6 bottom-0 left-3 border-l-2 border-dashed border-muted-foreground/20" />
                        )}
                        <div className="absolute top-1 left-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.event}</h4>
                          <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{event.date}</span>
                          </div>
                          <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>Technical specifications and materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Materials</h4>
                      <p className="text-sm">
                        {product.id === "1"
                          ? "Upper: Synthetic mesh, Sole: Rubber compound, Lining: Recycled polyester"
                          : "Shell: 80% Cotton, 20% Polyester, Lining: 100% Cotton, Drawstrings: Organic cotton"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Care Instructions</h4>
                      <p className="text-sm">
                        {product.id === "1"
                          ? "Clean with a soft brush or cloth. Air dry only. Do not machine wash."
                          : "Machine wash cold with like colors. Tumble dry low. Do not iron print/design."}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Authentication Technology</h4>
                      <p className="text-sm">
                        This product contains an embedded NFC chip that stores its digital passport on the blockchain.
                        The chip is securely embedded and tamper-proof.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>Product authentication details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                {product.status === "authentic" ? (
                  <>
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-center mb-2">Authentic Product</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      This product has been verified as authentic using blockchain technology.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-medium text-center mb-2">Unverified Product</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      This product has not been verified. Please contact support for assistance.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blockchain Verification</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Verified
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">NFC Chip Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Verified</span>
                  <span className="text-sm">May 16, 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ownership</CardTitle>
              <CardDescription>Digital ownership details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Owner</span>
                  <span className="text-sm font-medium">You</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ownership Date</span>
                  <span className="text-sm">May 2, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Digital Passport</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Active
                  </Badge>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <History className="h-4 w-4 mr-2" />
                    View on Blockchain
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
