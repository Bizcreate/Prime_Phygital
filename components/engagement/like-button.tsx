"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LikeButtonProps {
  initialLikes?: number
  productId: string
  onLike?: (liked: boolean, id: string) => void
  className?: string
}

export function LikeButton({ initialLikes = 0, productId, onLike, className }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = () => {
    const newLikedState = !liked
    setLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)

    // Call the callback if provided
    if (onLike) {
      onLike(newLikedState, productId)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={cn("flex items-center gap-1.5 group transition-all", className)}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-300",
          liked ? "fill-red-500 text-red-500" : "fill-transparent group-hover:text-red-400",
          isAnimating && "scale-125",
        )}
      />
      <span className="text-xs">{likeCount}</span>
    </Button>
  )
}
