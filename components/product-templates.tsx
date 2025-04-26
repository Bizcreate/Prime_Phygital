"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Save, Trash2, Edit, Copy } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  type: string
  blockchain: string
  nftType: string
  nfcContent: string
  transferable: boolean
  theftProtection: boolean
  historyTracking: boolean
  wearToEarn: boolean
  socialSharing: boolean
  communityAccess: boolean
  privacyLevel: string
}

interface ProductTemplatesProps {
  onSelectTemplate: (template: Template) => void
  onSaveCurrentAsTemplate: () => void
  currentSettings: Partial<Template>
}

export function ProductTemplates({
  onSelectTemplate,
  onSaveCurrentAsTemplate,
  currentSettings,
}: ProductTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Standard Apparel",
      description: "Default template for clothing items",
      type: "apparel",
      blockchain: "polygon",
      nftType: "erc1155",
      nfcContent: "url",
      transferable: true,
      theftProtection: true,
      historyTracking: true,
      wearToEarn: false,
      socialSharing: true,
      communityAccess: false,
      privacyLevel: "balanced",
    },
    {
      id: "2",
      name: "Premium Collectible",
      description: "High-end collectible with all features enabled",
      type: "collectible",
      blockchain: "ethereum",
      nftType: "erc721",
      nfcContent: "blockchain",
      transferable: true,
      theftProtection: true,
      historyTracking: true,
      wearToEarn: true,
      socialSharing: true,
      communityAccess: true,
      privacyLevel: "public",
    },
    {
      id: "3",
      name: "Limited Edition Footwear",
      description: "Template for limited edition sneakers",
      type: "footwear",
      blockchain: "solana",
      nftType: "erc1155",
      nfcContent: "url",
      transferable: true,
      theftProtection: true,
      historyTracking: true,
      wearToEarn: true,
      socialSharing: true,
      communityAccess: false,
      privacyLevel: "balanced",
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
  })

  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(
        templates.map((template) =>
          template.id === editingTemplate.id
            ? { ...editingTemplate, name: newTemplate.name, description: newTemplate.description }
            : template,
        ),
      )
    } else {
      // Create new template from current settings
      const template: Template = {
        id: Date.now().toString(),
        name: newTemplate.name,
        description: newTemplate.description,
        type: currentSettings.type || "other",
        blockchain: currentSettings.blockchain || "ethereum",
        nftType: currentSettings.nftType || "erc1155",
        nfcContent: currentSettings.nfcContent || "url",
        transferable: currentSettings.transferable !== undefined ? currentSettings.transferable : true,
        theftProtection: currentSettings.theftProtection !== undefined ? currentSettings.theftProtection : true,
        historyTracking: currentSettings.historyTracking !== undefined ? currentSettings.historyTracking : true,
        wearToEarn: currentSettings.wearToEarn !== undefined ? currentSettings.wearToEarn : false,
        socialSharing: currentSettings.socialSharing !== undefined ? currentSettings.socialSharing : false,
        communityAccess: currentSettings.communityAccess !== undefined ? currentSettings.communityAccess : false,
        privacyLevel: currentSettings.privacyLevel || "balanced",
      }
      setTemplates([...templates, template])
    }
    setNewTemplate({ name: "", description: "" })
    setEditingTemplate(null)
    setIsDialogOpen(false)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
  }

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template)
    setNewTemplate({
      name: template.name,
      description: template.description,
    })
    setIsDialogOpen(true)
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Product Templates</CardTitle>
            <CardDescription>Save and reuse product configurations</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingTemplate(null)
                  setNewTemplate({ name: "", description: "" })
                }}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" /> New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-white/10">
              <DialogHeader>
                <DialogTitle>{editingTemplate ? "Edit Template" : "Save as Template"}</DialogTitle>
                <DialogDescription>
                  {editingTemplate
                    ? "Update the template details"
                    : "Save your current product configuration as a reusable template"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    placeholder="e.g. Premium Footwear"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Input
                    id="template-description"
                    placeholder="e.g. Template for high-end sneakers"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-white/10">
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveTemplate}
                  className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                >
                  <Save className="h-4 w-4 mr-2" /> {editingTemplate ? "Update Template" : "Save Template"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="mb-3 sm:mb-0">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-white/70">{template.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">{template.type}</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">{template.blockchain}</span>
                  {template.wearToEarn && (
                    <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">Wear-to-Earn</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditTemplate(template)}
                  className="border-white/10"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectTemplate(template)}
                  className="border-white/10"
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Use</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="border-white/10 hover:bg-red-900/20 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <Button variant="outline" onClick={onSaveCurrentAsTemplate} className="w-full border-white/10">
          <Save className="h-4 w-4 mr-2" /> Save Current Configuration as Template
        </Button>
      </CardFooter>
    </Card>
  )
}
