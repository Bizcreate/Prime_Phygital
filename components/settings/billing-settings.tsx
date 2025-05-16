"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function BillingSettings() {
  const [paymentMethod, setPaymentMethod] = useState("visa")

  const handleUpgradePlan = () => {
    console.log("Upgrading plan")
    // You would typically redirect to a pricing page or open a modal
  }

  const handleViewBillingHistory = () => {
    console.log("Viewing billing history")
    // You would typically redirect to a billing history page
  }

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      console.log("Cancelling subscription")
      // You would typically call your API to cancel the subscription
    }
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Professional Plan</h3>
              <p className="text-sm text-white/70">$1,499/month</p>
            </div>
            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">Active</Badge>
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <p>Next billing date: May 15, 2024</p>
            <p>Up to 1,000 NFC tags</p>
            <p>Multi-chain support (3 chains)</p>
            <p>Wear-to-earn functionality</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent className="glass-panel border-white/10">
              <SelectItem value="visa">Visa ending in 4242</SelectItem>
              <SelectItem value="mastercard">Mastercard ending in 5555</SelectItem>
              <SelectItem value="new">Add new payment method</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90" onClick={handleUpgradePlan}>
          Upgrade Plan
        </Button>
        <Button variant="outline" className="border-white/10" onClick={handleViewBillingHistory}>
          View Billing History
        </Button>
        <Button
          variant="outline"
          className="border-white/10 text-red-500 hover:text-red-400"
          onClick={handleCancelSubscription}
        >
          Cancel Subscription
        </Button>
      </CardFooter>
    </Card>
  )
}

// Add the Label component since it's used in this file
function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}
