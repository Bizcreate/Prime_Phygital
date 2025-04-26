"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DatePicker } from "@/components/ui/date-picker"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import {
  Plus,
  Trash2,
  Save,
  Zap,
  Award,
  Clock,
  MapPin,
  Smartphone,
  QrCode,
  Camera,
  Users,
  Settings,
  AlertCircle,
  Package,
} from "lucide-react"
import type {
  ProofProtocol,
  ProofRequirement,
  ProofType,
  VerificationMethod,
  RewardType,
  ActivityFrequency,
} from "@/types/wear-to-earn"

const PROOF_TYPES: { value: ProofType; label: string; icon: React.ReactNode }[] = [
  { value: "wear", label: "Proof of Wear", icon: <Clock className="h-4 w-4" /> },
  { value: "use", label: "Proof of Use", icon: <Zap className="h-4 w-4" /> },
  { value: "scan", label: "Proof of Scan", icon: <QrCode className="h-4 w-4" /> },
  { value: "location", label: "Proof of Location", icon: <MapPin className="h-4 w-4" /> },
  { value: "time", label: "Proof of Time", icon: <Clock className="h-4 w-4" /> },
  { value: "social", label: "Proof of Social", icon: <Users className="h-4 w-4" /> },
  { value: "custom", label: "Custom Proof", icon: <Settings className="h-4 w-4" /> },
]

const VERIFICATION_METHODS: { value: VerificationMethod; label: string; icon: React.ReactNode }[] = [
  { value: "nfc", label: "NFC Tag", icon: <Smartphone className="h-4 w-4" /> },
  { value: "qr", label: "QR Code", icon: <QrCode className="h-4 w-4" /> },
  { value: "gps", label: "GPS Location", icon: <MapPin className="h-4 w-4" /> },
  { value: "accelerometer", label: "Motion Sensor", icon: <Zap className="h-4 w-4" /> },
  { value: "photo", label: "Photo Verification", icon: <Camera className="h-4 w-4" /> },
  { value: "social", label: "Social Media", icon: <Users className="h-4 w-4" /> },
  { value: "manual", label: "Manual Review", icon: <Settings className="h-4 w-4" /> },
]

const REWARD_TYPES: { value: RewardType; label: string; icon: React.ReactNode }[] = [
  { value: "token", label: "Token Rewards", icon: <Zap className="h-4 w-4" /> },
  { value: "nft", label: "NFT Rewards", icon: <Award className="h-4 w-4" /> },
  { value: "discount", label: "Discounts", icon: <Zap className="h-4 w-4" /> },
  { value: "access", label: "Access Passes", icon: <Users className="h-4 w-4" /> },
  { value: "experience", label: "Experiences", icon: <Zap className="h-4 w-4" /> },
]

