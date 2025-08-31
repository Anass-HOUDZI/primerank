import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-primary to-primary-accent text-primary-foreground hover:from-primary/90 hover:to-primary-accent/90 border-primary/20 shadow-lg hover:shadow-xl",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:from-destructive/90 hover:to-destructive/80 border-destructive/20 shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:text-primary shadow-md hover:shadow-lg",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/80 hover:to-secondary/70 border-secondary/20 shadow-md hover:shadow-lg",
        ghost: "border-transparent hover:bg-accent/50 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
        premium: "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 border-amber-400/30 shadow-lg hover:shadow-xl",
        cta: "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white hover:from-blue-500 hover:to-purple-500 border-blue-500/30 shadow-xl hover:shadow-2xl transform-gpu",
      },
      size: {
        default: "h-11 px-6 py-3 rounded-xl",
        sm: "h-9 rounded-lg px-4 py-2",
        lg: "h-14 rounded-xl px-10 py-4 text-base",
        icon: "h-11 w-11 rounded-xl",
        xs: "h-8 rounded-lg px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
