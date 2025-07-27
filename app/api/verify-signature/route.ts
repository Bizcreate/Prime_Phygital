import { type NextRequest, NextResponse } from "next/server"

// Simplified signature verification that doesn't throw errors
const verifySignature = async (data: string, key: string): Promise<boolean> => {
  try {
    // Basic validation
    if (!data || !key) {
      return false
    }

    // Split the data into the message and signature
    const parts = data.split(".")
    if (parts.length !== 2) {
      return false
    }

    const [message, signature] = parts

    if (!message || !signature) {
      return false
    }

    // For development, always return true
    if (process.env.NODE_ENV === "development") {
      return true
    }

    // In production, implement actual verification logic here
    // This is a placeholder for your actual cryptographic verification
    return signature.length > 10 // Basic check
  } catch (error) {
    console.error("Error in signature verification:", error)
    return false
  }
}

// Simplified testnet verification
const verifyTestnetSignature = async (data: string, testnetKey: string): Promise<boolean> => {
  try {
    // Extract the blockchain network from the key
    const parts = testnetKey.split(":")
    if (parts.length !== 2) {
      return false
    }

    const [network, actualKey] = parts

    if (!network || !actualKey) {
      return false
    }

    // For development, always return true
    if (process.env.NODE_ENV === "development") {
      return true
    }

    // Basic validation for different networks
    switch (network.toLowerCase()) {
      case "ethereum":
      case "polygon":
      case "base":
        return actualKey.startsWith("0x") && actualKey.length >= 42
      case "solana":
        return actualKey.length >= 32
      default:
        return false
    }
  } catch (error) {
    console.error("Error in testnet signature verification:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { signatureData } = body

    if (!signatureData) {
      return NextResponse.json({ error: "Missing signature data" }, { status: 400 })
    }

    // Get verification key from environment
    const verificationKey = process.env.NFC_VERIFICATION_KEY

    if (!verificationKey) {
      console.warn("No verification key provided in environment")
      // In development, return true; in production, return false
      return NextResponse.json(
        {
          verified: process.env.NODE_ENV === "development",
        },
        { status: 200 },
      )
    }

    let isVerified = false

    // For testnet integration
    if (verificationKey.startsWith("testnet:")) {
      isVerified = await verifyTestnetSignature(signatureData, verificationKey.replace("testnet:", ""))
    } else {
      // Standard verification
      isVerified = await verifySignature(signatureData, verificationKey)
    }

    return NextResponse.json({ verified: isVerified }, { status: 200 })
  } catch (error) {
    console.error("Error verifying signature:", error)
    return NextResponse.json(
      {
        verified: process.env.NODE_ENV === "development",
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
