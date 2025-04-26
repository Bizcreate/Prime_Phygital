"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, Tag, Smartphone, Database, Shield, Trash } from "lucide-react"

// Sample template data
const sampleTemplates = [
  {
    id: "1",
    name: "Limited Edition Sneakers",
    description: "Template for limited edition footwear products",
    type: "footwear",
    blockchain: "ethereum",
    nftType: "erc1155",
    nfcContent: "url",
    transferable: true,
    theftProtection: true,
    historyTracking: true,
    wearToEarn: true,
    socialSharing: true,
    communityAccess: false,
    privacyLevel: "balanced",
    image: "/neon-streak-sneakers.png",
  },
  {
    id: "2",
    name: "Designer Handbag",
    description: "Template for luxury handbags and accessories",
    type: "accessory",
    blockchain: "polygon",
    nftType: "erc721",
    nfcContent: "blockchain",
    transferable: true,
    theftProtection: true,
    historyTracking: true,
    wearToEarn: false,
    socialSharing: true,
    communityAccess: true,
    privacyLevel: "private",
    image: "/elegant-leather-tote.png",
  },
  {
    id: "3",
    name: "Collectible Watch",
    description: "Template for limited edition watches",
    type: "accessory",
    blockchain: "solana",
    nftType: "erc721",
    nfcContent: "static",
    transferable: true,
    theftProtection: true,
    historyTracking: true,
    wearToEarn: false,
    socialSharing: false,
    communityAccess: false,
    privacyLevel: "private",
    image: "/elegant-timepiece.png",
  },
]

interface ProductTemplatesProps {
  onSelectTemplate: (template: any) => void
  onSaveCurrentAsTemplate: () => void
  currentSettings: any
}

export function ProductTemplates({
  onSelectTemplate,
  onSaveCurrentAsTemplate,
  currentSettings,
}: ProductTemplatesProps) {
  const [templates, setTemplates] = useState(sampleTemplates)
  const [newTemplate, setNewTemplate] = useState({ name: "", description: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSaveTemplate = () => {
    if (!newTemplate.name) return

    const template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      ...currentSettings,
      image: "/assorted-products-display.png",
    }

    setTemplates([...templates, template])
    setNewTemplate({ name: "", description: "" })
    setIsDialogOpen(false)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>Product Templates</CardTitle>
        <CardDescription>Save and reuse product configurations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="bg-white/5 border-white/10 overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-black to-gray-800">
                {template.image && (
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-white/70 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {template.type || "Not specified"}
                  </div>
                  <div className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                    <Database className="h-3 w-3 mr-1" />
                    {template.blockchain || "Not specified"}
                  </div>
                  <div className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                    <Smartphone className="h-3 w-3 mr-1" />
                    {template.nfcContent}
                  </div>
                  <div className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    {template.privacyLevel}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/10 hover:bg-white/10"
                  onClick={() => onSelectTemplate(template)}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-white/10" onClick={onSaveCurrentAsTemplate}>
              <Save className="h-4 w-4 mr-2" />
              Save Current as Template
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10">
            <DialogHeader>
              <DialogTitle>Save as Template</DialogTitle>
              <DialogDescription>
                Save your current product configuration as a template for future use.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="e.g. Limited Edition Sneakers"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Textarea
                  id="template-description"
                  placeholder="Describe what this template is for..."
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-white/10" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveTemplate}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                Save Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="default" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Template
        </Button>
      </CardFooter>
    </Card>
  )
}
