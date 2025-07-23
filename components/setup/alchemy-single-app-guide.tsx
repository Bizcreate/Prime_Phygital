"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AlchemySingleAppGuide() {
  const [apiKey, setApiKey] = useState("")
  const [selectedChain, setSelectedChain] = useState("")
  const [copiedEnv, setCopiedEnv] = useState(false)
  const { toast } = useToast()

  const chains = [
    { value: "ethereum", label: "Ethereum", network: "eth-mainnet", testnet: "eth-sepolia" },
    { value: "polygon", label: "Polygon", network: "polygon-mainnet", testnet: "polygon-amoy" },
    { value: "base", label: "Base", network: "base-mainnet", testnet: "base-sepolia" },
    { value: "arbitrum", label: "Arbitrum", network: "arb-mainnet", testnet: "arb-sepolia" },
    { value: "optimism", label: "Optimism", network: "opt-mainnet", testnet: "opt-sepolia" },
  ]

  const generateEnvVars = () => {
    if (!apiKey.trim() || !selectedChain) return ""

    const chain = chains.find((c) => c.value === selectedChain)
    if (!chain) return ""

    return `# Primary blockchain configuration
BLOCKCHAIN_API_KEY="${apiKey}"
NEXT_PUBLIC_BLOCKCHAIN_NETWORK="${selectedChain}"
NEXT_PUBLIC_${chain.label.toUpperCase()}_RPC_URL="https://${chain.network}.g.alchemy.com/v2/${apiKey}"

# Optional testnet configuration
NEXT_PUBLIC_${chain.label.toUpperCase()}_TESTNET_RPC_URL="https://${chain.testnet}.g.alchemy.com/v2/${apiKey}"`
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Alchemy Single Chain Setup
          </CardTitle>
          <CardDescription>Set up RPC endpoint for a single blockchain using Alchemy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chain-select">Select Blockchain</Label>
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a blockchain" />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((chain) => (
                    <SelectItem key={chain.value} value={chain.value}>
                      {chain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">Alchemy API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>

          {apiKey && selectedChain && (
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
                  {copiedEnv ? "Copied!" : "Copy"}
                </Button>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{generateEnvVars()}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Quick Setup Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Create Alchemy App</p>
                <p className="text-sm text-gray-600">Go to alchemy.com and create a new application</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Select Network</p>
                <p className="text-sm text-gray-600">Choose your preferred blockchain network</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Copy API Key</p>
                <p className="text-sm text-gray-600">Get your API key from the app dashboard</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                4
              </div>
              <div>
                <p className="font-medium">Configure Environment</p>
                <p className="text-sm text-gray-600">Add the generated variables to your .env.local file</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
