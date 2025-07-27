"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AlchemySingleAppGuide() {
  const [apiKey, setApiKey] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum")
  const [generatedEnv, setGeneratedEnv] = useState("")
  const { toast } = useToast()

  const networks = [
    { id: "ethereum", name: "Ethereum", endpoint: "eth-mainnet" },
    { id: "polygon", name: "Polygon", endpoint: "polygon-mainnet" },
    { id: "base", name: "Base", endpoint: "base-mainnet" },
    { id: "arbitrum", name: "Arbitrum", endpoint: "arb-mainnet" },
    { id: "optimism", name: "Optimism", endpoint: "opt-mainnet" },
  ]

  const generateEnvironmentVariable = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Alchemy API key first.",
        variant: "destructive",
      })
      return
    }

    const network = networks.find((n) => n.id === selectedNetwork)
    if (!network) return

    const envVar = `# Alchemy Single Network Configuration
BLOCKCHAIN_API_KEY="${apiKey}"
NEXT_PUBLIC_BLOCKCHAIN_NETWORK="${selectedNetwork}"
NEXT_PUBLIC_${selectedNetwork.toUpperCase()}_RPC_URL="https://${network.endpoint}.g.alchemy.com/v2/${apiKey}"`

    setGeneratedEnv(envVar)
    toast({
      title: "Environment Variable Generated",
      description: "Copy this to your .env.local file.",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Environment variable copied successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            Alchemy Single Network Setup
          </CardTitle>
          <CardDescription>Configure a single blockchain network with Alchemy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Single Network Mode</h4>
                <p className="text-sm text-yellow-700">
                  This setup configures only one blockchain network. For multi-chain support, use the Multi-Chain setup
                  instead.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="network">Select Network</Label>
              <select
                id="network"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              >
                {networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

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

            <Button onClick={generateEnvironmentVariable} className="w-full">
              Generate Environment Variable
            </Button>
          </div>

          {generatedEnv && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Generated Environment Variable
                </CardTitle>
                <CardDescription>Copy this to your .env.local file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">{generatedEnv}</pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() => copyToClipboard(generatedEnv)}
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
                  <p className="font-medium">Create App for Selected Network</p>
                  <p className="text-sm text-muted-foreground">
                    Create an app for the {networks.find((n) => n.id === selectedNetwork)?.name} network
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
                  <p className="font-medium">Generate & Copy Environment Variable</p>
                  <p className="text-sm text-muted-foreground">
                    Use the form above to generate your environment variable
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
