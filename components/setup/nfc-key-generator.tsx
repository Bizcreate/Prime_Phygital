"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Key, Shield, AlertTriangle, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function NFCKeyGenerator() {
  const { toast } = useToast()
  const [generatedKey, setGeneratedKey] = useState<string>("")
  const [copiedKey, setCopiedKey] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const generateSecureKey = async () => {
    setIsGenerating(true)

    // Simulate generation time for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      // Generate 32 random bytes using Web Crypto API
      const randomBytes = new Uint8Array(32)
      crypto.getRandomValues(randomBytes)

      // Convert to hexadecimal string
      const hexKey = Array.from(randomBytes)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")

      setGeneratedKey(hexKey)
      setCopiedKey(false)

      toast({
        title: "🔐 Secure Key Generated!",
        description: "Your 32-byte NFC verification key is ready",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again or use the manual method",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    if (!generatedKey) return

    try {
      await navigator.clipboard.writeText(generatedKey)
      setCopiedKey(true)

      toast({
        title: "Copied!",
        description: "NFC verification key copied to clipboard",
      })

      // Reset copied state after 3 seconds
      setTimeout(() => setCopiedKey(false), 3000)
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the key manually",
        variant: "destructive",
      })
    }
  }

  const copyEnvVariable = async () => {
    if (!generatedKey) return

    const envLine = `NFC_VERIFICATION_KEY=${generatedKey}`

    try {
      await navigator.clipboard.writeText(envLine)
      toast({
        title: "Environment Variable Copied!",
        description: "Ready to paste into your .env.local file",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Key className="h-8 w-8 text-blue-600" />
          NFC Key Generator
        </h1>
        <p className="text-muted-foreground">Generate a secure 32-byte hexadecimal key for NFC tag verification</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Secure Key Generation
          </CardTitle>
          <CardDescription>
            This key will be used to cryptographically sign and verify NFC tags, preventing counterfeiting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Generation Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Generate New Key</Label>
              <Badge variant="outline" className="text-xs">
                256-bit Security
              </Badge>
            </div>

            <Button onClick={generateSecureKey} disabled={isGenerating} className="w-full h-12 text-base">
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating Secure Key...
                </>
              ) : (
                <>
                  <Key className="h-5 w-5 mr-2" />
                  Generate NFC Verification Key
                </>
              )}
            </Button>
          </div>

          {/* Generated Key Display */}
          {generatedKey && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-medium">Generated Key</Label>
                <div className="relative">
                  <Input
                    value={generatedKey}
                    readOnly
                    className="font-mono text-sm pr-12 bg-muted"
                    placeholder="Your generated key will appear here"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={copyToClipboard}
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={copyToClipboard} className="flex-1 bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Key
                </Button>
                <Button onClick={copyEnvVariable} className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy as Environment Variable
                </Button>
              </div>
            </div>
          )}

          {/* Environment Variable Preview */}
          {generatedKey && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Add to .env.local</Label>
              <div className="bg-muted p-4 rounded-lg border">
                <code className="text-sm font-mono break-all">NFC_VERIFICATION_KEY={generatedKey}</code>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Security Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                256-bit cryptographic strength
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Generated using Web Crypto API
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Cryptographically secure random
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Prevents NFC tag counterfeiting
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Security Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Store this key securely
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Never commit to version control
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                If compromised, regenerate immediately
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Keep backups in secure locations
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Manual Generation Alternative */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alternative: Command Line Generation</CardTitle>
          <CardDescription>If you prefer to generate the key using command line tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Using OpenSSL:</Label>
              <div className="bg-muted p-3 rounded-lg mt-2">
                <code className="text-sm font-mono">openssl rand -hex 32</code>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Using Node.js:</Label>
              <div className="bg-muted p-3 rounded-lg mt-2">
                <code className="text-sm font-mono">
                  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
