"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, ExternalLink, Rocket, FileText } from "lucide-react"

export function ContractDeployerGuide() {
  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PrimePhygitalRegistry {
    struct Product {
        string productId;
        string metadata;
        address owner;
        uint256 timestamp;
        bool exists;
    }
    
    mapping(string => Product) public products;
    mapping(address => string[]) public ownerProducts;
    
    event ProductRegistered(string indexed productId, address indexed owner);
    event ProductTransferred(string indexed productId, address indexed from, address indexed to);
    
    function registerProduct(string memory productId, string memory metadata) public {
        require(!products[productId].exists, "Product already registered");
        
        products[productId] = Product({
            productId: productId,
            metadata: metadata,
            owner: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });
        
        ownerProducts[msg.sender].push(productId);
        emit ProductRegistered(productId, msg.sender);
    }
    
    function verifyProduct(string memory productId) public view returns (bool, string memory, address) {
        Product memory product = products[productId];
        return (product.exists, product.metadata, product.owner);
    }
    
    function transferOwnership(string memory productId, address newOwner) public {
        require(products[productId].exists, "Product does not exist");
        require(products[productId].owner == msg.sender, "Not the owner");
        
        address oldOwner = products[productId].owner;
        products[productId].owner = newOwner;
        ownerProducts[newOwner].push(productId);
        
        emit ProductTransferred(productId, oldOwner, newOwner);
    }
}`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Smart Contract Deployment Guide
          </CardTitle>
          <CardDescription>Deploy your Prime Phygital contracts to each blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="contract" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contract">Contract Code</TabsTrigger>
              <TabsTrigger value="deploy">Deploy Steps</TabsTrigger>
              <TabsTrigger value="tools">Tools & Services</TabsTrigger>
            </TabsList>

            <TabsContent value="contract" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Prime Phygital Registry Contract</h4>
                  <Badge>Solidity ^0.8.19</Badge>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{contractCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() => navigator.clipboard.writeText(contractCode)}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deploy" className="space-y-4">
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">1</span>
                      Choose Deployment Method
                    </h4>
                    <div className="grid gap-2 md:grid-cols-3">
                      <Button variant="outline" className="justify-start bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Remix IDE (Easiest)
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        Hardhat (Advanced)
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Code className="h-4 w-4 mr-2" />
                        Foundry (Pro)
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">2</span>
                      Deploy to Each Chain
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>Deploy the same contract to each chain you want to support:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                        <li>Ethereum Mainnet (expensive gas)</li>
                        <li>Polygon (cheap gas, recommended)</li>
                        <li>Base (Coinbase L2)</li>
                        <li>Arbitrum (fast L2)</li>
                        <li>Optimism (stable L2)</li>
                        <li>Abstract (if available)</li>
                        <li>ApeCoin (if available)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">3</span>
                      Update Environment Variables
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>After deployment, update your .env.local with the contract addresses:</p>
                      <code className="block p-2 bg-gray-100 rounded text-xs">
                        NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0xYourDeployedAddress
                        <br />
                        NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0xYourDeployedAddress
                        <br /># ... etc for each chain
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🚀 Quick Deploy (Recommended)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Remix IDE</h5>
                      <p className="text-sm text-gray-600">Browser-based, no setup required</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Remix
                      </Button>
                    </div>
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">thirdweb Deploy</h5>
                      <p className="text-sm text-gray-600">One-click multi-chain deployment</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Try thirdweb
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">⚡ Advanced Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Hardhat</h5>
                      <p className="text-sm text-gray-600">Professional development environment</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Hardhat Docs
                      </Button>
                    </div>
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Foundry</h5>
                      <p className="text-sm text-gray-600">Fast, modern toolkit</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Foundry Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
