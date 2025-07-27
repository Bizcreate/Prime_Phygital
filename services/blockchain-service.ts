import { ethers } from "ethers"

export interface ChainConfig {
  id: number
  name: string
  rpcUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorer: string
}

export const CHAIN_CONFIGS: Record<string, ChainConfig> = {
  ethereum: {
    id: 1,
    name: "Ethereum Mainnet",
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/demo",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://etherscan.io",
  },
  polygon: {
    id: 137,
    name: "Polygon Mainnet",
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-mainnet.g.alchemy.com/v2/demo",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorer: "https://polygonscan.com",
  },
  base: {
    id: 8453,
    name: "Base",
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://base-mainnet.g.alchemy.com/v2/demo",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://basescan.org",
  },
  abstract: {
    id: 11124,
    name: "Abstract Testnet",
    rpcUrl: process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL || "https://api.testnet.abs.xyz",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://explorer.testnet.abs.xyz",
  },
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider
  private chainConfig: ChainConfig

  constructor(chainName: string) {
    this.chainConfig = CHAIN_CONFIGS[chainName]
    if (!this.chainConfig) {
      throw new Error(`Unsupported chain: ${chainName}`)
    }
    this.provider = new ethers.JsonRpcProvider(this.chainConfig.rpcUrl)
  }

  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber()
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address)
    return ethers.formatEther(balance)
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getBlockNumber()
      return true
    } catch (error) {
      console.error("Blockchain connection test failed:", error)
      return false
    }
  }

  getChainConfig(): ChainConfig {
    return this.chainConfig
  }
}

export async function testBlockchainConnection(chainName: string): Promise<{
  success: boolean
  blockNumber?: number
  error?: string
}> {
  try {
    const service = new BlockchainService(chainName)
    const blockNumber = await service.getBlockNumber()
    return { success: true, blockNumber }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export function createBlockchainService(chainName: string): BlockchainService {
  return new BlockchainService(chainName)
}

export default BlockchainService
