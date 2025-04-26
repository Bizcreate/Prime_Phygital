"use client"

import { useState } from "react"
import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
  }
  text: string
  timestamp: string
}

interface CommentSectionProps {
  productId: string
  initialComments?: Comment[]
  onAddComment?: (comment: Omit<Comment, "id" | "timestamp">) => void
}

export function CommentSection({ productId, initialComments = [], onAddComment }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [commentText, setCommentText] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "/user-avatar.png",
      },
      text: commentText,
      timestamp: new Date().toISOString(),
    }

    setComments((prev) => [newComment, ...prev])
    setCommentText("")

    if (onAddComment) {
      onAddComment({
        user: newComment.user,
        text: newComment.text,
      })
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  if (!isExpanded) {
    return (
      <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={() => setIsExpanded(true)}>
        <MessageSquare className="h-4 w-4" />
        <span className="text-xs">{comments.length} Comments</span>
      </Button>
    )
  }

  return (
    <Card className="border-white/10 bg-black/30 mt-4">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user-avatar.png" alt="Your avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                className="min-h-[40px] resize-none bg-black/20 border-white/10"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAddComment()
                  }
                }}
              />
              <Button size="icon" onClick={handleAddComment} disabled={!commentText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {comments.length > 0 ? (
            <div className="space-y-3 mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold">{comment.user.name}</p>
                      <span className="text-xs text-white/50">{formatTimestamp(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-white/90 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-white/50 py-4">No comments yet. Be the first to comment!</p>
          )}

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              Collapse
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
