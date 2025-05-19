import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function NFTMintingPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">NFT Minting</h1>
        <p className="text-xl text-white/70">
          Create blockchain-backed digital collectibles for your physical products
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Phygital NFTs</CardTitle>
            <CardDescription>Digital collectibles linked to physical items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Prime Phygital NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of physical
              products on the blockchain. Each NFT contains metadata about the product, authentication information, and
              digital content that enhances the physical item.
            </p>
            <p>
              Our platform makes it easy to create, mint, and manage NFTs that are securely linked to your physical
              products through NFC technology, creating a seamless phygital experience.
            </p>
            <div className="mt-6">
              <Image
                src="/neon-nft-flow.png"
                alt="NFT Minting Process"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>NFT Minting Process</CardTitle>
            <CardDescription>How to create NFTs for your products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Upload product images and digital content</li>
              <li>Define NFT metadata and properties</li>
              <li>Select blockchain network for deployment</li>
              <li>Choose minting options (lazy minting available)</li>
              <li>Link NFTs to physical products via NFC</li>
              <li>Deploy to marketplace or distribute directly</li>
            </ol>
            <div className="mt-6">
              <Button asChild className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/dashboard/products">Create Your First NFT</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle>NFT Features</CardTitle>
            <CardDescription>Capabilities of Prime Phygital NFTs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Digital Ownership</h3>
                <p className="text-sm text-white/70">
                  Verifiable blockchain records of product ownership and provenance
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Exclusive Content</h3>
                <p className="text-sm text-white/70">
                  Unlock digital experiences, artwork, and content through NFT ownership
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Secondary Market</h3>
                <p className="text-sm text-white/70">Enable royalties and track resales on NFT marketplaces</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Community Access</h3>
                <p className="text-sm text-white/70">
                  Grant access to exclusive communities and events for NFT holders
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Dynamic Metadata</h3>
                <p className="text-sm text-white/70">Update NFT properties based on real-world product interactions</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Cross-Platform Display</h3>
                <p className="text-sm text-white/70">
                  Showcase NFTs across wallets, marketplaces, and social platforms
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
                <h3 className="text-xl font-bold mb-2">Ready to mint your first NFT?</h3>
                <p className="text-white/70">Get started with our streamlined NFT creation tools in the dashboard.</p>
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
