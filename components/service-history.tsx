"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, PenToolIcon as Tool, Shield, User, Plus, FileCheck, Upload, X } from "lucide-react"
import { ServiceVerificationMethods } from "./service-verification-methods"

interface ServiceRecord {
  id: string
  date: string
  type: string
  description: string
  provider: string
  location: string
  verified: boolean
  verificationMethod?: string
  attachments?: string[]
  cost?: string
  warranty?: string
}

interface ServiceHistoryProps {
  productId: string
  productType: string
  serviceRecords?: ServiceRecord[]
  onAddRecord?: (record: ServiceRecord) => void
  onDeleteRecord?: (recordId: string) => void
  readOnly?: boolean
}

export function ServiceHistory({
  productId,
  productType = "standard",
  serviceRecords: initialRecords = [],
  onAddRecord,
  onDeleteRecord,
  readOnly = false,
}: ServiceHistoryProps) {
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(initialRecords)
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [newRecord, setNewRecord] = useState<Partial<ServiceRecord>>({
    date: new Date().toISOString().split("T")[0],
    type: "maintenance",
    description: "",
    provider: "",
    location: "",
    verified: false,
    verificationMethod: "blockchain",
  })
  const [attachments, setAttachments] = useState<File[]>([])

  const getServiceTypes = () => {
    switch (productType) {
      case "watch":
        return [
          { value: "maintenance", label: "Regular Maintenance" },
          { value: "repair", label: "Repair" },
          { value: 'certification", label: ' },
          { value: "repair", label: "Repair" },
          { value: "certification", label: "Certification" },
          { value: "polishing", label: "Polishing & Refinishing" },
          { value: "authentication", label: "Authentication" },
        ]
      case "vehicle":
        return [
          { value: "maintenance", label: "Regular Maintenance" },
          { value: "repair", label: "Repair" },
          { value: "parts", label: "Parts Replacement" },
          { value: "inspection", label: "Inspection" },
          { value: "modification", label: "Modification" },
          { value: "detailing", label: "Detailing" },
        ]
      case "realestate":
        return [
          { value: "renovation", label: "Renovation" },
          { value: "repair", label: "Repair" },
          { value: "inspection", label: "Inspection" },
          { value: "upgrade", label: "Upgrade" },
          { value: "maintenance", label: "Maintenance" },
          { value: "addition", label: "Addition" },
        ]
      default:
        return [
          { value: "maintenance", label: "Maintenance" },
          { value: "repair", label: "Repair" },
          { value: "cleaning", label: "Cleaning" },
          { value: "inspection", label: "Inspection" },
          { value: "other", label: "Other" },
        ]
    }
  }

  const handleAddRecord = () => {
    const record: ServiceRecord = {
      id: Date.now().toString(),
      date: newRecord.date || new Date().toISOString().split("T")[0],
      type: newRecord.type || "maintenance",
      description: newRecord.description || "",
      provider: newRecord.provider || "",
      location: newRecord.location || "",
      verified: newRecord.verified || false,
      verificationMethod: newRecord.verificationMethod || "blockchain",
      attachments: attachments.map((file) => URL.createObjectURL(file)),
      cost: newRecord.cost,
      warranty: newRecord.warranty,
    }

    const updatedRecords = [...serviceRecords, record]
    setServiceRecords(updatedRecords)

    if (onAddRecord) {
      onAddRecord(record)
    }

    // Reset form
    setNewRecord({
      date: new Date().toISOString().split("T")[0],
      type: "maintenance",
      description: "",
      provider: "",
      location: "",
      verified: false,
      verificationMethod: "blockchain",
    })
    setAttachments([])
    setIsAddingRecord(false)
  }

  const handleDeleteRecord = (id: string) => {
    const updatedRecords = serviceRecords.filter((record) => record.id !== id)
    setServiceRecords(updatedRecords)

    if (onDeleteRecord) {
      onDeleteRecord(id)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setAttachments([...attachments, ...fileArray])
    }
  }

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  const getRecordTypeLabel = (type: string) => {
    const serviceType = getServiceTypes().find((t) => t.value === type)
    return serviceType ? serviceType.label : type
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "maintenance":
      case "repair":
        return <Tool className="h-5 w-5 text-neon-blue" />
      case "certification":
      case "authentication":
      case "inspection":
        return <Shield className="h-5 w-5 text-green-500" />
      case "polishing":
      case "cleaning":
      case "detailing":
        return <FileCheck className="h-5 w-5 text-amber-500" />
      case "renovation":
      case "upgrade":
      case "modification":
      case "parts":
        return <Tool className="h-5 w-5 text-neon-purple" />
      default:
        return <Tool className="h-5 w-5" />
    }
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Service History</CardTitle>
            <CardDescription>Track maintenance and service records for this product</CardDescription>
          </div>
          {!readOnly && (
            <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" /> Add Service Record
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel border-white/10 max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Service Record</DialogTitle>
                  <DialogDescription>Record a new service, maintenance, or repair for this product</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="service-date" className="text-sm font-medium">
                        Service Date
                      </label>
                      <Input
                        id="service-date"
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service-type" className="text-sm font-medium">
                        Service Type
                      </label>
                      <select
                        id="service-type"
                        value={newRecord.type}
                        onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                        className="w-full rounded-md bg-white/5 border-white/10 py-2 px-3 text-sm"
                      >
                        {getServiceTypes().map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service-description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="service-description"
                      placeholder="Describe the service performed..."
                      value={newRecord.description}
                      onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                      className="bg-white/5 border-white/10 min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="service-provider" className="text-sm font-medium">
                        Service Provider
                      </label>
                      <Input
                        id="service-provider"
                        placeholder="Name of service provider"
                        value={newRecord.provider}
                        onChange={(e) => setNewRecord({ ...newRecord, provider: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service-location" className="text-sm font-medium">
                        Location
                      </label>
                      <Input
                        id="service-location"
                        placeholder="Service location"
                        value={newRecord.location}
                        onChange={(e) => setNewRecord({ ...newRecord, location: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="service-cost" className="text-sm font-medium">
                        Cost (Optional)
                      </label>
                      <Input
                        id="service-cost"
                        placeholder="Service cost"
                        value={newRecord.cost}
                        onChange={(e) => setNewRecord({ ...newRecord, cost: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service-warranty" className="text-sm font-medium">
                        Warranty Until (Optional)
                      </label>
                      <Input
                        id="service-warranty"
                        type="date"
                        value={newRecord.warranty}
                        onChange={(e) => setNewRecord({ ...newRecord, warranty: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attachments</label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/10 w-full"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" /> Upload Files
                        </Button>
                        <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                      </div>
                      {attachments.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-white/5 rounded-md p-2">
                              <span className="text-sm truncate">{file.name}</span>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-3">Verification Method</h3>
                    <ServiceVerificationMethods
                      onSelect={(method) => setNewRecord({ ...newRecord, verificationMethod: method })}
                      defaultMethod={newRecord.verificationMethod || "blockchain"}
                      showFooter={false}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="verified"
                      type="checkbox"
                      checked={newRecord.verified}
                      onChange={(e) => setNewRecord({ ...newRecord, verified: e.target.checked })}
                      className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                    />
                    <label htmlFor="verified" className="text-sm font-medium">
                      Verified by authorized service provider
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingRecord(false)} className="border-white/10">
                    Cancel
                  </Button>
                  <Button onClick={handleAddRecord} className="bg-gradient-to-r from-neon-purple to-neon-blue">
                    Add Record
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white/5">
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="repair">Repairs</TabsTrigger>
            <TabsTrigger value="verified">Verified Only</TabsTrigger>
          </TabsList>
        </Tabs>

        {serviceRecords.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-lg">
            <Tool className="h-12 w-12 mx-auto text-white/30 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Service Records</h3>
            <p className="text-white/70 max-w-md mx-auto mb-6">
              {readOnly
                ? "This product doesn't have any service records yet."
                : "Start tracking maintenance and repairs by adding your first service record."}
            </p>
            {!readOnly && (
              <Button
                onClick={() => setIsAddingRecord(true)}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" /> Add First Record
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {serviceRecords
              .filter((record) => {
                if (activeTab === "all") return true
                if (activeTab === "verified") return record.verified
                return record.type.includes(activeTab)
              })
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((record) => (
                <div key={record.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/10 p-2 mt-1">{getServiceIcon(record.type)}</div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-medium text-lg">{getRecordTypeLabel(record.type)}</h3>
                          {record.verified && (
                            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center text-white/70 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(record.date)}
                        </div>
                      </div>
                      <p className="text-white/80 mb-3">{record.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
                        {record.provider && (
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {record.provider}
                          </div>
                        )}
                        {record.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {record.location}
                          </div>
                        )}
                        {record.verificationMethod && (
                          <div className="flex items-center mt-2">
                            <Shield className="h-4 w-4 mr-1 text-neon-blue" />
                            <span className="text-sm">
                              Verified via{" "}
                              {record.verificationMethod.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                        )}
                        {record.cost && (
                          <div className="flex items-center">
                            <span className="font-medium mr-1">Cost:</span>
                            {record.cost}
                          </div>
                        )}
                        {record.warranty && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Warranty until {formatDate(record.warranty)}
                          </div>
                        )}
                      </div>
                      {record.attachments && record.attachments.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium mb-2">Attachments</h4>
                          <div className="flex flex-wrap gap-2">
                            {record.attachments.map((attachment, index) => (
                              <a
                                key={index}
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 hover:bg-white/20 rounded px-3 py-1 text-sm flex items-center"
                              >
                                <FileCheck className="h-4 w-4 mr-1" />
                                Document {index + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {!readOnly && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
      {serviceRecords.length > 0 && (
        <CardFooter className="border-t border-white/10 pt-4">
          <div className="w-full text-center text-sm text-white/70">
            Showing {serviceRecords.length} service {serviceRecords.length === 1 ? "record" : "records"}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
