import { AnimatePresence, motion, type Transition } from "motion/react"
import { twMerge } from "tailwind-merge"

export interface RollingNumberProps extends React.ComponentProps<"span"> {
  value: number | string
  reserveDigits?: number
  height?: number
  offset?: number
  align?: "left" | "center" | "right"
  maskClassName?: string
  transition?: Transition
}

export function RollingNumber({
  value,
  reserveDigits = 1,
  height = 24,
  offset,
  align = "right",
  className,
  maskClassName = "mask-t-from-70% mask-b-from-70%",
  transition,
}: RollingNumberProps) {
  const v = String(value)
  const minCh = Math.max(v.length, reserveDigits) + 0.1
  const y = offset ?? Math.round(height * 0.66)
  const alignClass =
    align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right"
  return (
    <span
      className={twMerge(
        "relative overflow-hidden tabular-nums",
        maskClassName,
        alignClass,
        className,
      )}
      style={{ height, minWidth: `${minCh}ch` }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={v}
          className="absolute inset-0 shrink-0 tabular-nums"
          initial={{ y }}
          animate={{ y: 0 }}
          exit={{ y: -y }}
          transition={transition ?? { type: "spring", stiffness: 400, damping: 30 }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
