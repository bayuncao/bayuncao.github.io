"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        warm: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  relatedTags?: string[]
}

function Badge({
  className,
  variant,
  children,
  relatedTags = [],
  ...props
}: BadgeProps & {
  relatedTags?: string[]
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="relative inline-block">
      <div
        className={cn(badgeVariants({ variant }), "cursor-pointer transition-all hover:shadow-md", className)}
        onClick={handleToggle}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        {...props}
      >
        {children}
      </div>

      <AnimatePresence>
        {isExpanded && relatedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-1 z-50 bg-white/90 backdrop-blur-sm rounded-md shadow-lg border border-border p-2 min-w-[150px]"
          >
            <div className="flex flex-wrap gap-1.5">
              {relatedTags.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    badgeVariants({ variant: variant === "outline" ? "secondary" : "outline" }),
                    "text-xs cursor-default",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Badge, badgeVariants }

