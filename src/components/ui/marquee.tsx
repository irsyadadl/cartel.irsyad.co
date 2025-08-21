import { useMemo } from "react"
import { twMerge } from "tailwind-merge"

interface MarqueeProps extends React.ComponentProps<"div"> {
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  /**
   * @default 4
   */
  repeat?: number
  autoFill?: boolean
  ariaLive?: "off" | "polite" | "assertive"
}

const Marquee = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLive = "off",
  ref,
  ...props
}: MarqueeProps) => {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="marquee"
      className={twMerge(
        "group flex gap-(--gap) overflow-hidden p-2 outline-hidden [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      aria-live={ariaLive}
      role={"role" in props ? props.role : "marquee"}
      tabIndex={0}
    >
      {useMemo(
        () => (
          <>
            {Array.from({ length: repeat }, (_, i) => (
              <div
                key={i}
                className={twMerge(
                  !vertical ? "flex-row [gap:var(--gap)]" : "flex-col [gap:var(--gap)]",
                  "flex shrink-0 justify-around",
                  !vertical && "animate-marquee flex-row",
                  vertical && "animate-marquee-vertical flex-col",
                  pauseOnHover && "group-hover:[animation-play-state:paused]",
                  reverse && "[animation-direction:reverse]",
                )}
              >
                {children}
              </div>
            ))}
          </>
        ),
        [repeat, children, vertical, pauseOnHover, reverse],
      )}
    </div>
  )
}

type MarqueeFadeProps = React.HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right"
}

const MarqueeFade = ({ className, side, ...props }: MarqueeFadeProps) => (
  <div
    className={twMerge(
      "absolute top-0 bottom-0 z-10 h-full w-24 from-bg to-transparent",
      side === "left" ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l",
      className,
    )}
    {...props}
  />
)

export type { MarqueeProps, MarqueeFadeProps }
export { Marquee, MarqueeFade }
