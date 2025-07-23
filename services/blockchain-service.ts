import { JsonRpcProvider, type Provider } from "ethers"
import { Wallet } from "ethers"

export type SupportedChain = "ethereum" | "polygon" | "base" | "arbitrum" | "optimism"

export interface ChainConfig {
  name: string
  rpcUrl: string
  /** Optional private key – omit for read-only */
  privateKey?: string
}

export interface BlockchainService {
  /**
   * Returns an ethers Provider for the requested chain.
   * Throws if the chain is unknown.
   */
  getProvider(chain: string): Provider

  /**
   * Returns a Wallet connected to its chain’s provider.
   * Throws if the chain has no `privateKey`.
   */
  getSigner(chain: string): Wallet
}

export const CHAIN_CONFIGS: ChainConfig[] = [
  {
    name: "ethereum",
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL as string,
    privateKey: process.env.ETH_PRIVATE_KEY, // optional
  },
  {
    name: "polygon",
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string,
  },
  {
    name: "base",
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL as string,
  },
  {
    name: "arbitrum",
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL as string,
  },
  {
    name: "optimism",
    rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL as string,
  },
]

export function createBlockchainService(chains: ChainConfig[]): BlockchainService {
  const providers = new Map<string, Provider>()
  const signers = new Map<string, Wallet>()

  for (const cfg of chains) {
    const provider = new JsonRpcProvider(cfg.rpcUrl)
    providers.set(cfg.name, provider)

    if (cfg.privateKey) {
      const wallet = new Wallet(cfg.privateKey, provider)
      signers.set(cfg.name, wallet)
    }
  }

  function assert(condition: unknown, msg: string): asserts condition {
    if (!condition) throw new Error(msg)
  }

  return {
    getProvider(chain) {
      const p = providers.get(chain)
      assert(p, `Unknown chain "${chain}"`)
      return p
    },
    getSigner(chain) {
      const s = signers.get(chain)
      assert(s, `Chain "${chain}" has no signer / privateKey configured`)
      return s
    },
  }
}

/* Default export: configure from env on the server side */
const defaultChains: ChainConfig[] = [
  {
    name: "ethereum",
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL as string,
    privateKey: process.env.ETH_PRIVATE_KEY, // optional
  },
  {
    name: "polygon",
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string,
  },
  // add more chains as needed
]

const blockchainService = createBlockchainService(
  // Filter out chains that don’t have an RPC URL defined (easier local dev)
  defaultChains.filter((c) => !!c.rpcUrl),
)

export default blockchainService
