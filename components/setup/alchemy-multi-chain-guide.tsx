"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ExternalLink, Zap, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ChainConfig {
  name: string
  network: string
  color: string
  logo: string
  benefits: string[]
  gasToken: string
}

const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    name: "Ethereum",
    network: "Ethereum Mainnet",
    color: "bg-blue-500",
    logo: "⟠",
    benefits: ["Most secure", "Largest ecosystem", "Best for high-value items"],
    gasToken: "ETH",
  },
  {
    name: "Polygon",
    network: "Polygon Mainnet",
    color: "bg-purple-500",
    logo: "⬟",
    benefits: ["Low gas fees", "Fast transactions", "Ethereum compatible"],
    gasToken: "MATIC",
  },
  {
    name: "Base",
    network: "Base Mainnet",
    color: "bg-blue-600",
    logo: "🔵",
    benefits: ["Coinbase backed", "Low fees", "Growing ecosystem"],
    gasToken: "ETH",
  },
  {
    name: "Arbitrum",
    network: "Arbitrum One",
    color: "bg-cyan-500",
    logo: "🔷",
    benefits: ["Layer 2 scaling", "Lower fees", "Ethereum security"],
    gasToken: "ETH",
  },
  {
    name: "Optimism",
    network: "Optimism Mainnet",
    color: "bg-red-500",
    logo: "🔴",
    benefits: ["Optimistic rollup", "Fast finality", "EVM compatible"],
    gasToken: "ETH",
  },
]

export function AlchemyMultiChainGuide() {
  const { toast } = useToast()
  const [selectedChains, setSelectedChains] = useState<string[]>(["Ethereum", "Polygon"])
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [createdApps, setCreatedApps] = useState<Record<string, boolean>>({})

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

  const toggleChain = (chainName: string) => {
    setSelectedChains((prev) => (prev.includes(chainName) ? prev.filter((c) => c !== chainName) : [...prev, chainName]))
  }

  const markAppCreated = (chainName: string) => {
    setCreatedApps((prev) => ({ ...prev, [chainName]: !prev[chainName] }))
  }

  const generateEnvVars = () => {
    const envVars = selectedChains
      .map((chain) => {
        const chainLower = chain.toLowerCase()
        return `NEXT_PUBLIC_${chain.toUpperCase()}_RPC_URL=https://${chainLower === "ethereum" ? "eth" : chainLower}-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_${chain.toUpperCase()}_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890`
      })
      .join("\n")

    const fullEnv = `# Alchemy Multi-Chain Configuration
${envVars}

# Primary blockchain network
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=${selectedChains[0].toLowerCase()}

# Server-side API key (same for all chains)
BLOCKCHAIN_API_KEY=YOUR_ALCHEMY_API_KEY`

    copyToClipboard(fullEnv, "Multi-chain environment variables")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-blue-600" />
          Alchemy Multi-Chain Setup
        </h2>
        <p className="text-muted-foreground">Create separate apps for each blockchain network you want to support</p>
      </div>

      <Tabs defaultValue="selection" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="selection">Chain Selection</TabsTrigger>
          <TabsTrigger value="setup">App Creation</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="selection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🌐 Choose Your Blockchain Networks</CardTitle>
              <CardDescription>Select which chains you want to support. You can always add more later.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {SUPPORTED_CHAINS.map((chain) => (
                  <div
                    key={chain.name}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedChains.includes(chain.name)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleChain(chain.name)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{chain.logo}</span>
                        <div>
                          <h3 className="font-semibold">{chain.name}</h3>
                          <p className="text-sm text-muted-foreground">{chain.network}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedChains.includes(chain.name)}
                        onChange={() => toggleChain(chain.name)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="space-y-1">
                      {chain.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3 w-3 text-green-500" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Badge variant="outline" className="text-xs">
                        Gas: {chain.gasToken}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">💡 Recommendation</h4>
                    <p className="text-blue-800 text-sm mt-1">
                      Start with <strong>Ethereum</strong> (security) and <strong>Polygon</strong> (low fees). You can
                      add Base and Arbitrum later as your platform grows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Selected: <strong>{selectedChains.length}</strong> chains
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔧 Create Alchemy Apps</CardTitle>
              <CardDescription>Create a separate app for each selected blockchain network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">⚠️ Important</h4>
                    <p className="text-yellow-800 text-sm mt-1">
                      Create a <strong>separate app</strong> for each chain. Don't try to use one app for multiple
                      networks.
                    </p>
                  </div>
                </div>
              </div>

              {selectedChains.map((chainName, index) => {
                const chain = SUPPORTED_CHAINS.find((c) => c.name === chainName)!
                return (
                  <div key={chainName} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{chain.logo}</span>
                        <div>
                          <h3 className="font-semibold">{chain.name}</h3>
                          <p className="text-sm text-muted-foreground">App #{index + 1}</p>
                        </div>
                      </div>
                      <Badge variant={createdApps[chainName] ? "default" : "outline"}>
                        {createdApps[chainName] ? "Created" : "Pending"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted p-3 rounded text-sm">
                        <p>
                          <strong>App Name:</strong> Prime Phygital - {chain.name}
                        </p>
                        <p>
                          <strong>Network:</strong> {chain.network}
                        </p>
                        <p>
                          <strong>Environment:</strong> Mainnet
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1 bg-transparent">
                          <a href="https://dashboard.alchemy.com/apps" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Create {chain.name} App
                          </a>
                        </Button>
                        <Button
                          variant={createdApps[chainName] ? "default" : "outline"}
                          onClick={() => markAppCreated(chainName)}
                        >
                          {createdApps[chainName] ? <Check className="h-4 w-4" /> : "Mark Done"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">📋 For Each App:</h4>
                <ol className="text-green-800 text-sm space-y-1">
                  <li>1. Click "Create App" in Alchemy dashboard</li>
                  <li>2. Enter app name: "Prime Phygital - [Chain Name]"</li>
                  <li>3. Select the correct network (e.g., "Ethereum Mainnet")</li>
                  <li>4. Click "Create app"</li>
                  <li>5. Copy the HTTPS URL from the app dashboard</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Environment Configuration</CardTitle>
              <CardDescription>Generate environment variables for your selected chains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Selected Chains:</h4>
                  <div className="space-y-2">
                    {selectedChains.map((chainName) => {
                      const chain = SUPPORTED_CHAINS.find((c) => c.name === chainName)!
                      return (
                        <div key={chainName} className="flex items-center gap-2 p-2 border rounded">
                          <span>{chain.logo}</span>
                          <span className="font-medium">{chain.name}</span>
                          <Badge variant="outline" className="ml-auto">
                            {chain.gasToken}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Configuration:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Primary Chain:</span>
                      <Badge>{selectedChains[0]}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Chains:</span>
                      <Badge variant="outline">{selectedChains.length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Apps Needed:</span>
                      <Badge variant="outline">{selectedChains.length}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={generateEnvVars} className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Generate Environment Variables
              </Button>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Sample Configuration:</h4>
                <pre className="text-xs overflow-x-auto">
                  {`# Replace YOUR_API_KEY with actual keys from each app
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Contract addresses (deploy or use placeholders)
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...

# Primary network
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=ethereum

# Server-side API key (use any one of your API keys)
BLOCKCHAIN_API_KEY=YOUR_API_KEY`}
                </pre>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">🎯 Pro Tips</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Use the same API key for BLOCKCHAIN_API_KEY (server-side)</li>
                  <li>• Each RPC URL should be from a different Alchemy app</li>
                  <li>• Start with testnets, then switch to mainnet</li>
                  <li>• Monitor usage in Alchemy dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
