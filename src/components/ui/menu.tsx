"use client"

import { CheckIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import type {
  ButtonProps,
  MenuItemProps as MenuItemPrimitiveProps,
  MenuProps as MenuPrimitiveProps,
  MenuSectionProps as MenuSectionPrimitiveProps,
  MenuTriggerProps as MenuTriggerPrimitiveProps,
} from "react-aria-components"
import {
  Button,
  Collection,
  composeRenderProps,
  Header,
  MenuItem as MenuItemPrimitive,
  Menu as MenuPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { tv, type VariantProps } from "tailwind-variants"
import { composeTailwindRenderProps } from "@/lib/primitive"
import {
  DropdownDescription,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSeparator,
  dropdownSectionStyles,
} from "./dropdown"
import { PopoverContent, type PopoverContentProps } from "./popover"

const Menu = (props: MenuTriggerPrimitiveProps) => <MenuTriggerPrimitive {...props} />

const MenuSubMenu = ({ delay = 0, ...props }) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

interface MenuTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
}

const MenuTrigger = ({ className, ref, ...props }: MenuTriggerProps) => (
  <Button
    ref={ref}
    data-slot="menu-trigger"
    className={composeTailwindRenderProps(
      className,
      "relative inline text-left outline-hidden focus-visible:ring-1 focus-visible:ring-primary",
    )}
    {...props}
  />
)

interface MenuContentProps<T>
  extends MenuPrimitiveProps<T>,
    Pick<PopoverContentProps, "placement"> {
  className?: string
  popover?: Pick<
    PopoverContentProps,
    | "showArrow"
    | "className"
    | "placement"
    | "offset"
    | "crossOffset"
    | "arrowBoundaryOffset"
    | "triggerRef"
    | "isOpen"
    | "onOpenChange"
    | "shouldFlip"
  >
}

const MenuContent = <T extends object>({
  className,
  placement,
  popover,
  ...props
}: MenuContentProps<T>) => {
  return (
    <PopoverContent
      className={composeTailwindRenderProps(
        popover?.className,
        "min-w-40 overflow-hidden bg-gray-950",
      )}
      placement={placement}
      {...popover}
    >
      <MenuPrimitive
        data-slot="menu-content"
        className={composeTailwindRenderProps(
          className,
          "grid max-h-[inherit] grid-cols-[auto_1fr] overflow-y-auto overscroll-contain p-1 outline-hidden [clip-path:inset(0_0_0_0_round_calc(var(--radius-lg)-2px))] *:[[role='group']+[role=group]]:mt-1 *:[[role='group']+[role=separator]]:mt-1",
        )}
        {...props}
      />
    </PopoverContent>
  )
}

const menuItemStyles = tv({
  base: [
    "[--mr-icon:--spacing(2)] sm:[--mr-icon:--spacing(1.5)]",
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] px-3 py-2 supports-[grid-template-columns:subgrid]:grid-cols-subgrid sm:px-2.5 sm:py-1.5",
    "not-has-[[slot=description]]:items-center has-[[slot=description]]:**:data-[slot=check-indicator]:mt-[1.5px]",
    "group relative cursor-default select-none rounded-[calc(var(--radius-lg)-1px)] text-base/6 text-white outline-0 sm:text-sm/6",
    "**:data-[slot=avatar]:*:mr-1.5 **:data-[slot=avatar]:*:size-6 **:data-[slot=avatar]:mr-(--mr-icon) **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:*:size-5 sm:**:data-[slot=avatar]:size-5",
    "*:data-[slot=icon]:mr-(--mr-icon) **:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-gray-400 sm:**:data-[slot=icon]:size-4",
    "[&>[slot=label]+[data-slot=icon]]:absolute [&>[slot=label]+[data-slot=icon]]:right-1",
    "data-danger:text-rose-500 data-danger:**:data-[slot=icon]:text-rose-500/60",
    "forced-color-adjust-none forced-colors:text-[CanvasText] forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-focus:**:data-[slot=icon]:text-[CanvasText]",
  ],
  variants: {
    isDisabled: {
      true: "text-gray-400 forced-colors:text-[GrayText]",
    },
    isSelected: {
      true: "**:data-[slot=avatar]:*:hidden **:data-[slot=avatar]:hidden **:data-[slot=icon]:hidden **:data-[slot=icon]:text-white",
    },
    isDanger: {
      true: [
        "text-rose-500 focus:text-rose-500 **:data-[slot=icon]:text-danger/70 focus:**:data-[slot=icon]:text-danger",
        "focus:*:[[slot=description]]:text-danger/80 focus:*:[[slot=label]]:text-rose-500",
        "focus:bg-rose-500/25 focus:text-rose-500 focus:**:data-[slot=icon]:text-rose-500 forced-colors:focus:text-[Mark]",
      ],
    },
    isFocused: {
      true: [
        "**:data-[slot=icon]:text-white **:[kbd]:text-white",
        "bg-gray-700 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "[&_.text-gray-400]:text-white/80 *:[[slot=description]]:text-white *:[[slot=label]]:text-white",
      ],
    },
    isHovered: {
      true: [
        "**:data-[slot=icon]:text-white **:[kbd]:text-white",
        "bg-gray-700 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "[&_.text-gray-400]:text-white/80 *:[[slot=description]]:text-white *:[[slot=label]]:text-white",
      ],
    },
  },
})

