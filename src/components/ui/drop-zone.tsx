import type { DropZoneProps } from "react-aria-components"
import { composeRenderProps, DropZone as DropPrimitiveZone } from "react-aria-components"
import { twMerge } from "tailwind-merge"

const DropZone = ({ className, style, ...props }: DropZoneProps) => (
  <DropPrimitiveZone
    className={composeRenderProps(className, (className, { isDropTarget }) =>
      twMerge(
        "group/drop-zone relative z-10 flex max-h-56 items-center justify-center overflow-hidden rounded-lg p-6",
        isDropTarget && "border-primary border-solid bg-primary/10 ring-3 ring-ring/20",
        className,
      ),
    )}
    {...props}
  >
    {(values) => (
      <>
        <span
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            backgroundColor: values.isDropTarget ? "var(--color-primary)" : "var(--color-border)",
            WebkitMaskImage:
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='white' stroke-width='3' stroke-dasharray='6'/%3e%3c/svg%3e\")",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage:
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='white' stroke-width='3' stroke-dasharray='6'/%3e%3c/svg%3e\")",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        />
        {typeof props.children === "function" ? props.children(values) : props.children}
      </>
    )}
  </DropPrimitiveZone>
)

export { DropZone }
