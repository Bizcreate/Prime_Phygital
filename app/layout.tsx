import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { PageViewTracker } from "@/components/analytics/page-view-tracker"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prime Phygital Platform",
  description: "Connect physical products to digital experiences",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          <Suspense>
            <ErrorBoundary>
              {children}
              <PageViewTracker />
            </ErrorBoundary>
          </Suspense>
          <Toaster />
        </AnalyticsProvider>
      </body>
    </html>
  )
}
