// This file provides a polyfill for the Web NFC API in environments where it's not supported

// Check if we're in a browser environment and if the NDEFReader is not already defined
if (typeof window !== "undefined" && !("NDEFReader" in window)) {
  // Create a mock NDEFReader class
  class MockNDEFReader extends EventTarget {
    constructor() {
      super()
      console.warn("Web NFC API not supported in this browser. Using mock implementation.")
    }

    async scan() {
      console.log("Mock NFC scan initiated")
      // In a real implementation, this would start scanning for NFC tags
      return Promise.resolve()
    }

    async write(message: any) {
      console.log("Mock NFC write initiated with message:", message)
      // In a real implementation, this would write to an NFC tag
      return Promise.resolve()
    }
  }

  // Add the mock to the window object
  // @ts-ignore - Adding to the Window interface
  window.NDEFReader = MockNDEFReader
}

// Export a function to check if real NFC is supported
export function isRealNFCSupported(): boolean {
  // Check if we're in a browser and if the original NDEFReader is available
  return (
    typeof window !== "undefined" &&
    "NDEFReader" in window &&
    // @ts-ignore - Check if it's not our mock implementation
    !window.NDEFReader.toString().includes("MockNDEFReader")
  )
}
