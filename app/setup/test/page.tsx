import { ConnectionTester } from "@/components/blockchain/connection-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle, AlertTriangle } from "lucide-react"

export default function TestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          Blockchain Connection Test
        </h1>
        <p className="text-muted-foreground">
          Test your Alchemy RPC connections - contracts will be deployed when you mint products
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Current Configuration Status
          </CardTitle>
          <CardDescription>What you have configured vs what gets deployed later</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3 text-green-700">✅ Ready Now (From Alchemy):</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Alchemy API Key:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    CDRsul7gRaez_bOQIf6QV
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>RPC Connections:</span>
                  <Badge className="bg-green-600">5 Chains</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Primary Network:</span>
                  <Badge>Ethereum</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Platform Status:</span>
                  <Badge className="bg-green-600">Functional</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-blue-700">🚀 Deployed When You Mint:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Smart Contracts:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Auto-Deploy
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Contract Addresses:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Auto-Populate
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>NFT Minting:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Activated
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Full Blockchain:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Enabled
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConnectionTester />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            How Contract Deployment Works
          </CardTitle>
          <CardDescription>What happens when you create your first product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">1</span>
                <h4 className="font-medium">Create Product</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the platform to create your first phygital product with NFC integration
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">2</span>
                <h4 className="font-medium">Auto-Deploy</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Platform automatically deploys smart contracts to your selected blockchain networks
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">3</span>
                <h4 className="font-medium">Full Activation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Contract addresses populate automatically and full blockchain features activate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
