"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Zap, AlertTriangle } from "lucide-react"
import { testBlockchainConnection, CHAIN_CONFIGS, type SupportedChain } from "@/services/blockchain-service"
import { useToast } from "@/components/ui/use-toast"

interface ConnectionStatus {
  chain: SupportedChain
  status: "idle" | "testing" | "success" | "error"
  blockNumber?: number
  error?: string
}

export function ConnectionTester() {
  const { toast } = useToast()
  const [connections, setConnections] = useState<ConnectionStatus[]>(
    Object.keys(CHAIN_CONFIGS).map((chain) => ({
      chain: chain as SupportedChain,
      status: "idle" as const,
    })),
  )

  const testConnection = async (chain: SupportedChain) => {
    setConnections((prev) =>
      prev.map((conn) => (conn.chain === chain ? { ...conn, status: "testing" as const, error: undefined } : conn)),
    )

    try {
      const success = await testBlockchainConnection(chain)

      if (success) {
        setConnections((prev) =>
          prev.map((conn) => (conn.chain === chain ? { ...conn, status: "success" as const } : conn)),
        )
        toast({
          title: "Connection Successful!",
          description: `Successfully connected to ${CHAIN_CONFIGS[chain].name}`,
        })
      } else {
        throw new Error("Connection failed")
      }
    } catch (error) {
      setConnections((prev) =>
        prev.map((conn) =>
          conn.chain === chain
            ? {
                ...conn,
                status: "error" as const,
                error: error instanceof Error ? error.message : "Unknown error",
              }
            : conn,
        ),
      )
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${CHAIN_CONFIGS[chain].name}`,
        variant: "destructive",
      })
    }
  }

  const testAllConnections = async () => {
    for (const connection of connections) {
      await testConnection(connection.chain)
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  const getStatusIcon = (status: ConnectionStatus["status"]) => {
    switch (status) {
      case "testing":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusBadge = (status: ConnectionStatus["status"]) => {
    switch (status) {
      case "testing":
        return (
          <Badge variant="outline" className="text-blue-600">
            Testing...
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            Connected
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Not Tested</Badge>
    }
  }

  const successCount = connections.filter((c) => c.status === "success").length
  const totalCount = connections.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Blockchain Connection Tester
        </CardTitle>
        <CardDescription>
          Test your Alchemy RPC connections ({successCount}/{totalCount} chains connected)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Using API Key: <code className="bg-muted px-1 rounded">CDRsul7gRaez_bOQIf6QV</code>
          </p>
          <Button onClick={testAllConnections} variant="outline">
            Test All Chains
          </Button>
        </div>

        <div className="grid gap-3">
          {connections.map((connection) => {
            const config = CHAIN_CONFIGS[connection.chain]
            const hasContract = config.contractAddress && config.contractAddress.length > 0

            return (
              <div key={connection.chain} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(connection.status)}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{config.logo}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{config.name}</p>
                        {!hasContract && (
                          <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                            No Contract
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {config.nativeCurrency.symbol} • Chain ID: {config.chainId}
                      </p>
                      <p className="text-xs text-muted-foreground">{config.description}</p>
                      {connection.error && <p className="text-xs text-red-600 mt-1">{connection.error}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(connection.status)}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => testConnection(connection.chain)}
                    disabled={connection.status === "testing"}
                  >
                    {connection.status === "testing" ? "Testing..." : "Test"}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              What's Working Now
            </h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• ✅ Alchemy RPC connections</li>
              <li>• ✅ Blockchain data reading</li>
              <li>• ✅ Multi-chain support</li>
              <li>• ✅ NFC verification system</li>
              <li>• ✅ Product registration UI</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              What Happens When You Mint
            </h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• 🚀 Contracts auto-deploy to selected chains</li>
              <li>• 📝 Contract addresses auto-populate</li>
              <li>• 🔗 Full blockchain integration activates</li>
              <li>• 💎 NFTs mint to your chosen chains</li>
              <li>• 🎯 Platform becomes fully functional</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
