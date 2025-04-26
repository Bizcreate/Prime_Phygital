"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Mail, PanelRight, Pencil, Trash2 } from "lucide-react"
import { type ElementRef, forwardRef } from "react"

interface ActionsMenuProps {
  onViewProfile?: () => void
  onSendEmail?: () => void
  onViewProducts?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export const ActionsMenu = forwardRef<ElementRef<typeof DropdownMenu>, ActionsMenuProps>(
  ({ onViewProfile, onSendEmail, onViewProducts, onEdit, onDelete }, ref) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 1.5C1.5 2.32843 2.17157 3 3 3C3.82843 3 4.5 2.32843 4.5 1.5C4.5 0.671573 3.82843 0 3 0C2.17157 0 1.5 0.671573 1.5 1.5Z"
                fill="currentColor"
              />
              <path
                d="M6 1.5C6 2.32843 6.67157 3 7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5Z"
                fill="currentColor"
              />
              <path
                d="M10.5 1.5C10.5 2.32843 11.1716 3 12 3C12.8284 3 13.5 2.32843 13.5 1.5C13.5 0.671573 12.8284 0 12 0C11.1716 0 10.5 0.671573 10.5 1.5Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-black border-white/10">
          <DropdownMenuItem onClick={onViewProfile} className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" /> View Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSendEmail} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" /> Send Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onViewProducts} className="cursor-pointer">
            <PanelRight className="mr-2 h-4 w-4" /> View Products
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-500 focus:text-red-500">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)

ActionsMenu.displayName = "ActionsMenu"