interface MenuItemProps extends MenuItemPrimitiveProps, VariantProps<typeof menuItemStyles> {
  isDanger?: boolean
}

const MenuItem = ({ className, isDanger = false, children, ...props }: MenuItemProps) => {
  const textValue = props.textValue || (typeof children === "string" ? children : undefined)
  return (
    <MenuItemPrimitive
      data-slot="menu-item"
      className={composeRenderProps(className, (className, { hasSubmenu, ...renderProps }) =>
        menuItemStyles({
          ...renderProps,
          isDanger: isDanger,
          className: hasSubmenu
            ? twMerge(
                "open:data-danger:bg-rose-500/25 open:data-danger:text-rose-500",
                "open:bg-gray-700 open:text-white open:*:data-[slot=icon]:text-white open:*:[.text-gray-400]:text-white",
                className,
              )
            : className,
        }),
      )}
      textValue={textValue}
      {...props}
    >
      {(values) => (
        <>
          {values.isSelected && (
            <>
              {values.selectionMode === "single" && (
                <i
                  aria-hidden
                  data-slot="bullet-icon"
                  className="-mx-0.5 mr-2 flex size-4 shrink-0 items-center justify-center"
                >
                  <i aria-hidden data-slot="indicator" className="size-2 rounded-full bg-current" />
                </i>
              )}
              {values.selectionMode === "multiple" && (
                <CheckIcon className="-mx-0.5 mr-2 size-4" data-slot="check-indicator" />
              )}
            </>
          )}

          {typeof children === "function" ? children(values) : children}

          {values.hasSubmenu && (
            <ChevronRightIcon data-slot="chevron" className="absolute right-2 size-3.5" />
          )}
        </>
      )}
    </MenuItemPrimitive>
  )
}

export interface MenuHeaderProps extends React.ComponentProps<typeof Header> {
  separator?: boolean
}

const MenuHeader = ({ className, separator = false, ...props }: MenuHeaderProps) => (
  <Header
    className={twMerge(
      "col-span-full px-2.5 py-2 font-medium text-base sm:text-sm",
      separator && "-mx-1 mb-1 border-b sm:px-3 sm:pb-[0.625rem]",
      className,
    )}
    {...props}
  />
)

const { section, header } = dropdownSectionStyles()

interface MenuSectionProps<T> extends MenuSectionPrimitiveProps<T> {
  ref?: React.Ref<HTMLDivElement>
  label?: string
}

const MenuSection = <T extends object>({ className, ref, ...props }: MenuSectionProps<T>) => {
  return (
    <MenuSectionPrimitive ref={ref} className={section({ className })} {...props}>
      {"label" in props && <Header className={header()}>{props.label}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSectionPrimitive>
  )
}

const MenuSeparator = ({ className, ...props }: React.ComponentProps<typeof DropdownSeparator>) => (
  <DropdownSeparator className={twMerge("bg-gray-700/75", className)} {...props} />
)
const MenuShortcut = DropdownKeyboard
const MenuLabel = DropdownLabel
const MenuDescription = DropdownDescription

export type { MenuContentProps, MenuTriggerProps, MenuItemProps, MenuSectionProps }
export {
  Menu,
  MenuShortcut,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuLabel,
  MenuDescription,
  MenuTrigger,
  MenuSubMenu,
}
