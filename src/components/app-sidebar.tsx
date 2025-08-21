"use client"

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid"
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
  BeakerIcon,
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
  InboxIcon,
  KeyIcon,
  LifebuoyIcon,
  LinkIcon,
  MegaphoneIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  ReceiptPercentIcon,
  RectangleGroupIcon,
  ShoppingBagIcon,
  SignalIcon,
  Squares2X2Icon,
  StarIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
  UsersIcon,
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
  section: string
  items: MenuItemProps[]
}

export const menus: MenuSectionProps[] = [
  {
    section: "Products",
    items: [
      { label: "Catalog", href: "/dashboard/products", icon: TagIcon },
      { label: "Inventory", href: "/dashboard/inventory", icon: ArchiveBoxIcon },
      { label: "Collections", href: "/dashboard/collections", icon: RectangleGroupIcon },
      { label: "Reviews", href: "/dashboard/reviews", icon: StarIcon },
    ],
  },
  {
    section: "Customers",
    items: [
      { label: "Customer list", href: "/dashboard/customers", icon: UserGroupIcon },
      { label: "Segments", href: "/dashboard/customers/segments", icon: AdjustmentsHorizontalIcon },
      { label: "Messages", href: "/dashboard/messages", icon: ChatBubbleBottomCenterTextIcon },
      { label: "Loyalty", href: "/dashboard/loyalty", icon: GiftIcon },
    ],
  },
  {
    section: "Shipping",
    items: [
      { label: "Shipments", href: "/dashboard/fulfillment/shipments", icon: TruckIcon },
      {
        label: "Shipping zones",
        href: "/dashboard/fulfillment/zones",
        icon: BuildingStorefrontIcon,
      },
      { label: "Returns", href: "/dashboard/fulfillment/returns", icon: ArrowUturnLeftIcon },
    ],
  },
  {
    section: "Marketing",
    items: [
      { label: "Campaigns", href: "/dashboard/marketing/campaigns", icon: MegaphoneIcon },
      { label: "Channels", href: "/dashboard/marketing/channels", icon: Squares2X2Icon },
      { label: "Affiliates", href: "/dashboard/marketing/affiliates", icon: UsersIcon },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Payouts", href: "/dashboard/finance/payouts", icon: BanknotesIcon },
      { label: "Invoices", href: "/dashboard/finance/invoices", icon: DocumentTextIcon },
      { label: "Taxes", href: "/dashboard/finance/taxes", icon: ClipboardDocumentListIcon },
      { label: "Expenses", href: "/dashboard/finance/expenses", icon: ChartBarIcon },
    ],
  },
  {
    section: "Analytics",
    items: [
      { label: "Reports", href: "/dashboard/analytics/reports", icon: ChartBarIcon },
      { label: "Cohorts", href: "/dashboard/analytics/cohorts", icon: ChartPieIcon },
      { label: "Experiments", href: "/dashboard/analytics/experiments", icon: BeakerIcon },
    ],
  },
  {
    section: "Support",
    items: [
      { label: "Tickets", href: "/dashboard/support/tickets", icon: LifebuoyIcon },
      { label: "Help center", href: "/dashboard/support/help", icon: QuestionMarkCircleIcon },
      { label: "Status", href: "/dashboard/support/status", icon: SignalIcon },
    ],
  },
  {
    section: "Integrations",
    items: [
      { label: "Apps", href: "/dashboard/apps", icon: PuzzlePieceIcon },
      { label: "Webhooks", href: "/dashboard/integrations/webhooks", icon: LinkIcon },
      { label: "API keys", href: "/dashboard/developers/api-keys", icon: KeyIcon },
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
            <PrimitiveSidebarItem
              href="/dashboard"
              tooltip="Dashboard"
              isCurrent={pathname === "/dashboard"}
            >
              <ChartPieIcon />
              <SidebarLabel>Dashboard</SidebarLabel>
            </PrimitiveSidebarItem>
            <SidebarItem href="/dashboard/analythics" tooltip="Analytics">
              <ChartBarIcon />
              <SidebarLabel>Analytics</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/dashboard/reports" tooltip="Reports">
              <DocumentDuplicateIcon />
              <SidebarLabel>Reports</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
          <SidebarSection label="Sales">
            {[
              { label: "Orders", href: "/dashboard/orders", icon: ShoppingBagIcon },
              {
                label: "Abandoned checkouts",
                href: "/dashboard/orders/abandoned",
                icon: InboxIcon,
              },
              { label: "Discounts", href: "/dashboard/discounts", icon: ReceiptPercentIcon },
              { label: "Payments", href: "/dashboard/payments", icon: CreditCardIcon },
              { label: "Transactions", href: "/dashboard/transactions", icon: CurrencyDollarIcon },
              {
                label: "Subscriptions",
                href: "/dashboard/subscriptions",
                icon: ClipboardDocumentListIcon,
              },
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
              .filter((section) => pathname.startsWith(`/dashboard/${section.toLowerCase()}`))}
            className="gap-y-0.5"
            allowsMultipleExpanded={false}
          >
            {menus.map((item) => (
              <SidebarDisclosure id={item.section} key={item.section}>
                <SidebarDisclosureTrigger>{item.section}</SidebarDisclosureTrigger>
                <SidebarDisclosurePanel>
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

function SidebarItem(props: React.ComponentProps<typeof PrimitiveSidebarItem>) {
  const pathname = usePathname()
  const isCurrent = props.href === pathname
  return <PrimitiveSidebarItem isCurrent={isCurrent} {...props} />
}
