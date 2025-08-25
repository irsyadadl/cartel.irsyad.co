"use client"

import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from "react"
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
  LinkProps,
  LinkRenderProps,
  SeparatorProps as SidebarSeparatorProps,
} from "react-aria-components"
import {
  Button as Trigger,
  composeRenderProps,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureStateContext,
  Header,
  Heading,
  Separator,
  Text,
} from "react-aria-components"
import { twJoin, twMerge } from "tailwind-merge"
import { SheetContent } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cx } from "@/lib/primitive"
import { Button } from "./button"
import { Link } from "./link"
import { Tooltip, TooltipContent } from "./tooltip"

const SIDEBAR_WIDTH = "17rem"
const SIDEBAR_WIDTH_DOCK = "3.25rem"
const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  isOpenOnMobile: boolean
  setIsOpenOnMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

const useSidebar = () => {
  const context = use(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  isOpen?: boolean
  shortcut?: string
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = ({
  defaultOpen = true,
  isOpen: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  shortcut = "b",
  ref,
  ...props
}: SidebarProviderProps) => {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [openMobile, setOpenMobile] = useState(false)

  const [internalOpenState, setInternalOpenState] = useState(defaultOpen)
  const open = openProp ?? internalOpenState
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        setInternalOpenState(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === shortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, shortcut])

  const state = open ? "expanded" : "collapsed"

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      isOpenOnMobile: openMobile,
      setIsOpenOnMobile: setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  )

  return (
    <SidebarContext value={contextValue}>
      <div
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-dock": SIDEBAR_WIDTH_DOCK,
            ...style,
          } as React.CSSProperties
        }
        className={twMerge(
          "@container bg-gray-950 **:data-[slot=icon]:shrink-0",
          "[--sidebar-fg:var(--color-sidebar-fg)] [--sidebar:var(--color-sidebar)]",
          "[--sidebar-accent:color-mix(in_oklab,var(--color-sidebar)_95%,black_5%)]",
          "flex min-h-svh w-full text-white",
          "group/sidebar-root peer/sidebar-root",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  )
}

interface SidebarProps extends React.ComponentProps<"div"> {
  collapsible?: "hidden" | "dock"
  side?: "left" | "right"
  closeButton?: boolean
}

const Sidebar = ({
  children,
  closeButton = true,
  collapsible = "hidden",
  side = "left",
  className,
  ...props
}: SidebarProps) => {
  const { isMobile, state, isOpenOnMobile, setIsOpenOnMobile } = useSidebar()

  if (isMobile) {
    return (
      <>
        <span className="sr-only" aria-hidden />
        <SheetContent
          isOpen={isOpenOnMobile}
          onOpenChange={setIsOpenOnMobile}
          closeButton={closeButton}
          aria-label="Sidebar"
          className="w-(--sidebar-width) bg-gray-950 ring-gray-700! [--sidebar-width:18rem] has-data-[slot=calendar]:[--sidebar-width:23rem]"
          side={side}
        >
          {children}
        </SheetContent>
      </>
    )
  }

  return (
    <div
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      className="group peer hidden text-white md:block"
      {...props}
    >
      <div
        aria-hidden="true"
        className={twMerge([
          "w-(--sidebar-width) group-data-[collapsible=hidden]:w-0",
          "group-data-[side=right]:rotate-180",
          "relative h-svh bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=dock]:w-(--sidebar-width-dock)",
        ])}
      />
      <div
        className={twMerge(
          "fixed inset-y-0 z-10 hidden h-svh min-h-svh w-(--sidebar-width) bg-gray-950",
          "not-has-data-[slot=sidebar-footer]:pb-2",
          "transition-[left,right,width] duration-200 ease-linear",
          "md:flex",
          side === "left" &&
            "left-0 group-data-[collapsible=hidden]:left-[calc(var(--sidebar-width)*-1)]",
          side === "right" &&
            "right-0 group-data-[collapsible=hidden]:right-[calc(var(--sidebar-width)*-1)]",
          "group-data-[collapsible=dock]:w-(--sidebar-width-dock) group-data-[side=left]:border-gray-700 group-data-[side=right]:border-gray-700",
          className,
        )}
        {...props}
      >
        <div data-sidebar="default" className="flex h-full w-full flex-col text-white">
          {children}
        </div>
      </div>
    </div>
  )
}

