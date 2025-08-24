"use client"

import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  GiftIcon,
  ReceiptPercentIcon,
  RectangleGroupIcon,
  ShoppingBagIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid"
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline"
import { twJoin, twMerge } from "tailwind-merge"
import { Avatar } from "@/components/ui/avatar"
import { buttonStyles } from "@/components/ui/button"
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu"
import {
  Sidebar,
  SidebarContent,
  SidebarDisclosure,
  SidebarDisclosureGroup,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem as PrimitiveSidebarItem,
  SidebarLabel,
  SidebarRail,
  SidebarSection,
  SidebarSectionGroup,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { CubeIcon } from "@heroicons/react/16/solid"
import { useEffect } from "react"
import { Logo } from "@/components/logo"
import { Link } from "@/components/ui/link"
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"
import { Pressable } from "react-aria-components"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"

type IconType = (props: React.SVGProps<SVGSVGElement>) => React.ReactNode

type MenuItemProps = {
  label: string
  href: string
  icon: IconType
}

type MenuSectionProps = {
  icon?: IconType
  section: string
  items: MenuItemProps[]
}

export const menus: MenuSectionProps[] = [
  {
    section: "Products",
    icon: CubeIcon,
    items: [
      { label: "Catalog", href: "/products", icon: TagIcon },
      { label: "Inventory", href: "/products/inventory", icon: ArchiveBoxIcon },
      { label: "Collections", href: "/products/collections", icon: RectangleGroupIcon },
      { label: "Reviews", href: "/products/reviews", icon: StarIcon },
    ],
  },
  {
    section: "Customers",
    icon: UserGroupIcon,
    items: [
      { label: "Customer list", href: "/customers", icon: UserGroupIcon },
      { label: "Segments", href: "/customers/segments", icon: AdjustmentsHorizontalIcon },
      { label: "Messages", href: "/customers/messages", icon: ChatBubbleBottomCenterTextIcon },
      { label: "Loyalty", href: "/customers/loyalty", icon: GiftIcon },
    ],
  },
  {
    section: "Shipping",
    icon: TruckIcon,
    items: [
      { label: "Shipments", href: "/shipping/fulfillment/shipments", icon: TruckIcon },
      {
        label: "Shipping zones",
        href: "/shipping/fulfillment/zones",
        icon: BuildingStorefrontIcon,
      },
      { label: "Returns", href: "/shipping/fulfillment/returns", icon: ArrowUturnLeftIcon },
    ],
  },
  {
    section: "Finance",
    icon: BanknotesIcon,
    items: [
      { label: "Payouts", href: "/finance/payouts", icon: BanknotesIcon },
      { label: "Invoices", href: "/finance/invoices", icon: DocumentTextIcon },
      { label: "Taxes", href: "/finance/taxes", icon: ClipboardDocumentListIcon },
      { label: "Expenses", href: "/finance/expenses", icon: ChartBarIcon },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state, isMobile, setIsOpenOnMobile, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  useEffect(() => {
    if (isMobile) setIsOpenOnMobile(false)
  }, [pathname, isMobile, setIsOpenOnMobile])

  return (
    <Sidebar closeButton={false} collapsible="dock">
      <SidebarHeader className="border-fg/5 border-b group-data-[state=collapsed]:border-b-0">
        <Link
          className={buttonStyles({
            intent: "plain",
            className: twJoin(
              "",
              isCollapsed
                ? "size-8 pressed:bg-gray-700 hover:bg-gray-700"
                : "group justify-between gap-x-3 px-0 [--btn-overlay:transparent] sm:px-0 sm:py-0",
            ),
          })}
          href="/"
        >
          <Logo className="size-5" />
          {!isCollapsed && <SidebarLabel className="mr-auto">Cartel</SidebarLabel>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          <SidebarSection>
            <SidebarItem href="/" tooltip="Dashboard">
              <ChartPieIcon />
              <SidebarLabel>Dashboard</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/analythics" tooltip="Analytics">
              <ChartBarIcon />
              <SidebarLabel>Analytics</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/reports" tooltip="Reports">
              <DocumentDuplicateIcon />
              <SidebarLabel>Reports</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
          <SidebarSection label="Sales">
            {[
              { label: "Orders", href: "/orders", icon: ShoppingBagIcon },
              { label: "Discounts", href: "/discounts", icon: ReceiptPercentIcon },
              { label: "Transactions", href: "/transactions", icon: CurrencyDollarIcon },
            ].map((item) => (
              <SidebarItem key={item.label} href={item.href} tooltip={item.label}>
                <item.icon className="size-4" />
                <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarItem>
            ))}
          </SidebarSection>
          <SidebarDisclosureGroup
            defaultExpandedKeys={menus
              .map((menu) => menu.section)
              .filter((section) => pathname.startsWith(`/${section.toLowerCase()}`))
              .concat(
                menus.some((menu) => pathname.startsWith(`/${menu.section.toLowerCase()}`))
                  ? []
                  : ["Products"],
              )}
            className="gap-y-0.5"
            allowsMultipleExpanded={false}
          >
            {menus.map((item) => (
              <SidebarDisclosure id={item.section} key={item.section}>
                <SidebarDisclosureTrigger>
                  {item.icon && <item.icon className="size-4" />}
                  <MenuLabel>{item.section}</MenuLabel>
                </SidebarDisclosureTrigger>
                <SidebarDisclosurePanel
                  className={twJoin(!isCollapsed && "ml-4 border-gray-800 border-l pl-2")}
                >
                  {item.items.map((child) => (
                    <SidebarItem key={child.label} href={child.href} tooltip={child.label}>
                      <child.icon className="size-4" />
                      <SidebarLabel>{child.label}</SidebarLabel>
                    </SidebarItem>
                  ))}
                </SidebarDisclosurePanel>
              </SidebarDisclosure>
            ))}
          </SidebarDisclosureGroup>
        </SidebarSectionGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row">
        <Menu>
          <MenuTrigger
            className={twJoin(
              !isCollapsed &&
                "group relative flex w-full items-center gap-x-3 rounded-lg pressed:bg-gray-700 p-1 hover:bg-gray-700",
            )}
            aria-label="Profile"
          >
            <Avatar
              isSquare={!isCollapsed}
              className={twJoin([
                "group-data-[state=collapsed]:size-6 group-data-[state=collapsed]:*:size-6",
                "size-8 *:size-8",
              ])}
              src="https://irsyad.co/images/blocks/avatar/woman.webp?v=1"
            />
            {!isCollapsed && (
              <>
                <div>
                  <span className="block font-medium text-sm/4 text-white">Katy Perry</span>
                  <span className="block text-gray-400 text-sm">@perry</span>
                </div>
                <ChevronUpDownIcon className="-translate-y-1/2 absolute top-1/2 right-2 size-4 shrink-0 text-gray-400 group-hover:text-white group-pressed:text-white" />
              </>
            )}
          </MenuTrigger>

          <MenuContent
            className="min-w-61.5"
            popover={{
              className: "border-gray-700 bg-gray-900",
            }}
            placement="bottom right"
          >
            <MenuSection>
              <MenuHeader>
                <span className="block text-white">Katy Perry</span>
                <span className="font-normal text-gray-400">@perry</span>
              </MenuHeader>
            </MenuSection>
            <MenuSeparator />

            <MenuItem href="#">
              <BellIcon />
              <MenuLabel>Notifications</MenuLabel>
            </MenuItem>
            <MenuItem href="#">
              <Cog6ToothIcon />
              <MenuLabel>Preferences</MenuLabel>
            </MenuItem>
            <MenuItem href="#">
              <UserGroupIcon />
              <MenuLabel>Users & Permissions</MenuLabel>
            </MenuItem>
            <MenuSeparator />
            <MenuItem href="#logout">
              <ArrowRightStartOnRectangleIcon />
              <MenuLabel>Log out</MenuLabel>
            </MenuItem>
          </MenuContent>
        </Menu>
      </SidebarFooter>
      <SidebarRail>
        <Tooltip delay={0}>
          <Pressable>
            <button
              type="button"
              data-slot="sidebar-rail"
              aria-label="Toggle Sidebar"
              tabIndex={-1}
              onClick={toggleSidebar}
              title="Toggle Sidebar"
              className={twMerge(
                "in-data-[side=left]:-translate-x-2 -translate-y-1/2 fixed top-1/2 in-data-[side=right]:right-(--sidebar-width) in-data-[side=left]:left-(--sidebar-width) h-20 w-8 in-data-[side=right]:translate-x-2 cursor-pointer transition-[left,right,translate] duration-300 ease-in-out in-data-[side=right]:group-data-[collapsible=dock]:right-(--sidebar-width-dock) in-data-[side=right]:group-data-[collapsible=hidden]:right-0 in-data-[side=left]:group-data-[collapsible=dock]:left-(--sidebar-width-dock) in-data-[side=left]:group-data-[collapsible=hidden]:left-0 group-data-[state=collapsed]:translate-x-0 max-md:hidden",
              )}
            >
              <div
                className="in-data-[side=right]:-translate-x-2 group-data-[state=collapsed]:in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:before:-rotate-45 in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:after:-rotate-45 in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:-translate-x-1 group-data-[state=collapsed]:in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:-translate-x-3 group-data-[state=collapsed]:group-data-[collapsible=dock]:in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:-translate-x-1 in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:before:-rotate-45 group-data-[state=collapsed]:in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:after:-rotate-45 pointer-events-none in-data-[side=right]:ml-auto h-6 w-4 in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:translate-x-1 in-data-[side=left]:translate-x-2 in-[[data-slot=sidebar-rail]:hover]:opacity-100 opacity-50 transition-all ease-in-out before:absolute before:top-[calc(50%-7px)] in-data-[side=left]:before:left-[calc(50%-1px)] in-data-[side=right]:before:left-[calc(50%+1)] before:h-[9px] before:w-0.5 in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:before:rotate-45 before:rounded-full before:bg-muted-fg before:transition-all after:absolute after:bottom-[calc(50%-7px)] in-data-[side=left]:after:left-[calc(50%-1px)] in-data-[side=right]:after:left-[calc(50%+1)] after:h-[9px] after:w-0.5 in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:after:rotate-45 after:rounded-full after:bg-muted-fg after:transition-all group-data-[state=collapsed]:group-data-[collapsible=dock]:in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:translate-x-1 group-data-[state=collapsed]:in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:translate-x-3 group-data-[state=collapsed]:translate-x-0 group-data-[state=collapsed]:in-data-[side=left]:in-[[data-slot=sidebar-rail]:hover]:after:rotate-45 group-data-[state=collapsed]:in-data-[side=right]:in-[[data-slot=sidebar-rail]:hover]:before:rotate-45"
                aria-hidden="true"
              />
            </button>
          </Pressable>
          <TooltipContent inverse placement="right" className="[&_span]:hidden">
            {state === "collapsed" ? "Expand" : "Collapse"}
          </TooltipContent>
        </Tooltip>
      </SidebarRail>
    </Sidebar>
  )
}

const clean = (s: string) => (s.length > 1 && s.endsWith("/") ? s.slice(0, -1) : s)

function getSiblingPrefixes(href: string) {
  const base = `/${clean(href).split("/").filter(Boolean)[0]}`
  const section = menus.find((m) => `/${m.section.toLowerCase() === base}`)
  if (!section) return []
  return section.items.map((it) => clean(it.href)).filter((h) => h !== clean(href))
}

function normalizePath(path: string) {
  const parts = path.split("?")[0].split("#")[0].split("/").filter(Boolean)
  if (parts[0] === "dashboard") parts.shift()
  return `/${parts.join("/")}`
}

function isActive(pathname: string, href?: string) {
  if (!href) return false

  const path = clean(normalizePath(pathname))
  const target = clean(href)

  // root dashboard
  if (target === "/") return path === "/"

  // exact match
  if (path === target) return true

  if (path.startsWith(`${target}/`)) {
    const siblings = getSiblingPrefixes(target)
    return !siblings.some((s) => path === s || path.startsWith(`${s}/`))
  }

  return false
}

function SidebarItem(props: React.ComponentProps<typeof PrimitiveSidebarItem>) {
  const pathname = usePathname()
  const href = typeof props.href === "string" ? props.href : undefined
  const isCurrent = isActive(pathname, href)
  return <PrimitiveSidebarItem isCurrent={isCurrent} {...props} />
}
