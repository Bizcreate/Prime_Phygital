import { JsonRpcProvider, ethers } from "ethers"

export type SupportedChain = "ethereum" | "polygon" | "base" | "arbitrum" | "optimism"

export interface ChainConfig {
  name: string
  chainId: number
  rpcUrl: string
  contractAddress?: string // Made optional
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
    contractAddress?: string // Made optional
    explorerUrl: string
  }
  logo: string
  color: string
  description: string
  available: boolean // Track if chain is available in Alchemy
}

export const CHAIN_CONFIGS: Record<SupportedChain, ChainConfig> = {
  ethereum: {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS || undefined,
    explorerUrl: "https://etherscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    logo: "⟠",
    color: "bg-blue-500",
    description: "The original smart contract platform",
    available: true,
    testnet: {
      name: "Sepolia",
      chainId: 11155111,
      rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_TESTNET_RPC_URL || "",
      contractAddress: process.env.NEXT_PUBLIC_ETHEREUM_TESTNET_CONTRACT_ADDRESS || undefined,
      explorerUrl: "https://sepolia.etherscan.io",
    },
  },
  polygon: {
    name: "Polygon",
    chainId: 137,
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS || undefined,
    explorerUrl: "https://polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    logo: "⬟",
    color: "bg-purple-500",
    description: "Low-cost, high-speed Ethereum scaling",
    available: true,
    testnet: {
      name: "Amoy",
      chainId: 80002,
      rpcUrl: process.env.NEXT_PUBLIC_POLYGON_TESTNET_RPC_URL || "",
      contractAddress: process.env.NEXT_PUBLIC_POLYGON_TESTNET_CONTRACT_ADDRESS || undefined,
      explorerUrl: "https://amoy.polygonscan.com",
    },
  },
  base: {
    name: "Base",
    chainId: 8453,
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS || undefined,
    explorerUrl: "https://basescan.org",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    logo: "🔵",
    color: "bg-blue-600",
    description: "Coinbase's L2 for everyone",
    available: true,
    testnet: {
      name: "Base Sepolia",
      chainId: 84532,
      rpcUrl: process.env.NEXT_PUBLIC_BASE_TESTNET_RPC_URL || "",
      contractAddress: process.env.NEXT_PUBLIC_BASE_TESTNET_CONTRACT_ADDRESS || undefined,
      explorerUrl: "https://sepolia.basescan.org",
    },
  },
  arbitrum: {
    name: "Arbitrum",
    chainId: 42161,
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS || undefined,
    explorerUrl: "https://arbiscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    logo: "🔷",
    color: "bg-cyan-500",
    description: "Optimistic rollup scaling solution",
    available: true,
  },
  optimism: {
    name: "Optimism",
    chainId: 10,
    rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || "",
    contractAddress: process.env.NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS || undefined,
    explorerUrl: "https://optimistic.etherscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    logo: "🔴",
    color: "bg-red-500",
    description: "Fast, stable, and scalable L2",
    available: true,
  },
}

/**
 * Basic configuration object for the blockchain service.
 * Extend this as your needs grow (e.g. add more chains, alchemy keys, etc.).
 */
export interface BlockchainServiceConfig {
  /**
   * RPC URL (e.g. Alchemy, Infura, or your own node endpoint)
   */
  rpcUrl: string

  /**
   * Private key used for signing transactions (server side ONLY).
   * DO NOT expose this in the browser - keep it on the server or in a Server Action.
   */
  privateKey?: string

  /**
   * Chain ID (e.g. 1 = Ethereum mainnet, 137 = Polygon, etc.)
   */
  chainId?: number
}

/**
 * A minimal set of methods we need in the app right now.
 * Feel free to extend with whatever your product flow requires.
 */
export interface BlockchainService {
  /**
   * Verify the connection by requesting the latest block number.
   */
  testConnection: () => Promise<number>

  /**
   * Registers a product on-chain (stub for now).
   * Replace contractAddress + abi with your actual NFT / ERC-721 contract.
   */
  registerProduct: (productId: string, owner: string) => Promise<ethers.TransactionResponse>

  /**
   * Reads product ownership (stub for now).
   */
  getOwnerOf: (productId: string) => Promise<string>
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

  getAvailableChains(): Array<{ id: SupportedChain; config: ChainConfig }> {
    return this.getAllChains().filter(({ config }) => config.available && config.rpcUrl)
  }

