import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function SupplyChainPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Supply Chain Tracking</h1>
        <p className="text-xl text-white/70">End-to-end visibility and traceability for your product journey</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Blockchain-Powered Supply Chain</CardTitle>
            <CardDescription>Transparent and immutable tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Prime Phygital's supply chain solution leverages blockchain technology to create a transparent, immutable
              record of your products' journey from manufacturing to consumer. Each step in the supply chain is recorded
              on the blockchain, creating a verifiable history that builds trust with your customers.
            </p>
            <p>
              With NFC-enabled products, stakeholders can access real-time information about a product's origin,
              manufacturing process, distribution path, and current status with a simple smartphone tap.
            </p>
            <div className="mt-6">
              <Image
                src="/blockchain-nfc-collaboration.png"
                alt="Supply Chain Tracking"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Key Benefits</CardTitle>
            <CardDescription>Advantages of blockchain supply chain tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>End-to-end visibility across your entire supply chain</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Immutable records that prevent fraud and counterfeiting</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Real-time tracking and status updates</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Enhanced consumer trust through transparency</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Streamlined compliance and certification verification</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Reduced operational costs and improved efficiency</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button asChild className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle>Supply Chain Features</CardTitle>
            <CardDescription>Capabilities of our supply chain tracking solution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Origin Tracking</h3>
                <p className="text-sm text-white/70">Record and verify the source of materials and components</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Manufacturing Verification</h3>
                <p className="text-sm text-white/70">
                  Document production processes, quality control, and certifications
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Distribution Tracking</h3>
                <p className="text-sm text-white/70">
                  Monitor product movement through warehouses and distribution centers
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Retail Authentication</h3>
                <p className="text-sm text-white/70">
                  Verify authentic products at point of sale and prevent counterfeits
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Consumer Engagement</h3>
                <p className="text-sm text-white/70">
                  Enable customers to view product journey and verify authenticity
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Analytics Dashboard</h3>
                <p className="text-sm text-white/70">Gain insights from supply chain data and optimize operations</p>
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
                <h3 className="text-xl font-bold mb-2">Ready to transform your supply chain?</h3>
                <p className="text-white/70">
                  Contact us to discuss how Prime Phygital can enhance your supply chain visibility and security.
                </p>
              </div>
              <Button asChild className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