const FREQUENCY_OPTIONS: { value: ActivityFrequency; label: string }[] = [
  { value: "once", label: "One-time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "custom", label: "Custom" },
]

interface ProtocolCreatorProps {
  existingProtocol?: ProofProtocol
  products: { id: string; name: string; image?: string }[]
  onSave: (protocol: ProofProtocol) => Promise<void>
}

export function ProtocolCreator({ existingProtocol, products, onSave }: ProtocolCreatorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [protocol, setProtocol] = useState<ProofProtocol>(
    existingProtocol || {
      id: uuidv4(),
      name: "",
      description: "",
      creatorId: "user_1", // This would come from auth context in a real app
      productIds: [],
      requirements: [],
      startDate: new Date().toISOString(),
      isActive: false,
      totalRewards: 1000,
      rewardType: "token",
      rewardDistribution: "proportional",
      currentParticipants: 0,
    },
  )

  const [newRequirement, setNewRequirement] = useState<Partial<ProofRequirement>>({
    type: "wear",
    verificationMethod: "nfc",
    pointsValue: 10,
    frequency: "daily",
    cooldownPeriod: 1440, // 24 hours in minutes
  })

  const handleProtocolChange = (field: keyof ProofProtocol, value: any) => {
    setProtocol((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddRequirement = () => {
    if (!newRequirement.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for this requirement",
        variant: "destructive",
      })
      return
    }

    const requirement: ProofRequirement = {
      id: uuidv4(),
      name: newRequirement.name || "",
      description: newRequirement.description || "",
      type: newRequirement.type as ProofType,
      verificationMethod: newRequirement.verificationMethod as VerificationMethod,
      pointsValue: newRequirement.pointsValue || 10,
      frequency: newRequirement.frequency as ActivityFrequency,
      cooldownPeriod: newRequirement.cooldownPeriod,
      locationRequired: newRequirement.locationRequired,
      locationRadius: newRequirement.locationRadius,
      minimumDuration: newRequirement.minimumDuration,
      customFields: newRequirement.customFields,
    }

    setProtocol((prev) => ({
      ...prev,
      requirements: [...prev.requirements, requirement],
    }))

    // Reset the form
    setNewRequirement({
      type: "wear",
      verificationMethod: "nfc",
      pointsValue: 10,
      frequency: "daily",
      cooldownPeriod: 1440,
    })

    toast({
      title: "Requirement Added",
      description: `${requirement.name} has been added to the protocol`,
    })
  }

  const handleRemoveRequirement = (id: string) => {
    setProtocol((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req.id !== id),
    }))

    toast({
      title: "Requirement Removed",
      description: "The requirement has been removed from the protocol",
    })
  }

  const handleSubmit = async () => {
    if (!protocol.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for your protocol",
        variant: "destructive",
      })
      return
    }

    if (protocol.productIds.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one product for this protocol",
        variant: "destructive",
      })
      return
    }

    if (protocol.requirements.length === 0) {
      toast({
        title: "Missing Requirements",
        description: "Please add at least one requirement to your protocol",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await onSave(protocol)
      toast({
        title: "Protocol Saved",
        description: "Your Wear-to-Earn protocol has been saved successfully",
      })
      router.push("/dashboard/wear-to-earn")
    } catch (error) {
      console.error("Error saving protocol:", error)
      toast({
        title: "Error",
        description: "There was an error saving your protocol. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="review">Review & Save</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Define the basic details of your Wear-to-Earn protocol</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="protocol-name">Protocol Name</Label>
                <Input
                  id="protocol-name"
                  placeholder="e.g., Summer Sneaker Challenge"
                  value={protocol.name}
                  onChange={(e) => handleProtocolChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="protocol-description">Description</Label>
                <Textarea
                  id="protocol-description"
                  placeholder="Describe what this protocol is about and how users can earn rewards"
                  value={protocol.description}
                  onChange={(e) => handleProtocolChange("description", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker
                    date={new Date(protocol.startDate)}
                    setDate={(date) => handleProtocolChange("startDate", date.toISOString())}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date (Optional)</Label>
                  <DatePicker
                    date={protocol.endDate ? new Date(protocol.endDate) : undefined}
                    setDate={(date) => handleProtocolChange("endDate", date.toISOString())}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Associated Products</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex items-center p-2 border rounded-md cursor-pointer ${
                        protocol.productIds.includes(product.id) ? "border-primary bg-primary/10" : "border-border"
                      }`}
                      onClick={() => {
                        const newProductIds = protocol.productIds.includes(product.id)
                          ? protocol.productIds.filter((id) => id !== product.id)
                          : [...protocol.productIds, product.id]
                        handleProtocolChange("productIds", newProductIds)
                      }}
                    >
                      <div className="h-10 w-10 rounded-md bg-secondary mr-2 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-primary/20">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm">{product.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="protocol-active"
                  checked={protocol.isActive}
                  onCheckedChange={(checked) => handleProtocolChange("isActive", checked)}
                />
                <Label htmlFor="protocol-active">Activate Protocol</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("requirements")}>Next: Define Requirements</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Requirements</CardTitle>
              <CardDescription>Define what users need to do to earn rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {protocol.requirements.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Requirements</h3>
                  <div className="space-y-3">
                    {protocol.requirements.map((req) => (
                      <div key={req.id} className="flex items-start justify-between p-3 border rounded-md">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{req.name}</h4>
                            <Badge variant="outline" className="ml-2">
                              {PROOF_TYPES.find((t) => t.value === req.type)?.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{req.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {req.pointsValue} points
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {FREQUENCY_OPTIONS.find((f) => f.value === req.frequency)?.label}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              {VERIFICATION_METHODS.find((v) => v.value === req.verificationMethod)?.icon}
                              {VERIFICATION_METHODS.find((v) => v.value === req.verificationMethod)?.label}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveRequirement(req.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 border rounded-md">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No Requirements Added</h3>
                  <p className="text-muted-foreground">
                    Add at least one requirement to define how users can earn rewards
                  </p>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Requirement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requirement-name">Requirement Name</Label>
                    <Input
                      id="requirement-name"
                      placeholder="e.g., Daily Walk"
                      value={newRequirement.name || ""}
                      onChange={(e) => setNewRequirement((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirement-type">Proof Type</Label>
                    <Select
                      value={newRequirement.type}
                      onValueChange={(value: ProofType) => setNewRequirement((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger id="requirement-type">
                        <SelectValue placeholder="Select proof type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROOF_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              {type.icon}
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirement-description">Description</Label>
                  <Textarea
                    id="requirement-description"
                    placeholder="Explain what users need to do to complete this requirement"
                    value={newRequirement.description || ""}
                    onChange={(e) => setNewRequirement((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-method">Verification Method</Label>
                    <Select
                      value={newRequirement.verificationMethod}
                      onValueChange={(value: VerificationMethod) =>
                        setNewRequirement((prev) => ({ ...prev, verificationMethod: value }))
                      }
                    >
                      <SelectTrigger id="verification-method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {VERIFICATION_METHODS.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            <div className="flex items-center gap-2">
                              {method.icon}
                              <span>{method.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points-value">Points Value</Label>
                    <Input
                      id="points-value"
                      type="number"
                      min="1"
                      value={newRequirement.pointsValue || ""}
                      onChange={(e) =>
                        setNewRequirement((prev) => ({
                          ...prev,
                          pointsValue: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={newRequirement.frequency}
                      onValueChange={(value: ActivityFrequency) =>
                        setNewRequirement((prev) => ({ ...prev, frequency: value }))
                      }
                    >
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(newRequirement.type === "wear" || newRequirement.type === "use") && (
                  <div className="space-y-2">
                    <Label htmlFor="minimum-duration">Minimum Duration (minutes)</Label>
                    <Input
                      id="minimum-duration"
                      type="number"
                      min="1"
                      value={newRequirement.minimumDuration || ""}
                      onChange={(e) =>
                        setNewRequirement((prev) => ({
                          ...prev,
                          minimumDuration: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                )}

                {newRequirement.frequency !== "once" && (
                  <div className="space-y-2">
                    <Label htmlFor="cooldown-period">Cooldown Period (minutes)</Label>
                    <Input
                      id="cooldown-period"
                      type="number"
                      min="0"
                      value={newRequirement.cooldownPeriod || ""}
                      onChange={(e) =>
                        setNewRequirement((prev) => ({
                          ...prev,
                          cooldownPeriod: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="location-required"
                    checked={newRequirement.locationRequired || false}
                    onCheckedChange={(checked) => setNewRequirement((prev) => ({ ...prev, locationRequired: checked }))}
                  />
                  <Label htmlFor="location-required">Require Location Verification</Label>
                </div>

                {newRequirement.locationRequired && (
                  <div className="space-y-2">
                    <Label htmlFor="location-radius">Location Radius (meters)</Label>
                    <Input
                      id="location-radius"
                      type="number"
                      min="1"
                      value={newRequirement.locationRadius || ""}
                      onChange={(e) =>
                        setNewRequirement((prev) => ({
                          ...prev,
                          locationRadius: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                )}

                <Button onClick={handleAddRequirement} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("rewards")}>Next: Configure Rewards</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Configuration</CardTitle>
              <CardDescription>Define how users will be rewarded for their activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reward-type">Reward Type</Label>
                  <Select
                    value={protocol.rewardType}
                    onValueChange={(value: RewardType) => handleProtocolChange("rewardType", value)}
                  >
                    <SelectTrigger id="reward-type">
                      <SelectValue placeholder="Select reward type" />
                    </SelectTrigger>
                    <SelectContent>
                      {REWARD_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-rewards">Total Rewards Pool</Label>
                  <Input
                    id="total-rewards"
                    type="number"
                    min="1"
                    value={protocol.totalRewards}
                    onChange={(e) => handleProtocolChange("totalRewards", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward-distribution">Distribution Method</Label>
                <Select
                  value={protocol.rewardDistribution}
                  onValueChange={(value: "equal" | "proportional" | "tiered") =>
                    handleProtocolChange("rewardDistribution", value)
                  }
                >
                  <SelectTrigger id="reward-distribution">
                    <SelectValue placeholder="Select distribution method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Equal Distribution</SelectItem>
                    <SelectItem value="proportional">Proportional to Points</SelectItem>
                    <SelectItem value="tiered">Tiered Rewards</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {protocol.rewardDistribution === "tiered" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Reward Tiers</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const tiers = protocol.tiers || []
                        handleProtocolChange("tiers", [
                          ...tiers,
                          {
                            threshold: tiers.length > 0 ? tiers[tiers.length - 1].threshold + 100 : 100,
                            reward: tiers.length > 0 ? tiers[tiers.length - 1].reward + 50 : 50,
                            name: `Tier ${tiers.length + 1}`,
                          },
                        ])
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tier
                    </Button>
                  </div>

                  {(protocol.tiers || []).length > 0 ? (
                    <div className="space-y-3">
                      {(protocol.tiers || []).map((tier, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 border rounded-md">
                          <div className="flex-1 grid grid-cols-3 gap-2">
                            <div>
                              <Label htmlFor={`tier-${index}-name`}>Tier Name</Label>
                              <Input
                                id={`tier-${index}-name`}
                                value={tier.name}
                                onChange={(e) => {
                                  const newTiers = [...(protocol.tiers || [])]
                                  newTiers[index].name = e.target.value
                                  handleProtocolChange("tiers", newTiers)
                                }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`tier-${index}-threshold`}>Point Threshold</Label>
                              <Input
                                id={`tier-${index}-threshold`}
                                type="number"
                                min="1"
                                value={tier.threshold}
                                onChange={(e) => {
                                  const newTiers = [...(protocol.tiers || [])]
                                  newTiers[index].threshold = Number.parseInt(e.target.value) || 0
                                  handleProtocolChange("tiers", newTiers)
                                }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`tier-${index}-reward`}>Reward Amount</Label>
                              <Input
                                id={`tier-${index}-reward`}
                                type="number"
                                min="1"
                                value={tier.reward}
                                onChange={(e) => {
                                  const newTiers = [...(protocol.tiers || [])]
                                  newTiers[index].reward = Number.parseInt(e.target.value) || 0
                                  handleProtocolChange("tiers", newTiers)
                                }}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mt-6"
                            onClick={() => {
                              const newTiers = [...(protocol.tiers || [])]
                              newTiers.splice(index, 1)
                              handleProtocolChange("tiers", newTiers)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border rounded-md">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No Tiers Defined</h3>
                      <p className="text-muted-foreground">
                        Add at least one tier to define how rewards will be distributed
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="max-participants">Maximum Participants (Optional)</Label>
                <Input
                  id="max-participants"
                  type="number"
                  min="0"
                  placeholder="Leave empty for unlimited"
                  value={protocol.maxParticipants || ""}
                  onChange={(e) =>
                    handleProtocolChange(
                      "maxParticipants",
                      e.target.value ? Number.parseInt(e.target.value) : undefined,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms-conditions">Terms & Conditions (Optional)</Label>
                <Textarea
                  id="terms-conditions"
                  placeholder="Enter any terms and conditions for participation"
                  value={protocol.termsAndConditions || ""}
                  onChange={(e) => handleProtocolChange("termsAndConditions", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("requirements")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("review")}>Next: Review & Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review & Save</CardTitle>
              <CardDescription>Review your Wear-to-Earn protocol before saving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                    <div>
                      <p className="text-sm text-muted-foreground">Protocol Name</p>
                      <p className="font-medium">{protocol.name || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={protocol.isActive ? "default" : "secondary"}>
                        {protocol.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p>{protocol.description || "No description provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p>{new Date(protocol.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p>
                        {protocol.endDate ? new Date(protocol.endDate).toLocaleDateString() : "No end date (ongoing)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Associated Products</h3>
                  {protocol.productIds.length > 0 ? (
                    <div className="flex flex-wrap gap-2 p-4 border rounded-md">
                      {protocol.productIds.map((id) => {
                        const product = products.find((p) => p.id === id)
                        return (
                          <Badge key={id} variant="outline" className="px-3 py-1">
                            {product?.name || id}
                          </Badge>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-4 border rounded-md text-muted-foreground">No products selected</div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Requirements ({protocol.requirements.length})</h3>
                  {protocol.requirements.length > 0 ? (
                    <div className="space-y-2 p-4 border rounded-md">
                      {protocol.requirements.map((req) => (
                        <div key={req.id} className="p-3 bg-secondary/20 rounded-md">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{req.name}</h4>
                            <Badge variant="outline" className="ml-auto">
                              {PROOF_TYPES.find((t) => t.value === req.type)?.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{req.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {req.pointsValue} points
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {FREQUENCY_OPTIONS.find((f) => f.value === req.frequency)?.label}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border rounded-md text-muted-foreground">No requirements defined</div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                    <div>
                      <p className="text-sm text-muted-foreground">Reward Type</p>
                      <p className="font-medium">{REWARD_TYPES.find((t) => t.value === protocol.rewardType)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Rewards Pool</p>
                      <p className="font-medium">{protocol.totalRewards}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Distribution Method</p>
                      <p className="font-medium">
                        {protocol.rewardDistribution === "equal"
                          ? "Equal Distribution"
                          : protocol.rewardDistribution === "proportional"
                            ? "Proportional to Points"
                            : "Tiered Rewards"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Maximum Participants</p>
                      <p className="font-medium">{protocol.maxParticipants ? protocol.maxParticipants : "Unlimited"}</p>
                    </div>
                  </div>
                </div>

                {protocol.rewardDistribution === "tiered" && protocol.tiers && protocol.tiers.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Reward Tiers</h3>
                    <div className="p-4 border rounded-md">
                      <div className="grid grid-cols-3 gap-4 font-medium mb-2 px-2">
                        <div>Tier Name</div>
                        <div>Point Threshold</div>
                        <div>Reward Amount</div>
                      </div>
                      <div className="space-y-2">
                        {protocol.tiers.map((tier, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 p-2 bg-secondary/20 rounded-md">
                            <div>{tier.name}</div>
                            <div>{tier.threshold} points</div>
                            <div>{tier.reward} rewards</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("rewards")}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Protocol
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
