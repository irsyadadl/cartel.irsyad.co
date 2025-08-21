import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid"
import { twJoin, twMerge } from "tailwind-merge"

interface NoteProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  intent?: "default" | "info" | "warning" | "danger" | "success"
  indicator?: boolean
}

const Note = ({ indicator = true, intent = "default", className, ...props }: NoteProps) => {
  const iconMap: Record<string, React.ElementType | null> = {
    info: InformationCircleIcon,
    warning: ExclamationCircleIcon,
    danger: ExclamationCircleIcon,
    success: CheckCircleIcon,
    default: null,
  }

  const IconComponent = iconMap[intent] || null

  return (
    <div
      className={twMerge([
        "inset-ring-1 inset-ring-current/10 grid w-full grid-cols-[auto_1fr] gap-3 overflow-hidden rounded-lg p-4 sm:text-sm/6",
        "*:[a]:hover:underline **:[strong]:font-medium",
        intent === "default" && "bg-secondary/20 text-secondary-fg",
        intent === "info" && "bg-info-subtle text-info-subtle-fg",
        intent === "warning" && "bg-warning-subtle text-warning-subtle-fg",
        intent === "danger" && "bg-danger-subtle text-danger-subtle-fg",
        intent === "success" && "bg-success-subtle text-success-subtle-fg",
        className,
      ])}
      {...props}
    >
      {IconComponent && indicator && (
        <div
          className={twJoin(
            "grid size-8 place-content-center rounded-full border-2",
            intent === "warning" && "border-amber-500/25",
            intent === "success" && "border-emerald-500/25",
            intent === "danger" && "border-red-500/25",
            intent === "info" && "border-sky-500/25",
          )}
        >
          <div
            className={twJoin(
              "grid size-6 place-content-center rounded-full border-2",
              intent === "warning" && "border-amber-500/50",
              intent === "success" && "border-emerald-500/50",
              intent === "danger" && "border-red-500/50",
              intent === "info" && "border-sky-500/50",
            )}
          >
            <IconComponent className="size-5 shrink-0" />
          </div>
        </div>
      )}
      <div className="text-pretty text-base/6 group-has-data-[slot=icon]:col-start-2 sm:text-sm/6">
        {props.children}
      </div>
    </div>
  )
}

export type { NoteProps }
export { Note }
