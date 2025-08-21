import { twMerge } from "tailwind-merge"

export function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("flex items-end justify-between", className)} {...props} />
}
export function SectionTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={twMerge("font-medium text-base/6", className)} {...props} />
}
export function SectionContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("space-y-0.5", className)} {...props} />
}
export function SectionDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("max-w-xl text-gray-500 text-sm/6", className)} {...props} />
}
export function SectionAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={twMerge("flex items-center gap-2", className)} {...props} />
}
