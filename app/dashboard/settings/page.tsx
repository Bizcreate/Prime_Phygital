import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ChevronRight, Lock } from "lucide-react"
import Link from "next/link"
import { SettingsForm } from "@/components/settings/settings-form"
import { PasswordForm } from "@/components/settings/password-form"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { BillingSettings } from "@/components/settings/billing-settings"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-white/70">Manage your account and platform preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <SettingsForm />
          <PasswordForm />

          <Link href="/dashboard/settings/verification" className="block">
            <Card className="glass-panel border-white/10 hover:bg-white/5 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-neon-blue" />
                  Verification Settings
                </CardTitle>
                <CardDescription>Configure product and service verification methods</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Choose from multiple verification methods including blockchain, digital signatures, NFC, and
                  biometrics.
                </p>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-white/50">8 verification methods available</span>
                  <ChevronRight className="h-5 w-5 text-white/50" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/settings/permissions" className="block">
            <Card className="glass-panel border-white/10 hover:bg-white/5 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-neon-purple" />
                  User Permissions
                </CardTitle>
                <CardDescription>Manage user roles and access permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Configure role-based access control, create custom roles, and manage user permissions across the
                  platform.
                </p>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-white/50">5 roles and 13 permissions available</span>
                  <ChevronRight className="h-5 w-5 text-white/50" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <ApiSettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
