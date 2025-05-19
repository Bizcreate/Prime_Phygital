"use client"

import { useEffect } from "react"

export function NFCPolyfillLoader() {
  useEffect(() => {
    // Dynamically import the NFC polyfill
    import("@/utils/nfc-polyfill").catch((err) => {
      console.error("Error loading NFC polyfill:", err)
    })
  }, [])

  // This component doesn't render anything
  return null
}
