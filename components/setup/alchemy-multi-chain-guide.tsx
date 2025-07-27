"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChainConfig {
  name: string
  network: string
  description: string
  color: string
}

const SUPPORTED_CHAINS: ChainConfig[] = [
  { name: "Ethereum", network: "ethereum", description: "Mainnet and Sepolia testnet", color: "bg-blue-500" },
  { name: "Polygon", network: "polygon", description: "Mainnet and Amoy testnet", color: "bg-purple-500" },
  { name: "Base", network: "base", description: "Mainnet and Sepolia testnet", color: "bg-blue-600" },
  { name: "Arbitrum", network: "arbitrum", description: "Mainnet support", color: "bg-cyan-500" },
  { name: "Optimism", network: "optimism", description: "Mainnet support", color: "bg-red-500" },
]

export function AlchemyMultiChainGuide() {
  const [apiKey, setApiKey] = useState("")
  const [generatedEnvs, setGeneratedEnvs] = useState<string[]>([])
  const { toast } = useToast()

  const generateEnvironmentVariables = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Alchemy API key first.",
        variant: "destructive",
      })
      return
    }

    const envVars = [
      `# Alchemy Multi-Chain Configuration`,
      `BLOCKCHAIN_API_KEY="${apiKey}"`,
      ``,
      `# Ethereum`,
      `NEXT_PUBLIC_ETHEREUM_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/${apiKey}"`,
      `NEXT_PUBLIC_ETHEREUM_TESTNET_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/${apiKey}"`,
      ``,
      `# Polygon`,
      `NEXT_PUBLIC_POLYGON_RPC_URL="https://polygon-mainnet.g.alchemy.com/v2/${apiKey}"`,
      `NEXT_PUBLIC_POLYGON_TESTNET_RPC_URL="https://polygon-amoy.g.alchemy.com/v2/${apiKey}"`,
      ``,
      `# Base`,
      `NEXT_PUBLIC_BASE_RPC_URL="https://base-mainnet.g.alchemy.com/v2/${apiKey}"`,
      `NEXT_PUBLIC_BASE_TESTNET_RPC_URL="https://base-sepolia.g.alchemy.com/v2/${apiKey}"`,
      ``,
      `# Arbitrum`,
      `NEXT_PUBLIC_ARBITRUM_RPC_URL="https://arb-mainnet.g.alchemy.com/v2/${apiKey}"`,
      ``,
      `# Optimism`,
      `NEXT_PUBLIC_OPTIMISM_RPC_URL="https://opt-mainnet.g.alchemy.com/v2/${apiKey}"`,
    ]

    setGeneratedEnvs(envVars)
    toast({
      title: "Environment Variables Generated",
      description: "Copy these to your .env.local file.",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Environment variables copied successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Alchemy Multi-Chain Setup
          </CardTitle>
          <CardDescription>Configure multiple blockchain networks with a single Alchemy account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">Alchemy API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Alchemy API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <Button onClick={generateEnvironmentVariables} className="w-full">
              Generate Environment Variables
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUPPORTED_CHAINS.map((chain) => (
              <Card
                key={chain.network}
                className="border-l-4"
                style={{ borderLeftColor: chain.color.replace("bg-", "#") }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{chain.name}</h3>
                      <p className="text-sm text-muted-foreground">{chain.description}</p>
                    </div>
                    <Badge variant="secondary">{chain.network}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {generatedEnvs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Generated Environment Variables
                </CardTitle>
                <CardDescription>Copy these to your .env.local file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">{generatedEnvs.join("\n")}</pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() => copyToClipboard(generatedEnvs.join("\n"))}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Setup Instructions</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  1
                </Badge>
                <div>
                  <p className="font-medium">Create Alchemy Account</p>
                  <p className="text-sm text-muted-foreground">
                    Sign up at{" "}
                    <a
                      href="https://alchemy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline inline-flex items-center gap-1"
                    >
                      alchemy.com <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  2
                </Badge>
                <div>
                  <p className="font-medium">Create Apps for Each Network</p>
                  <p className="text-sm text-muted-foreground">
                    Create separate apps for each blockchain network you want to support
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  3
                </Badge>
                <div>
                  <p className="font-medium">Get API Key</p>
                  <p className="text-sm text-muted-foreground">Copy the API key from your Alchemy dashboard</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  4
                </Badge>
                <div>
                  <p className="font-medium">Generate & Copy Environment Variables</p>
                  <p className="text-sm text-muted-foreground">
                    Use the form above to generate your environment variables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
