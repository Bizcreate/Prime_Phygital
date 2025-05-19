import { ethers } from "ethers"
import { NextResponse } from "next/server"

// ABI for your smart contract
const CONTRACT_ABI = [
  // This should be replaced with your actual contract ABI
  "function registerProduct(string productId, string metadata) public returns (bool)",
  "function verifyProduct(string productId) public view returns (bool, string)",
  "function transferOwnership(string productId, address newOwner) public returns (bool)",
  "function getProductHistory(string productId) public view returns (string[])",
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const network = searchParams.get("network")
    const contractAddress = searchParams.get("contractAddress")

    if (!productId || !network || !contractAddress) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get the API key from server-side environment variables (no NEXT_PUBLIC_ prefix)
    const apiKey = process.env.BLOCKCHAIN_API_KEY

    if (!apiKey) {
      console.warn("No blockchain API key provided in environment")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Construct the RPC URL with the API key
    let rpcUrl = ""
    switch (network) {
      case "ethereum":
        rpcUrl = `https://eth-goerli.g.alchemy.com/v2/${apiKey}`
        break
      case "polygon":
        rpcUrl = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`
        break
      case "base":
        rpcUrl = `https://base-goerli.g.alchemy.com/v2/${apiKey}`
        break
      case "solana":
        // Solana uses a different format
        rpcUrl = `https://api.devnet.solana.com`
        break
      default:
        rpcUrl = `https://eth-goerli.g.alchemy.com/v2/${apiKey}`
    }

    // Initialize provider and contract
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider)

    // Call the smart contract
    const history = await contract.getProductHistory(productId)

    return NextResponse.json({ history })
  } catch (error) {
    console.error("Error getting product history from blockchain:", error)
    return NextResponse.json({ history: [] })
  }
}
