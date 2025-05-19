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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateWearToEarnProgram() {
  const router = useRouter()
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [programType, setProgramType] = useState("time-based")
  const [milestones, setMilestones] = useState([{ id: 1, name: "", points: "100", requirement: "1", type: "days" }])

  const addMilestone = () => {
    const newId = milestones.length > 0 ? Math.max(...milestones.map((m) => m.id)) + 1 : 1
    setMilestones([...milestones, { id: newId, name: "", points: "100", requirement: "1", type: "days" }])
  }

  const removeMilestone = (id: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Program created",
      description: "Your wear-to-earn program has been created successfully.",
    })

    // Redirect back to the wear-to-earn dashboard
    router.push("/dashboard/wear-to-earn")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create Wear-to-Earn Program</h2>
        <Button variant="outline" onClick={() => router.push("/dashboard/wear-to-earn")}>
          Cancel
        </Button>
      </div>

      <Tabs defaultValue="time-based" value={programType} onValueChange={setProgramType} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="time-based">Time-Based</TabsTrigger>
          <TabsTrigger value="activity-based">Activity-Based</TabsTrigger>
          <TabsTrigger value="social-based">Social-Based</TabsTrigger>
        </TabsList>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
              <CardDescription>
                Create a new wear-to-earn program for users to earn rewards by wearing your products
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Program Title</Label>
                  <Input id="title" placeholder="Enter program title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what users need to do to earn rewards in this program"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Program Banner Image</Label>
                  <ImageUpload />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Program Settings</h3>

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
                      <SelectValue placeholder="Select products for this program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="neon-streak">Neon Streak Sneakers</SelectItem>
                      <SelectItem value="elegant-timepiece">Elegant Timepiece</SelectItem>
                      <SelectItem value="urban-jacket">Stylish Urban Jacket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {programType === "time-based" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-daily-wear">Minimum Daily Wear Time (hours)</Label>
                      <Input id="min-daily-wear" type="number" min="0.5" step="0.5" defaultValue="2" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-daily-wear">Maximum Daily Wear Time (hours)</Label>
                      <Input id="max-daily-wear" type="number" min="1" step="0.5" defaultValue="8" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="points-per-hour">Points Per Hour</Label>
                      <Input id="points-per-hour" type="number" min="1" defaultValue="25" required />
                    </div>
                  </div>
                )}

                {programType === "activity-based" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="activity-type">Activity Type</Label>
                      <Select defaultValue="steps">
                        <SelectTrigger id="activity-type">
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="steps">Step Count</SelectItem>
                          <SelectItem value="distance">Distance</SelectItem>
                          <SelectItem value="calories">Calories Burned</SelectItem>
                          <SelectItem value="workouts">Workouts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="daily-goal">Daily Goal</Label>
                      <Input id="daily-goal" type="number" min="1000" defaultValue="10000" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="points-per-completion">Points Per Daily Goal Completion</Label>
                      <Input id="points-per-completion" type="number" min="10" defaultValue="50" required />
                    </div>
                  </div>
                )}

                {programType === "social-based" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="social-action">Required Social Action</Label>
                      <Select defaultValue="share">
                        <SelectTrigger id="social-action">
                          <SelectValue placeholder="Select required social action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="share">Share Product</SelectItem>
                          <SelectItem value="post">Create Post</SelectItem>
                          <SelectItem value="tag">Tag Brand</SelectItem>
                          <SelectItem value="review">Write Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="once">One-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="points-per-action">Points Per Action</Label>
                      <Input id="points-per-action" type="number" min="10" defaultValue="100" required />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch id="leaderboard" defaultChecked />
                  <Label htmlFor="leaderboard">Enable public leaderboard</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="verification" defaultChecked />
                  <Label htmlFor="verification">Require verification for activities</Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Program Milestones</h3>
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
                      <Input
                        id={`milestone-${milestone.id}-name`}
                        placeholder={`e.g., ${
                          programType === "time-based"
                            ? "Bronze Level"
                            : programType === "activity-based"
                              ? "Fitness Enthusiast"
                              : "Social Influencer"
                        }`}
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
                        <Label htmlFor={`milestone-${milestone.id}-type`}>Requirement Type</Label>
                        <Select defaultValue={milestone.type}>
                          <SelectTrigger id={`milestone-${milestone.id}-type`}>
                            <SelectValue placeholder="Select requirement type" />
                          </SelectTrigger>
                          <SelectContent>
                            {programType === "time-based" ? (
                              <>
                                <SelectItem value="days">Days of Wear</SelectItem>
                                <SelectItem value="hours">Total Hours</SelectItem>
                                <SelectItem value="streak">Consecutive Days</SelectItem>
                              </>
                            ) : programType === "activity-based" ? (
                              <>
                                <SelectItem value="total">Total Activity</SelectItem>
                                <SelectItem value="daily">Daily Goals Met</SelectItem>
                                <SelectItem value="streak">Consecutive Days</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="shares">Total Shares</SelectItem>
                                <SelectItem value="posts">Total Posts</SelectItem>
                                <SelectItem value="engagement">Engagement Rate</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`milestone-${milestone.id}-requirement`}>Requirement Value</Label>
                      <Input
                        id={`milestone-${milestone.id}-requirement`}
                        type="number"
                        min="1"
                        defaultValue={milestone.requirement}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/wear-to-earn")}>
                Cancel
              </Button>
              <Button type="submit">Create Program</Button>
            </CardFooter>
          </form>
        </Card>
      </Tabs>
    </div>
  )
}
