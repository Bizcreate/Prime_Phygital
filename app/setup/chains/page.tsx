import { AlchemyChainGuide } from "@/components/setup/alchemy-chain-guide"

export default function ChainsSetupPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Chain Configuration Guide</h1>
        <p className="text-muted-foreground">Understanding what comes from Alchemy vs what you need to create</p>
      </div>

      <AlchemyChainGuide />
    </div>
  )
}
