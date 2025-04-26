import QRCode from "qrcode"

export async function generateQRCode(text: string, options = {}): Promise<string> {
  try {
    const defaultOptions = {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.92,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      ...options,
    }

    return await QRCode.toDataURL(text, defaultOptions)
  } catch (error) {
    console.error("Error generating QR code:", error)
    throw new Error("Failed to generate QR code")
  }
}
