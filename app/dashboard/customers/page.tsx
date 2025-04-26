"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActionsMenu } from "@/components/actions-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Mail, AlertCircle } from "lucide-react"

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[0] | null>(null)
  const [dialogType, setDialogType] = useState<"profile" | "email" | "products" | "edit" | "delete" | null>(null)

  const customers = [
    {
      id: "cus_001",
      name: "Alex Johnson",
      email: "alex@example.com",
      lastActive: "2024-04-22",
      joined: "2023-10-15",
      products: 3,
    },
    {
      id: "cus_002",
      name: "Taylor Swift",
      email: "taylor@example.com",
      lastActive: "2024-04-20",
      joined: "2023-11-05",
      products: 7,
    },
    {
      id: "cus_003",
      name: "Jamie Lee",
      email: "jamie@example.com",
      lastActive: "2024-04-18",
      joined: "2023-12-20",
      products: 2,
    },
    {
      id: "cus_004",
      name: "Morgan Chen",
      email: "morgan@example.com",
      lastActive: "2024-03-10",
      joined: "2024-01-20",
      products: 5,
    },
  ]

  const handleViewProfile = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer)
    setDialogType("profile")
  }

  const handleSendEmail = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer)
    setDialogType("email")
  }

  const handleViewProducts = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer)
    setDialogType("products")
  }

  const handleEdit = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer)
    setDialogType("edit")
  }

  const handleDelete = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer)
    setDialogType("delete")
  }

  const closeDialog = () => {
    setDialogType(null)
    setSelectedCustomer(null)
  }

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      toast({
        title: "Customer Deleted",
        description: `${selectedCustomer.name} has been removed from your customers.`,
      })
      closeDialog()
    }
  }

  const handleSendEmailSubmit = () => {
    if (selectedCustomer) {
      toast({
        title: "Email Sent",
        description: `Email has been sent to ${selectedCustomer.email}`,
      })
      closeDialog()
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-white/70">
          Manage your customer relationships and track their engagement with your products.
        </p>
      </div>

      <Card className="border-white/10 bg-black/30">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>A list of all customers who have interacted with your products.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.lastActive}</TableCell>
                  <TableCell>{customer.joined}</TableCell>
                  <TableCell className="text-right">
                    <ActionsMenu
                      onViewProfile={() => handleViewProfile(customer)}
                      onSendEmail={() => handleSendEmail(customer)}
                      onViewProducts={() => handleViewProducts(customer)}
                      onEdit={() => handleEdit(customer)}
                      onDelete={() => handleDelete(customer)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Profile Dialog */}
      <Dialog open={dialogType === "profile"} onOpenChange={() => dialogType === "profile" && closeDialog()}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>Detailed information about this customer.</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">Basic Information</h4>
                <div className="rounded bg-white/5 p-3">
                  <p className="text-sm">
                    <span className="text-white/50">Name:</span> {selectedCustomer.name}
                  </p>
                  <p className="text-sm">
                    <span className="text-white/50">Email:</span> {selectedCustomer.email}
                  </p>
                  <p className="text-sm">
                    <span className="text-white/50">Customer ID:</span> {selectedCustomer.id}
                  </p>
                  <p className="text-sm">
                    <span className="text-white/50">Joined:</span> {selectedCustomer.joined}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Product Engagement</h4>
                <div className="rounded bg-white/5 p-3">
                  <p className="text-sm">
                    <span className="text-white/50">Products:</span> {selectedCustomer.products}
                  </p>
                  <p className="text-sm">
                    <span className="text-white/50">Last Active:</span> {selectedCustomer.lastActive}
                  </p>
                </div>
              </div>
            </div>
          )}
          <Button variant="outline" onClick={closeDialog}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={dialogType === "email"} onOpenChange={() => dialogType === "email" && closeDialog()}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>Send an email to {selectedCustomer?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-yellow-900/20 border border-yellow-900/30 p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-500">Email Integration Required</p>
                <p className="text-xs text-yellow-500/80 mt-1">
                  Email sending functionality requires connecting to an email service provider. This feature will be
                  available soon.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Email Preview</h4>
              <div className="rounded bg-white/5 p-3">
                <p className="text-sm">
                  <span className="text-white/50">To:</span> {selectedCustomer?.email}
                </p>
                <p className="text-sm">
                  <span className="text-white/50">Subject:</span> Update from Prime Phygital
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleSendEmailSubmit} className="gap-2">
              <Mail className="h-4 w-4" /> Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Products Dialog */}
      <Dialog open={dialogType === "products"} onOpenChange={() => dialogType === "products" && closeDialog()}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.name}'s Products</DialogTitle>
            <DialogDescription>Products owned by this customer.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedCustomer && selectedCustomer.products > 0 ? (
              <div className="space-y-3">
                {Array.from({ length: Math.min(selectedCustomer.products, 3) }).map((_, index) => (
                  <div key={index} className="flex items-center p-2 rounded bg-white/5">
                    <div className="w-12 h-12 bg-gray-800 rounded mr-3"></div>
                    <div>
                      <p className="font-medium">Product {index + 1}</p>
                      <p className="text-sm text-white/70">Last scanned: Recently</p>
                    </div>
                  </div>
                ))}
                {selectedCustomer.products > 3 && (
                  <p className="text-sm text-center text-white/50">+{selectedCustomer.products - 3} more products</p>
                )}
              </div>
            ) : (
              <p className="text-center text-white/70">This customer has no products.</p>
            )}
          </div>
          <Button variant="outline" onClick={closeDialog}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={dialogType === "edit"} onOpenChange={() => dialogType === "edit" && closeDialog()}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Edit customer information.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-white/70">Edit functionality coming soon.</p>
          </div>
          <Button variant="outline" onClick={closeDialog}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={dialogType === "delete"} onOpenChange={() => dialogType === "delete" && closeDialog()}>
        <DialogContent className="sm:max-w-md bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCustomer?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
