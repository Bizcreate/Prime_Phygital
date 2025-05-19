"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
  message?: string
}

export function ErrorFallback({ error, resetErrorBoundary, message = "Something went wrong" }: ErrorFallbackProps) {
  return (
    <Card className="w-full max-w-md mx-auto my-8 border-red-300 bg-red-50 text-red-900">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle>Error</CardTitle>
        </div>
        <CardDescription className="text-red-800">{message}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-sm bg-red-100 p-3 rounded-md overflow-auto">
            {error.message || "An unknown error occurred"}
          </div>
        )}
        <p className="mt-4 text-sm">Please try again or contact support if the problem persists.</p>
      </CardContent>
      <CardFooter>
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