  hasContractDeployed(chain?: SupportedChain): boolean {
    const targetChain = chain || this.currentChain
    const config = CHAIN_CONFIGS[targetChain]
    const contractAddress = this.useTestnet && config.testnet ? config.testnet.contractAddress : config.contractAddress

    return !!contractAddress && contractAddress.length > 0
  }

  getExplorerUrl(txHash: string): string {
    const config = this.getCurrentConfig()
    return `${config.explorerUrl}/tx/${txHash}`
  }

  async getProvider(chain?: SupportedChain): Promise<JsonRpcProvider> {
    const targetChain = chain || this.currentChain
    const config = CHAIN_CONFIGS[targetChain]
    const rpcUrl = this.useTestnet && config.testnet ? config.testnet.rpcUrl : config.rpcUrl

    if (!rpcUrl) {
      throw new Error(`No RPC URL configured for ${config.name}`)
    }

    return new JsonRpcProvider(rpcUrl)
  }

  async getBlockNumber(chain?: SupportedChain): Promise<number> {
    const provider = await this.getProvider(chain)
    return await provider.getBlockNumber()
  }

  async getBalance(address: string, chain?: SupportedChain): Promise<string> {
    const provider = await this.getProvider(chain)
    const balance = await provider.getBalance(address)
    return balance.toString()
  }

  // Simulate contract deployment (for when you mint products)
  async deployContract(chain: SupportedChain, contractCode: string): Promise<string> {
    console.log(`Deploying contract to ${CHAIN_CONFIGS[chain].name}...`)

    // This would be replaced with actual deployment logic
    // For now, simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock contract address
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`
    console.log(`Contract deployed to ${CHAIN_CONFIGS[chain].name}: ${mockAddress}`)

    return mockAddress
  }
}

/**
 * Factory helper – returns a new MultiChainService instance.
 * Allows callers to create their own scoped service instead of
 * relying on the shared singleton.
 */
export function createBlockchainService(chain: SupportedChain = "ethereum", useTestnet = false): MultiChainService {
  return new MultiChainService(chain, useTestnet)
}

/**
 * Factory that returns a fully-initialised BlockchainService instance.
 * Exported as **createBlockchainServiceInstance** to satisfy the deployment check.
 */
export function createBlockchainServiceInstance(config: BlockchainServiceConfig): BlockchainService {
  if (!config.rpcUrl) throw new Error("rpcUrl is required")

  // Create an ethers.js provider and signer (signer only if private key is supplied)
  const provider = new ethers.JsonRpcProvider(config.rpcUrl)
  const signer = config.privateKey ? new ethers.Wallet(config.privateKey, provider) : undefined

  // ---------------------------------------------------------------------------
  // NOTE:
  // Replace the two placeholders below (contractAddress & abi) with your
  // actual smart-contract address and ABI for full functionality.
  // ---------------------------------------------------------------------------
  const contractAddress = "0x0000000000000000000000000000000000000000" // TODO: replace
  const abi: ethers.InterfaceAbi = [] // TODO: replace
  const contract = new ethers.Contract(contractAddress, abi, signer ?? provider)

  return {
    /**
     * Simply fetches the latest block number to verify the network connection.
     */
    async testConnection() {
      return provider.getBlockNumber()
    },

    /**
     * Registers a product on-chain (placeholder implementation).
     * Replace the call below with your contract's actual function, e.g. `mint`.
     */
    async registerProduct(productId, owner) {
      if (!signer) throw new Error("registerProduct requires a signer – provide a privateKey in config")

      // Example: assume your contract has a `registerProduct(string,uint256)` method
      return contract.registerProduct(owner, productId)
    },

    /**
     * Reads the owner of a product (placeholder implementation).
     * Replace with your contract's actual read function, e.g. `ownerOf`.
     */
    async getOwnerOf(productId) {
      // Example: `ownerOf(uint256 tokenId)`
      return contract.ownerOf(productId)
    },
  }
}

/**
 * For convenience, you can import the service like:
 *   import blockchainService from "@/services/blockchain-service"
 *
 * It will read environment variables automatically.  You can also build
 * your own config manually and call `createBlockchainServiceInstance` directly.
 */
const defaultConfig: BlockchainServiceConfig = {
  rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ?? "",
  chainId: 1,
  // Never expose privateKey in NEXT_PUBLIC_* variables – keep it server-side.
}
const blockchainService = createBlockchainServiceInstance(defaultConfig)

export default blockchainService
