"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Save, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function CustomerProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    preferences: {
      notifications: true,
      marketing: false,
      updates: true,
    },
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    })
  }

  const handleImageUpload = () => {
    toast({
      title: "Upload feature",
      description: "Image upload functionality would be implemented here.",
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-10">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center">
          <Link href="/customer/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/user-avatar.png" alt="User" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full"
                    onClick={handleImageUpload}
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload new photo</span>
                  </Button>
                </div>
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-muted-foreground mb-4">{profileData.email}</p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <Badge variant="secondary">Premium Member</Badge>
                  <Badge variant="outline">Since June 2023</Badge>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <span className="font-medium">2,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Products Owned</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Challenges Completed</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Account Information</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      />
                    </div>
                    {isEditing && (
                      <Button onClick={handleSave} className="mt-4">
                        Save Changes
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your products and rewards
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="push-notifications" className="sr-only">
                          Push Notifications
                        </Label>
                        <input
                          type="checkbox"
                          id="push-notifications"
                          className="toggle"
                          checked={profileData.preferences.notifications}
                          onChange={() =>
                            setProfileData({
                              ...profileData,
                              preferences: {
                                ...profileData.preferences,
                                notifications: !profileData.preferences.notifications,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive emails about new products and offers</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="marketing-emails" className="sr-only">
                          Marketing Emails
                        </Label>
                        <input
                          type="checkbox"
                          id="marketing-emails"
                          className="toggle"
                          checked={profileData.preferences.marketing}
                          onChange={() =>
                            setProfileData({
                              ...profileData,
                              preferences: {
                                ...profileData.preferences,
                                marketing: !profileData.preferences.marketing,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about product updates and new features
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="product-updates" className="sr-only">
                          Product Updates
                        </Label>
                        <input
                          type="checkbox"
                          id="product-updates"
                          className="toggle"
                          checked={profileData.preferences.updates}
                          onChange={() =>
                            setProfileData({
                              ...profileData,
                              preferences: {
                                ...profileData.preferences,
                                updates: !profileData.preferences.updates,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="mt-4">Update Password</Button>

                    <div className="pt-6 border-t mt-6">
                      <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
