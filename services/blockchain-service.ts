import { ethers } from "ethers"

// ABI for your smart contract
const CONTRACT_ABI = [
  // This should be replaced with your actual contract ABI
  "function registerProduct(string productId, string metadata) public returns (bool)",
  "function verifyProduct(string productId) public view returns (bool, string)",
  "function transferOwnership(string productId, address newOwner) public returns (bool)",
  "function getProductHistory(string productId) public view returns (string[])",
]

// Interface for product data
export interface ProductData {
  id: string
  name: string
  brand: string
  serialNumber: string
  manufactureDate: string
  metadata: string
}

// Supported blockchain networks
export type BlockchainNetwork = "ethereum" | "polygon" | "base" | "solana"

// Configuration for blockchain service
export interface BlockchainConfig {
  network: BlockchainNetwork
  rpcUrl: string
  contractAddress: string
}

export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider | null = null
  private contract: ethers.Contract | null = null
  private network: BlockchainNetwork
  private isInitialized = false

  constructor(private config: BlockchainConfig) {
    this.network = config.network
  }

  // Initialize the blockchain connection
  async initialize(): Promise<boolean> {
    try {
      if (this.isEthereumCompatible()) {
        this.provider = new ethers.providers.JsonRpcProvider(this.config.rpcUrl)
        this.contract = new ethers.Contract(this.config.contractAddress, CONTRACT_ABI, this.provider)
      } else if (this.network === "solana") {
        // Initialize Solana connection
        // This would use @solana/web3.js
        console.log("Solana initialization would happen here")
      }

      this.isInitialized = true
      return true
    } catch (error) {
      console.error("Failed to initialize blockchain service:", error)
      return false
    }
  }

  // Check if the service is initialized
  isReady(): boolean {
    return this.isInitialized
  }

  // Register a new product on the blockchain - client side method
  async registerProduct(product: ProductData, privateKey: string): Promise<string> {
    try {
      // Call the server API instead of using the API key directly
      const response = await fetch("/api/blockchain/register-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          privateKey,
          network: this.network,
          contractAddress: this.config.contractAddress,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.transactionHash
    } catch (error) {
      console.error("Error registering product on blockchain:", error)
      throw error
    }
  }

  // Verify a product on the blockchain - client side method
  async verifyProduct(productId: string): Promise<{ isVerified: boolean; metadata: string }> {
    try {
      // Call the server API instead of using the API key directly
      const response = await fetch(
        `/api/blockchain/verify-product?productId=${encodeURIComponent(productId)}&network=${encodeURIComponent(this.network)}&contractAddress=${encodeURIComponent(this.config.contractAddress)}`,
        {
          method: "GET",
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error verifying product on blockchain:", error)
      return { isVerified: false, metadata: "" }
    }
  }

  // Transfer ownership of a product - client side method
  async transferOwnership(productId: string, newOwnerAddress: string, privateKey: string): Promise<string> {
    try {
      // Call the server API instead of using the API key directly
      const response = await fetch("/api/blockchain/transfer-ownership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          newOwnerAddress,
          privateKey,
          network: this.network,
          contractAddress: this.config.contractAddress,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.transactionHash
    } catch (error) {
      console.error("Error transferring ownership on blockchain:", error)
      throw error
    }
  }

  // Get product history from the blockchain - client side method
  async getProductHistory(productId: string): Promise<string[]> {
    try {
      // Call the server API instead of using the API key directly
      const response = await fetch(
        `/api/blockchain/product-history?productId=${encodeURIComponent(productId)}&network=${encodeURIComponent(this.network)}&contractAddress=${encodeURIComponent(this.config.contractAddress)}`,
        {
          method: "GET",
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.history
    } catch (error) {
      console.error("Error getting product history from blockchain:", error)
      return []
    }
  }

  // Helper method to check if the network is Ethereum-compatible
  private isEthereumCompatible(): boolean {
    return ["ethereum", "polygon", "base"].includes(this.network)
  }

  // Get a blockchain explorer URL for a transaction
  getExplorerUrl(txHash: string): string {
    switch (this.network) {
      case "ethereum":
        return `https://goerli.etherscan.io/tx/${txHash}`
      case "polygon":
        return `https://mumbai.polygonscan.com/tx/${txHash}`
      case "base":
        return `https://goerli.basescan.org/tx/${txHash}`
      case "solana":
        return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`
      default:
        return `https://etherscan.io/tx/${txHash}`
    }
  }
}

// Create and export a default instance with environment variables
export const createBlockchainService = () => {
  const network = (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK as BlockchainNetwork) || "ethereum"
  const rpcUrl = process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL || ""
  const contractAddress = process.env.NEXT_PUBLIC_BLOCKCHAIN_CONTRACT_ADDRESS || ""

  return new BlockchainService({
    network,
    rpcUrl,
    contractAddress,
  })
}
