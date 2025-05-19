"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Calendar, Award, ShoppingBag, ImageIcon, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for verification queue
const mockVerifications = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/user-avatar.png",
    },
    program: "Summer Sneaker Challenge",
    activityType: "wear",
    details: "Wore Neon Streak Sneakers for 4 hours",
    timestamp: "2023-05-16T14:30:00Z",
    points: 100,
    status: "pending",
  },
  {
    id: 2,
    user: {
      name: "Jamie Smith",
      username: "jamies",
      avatar: "/letter-a-abstract.png",
    },
    program: "Hoodie Rewards Program",
    activityType: "photo",
    details: "Submitted photo wearing Designer Hoodie",
    timestamp: "2023-05-16T12:15:00Z",
    points: 150,
    status: "pending",
  },
  {
    id: 3,
    user: {
      name: "Taylor Wilson",
      username: "taylorw",
      avatar: "/abstract-letter-j.png",
    },
    program: "T-Shirt Loyalty Program",
    activityType: "location",
    details: "Checked in at brand store in New York",
    timestamp: "2023-05-16T10:45:00Z",
    points: 200,
    status: "pending",
  },
  {
    id: 4,
    user: {
      name: "Jordan Lee",
      username: "jordanl",
      avatar: "/placeholder.svg",
    },
    program: "Summer Sneaker Challenge",
    activityType: "social",
    details: "Shared product on Instagram",
    timestamp: "2023-05-16T09:30:00Z",
    points: 250,
    status: "pending",
  },
  {
    id: 5,
    user: {
      name: "Casey Brown",
      username: "caseyb",
      avatar: "/placeholder.svg",
    },
    program: "Hoodie Rewards Program",
    activityType: "wear",
    details: "Wore Designer Hoodie for 3 hours",
    timestamp: "2023-05-16T08:15:00Z",
    points: 75,
    status: "pending",
  },
]

export function VerificationQueue() {
  const [verifications, setVerifications] = useState(mockVerifications)
  const { toast } = useToast()

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "wear":
        return <ShoppingBag className="h-4 w-4 text-blue-500" />
      case "photo":
        return <ImageIcon className="h-4 w-4 text-green-500" />
      case "location":
        return <MapPin className="h-4 w-4 text-red-500" />
      case "social":
        return <Award className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateTimeString).toLocaleString(undefined, options)
  }

  const handleApprove = (id: number) => {
    setVerifications(
      verifications.map((verification) =>
        verification.id === id ? { ...verification, status: "approved" } : verification,
      ),
    )

    toast({
      title: "Activity Approved",
      description: "The activity has been verified and points awarded.",
    })
  }

  const handleReject = (id: number) => {
    setVerifications(
      verifications.map((verification) =>
        verification.id === id ? { ...verification, status: "rejected" } : verification,
      ),
    )

    toast({
      title: "Activity Rejected",
      description: "The activity has been rejected and no points will be awarded.",
      variant: "destructive",
    })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {verifications.map((verification) => (
            <TableRow key={verification.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={verification.user.avatar || "/placeholder.svg"} alt={verification.user.name} />
                    <AvatarFallback>{verification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{verification.user.name}</div>
                    <div className="text-sm text-muted-foreground">@{verification.user.username}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getActivityIcon(verification.activityType)}
                  <span>{verification.details}</span>
                </div>
              </TableCell>
              <TableCell>{verification.program}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDateTime(verification.timestamp)}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                  {verification.points} pts
                </Badge>
              </TableCell>
              <TableCell>
                {verification.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                      onClick={() => handleApprove(verification.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                      onClick={() => handleReject(verification.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                ) : verification.status === "approved" ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
