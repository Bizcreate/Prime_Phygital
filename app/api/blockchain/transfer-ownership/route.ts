import { ethers } from "ethers"
import { NextResponse } from "next/server"

const CONTRACT_ABI = [
  "function registerProduct(string productId, string metadata) public returns (bool)",
  "function verifyProduct(string productId) public view returns (bool, string)",
  "function transferOwnership(string productId, address newOwner) public returns (bool)",
  "function getProductHistory(string productId) public view returns (string[])",
]

export async function POST(request: Request) {
  try {
    const { productId, newOwnerAddress, privateKey, network, contractAddress } = await request.json()

    const apiKey = process.env.BLOCKCHAIN_API_KEY

    if (!apiKey) {
      console.warn("No blockchain API key provided in environment")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

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
        rpcUrl = `https://api.devnet.solana.com`
        break
      default:
        rpcUrl = `https://eth-goerli.g.alchemy.com/v2/${apiKey}`
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet)

    const tx = await contract.transferOwnership(productId, newOwnerAddress)
    const receipt = await tx.wait()

    return NextResponse.json({ transactionHash: receipt.transactionHash })
  } catch (error) {
    console.error("Error transferring ownership on blockchain:", error)
    return NextResponse.json({ error: "Failed to transfer ownership" }, { status: 500 })
  }
}
