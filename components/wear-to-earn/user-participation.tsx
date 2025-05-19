"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Clock, Award } from "lucide-react"

// Mock data for user participation
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/user-avatar.png",
    totalWearTime: 128,
    pointsEarned: 3200,
    activeChallenges: 3,
    status: "active",
  },
  {
    id: 2,
    name: "Jamie Smith",
    username: "jamies",
    avatar: "/letter-a-abstract.png",
    totalWearTime: 112,
    pointsEarned: 2800,
    activeChallenges: 2,
    status: "active",
  },
  {
    id: 3,
    name: "Taylor Wilson",
    username: "taylorw",
    avatar: "/abstract-letter-j.png",
    totalWearTime: 96,
    pointsEarned: 2400,
    activeChallenges: 2,
    status: "active",
  },
  {
    id: 4,
    name: "Jordan Lee",
    username: "jordanl",
    avatar: "/placeholder.svg",
    totalWearTime: 84,
    pointsEarned: 2100,
    activeChallenges: 1,
    status: "active",
  },
  {
    id: 5,
    name: "Casey Brown",
    username: "caseyb",
    avatar: "/placeholder.svg",
    totalWearTime: 72,
    pointsEarned: 1800,
    activeChallenges: 2,
    status: "active",
  },
]

export function UserParticipation() {
  const [users] = useState(mockUsers)
  const [sortBy, setSortBy] = useState("pointsEarned")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("totalWearTime")} className="-ml-3">
                <Clock className="h-4 w-4 mr-1" />
                Total Wear Time
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("pointsEarned")} className="-ml-3">
                <Award className="h-4 w-4 mr-1" />
                Points Earned
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </Button>
            </TableHead>
            <TableHead>Active Challenges</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">@{user.username}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.totalWearTime} hours</TableCell>
              <TableCell>{user.pointsEarned.toLocaleString()}</TableCell>
              <TableCell>{user.activeChallenges}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "outline"} className="capitalize">
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
