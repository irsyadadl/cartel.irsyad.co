"use client"

import { motion } from "motion/react"
import {
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps as ProgressBarPrimitiveProps,
  type ProgressBarRenderProps,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { Label } from "@/components/ui/field"
import { cx } from "@/lib/primitive"

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string
  ref?: React.RefObject<HTMLDivElement>
}

const ProgressBar = ({ label, ref, className, ...props }: ProgressBarProps) => {
  return (
    <ProgressBarPrimitive ref={ref} className={cx(className, "w-full")} {...props}>
      {(values) => {
        if (!props.children) {
          return (
            <>
              {label && <Label>{label}</Label>}
              <ProgressBarTrack {...values} />
            </>
          )
        }

        return typeof props.children === "function" ? props.children(values) : props.children
      }}
    </ProgressBarPrimitive>
  )
}

interface ProgressBarTrackProps
  extends React.ComponentProps<"div">,
    Omit<ProgressBarRenderProps, "valueText" | "isIndeterminate"> {
  valueText?: string
  isIndeterminate?: boolean
}
const ProgressBarTrack = ({
  className,
  ref,
  valueText,
  isIndeterminate,
  ...props
}: ProgressBarTrackProps) => {
  return (
    <div ref={ref} className="flex w-full items-center gap-x-2">
      <div
        className={twMerge(
          "-outline-offset-1 relative mt-1 h-1.5 w-full min-w-52 overflow-hidden rounded-full bg-secondary outline-1 outline-transparent",
          className,
        )}
      >
        {!isIndeterminate ? (
          <motion.div
            data-slot="progress-content"
            className="absolute top-0 left-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]"
            initial={{ width: "0%" }}
            animate={{ width: `${props.percentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            data-slot="progress-content"
            className="absolute top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]"
            initial={{ left: "0%", width: "40%" }}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
      {valueText && <span className="w-12 text-muted-fg text-sm">{valueText}</span>}
    </div>
  )
}

export type { ProgressBarProps, ProgressBarTrackProps }
export { ProgressBar, ProgressBarTrack }
