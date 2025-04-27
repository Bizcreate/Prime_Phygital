"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import NProgress from "nprogress"

// Import the CSS for the progress bar
import "nprogress/nprogress.css"

// Configure the progress bar
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: "ease",
  speed: 300,
})

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // When the route changes, start the progress bar
    NProgress.start()

    // When the component mounts or updates, complete the progress bar
    const timer = setTimeout(() => {
      NProgress.done()
    }, 300)

    return () => {
      clearTimeout(timer)
      NProgress.remove()
    }
  }, [pathname, searchParams])

  return null
}
