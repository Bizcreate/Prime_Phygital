"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyBlock, dracula } from "react-code-blocks"

export function ApiDocs() {
  const [language, setLanguage] = useState("javascript")

  const codeExamples = {
    javascript: `// Initialize the Prime Phygital SDK
import { PrimePhygital } from '@prime-phygital/sdk';

const client = new PrimePhygital({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'sandbox' for testing
});

// Create a digital passport for a product
async function createDigitalPassport() {
  try {
    const passport = await client.createPassport({
      productId: 'prod_123456',
      name: 'Limited Edition Sneakers',
      brand: 'Urban Athletics',
      metadata: {
        edition: 'Summer 2025',
        color: 'Neon Green',
        size: '10 US'
      },
      blockchain: 'polygon', // or 'ethereum', 'base', etc.
    });
    
    console.log('Digital passport created:', passport);
    return passport;
  } catch (error) {
    console.error('Error creating digital passport:', error);
  }
}`,
    python: `# Initialize the Prime Phygital SDK
from prime_phygital import PrimePhygital

client = PrimePhygital(
    api_key='YOUR_API_KEY',
    environment='production'  # or 'sandbox' for testing
)

# Create a digital passport for a product
def create_digital_passport():
    try:
        passport = client.create_passport(
            product_id='prod_123456',
            name='Limited Edition Sneakers',
            brand='Urban Athletics',
            metadata={
                'edition': 'Summer 2025',
                'color': 'Neon Green',
                'size': '10 US'
            },
            blockchain='polygon',  # or 'ethereum', 'base', etc.
        )
        
        print('Digital passport created:', passport)
        return passport
    except Exception as error:
        print('Error creating digital passport:', error)`,
    ruby: `# Initialize the Prime Phygital SDK
require 'prime_phygital'

client = PrimePhygital::Client.new(
  api_key: 'YOUR_API_KEY',
  environment: 'production' # or 'sandbox' for testing
)

# Create a digital passport for a product
def create_digital_passport
  begin
    passport = client.create_passport(
      product_id: 'prod_123456',
      name: 'Limited Edition Sneakers',
      brand: 'Urban Athletics',
      metadata: {
        edition: 'Summer 2025',
        color: 'Neon Green',
        size: '10 US'
      },
      blockchain: 'polygon', # or 'ethereum', 'base', etc.
    )
    
    puts "Digital passport created: #{passport}"
    return passport
  rescue => error
    puts "Error creating digital passport: #{error}"
  end
end`,
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="authentication" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="wear-to-earn">Wear-to-Earn</TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication API</CardTitle>
              <CardDescription>Authenticate and verify products using the Prime Phygital API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">POST</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/authenticate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">200 OK</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Authenticate a product using its unique identifier or NFC tag data
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium">Code Example</h4>
                  <div className="flex items-center space-x-2">
                    <TabsList className="h-8">
                      <TabsTrigger
                        value="javascript"
                        onClick={() => setLanguage("javascript")}
                        className={`text-xs ${language === "javascript" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        JavaScript
                      </TabsTrigger>
                      <TabsTrigger
                        value="python"
                        onClick={() => setLanguage("python")}
                        className={`text-xs ${language === "python" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Python
                      </TabsTrigger>
                      <TabsTrigger
                        value="ruby"
                        onClick={() => setLanguage("ruby")}
                        className={`text-xs ${language === "ruby" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Ruby
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                <div className="rounded-md border">
                  <CopyBlock
                    text={codeExamples[language as keyof typeof codeExamples]}
                    language={language}
                    showLineNumbers={true}
                    theme={dracula}
                    codeBlock
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Products API</CardTitle>
              <CardDescription>Create and manage digital product passports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">POST</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/products</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">201 Created</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Create a new digital product passport</p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">GET</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/products/:id</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">200 OK</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Retrieve a digital product passport by ID</p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">PUT</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/products/:id</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">200 OK</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Update a digital product passport</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wear-to-earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wear-to-Earn API</CardTitle>
              <CardDescription>Create and manage wear-to-earn protocols and track user activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">POST</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/protocols</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">201 Created</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Create a new wear-to-earn protocol</p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">POST</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/activities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">201 Created</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Record a new wear activity for a user</p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">GET</span>
                    <span className="font-mono text-sm text-muted-foreground">/api/v1/users/:id/rewards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-700">200 OK</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Get rewards balance and history for a user</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
