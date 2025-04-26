"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ReportStolenModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  serialNumber: string
}

export function ReportStolenModal({ isOpen, onClose, productId, productName, serialNumber }: ReportStolenModalProps) {
  const [formData, setFormData] = useState({
    contactEmail: "",
    incidentDate: "",
    incidentLocation: "",
    description: "",
    policeReport: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Submitting report:", formData)
      setIsSubmitting(false)
      toast({
        title: "Report Submitted",
        description: "Your stolen item report has been submitted successfully.",
      })
      onClose()
      // Reset form and step
      setFormData({
        contactEmail: "",
        incidentDate: "",
        incidentLocation: "",
        description: "",
        policeReport: "",
      })
      setStep(1)
    }, 1500)
  }

  const validateStep1 = () => {
    if (!formData.contactEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your contact email.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.incidentDate) {
      toast({
        title: "Date Required",
        description: "Please enter the date when the item was stolen.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Report Stolen Item
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Report {productName} (SN: {serialNumber}) as stolen.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-white/5 border-white/10"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDate">Date of Theft</Label>
                <Input
                  id="incidentDate"
                  name="incidentDate"
                  type="date"
                  className="bg-white/5 border-white/10"
                  value={formData.incidentDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentLocation">Location of Theft</Label>
                <Input
                  id="incidentLocation"
                  name="incidentLocation"
                  placeholder="City, Country"
                  className="bg-white/5 border-white/10"
                  value={formData.incidentLocation}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide details about how the item was stolen..."
                  className="bg-white/5 border-white/10 min-h-[100px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="policeReport">Police Report Number (if available)</Label>
                <Input
                  id="policeReport"
                  name="policeReport"
                  placeholder="e.g., CR-12345-2023"
                  className="bg-white/5 border-white/10"
                  value={formData.policeReport}
                  onChange={handleChange}
                />
              </div>

              <div className="rounded-md bg-red-500/10 p-4 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-500">Important Notice</h3>
                    <p className="text-xs text-white/70 mt-1">
                      Filing a false report is a serious offense. By submitting this report, you confirm that all
                      information provided is true and accurate to the best of your knowledge.
                    </p>
                  </div>
                </div>
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
              <Button
                className="bg-gradient-to-r from-neon-purple to-neon-blue"
                onClick={() => {
                  if (validateStep1()) {
                    setStep(2)
                  }
                }}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-white/10" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleSubmit} disabled={isSubmitting}>
                <Shield className="h-4 w-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
