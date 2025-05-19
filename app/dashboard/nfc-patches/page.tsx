import { NFCPatchProgrammer } from "@/components/nfc-patch-programmer"

export default function NFCPatchesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">NFC Patch Management</h1>
      <NFCPatchProgrammer />
    </div>
  )
}
