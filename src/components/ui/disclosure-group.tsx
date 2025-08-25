"use client"

import { use, useMemo, useRef } from "react"
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components"
import {
  Button,
  composeRenderProps,
  Disclosure,
  DisclosureGroup as PrimitiveDisclosureGroup,
  DisclosurePanel as PrimitiveDisclosurePanel,
  DisclosureStateContext,
  Heading,
} from "react-aria-components"
import { twJoin, twMerge } from "tailwind-merge"
import { cx } from "@/lib/primitive"

const DisclosureGroup = ({ className, ...props }: DisclosureGroupProps) => {
  return (
    <PrimitiveDisclosureGroup
      className={cx(className, [
        "[--disclosure-collapsed-border:var(--color-border)]",
        "[--disclosure-collapsed-bg:var(--color-bg)]",
        "[--disclosure-collapsed-fg:var(--color-muted-fg)]",
        "[--disclosure-expanded-bg:var(--color-secondary)]/20",
        "[--disclosure-expanded-fg:var(--color-fg)]",
        "[--disclosure-expanded-border:var(--color-muted-fg)]/30",
        "flex flex-col gap-y-2",
      ])}
      {...props}
    />
  )
}

const DisclosureItem = ({ className, ...props }: DisclosureProps) => {
  return (
    <Disclosure
      className={composeRenderProps(className, (className, { isExpanded, isFocusVisibleWithin }) =>
        twMerge(
          "group group/disclosure-item w-full rounded-xl border border-(--disclosure-collapsed-border) bg-(--disclosure-collapsed-bg) duration-200",
          (isExpanded || isFocusVisibleWithin) &&
            "border-(--disclosure-expanded-border) bg-(--disclosure-expanded-bg)",
          "has-data-hovered:border-(--disclosure-expanded-border) has-data-hovered:bg-(--disclosure-expanded-bg)",
          className,
        ),
      )}
      {...props}
    />
  )
}
interface DisclosureTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
}
const DisclosureTrigger = ({ ref, className, ...props }: DisclosureTriggerProps) => {
  const state = use(DisclosureStateContext)!
  return (
    <Heading>
      <Button
        {...props}
        ref={ref}
        slot="trigger"
        className={cx(className, [
          "outline-hidden [--width:--spacing(2.5)]",
          "relative isolate flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left font-medium text-sm/6",
          state.isExpanded
            ? "rounded-t-xl rounded-b-none text-(--disclosure-expanded-fg)"
            : "rounded-xl text-(--disclosure-collapsed-fg) hover:text-(--disclosure-expanded-fg)",
        ])}
      >
        {(values) => (
          <>
            {typeof props.children === "function" ? props.children(values) : props.children}
            <span className="-mr-1 relative ml-4 flex size-6 items-center justify-center">
              <span
                className={twJoin([
                  "absolute h-[1.5px] w-(--width) origin-center bg-current transition-transform duration-300",
                  state.isExpanded ? "rotate-0" : "rotate-90",
                ])}
              />
              <span className="absolute h-[1.5px] w-(--width) origin-center bg-current transition-transform duration-300" />
            </span>
          </>
        )}
      </Button>
    </Heading>
  )
}

const DisclosurePanel = ({ className, style, ...props }: DisclosurePanelProps) => {
  const { isExpanded } = use(DisclosureStateContext)!
  const contentRef = useRef<HTMLDivElement>(null)
  const isSafari = useMemo(() => {
    if (typeof navigator === "undefined") return false
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  }, [])
  return (
    <PrimitiveDisclosurePanel
      data-slot="disclosure-panel"
      style={{
        height: !isSafari ? (isExpanded ? contentRef?.current?.scrollHeight : 0) : undefined,
        ...style,
      }}
      className={cx(
        className,

        !isSafari && "overflow-hidden transition-[height] duration-200 ease-in-out",
      )}
    >
      <div
        ref={contentRef}
        className="max-w-xl justify-start self-stretch text-pretty px-3 pt-0 pb-2.5 text-(--disclosure-collapsed-fg) text-sm/6 lg:max-w-3xl"
      >
        {props.children}
      </div>
    </PrimitiveDisclosurePanel>
  )
}

export { DisclosureGroup, DisclosureItem, DisclosureTrigger, DisclosurePanel }
