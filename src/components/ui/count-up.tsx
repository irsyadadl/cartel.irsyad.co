import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

/**
 * A reusable count-up animation component using Framer Motion.
 * Animates a number from `start` to `end` over the specified `duration`.
 * Uses MotionValue for efficient rendering and useTransform for rounding to integers.
 *
 * @param {number} [start=0] - The starting value (defaults to 0).
 * @param {number} end - The ending value (required).
 * @param {number} [duration=0.6] - The animation duration in seconds (defaults to 0.6).
 *
 * Usage:
 * <CountUp end={100} start={0} duration={1} />
 */

export interface CountUpProps {
  start?: number
  end: number
  duration?: number
  format?: (value: number) => string
}

export function CountUp({
  start = 0,
  end,
  duration = 0.6,
  format = (v) => Math.round(v).toString(),
}: CountUpProps) {
  const count = useMotionValue(start)
  const formatted = useTransform(count, format)

  useEffect(() => {
    const controls = animate(count, end, {
      duration,
      ease: "easeOut",
    })

    return () => controls.stop()
  }, [count, end, duration])

  return <motion.span>{formatted}</motion.span>
}
