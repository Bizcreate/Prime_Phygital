import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiDocs } from "@/components/documentation/api-docs"

export const metadata: Metadata = {
  title: "Documentation | Prime Phygital Platform",
  description: "Developer documentation for the Prime Phygital Platform",
}

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">Learn how to integrate and use the Prime Phygital Platform</p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="getting-started" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-2">Quick Start</h3>
                <p className="text-muted-foreground mb-4">
                  Get up and running with the Prime Phygital Platform in minutes
                </p>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Create an account and get your API key</li>
                  <li>Install the SDK for your preferred language</li>
                  <li>Initialize the client with your API key</li>
                  <li>Create your first digital passport</li>
                </ol>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-2">Installation</h3>
                <p className="text-muted-foreground mb-4">Install the Prime Phygital SDK using your package manager</p>
                <div className="space-y-2">
                  <div className="rounded-md bg-muted p-2">
                    <code className="text-sm">npm install @prime-phygital/sdk</code>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <code className="text-sm">pip install prime-phygital</code>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <code className="text-sm">gem install prime_phygital</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-2">Core Concepts</h3>
              <p className="text-muted-foreground mb-4">Understand the key concepts of the Prime Phygital Platform</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-bold mb-1">Digital Passports</h4>
                  <p className="text-sm text-muted-foreground">
                    Blockchain-backed digital representations of physical products
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">NFC Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect physical products to digital experiences using NFC technology
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Wear-to-Earn</h4>
                  <p className="text-sm text-muted-foreground">
                    Reward users for wearing and using authenticated products
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold mb-2">Creating Digital Passports</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to create and manage digital passports for your products
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Read guide →
                </a>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold mb-2">NFC Tag Encoding</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Step-by-step guide to encoding NFC tags for your products
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Read guide →
                </a>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold mb-2">Setting Up Wear-to-Earn</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create engaging wear-to-earn protocols for your customers
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Read guide →
                </a>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold mb-2">Authentication Flow</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Implement product authentication in your application
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Read guide →
                </a>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold mb-2">Rewards Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage rewards for your wear-to-earn protocols
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Read guide →
                </a>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold mb-2">Mobile Integration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Integrate Prime Phygital into your mobile applications
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Read guide →
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <ApiDocs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
