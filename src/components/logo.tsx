import type { SVGProps } from "react"
import { twMerge } from "tailwind-merge"

export const Logo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={twMerge("size-6 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="oklch(0.623 0.214 259.815)"
          stroke="oklch(0.809 0.105 251.813)"
          d="M.67.742h19.572v19.572H.67z"
          strokeWidth="0.5"
        />
        <path
          fill="oklch(0.546 0.245 262.881)"
          stroke="oklch(0.809 0.105 251.813)"
          d="M3.886 3.91h19.572v19.572H3.886z"
          strokeWidth="0.5"
        />
        <rect width="2.88" height="2.88" x="6.312" y="7.056" fill="#EFF6FF" rx="1.44" />
        <rect width="6.576" height="1.44" x="6.312" y="13.344" fill="#EFF6FF" rx=".72" />
        <rect width="14.64" height="1.44" x="6.36" y="16.128" fill="#EFF6FF" rx=".72" />
        <rect width="8.976" height="1.44" x="6.312" y="18.912" fill="#EFF6FF" rx=".72" />
      </g>
    </svg>
  )
}
