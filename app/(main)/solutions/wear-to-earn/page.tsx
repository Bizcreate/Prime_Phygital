import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function WearToEarnPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Wear-to-Earn</h1>
        <p className="text-xl text-white/70">Reward your customers for wearing and using your products</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Wear-to-Earn Programs</CardTitle>
            <CardDescription>The future of customer engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Prime Phygital's Wear-to-Earn solution enables brands to reward customers for wearing and using their
              products in the real world. Using NFC technology and blockchain verification, customers can earn tokens,
              points, or rewards simply by wearing your products and scanning them with their smartphone.
            </p>
            <p>
              This innovative approach creates a continuous engagement loop between brands and customers, encouraging
              product usage, building brand loyalty, and generating valuable data about how and where your products are
              being used.
            </p>
            <div className="mt-6">
              <Image
                src="/sneaker-nfc-scan.png"
                alt="Wear-to-Earn Scanning"
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
            <CardDescription>Advantages of wear-to-earn programs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Increased product usage and customer engagement</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Enhanced brand loyalty and customer retention</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Valuable data on product usage patterns and locations</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Gamified experience that drives repeat engagement</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Increased social sharing and brand advocacy</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>New revenue streams through token economics</span>
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
            <CardTitle>Program Features</CardTitle>
            <CardDescription>Capabilities of our wear-to-earn solution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Daily Check-ins</h3>
                <p className="text-sm text-white/70">Reward customers for scanning their products on a regular basis</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Location-Based Rewards</h3>
                <p className="text-sm text-white/70">
                  Offer special bonuses for wearing products at specific locations or events
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Social Challenges</h3>
                <p className="text-sm text-white/70">Create group challenges and competitions for additional rewards</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Token Rewards</h3>
                <p className="text-sm text-white/70">
                  Distribute branded tokens or cryptocurrency rewards for participation
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Achievement System</h3>
                <p className="text-sm text-white/70">
                  Unlock badges, levels, and status tiers through consistent engagement
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Analytics Dashboard</h3>
                <p className="text-sm text-white/70">
                  Track program performance, engagement metrics, and user behavior
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
                <h3 className="text-xl font-bold mb-2">Ready to launch your wear-to-earn program?</h3>
                <p className="text-white/70">
                  Contact us to discuss how Prime Phygital can help you reward customers for product usage.
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
