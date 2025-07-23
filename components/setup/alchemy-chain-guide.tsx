"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AlchemyChainGuide() {
  const { toast } = useToast()
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    toast({
      title: "Copied!",
      description: `${item} copied to clipboard`,
    })
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const alchemyChains = [
    {
      name: "Ethereum",
      mainnet: "https://eth-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://eth-sepolia.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: true,
    },
    {
      name: "Polygon",
      mainnet: "https://polygon-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://polygon-amoy.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: true,
    },
    {
      name: "Base",
      mainnet: "https://base-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://base-sepolia.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: true,
    },
    {
      name: "Arbitrum",
      mainnet: "https://arb-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://arb-sepolia.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: true,
    },
    {
      name: "Optimism",
      mainnet: "https://opt-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://opt-sepolia.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: true,
    },
    {
      name: "Abstract",
      mainnet: "https://abstract-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://abstract-testnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: false,
      note: "Check Alchemy dashboard - may not be available yet",
    },
    {
      name: "ApeCoin",
      mainnet: "https://apechain-mainnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      testnet: "https://apechain-testnet.g.alchemy.com/v2/CDRsul7gRaez_bOQIf6QV",
      available: false,
      note: "Check Alchemy dashboard - may not be available yet",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            What Comes From Where?
          </CardTitle>
          <CardDescription>Understanding the difference between Alchemy URLs and Contract Addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                From Alchemy (RPC URLs)
              </h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• NEXT_PUBLIC_ETHEREUM_RPC_URL</li>
                <li>• NEXT_PUBLIC_POLYGON_RPC_URL</li>
                <li>• NEXT_PUBLIC_BASE_RPC_URL</li>
                <li>• NEXT_PUBLIC_ARBITRUM_RPC_URL</li>
                <li>• NEXT_PUBLIC_OPTIMISM_RPC_URL</li>
                <li>• NEXT_PUBLIC_ABSTRACT_RPC_URL*</li>
                <li>• NEXT_PUBLIC_APECHAIN_RPC_URL*</li>
              </ul>
              <p className="text-xs text-green-700 mt-2">*If available in your Alchemy app</p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                You Create (Contract Addresses)
              </h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS</li>
                <li>• NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS</li>
                <li>• NEXT_PUBLIC_BASE_CONTRACT_ADDRESS</li>
                <li>• NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS</li>
                <li>• NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS</li>
                <li>• NEXT_PUBLIC_ABSTRACT_CONTRACT_ADDRESS</li>
                <li>• NEXT_PUBLIC_APECHAIN_CONTRACT_ADDRESS</li>
              </ul>
              <p className="text-xs text-blue-700 mt-2">Deploy smart contracts to get these addresses</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rpc-urls" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rpc-urls">RPC URLs (From Alchemy)</TabsTrigger>
          <TabsTrigger value="contracts">Contract Addresses (You Deploy)</TabsTrigger>
        </TabsList>

        <TabsContent value="rpc-urls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔗 RPC URLs from Alchemy</CardTitle>
              <CardDescription>
                These come from your Alchemy dashboard. Go to your "Prime Phygital" app → Networks tab
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alchemyChains.map((chain) => (
                  <div key={chain.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{chain.name}</h4>
                      {chain.available ? (
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600">
                          Check Dashboard
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Mainnet RPC URL:</label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="flex-1 p-2 bg-gray-100 rounded text-xs break-all">{chain.mainnet}</code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(chain.mainnet, `${chain.name} Mainnet`)}
                          >
                            {copiedItem === `${chain.name} Mainnet` ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Testnet RPC URL:</label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="flex-1 p-2 bg-gray-100 rounded text-xs break-all">{chain.testnet}</code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(chain.testnet, `${chain.name} Testnet`)}
                          >
                            {copiedItem === `${chain.name} Testnet` ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {chain.note && (
                      <p className="text-sm text-orange-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {chain.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">📋 How to Check Available Chains in Alchemy:</h4>
                <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
                  <li>Go to your Alchemy dashboard</li>
                  <li>Click on your "Prime Phygital" app</li>
                  <li>Click the "Networks" tab</li>
                  <li>See which chains are enabled/available</li>
                  <li>Copy the RPC URLs for each enabled chain</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📝 Smart Contract Addresses</CardTitle>
              <CardDescription>You need to deploy smart contracts to each chain to get these addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">⚠️ For Now: Use Placeholder Addresses</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Until you deploy contracts, use these placeholder addresses to test the platform:
                  </p>
                  <code className="block p-2 bg-yellow-100 rounded text-sm">
                    0x1234567890123456789012345678901234567890
                  </code>
                </div>

                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Option 1: Use Placeholders (Recommended for Testing)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>All Contract Addresses:</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard("0x1234567890123456789012345678901234567890", "Placeholder Address")
                          }
                        >
                          {copiedItem === "Placeholder Address" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <code className="block p-2 bg-gray-100 rounded text-xs">
                        0x1234567890123456789012345678901234567890
                      </code>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Option 2: Deploy Real Contracts (For Production)</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>To deploy real smart contracts:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Write your smart contract (Solidity)</li>
                        <li>Use Hardhat, Foundry, or Remix to deploy</li>
                        <li>Deploy to each chain separately</li>
                        <li>Update environment variables with real addresses</li>
                      </ol>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Contract Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
