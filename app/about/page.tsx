import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Lightbulb, Target, Shield } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/confident-tech-leader.png",
      bio: "Former blockchain developer with 10+ years experience in product authentication and supply chain technology.",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/confident-tech-leader.png",
      bio: "Blockchain expert with background in cryptography and secure systems. Previously led engineering at major tech companies.",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      image: "/confident-product-manager.png",
      bio: "Product visionary with experience in luxury goods and fashion tech. Passionate about bridging physical and digital experiences.",
    },
    {
      name: "Olivia Williams",
      role: "Head of Partnerships",
      image: "/confident-executive.png",
      bio: "Strategic partnership expert with deep connections in fashion, art, and collectibles industries.",
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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                  Our Mission is to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                    Bridge Worlds
                  </span>
                </h1>

                <p className="text-lg text-white/70 mb-8">
                  Prime Phygital was founded with a vision to seamlessly connect physical products with digital
                  experiences. We're building the infrastructure for the next generation of authentic product
                  experiences.
                </p>

                <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  <Link href="/contact" className="flex items-center">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="glass-panel neon-border overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image src="/blockchain-nfc-collaboration.png" alt="Prime Phygital Team" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-blue/10 to-neon-green/10 blur-[100px]" />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">
                    Story
                  </span>
                </h2>
              </div>

              <div className="space-y-8">
                <p className="text-lg text-white/80">
                  Prime Phygital was born from a simple observation: in a world increasingly split between physical and
                  digital experiences, there needed to be a bridge. Our founder, Alex Johnson, experienced firsthand the
                  challenges of product authentication in the luxury goods market and saw an opportunity to leverage
                  blockchain technology and NFC to solve this problem.
                </p>

                <p className="text-lg text-white/80">
                  Founded in 2022, we assembled a team of experts in blockchain, product development, and brand
                  partnerships to create a platform that would not only authenticate products but transform them into
                  gateways for digital experiences.
                </p>

                <p className="text-lg text-white/80">
                  Today, Prime Phygital works with brands across fashion, collectibles, art, and consumer goods to
                  create seamless phygital experiences that build trust, engage customers, and open new revenue streams.
                  Our platform has processed over 500,000 authentications and powers digital experiences for products
                  around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-green">
                  Values
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                The principles that guide everything we do at Prime Phygital
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <Lightbulb className="h-6 w-6 text-neon-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-white/70">
                    We constantly push the boundaries of what's possible in connecting physical products to digital
                    experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Trust</h3>
                  <p className="text-white/70">
                    We build systems that create trust through transparency, security, and verifiable authenticity.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <Users className="h-6 w-6 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                  <p className="text-white/70">
                    We work closely with brands and partners to create solutions that meet their unique needs and
                    vision.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-white/10 p-3 w-fit mb-4">
                    <Target className="h-6 w-6 text-neon-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Impact</h3>
                  <p className="text-white/70">
                    We measure our success by the tangible value we create for brands and the experiences we enable for
                    consumers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 blur-[100px]" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Meet Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                  Team
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                The passionate experts building the future of phygital experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <Card key={member.name} className="glass-panel border-white/10 overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-neon-blue mb-2">{member.role}</p>
                    <p className="text-sm text-white/70">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-[100px]" />

          <div className="container relative z-10">
            <div className="glass-panel neon-border rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Join Our Journey</h2>
              <p className="mx-auto max-w-2xl text-white/70 mb-8">
                We're always looking for talented individuals who are passionate about bridging the physical and digital
                worlds. Check out our open positions or get in touch to learn more.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  <Link href="/careers" className="flex items-center">
                    View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  <Link href="/contact">Contact Us</Link>
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
