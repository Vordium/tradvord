"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-glow-sm hover:from-purple-700 hover:to-pink-700 border border-purple-500/20",
        destructive: "bg-red-600 text-white hover:bg-red-700 border border-red-500/20",
        outline: "border border-purple-500/40 bg-black/40 hover:bg-purple-900/20 text-white backdrop-blur-sm",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
        ghost: "hover:bg-purple-900/10 text-white hover:text-white",
        link: "text-purple-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "secondary"
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : variant === "destructive"
            ? "border-destructive/30 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : variant === "outline"
              ? "text-foreground"
              : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        className,
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants, Badge }
