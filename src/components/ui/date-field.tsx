import type {
  DateFieldProps as DateFieldPrimitiveProps,
  DateInputProps,
  DateValue,
  ValidationResult,
} from "react-aria-components"
import {
  DateField as DateFieldPrimitive,
  DateInput as DateInputPrimitive,
  DateSegment,
} from "react-aria-components"
import { twJoin } from "tailwind-merge"
import { cx } from "@/lib/primitive"
import { Description, FieldError, FieldGroup, Label } from "./field"

export interface DateFieldProps<T extends DateValue> extends DateFieldPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function DateField<T extends DateValue>({
  prefix,
  suffix,
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldPrimitive {...props} className={cx(props.className, "group flex flex-col gap-y-1")}>
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix && typeof prefix === "string" ? (
          <span className="ml-2 text-muted-fg">{prefix}</span>
        ) : (
          prefix
        )}
        <DateInput />
        {suffix ? (
          typeof suffix === "string" ? (
            <span className="mr-2 text-muted-fg">{suffix}</span>
          ) : (
            suffix
          )
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </DateFieldPrimitive>
  )
}

export function DateInput({ className, ...props }: Omit<DateInputProps, "children">) {
  return (
    <DateInputPrimitive
      className={cx(
        className,
        "px-3 py-2 text-base text-fg placeholder-muted-fg outline-hidden sm:px-2.5 sm:py-1.5 sm:text-sm/6",
      )}
      {...props}
    >
      {(segment) => (
        <DateSegment
          segment={segment}
          className={twJoin(
            "inline shrink-0 rounded px-1.5 type-literal:px-0 text-fg tracking-wider caret-transparent outline-0 forced-color-adjust-none data-placeholder:not-data-focused:text-muted-fg sm:p-0.5 sm:py-0.5 sm:text-sm forced-colors:text-[ButtonText]",
            "focus:bg-accent focus:text-accent-fg focus:data-invalid:bg-danger focus:data-invalid:text-danger-fg forced-colors:focus:bg-[Highlight] forced-colors:focus:text-[HighlightText]",
            "disabled:opacity-50 forced-colors:disabled:text-[GrayText]",
          )}
        />
      )}
    </DateInputPrimitive>
  )
}
