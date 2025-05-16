"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export default function CreateChallenge() {
  const router = useRouter()
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [milestones, setMilestones] = useState([{ id: 1, name: "", points: "100", description: "" }])

  const addMilestone = () => {
    const newId = milestones.length > 0 ? Math.max(...milestones.map((m) => m.id)) + 1 : 1
    setMilestones([...milestones, { id: newId, name: "", points: "100", description: "" }])
  }

  const removeMilestone = (id: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Challenge created",
      description: "Your wear-to-earn challenge has been created successfully.",
    })

    // Redirect back to the social engagement dashboard
    router.push("/dashboard/social-engagement")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create Wear-to-Earn Challenge</h2>
        <Button variant="outline" onClick={() => router.push("/dashboard/social-engagement")}>
          Cancel
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
            <CardDescription>Create a new challenge for users to participate in and earn rewards</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Challenge Title</Label>
                <Input id="title" placeholder="Enter challenge title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what users need to do to complete this challenge"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Challenge Banner Image</Label>
                <ImageUpload />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Challenge Settings</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="challenge-type">Challenge Type</Label>
                  <Select defaultValue="wear">
                    <SelectTrigger id="challenge-type">
                      <SelectValue placeholder="Select challenge type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wear">Product Wearing</SelectItem>
                      <SelectItem value="usage">Product Usage</SelectItem>
                      <SelectItem value="photo">Photo Submission</SelectItem>
                      <SelectItem value="location">Location Check-in</SelectItem>
                      <SelectItem value="social">Social Sharing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="total-points">Total Points Available</Label>
                  <Input id="total-points" type="number" min="100" defaultValue="1000" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-participants">Maximum Participants</Label>
                  <Input id="max-participants" type="number" min="1" defaultValue="500" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-connection">Connected Products</Label>
                <Select defaultValue="neon-streak">
                  <SelectTrigger id="product-connection">
                    <SelectValue placeholder="Select products for this challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="neon-streak">Neon Streak Sneakers</SelectItem>
                    <SelectItem value="elegant-timepiece">Elegant Timepiece</SelectItem>
                    <SelectItem value="urban-jacket">Stylish Urban Jacket</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="leaderboard" defaultChecked />
                <Label htmlFor="leaderboard">Enable public leaderboard</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="verification" defaultChecked />
                <Label htmlFor="verification">Require verification for completion</Label>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Challenge Milestones</h3>
                <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                  <Plus className="h-4 w-4 mr-1" /> Add Milestone
                </Button>
              </div>

              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="space-y-4 border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMilestone(milestone.id)}
                      disabled={milestones.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${milestone.id}-name`}>Milestone Name</Label>
                    <Input id={`milestone-${milestone.id}-name`} placeholder="e.g., First Week Complete" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${milestone.id}-description`}>Description</Label>
                    <Textarea
                      id={`milestone-${milestone.id}-description`}
                      placeholder="Describe what users need to do to reach this milestone"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-${milestone.id}-points`}>Points Reward</Label>
                      <Input
                        id={`milestone-${milestone.id}-points`}
                        type="number"
                        min="10"
                        defaultValue="100"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`milestone-${milestone.id}-requirement`}>Requirement Type</Label>
                      <Select defaultValue="days">
                        <SelectTrigger id={`milestone-${milestone.id}-requirement`}>
                          <SelectValue placeholder="Select requirement type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days of Wear</SelectItem>
                          <SelectItem value="hours">Hours of Usage</SelectItem>
                          <SelectItem value="actions">Completed Actions</SelectItem>
                          <SelectItem value="shares">Social Shares</SelectItem>
                          <SelectItem value="photos">Photo Submissions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${milestone.id}-value`}>Requirement Value</Label>
                    <Input id={`milestone-${milestone.id}-value`} type="number" min="1" defaultValue="7" required />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/social-engagement")}>
              Cancel
            </Button>
            <Button type="submit">Create Challenge</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
