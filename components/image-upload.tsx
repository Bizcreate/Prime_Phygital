"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface ImageUploadProps {
  onImageChange?: (file: File | null) => void
  className?: string
}

export function ImageUpload({ onImageChange, className = "" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFile(file)
  }

  const handleFile = (file: File | null) => {
    if (file) {
      // Create preview
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)

      // Call callback if provided
      if (onImageChange) {
        onImageChange(file)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (onImageChange) {
      onImageChange(null)
    }
  }

  return (
    <div
      className={`mt-2 flex justify-center rounded-lg border border-dashed ${isDragging ? "border-neon-blue bg-white/5" : "border-white/20"} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="text-center px-6 py-10 w-full">
        {!preview ? (
          <>
            <Upload className="mx-auto h-12 w-12 text-white/50" />
            <div className="mt-4 flex justify-center text-sm leading-6">
              <label className="relative cursor-pointer rounded-md font-semibold text-neon-blue hover:text-neon-purple">
                <span>Upload a file</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/png,image/jpeg,image/gif"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1 text-white/70">or drag and drop</p>
            </div>
            <p className="text-xs text-white/50">PNG, JPG, GIF up to 10MB</p>
          </>
        ) : (
          <div className="relative">
            <img
              src={preview || "/placeholder.svg"}
              alt="Product preview"
              className="mx-auto max-h-48 rounded-md object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 rounded-full bg-black/80 p-1 text-white hover:bg-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
