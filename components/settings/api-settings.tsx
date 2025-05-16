"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ApiSettings() {
  const [webhookUrl, setWebhookUrl] = useState("")

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  const handleRegenerate = (keyType: string) => {
    console.log(`Regenerating ${keyType} key`)
    // You would typically call your API to regenerate the key here
  }

  const handleSaveWebhook = () => {
    console.log("Saving webhook URL:", webhookUrl)
    // You would typically send this data to your API here
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage your API keys for integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Production API Key</Label>
          <div className="flex gap-2">
            <Input
              value="sk_prod_*****************************"
              readOnly
              className="bg-white/5 border-white/10 flex-1"
            />
            <Button
              variant="outline"
              className="border-white/10"
              onClick={() => handleCopy("sk_prod_actual_key_would_be_here")}
            >
              Copy
            </Button>
            <Button variant="outline" className="border-white/10" onClick={() => handleRegenerate("production")}>
              Regenerate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Test API Key</Label>
          <div className="flex gap-2">
            <Input
              value="sk_test_*****************************"
              readOnly
              className="bg-white/5 border-white/10 flex-1"
            />
            <Button
              variant="outline"
              className="border-white/10"
              onClick={() => handleCopy("sk_test_actual_key_would_be_here")}
            >
              Copy
            </Button>
            <Button variant="outline" className="border-white/10" onClick={() => handleRegenerate("test")}>
              Regenerate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Webhook URL</Label>
          <div className="flex gap-2">
            <Input
              placeholder="https://your-domain.com/webhook"
              className="bg-white/5 border-white/10 flex-1"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <Button variant="outline" className="border-white/10" onClick={handleSaveWebhook}>
              Save
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-white/70">
          <p>
            Learn more about our{" "}
            <a href="#" className="text-neon-blue hover:text-neon-purple">
              API documentation
            </a>
            .
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
