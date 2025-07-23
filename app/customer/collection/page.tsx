import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { History } from "lucide-react"

export default function CollectionPage() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          id: "1",
          name: "Neon Streak Sneakers",
          brand: "Urban Athletics",
          date: "Authenticated 2 weeks ago",
          image: "/neon-streak-sneakers.png",
          challenges: 2,
        },
        {
          id: "2",
          name: "Designer Hoodie",
          brand: "Streetwear Co.",
          date: "Authenticated 1 month ago",
          image: "/stylish-urban-jacket.png",
          challenges: 1,
        },
        {
          id: "3",
          name: "Limited Edition Watch",
          brand: "Timepiece Masters",
          date: "Authenticated 2 months ago",
          image: "/elegant-timepiece.png",
          challenges: 0,
        },
        {
          id: "4",
          name: "Premium Headphones",
          brand: "Audio Masters",
          date: "Authenticated 3 months ago",
          image: "/modern-commute-audio.png",
          challenges: 0,
        },
        {
          id: "5",
          name: "Designer Tote Bag",
          brand: "Luxury Accessories",
          date: "Authenticated 4 months ago",
          image: "/elegant-leather-tote.png",
          challenges: 0,
        },
      ].map((product, i) => (
        <Card key={product.id} className="overflow-hidden">
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
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Link href={`/customer/product/${product.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <History className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
