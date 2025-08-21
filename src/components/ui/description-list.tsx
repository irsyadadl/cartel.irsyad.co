"use client"

import { twMerge } from "tailwind-merge"

const DescriptionList = ({ className, ref, ...props }: React.ComponentProps<"dl">) => {
  return (
    <dl
      ref={ref}
      className={twMerge(
        "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*60))_auto] sm:text-sm/6",
        className,
      )}
      {...props}
    />
  )
}

const DescriptionTerm = ({ className, ref, ...props }: React.ComponentProps<"dt">) => {
  return (
    <dt
      ref={ref}
      className={twMerge("col-start-1 pt-3 text-muted-fg sm:py-2", className)}
      {...props}
    />
  )
}

const DescriptionDetails = ({ className, ...props }: React.ComponentProps<"dd">) => {
  return (
    <dd
      {...props}
      data-slot="description-details"
      className={twMerge("pt-1 pb-3 text-fg sm:py-2", className)}
    />
  )
}

export { DescriptionList, DescriptionTerm, DescriptionDetails }
