"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Heart,
  Share2,
  Star,
  QrCode,
  Smartphone,
  Shield,
  Clock,
  Play,
  Pause,
  ArrowLeft,
  Send,
  ThumbsUp,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock product data
const products = {
  "1": {
    id: "1",
    name: "Neon Streak Sneakers",
    brand: "Urban Athletics",
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
    likes: 42,
    rating: 4.8,
    reviews: 15,
    challenges: 2,
  },
  "2": {
    id: "2",
    name: "Designer Hoodie",
    brand: "Streetwear Co.",
    description:
      "Premium streetwear hoodie with NFC authentication chip. Made from organic cotton with sustainable manufacturing processes.",
    price: "$189.99",
    serialNumber: "DH-2023-5521",
    manufactureDate: "2023-04-20",
    status: "Authentic",
    owner: "Alex Johnson",
    blockchain: "Polygon",
    tokenId: "0x7b9e...f3a1",
    image: "/stylish-urban-jacket.png",
    category: "Apparel",
    color: "Charcoal Gray/Orange",
    size: "L",
    material: "Organic Cotton, Polyester",
    features: ["NFC Authentication", "Organic Materials", "Limited Edition", "Blockchain Verified"],
    careInstructions: "Machine wash cold. Tumble dry low. Do not bleach.",
    warranty: "6 Months Limited Warranty",
    sustainabilityScore: 9.2,
    authenticity: "Verified",
    lastVerified: "2023-10-22",
    likes: 28,
    rating: 4.6,
    reviews: 8,
    challenges: 1,
  },
  "3": {
    id: "3",
    name: "Limited Edition Watch",
    brand: "Timepiece Masters",
    description:
      "Luxury mechanical watch with NFC authentication. Features Swiss movement and premium materials with blockchain verification.",
    price: "$2,499.99",
    serialNumber: "LW-2023-1337",
    manufactureDate: "2023-03-10",
    status: "Authentic",
    owner: "Alex Johnson",
    blockchain: "Ethereum",
    tokenId: "0x9c4f...d8e2",
    image: "/elegant-timepiece.png",
    category: "Accessories",
    color: "Gold/Black",
    size: "42mm",
    material: "Stainless Steel, Leather",
    features: ["NFC Authentication", "Swiss Movement", "Limited Edition", "Blockchain Verified"],
    careInstructions: "Keep dry. Service every 2-3 years. Avoid magnetic fields.",
    warranty: "2 Year International Warranty",
    sustainabilityScore: 7.8,
    authenticity: "Verified",
    lastVerified: "2023-11-05",
    likes: 67,
    rating: 4.9,
    reviews: 23,
    challenges: 0,
  },
  "4": {
    id: "4",
    name: "Premium Headphones",
    brand: "Audio Masters",
    description:
      "High-end wireless headphones with NFC pairing and authentication. Premium sound quality with blockchain verification.",
    price: "$449.99",
    serialNumber: "PH-2023-9988",
    manufactureDate: "2023-02-15",
    status: "Authentic",
    owner: "Alex Johnson",
    blockchain: "Base",
    tokenId: "0x2a5c...b7f9",
    image: "/modern-commute-audio.png",
    category: "Electronics",
    color: "Matte Black",
    size: "Over-ear",
    material: "Aluminum, Premium Leather",
    features: ["NFC Authentication", "Wireless", "Noise Cancelling", "Blockchain Verified"],
    careInstructions: "Clean with dry cloth. Store in provided case. Avoid moisture.",
    warranty: "1 Year Limited Warranty",
    sustainabilityScore: 8.1,
    authenticity: "Verified",
    lastVerified: "2023-08-15",
    likes: 35,
    rating: 4.7,
    reviews: 12,
    challenges: 0,
  },
  "5": {
    id: "5",
    name: "Designer Tote Bag",
    brand: "Luxury Accessories",
    description:
      "Handcrafted leather tote bag with NFC authentication. Made from premium Italian leather with sustainable practices.",
    price: "$599.99",
    serialNumber: "TB-2023-4455",
    manufactureDate: "2023-01-20",
    status: "Authentic",
    owner: "Alex Johnson",
    blockchain: "Polygon",
    tokenId: "0x8d3e...c6a4",
    image: "/elegant-leather-tote.png",
    category: "Accessories",
    color: "Cognac Brown",
    size: "Large",
    material: "Italian Leather, Cotton Lining",
    features: ["NFC Authentication", "Handcrafted", "Italian Leather", "Blockchain Verified"],
    careInstructions: "Clean with leather conditioner. Avoid water. Store with dust bag.",
    warranty: "1 Year Limited Warranty",
    sustainabilityScore: 8.7,
    authenticity: "Verified",
    lastVerified: "2023-07-20",
    likes: 51,
    rating: 4.8,
    reviews: 19,
    challenges: 0,
  },
}

