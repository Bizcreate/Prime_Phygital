// Simple encryption utility for demo purposes
// In production, use proper encryption libraries

export async function encrypt(data: string): Promise<string> {
  try {
    // In production, use Web Crypto API or a proper encryption library
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)

    // Simple base64 encoding for demo (NOT secure for production)
    const base64 = btoa(String.fromCharCode(...new Uint8Array(dataBuffer)))
    return `encrypted_${base64}`
  } catch (error) {
    console.error("Encryption error:", error)
    return data
  }
}

export async function decrypt(encryptedData: string): Promise<string> {
  try {
    if (!encryptedData.startsWith("encrypted_")) {
      return encryptedData
    }

    const base64 = encryptedData.replace("encrypted_", "")
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  } catch (error) {
    console.error("Decryption error:", error)
    return encryptedData
  }
}
