import { encodeNFCTag, scanSignatures, type NFCRecord } from "@/utils/nfc-encoder"

export interface NFCProductData {
  productId: string
  serialNumber: string
  brand: string
  name: string
  manufactureDate: string
  verificationUrl: string
  blockchainNetwork?: string
  tokenId?: string
}

export class NFCService {
  // Write product data to an NFC tag
  static async writeProductToTag(productData: NFCProductData): Promise<boolean> {
    try {
      // Create the verification URL with product data
      const baseUrl = process.env.NEXT_PUBLIC_VERIFICATION_URL || "https://primephygital.com/verify"
      const verificationUrl = `${baseUrl}?id=${productData.productId}&s=${productData.serialNumber}`

      // Create records for the NFC tag
      const records: NFCRecord[] = [
        // Main URL record for quick scanning
        {
          recordType: "uri",
          data: verificationUrl,
        },
        // JSON data record with full product details
        {
          recordType: "mime",
          data: JSON.stringify({
            type: "product",
            id: productData.productId,
            serial: productData.serialNumber,
            brand: productData.brand,
            name: productData.name,
            mfgDate: productData.manufactureDate,
            blockchain: productData.blockchainNetwork,
            token: productData.tokenId,
          }),
          id: "application/json",
        },
        // Text record with basic product info
        {
          recordType: "text",
          data: `${productData.brand} ${productData.name} - S/N: ${productData.serialNumber}`,
          lang: "en",
        },
      ]

      // Write to the NFC tag
      return await encodeNFCTag({ records })
    } catch (error) {
      console.error("Error writing product data to NFC tag:", error)
      return false
    }
  }

  // Read and verify an NFC tag
  static async readAndVerifyTag(): Promise<{
    isVerified: boolean
    productData?: NFCProductData
    error?: string
  }> {
    try {
      // This would use the Web NFC API to read the tag
      // For now, we'll simulate this process

      if (typeof window !== "undefined" && "NDEFReader" in window) {
        try {
          // Use the Web NFC API directly
          // @ts-ignore - TypeScript might not recognize NDEFReader
          const ndef = new window.NDEFReader()

          // Start scanning
          await ndef.scan()

          return new Promise((resolve) => {
            // @ts-ignore
            ndef.onreading = (event) => {
              try {
                let productData: Partial<NFCProductData> = {}
                let signatureData = ""

                // @ts-ignore
                for (const record of event.message.records) {
                  if (record.recordType === "url") {
                    // Parse URL parameters
                    const url = new URL(record.data)
                    productData.productId = url.searchParams.get("id") || ""
                    productData.serialNumber = url.searchParams.get("s") || ""
                    productData.verificationUrl = record.data
                  } else if (record.recordType === "mime" && record.mediaType === "application/json") {
                    // Parse JSON data
                    const decoder = new TextDecoder()
                    const jsonData = JSON.parse(decoder.decode(record.data))

                    productData = {
                      ...productData,
                      productId: jsonData.id,
                      serialNumber: jsonData.serial,
                      brand: jsonData.brand,
                      name: jsonData.name,
                      manufactureDate: jsonData.mfgDate,
                      blockchainNetwork: jsonData.blockchain,
                      tokenId: jsonData.token,
                    }
                  } else if (record.recordType === "signature") {
                    // Extract signature data
                    const decoder = new TextDecoder()
                    signatureData = decoder.decode(record.data)
                  }
                }

                // Verify the signature if present
                if (signatureData) {
                  scanSignatures(signatureData).then((isVerified) => {
                    if (isVerified) {
                      resolve({
                        isVerified: true,
                        productData: productData as NFCProductData,
                      })
                    } else {
                      resolve({
                        isVerified: false,
                        error: "Invalid signature",
                      })
                    }
                  })
                } else {
                  // No signature, but we have product data
                  resolve({
                    isVerified: false,
                    productData: productData as NFCProductData,
                    error: "No signature found",
                  })
                }
              } catch (error) {
                resolve({
                  isVerified: false,
                  error: `Error parsing NFC data: ${error.message}`,
                })
              }
            }

            // @ts-ignore
            ndef.onreadingerror = (error) => {
              resolve({
                isVerified: false,
                error: `NFC reading error: ${error.message}`,
              })
            }
          })
        } catch (error) {
          return {
            isVerified: false,
            error: `NFC scan error: ${error.message}`,
          }
        }
      } else {
        return {
          isVerified: false,
          error: "Web NFC API not supported in this browser",
        }
      }
    } catch (error) {
      console.error("Error reading NFC tag:", error)
      return {
        isVerified: false,
        error: `Unexpected error: ${error.message}`,
      }
    }
  }

  // Generate a signature for an NFC tag
  static async generateSignature(productData: NFCProductData, privateKey: string): Promise<string> {
    try {
      // Create a message from product data
      const message = `${productData.productId}:${productData.serialNumber}:${Date.now()}`

      // In a real implementation, you would:
      // 1. Use Web Crypto API or a library to sign the message
      // 2. Return the signature in the format expected by your verification system

      // This is a placeholder for actual implementation
      if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
        // Convert private key from hex to CryptoKey
        const keyData = this.hexStringToArrayBuffer(privateKey)

        // Import the private key
        const key = await window.crypto.subtle.importKey(
          "pkcs8", // or "jwk" depending on your key format
          keyData,
          {
            name: "ECDSA",
            namedCurve: "P-256",
          },
          false,
          ["sign"],
        )

        // Sign the message
        const encoder = new TextEncoder()
        const data = encoder.encode(message)
        const signature = await window.crypto.subtle.sign(
          {
            name: "ECDSA",
            hash: { name: "SHA-256" },
          },
          key,
          data,
        )

        // Convert signature to hex string
        return message + "." + this.arrayBufferToHexString(signature)
      }

      // Fallback for development
      return message + ".mocksignature123456789abcdef"
    } catch (error) {
      console.error("Error generating signature:", error)
      throw error
    }
  }

  // Helper function to convert hex string to ArrayBuffer
  private static hexStringToArrayBuffer(hexString: string): ArrayBuffer {
    // Remove 0x prefix if present
    const hex = hexString.startsWith("0x") ? hexString.slice(2) : hexString

    // Ensure even number of characters
    const normalizedHex = hex.length % 2 === 0 ? hex : "0" + hex

    // Convert to ArrayBuffer
    const buffer = new Uint8Array(normalizedHex.length / 2)

    for (let i = 0; i < normalizedHex.length; i += 2) {
      buffer[i / 2] = Number.parseInt(normalizedHex.substring(i, i + 2), 16)
    }

    return buffer.buffer
  }

  // Helper function to convert ArrayBuffer to hex string
  private static arrayBufferToHexString(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer)
    let hexString = ""

    for (let i = 0; i < byteArray.length; i++) {
      const hex = byteArray[i].toString(16).padStart(2, "0")
      hexString += hex
    }

    return hexString
  }
}
