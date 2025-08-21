import { twMerge } from "tailwind-merge"

interface DividerPatternProps extends React.ComponentProps<"div"> {
  direction?: "left" | "right"
  mask?:
    | "top"
    | "top_right"
    | "right"
    | "bottom_right"
    | "bottom"
    | "bottom_left"
    | "left"
    | "top_left"
    | "none"
}

const angleMap = {
  left: "-315deg",
  right: "315deg",
}

const maskMap: Record<Exclude<DividerPatternProps["mask"], undefined>, string> = {
  top: "[mask-image:radial-gradient(100%_100%_at_top,white,transparent)]",
  top_right: "[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
  right: "[mask-image:radial-gradient(100%_100%_at_right,white,transparent)]",
  bottom_right: "[mask-image:radial-gradient(100%_100%_at_bottom_right,white,transparent)]",
  bottom: "[mask-image:radial-gradient(100%_100%_at_bottom,white,transparent)]",
  bottom_left: "[mask-image:radial-gradient(100%_100%_at_bottom_left,white,transparent)]",
  left: "[mask-image:radial-gradient(100%_100%_at_left,white,transparent)]",
  top_left: "[mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]",
  none: "",
}

const DividerPattern = ({
  className,
  direction = "right",
  mask = "none",
  style,
  ...props
}: DividerPatternProps) => {
  const angle = angleMap[direction]

  return (
    <div
      className={twMerge(
        "-z-10 absolute inset-0 border-[--pattern-fg] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-border)]",
        maskMap[mask],
        className,
      )}
      style={{
        backgroundImage: `repeating-linear-gradient(${angle}, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)`,
        ...style,
      }}
      {...props}
    />
  )
}

export { DividerPattern }
