"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, Key, Zap, Mail, Globe, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function QuickSetupWizard() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [setupData, setSetupData] = useState({
    nfcKey: "",
    alchemyKey: "CDRsul7gRaez_bOQIf6QV",
    resendKey: "",
    vercelUrl: "",
  })

  const generateNFCKey = () => {
    const randomBytes = new Uint8Array(32)
    crypto.getRandomValues(randomBytes)
    const hexKey = Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")

    setSetupData((prev) => ({ ...prev, nfcKey: hexKey }))
    toast({
      title: "NFC Key Generated!",
      description: "Secure 32-byte key created successfully",
    })
  }

  const copyEnvFile = async () => {
    const envContent = `# Prime Phygital Platform Environment Variables
NFC_VERIFICATION_KEY=${setupData.nfcKey}
BLOCKCHAIN_API_KEY=${setupData.alchemyKey}
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=ethereum

# Alchemy RPC URLs
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/${setupData.alchemyKey}
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/${setupData.alchemyKey}
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/${setupData.alchemyKey}
NEXT_PUBLIC_ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/${setupData.alchemyKey}
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/${setupData.alchemyKey}

# Contract Addresses (will be populated when you deploy)
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=
NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=

# Verification URL
NEXT_PUBLIC_VERIFICATION_URL=${setupData.vercelUrl || "https://your-app.vercel.app/verify"}

# Email (Optional)
${setupData.resendKey ? `EMAIL_API_KEY=${setupData.resendKey}` : "# EMAIL_API_KEY=your-resend-key"}
NEXT_PUBLIC_EMAIL_FROM=noreply@yourdomain.com`

    try {
      await navigator.clipboard.writeText(envContent)
      toast({
        title: "Environment File Copied!",
        description: "Paste this into your .env.local file",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step])
    }
  }

  const steps = [
    {
      id: 1,
      title: "Generate NFC Key",
      description: "Create secure verification key",
      icon: Key,
      required: true,
    },
    {
      id: 2,
      title: "Alchemy Setup",
      description: "Blockchain infrastructure",
      icon: Zap,
      required: true,
    },
    {
      id: 3,
      title: "Email Service",
      description: "Optional notifications",
      icon: Mail,
      required: false,
    },
    {
      id: 4,
      title: "Deploy Platform",
      description: "Launch on Vercel",
      icon: Globe,
      required: true,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Quick Setup Wizard</h1>
        <p className="text-muted-foreground">Get your Prime Phygital platform running in 5 minutes</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                completedSteps.includes(step.id)
                  ? "bg-green-500 border-green-500 text-white"
                  : currentStep === step.id
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-300"
              }`}
            >
              {completedSteps.includes(step.id) ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>

      <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          {steps.map((step) => (
            <TabsTrigger key={step.id} value={step.id.toString()} className="text-xs">
              Step {step.id}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Step 1: NFC Key Generation */}
        <TabsContent value="1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Step 1: Generate NFC Verification Key
              </CardTitle>
              <CardDescription>Create a secure 32-byte key for cryptographic verification of NFC tags</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Generated Key</Label>
                <div className="flex gap-2">
                  <Input
                    value={setupData.nfcKey}
                    readOnly
                    placeholder="Click generate to create your key"
                    className="font-mono text-sm"
                  />
                  <Button onClick={generateNFCKey}>
                    <Key className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>

              {setupData.nfcKey && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm font-medium">✅ Secure key generated successfully!</p>
                  <p className="text-green-700 text-sm mt-1">This key will be used to sign and verify NFC tags.</p>
                </div>
              )}

              <div className="flex justify-between">
                <div />
                <Button
                  onClick={() => {
                    if (setupData.nfcKey) {
                      markStepComplete(1)
                      setCurrentStep(2)
                    } else {
                      toast({
                        title: "Generate Key First",
                        description: "Please generate your NFC key before continuing",
                        variant: "destructive",
                      })
                    }
                  }}
                  disabled={!setupData.nfcKey}
                >
                  Next: Alchemy Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Alchemy Setup */}
        <TabsContent value="2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Step 2: Alchemy Configuration
              </CardTitle>
              <CardDescription>Your blockchain infrastructure is already configured</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input value={setupData.alchemyKey} readOnly className="font-mono text-sm bg-muted" />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm font-medium">✅ Alchemy is configured!</p>
                <p className="text-blue-700 text-sm mt-1">
                  Your API key supports Ethereum, Polygon, Base, Arbitrum, and Optimism.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    markStepComplete(2)
                    setCurrentStep(3)
                  }}
                >
                  Next: Email Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Email Setup */}
        <TabsContent value="3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Step 3: Email Service (Optional)
              </CardTitle>
              <CardDescription>Configure Resend for sending verification emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Resend API Key (Optional)</Label>
                <Input
                  value={setupData.resendKey}
                  onChange={(e) => setSetupData((prev) => ({ ...prev, resendKey: e.target.value }))}
                  placeholder="re_your_api_key_here"
                  className="font-mono text-sm"
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm font-medium">📧 Email is optional</p>
                <p className="text-amber-700 text-sm mt-1">
                  You can skip this step and add email later. The platform works without it.
                </p>
              </div>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Sign Up for Resend (Free)
                </a>
              </Button>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    markStepComplete(3)
                    setCurrentStep(4)
                  }}
                >
                  Next: Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Deployment */}
        <TabsContent value="4" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Step 4: Deploy to Vercel
              </CardTitle>
              <CardDescription>Launch your Prime Phygital platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Deployment URL (after deployment)</Label>
                <Input
                  value={setupData.vercelUrl}
                  onChange={(e) => setSetupData((prev) => ({ ...prev, vercelUrl: e.target.value }))}
                  placeholder="https://your-app.vercel.app"
                />
              </div>

              <div className="space-y-3">
                <Button onClick={copyEnvFile} className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Complete .env.local File
                </Button>

                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Deploy to Vercel
                  </a>
                </Button>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 text-sm font-medium">🚀 Ready to Deploy!</p>
                <p className="text-green-700 text-sm mt-1">
                  Copy your environment variables, push to GitHub, and deploy on Vercel.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  Back
                </Button>
                <Button onClick={() => markStepComplete(4)} className="bg-green-600 hover:bg-green-700">
                  Complete Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
