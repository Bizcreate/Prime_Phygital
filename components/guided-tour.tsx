"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

interface TourStep {
  target: string
  title: string
  content: string
  placement?: "top" | "right" | "bottom" | "left"
}

interface GuidedTourProps {
  steps: TourStep[]
  onComplete?: () => void
  isOpen?: boolean
  onClose?: () => void
}

export function GuidedTour({ steps, onComplete, isOpen = false, onClose }: GuidedTourProps) {
  const [isTourActive, setIsTourActive] = useState(isOpen)
  const [currentStep, setCurrentStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 })
  const [placement, setPlacement] = useState<"top" | "right" | "bottom" | "left">("bottom")

  useEffect(() => {
    setIsTourActive(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (!isTourActive || steps.length === 0) return

    const step = steps[currentStep]
    const targetElement = document.querySelector(step.target)

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      const stepPlacement = step.placement || "bottom"
      setPlacement(stepPlacement)

      // Add highlight to the target element
      targetElement.classList.add("tour-highlight")

      // Calculate position based on placement
      let top = 0
      let left = 0
      let arrowTop = 0
      let arrowLeft = 0

      switch (stepPlacement) {
        case "top":
          top = rect.top - 10 - 150 // 150px is the approximate height of the tour card
          left = rect.left + rect.width / 2 - 150 // 150px is half the width of the tour card
          arrowTop = 150
          arrowLeft = 150
          break
        case "right":
          top = rect.top + rect.height / 2 - 75
          left = rect.right + 10
          arrowTop = 75
          arrowLeft = -10
          break
        case "bottom":
          top = rect.bottom + 10
          left = rect.left + rect.width / 2 - 150
          arrowTop = -10
          arrowLeft = 150
          break
        case "left":
          top = rect.top + rect.height / 2 - 75
          left = rect.left - 10 - 300 // 300px is the approximate width of the tour card
          arrowTop = 75
          arrowLeft = 300
          break
      }

      // Adjust position to ensure the tour card is within viewport
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (left < 20) left = 20
      if (left + 300 > viewportWidth - 20) left = viewportWidth - 320

      if (top < 20) top = 20
      if (top + 150 > viewportHeight - 20) top = viewportHeight - 170

      setPosition({ top, left })
      setArrowPosition({ top: arrowTop, left: arrowLeft })

      // Cleanup function to remove highlight
      return () => {
        targetElement.classList.remove("tour-highlight")
      }
    }
  }, [isTourActive, currentStep, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsTourActive(false)
    if (onComplete) onComplete()
  }

  const handleClose = () => {
    setIsTourActive(false)
    if (onClose) onClose()
  }

  if (!isTourActive || steps.length === 0) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-neon-purple text-white shadow-lg hover:bg-neon-purple/90"
        onClick={() => setIsTourActive(true)}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      <Card
        className="fixed z-50 w-[300px] shadow-xl glass-panel border-white/10"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div
          className={`absolute w-4 h-4 bg-black rotate-45 border-white/10 ${
            placement === "top"
              ? "border-b border-r"
              : placement === "right"
                ? "border-l border-b"
                : placement === "bottom"
                  ? "border-t border-l"
                  : "border-t border-r"
          }`}
          style={{
            top: `${arrowPosition.top}px`,
            left: `${arrowPosition.left}px`,
          }}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/70">{steps[currentStep].content}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
            onClick={handleNext}
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              "Finish"
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
