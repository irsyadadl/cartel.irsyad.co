"use client"

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid"
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline"
import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronUpDownIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  GiftIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  ReceiptPercentIcon,
  RectangleGroupIcon,
  ShoppingBagIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid"
import { twJoin } from "tailwind-merge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { CubeIcon } from "@heroicons/react/16/solid"

const teams = [
  { members: 12, label: "Pixelwave", initials: "PW" },
  { members: 8, label: "Cloudnest", initials: "CN" },
  { members: 18, label: "Neurocore", initials: "NC" },
  { members: 6, label: "Orbitly", initials: "OB" },
  { members: 22, label: "Synkrino", initials: "SK" },
]

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

const userMenuItems = [
  {
    label: "Notifications",
    href: "#",
    icon: BellIcon,
  },
  {
    label: "Preferences",
    href: "#",
    icon: Cog6ToothIcon,
  },
  {
    label: "Help Center",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
  {
    label: "Users & Permissions",
    href: "#",
    icon: UserGroupIcon,
  },
  {
    label: "Billing",
    href: "#",
    icon: CreditCardIcon,
  },
  {
    label: "Integrations",
    href: "#",
    icon: PuzzlePieceIcon,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const pathname = usePathname()
  const isCollapsed = state === "collapsed"
  return (
    <Sidebar closeButton={false} collapsible="dock">
      <SidebarHeader className="border-fg/5 border-b group-data-[state=collapsed]:border-b-0">
        <Menu>
          <Button
            size={isCollapsed ? "sq-sm" : "md"}
            className={
              isCollapsed
                ? "size-8"
                : "group justify-between gap-x-2 px-0 [--btn-overlay:transparent] sm:px-0 sm:py-0"
            }
            intent="plain"
          >
            <Avatar
              className="outline-hidden"
              src="https://irsyad.co/logo?color=51A2FF"
              size="sm"
            />
            {!isCollapsed && <SidebarLabel className="mr-auto">{teams[0].label}</SidebarLabel>}

            {!isCollapsed && (
              <ChevronUpDownIcon data-slot="chevron" className="size-4 text-gray-300" />
            )}
          </Button>
          <MenuContent
            popover={{ className: "min-w-(--trigger-width)] bg-gray-900 border-gray-800" }}
          >
            <MenuSection items={teams}>
              {(item) => (
                <MenuItem id={item.label} className="flex items-center gap-x-2">
                  <Avatar
                    className="bg-blue-600/15 text-blue-400"
                    initials={item.initials}
                    size="sm"
                  />
                  <span>{item.label}</span>
                </MenuItem>
              )}
            </MenuSection>
          </MenuContent>
        </Menu>
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
              .filter((section) => pathname.startsWith(`/${section.toLowerCase()}`))}
            className="gap-y-0.5"
            allowsMultipleExpanded={false}
          >
            {menus.map((item) => (
              <SidebarDisclosure defaultExpanded id={item.section} key={item.section}>
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
      <SidebarFooter className="flex flex-row justify-between gap-4 group-data-[state=collapsed]:flex-col">
        <Menu>
          <MenuTrigger className="group" aria-label="Profile">
            <Avatar
              className={twJoin([
                "group-data-[state=collapsed]:size-6 group-data-[state=collapsed]:*:size-6",
                "size-8 *:size-8",
              ])}
              src="https://irsyad.co/images/blocks/avatar/woman.webp?v=1"
            />
          </MenuTrigger>

          <MenuContent className="min-w-61.5" placement="bottom right">
            <MenuSection>
              <MenuHeader separator>
                <span className="block">Katy Perry</span>
                <span className="font-normal text-muted-fg">@perry</span>
              </MenuHeader>
            </MenuSection>

            {userMenuItems.map((item) => (
              <MenuItem key={item.label} href={item.href} className="flex items-center gap-x-2">
                <item.icon className="size-4" />
                <MenuLabel>{item.label}</MenuLabel>
              </MenuItem>
            ))}
            <MenuSeparator />
            <MenuItem href="#logout">
              <ArrowRightStartOnRectangleIcon />
              Log out
            </MenuItem>
          </MenuContent>
        </Menu>
        <SidebarTrigger className="text-white hover:bg-gray-700" isCircle>
          <ChevronDoubleLeftIcon
            data-slot="chevron"
            className="block size-4 group-data-[state=collapsed]:hidden"
          />
          <ChevronDoubleRightIcon
            data-slot="chevron"
            className="hidden size-4 group-data-[state=collapsed]:block"
          />
        </SidebarTrigger>
      </SidebarFooter>
      <SidebarRail />
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
