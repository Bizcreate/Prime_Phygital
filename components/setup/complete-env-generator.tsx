"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Check, AlertCircle, Database, Key, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CompleteEnvGenerator() {
  const [copied, setCopied] = useState(false)
  const [config, setConfig] = useState({
    databaseUrl: "",
    jwtSecret: "",
    alchemyApiKey: "",
    nfcVerificationKey: "",
    appUrl: "https://your-app.vercel.app",
    emailApiKey: "",
    emailFrom: "noreply@yourdomain.com",
  })

  const { toast } = useToast()

  const generateJwtSecret = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let result = ""
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setConfig({ ...config, jwtSecret: result })
  }

  const generateNfcKey = () => {
    const bytes = new Uint8Array(32)
    crypto.getRandomValues(bytes)
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    setConfig({ ...config, nfcVerificationKey: hex })
  }

  const generateEnvFile = () => {
    return `# =============================================================================
# PRIME PHYGITAL PLATFORM - ENVIRONMENT CONFIGURATION
# =============================================================================

# -----------------------------------------------------------------------------
# DATABASE (NEON)
# -----------------------------------------------------------------------------
# Get this from your Neon dashboard -> Connection Details
DATABASE_URL="${config.databaseUrl}"

# -----------------------------------------------------------------------------
# AUTHENTICATION
# -----------------------------------------------------------------------------
# JWT secret for token signing (keep this secure!)
JWT_SECRET="${config.jwtSecret}"

# -----------------------------------------------------------------------------
# BLOCKCHAIN (ALCHEMY)
# -----------------------------------------------------------------------------
# Your Alchemy API Key from dashboard
BLOCKCHAIN_API_KEY="${config.alchemyApiKey}"

# Primary blockchain network
NEXT_PUBLIC_BLOCKCHAIN_NETWORK="ethereum"

# -----------------------------------------------------------------------------
# RPC URLs (USING YOUR ALCHEMY API KEY)
# -----------------------------------------------------------------------------
# Mainnet URLs
NEXT_PUBLIC_ETHEREUM_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}"
NEXT_PUBLIC_POLYGON_RPC_URL="https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}"
NEXT_PUBLIC_BASE_RPC_URL="https://base-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}"
NEXT_PUBLIC_ARBITRUM_RPC_URL="https://arb-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}"
NEXT_PUBLIC_OPTIMISM_RPC_URL="https://opt-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}"

# Testnet URLs (for development)
NEXT_PUBLIC_ETHEREUM_TESTNET_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/${config.alchemyApiKey}"
NEXT_PUBLIC_POLYGON_TESTNET_RPC_URL="https://polygon-amoy.g.alchemy.com/v2/${config.alchemyApiKey}"
NEXT_PUBLIC_BASE_TESTNET_RPC_URL="https://base-sepolia.g.alchemy.com/v2/${config.alchemyApiKey}"

# -----------------------------------------------------------------------------
# NFC SECURITY
# -----------------------------------------------------------------------------
# 32-byte hex key for NFC signature verification (NEVER use NEXT_PUBLIC_)
NFC_VERIFICATION_KEY="${config.nfcVerificationKey}"

# -----------------------------------------------------------------------------
# APPLICATION URLS
# -----------------------------------------------------------------------------
# Your deployed app URL (update after deployment)
NEXT_PUBLIC_APP_URL="${config.appUrl}"
NEXT_PUBLIC_VERIFICATION_URL="${config.appUrl}/verify"

# -----------------------------------------------------------------------------
# EMAIL (OPTIONAL - FOR NOTIFICATIONS)
# -----------------------------------------------------------------------------
# Email service API key (Resend recommended)
EMAIL_API_KEY="${config.emailApiKey}"
NEXT_PUBLIC_EMAIL_FROM="${config.emailFrom}"

# -----------------------------------------------------------------------------
# CONTRACT ADDRESSES (OPTIONAL - POPULATED AFTER DEPLOYMENT)
# -----------------------------------------------------------------------------
# These will be auto-populated when you deploy contracts
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=""
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=""
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=""
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=""
NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=""

# Testnet contracts (for development)
NEXT_PUBLIC_ETHEREUM_TESTNET_CONTRACT_ADDRESS=""
NEXT_PUBLIC_POLYGON_TESTNET_CONTRACT_ADDRESS=""
NEXT_PUBLIC_BASE_TESTNET_CONTRACT_ADDRESS=""
`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEnvFile())
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Environment configuration copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const isConfigComplete = config.databaseUrl && config.jwtSecret && config.alchemyApiKey && config.nfcVerificationKey

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Environment Configuration</h1>
        <p className="text-gray-600">Set up your Prime Phygital platform environment variables</p>
      </div>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database (Neon)
                </CardTitle>
                <CardDescription>Get your connection string from Neon dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="database-url">Database URL</Label>
                  <Input
                    id="database-url"
                    placeholder="postgresql://username:password@host/database?sslmode=require"
                    value={config.databaseUrl}
                    onChange={(e) => setConfig({ ...config, databaseUrl: e.target.value })}
                  />
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    1. Go to Neon dashboard
                    <br />
                    2. Select your database
                    <br />
                    3. Copy the connection string
                    <br />
                    4. Make sure to use the pooled connection
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>Generate secure keys for JWT and NFC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jwt-secret">JWT Secret</Label>
                  <div className="flex gap-2">
                    <Input
                      id="jwt-secret"
                      placeholder="Click generate for secure key"
                      value={config.jwtSecret}
                      onChange={(e) => setConfig({ ...config, jwtSecret: e.target.value })}
                    />
                    <Button onClick={generateJwtSecret} variant="outline">
                      Generate
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="nfc-key">NFC Verification Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="nfc-key"
                      placeholder="Click generate for 32-byte hex key"
                      value={config.nfcVerificationKey}
                      onChange={(e) => setConfig({ ...config, nfcVerificationKey: e.target.value })}
                    />
                    <Button onClick={generateNfcKey} variant="outline">
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Blockchain (Alchemy)
                </CardTitle>
                <CardDescription>Your Alchemy API key for multi-chain support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="alchemy-key">Alchemy API Key</Label>
                  <Input
                    id="alchemy-key"
                    placeholder="Your Alchemy API key"
                    value={config.alchemyApiKey}
                    onChange={(e) => setConfig({ ...config, alchemyApiKey: e.target.value })}
                  />
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    1. Go to Alchemy dashboard
                    <br />
                    2. Create new app
                    <br />
                    3. Enable multiple chains
                    <br />
                    4. Copy the API key
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optional Settings</CardTitle>
                <CardDescription>Email and app configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="app-url">App URL</Label>
                  <Input
                    id="app-url"
                    placeholder="https://your-app.vercel.app"
                    value={config.appUrl}
                    onChange={(e) => setConfig({ ...config, appUrl: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email-key">Email API Key (Optional)</Label>
                  <Input
                    id="email-key"
                    placeholder="Resend API key"
                    value={config.emailApiKey}
                    onChange={(e) => setConfig({ ...config, emailApiKey: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated .env.local File</CardTitle>
              <CardDescription>Copy this content to your .env.local file</CardDescription>
            </CardHeader>
            <CardContent>
              {!isConfigComplete ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please complete the required fields in the Setup tab first:
                    <ul className="list-disc list-inside mt-2">
                      {!config.databaseUrl && <li>Database URL</li>}
                      {!config.jwtSecret && <li>JWT Secret</li>}
                      {!config.alchemyApiKey && <li>Alchemy API Key</li>}
                      {!config.nfcVerificationKey && <li>NFC Verification Key</li>}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Configuration ready for deployment</span>
                    <Button onClick={copyToClipboard} className="flex items-center gap-2">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy to Clipboard"}
                    </Button>
                  </div>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-96">{generateEnvFile()}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Steps</CardTitle>
              <CardDescription>Follow these steps to deploy your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Set up Neon Database</h3>
                    <p className="text-sm text-gray-600">Run the SQL scripts in your Neon console</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Create .env.local</h3>
                    <p className="text-sm text-gray-600">Copy the generated environment variables to your project</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Deploy to Vercel</h3>
                    <p className="text-sm text-gray-600">Push to GitHub and connect to Vercel</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold">Add Environment Variables</h3>
                    <p className="text-sm text-gray-600">Add all variables to Vercel dashboard</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold">Test Deployment</h3>
                    <p className="text-sm text-gray-600">Visit /setup/test to verify everything works</p>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Never commit your .env.local file to git. Make sure it's in your
                  .gitignore file.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
