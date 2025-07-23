"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

/**
 * Client component – shows **examples only**.
 * No real API keys or complete RPC URLs are shipped to the client.
 */
export function AlchemyMultiChainGuide() {
  const [apiKey, setApiKey] = useState("")
  const [copiedEnv, setCopiedEnv] = useState(false)
  const { toast } = useToast()

  const chains = [
    { name: "Ethereum", network: "eth-mainnet", testnet: "eth-sepolia" },
    { name: "Polygon", network: "polygon-mainnet", testnet: "polygon-amoy" },
    { name: "Base", network: "base-mainnet", testnet: "base-sepolia" },
    { name: "Arbitrum", network: "arb-mainnet", testnet: "arb-sepolia" },
    { name: "Optimism", network: "opt-mainnet", testnet: "opt-sepolia" },
  ]

  const generateEnvVars = () => {
    if (!apiKey.trim()) return ""

    return chains
      .map(
        (chain) =>
          `NEXT_PUBLIC_${chain.name.toUpperCase()}_RPC_URL="https://${chain.network}.g.alchemy.com/v2/${apiKey}"`,
      )
      .join("\n")
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEnv(true)
      setTimeout(() => setCopiedEnv(false), 2000)
      toast({
        title: "Copied!",
        description: "Environment variables copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const envSnippet = `# .env.local
# Replace <ALCHEMY_KEY> with your actual key – keep it on the server!
ETH_MAINNET_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/<ALCHEMY_KEY>"
POLYGON_MAINNET_RPC_URL="https://polygon-mainnet.g.alchemy.com/v2/<ALCHEMY_KEY>"
BASE_MAINNET_RPC_URL="https://base-mainnet.g.alchemy.com/v2/<ALCHEMY_KEY>"`

  const copySnippet = async () => {
    await navigator.clipboard.writeText(envSnippet)
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Alchemy Multi-Chain Setup
          </CardTitle>
          <CardDescription>
            Set up RPC endpoints for multiple blockchains using a single Alchemy account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alchemy-key">Your Alchemy API Key</Label>
            <Input
              id="alchemy-key"
              type="password"
              placeholder="Enter your Alchemy API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          {apiKey && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Generated Environment Variables</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateEnvVars())}
                  className="flex items-center gap-2"
                >
                  {copiedEnv ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedEnv ? "Copied!" : "Copy All"}
                </Button>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{generateEnvVars()}</pre>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chains.map((chain) => (
              <div key={chain.name} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{chain.name}</h5>
                  <Badge variant="secondary">Supported</Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Mainnet: {chain.network}</div>
                  <div>Testnet: {chain.testnet}</div>
                </div>
              </div>
            ))}
          </div>

          <p>1. Create a single Alchemy project and enable every chain you need (Ethereum, Polygon, Base, …).</p>
          <p>
            2. Copy the&nbsp;<code>&lt;ALCHEMY_KEY&gt;</code>&nbsp;value only – never commit full URLs.
          </p>
          <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">{envSnippet}</pre>
          <Button onClick={copySnippet} variant="secondary" size="sm">
            <Copy className="mr-2 h-4 w-4" /> Copy to clipboard
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Create Alchemy Account</p>
                <p className="text-sm text-gray-600">Sign up at alchemy.com and create a new app</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Get API Key</p>
                <p className="text-sm text-gray-600">Copy your API key from the Alchemy dashboard</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Add Environment Variables</p>
                <p className="text-sm text-gray-600">Paste the generated variables into your .env.local file</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                4
              </div>
              <div>
                <p className="font-medium">Deploy to Vercel</p>
                <p className="text-sm text-gray-600">Add the same variables to your Vercel project settings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
