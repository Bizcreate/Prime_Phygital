"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, BellOff, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface PushNotificationsProps {
  onSubscribe?: () => void
  onUnsubscribe?: () => void
}

export function PushNotifications({ onSubscribe, onUnsubscribe }: PushNotificationsProps) {
  const [permission, setPermission] = useState<NotificationPermission | "default">("default")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      setIsSupported(false)
      return
    }

    // Check if service workers are supported
    if (!("serviceWorker" in navigator)) {
      setIsSupported(false)
      return
    }

    // Check the current permission state
    setPermission(Notification.permission)

    // Check if already subscribed
    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.pushManager.getSubscription()
      })
      .then((subscription) => {
        setIsSubscribed(!!subscription)
      })
      .catch((error) => {
        console.error("Error checking subscription:", error)
      })
  }, [])

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result)
      if (result === "granted") {
        subscribeUserToPush()
      } else {
        toast({
          title: "Notification permission denied",
          description: "You won't receive push notifications for important events.",
          action: (
            <ToastAction altText="Try again" onClick={requestPermission}>
              Try again
            </ToastAction>
          ),
        })
      }
    })
  }

  const subscribeUserToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready

      // Get the server's public key
      // In a real app, you would fetch this from your server
      const publicKey = "BLVYgI5W8_YPxwoySG0QYfcjzYTxW1x8XkRqpw1m9E0Yk8xLOUSVFMmOgNlwgA_DF_ZAHJcHKHpc4x9iIy2-5v0"

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      // Send the subscription to your server
      // In a real app, you would send this to your backend
      console.log("Push subscription:", JSON.stringify(subscription))

      setIsSubscribed(true)

      toast({
        title: "Notifications enabled",
        description: "You will now receive push notifications for important events.",
      })

      if (onSubscribe) onSubscribe()
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error)
      toast({
        title: "Subscription failed",
        description: "There was an error enabling push notifications.",
        variant: "destructive",
      })
    }
  }

  const unsubscribeFromPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        await subscription.unsubscribe()

        // In a real app, you would notify your server about the unsubscription
        console.log("Unsubscribed from push notifications")

        setIsSubscribed(false)

        toast({
          title: "Notifications disabled",
          description: "You will no longer receive push notifications.",
        })

        if (onUnsubscribe) onUnsubscribe()
      }
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error)
      toast({
        title: "Unsubscribe failed",
        description: "There was an error disabling push notifications.",
        variant: "destructive",
      })
    }
  }

  // Helper function to convert a base64 string to Uint8Array
  // This is needed for the applicationServerKey
  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  if (!isSupported) {
    return (
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Receive real-time updates about your phygital products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <BellOff className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Not Supported</h3>
              <p className="text-sm text-white/70">
                Your browser doesn't support push notifications. Please try a different browser.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>Push Notifications</CardTitle>
        <CardDescription>Receive real-time updates about your phygital products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          {permission === "default" && !isSubscribed && (
            <div className="text-center">
              <Bell className="h-12 w-12 text-neon-purple mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Enable Notifications</h3>
              <p className="text-sm text-white/70 mb-4">
                Get instant alerts when your products are scanned, transferred, or authenticated.
              </p>
              <Button
                onClick={requestPermission}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                Enable Push Notifications
              </Button>
            </div>
          )}

          {permission === "denied" && (
            <div className="text-center">
              <BellOff className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Notifications Blocked</h3>
              <p className="text-sm text-white/70 mb-4">
                You've blocked notifications for this site. Please update your browser settings to enable notifications.
              </p>
              <Button variant="outline" className="border-white/10" onClick={requestPermission}>
                Try Again
              </Button>
            </div>
          )}

          {permission === "granted" && (
            <div className="text-center">
              {isSubscribed ? (
                <>
                  <div className="rounded-full bg-green-500/20 p-3 mx-auto mb-4 w-fit">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Notifications Enabled</h3>
                  <p className="text-sm text-white/70 mb-4">
                    You'll receive push notifications for important events related to your phygital products.
                  </p>
                  <Button variant="outline" className="border-white/10" onClick={unsubscribeFromPush}>
                    Disable Notifications
                  </Button>
                </>
              ) : (
                <>
                  <Bell className="h-12 w-12 text-neon-purple mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Almost There</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Permission granted! Click below to complete the subscription process.
                  </p>
                  <Button
                    onClick={subscribeUserToPush}
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                  >
                    Subscribe to Notifications
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="text-xs text-white/50 w-full">
          <p>You'll be notified about:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Product scans and authentications</li>
            <li>Ownership transfer requests</li>
            <li>Security alerts and suspicious activities</li>
            <li>Platform updates and new features</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  )
}
