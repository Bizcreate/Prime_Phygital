"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { forwardRef } from "react"

interface LinkWrapperProps extends React.ComponentPropsWithoutRef<typeof Link> {
  onNavigate?: () => void
}

export const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  ({ href, onNavigate, children, ...props }, ref) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onNavigate) {
        onNavigate()
      }

      // Handle external links
      if (typeof href === "string" && (href.startsWith("http") || href.startsWith("mailto:"))) {
        return
      }

      // Let Next.js handle the navigation
      props.onClick?.(e)
    }

    return (
      <Link href={href} {...props} onClick={handleClick} ref={ref}>
        {children}
      </Link>
    )
  },
)

LinkWrapper.displayName = "LinkWrapper"
