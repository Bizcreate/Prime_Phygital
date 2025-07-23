import { NFCTestSuite } from "@/components/testing/nfc-test-suite"

export default function NFCTestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">NFC Testing Suite</h1>
          <p className="text-white/70">Comprehensive testing for your Prime Phygital NFC implementation</p>
        </div>

        <NFCTestSuite />
      </div>
    </div>
  )
}
