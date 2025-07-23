"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ExternalLink, Zap, AlertCircle, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ChainConfig {
  name: string
  network: string
  color: string
  logo: string
  benefits: string[]
  gasToken: string
  alchemyName: string
}

const RECOMMENDED_CHAINS: ChainConfig[] = [
  {
    name: "Ethereum",
    network: "Ethereum Mainnet",
    color: "bg-blue-500",
    logo: "⟠",
    benefits: ["Most secure", "Largest ecosystem", "Best for high-value items"],
    gasToken: "ETH",
    alchemyName: "ethereum",
  },
  {
    name: "Polygon",
    network: "Polygon PoS",
    color: "bg-purple-500",
    logo: "⬟",
    benefits: ["Low gas fees", "Fast transactions", "Ethereum compatible"],
    gasToken: "MATIC",
    alchemyName: "polygon-pos",
  },
  {
    name: "Base",
    network: "Base Mainnet",
    color: "bg-blue-600",
    logo: "🔵",
    benefits: ["Coinbase backed", "Low fees", "Growing ecosystem"],
    gasToken: "ETH",
    alchemyName: "base-mainnet",
  },
  {
    name: "Arbitrum",
    network: "Arbitrum One",
    color: "bg-cyan-500",
    logo: "🔷",
    benefits: ["Layer 2 scaling", "Lower fees", "Ethereum security"],
    gasToken: "ETH",
    alchemyName: "arbitrum-one",
  },
  {
    name: "Optimism",
    network: "OP Mainnet",
    color: "bg-red-500",
    logo: "🔴",
    benefits: ["Optimistic rollup", "Fast finality", "EVM compatible"],
    gasToken: "ETH",
    alchemyName: "opt-mainnet",
  },
]

export function AlchemySingleAppGuide() {
  const { toast } = useToast()
  const [selectedChains, setSelectedChains] = useState<string[]>(["Ethereum", "Polygon", "Base"])
  const [copiedText, setCopiedText] = useState<string | null>(null)

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

  const generateEnvVars = () => {
    const envVars = selectedChains
      .map((chain) => {
        const chainConfig = RECOMMENDED_CHAINS.find((c) => c.name === chain)!
        const chainUpper = chain.toUpperCase()
        const alchemyEndpoint = chainConfig.alchemyName
        return `NEXT_PUBLIC_${chainUpper}_RPC_URL=https://${alchemyEndpoint}.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_${chainUpper}_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890`
      })
      .join("\n")

    const fullEnv = `# Alchemy Multi-Chain Configuration (Single App)
${envVars}

# Primary blockchain network
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=${selectedChains[0].toLowerCase()}

# Single API key for all chains
BLOCKCHAIN_API_KEY=YOUR_ALCHEMY_API_KEY

# NFC and other settings
NFC_VERIFICATION_KEY=your-32-byte-hex-key
NEXT_PUBLIC_VERIFICATION_URL=https://your-app.vercel.app/verify`

    copyToClipboard(fullEnv, "Complete environment configuration")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-blue-600" />
          Alchemy Single App Setup
        </h2>
        <p className="text-muted-foreground">Create one app with multiple chains - much easier!</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-start gap-3">
          <Star className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900">✨ New Alchemy Feature!</h4>
            <p className="text-green-800 text-sm mt-1">
              You can now select <strong>multiple chains in one app</strong>! This is much simpler than creating
              separate apps for each chain.
            </p>
          </div>
        </div>
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
              <CardTitle>🌐 Recommended Chains for Prime Phygital</CardTitle>
              <CardDescription>Select the chains you want to support. You can add more later.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {RECOMMENDED_CHAINS.map((chain) => (
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
                      Start with <strong>Ethereum</strong> (security), <strong>Polygon</strong> (low fees), and{" "}
                      <strong>Base</strong> (growing ecosystem). This covers most use cases.
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
              <CardTitle>🚀 Create Your Alchemy App</CardTitle>
              <CardDescription>One app with all your selected chains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">📝 App Details</h4>
                    <div className="text-yellow-800 text-sm mt-1 space-y-1">
                      <p>
                        <strong>App Name:</strong> Prime Phygital Platform
                      </p>
                      <p>
                        <strong>Chains:</strong> {selectedChains.join(", ")}
                      </p>
                      <p>
                        <strong>Environment:</strong> Mainnet (for production)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">📋 Step-by-Step Instructions:</h4>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Go to Alchemy Dashboard</p>
                      <p className="text-muted-foreground">Click the button below to open Alchemy</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Click "Create new app"</p>
                      <p className="text-muted-foreground">Start the app creation process</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Enter App Name</p>
                      <p className="text-muted-foreground">"Prime Phygital Platform" or similar</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      4
                    </span>
                    <div>
                      <p className="font-medium">Select Multiple Chains</p>
                      <p className="text-muted-foreground">Choose: {selectedChains.join(", ")}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      5
                    </span>
                    <div>
                      <p className="font-medium">Activate Services</p>
                      <p className="text-muted-foreground">Enable any additional services you need</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      6
                    </span>
                    <div>
                      <p className="font-medium">Copy API Key</p>
                      <p className="text-muted-foreground">Get the API key from your app dashboard</p>
                    </div>
                  </li>
                </ol>
              </div>

              <Button asChild className="w-full">
                <a href="https://dashboard.alchemy.com/apps" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Create Alchemy App (Free)
                </a>
              </Button>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">🎉 Benefits of Single App</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• One API key for all chains</li>
                  <li>• Unified dashboard and analytics</li>
                  <li>• Easier to manage and monitor</li>
                  <li>• 300M requests shared across all chains</li>
                </ul>
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
                      const chain = RECOMMENDED_CHAINS.find((c) => c.name === chainName)!
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
                      <Badge variant="outline">1</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={generateEnvVars} className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Generate Complete Environment Variables
              </Button>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Sample Configuration:</h4>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                  {`# Replace YOUR_API_KEY with your actual Alchemy API key
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-pos.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Contract addresses (deploy or use placeholders for testing)
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890

# Primary network (users can switch in UI)
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=ethereum

# Single API key for server-side operations
BLOCKCHAIN_API_KEY=YOUR_API_KEY

# NFC verification key (generate with setup tool)
NFC_VERIFICATION_KEY=your-32-byte-hex-key

# Your app URL
NEXT_PUBLIC_VERIFICATION_URL=https://your-app.vercel.app/verify`}
                </pre>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">🎯 Pro Tips</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Same API key works for all selected chains</li>
                  <li>• Each chain has its own RPC endpoint format</li>
                  <li>• Start with testnets, then switch to mainnet</li>
                  <li>• Monitor usage across all chains in one dashboard</li>
                  <li>• 300M requests shared across all chains</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
