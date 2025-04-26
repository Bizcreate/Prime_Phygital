"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ServiceVerificationMethods } from "@/components/service-verification-methods"
import { Shield, Lock, Bell, Settings, CheckCircle, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function VerificationSettingsPage() {
  const [defaultMethod, setDefaultMethod] = useState("blockchain")
  const [settings, setSettings] = useState({
    requirePhotos: true,
    multiFactorForHighValue: true,
    notifyOnVerification: true,
    autoVerifyTrustedPartners: true,
    strictMode: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    })
  }

  const handleSaveChanges = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings Saved",
        description: "Your verification settings have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Verification Settings</h1>
          <p className="text-white/70">Configure how your products and services are verified</p>
        </div>
        <Button
          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-white/10 border-t-white animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="methods">
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="methods" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Verification Methods
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security Settings
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          <ServiceVerificationMethods onSelect={setDefaultMethod} defaultMethod={defaultMethod} />

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Method Availability</CardTitle>
              <CardDescription>
                Configure which verification methods are available for different product types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Footwear Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Label htmlFor="footwear-blockchain">Blockchain Verification</Label>
                      </div>
                      <Switch id="footwear-blockchain" checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Label htmlFor="footwear-nfc">NFC Tag Verification</Label>
                      </div>
                      <Switch id="footwear-nfc" checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="footwear-biometric">Biometric Verification</Label>
                      </div>
                      <Switch
                        id="footwear-biometric"
                        checked={true}
                        onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Biometric verification setting has been updated.",
                          })
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="footwear-photo">Photo Evidence</Label>
                      </div>
                      <Switch
                        id="footwear-photo"
                        checked={true}
                        onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Photo evidence setting has been updated.",
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Apparel Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Label htmlFor="apparel-blockchain">Blockchain Verification</Label>
                      </div>
                      <Switch id="apparel-blockchain" checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="apparel-qr">QR Code Verification</Label>
                      </div>
                      <Switch
                        id="apparel-qr"
                        checked={true}
                        onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "QR code verification setting has been updated.",
                          })
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="apparel-digital">Digital Signature</Label>
                      </div>
                      <Switch
                        id="apparel-digital"
                        checked={true}
                        onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Digital signature setting has been updated.",
                          })
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-3">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="apparel-partner">Authorized Partner</Label>
                      </div>
                      <Switch
                        id="apparel-partner"
                        checked={true}
                        onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Authorized partner setting has been updated.",
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for verification processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-photos">Require Photos for Service Verification</Label>
                    <p className="text-sm text-white/70">
                      Require service providers to upload photo evidence for all service records
                    </p>
                  </div>
                  <Switch
                    id="require-photos"
                    checked={settings.requirePhotos}
                    onCheckedChange={() => handleToggle("requirePhotos")}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="multi-factor">Multi-Factor for High-Value Products</Label>
                    <p className="text-sm text-white/70">
                      Require multi-factor verification for products valued over $1,000
                    </p>
                  </div>
                  <Switch
                    id="multi-factor"
                    checked={settings.multiFactorForHighValue}
                    onCheckedChange={() => handleToggle("multiFactorForHighValue")}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-verify">Auto-Verify Trusted Partners</Label>
                    <p className="text-sm text-white/70">Automatically verify service records from trusted partners</p>
                  </div>
                  <Switch
                    id="auto-verify"
                    checked={settings.autoVerifyTrustedPartners}
                    onCheckedChange={() => handleToggle("autoVerifyTrustedPartners")}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="strict-mode">Strict Verification Mode</Label>
                    <p className="text-sm text-white/70">
                      Enable stricter verification requirements (may impact user experience)
                    </p>
                  </div>
                  <Switch
                    id="strict-mode"
                    checked={settings.strictMode}
                    onCheckedChange={() => handleToggle("strictMode")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notifications related to verification processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-verification">Notify on Verification</Label>
                    <p className="text-sm text-white/70">
                      Receive notifications when products or services are verified
                    </p>
                  </div>
                  <Switch
                    id="notify-verification"
                    checked={settings.notifyOnVerification}
                    onCheckedChange={() => handleToggle("notifyOnVerification")}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-failed">Notify on Failed Verification</Label>
                    <p className="text-sm text-white/70">Receive notifications when verification attempts fail</p>
                  </div>
                  <Switch
                    id="notify-failed"
                    checked={true}
                    onCheckedChange={() => {
                      toast({
                        title: "Setting Updated",
                        description: "Failed verification notification setting has been updated.",
                      })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-white/10 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-method-change">Notify on Method Change</Label>
                    <p className="text-sm text-white/70">Receive notifications when verification methods are changed</p>
                  </div>
                  <Switch
                    id="notify-method-change"
                    checked={true}
                    onCheckedChange={() => {
                      toast({
                        title: "Setting Updated",
                        description: "Method change notification setting has been updated.",
                      })
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced verification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-md border border-white/10 p-4">
                  <h3 className="font-medium mb-2">Verification API Access</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Configure API access for third-party verification services
                  </p>
                  <Button
                    variant="outline"
                    className="border-white/10"
                    onClick={() => {
                      toast({
                        title: "API Access",
                        description: "Opening API access configuration panel.",
                      })
                    }}
                  >
                    Configure API Access
                  </Button>
                </div>

                <div className="rounded-md border border-white/10 p-4">
                  <h3 className="font-medium mb-2">Custom Verification Methods</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Create and configure custom verification methods for your products
                  </p>
                  <Button
                    variant="outline"
                    className="border-white/10"
                    onClick={() => {
                      toast({
                        title: "Custom Method",
                        description: "Opening custom verification method creator.",
                      })
                    }}
                  >
                    Create Custom Method
                  </Button>
                </div>

                <div className="rounded-md border border-white/10 p-4">
                  <h3 className="font-medium mb-2">Verification Logs</h3>
                  <p className="text-sm text-white/70 mb-4">View detailed logs of all verification activities</p>
                  <Button
                    variant="outline"
                    className="border-white/10"
                    onClick={() => {
                      toast({
                        title: "Verification Logs",
                        description: "Opening verification logs viewer.",
                      })
                    }}
                  >
                    View Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
