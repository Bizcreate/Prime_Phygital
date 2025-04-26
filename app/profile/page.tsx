"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProfileInventory } from "@/components/profile-inventory"
import { PushNotifications } from "@/components/push-notifications"
import { TokenStaking } from "@/components/token-staking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-black/50 backdrop-blur-xl px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile & Inventory</h1>
          <p className="text-white/70">Manage your profile and view your phygital products</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="bg-white/5 mb-6">
            <TabsTrigger value="profile">Profile & Inventory</TabsTrigger>
            <TabsTrigger value="staking">Token Staking</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProfileInventory />
              </div>
              <div>
                <PushNotifications />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="staking">
            <TokenStaking />
          </TabsContent>

          <TabsContent value="notifications">
            <div className="lg:max-w-2xl">
              <PushNotifications />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