const SidebarHeader = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
  const { state } = use(SidebarContext)!
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={twMerge([
        "mb-2 flex flex-col **:data-[slot=sidebar-label-mask]:hidden",
        state === "collapsed"
          ? "mt-2 p-5 group-data-[intent=float]:mt-2 md:mx-auto md:size-9 md:items-center md:justify-center md:rounded-lg md:p-0 md:hover:bg-gray-700"
          : "px-6 py-3 sm:py-4.5",
        className,
      ])}
      {...props}
    />
  )
}

const SidebarFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="sidebar-footer"
      className={twMerge([
        "mt-auto flex shrink-0 items-center justify-center p-4 **:data-[slot=chevron]:text-gray-400",
        "in-data-[intent=inset]:px-6 in-data-[intent=inset]:py-4",
        className,
      ])}
      {...props}
    />
  )
}

const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { state } = useSidebar()
  return (
    <div
      data-slot="sidebar-content"
      className={twMerge(
        "[scrollbar-color:var(--color-gray-600)_transparent] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-500 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2",
        "mask-b-from-95% mask-t-from-95% -mt-4 flex min-h-0 flex-1 scroll-mb-96 flex-col overflow-auto p-4 *:data-[slot=sidebar-section]:border-l-0",
        state === "collapsed" ? "pt-8" : "pt-6",
        state === "collapsed" && "items-center",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  )
}

const SidebarSectionGroup = ({ className, ...props }: React.ComponentProps<"section">) => {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  return (
    <section
      data-slot="sidebar-section-group"
      className={twMerge(
        "flex w-full flex-col gap-y-6",
        collapsed && "items-center justify-center",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarSectionProps extends React.ComponentProps<"div"> {
  label?: string
}
const SidebarSection = ({ className, ...props }: SidebarSectionProps) => {
  const { state } = useSidebar()
  return (
    <div
      data-slot="sidebar-section"
      className={twMerge(
        "col-span-full flex flex-col gap-y-0.5 **:data-[slot=sidebar-section]:**:gap-y-0",
        className,
      )}
      {...props}
    >
      {state !== "collapsed" && "label" in props && (
        <Header className="group-data-[collapsible=dock]:-mt-8 mb-1 flex shrink-0 items-center rounded-md px-2 font-medium text-white/70 text-xs/6 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 group-data-[collapsible=dock]:opacity-0">
          {props.label}
        </Header>
      )}
      <div className="grid grid-cols-[auto_1fr] gap-y-0.5">{props.children}</div>
    </div>
  )
}

interface SidebarItemProps extends Omit<React.ComponentProps<typeof Link>, "children"> {
  isCurrent?: boolean
  tooltip?: React.ReactNode | string
  children?:
    | React.ReactNode
    | ((
        values: LinkRenderProps & { defaultChildren: React.ReactNode; isCollapsed: boolean },
      ) => React.ReactNode)
  badge?: string | number | undefined
}

const SidebarItem = ({
  isCurrent,
  tooltip,
  children,
  badge,
  className,
  ref,
  ...props
}: SidebarItemProps) => {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed" && !isMobile
  const link = (
    <Link
      ref={ref}
      data-slot="sidebar-item"
      aria-current={isCurrent ? "page" : undefined}
      className={composeRenderProps(
        className,
        (className, { isPressed, isFocusVisible, isHovered, isDisabled }) =>
          twMerge([
            "href" in props ? "cursor-pointer" : "cursor-default",
            "w-full items-center rounded-lg text-left font-medium text-base/6 text-white",
            "group/sidebar-item relative col-span-full overflow-hidden focus-visible:outline-hidden",
            "**:data-[slot=trigger]:absolute **:data-[slot=trigger]:right-0 **:data-[slot=trigger]:flex **:data-[slot=trigger]:h-full **:data-[slot=trigger]:w-[calc(var(--sidebar-width)-90%)] **:data-[slot=trigger]:items-center **:data-[slot=trigger]:justify-end **:data-[slot=trigger]:pr-2.5 **:data-[slot=trigger]:opacity-0 **:data-[slot=trigger]:pressed:opacity-100 **:data-[slot=trigger]:has-data-focus:opacity-100 **:data-[slot=trigger]:focus-visible:opacity-100 hover:**:data-[slot=trigger]:opacity-100",
            "**:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-gray-400 sm:**:data-[slot=icon]:size-4",
            "**:last:data-[slot=icon]:size-5 sm:**:last:data-[slot=icon]:size-4",
            "**:data-[slot=avatar]:-m-0.5 **:data-[slot=avatar]:*:size-6 **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:*:size-6 sm:**:data-[slot=avatar]:size-6",
            "[--sidebar-current-bg:var(--color-blue-600)]/20 [--sidebar-current-fg:var(--color-blue-400)]",
            isCollapsed
              ? "flex not-has-data-[slot=icon]:hidden size-9 justify-center **:data-[slot=trigger]:hidden **:data-[slot=icon]:size-4"
              : "grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] gap-3 p-2 **:last:data-[slot=icon]:ml-auto supports-[grid-template-columns:subgrid]:grid-cols-subgrid sm:gap-2.5 sm:py-2 sm:text-sm/5",
            isCurrent &&
              "font-medium text-(--sidebar-current-fg) hover:bg-(--sidebar-current-bg) hover:text-(--sidebar-current-fg) **:data-[slot=icon]:text-(--sidebar-current-fg) hover:**:data-[slot=icon]:text-(--sidebar-current-fg) [&_.text-gray-400]:text-fg/80",
            isFocusVisible && "inset-ring inset-ring-ring outline-hidden ring-2 ring-ring/20",
            (isPressed || isHovered) && "bg-gray-700 text-white **:data-[slot=icon]:text-white",
            isDisabled && "opacity-50",
            className,
          ]),
      )}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children({ ...values, isCollapsed }) : children}

          {badge &&
            (state !== "collapsed" ? (
              <span
                data-slot="sidebar-badge"
                className="-translate-y-1/2 absolute inset-ring-1 inset-ring-border inset-y-1/2 right-1.5 h-5.5 w-auto rounded-full bg-fg/5 px-2 text-[10px]/5.5 transition-colors group-hover/sidebar-item:inset-ring-gray-400/30 group-data-current:inset-ring-transparent"
              >
                {badge}
              </span>
            ) : (
              <div
                aria-hidden
                className="absolute top-1 right-1 size-1.5 rounded-full bg-primary"
              />
            ))}
        </>
      )}
    </Link>
  )

  return isCollapsed && tooltip ? (
    <Tooltip delay={0}>
      {link}
      <TooltipContent
        className="**:data-[slot=icon]:hidden **:data-[slot=sidebar-label-mask]:hidden"
        inverse
        placement="right"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  ) : (
    link
  )
}

interface SidebarLinkProps extends LinkProps {
  ref?: React.RefObject<HTMLAnchorElement>
}
const SidebarLink = ({ className, ref, ...props }: SidebarLinkProps) => {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  return (
    <Link
      ref={ref}
      className={cx(
        className,
        twJoin(
          "col-span-full items-center focus:outline-hidden",
          collapsed
            ? "absolute inset-0 flex size-full justify-center"
            : "grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
        ),
      )}
      {...props}
    />
  )
}

const SidebarInset = ({ className, ref, ...props }: React.ComponentProps<"main">) => {
  return (
    <main
      ref={ref}
      className={twMerge(
        "relative flex w-full flex-1 flex-col overflow-hidden bg-gray-950 lg:min-w-0 lg:bg-white lg:text-gray-900",
        className,
      )}
      {...props}
    />
  )
}

type SidebarDisclosureGroupProps = DisclosureGroupProps
const SidebarDisclosureGroup = ({
  allowsMultipleExpanded = true,
  className,
  ...props
}: SidebarDisclosureGroupProps) => {
  return (
    <DisclosureGroup
      data-slot="sidebar-disclosure-group"
      allowsMultipleExpanded={allowsMultipleExpanded}
      className={cx(className, "col-span-full flex flex-col gap-y-6")}
      {...props}
    />
  )
}

interface SidebarDisclosureProps extends DisclosureProps {
  ref?: React.Ref<HTMLDivElement>
}
const SidebarDisclosure = ({ className, ref, ...props }: SidebarDisclosureProps) => {
  return (
    <Disclosure
      ref={ref}
      data-slot="sidebar-disclosure"
      className={cx(className, "col-span-full")}
      {...props}
    />
  )
}

interface SidebarDisclosureTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
}

const SidebarDisclosureTrigger = ({ className, ref, ...props }: SidebarDisclosureTriggerProps) => {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  return (
    <Heading level={3}>
      <Trigger
        ref={ref}
        slot="trigger"
        className={composeRenderProps(
          className,
          (className, { isPressed, isFocusVisible, isHovered, isDisabled }) =>
            twMerge(
              "flex w-full items-center rounded-lg text-left font-medium text-base/6 text-white",
              "group/sidebar-disclosure-trigger relative col-span-full overflow-hidden focus-visible:outline-hidden",
              "**:data-[slot=menu-trigger]:absolute **:data-[slot=menu-trigger]:right-0 **:data-[slot=menu-trigger]:flex **:data-[slot=menu-trigger]:h-full **:data-[slot=menu-trigger]:w-[calc(var(--sidebar-width)-90%)] **:data-[slot=menu-trigger]:items-center **:data-[slot=menu-trigger]:justify-end **:data-[slot=menu-trigger]:pr-2.5 **:data-[slot=menu-trigger]:opacity-0 **:data-[slot=menu-trigger]:pressed:opacity-100 **:data-[slot=menu-trigger]:has-data-focus:opacity-100 **:data-[slot=menu-trigger]:focus-visible:opacity-100 hover:**:data-[slot=menu-trigger]:opacity-100",
              "**:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-gray-400 sm:**:data-[slot=icon]:size-4",
              "**:last:data-[slot=icon]:size-5 sm:**:last:data-[slot=icon]:size-4",
              "**:data-[slot=avatar]:-m-0.5 **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:size-5",
              collapsed
                ? "size-9 justify-center *:[[slot=label]]:hidden"
                : "col-span-full gap-3 p-2 **:data-[slot=chevron]:text-gray-400 **:last:data-[slot=icon]:ml-auto sm:gap-2.5 sm:py-2 sm:text-sm/5",
              isFocusVisible && "inset-ring inset-ring-ring/70",
              (isPressed || isHovered) &&
                "bg-gray-700 text-white **:data-[slot=chevron]:text-white",
              isDisabled && "opacity-50",
              className,
            ),
        )}
        {...props}
      >
        {(values) => (
          <>
            {typeof props.children === "function" ? props.children(values) : props.children}
            {state !== "collapsed" && (
              <ChevronDownIcon
                data-slot="chevron"
                className="z-10 ml-auto size-3.5 transition-transform duration-200 group-aria-expanded/sidebar-disclosure-trigger:rotate-180"
              />
            )}
          </>
        )}
      </Trigger>
    </Heading>
  )
}

const SidebarDisclosurePanel = ({ className, style, ...props }: DisclosurePanelProps) => {
  const { isExpanded } = use(DisclosureStateContext)!
  const contentRef = useRef<HTMLDivElement>(null)
  const isSafari = useMemo(() => {
    if (typeof navigator === "undefined") return false
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  }, [])

  return (
    <DisclosurePanel
      data-slot="sidebar-disclosure-panel"
      style={{
        height: !isSafari ? (isExpanded ? contentRef?.current?.scrollHeight : 0) : undefined,
        ...style,
      }}
      className={cx(
        className,
        !isSafari && "overflow-hidden transition-[height] duration-200 ease-in-out",
      )}
      {...props}
    >
      <div ref={contentRef} className="col-span-full grid grid-cols-[auto_1fr] gap-y-0.5">
        {props.children}
      </div>
    </DisclosurePanel>
  )
}

const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => {
  return (
    <Separator
      data-slot="sidebar-separator"
      orientation="horizontal"
      className={twMerge(
        "col-span-full mx-auto my-2.5 h-px w-[calc(var(--sidebar-width)--spacing(6))] bg-border",
        className,
      )}
      {...props}
    />
  )
}

const SidebarTrigger = ({
  onPress,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      aria-label={props["aria-label"] || "Toggle Sidebar"}
      data-slot="sidebar-trigger"
      intent={props.intent || "plain"}
      size={props.size || "sq-sm"}
      className={cx(className, "shrink-0")}
      onPress={(event) => {
        onPress?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {children || (
        <>
          <svg
            data-slot="icon"
            className="size-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width={16}
            height={16}
            fill="currentcolor"
          >
            <path d="M13.25 2.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H7.5V15h5.75A2.75 2.75 0 0 0 16 12.25v-8.5A2.75 2.75 0 0 0 13.25 1H7.5v1.5zM5.75 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-3A2.75 2.75 0 0 1 0 12.25v-8.5A2.75 2.75 0 0 1 2.75 1z" />
          </svg>
          <span className="sr-only">Toggle Sidebar</span>
        </>
      )}
    </Button>
  )
}

const SidebarRail = ({ className, ref, ...props }: React.ComponentProps<"button">) => {
  const { toggleSidebar } = useSidebar()

  return !props.children ? (
    <button
      ref={ref}
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      className={twMerge(
        "-translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 outline-hidden transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-transparent group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=hidden]:translate-x-0 group-data-[collapsible=hidden]:after:left-full",
        "[[data-side=left][data-collapsible=hidden]_&]:-right-2 [[data-side=right][data-collapsible=hidden]_&]:-left-2",
        className,
      )}
      {...props}
    />
  ) : (
    props.children
  )
}

const SidebarLabel = ({ className, ref, ...props }: React.ComponentProps<typeof Text>) => {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  if (!collapsed) {
    return (
      <Text
        data-slot="sidebar-label"
        tabIndex={-1}
        ref={ref}
        slot="label"
        className={twMerge(
          "col-start-2 overflow-hidden whitespace-nowrap outline-hidden",
          className,
        )}
        {...props}
      >
        {props.children}
      </Text>
    )
  }
  return null
}

interface SidebarNavProps extends React.ComponentProps<"nav"> {
  isSticky?: boolean
}

const SidebarNav = ({ isSticky = false, className, ...props }: SidebarNavProps) => {
  return (
    <nav
      data-slot="sidebar-nav"
      className={twMerge(
        "isolate flex items-center justify-between gap-x-2 px-(--container-padding,--spacing(4)) py-2.5 text-navbar-fg sm:justify-start sm:px-(--gutter,--spacing(4)) md:w-full",
        isSticky && "static top-0 z-40 group-has-data-[intent=default]/sidebar-root:sticky",
        className,
      )}
      {...props}
    />
  )
}

export type {
  SidebarProviderProps,
  SidebarProps,
  SidebarSectionProps,
  SidebarItemProps,
  SidebarNavProps,
  SidebarDisclosureGroupProps,
  SidebarDisclosureProps,
  SidebarSeparatorProps,
  SidebarLinkProps,
  SidebarDisclosureTriggerProps,
}

export {
  SidebarProvider,
  SidebarNav,
  SidebarHeader,
  SidebarContent,
  SidebarSectionGroup,
  SidebarSection,
  SidebarItem,
  SidebarLink,
  SidebarFooter,
  Sidebar,
  SidebarDisclosureGroup,
  SidebarDisclosure,
  SidebarSeparator,
  SidebarDisclosureTrigger,
  SidebarDisclosurePanel,
  SidebarTrigger,
  SidebarLabel,
  SidebarInset,
  SidebarRail,
  useSidebar,
}
