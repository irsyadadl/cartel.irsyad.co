import type { SeparatorProps, ToolbarProps } from "react-aria-components"
import { Toolbar as PrimitiveToolbar } from "react-aria-components"
import { cx } from "@/lib/primitive"
import { Separator } from "@/components/ui/separator"
import { twMerge } from "tailwind-merge"
import { Button, type ButtonProps } from "@/components/ui/button"
import { motion, type MotionProps } from "motion/react"

const MotionToolbar = motion(PrimitiveToolbar)

export function Toolbar({
  className,
  orientation = "vertical",
  ...props
}: ToolbarProps & MotionProps) {
  return (
    <MotionToolbar
      initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{
        y: 24,
        filter: "blur(14px)",
        opacity: 0,
        transition: {
          y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          filter: { duration: 0.35, ease: "easeOut" },
          opacity: { delay: 0.25, duration: 0.2, ease: "easeOut" },
        },
      }}
      orientation={orientation}
      className={cx(className, [
        "-translate-1/2 fixed bottom-0 left-1/2 z-40 w-fit transform-gpu rounded-lg border border-gray-400/50 bg-white p-2.5 text-gray-800 shadow-sm ring ring-gray-400/70 ring-offset-4 ring-offset-gray-100 backdrop-blur",
        "**:[button]:whitespace-nowrap",
      ])}
      {...props}
    />
  )
}

export function ToolbarButton({ intent, ...props }: ButtonProps) {
  return <Button size="sm" intent={intent ?? "outline"} {...props} />
}

export function ToolbarSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={twMerge("flex items-center gap-x-1.5", className)} {...props} />
}

export function ToolbarText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={twMerge("block whitespace-nowrap text-gray-700 text-sm/6", className)}
      {...props}
    />
  )
}

export function ToolbarSeparator({ className, ...props }: Omit<SeparatorProps, "orientation">) {
  return (
    <Separator
      orientation="vertical"
      className={twMerge("mx-0.5 h-4 bg-gray-300", className)}
      {...props}
    />
  )
}
