import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight, HelpCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "$499",
      description: "Perfect for small brands and creators just getting started with phygital products.",
      features: [
        "Up to 100 NFC tags",
        "Basic product authentication",
        "Standard digital passports",
        "Single blockchain support",
        "Basic analytics dashboard",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$1,499",
      description: "Ideal for growing brands looking to scale their phygital product offerings.",
      features: [
        "Up to 1,000 NFC tags",
        "Advanced product authentication",
        "Dynamic digital passports",
        "Multi-chain support (3 chains)",
        "Wear-to-earn functionality",
        "Advanced analytics",
        "Priority email & chat support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large brands with complex requirements and high volumes.",
      features: [
        "Unlimited NFC tags",
        "Premium product authentication",
        "Fully customizable digital passports",
        "Multi-chain support (all chains)",
        "Advanced wear-to-earn programs",
        "White-label solution",
        "API access",
        "Dedicated account manager",
        "24/7 priority support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-[100px]" />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Simple, Transparent{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                  Pricing
                </span>
              </h1>

              <p className="text-lg text-white/70 sm:text-xl">
                Choose the plan that's right for your brand. All plans include access to our core NFC tokenization
                platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`glass-panel border-white/10 relative ${
                    tier.popular ? "border-neon-purple/50 shadow-[0_0_30px_rgba(240,0,255,0.15)]" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-gradient-to-r from-neon-purple to-neon-blue text-white text-xs font-medium px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-white/70 ml-2">/month</span>}
                    </div>
                    <CardDescription className="mt-2">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={
                        tier.popular
                          ? "w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                          : "w-full"
                      }
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={tier.name === "Enterprise" ? "/contact" : "/get-started"}>
                        {tier.cta}
                        {tier.name !== "Enterprise" && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-blue/10 to-neon-green/10 blur-[100px]" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">
                  Questions
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Everything you need to know about our pricing and platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-neon-purple" />
                    <CardTitle className="text-lg">What's included in each plan?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    All plans include access to our core NFC tokenization platform, including product authentication,
                    digital passports, and basic analytics. Higher tier plans include additional features like
                    multi-chain support, wear-to-earn functionality, and more advanced customization options.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-neon-blue" />
                    <CardTitle className="text-lg">Do I need to pay for NFC tags separately?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    The pricing includes the software platform and a specific number of NFC tags based on your plan. If
                    you need additional tags beyond your plan's allocation, they can be purchased separately at
                    competitive rates.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-neon-green" />
                    <CardTitle className="text-lg">Are there any transaction fees?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Our platform does not charge additional transaction fees for standard usage. However, blockchain gas
                    fees for minting NFTs are separate and depend on the blockchain network you choose to use.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-neon-yellow" />
                    <CardTitle className="text-lg">Can I upgrade my plan later?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Yes, you can upgrade your plan at any time as your needs grow. The price difference will be prorated
                    for the remainder of your billing cycle. Contact our support team to assist with the upgrade
                    process.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-neon-purple" />
                    <CardTitle className="text-lg">Do you offer custom solutions?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Yes, our Enterprise plan offers fully customizable solutions tailored to your specific requirements.
                    This includes custom integrations, white-labeling, dedicated support, and more. Contact our sales
                    team to discuss your needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-neon-blue" />
                    <CardTitle className="text-lg">Is there a free trial available?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    We offer a demo of our platform to help you understand its capabilities before making a decision.
                    For qualified businesses, we can also arrange a limited trial with a small number of NFC tags to
                    test the platform with your products.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-[100px]" />

          <div className="container relative z-10">
            <div className="glass-panel neon-border rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Still Have Questions?</h2>
              <p className="mx-auto max-w-2xl text-white/70 mb-8">
                Our team is ready to help you find the perfect solution for your brand's needs. Contact us for a
                personalized consultation.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  <Link href="/contact" className="flex items-center">
                    Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  <Link href="/demo">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
