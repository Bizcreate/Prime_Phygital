"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import Script from "next/script"

type AnalyticsContextType = {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (url: string) => void
  isLoaded: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  trackPageView: () => {},
  isLoaded: false,
})

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Mock analytics tracking functions
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!isLoaded) return

    console.log(`[Analytics] Event: ${eventName}`, properties)
    // In a real implementation, you would call your analytics service here
    // Example: window.analytics.track(eventName, properties)
  }

  const trackPageView = (url: string) => {
    if (!isLoaded) return

    console.log(`[Analytics] Page View: ${url}`)
    // In a real implementation, you would call your analytics service here
    // Example: window.analytics.page(url)
  }

  // Set analytics as loaded when the script is loaded
  const handleAnalyticsLoad = () => {
    setIsLoaded(true)
    console.log("[Analytics] Initialized")
  }

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView, isLoaded }}>
      {/* This would be replaced with your actual analytics script */}
      <Script id="analytics-script" strategy="afterInteractive" onLoad={handleAnalyticsLoad}>
        {`
          console.log("[Analytics] Script loaded");
          // This would be your actual analytics initialization code
          // Example: window.analytics.init({ apiKey: 'your-api-key' })
        `}
      </Script>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => useContext(AnalyticsContext)
