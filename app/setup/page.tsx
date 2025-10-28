"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, ExternalLink, Zap, Shield, Mail, Key, Globe, Rocket } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { AlchemySingleAppGuide } from "@/components/setup/alchemy-single-app-guide"
import { ContractDeployerGuide } from "@/components/setup/contract-deployer-guide" // Import the guide

export default function SetupPage() {
  const { toast } = useToast()
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      })
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }))
  }

  const generateNFCKey = () => {
    const key = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    copyToClipboard(key, "NFC Verification Key")
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Prime Phygital Setup Guide</h1>
        <p className="text-muted-foreground">Complete step-by-step setup for your NFC authentication platform</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nfc">NFC Setup</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="contract-deploy">Contract Deploy</TabsTrigger> {/* New Tab */}
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="deployment">Deploy</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">NFC Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate cryptographic keys for secure NFC tag verification
                </p>
                <Badge variant="outline">Required</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Blockchain</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  One Alchemy app with multiple chains - much easier!
                </p>
                <Badge variant="outline">Multi-chain</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Email Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Send verification emails and notifications</p>
                <Badge variant="secondary">Optional</Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🚀 Quick Start Checklist</CardTitle>
              <CardDescription>Complete these steps to get your platform running</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "nfc", title: "Generate NFC verification key", time: "1 min" },
                  { id: "alchemy", title: "Create single Alchemy app with multiple chains", time: "3 min" },
                  { id: "contract-deploy", title: "Deploy Smart Contracts to Mainnet", time: "10-30 min" }, // New step
                  { id: "resend", title: "Configure Resend for emails", time: "2 min" },
                  { id: "env", title: "Add environment variables", time: "2 min" },
                  { id: "deploy", title: "Deploy to Vercel", time: "3 min" },
                  { id: "test", title: "Test NFC verification", time: "2 min" },
                ].map((step) => (
                  <div key={step.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={completedSteps[step.id] || false}
                        onChange={() => markStepCompleted(step.id)}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{step.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NFC Setup Tab */}
        <TabsContent value="nfc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Step 1: Generate NFC Verification Key
              </CardTitle>
              <CardDescription>
                Create a secure 32-byte hexadecimal key for cryptographic verification of NFC tags
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">🔐 What is this key for?</h4>
                <p className="text-yellow-700 text-sm">
                  This key is used to cryptographically sign and verify NFC tags. Each product gets a unique signature
                  that can only be verified with this key, preventing counterfeiting.
                </p>
              </div>

              <div className="space-y-3">
                <Label>Generated Key (keep this secure!)</Label>
                <div className="flex gap-2">
                  <Button onClick={generateNFCKey} className="flex-1">
                    <Key className="h-4 w-4 mr-2" />
                    Generate Secure Key
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Add to your .env.local file:</h4>
                <code className="text-sm">NFC_VERIFICATION_KEY=your-generated-key-here</code>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">⚠️ Security Warning</h4>
                <p className="text-red-700 text-sm">
                  Store this key securely! If compromised, attackers could create fake product signatures. Never commit
                  this key to version control.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blockchain Tab */}
        <TabsContent value="blockchain" className="space-y-4">
          <AlchemySingleAppGuide />
        </TabsContent>

        {/* Contract Deployment Tab */}
        <TabsContent value="contract-deploy" className="space-y-4">
          <ContractDeployerGuide />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Step 3: Update Environment Variables with Deployed Contract Addresses
              </CardTitle>
              <CardDescription>
                After deploying your smart contracts, update your `.env.local` and Vercel environment variables.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">💡 Important!</h4>
                <p className="text-blue-700 text-sm">
                  For each blockchain network you deployed to, you will get a unique contract address. You need to add
                  these to your environment variables so your application knows where to interact with your contracts.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Example .env.local entries:</h4>
                <code className="block p-2 bg-gray-100 rounded text-xs">
                  NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0xYourEthereumContractAddressHere
                  <br />
                  NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0xYourPolygonContractAddressHere
                  <br />
                  NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0xYourBaseContractAddressHere
                  <br />
                  {/* Add more as needed for other chains */}
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure to replace `0xYour...ContractAddressHere` with the actual addresses from your deployment.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Step 4: Set Up Resend for Email (Optional)
              </CardTitle>
              <CardDescription>Send verification emails and notifications to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">📧 Why Resend?</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Free tier: 3,000 emails/month</li>
                  <li>• Simple API</li>
                  <li>• Great deliverability</li>
                  <li>• Easy domain setup</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">📋 Step-by-Step Setup:</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">1</span>
                    <div>
                      <p className="font-medium">Sign Up for Resend</p>
                      <p className="text-muted-foreground">Create account at resend.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">2</span>
                    <div>
                      <p className="font-medium">Verify Domain (Optional)</p>
                      <p className="text-muted-foreground">Add your domain or use resend.dev for testing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">3</span>
                    <div>
                      <p className="font-medium">Create API Key</p>
                      <p className="text-muted-foreground">Go to API Keys → Create API Key</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">4</span>
                    <div>
                      <p className="font-medium">Copy API Key</p>
                      <p className="text-muted-foreground">Starts with "re_"</p>
                    </div>
                  </li>
                </ol>
              </div>

              <Button asChild className="w-full">
                <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Sign Up for Resend (Free)
                </a>
              </Button>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Environment Variables to Add:</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div>EMAIL_API_KEY=re_your_api_key_here</div>
                  <div>NEXT_PUBLIC_EMAIL_FROM=noreply@yourdomain.com</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deployment Tab */}
        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Step 5: Deploy to Vercel
              </CardTitle>
              <CardDescription>Deploy your Prime Phygital platform with one click</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">▲ Why Vercel?</h4>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Free hosting for hobby projects</li>
                  <li>• Automatic deployments from Git</li>
                  <li>• Built-in environment variables</li>
                  <li>• Global CDN</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">📋 Deployment Steps:</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">1</span>
                    <div>
                      <p className="font-medium">Push Code to GitHub</p>
                      <p className="text-muted-foreground">Create a repository and push your code</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">2</span>
                    <div>
                      <p className="font-medium">Connect to Vercel</p>
                      <p className="text-muted-foreground">Import your GitHub repository</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">3</span>
                    <div>
                      <p className="font-medium">Add Environment Variables</p>
                      <p className="text-muted-foreground">
                        Copy all your .env.local variables (including new contract addresses) to Vercel
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">4</span>
                    <div>
                      <p className="font-medium">Deploy</p>
                      <p className="text-muted-foreground">Click deploy and wait for build to complete</p>
                    </div>
                  </li>
                </ol>
              </div>

              <Button asChild className="w-full">
                <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Deploy to Vercel
                </a>
              </Button>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Don't forget to set:</h4>
                <div className="text-sm">
                  <p>NEXT_PUBLIC_VERIFICATION_URL=https://your-app.vercel.app/verify</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                Step 6: Test Your Setup
              </CardTitle>
              <CardDescription>Verify that everything is working correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">🧪 Testing Checklist:</h4>
                  <div className="space-y-2">
                    {[
                      { test: "Visit your deployed app", url: "https://your-app.vercel.app" },
                      { test: "Go to consumer demo", url: "/demo/consumer" },
                      { test: "Test NFC simulation", description: "Click 'Scan Product' button" },
                      { test: "Check verification", description: "Should show success message" },
                      { test: "Test blockchain connection", description: "Check network status" },
                      { test: "Test email (if configured)", description: "Try sending a test email" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2">
                        <input type="checkbox" className="h-4 w-4" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.test}</p>
                          {item.url && <p className="text-xs text-muted-foreground font-mono">{item.url}</p>}
                          {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">🎉 Success!</h4>
                  <p className="text-green-700 text-sm">
                    If all tests pass, your Prime Phygital platform is ready! Users can now scan NFC tags, verify
                    products, and earn rewards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔧 Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-800">NFC not working?</h4>
                  <p className="text-sm text-red-700">Check that NFC_VERIFICATION_KEY is set correctly</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium text-yellow-800">Blockchain errors?</h4>
                  <p className="text-sm text-yellow-700">Verify your Alchemy API key and RPC URLs</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-800">Email not sending?</h4>
                  <p className="text-sm text-blue-700">Check your Resend API key and domain verification</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
