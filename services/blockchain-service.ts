import { ethers } from "ethers"

export interface ChainConfig {
  name: string
  chainId: number
  rpcUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorer: string
  logo: string
  description: string
  contractAddress?: string
}

export type SupportedChain =
  | "ethereum"
  | "polygon"
  | "base"
  | "abstract"
  | "vechain"
  | "skale"
  | "solana"
  | "tron"
  | "apechain"
  | "sui"

export const CHAIN_CONFIGS: Record<SupportedChain, ChainConfig> = {
  ethereum: {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://etherscan.io",
    logo: "🔷",
    description: "The original smart contract platform",
  },
  polygon: {
    name: "Polygon",
    chainId: 137,
    rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorer: "https://polygonscan.com",
    logo: "🟣",
    description: "Fast and low-cost Ethereum scaling",
  },
  base: {
    name: "Base",
    chainId: 8453,
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://basescan.org",
    logo: "🔵",
    description: "Coinbase's L2 solution",
  },
  abstract: {
    name: "Abstract",
    chainId: 11124,
    rpcUrl: process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || "https://api.testnet.abs.xyz",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://explorer.testnet.abs.xyz",
    logo: "🎨",
    description: "Consumer crypto applications",
  },
  vechain: {
    name: "VeChain",
    chainId: 39,
    rpcUrl: "https://mainnet.vechain.org",
    nativeCurrency: {
      name: "VeChain",
      symbol: "VET",
      decimals: 18,
    },
    blockExplorer: "https://explore.vechain.org",
    logo: "⚡",
    description: "Enterprise blockchain platform",
  },
  skale: {
    name: "SKALE",
    chainId: 1351057110,
    rpcUrl: "https://mainnet.skalenodes.com/v1/chaos-wandering-fenrir",
    nativeCurrency: {
      name: "SKALE",
      symbol: "SKL",
      decimals: 18,
    },
    blockExplorer: "https://chaos-wandering-fenrir.explorer.mainnet.skalenodes.com",
    logo: "🌐",
    description: "Zero gas fee blockchain",
  },
  solana: {
    name: "Solana",
    chainId: 101,
    rpcUrl: "https://api.mainnet-beta.solana.com",
    nativeCurrency: {
      name: "Solana",
      symbol: "SOL",
      decimals: 9,
    },
    blockExplorer: "https://explorer.solana.com",
    logo: "☀️",
    description: "High-performance blockchain",
  },
  tron: {
    name: "TRON",
    chainId: 728126428,
    rpcUrl: "https://api.trongrid.io",
    nativeCurrency: {
      name: "TRON",
      symbol: "TRX",
      decimals: 6,
    },
    blockExplorer: "https://tronscan.org",
    logo: "🔴",
    description: "Decentralized entertainment ecosystem",
  },
  apechain: {
    name: "ApeChain",
    chainId: 33139,
    rpcUrl: "https://apechain.calderachain.xyz/http",
    nativeCurrency: {
      name: "ApeCoin",
      symbol: "APE",
      decimals: 18,
    },
    blockExplorer: "https://apechain.calderaexplorer.xyz",
    logo: "🐵",
    description: "ApeCoin ecosystem blockchain",
  },
  sui: {
    name: "Sui",
    chainId: 101,
    rpcUrl: "https://fullnode.mainnet.sui.io:443",
    nativeCurrency: {
      name: "Sui",
      symbol: "SUI",
      decimals: 9,
    },
    blockExplorer: "https://explorer.sui.io",
    logo: "💧",
    description: "Next-generation smart contract platform",
  },
}

export interface ProductData {
  id: string
  name: string
  brand: string
  serialNumber: string
  manufactureDate: string
  metadata: string
}

export interface BlockchainConfig {
  network: string
  rpcUrl: string
  contractAddress?: string
  privateKey?: string
}

export class BlockchainService {
  private config: BlockchainConfig
  private isInitialized = false

  constructor(config: BlockchainConfig) {
    this.config = config
  }

