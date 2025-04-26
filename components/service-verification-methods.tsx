"use client"

import { useState } from "react"
import { Check, Shield, FileCheck, QrCode, Smartphone, Fingerprint, Camera, Globe, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface ServiceVerificationMethodsProps {
  onSelect?: (method: string) => void
  defaultMethod?: string
  showFooter?: boolean
}

export function ServiceVerificationMethods({
  onSelect,
  defaultMethod = "blockchain",
  showFooter = true,
}: ServiceVerificationMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState(defaultMethod)
  const [isApplying, setIsApplying] = useState(false)

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value)
    if (onSelect) {
      onSelect(value)
    }
  }

  const handleApplyMethod = () => {
    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)
      toast({
        title: "Verification Method Applied",
        description: `${getMethodName(selectedMethod)} has been set as the default verification method.`,
      })
    }, 1000)
  }

  const getMethodName = (methodId: string): string => {
    const method = verificationMethods.find((m) => m.id === methodId)
    return method ? method.name : "Unknown Method"
  }

  const verificationMethods = [
    {
      id: "blockchain",
      name: "Blockchain Verification",
      description: "Verify service records on the blockchain for tamper-proof authenticity",
      icon: <Shield className="h-5 w-5 text-neon-blue" />,
      badge: "Recommended",
      badgeColor: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
    },
    {
      id: "digital-signature",
      name: "Digital Signature",
      description: "Service provider digitally signs the record with their private key",
      icon: <FileCheck className="h-5 w-5 text-green-500" />,
      badge: "Secure",
      badgeColor: "bg-green-500/20 text-green-500 border-green-500/30",
    },
    {
      id: "qr-code",
      name: "QR Code Verification",
      description: "Service provider scans product QR code to verify service",
      icon: <QrCode className="h-5 w-5 text-amber-500" />,
      badge: "Quick",
      badgeColor: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    },
    {
      id: "nfc-tag",
      name: "NFC Tag Verification",
      description: "Service provider taps NFC tag to verify service authenticity",
      icon: <Smartphone className="h-5 w-5 text-neon-purple" />,
      badge: "Contactless",
      badgeColor: "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
    },
    {
      id: "biometric",
      name: "Biometric Verification",
      description: "Service provider uses fingerprint or facial recognition",
      icon: <Fingerprint className="h-5 w-5 text-cyan-500" />,
      badge: "Advanced",
      badgeColor: "bg-cyan-500/20 text-cyan-500 border-cyan-500/30",
    },
    {
      id: "photo-evidence",
      name: "Photo Evidence",
      description: "Upload photos of the service being performed as verification",
      icon: <Camera className="h-5 w-5 text-pink-500" />,
      badge: "Visual",
      badgeColor: "bg-pink-500/20 text-pink-500 border-pink-500/30",
    },
    {
      id: "authorized-partner",
      name: "Authorized Partner",
      description: "Verification through our network of authorized service partners",
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      badge: "Trusted",
      badgeColor: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    },
    {
      id: "multi-factor",
      name: "Multi-Factor Verification",
      description: "Combines multiple verification methods for highest security",
      icon: <Lock className="h-5 w-5 text-indigo-500" />,
      badge: "Premium",
      badgeColor: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
    },
  ]

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>Service Verification Method</CardTitle>
        <CardDescription>Choose how service records are verified for authenticity and security</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={handleMethodChange} className="space-y-3">
          {verificationMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-start space-x-3 rounded-md border p-3 cursor-pointer ${
                selectedMethod === method.id ? "border-neon-blue bg-neon-blue/5" : "border-white/10 hover:bg-white/5"
              }`}
              onClick={() => handleMethodChange(method.id)}
            >
              <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={method.id}
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    {method.icon}
                    {method.name}
                  </Label>
                  {method.badge && <Badge className={method.badgeColor}>{method.badge}</Badge>}
                </div>
                <p className="text-sm text-white/70">{method.description}</p>
              </div>
              {selectedMethod === method.id && <Check className="h-5 w-5 text-neon-blue shrink-0" />}
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      {showFooter && (
        <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
          <p className="text-sm text-white/70">All verification methods are secure and tamper-proof</p>
          <Button
            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
            onClick={handleApplyMethod}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply Method"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
