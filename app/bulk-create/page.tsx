"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BulkProductCreation } from "@/components/bulk-product-creation"
import { SuccessModal } from "@/components/success-modal"

export default function BulkCreatePage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdProducts, setCreatedProducts] = useState<any[]>([])

  const handleSubmit = (products: any[]) => {
    console.log("Creating products:", products)
    setCreatedProducts(products)
    setShowSuccessModal(true)
  }

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
          <h1 className="text-3xl font-bold mb-2">Bulk Product Creation</h1>
          <p className="text-white/70">Create multiple phygital products at once</p>
        </div>

        <BulkProductCreation onSubmit={handleSubmit} onCancel={() => window.history.back()} />
      </main>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Products Created Successfully"
        description={`${createdProducts.length} products have been created and are ready to be managed.`}
        actions={[
          {
            label: "View Products",
            href: "/dashboard/products",
            primary: true,
          },
          {
            label: "Back to Dashboard",
            href: "/dashboard",
            primary: false,
          },
        ]}
      />
    </div>
  )
}