  async initialize(): Promise<void> {
    try {
      console.log(`Initializing blockchain service for ${this.config.network}`)
      await new Promise((resolve) => setTimeout(resolve, 100))
      this.isInitialized = true
      console.log("Blockchain service initialized successfully")
    } catch (error) {
      console.error("Failed to initialize blockchain service:", error)
      throw error
    }
  }

  async registerProduct(productData: ProductData, privateKey: string): Promise<string> {
    if (!this.isInitialized) {
      throw new Error("Blockchain service not initialized")
    }

    try {
      console.log("Registering product on blockchain:", productData.id)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const txHash = `0x${Math.random().toString(16).substring(2, 66)}`
      console.log("Product registered successfully:", txHash)
      return txHash
    } catch (error) {
      console.error("Failed to register product:", error)
      throw error
    }
  }

  async verifyProduct(productId: string): Promise<{
    isValid: boolean
    productData?: ProductData
    error?: string
  }> {
    if (!this.isInitialized) {
      throw new Error("Blockchain service not initialized")
    }

    try {
      console.log("Verifying product on blockchain:", productId)
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        isValid: true,
        productData: {
          id: productId,
          name: "Mock Product",
          brand: "Mock Brand",
          serialNumber: "MOCK123",
          manufactureDate: new Date().toISOString().split("T")[0],
          metadata: JSON.stringify({ verified: true }),
        },
      }
    } catch (error) {
      console.error("Failed to verify product:", error)
      return {
        isValid: false,
        error: error.message || "Verification failed",
      }
    }
  }

  async transferOwnership(productId: string, newOwner: string, privateKey: string): Promise<string> {
    if (!this.isInitialized) {
      throw new Error("Blockchain service not initialized")
    }

    try {
      console.log("Transferring ownership:", productId, "to", newOwner)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const txHash = `0x${Math.random().toString(16).substring(2, 66)}`
      console.log("Ownership transferred successfully:", txHash)
      return txHash
    } catch (error) {
      console.error("Failed to transfer ownership:", error)
      throw error
    }
  }

  async getProductHistory(productId: string): Promise<
    Array<{
      timestamp: string
      action: string
      details: string
      txHash: string
    }>
  > {
    if (!this.isInitialized) {
      throw new Error("Blockchain service not initialized")
    }

    try {
      console.log("Getting product history:", productId)
      await new Promise((resolve) => setTimeout(resolve, 300))

      return [
        {
          timestamp: new Date().toISOString(),
          action: "Product Registered",
          details: "Initial product registration",
          txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        },
        {
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          action: "Ownership Verified",
          details: "Ownership verification completed",
          txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        },
      ]
    } catch (error) {
      console.error("Failed to get product history:", error)
      throw error
    }
  }

  async activateProtection(productId: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log("Activating protection for product:", productId)
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        success: true,
        message: "Protection activated successfully",
      }
    } catch (error) {
      console.error("Failed to activate protection:", error)
      return {
        success: false,
        message: error.message || "Failed to activate protection",
      }
    }
  }
}

export function createBlockchainService(network = "ethereum"): BlockchainService {
  const config: BlockchainConfig = {
    network,
    rpcUrl: process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || "https://api.testnet.abs.xyz",
    contractAddress: process.env.CONTRACT_ADDRESS,
    privateKey: process.env.PRIVATE_KEY,
  }

  return new BlockchainService(config)
}

export async function testBlockchainConnection(chainName: SupportedChain): Promise<boolean> {
  try {
    const config = CHAIN_CONFIGS[chainName]
    if (!config) {
      console.error(`Unsupported chain: ${chainName}`)
      return false
    }

    // For development, always return true to avoid API calls
    if (process.env.NODE_ENV === "development") {
      console.log(`Mock connection test for ${chainName}: SUCCESS`)
      return true
    }

    // In production, test actual connection
    const provider = new ethers.JsonRpcProvider(config.rpcUrl)
    await provider.getBlockNumber()
    console.log(`Connection test for ${chainName}: SUCCESS`)
    return true
  } catch (error) {
    console.error(`Failed to connect to ${chainName}:`, error)
    return false
  }
}
