import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

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
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Smith" className="bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.smith@example.com"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Prime Collectibles" className="bg-white/5 border-white/10" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="bg-white/5 border-white/10" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full rounded-md bg-gradient-to-r from-neon-purple to-neon-blue border border-white/20 cursor-pointer"></div>
                    <span className="text-sm">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full rounded-md bg-gradient-to-r from-neon-green to-neon-blue border border-white/20 cursor-pointer"></div>
                    <span className="text-sm">Ocean</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full rounded-md bg-gradient-to-r from-neon-purple to-neon-red border border-white/20 cursor-pointer"></div>
                    <span className="text-sm">Sunset</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Enable Animations</Label>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Product Scans</p>
                    <p className="text-sm text-white/70">Receive notifications when your products are scanned</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Customers</p>
                    <p className="text-sm text-white/70">Receive notifications when new customers register</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-white/70">Receive notifications about security events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-white/70">Receive updates about new features and promotions</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Production API Key</Label>
                <div className="flex gap-2">
                  <Input
                    value="sk_prod_*****************************"
                    readOnly
                    className="bg-white/5 border-white/10 flex-1"
                  />
                  <Button variant="outline" className="border-white/10">
                    Copy
                  </Button>
                  <Button variant="outline" className="border-white/10">
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Test API Key</Label>
                <div className="flex gap-2">
                  <Input
                    value="sk_test_*****************************"
                    readOnly
                    className="bg-white/5 border-white/10 flex-1"
                  />
                  <Button variant="outline" className="border-white/10">
                    Copy
                  </Button>
                  <Button variant="outline" className="border-white/10">
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <div className="flex gap-2">
                  <Input placeholder="https://your-domain.com/webhook" className="bg-white/5 border-white/10 flex-1" />
                  <Button variant="outline" className="border-white/10">
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-white/70">
                <p>
                  Learn more about our{" "}
                  <a href="#" className="text-neon-blue hover:text-neon-purple">
                    API documentation
                  </a>
                  .
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Professional Plan</h3>
                    <p className="text-sm text-white/70">$1,499/month</p>
                  </div>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">Active</Badge>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p>Next billing date: May 15, 2024</p>
                  <p>Up to 1,000 NFC tags</p>
                  <p>Multi-chain support (3 chains)</p>
                  <p>Wear-to-earn functionality</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="visa">
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10">
                    <SelectItem value="visa">Visa ending in 4242</SelectItem>
                    <SelectItem value="mastercard">Mastercard ending in 5555</SelectItem>
                    <SelectItem value="new">Add new payment method</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">Upgrade Plan</Button>
              <Button variant="outline" className="border-white/10">
                View Billing History
              </Button>
              <Button variant="outline" className="border-white/10 text-red-500 hover:text-red-400">
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
