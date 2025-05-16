"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useAnalytics } from "./analytics-provider"

export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackPageView, isLoaded } = useAnalytics()

  useEffect(() => {
    if (!isLoaded) return

    // Construct the URL from pathname and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Track the page view
    trackPageView(url)
  }, [pathname, searchParams, trackPageView, isLoaded])

  return null
}
