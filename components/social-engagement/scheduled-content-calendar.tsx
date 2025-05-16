"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Award, MessageSquare, HelpCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for scheduled content
const mockScheduledContent = [
  {
    id: 1,
    title: "Summer Sneaker Challenge Launch",
    type: "challenge",
    date: new Date(2025, 4, 20), // May 20, 2025
    time: "9:00 AM",
  },
  {
    id: 2,
    title: "New Product Teaser",
    type: "post",
    date: new Date(2025, 4, 22), // May 22, 2025
    time: "3:00 PM",
  },
  {
    id: 3,
    title: "Sneaker Trivia Quiz",
    type: "quiz",
    date: new Date(2025, 4, 25), // May 25, 2025
    time: "6:00 PM",
  },
  {
    id: 4,
    title: "Favorite Summer Style Poll",
    type: "poll",
    date: new Date(2025, 4, 28), // May 28, 2025
    time: "12:00 PM",
  },
]

export function ScheduledContentCalendar() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [scheduledContent, setScheduledContent] = useState(mockScheduledContent)

  const getContentForDate = (date: Date | undefined) => {
    if (!date) return []

    return scheduledContent.filter(
      (content) =>
        content.date.getDate() === date.getDate() &&
        content.date.getMonth() === date.getMonth() &&
        content.date.getFullYear() === date.getFullYear(),
    )
  }

  const handleEdit = (id: number) => {
    toast({
      title: "Edit content",
      description: `Editing content with ID: ${id}`,
    })
  }

  const handleDelete = (id: number) => {
    setScheduledContent(scheduledContent.filter((content) => content.id !== id))
    toast({
      title: "Content deleted",
      description: "The scheduled content has been deleted.",
    })
  }

  const contentForSelectedDate = getContentForDate(date)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "challenge":
        return <Award className="h-4 w-4" />
      case "quiz":
        return <HelpCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "challenge":
        return <Badge className="bg-purple-500">Challenge</Badge>
      case "quiz":
        return <Badge className="bg-blue-500">Quiz</Badge>
      case "poll":
        return <Badge className="bg-green-500">Poll</Badge>
      default:
        return <Badge>Post</Badge>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <div className="md:col-span-3">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </div>

      <div className="md:col-span-4">
        <h3 className="font-medium mb-4">
          {date ? (
            <>Scheduled for {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</>
          ) : (
            "Select a date"
          )}
        </h3>

        {contentForSelectedDate.length > 0 ? (
          <div className="space-y-3">
            {contentForSelectedDate.map((content) => (
              <Card key={content.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getTypeIcon(content.type)}</div>
                      <div>
                        <h4 className="font-medium">{content.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {getTypeBadge(content.type)}
                          <span className="text-sm text-muted-foreground">{content.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(content.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(content.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px] border rounded-md">
            <p className="text-muted-foreground">No content scheduled for this date</p>
          </div>
        )}
      </div>
    </div>
  )
}
