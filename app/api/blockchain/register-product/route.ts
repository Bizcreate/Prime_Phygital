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

export async function POST(request: Request) {
  try {
    const { product, privateKey, network, contractAddress } = await request.json()

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
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet)

    // Convert product data to JSON string for metadata
    const metadata = JSON.stringify({
      name: product.name,
      brand: product.brand,
      serialNumber: product.serialNumber,
      manufactureDate: product.manufactureDate,
      additionalData: product.metadata,
    })

    // Call the smart contract
    const tx = await contract.registerProduct(product.id, metadata)
    const receipt = await tx.wait()

    // Return the transaction hash as confirmation
    return NextResponse.json({ transactionHash: receipt.transactionHash })
  } catch (error) {
    console.error("Error registering product on blockchain:", error)
    return NextResponse.json({ error: "Failed to register product" }, { status: 500 })
  }
}