export default function CustomerProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId as keyof typeof products]

  const [activeTab, setActiveTab] = useState("details")
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(product?.likes || 0)
  const [isWearTracking, setIsWearTracking] = useState(false)
  const [wearTime, setWearTime] = useState(0)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [userPoints, setUserPoints] = useState(2450)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWearTracking) {
      interval = setInterval(() => {
        setWearTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isWearTracking])

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/customer/collection">
            <Button>Back to Collection</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = async () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))

    if (!isLiked) {
      setUserPoints((prev) => prev + 10)
      toast({
        title: "Points Earned! 🎉",
        description: "You earned 10 points for liking this product!",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name} by ${product.brand}`,
          url: window.location.href,
        })
        setUserPoints((prev) => prev + 25)
        toast({
          title: "Points Earned! 🎉",
          description: "You earned 25 points for sharing this product!",
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setUserPoints((prev) => prev + 25)
      toast({
        title: "Link Copied & Points Earned! 🎉",
        description: "Product link copied to clipboard! You earned 25 points!",
      })
    }
  }

  const handleStartWearTracking = () => {
    setIsWearTracking(true)
    toast({
      title: "Wear Tracking Started! 👟",
      description: "Start wearing your product to earn points!",
    })
  }

  const handleStopWearTracking = () => {
    setIsWearTracking(false)
    const pointsEarned = Math.floor(wearTime / 60) * 5 // 5 points per minute
    if (pointsEarned > 0) {
      setUserPoints((prev) => prev + pointsEarned)
      toast({
        title: `Wear Session Complete! 🎉`,
        description: `You earned ${pointsEarned} points for wearing this product for ${Math.floor(wearTime / 60)} minutes!`,
      })
    }
    setWearTime(0)
  }

  const handleSubmitReview = () => {
    if (newReview.trim()) {
      const pointsEarned = 50
      setUserPoints((prev) => prev + pointsEarned)
      toast({
        title: "Review Submitted! 🎉",
        description: `Thank you for your review! You earned ${pointsEarned} points!`,
      })
      setNewReview("")
      setNewRating(5)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/customer/collection">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collection
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 hover:bg-green-600">{product.status}</Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`${isLiked ? "text-red-500" : "text-white"} hover:text-red-500`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                    {likes}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleShare} className="text-white hover:text-blue-500">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                  ))}
                  <span className="text-white text-sm ml-1">({product.reviews})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wear-to-Earn Tracking */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Wear-to-Earn Tracking
              </CardTitle>
              <CardDescription>Track your product usage and earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-purple-500">{formatTime(wearTime)}</div>
                <div className="flex justify-center space-x-2">
                  {!isWearTracking ? (
                    <Button
                      onClick={handleStartWearTracking}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Wearing
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStopWearTracking}
                      variant="outline"
                      className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Session
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Earn 5 points per minute of verified wear time</p>
              </div>
            </CardContent>
          </Card>

          {/* Points Display */}
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Your Points</p>
                  <p className="text-2xl font-bold text-green-500">{userPoints.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-muted-foreground">{product.brand}</p>
            <p className="text-2xl font-bold mt-2">{product.price}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <p className="text-muted-foreground">{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-muted-foreground">Serial Number</h3>
                  <p>{product.serialNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">Manufacture Date</h3>
                  <p>{product.manufactureDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">Category</h3>
                  <p>{product.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">Color</h3>
                  <p>{product.color}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">Size</h3>
                  <p>{product.size}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">Material</h3>
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
                <h3 className="font-semibold text-muted-foreground">Sustainability Score</h3>
                <div className="flex items-center mt-1">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-300 to-green-500"
                    style={{ width: `${product.sustainabilityScore * 10}%` }}
                  ></div>
                  <span className="ml-2">{product.sustainabilityScore}/10</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-muted-foreground">Care Instructions</h3>
                <p className="text-sm">{product.careInstructions}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-muted-foreground">Warranty</h3>
                <p className="text-sm">{product.warranty}</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Write Review */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Write a Review</CardTitle>
                    <CardDescription>Share your experience and earn 50 points!</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <button key={i} onClick={() => setNewRating(i + 1)} className="focus:outline-none">
                            <Star
                              className={`h-5 w-5 ${i < newRating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review">Your Review</Label>
                      <Textarea
                        id="review"
                        placeholder="Share your thoughts about this product..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleSubmitReview} disabled={!newReview.trim()} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Review (+50 points)
                    </Button>
                  </CardContent>
                </Card>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      user: "Sarah M.",
                      rating: 5,
                      date: "2 weeks ago",
                      comment: "Amazing quality and the NFC authentication gives me peace of mind. Love the design!",
                      helpful: 12,
                    },
                    {
                      user: "Mike R.",
                      rating: 4,
                      date: "1 month ago",
                      comment: "Great product overall. The blockchain verification is a nice touch. Highly recommend!",
                      helpful: 8,
                    },
                  ].map((review, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{review.user}</p>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${j < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm mb-2">{review.comment}</p>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Details</CardTitle>
                  <CardDescription>Blockchain verification and ownership information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className="bg-green-500 hover:bg-green-600">{product.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Last Verified</span>
                    <span>{product.lastVerified}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Blockchain</span>
                    <span>{product.blockchain}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="text-xs font-mono">{product.tokenId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Owner</span>
                    <span>{product.owner}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Smartphone className="h-4 w-4 mr-2" />
                    NFC Settings
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Shield className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
