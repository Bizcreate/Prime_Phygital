"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserPlus, Mail, QrCode, Smartphone } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface TransferOwnershipModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  currentOwner: string
}

export function TransferOwnershipModal({
  isOpen,
  onClose,
  productId,
  productName,
  currentOwner,
}: TransferOwnershipModalProps) {
  const [step, setStep] = useState(1)
  const [transferMethod, setTransferMethod] = useState("email")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientWallet, setRecipientWallet] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return

      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedCode(code)
      setStep(2)
    } else if (step === 2) {
      if (!validateStep2()) return
      setStep(3)
    }
  }

  const validateStep1 = () => {
    if (transferMethod === "email" && !recipientEmail) {
      toast({
        title: "Email Required",
        description: "Please enter the recipient's email address.",
        variant: "destructive",
      })
      return false
    }

    if (transferMethod === "wallet" && !recipientWallet) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter the recipient's wallet address.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const validateStep2 = () => {
    if (confirmationCode !== generatedCode) {
      toast({
        title: "Invalid Code",
        description: "The confirmation code you entered is incorrect.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleTransfer = () => {
    setIsTransferring(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Transferring ownership:", {
        productId,
        transferMethod,
        recipient: transferMethod === "email" ? recipientEmail : recipientWallet,
      })
      setIsTransferring(false)
      toast({
        title: "Ownership Transferred",
        description: `${productName} has been transferred successfully.`,
      })
      onClose()
      // Reset form and step
      setStep(1)
      setTransferMethod("email")
      setRecipientEmail("")
      setRecipientWallet("")
      setConfirmationCode("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Ownership</DialogTitle>
          <DialogDescription className="text-white/70">
            Transfer ownership of {productName} to another user.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Current Owner</Label>
                <div className="flex items-center space-x-3 mt-2 p-3 rounded-md bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center">
                    <span className="text-sm font-bold">{currentOwner.charAt(0)}</span>
                  </div>
                  <span>{currentOwner}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transfer Method</Label>
                <RadioGroup value={transferMethod} onValueChange={setTransferMethod} className="space-y-3 mt-2">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="email" id="email" className="mt-1" />
                    <div className="grid gap-1.5 w-full">
                      <Label htmlFor="email" className="font-medium cursor-pointer flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Label>
                      {transferMethod === "email" && (
                        <div className="mt-2">
                          <Input
                            placeholder="recipient@example.com"
                            className="bg-white/5 border-white/10"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="wallet" id="wallet" className="mt-1" />
                    <div className="grid gap-1.5 w-full">
                      <Label htmlFor="wallet" className="font-medium cursor-pointer flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Wallet Address
                      </Label>
                      {transferMethod === "wallet" && (
                        <div className="mt-2">
                          <Input
                            placeholder="0x..."
                            className="bg-white/5 border-white/10"
                            value={recipientWallet}
                            onChange={(e) => setRecipientWallet(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="qr" id="qr" className="mt-1" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="qr" className="font-medium cursor-pointer flex items-center">
                        <QrCode className="h-4 w-4 mr-2" />
                        QR Code (In Person)
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-md bg-white/5 p-4 text-center">
                <p className="text-sm text-white/70 mb-2">Verification code sent to:</p>
                <p className="font-medium">
                  {transferMethod === "email"
                    ? recipientEmail
                    : transferMethod === "wallet"
                      ? recipientWallet
                      : "QR Code"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmationCode">Enter Confirmation Code</Label>
                <Input
                  id="confirmationCode"
                  placeholder="6-digit code"
                  className="bg-white/5 border-white/10 text-center text-lg tracking-widest"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-white/50 text-center mt-1">
                  For demo purposes, the code is: {generatedCode}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-md bg-white/5 p-4">
                <h3 className="font-semibold mb-2">Transfer Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Product:</span>
                    <span>{productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">From:</span>
                    <span>{currentOwner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">To:</span>
                    <span>
                      {transferMethod === "email"
                        ? recipientEmail
                        : transferMethod === "wallet"
                          ? recipientWallet
                          : "In-person transfer"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Method:</span>
                    <span>
                      {transferMethod === "email" ? "Email" : transferMethod === "wallet" ? "Wallet" : "QR Code"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-yellow-500/10 p-4 border border-yellow-500/20">
                <p className="text-sm text-white/70">
                  By confirming this transfer, you are permanently transferring ownership of this item. This action
                  cannot be undone.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
          {step === 1 ? (
            <>
              <Button variant="outline" className="border-white/10" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue" onClick={handleNext}>
                Next
              </Button>
            </>
          ) : step === 2 ? (
            <>
              <Button variant="outline" className="border-white/10" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue" onClick={handleNext}>
                Verify
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-white/10" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                className="bg-gradient-to-r from-neon-purple to-neon-blue"
                onClick={handleTransfer}
                disabled={isTransferring}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isTransferring ? "Processing..." : "Confirm Transfer"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
