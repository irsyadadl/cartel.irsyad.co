"use client"

import type { FormProps as FormPrimitiveProps } from "react-aria-components"
import { Form as FormPrimitive } from "react-aria-components"

export interface FormProps extends FormPrimitiveProps {
  ref?: React.RefObject<HTMLFormElement>
}
export function Form({ ref, ...props }: FormProps) {
  return <FormPrimitive ref={ref} {...props} />
}
