"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ImageIcon, Award } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SocialPostCreator() {
  const { toast } = useToast()
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Post created",
      description: "Your post has been published successfully.",
    })

    setContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
      <h3 className="font-medium">Create New Post</h3>

      <Textarea
        placeholder="What would you like to share with your customers?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm">
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Image
        </Button>
        <Button type="button" variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </Button>
        <Button type="button" variant="outline" size="sm">
          <Award className="h-4 w-4 mr-2" />
          Add Points
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Publish</Button>
      </div>
    </form>
  )
}
