export type SupportedChain = "ethereum" | "polygon" | "base" | "arbitrum" | "solana"

export interface ChainConfig {
  name: string
  chainId: number
  rpcUrl: string
  contractAddress: string
  explorerUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  testnet?: {
    name: string
    chainId: number
    rpcUrl: string
    contractAddress: string
    explorerUrl: string
  }
}

export const CHAIN_CONFIGS: Record<SupportedChain, ChainConfig> = {
  ethereum: {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS || "",
    explorerUrl: "https://etherscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    testnet: {
      name: "Goerli",
      chainId: 5,
      rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_TESTNET_RPC_URL || "",
      contractAddress: process.env.NEXT_PUBLIC_ETHEREUM_TESTNET_CONTRACT_ADDRESS || "",
      explorerUrl: "https://goerli.etherscan.io",
    },
  },
  polygon: {
    name: "Polygon",
    chainId: 137,
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS || "",
    explorerUrl: "https://polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    testnet: {
      name: "Mumbai",
      chainId: 80001,
      rpcUrl: process.env.NEXT_PUBLIC_POLYGON_TESTNET_RPC_URL || "",
      contractAddress: process.env.NEXT_PUBLIC_POLYGON_TESTNET_CONTRACT_ADDRESS || "",
      explorerUrl: "https://mumbai.polygonscan.com",
    },
  },
  base: {
    name: "Base",
    chainId: 8453,
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS || "",
    explorerUrl: "https://basescan.org",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    testnet: {
      name: "Base Goerli",
      chainId: 84531,
      rpcUrl: process.env.NEXT_PUBLIC_BASE_TESTNET_RPC_URL || "",
      contractAddress: process.env.NEXT_PUBLIC_BASE_TESTNET_CONTRACT_ADDRESS || "",
      explorerUrl: "https://goerli.basescan.org",
    },
  },
  arbitrum: {
    name: "Arbitrum",
    chainId: 42161,
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS || "",
    explorerUrl: "https://arbiscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  solana: {
    name: "Solana",
    chainId: 101, // Mainnet
    rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
    contractAddress: process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID || "",
    explorerUrl: "https://explorer.solana.com",
    nativeCurrency: { name: "SOL", symbol: "SOL", decimals: 9 },
    testnet: {
      name: "Devnet",
      chainId: 103,
      rpcUrl: "https://api.devnet.solana.com",
      contractAddress: process.env.NEXT_PUBLIC_SOLANA_TESTNET_PROGRAM_ID || "",
      explorerUrl: "https://explorer.solana.com/?cluster=devnet",
    },
  },
}

export class MultiChainService {
  private currentChain: SupportedChain
  private useTestnet: boolean

  constructor(chain: SupportedChain = "ethereum", useTestnet = false) {
    this.currentChain = chain
    this.useTestnet = useTestnet
  }

  getCurrentConfig(): ChainConfig {
    const config = CHAIN_CONFIGS[this.currentChain]
    return this.useTestnet && config.testnet
      ? {
          ...config,
          ...config.testnet,
          testnet: config.testnet,
        }
      : config
  }

  switchChain(chain: SupportedChain) {
    this.currentChain = chain
  }

  toggleTestnet() {
    this.useTestnet = !this.useTestnet
  }

  getAllChains(): Array<{ id: SupportedChain; config: ChainConfig }> {
    return Object.entries(CHAIN_CONFIGS).map(([id, config]) => ({
      id: id as SupportedChain,
      config,
    }))
  }

  getExplorerUrl(txHash: string): string {
    const config = this.getCurrentConfig()
    return `${config.explorerUrl}/tx/${txHash}`
  }
}

// Export singleton instance
export const multiChainService = new MultiChainService()
