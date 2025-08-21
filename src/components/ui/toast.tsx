"use client"

import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner"
import { twJoin } from "tailwind-merge"

const Toast = (props: ToasterProps) => {
  return (
    <ToasterPrimitive
      theme="light"
      className="toaster group"
      richColors
      toastOptions={{
        className: twJoin(
          "backdrop-blur-2xl *:data-icon:mt-0.5 *:data-icon:self-start has-data-description:*:data-icon:mt-1",
          "**:data-action:[--normal-bg:var(--color-primary-fg)] **:data-action:[--normal-text:var(--color-primary)]",
        ),
      }}
      style={
        {
          "--normal-bg": "var(--color-overlay)",
          "--normal-text": "var(--color-overlay-fg)",
          "--normal-border": "var(--color-border)",

          "--success-bg": "var(--color-success-bg)",
          "--success-border": "var(--color-success-border)",
          "--success-text": "var(--color-success-text)",

          "--error-bg": "var(--color-error-bg)",
          "--error-border": "var(--color-error-border)",
          "--error-text": "var(--color-error-text)",

          "--warning-bg": "var(--color-warning-bg)",
          "--warning-border": "var(--color-warning-border)",
          "--warning-text": "var(--color-warning-text)",

          "--info-bg": "var(--color-info-bg)",
          "--info-border": "var(--color-info-border)",
          "--info-text": "var(--color-info-text)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export type { ToasterProps }
export { Toast }
