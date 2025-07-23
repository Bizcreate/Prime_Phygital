"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ExternalLink, Zap, Shield, Mail, Database } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EnvVar {
  key: string
  description: string
  example: string
  required: boolean
  category: string
  integration?: string
}

const ENV_VARIABLES: EnvVar[] = [
  // NFC & Security
  {
    key: "NFC_VERIFICATION_KEY",
    description: "32-byte hex key for NFC tag verification",
    example: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    required: true,
    category: "security",
  },

  // Blockchain - Easy Integrations
  {
    key: "NEXT_PUBLIC_BLOCKCHAIN_NETWORK",
    description: "Primary blockchain network",
    example: "ethereum",
    required: true,
    category: "blockchain",
  },
  {
    key: "NEXT_PUBLIC_ETHEREUM_RPC_URL",
    description: "Ethereum RPC endpoint",
    example: "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY",
    required: true,
    category: "blockchain",
    integration: "Alchemy",
  },
  {
    key: "NEXT_PUBLIC_POLYGON_RPC_URL",
    description: "Polygon RPC endpoint",
    example: "https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY",
    required: false,
    category: "blockchain",
    integration: "Alchemy",
  },
  {
    key: "BLOCKCHAIN_API_KEY",
    description: "Server-side blockchain API key",
    example: "your-alchemy-api-key",
    required: true,
    category: "blockchain",
    integration: "Alchemy",
  },

  // Verification
  {
    key: "NEXT_PUBLIC_VERIFICATION_URL",
    description: "Base URL for product verification",
    example: "https://yourapp.vercel.app/verify",
    required: true,
    category: "verification",
  },

  // Email
  {
    key: "EMAIL_API_KEY",
    description: "Email service API key",
    example: "re_xxxxxxxxxx",
    required: false,
    category: "email",
    integration: "Resend",
  },
]

const EASY_INTEGRATIONS = [
  {
    name: "Alchemy",
    description: "Blockchain infrastructure for Ethereum, Polygon, Base, Arbitrum",
    url: "https://alchemy.com",
    setup: "1. Sign up → 2. Create app → 3. Copy API key",
    free: "300M requests/month",
    icon: "🔗",
  },
  {
    name: "Resend",
    description: "Email API for transactional emails",
    url: "https://resend.com",
    setup: "1. Sign up → 2. Verify domain → 3. Create API key",
    free: "3,000 emails/month",
    icon: "📧",
  },
  {
    name: "Vercel",
    description: "Hosting and deployment platform",
    url: "https://vercel.com",
    setup: "1. Connect GitHub → 2. Deploy → 3. Add env vars",
    free: "Unlimited hobby projects",
    icon: "▲",
  },
  {
    name: "Supabase",
    description: "Database and authentication",
    url: "https://supabase.com",
    setup: "1. Create project → 2. Copy connection string",
    free: "500MB database",
    icon: "🗄️",
  },
]

export function EnvironmentSetup() {
  const { toast } = useToast()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [envValues, setEnvValues] = useState<Record<string, string>>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      toast({
        title: "Copied!",
        description: `${key} copied to clipboard`,
      })
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const generateNFCKey = () => {
    const key = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    setEnvValues((prev) => ({ ...prev, NFC_VERIFICATION_KEY: key }))
  }

  const generateEnvFile = () => {
    const envContent = ENV_VARIABLES.map((env) => {
      const value = envValues[env.key] || env.example
      return `${env.key}=${value}`
    }).join("\n")

    copyToClipboard(envContent, "Complete .env.local file")
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "blockchain":
        return <Zap className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "verification":
        return <Check className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Prime Phygital Setup</h1>
        <p className="text-muted-foreground">Configure your environment variables for multi-chain NFC authentication</p>
      </div>

      <Tabs defaultValue="quick-start" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="multi-chain">Multi-Chain</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-start" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Quick Start (5 minutes)</CardTitle>
              <CardDescription>Get up and running with minimal configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">1. Generate NFC Key</p>
                    <p className="text-sm text-muted-foreground">Secure key for tag verification</p>
                  </div>
                  <Button onClick={generateNFCKey} variant="outline">
                    Generate
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">2. Get Alchemy API Key</p>
                    <p className="text-sm text-muted-foreground">Free blockchain infrastructure</p>
                  </div>
                  <Button asChild variant="outline">
                    <a href="https://alchemy.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Sign Up
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">3. Deploy to Vercel</p>
                    <p className="text-sm text-muted-foreground">One-click deployment</p>
                  </div>
                  <Button asChild variant="outline">
                    <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Deploy
                    </a>
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={generateEnvFile} className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Generate Complete .env.local File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          {ENV_VARIABLES.map((env) => (
            <Card key={env.key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(env.category)}
                    <CardTitle className="text-base">{env.key}</CardTitle>
                    {env.required && <Badge variant="destructive">Required</Badge>}
                    {env.integration && <Badge variant="outline">{env.integration}</Badge>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(env.example, env.key)}>
                    {copiedKey === env.key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <CardDescription>{env.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={env.key}>Value</Label>
                  <Input
                    id={env.key}
                    value={envValues[env.key] || ""}
                    onChange={(e) => setEnvValues((prev) => ({ ...prev, [env.key]: e.target.value }))}
                    placeholder={env.example}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {EASY_INTEGRATIONS.map((integration) => (
              <Card key={integration.name}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{integration.icon}</span>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-green-600">Free Tier: {integration.free}</p>
                    <p className="text-muted-foreground mt-1">{integration.setup}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <a href={integration.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="multi-chain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔗 Multi-Chain Configuration</CardTitle>
              <CardDescription>Support multiple blockchain networks simultaneously</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-medium">Supported Networks</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Ethereum", id: "ethereum", testnet: "Goerli" },
                      { name: "Polygon", id: "polygon", testnet: "Mumbai" },
                      { name: "Base", id: "base", testnet: "Base Goerli" },
                      { name: "Arbitrum", id: "arbitrum", testnet: "Arbitrum Goerli" },
                      { name: "Solana", id: "solana", testnet: "Devnet" },
                    ].map((network) => (
                      <div key={network.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{network.name}</span>
                        <Badge variant="outline">{network.testnet}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Configuration Example</h3>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    <div>NEXT_PUBLIC_BLOCKCHAIN_NETWORK=ethereum</div>
                    <div>NEXT_PUBLIC_ETHEREUM_RPC_URL=...</div>
                    <div>NEXT_PUBLIC_POLYGON_RPC_URL=...</div>
                    <div>NEXT_PUBLIC_BASE_RPC_URL=...</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
                <p className="text-blue-800 text-sm">
                  Configure multiple RPC URLs to automatically failover between networks. Users can switch chains in the
                  UI, and the platform will use the appropriate contract address and RPC endpoint.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
