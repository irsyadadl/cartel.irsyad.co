"use client"

import {
  composeRenderProps,
  type DialogProps,
  DialogTrigger as DialogTriggerPrimitive,
  type DialogTriggerProps,
  Modal as ModalPrimitive,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components"
import { twJoin, twMerge } from "tailwind-merge"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const Modal = (props: DialogTriggerProps) => {
  return <DialogTriggerPrimitive {...props} />
}

const sizes = {
  "2xs": "sm:max-w-2xs",
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  fullscreen: "sm:max-w-[100vw] sm:h-(--visual-viewport-height,100vh)",
}

interface ModalContentProps
  extends Omit<ModalOverlayProps, "className" | "children">,
    Pick<DialogProps, "aria-label" | "aria-labelledby" | "role" | "children"> {
  size?: keyof typeof sizes
  closeButton?: boolean
  isBlurred?: boolean
  className?: ModalOverlayProps["className"]
  overlay?: Omit<ModalOverlayProps, "children">
}

const ModalContent = ({
  className,
  isDismissable: isDismissableInternal,
  isBlurred = false,
  children,
  overlay,
  size = "xl",
  role = "dialog",
  closeButton = true,
  ...props
}: ModalContentProps) => {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog"

  return (
    <ModalOverlay
      data-slot="modal-overlay"
      isDismissable={isDismissable}
      className={({ isExiting, isEntering }) =>
        twJoin(
          "fixed inset-0 z-50 h-(--visual-viewport-height,100vh) bg-black/15",
          "grid",
          size === "fullscreen"
            ? "grid-rows-[1fr] md:p-0"
            : "grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] md:p-4",
          isEntering && "fade-in animate-in duration-300",
          isExiting && "fade-out animate-out",
          isBlurred && "backdrop-blur-sm backdrop-filter",
        )
      }
      {...props}
    >
      <ModalPrimitive
        data-slot="modal-content"
        className={composeRenderProps(className, (className, { isEntering, isExiting }) =>
          twMerge(
            "row-start-2 w-full text-left align-middle",
            "[--visual-viewport-vertical-padding:16px]",
            "relative overflow-hidden bg-overlay text-overlay-fg",
            size === "fullscreen"
              ? "sm:[--visual-viewport-vertical-padding:0px]"
              : "sm:[--visual-viewport-vertical-padding:32px]",
            size !== "fullscreen" &&
              "rounded-t-2xl shadow-lg ring ring-fg/5 md:rounded-xl dark:ring-border",
            sizes[size],
            isEntering && [
              "slide-in-from-bottom animate-in duration-300 ease-out",
              "md:fade-in md:zoom-in-95 md:slide-in-from-bottom-0",
            ],
            isExiting && [
              "slide-out-to-bottom animate-out",
              "md:fade-out md:zoom-out-95 md:slide-out-to-bottom-0",
            ],
            className,
          ),
        )}
      >
        <Dialog role={role}>
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && <DialogCloseIcon isDismissable={isDismissable} />}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  )
}

const ModalTrigger = DialogTrigger
const ModalHeader = DialogHeader
const ModalTitle = DialogTitle
const ModalDescription = DialogDescription
const ModalFooter = DialogFooter
const ModalBody = DialogBody
const ModalClose = DialogClose

export {
  Modal,
  ModalTrigger,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalBody,
  ModalClose,
  ModalContent,
}
