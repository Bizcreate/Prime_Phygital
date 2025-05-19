import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function NFCEncodingPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">NFC Encoding</h1>
        <p className="text-xl text-white/70">Connect physical products to digital experiences with NFC technology</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>NFC Technology</CardTitle>
            <CardDescription>The bridge between physical and digital</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Near Field Communication (NFC) technology enables seamless interaction between physical products and
              digital experiences. Our platform uses advanced NFC encoding to create secure, tamper-resistant
              connections between your products and their digital tokens.
            </p>
            <p>
              With a simple tap of a smartphone, customers can verify authenticity, access exclusive content, and engage
              with your brand in new and exciting ways.
            </p>
            <div className="mt-6">
              <Image
                src="/nfc-neon-encode.png"
                alt="NFC Encoding Process"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Encoding Process</CardTitle>
            <CardDescription>How to encode NFC tags for your products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Create digital tokens for your products</li>
              <li>Generate unique verification signatures</li>
              <li>Program NFC tags with product data and signatures</li>
              <li>Link tags to blockchain records</li>
              <li>Apply tags to physical products</li>
              <li>Test verification with smartphone scan</li>
            </ol>
            <div className="mt-6">
              <Button asChild className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                <Link href="/dashboard/products">Encode Your First NFC Tag</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle>NFC Tag Options</CardTitle>
            <CardDescription>Available NFC tag formats for your products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Iron-On Patches</h3>
                <p className="text-sm text-white/70">
                  Durable NFC patches that can be heat-applied to apparel and textile products
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Adhesive Labels</h3>
                <p className="text-sm text-white/70">
                  Tamper-evident stickers for packaging, accessories, and hard surfaces
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Embedded Tags</h3>
                <p className="text-sm text-white/70">
                  NFC chips that can be integrated directly into products during manufacturing
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Hang Tags</h3>
                <p className="text-sm text-white/70">
                  Elegant NFC-enabled tags that attach to products with string or fasteners
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Woven Labels</h3>
                <p className="text-sm text-white/70">NFC technology integrated into traditional woven product labels</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Custom Solutions</h3>
                <p className="text-sm text-white/70">Bespoke NFC integration options for unique product requirements</p>
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
                <h3 className="text-xl font-bold mb-2">Ready to encode your first NFC tag?</h3>
                <p className="text-white/70">Get started with our intuitive NFC encoding tools in the dashboard.</p>
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
