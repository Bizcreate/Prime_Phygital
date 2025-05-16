"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Award, MessageSquare, HelpCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/components/ui/use-toast"

export default function CreateContent() {
  const router = useRouter()
  const { toast } = useToast()
  const [contentType, setContentType] = useState("post")
  const [date, setDate] = useState<Date>()
  const [isScheduled, setIsScheduled] = useState(false)
  const [isWearToEarn, setIsWearToEarn] = useState(true)
  const [pointsValue, setPointsValue] = useState("50")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Content created",
      description: `Your ${contentType} has been ${isScheduled ? "scheduled" : "published"}.`,
    })

    // Redirect back to the social engagement dashboard
    router.push("/dashboard/social-engagement")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create New Content</h2>
        <Button variant="outline" onClick={() => router.push("/dashboard/social-engagement")}>
          Cancel
        </Button>
      </div>

      <Tabs defaultValue="post" value={contentType} onValueChange={setContentType} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="post">
            <MessageSquare className="mr-2 h-4 w-4" />
            Post
          </TabsTrigger>
          <TabsTrigger value="challenge">
            <Award className="mr-2 h-4 w-4" />
            Challenge
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <HelpCircle className="mr-2 h-4 w-4" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="poll">
            <MessageSquare className="mr-2 h-4 w-4" />
            Poll
          </TabsTrigger>
        </TabsList>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Create a new {contentType}</CardTitle>
              <CardDescription>Fill in the details below to create your {contentType}.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder={`Enter ${contentType} title`} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder={`Enter ${contentType} description`}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Media</Label>
                <ImageUpload />
              </div>

              {contentType === "challenge" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="challenge-type">Challenge Type</Label>
                    <Select defaultValue="photo">
                      <SelectTrigger>
                        <SelectValue placeholder="Select challenge type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photo">Photo Submission</SelectItem>
                        <SelectItem value="video">Video Submission</SelectItem>
                        <SelectItem value="check-in">Location Check-in</SelectItem>
                        <SelectItem value="usage">Product Usage</SelectItem>
                        <SelectItem value="social">Social Share</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input id="duration" type="number" min="1" max="90" defaultValue="7" required />
                  </div>
                </div>
              )}

              {contentType === "quiz" && (
                <div className="space-y-4 border p-4 rounded-md">
                  <h3 className="font-medium">Quiz Questions</h3>
                  <div className="space-y-2">
                    <Label htmlFor="question1">Question 1</Label>
                    <Input id="question1" placeholder="Enter your question" required />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="q1a1">Answer 1</Label>
                      <Input id="q1a1" placeholder="Option 1" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="q1a2">Answer 2</Label>
                      <Input id="q1a2" placeholder="Option 2" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="q1a3">Answer 3</Label>
                      <Input id="q1a3" placeholder="Option 3" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="q1a4">Answer 4</Label>
                      <Input id="q1a4" placeholder="Option 4" required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="correct-answer">Correct Answer</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="correct-answer">
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                        <SelectItem value="3">Option 3</SelectItem>
                        <SelectItem value="4">Option 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                    + Add Another Question
                  </Button>
                </div>
              )}

              {contentType === "poll" && (
                <div className="space-y-4 border p-4 rounded-md">
                  <h3 className="font-medium">Poll Options</h3>
                  <div className="space-y-2">
                    <Label htmlFor="option1">Option 1</Label>
                    <Input id="option1" placeholder="Enter poll option" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option2">Option 2</Label>
                    <Input id="option2" placeholder="Enter poll option" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option3">Option 3</Label>
                    <Input id="option3" placeholder="Enter poll option" />
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                    + Add Another Option
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch id="scheduled" checked={isScheduled} onCheckedChange={setIsScheduled} />
                <Label htmlFor="scheduled">Schedule for later</Label>
              </div>

              {isScheduled && (
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label>Publication Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Publication Time</Label>
                    <Select defaultValue="9">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9:00 AM</SelectItem>
                        <SelectItem value="12">12:00 PM</SelectItem>
                        <SelectItem value="15">3:00 PM</SelectItem>
                        <SelectItem value="18">6:00 PM</SelectItem>
                        <SelectItem value="21">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Wear-to-Earn Settings</h3>

                <div className="flex items-center space-x-2">
                  <Switch id="wear-to-earn" checked={isWearToEarn} onCheckedChange={setIsWearToEarn} />
                  <Label htmlFor="wear-to-earn">Enable Wear-to-Earn for this content</Label>
                </div>

                {isWearToEarn && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="points">Points Value</Label>
                      <Select value={pointsValue} onValueChange={setPointsValue}>
                        <SelectTrigger id="points">
                          <SelectValue placeholder="Select points value" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 points</SelectItem>
                          <SelectItem value="25">25 points</SelectItem>
                          <SelectItem value="50">50 points</SelectItem>
                          <SelectItem value="100">100 points</SelectItem>
                          <SelectItem value="200">200 points</SelectItem>
                          <SelectItem value="500">500 points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="required-action">Required Action</Label>
                      <Select defaultValue="engage">
                        <SelectTrigger id="required-action">
                          <SelectValue placeholder="Select required action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engage">Engage with post</SelectItem>
                          <SelectItem value="comment">Leave a comment</SelectItem>
                          <SelectItem value="share">Share on social media</SelectItem>
                          <SelectItem value="complete">Complete challenge</SelectItem>
                          <SelectItem value="answer">Answer correctly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-connection">Connect to Product</Label>
                      <Select defaultValue="none">
                        <SelectTrigger id="product-connection">
                          <SelectValue placeholder="Select product (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No product connection</SelectItem>
                          <SelectItem value="neon-streak">Neon Streak Sneakers</SelectItem>
                          <SelectItem value="elegant-timepiece">Elegant Timepiece</SelectItem>
                          <SelectItem value="urban-jacket">Stylish Urban Jacket</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/social-engagement")}>
                Cancel
              </Button>
              <Button type="submit">
                {isScheduled ? "Schedule" : "Publish"} {contentType}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Tabs>
    </div>
  )
}
