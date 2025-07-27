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
}

export const CHAIN_CONFIGS: Record<string, ChainConfig> = {
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

  async sendTransaction(transaction: any): Promise<string> {
    const tx = await this.provider.sendTransaction(transaction)
    return tx.hash
  }

  getChainConfig(): ChainConfig {
    return this.chainConfig
  }
}

export async function testBlockchainConnection(chainName: string): Promise<boolean> {
  try {
    const service = new BlockchainService(chainName)
    await service.getBlockNumber()
    return true
  } catch (error) {
    console.error(`Failed to connect to ${chainName}:`, error)
    return false
  }
}

export function createBlockchainService(chainName: string): BlockchainService {
  return new BlockchainService(chainName)
}
