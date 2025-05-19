import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function AssetVaultPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Asset Vault</h1>
        <p className="text-xl text-white/70">Secure storage and management for your digital assets and product data</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Digital Asset Vault</CardTitle>
            <CardDescription>Secure storage for your phygital assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Prime Phygital Asset Vault provides secure, encrypted storage for all your digital assets, product
              data, and verification information. Our vault uses advanced encryption and blockchain technology to ensure
              your assets remain secure and accessible only to authorized users.
            </p>
            <p>
              With comprehensive version control and audit trails, you can track changes to your assets and maintain
              complete records of product history and ownership transfers.
            </p>
            <div className="mt-6">
              <Image
                src="/neon-vault-history.png"
                alt="Asset Vault Interface"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Vault Features</CardTitle>
            <CardDescription>Key capabilities of the Asset Vault</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Encrypted storage for product data and digital assets</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Blockchain-backed verification and authentication</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Comprehensive version control and change history</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Secure ownership transfer and provenance tracking</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Role-based access control for team collaboration</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>API access for integration with existing systems</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button asChild className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/dashboard">Access Your Vault</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle>Asset Management</CardTitle>
            <CardDescription>How the Asset Vault helps manage your digital assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Product Data</h3>
                <p className="text-sm text-white/70">
                  Store and manage detailed product information, specifications, and documentation
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Digital Media</h3>
                <p className="text-sm text-white/70">
                  Organize product images, videos, 3D models, and marketing materials
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Authentication Records</h3>
                <p className="text-sm text-white/70">
                  Maintain secure records of product authenticity and verification history
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Ownership History</h3>
                <p className="text-sm text-white/70">
                  Track product ownership transfers and maintain complete provenance records
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Service Records</h3>
                <p className="text-sm text-white/70">Document product maintenance, repairs, and service history</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Certificate Management</h3>
                <p className="text-sm text-white/70">
                  Generate and store digital certificates of authenticity and ownership
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
                <h3 className="text-xl font-bold mb-2">Ready to secure your digital assets?</h3>
                <p className="text-white/70">
                  Access your Asset Vault through the dashboard to start managing your phygital assets.
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
