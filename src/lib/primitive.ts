"use client"

import { composeRenderProps } from "react-aria-components"
import { type ClassNameValue, twMerge } from "tailwind-merge"

export function cx<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: ClassNameValue,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tailwind, className))
}
