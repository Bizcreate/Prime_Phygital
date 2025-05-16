"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, History, Share2 } from "lucide-react"

export default function Collection() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Collection</h2>
          <p className="text-muted-foreground">Manage your authenticated products</p>
        </div>
        <Link href="/customer/scan">
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            name: "Neon Streak Sneakers",
            brand: "Urban Athletics",
            date: "Authenticated 2 weeks ago",
            image: "/neon-streak-sneakers.png",
            challenges: 2,
          },
          {
            name: "Designer Hoodie",
            brand: "Streetwear Co.",
            date: "Authenticated 1 month ago",
            image: "/stylish-urban-jacket.png",
            challenges: 1,
          },
          {
            name: "Limited Edition Watch",
            brand: "Timepiece Masters",
            date: "Authenticated 2 months ago",
            image: "/elegant-timepiece.png",
            challenges: 0,
          },
          {
            name: "Premium Headphones",
            brand: "Audio Masters",
            date: "Authenticated 3 months ago",
            image: "/modern-commute-audio.png",
            challenges: 0,
          },
          {
            name: "Designer Tote Bag",
            brand: "Luxury Accessories",
            date: "Authenticated 4 months ago",
            image: "/elegant-leather-tote.png",
            challenges: 0,
          },
        ].map((product, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{product.name}</h3>
                {product.challenges > 0 && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {product.challenges} active
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <p className="text-xs text-muted-foreground mt-1">{product.date}</p>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <History className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
