import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 md:text-xs text-[13px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        active:
          "border-transparent bg-[#14D85C] text-[#2C2C2C] shadow hover:bg-[#14D85C]/90 px-3 py-1 rounded-full wrap-none text-nowrap",
        muted:
          "border-transparent bg-[#FFFFFF1F] text-[#FFFFFF] shadow hover:bg-[#FFFFFF1F]/10 px-3 py-1 font-normal rounded-full wrap-none text-nowrap",
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-[#FCC803] bg-[#362B00] text-[#FCC803] hover:bg-[#362B00] rounded-full",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
