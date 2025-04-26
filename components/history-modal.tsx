"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, ShieldCheck, Truck, User, Zap } from "lucide-react"

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
}

export function HistoryModal({ isOpen, onClose, productId, productName }: HistoryModalProps) {
  // Mock history data
  const historyEvents = [
    {
      date: "2023-09-28",
      event: "Ownership Verified",
      description: "Current owner verified product authenticity",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
    },
    {
      date: "2023-08-15",
      event: "Ownership Transfer",
      description: "Product ownership transferred to Alex Johnson",
      icon: <User className="h-5 w-5 text-blue-500" />,
    },
    {
      date: "2023-07-22",
      event: "Blockchain Registration",
      description: "Product registered on Ethereum blockchain",
      icon: <Zap className="h-5 w-5 text-purple-500" />,
    },
    {
      date: "2023-06-10",
      event: "Retailer Delivery",
      description: "Product delivered to authorized retailer",
      icon: <Truck className="h-5 w-5 text-yellow-500" />,
    },
    {
      date: "2023-05-15",
      event: "Manufacturing",
      description: "Product manufactured and NFC tag embedded",
      icon: <Clock className="h-5 w-5 text-gray-500" />,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>History for {productName}</DialogTitle>
          <DialogDescription className="text-white/70">Complete timeline of events for this product.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>

            {/* Timeline events */}
            <div className="space-y-6">
              {historyEvents.map((event, index) => (
                <div key={index} className="relative flex items-start gap-4 pl-9">
                  <div className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-black border border-white/10">
                    {event.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{event.event}</h4>
                      <span className="text-xs text-white/50">{event.date}</span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="border-white/10" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
