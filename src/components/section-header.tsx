import { twMerge } from "tailwind-merge"

export function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge("flex flex-col items-end justify-between gap-3 md:flex-row", className)}
      {...props}
    />
  )
}
export function SectionTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={twMerge("text-balance font-semibold text-fg text-lg/6", className)} {...props} />
  )
}
export function SectionContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("flex flex-col gap-y-0.5", className)} {...props} />
}
export function SectionDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("max-w-lg text-gray-500 text-sm/6", className)} {...props} />
}
export function SectionAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("flex items-center gap-2", className)} {...props} />
}
