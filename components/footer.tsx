import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, Linkedin, Github, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green opacity-70 blur-sm" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-black">
                  <span className="text-xl font-bold text-white">P</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Prime
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                  Phygital
                </span>
              </span>
            </Link>
            <p className="mb-6 text-sm text-white/70">
              Connecting physical products to the blockchain with NFC technology for authentication, ownership tracking,
              and interactive experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/platform/token-creation" className="text-sm text-white/70 hover:text-white">
                  Token Creation
                </Link>
              </li>
              <li>
                <Link href="/platform/nfc-encoding" className="text-sm text-white/70 hover:text-white">
                  NFC Encoding
                </Link>
              </li>
              <li>
                <Link href="/platform/nft-minting" className="text-sm text-white/70 hover:text-white">
                  NFT Minting
                </Link>
              </li>
              <li>
                <Link href="/platform/asset-vault" className="text-sm text-white/70 hover:text-white">
                  Asset Vault
                </Link>
              </li>
              <li>
                <Link href="/platform/social-engagement" className="text-sm text-white/70 hover:text-white">
                  Social Engagement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions/authentication" className="text-sm text-white/70 hover:text-white">
                  Product Authentication
                </Link>
              </li>
              <li>
                <Link href="/solutions/supply-chain" className="text-sm text-white/70 hover:text-white">
                  Supply Chain Tracking
                </Link>
              </li>
              <li>
                <Link href="/solutions/loyalty" className="text-sm text-white/70 hover:text-white">
                  Loyalty Programs
                </Link>
              </li>
              <li>
                <Link href="/solutions/wear-to-earn" className="text-sm text-white/70 hover:text-white">
                  Wear-to-Earn
                </Link>
              </li>
              <li>
                <Link href="/solutions/enterprise" className="text-sm text-white/70 hover:text-white">
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Subscribe</h3>
            <p className="mb-4 text-sm text-white/70">
              Stay updated with the latest news and features from Prime Phygital.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Prime Phygital. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-xs text-white/50 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-white/50 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-xs text-white/50 hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
