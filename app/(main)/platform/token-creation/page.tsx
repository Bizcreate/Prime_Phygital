import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function TokenCreationPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Token Creation</h1>
        <p className="text-xl text-white/70">Create unique digital tokens for your physical products</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>What are Prime Phygital Tokens?</CardTitle>
            <CardDescription>Understanding the foundation of our platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Prime Phygital Tokens are unique digital identifiers that connect your physical products to the
              blockchain, creating a bridge between the physical and digital worlds.
            </p>
            <p>
              Each token contains encrypted product information, ownership details, and a secure verification system
              that ensures authenticity and enables digital experiences.
            </p>
            <div className="mt-6">
              <Image
                src="/neon-token-forge.png"
                alt="Token Creation Interface"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Token Creation Process</CardTitle>
            <CardDescription>How to create tokens for your products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Define your product details and metadata</li>
              <li>Select the blockchain network for deployment</li>
              <li>Choose token features and capabilities</li>
              <li>Generate secure verification keys</li>
              <li>Deploy tokens to the blockchain</li>
              <li>Link tokens to physical products via NFC</li>
            </ol>
            <div className="mt-6">
              <Button asChild className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/dashboard/products">Create Your First Token</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle>Token Features</CardTitle>
            <CardDescription>Capabilities of Prime Phygital Tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Authentication</h3>
                <p className="text-sm text-white/70">
                  Verify product authenticity with cryptographic security and blockchain validation
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Ownership Tracking</h3>
                <p className="text-sm text-white/70">Record and transfer ownership with immutable blockchain records</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Digital Experiences</h3>
                <p className="text-sm text-white/70">
                  Unlock exclusive content and experiences through token ownership
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Loyalty Integration</h3>
                <p className="text-sm text-white/70">
                  Connect with loyalty programs and reward systems for enhanced engagement
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Resale Verification</h3>
                <p className="text-sm text-white/70">
                  Authenticate secondary market transactions and maintain provenance
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Analytics Integration</h3>
                <p className="text-sm text-white/70">
                  Gather insights on product usage, engagement, and customer behavior
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="glass-panel border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to create your first token?</h3>
                <p className="text-white/70">
                  Get started with our easy-to-use token creation interface in the dashboard.
                </p>
              </div>
              <Button asChild className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
