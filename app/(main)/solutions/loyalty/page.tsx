import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function LoyaltyProgramsPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Loyalty Programs</h1>
        <p className="text-xl text-white/70">Next-generation customer loyalty powered by phygital technology</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Phygital Loyalty</CardTitle>
            <CardDescription>Reimagining customer engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Prime Phygital's loyalty solution transforms traditional loyalty programs by connecting physical products
              to digital experiences. Our platform enables brands to create engaging, interactive loyalty programs that
              reward customers for product purchases, usage, and social engagement.
            </p>
            <p>
              With NFC-enabled products, customers can earn points, unlock rewards, and access exclusive experiences
              simply by tapping their products with a smartphone. Blockchain technology ensures transparent, secure
              tracking of loyalty points and rewards.
            </p>
            <div className="mt-6">
              <Image
                src="/loyalty-dashboard.png"
                alt="Loyalty Program Dashboard"
                width={600}
                height={400}
                className="rounded-lg w-full border border-white/10 shadow-lg"
              />
              <p className="text-sm text-white/60 mt-2 text-center">
                Comprehensive dashboard for managing your loyalty program
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Key Benefits</CardTitle>
            <CardDescription>Advantages of phygital loyalty programs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Increased customer engagement and retention</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Seamless integration of physical products and digital rewards</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Transparent, blockchain-backed points and rewards system</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-purple flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Valuable customer data and insights</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-blue flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Reduced program administration costs</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-neon-green flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>Enhanced brand differentiation and perceived value</span>
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
            <CardTitle>Loyalty Features</CardTitle>
            <CardDescription>Capabilities of our loyalty program solution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Product Activation</h3>
                <p className="text-sm text-white/70">Earn points by activating products through NFC taps</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Usage Rewards</h3>
                <p className="text-sm text-white/70">Reward customers for regular product usage and engagement</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Social Sharing</h3>
                <p className="text-sm text-white/70">Incentivize social media sharing and user-generated content</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-purple">Exclusive Content</h3>
                <p className="text-sm text-white/70">
                  Unlock special content, experiences, and offers for loyal customers
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-blue">Tiered Rewards</h3>
                <p className="text-sm text-white/70">Create multi-level loyalty programs with increasing benefits</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neon-green">Analytics Dashboard</h3>
                <p className="text-sm text-white/70">Track program performance and customer engagement metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Real-time Analytics</CardTitle>
            <CardDescription>Monitor your loyalty program performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p>
                Our comprehensive dashboard provides real-time insights into your loyalty program performance. Track key
                metrics such as:
              </p>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neon-purple"></div>
                  <span>Total Products: 142 (+12 from last month)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neon-blue"></div>
                  <span>Active Customers: 2,350 (+18% from last month)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neon-green"></div>
                  <span>Authentications: 12,234 (+24% from last month)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neon-purple"></div>
                  <span>Alerts: 3 (-2 from last month)</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 border border-white/10 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/loyalty-dashboard.png"
                alt="Prime Phygital Dashboard"
                width={1000}
                height={600}
                className="w-full"
              />
            </div>
            <p className="text-sm text-white/60 mt-2 text-center">
              The Prime Phygital dashboard provides comprehensive insights into your loyalty program
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="glass-panel border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to transform your loyalty program?</h3>
                <p className="text-white/70">
                  Contact us to discuss how Prime Phygital can enhance your customer engagement strategy.
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
