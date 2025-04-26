"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Settings,
  Package,
  History,
  Bell,
  Shield,
  Wallet,
  Edit,
  Camera,
  Check,
  Copy,
  ExternalLink,
  QrCode,
  Smartphone,
} from "lucide-react"
import { QrCodeModal } from "./qr-code-modal"
import { NFCSettingsModal } from "./nfc-settings-modal"
import { toast } from "@/components/ui/use-toast"

interface ProfileInventoryProps {
  userId?: string
}

export function ProfileInventory({ userId }: ProfileInventoryProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    username: "alexj",
    email: "alex@example.com",
    bio: "Digital collector and blockchain enthusiast. Passionate about phygital products and the future of ownership.",
    avatar: "/user-avatar.png",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    notificationSettings: {
      productScans: true,
      ownershipTransfers: true,
      securityAlerts: true,
      marketplaceActivity: false,
      communityUpdates: true,
      emailNotifications: true,
      pushNotifications: true,
    },
    securitySettings: {
      twoFactorAuth: true,
      recoveryEmail: "recovery@example.com",
      loginAlerts: true,
      apiAccess: false,
    },
  })

  const [inventory, setInventory] = useState([
    {
      id: "1",
      name: "Limited Edition Sneakers",
      serialNumber: "SN-2023-0001",
      type: "footwear",
      edition: "42/100",
      blockchain: "ethereum",
      acquiredDate: "2023-09-15",
      status: "verified",
      image: "/neon-streak-sneakers.png",
    },
    {
      id: "2",
      name: "Designer Handbag",
      serialNumber: "SN-2023-0002",
      type: "accessory",
      edition: "",
      blockchain: "polygon",
      acquiredDate: "2023-10-22",
      status: "verified",
      image: "/elegant-leather-tote.png",
    },
    {
      id: "3",
      name: "Collector's Watch",
      serialNumber: "SN-2023-0003",
      type: "accessory",
      edition: "7/50",
      blockchain: "ethereum",
      acquiredDate: "2023-11-05",
      status: "pending",
      image: "/elegant-timepiece.png",
    },
  ])

  const [activityHistory, setActivityHistory] = useState([
    {
      id: "1",
      type: "scan",
      description: "Limited Edition Sneakers scanned in New York, USA",
      date: "2023-12-01T14:30:00Z",
      productId: "1",
    },
    {
      id: "2",
      type: "transfer",
      description: "Received ownership of Designer Handbag from 0x7a8b...9c0d",
      date: "2023-10-22T09:15:00Z",
      productId: "2",
    },
    {
      id: "3",
      type: "authentication",
      description: "Collector's Watch authenticated by brand",
      date: "2023-11-05T16:45:00Z",
      productId: "3",
    },
    {
      id: "4",
      type: "scan",
      description: "Limited Edition Sneakers scanned in London, UK",
      date: "2023-11-15T11:20:00Z",
      productId: "1",
    },
  ])

  // Modal states
  const [qrModalState, setQrModalState] = useState({
    isOpen: false,
    productId: "",
    productName: "",
    serialNumber: "",
  })

  const [nfcModalState, setNfcModalState] = useState({
    isOpen: false,
    productId: "",
    productName: "",
    serialNumber: "",
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "flagged":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "scan":
        return <QrCode className="h-5 w-5 text-neon-blue" />
      case "transfer":
        return <Wallet className="h-5 w-5 text-neon-purple" />
      case "authentication":
        return <Shield className="h-5 w-5 text-green-500" />
      default:
        return <History className="h-5 w-5" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to Clipboard",
          description: "The wallet address has been copied to your clipboard.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy Failed",
          description: "Failed to copy the wallet address.",
          variant: "destructive",
        })
      },
    )
  }

  const openBlockExplorer = (address: string, blockchain = "ethereum") => {
    let explorerUrl = ""

    switch (blockchain.toLowerCase()) {
      case "ethereum":
        explorerUrl = `https://etherscan.io/address/${address}`
        break
      case "polygon":
        explorerUrl = `https://polygonscan.com/address/${address}`
        break
      default:
        explorerUrl = `https://etherscan.io/address/${address}`
    }

    window.open(explorerUrl, "_blank")

    toast({
      title: "Opening Block Explorer",
      description: `Viewing address on ${blockchain} block explorer.`,
    })
  }

  const openQrModal = (product: any) => {
    setQrModalState({
      isOpen: true,
      productId: product.id,
      productName: product.name,
      serialNumber: product.serialNumber,
    })
  }

  const openNfcModal = (product: any) => {
    setNfcModalState({
      isOpen: true,
      productId: product.id,
      productName: product.name,
      serialNumber: product.serialNumber,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" className="border-white/10" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                    onClick={handleSaveProfile}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-white/20">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-neon-purple text-white"
                        onClick={() => {
                          toast({
                            title: "Upload Photo",
                            description: "Photo upload functionality would be implemented here.",
                          })
                        }}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{profileData.name}</h3>
                    <p className="text-sm text-white/70">@{profileData.username}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={profileData.username}
                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="bg-white/5 border-white/10 min-h-[100px]"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-white/50">Full Name</h4>
                          <p>{profileData.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white/50">Username</h4>
                          <p>@{profileData.username}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/50">Email</h4>
                        <p>{profileData.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/50">Bio</h4>
                        <p className="text-sm">{profileData.bio}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-white/50 mb-2">Wallet Address</h4>
                <div className="flex items-center gap-2">
                  <code className="bg-white/5 px-2 py-1 rounded text-sm flex-1 overflow-hidden text-ellipsis">
                    {profileData.walletAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(profileData.walletAddress)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openBlockExplorer(profileData.walletAddress)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <Card key={item.id} className="glass-panel border-white/10 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-r from-black to-gray-800">
                  {item.image && (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={`${getStatusColor(item.status)} text-white border-none capitalize`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Serial Number:</span>
                      <span>{item.serialNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Type:</span>
                      <span className="capitalize">{item.type}</span>
                    </div>
                    {item.edition && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Edition:</span>
                        <span>{item.edition}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Blockchain:</span>
                      <span className="capitalize">{item.blockchain}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Acquired:</span>
                      <span>{formatDate(item.acquiredDate)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/10 hover:bg-white/10"
                      onClick={() => openQrModal(item)}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/10 hover:bg-white/10"
                      onClick={() => openNfcModal(item)}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      NFC
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Track all interactions with your phygital products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activityHistory.map((activity) => {
                  const product = inventory.find((item) => item.id === activity.productId)

                  return (
                    <div key={activity.id} className="flex gap-4">
                      <div className="mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                          <h4 className="font-medium">{activity.description}</h4>
                          <span className="text-sm text-white/50">{formatDateTime(activity.date)}</span>
                        </div>
                        {product && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-6 w-6 rounded overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-white/70">{product.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4">
              <Button
                variant="outline"
                className="w-full border-white/10"
                onClick={() => {
                  toast({
                    title: "View All Activity",
                    description: "Full activity history would be displayed here.",
                  })
                }}
              >
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="product-scans" className="flex items-center gap-2 cursor-pointer">
                      <QrCode className="h-4 w-4 text-neon-blue" />
                      Product Scans
                    </Label>
                    <Switch
                      id="product-scans"
                      checked={profileData.notificationSettings.productScans}
                      onCheckedChange={(checked) => {
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            productScans: checked,
                          },
                        })
                        toast({
                          title: checked ? "Notifications Enabled" : "Notifications Disabled",
                          description: `Product scan notifications are now ${checked ? "enabled" : "disabled"}.`,
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ownership-transfers" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="h-4 w-4 text-neon-purple" />
                      Ownership Transfers
                    </Label>
                    <Switch
                      id="ownership-transfers"
                      checked={profileData.notificationSettings.ownershipTransfers}
                      onCheckedChange={(checked) => {
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            ownershipTransfers: checked,
                          },
                        })
                        toast({
                          title: checked ? "Notifications Enabled" : "Notifications Disabled",
                          description: `Ownership transfer notifications are now ${checked ? "enabled" : "disabled"}.`,
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-alerts" className="flex items-center gap-2 cursor-pointer">
                      <Shield className="h-4 w-4 text-amber-500" />
                      Security Alerts
                    </Label>
                    <Switch
                      id="security-alerts"
                      checked={profileData.notificationSettings.securityAlerts}
                      onCheckedChange={(checked) => {
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            securityAlerts: checked,
                          },
                        })
                        toast({
                          title: checked ? "Notifications Enabled" : "Notifications Disabled",
                          description: `Security alert notifications are now ${checked ? "enabled" : "disabled"}.`,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="cursor-pointer">
                      Email Notifications
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={profileData.notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => {
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            emailNotifications: checked,
                          },
                        })
                        toast({
                          title: checked ? "Email Notifications Enabled" : "Email Notifications Disabled",
                          description: `Email notifications are now ${checked ? "enabled" : "disabled"}.`,
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="cursor-pointer">
                      Push Notifications
                    </Label>
                    <Switch
                      id="push-notifications"
                      checked={profileData.notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => {
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            pushNotifications: checked,
                          },
                        })
                        toast({
                          title: checked ? "Push Notifications Enabled" : "Push Notifications Disabled",
                          description: `Push notifications are now ${checked ? "enabled" : "disabled"}.`,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor-auth" className="flex items-center gap-2 cursor-pointer">
                    <Shield className="h-4 w-4 text-green-500" />
                    Two-Factor Authentication
                  </Label>
                  <Switch
                    id="two-factor-auth"
                    checked={profileData.securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => {
                      setProfileData({
                        ...profileData,
                        securitySettings: {
                          ...profileData.securitySettings,
                          twoFactorAuth: checked,
                        },
                      })
                      toast({
                        title: checked ? "2FA Enabled" : "2FA Disabled",
                        description: `Two-factor authentication is now ${checked ? "enabled" : "disabled"}.`,
                      })
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-alerts" className="flex items-center gap-2 cursor-pointer">
                    <Bell className="h-4 w-4 text-amber-500" />
                    Login Alerts
                  </Label>
                  <Switch
                    id="login-alerts"
                    checked={profileData.securitySettings.loginAlerts}
                    onCheckedChange={(checked) => {
                      setProfileData({
                        ...profileData,
                        securitySettings: {
                          ...profileData.securitySettings,
                          loginAlerts: checked,
                        },
                      })
                      toast({
                        title: checked ? "Login Alerts Enabled" : "Login Alerts Disabled",
                        description: `Login alerts are now ${checked ? "enabled" : "disabled"}.`,
                      })
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-access" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4 text-neon-blue" />
                    API Access
                  </Label>
                  <Switch
                    id="api-access"
                    checked={profileData.securitySettings.apiAccess}
                    onCheckedChange={(checked) => {
                      setProfileData({
                        ...profileData,
                        securitySettings: {
                          ...profileData.securitySettings,
                          apiAccess: checked,
                        },
                      })
                      toast({
                        title: checked ? "API Access Enabled" : "API Access Disabled",
                        description: `API access is now ${checked ? "enabled" : "disabled"}.`,
                      })
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recovery-email">Recovery Email</Label>
                <Input
                  id="recovery-email"
                  type="email"
                  value={profileData.securitySettings.recoveryEmail}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      securitySettings: {
                        ...profileData.securitySettings,
                        recoveryEmail: e.target.value,
                      },
                    })
                  }
                  className="bg-white/5 border-white/10"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4">
              <Button
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                onClick={() => {
                  toast({
                    title: "Security Settings Saved",
                    description: "Your security settings have been updated successfully.",
                  })
                }}
              >
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={qrModalState.isOpen}
        onClose={() => setQrModalState({ ...qrModalState, isOpen: false })}
        productId={qrModalState.productId}
        productName={qrModalState.productName}
        serialNumber={qrModalState.serialNumber}
      />

      {/* NFC Settings Modal */}
      <NFCSettingsModal
        isOpen={nfcModalState.isOpen}
        onClose={() => setNfcModalState({ ...nfcModalState, isOpen: false })}
        productId={nfcModalState.productId}
        productName={nfcModalState.productName}
        serialNumber={nfcModalState.serialNumber}
      />
    </div>
  )
}
