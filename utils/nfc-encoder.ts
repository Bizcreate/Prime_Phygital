export interface NFCRecord {
  recordType: "text" | "uri" | "mime"
  data: string
  id?: string
  encoding?: string
  lang?: string
}

export interface NFCOptions {
  records: NFCRecord[]
  timeout?: number
  ignoreRead?: boolean
}

// Enhanced for real NFC hardware
export async function encodeNFCTag(options: NFCOptions): Promise<boolean> {
  try {
    console.log("Encoding NFC tag with options:", options)

    // Check for Web NFC API support
    if (typeof window !== "undefined" && "NDEFReader" in window) {
      try {
        // Use the Web NFC API directly
        // @ts-ignore - NDEFReader is not in the TypeScript types yet
        const ndef = new window.NDEFReader()

        // Convert our options format to Web NFC API format
        const ndefRecords = options.records.map((record) => {
          if (record.recordType === "text") {
            return {
              recordType: "text",
              data: record.data,
              ...(record.lang && { lang: record.lang }),
              ...(record.encoding && { encoding: record.encoding }),
            }
          } else if (record.recordType === "uri") {
            return { recordType: "url", data: record.data }
          } else {
            return {
              recordType: record.recordType,
              data: record.data,
              ...(record.id && { id: record.id }),
            }
          }
        })

        // Write to the NFC tag
        await ndef.write({ records: ndefRecords })
        console.log("NFC tag written successfully")
        return true
      } catch (error) {
        console.error("Error writing to NFC tag:", error)
        throw new Error(`NFC write failed: ${error.message}`)
      }
    } else {
      // Fallback for browsers without Web NFC API
      console.warn("Web NFC API not supported in this browser")

      // Simulate success for development purposes
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return true
      }

      throw new Error("Web NFC API not supported in this browser")
    }
  } catch (error) {
    console.error("Error encoding NFC tag:", error)
    return false
  }
}

export function checkNFCSupport(): boolean {
  // Check if the browser supports Web NFC API
  return typeof window !== "undefined" && "NDEFReader" in window
}

// Simplified signature verification that doesn't throw errors
export const scanSignatures = async (signatureData: string): Promise<boolean> => {
  try {
    // Basic validation
    if (!signatureData || typeof signatureData !== "string") {
      console.warn("Invalid signature data provided")
      return false
    }

    // Call the server action to verify the signature
    const response = await fetch("/api/verify-signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ signatureData }),
    })

    if (!response.ok) {
      console.warn(`Verification request failed: ${response.status}`)
      return false
    }

    const result = await response.json()
    return Boolean(result.verified)
  } catch (error) {
    console.warn("Error verifying signature:", error)
    // Return false in production, true in development for testing
    return process.env.NODE_ENV === "development"
  }
}
