"use client"

import {
  ClipboardIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  IdentificationIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import orders from "@/data/orders.json"
import { Button } from "@/components/ui/button"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSubMenu,
} from "@/components/ui/menu"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/date"
import {
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { Badge } from "@/components/ui/badge"
import {
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  CreditCardIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/solid"
import {
  ArrowPathRoundedSquareIcon,
  MapPinIcon,
  NoSymbolIcon,
  PrinterIcon,
  QueueListIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid"
import { formatNumber } from "@/lib/number"
import { Paginate } from "@/components/paginate"
import { SearchQuery } from "@/components/search-query"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

export function ListOrders() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading className="sm:text-base">Overview</Heading>
        <Select
          aria-label="Select range"
          placeholder="Select range"
          defaultSelectedKey="this-week"
          className="max-w-[10rem]"
        >
          <SelectTrigger />
          <SelectContent>
            <SelectItem id="today">Today</SelectItem>
            <SelectItem id="yesterday">Yesterday</SelectItem>
            <SelectItem id="this-week">This week</SelectItem>
            <SelectItem id="this-month">This month</SelectItem>
            <SelectItem id="this-year">This year</SelectItem>
            <SelectItem id="last-week">Last week</SelectItem>
            <SelectItem id="last-month">Last month</SelectItem>
            <SelectItem id="last-tm">Last 2 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid divide-x *:pl-6 *:first:pl-0 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <CardHeader className="pb-4">
            <CardDescription>Total revenue</CardDescription>
            <CardTitle className="text-3xl/8 sm:text-2xl/8">$84,210</CardTitle>
          </CardHeader>
          <div className="text-sm/6 sm:text-xs/6">
            <Badge intent="success">+7.2%</Badge>
            <span className="text-gray-500"> from last week</span>
          </div>
        </div>

        <div>
          <CardHeader className="pb-4">
            <CardDescription>Orders</CardDescription>
            <CardTitle className="text-3xl/8 sm:text-2xl/8">1,942</CardTitle>
          </CardHeader>
          <div className="text-sm/6 sm:text-xs/6">
            <Badge intent="secondary">+312</Badge>
            <span className="text-gray-500"> new this week</span>
          </div>
        </div>

        <div>
          <CardHeader className="pb-4">
            <CardDescription>Average order value</CardDescription>
            <CardTitle className="text-3xl/8 sm:text-2xl/8">$43.35</CardTitle>
          </CardHeader>
          <div className="text-sm/6 sm:text-xs/6">
            <Badge intent="success">+3.1%</Badge>
            <span className="text-gray-500"> from last week</span>
          </div>
        </div>

        <div>
          <CardHeader className="pb-4">
            <CardDescription>Refunds</CardDescription>
            <CardTitle className="text-3xl/8 sm:text-2xl/8">$1,120</CardTitle>
          </CardHeader>
          <div className="text-sm/6 sm:text-xs/6">
            <Badge intent="danger">+0.6%</Badge>
            <span className="text-gray-500"> from last week</span>
          </div>
        </div>
      </div>

      <SectionHeader>
        <SectionContent>
          <SectionTitle>Recent orders</SectionTitle>
          <SectionDescription>
            List of all recents orders placed by customers, including order status and payment
            details.
          </SectionDescription>
        </SectionContent>
        <SectionAction>
          <SearchQuery />
        </SectionAction>
      </SectionHeader>

      <Table aria-label="Orders">
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>Order number</TableColumn>
          <TableColumn>Ordered at</TableColumn>
          <TableColumn>Customer email</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Items</TableColumn>
          <TableColumn>Total price</TableColumn>
          <TableColumn />
        </TableHeader>
        <TableBody items={orders}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Badge intent="secondary">{item.order_number}</Badge>
              </TableCell>
              <TableCell className="text-fg/50">{formatDate(item.ordered_at)}</TableCell>
              <TableCell>{item.customer_email}</TableCell>
              <TableCell>
                <Badge
                  intent={
                    (
                      {
                        pending: "warning",
                        paid: "success",
                        shipped: "info",
                        cancelled: "danger",
                        refunded: "secondary",
                      } as any
                    )[item.status] ?? "outline"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                {item.items.length} item{item.items.length > 1 ? "s" : ""}
              </TableCell>
              <TableCell>
                {formatNumber(item.total_price, {
                  currency: "USD",
                  style: "currency",
                })}
              </TableCell>

              <TableCell className="text-end">
                <Menu>
                  <Button size="sq-sm" className="sm:size-6" intent="plain">
                    <EllipsisVerticalIcon />
                  </Button>

                  <MenuContent placement="left top" className="min-w-56">
                    <MenuItem href={`/dashboard/orders/${item.id}`}>
                      <IdentificationIcon />
                      <MenuLabel>View order</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/dashboard/customers/${item.customer_id}`}>
                      <UserIcon />
                      <MenuLabel>View customer</MenuLabel>
                    </MenuItem>

                    <MenuSeparator />

                    <MenuItem href={`/dashboard/orders/${item.id}/invoice`}>
                      <PrinterIcon />
                      <MenuLabel>Download invoice</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/dashboard/orders/${item.id}/packing-slip`}>
                      <DocumentTextIcon />
                      <MenuLabel>Print packing slip</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/dashboard/orders/${item.id}/resend-receipt`}>
                      <EnvelopeIcon />
                      <MenuLabel>Resend receipt</MenuLabel>
                    </MenuItem>

                    <MenuSeparator />

                    {item.status === "authorized" && (
                      <MenuItem href={`/dashboard/orders/${item.id}/payment/capture`}>
                        <CreditCardIcon />
                        <MenuLabel>Capture payment</MenuLabel>
                      </MenuItem>
                    )}
                    {item.status === "paid" ? (
                      <>
                        <MenuItem href={`/dashboard/orders/${item.id}/refund`}>
                          <ArrowUturnLeftIcon />
                          <MenuLabel>Refund</MenuLabel>
                        </MenuItem>
                        <MenuItem href={`/dashboard/orders/${item.id}/payment/mark-unpaid`}>
                          <XCircleIcon />
                          <MenuLabel>Mark as unpaid</MenuLabel>
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem href={`/dashboard/orders/${item.id}/payment/mark-paid`}>
                          <BanknotesIcon />
                          <MenuLabel>Mark as paid</MenuLabel>
                        </MenuItem>
                        <MenuItem href={`/dashboard/orders/${item.id}/payment/send-link`}>
                          <LinkIcon />
                          <MenuLabel>Send payment link</MenuLabel>
                        </MenuItem>
                      </>
                    )}

                    <MenuSeparator />

                    <MenuItem href={`/dashboard/orders/${item.id}/tracking`}>
                      <QueueListIcon />
                      <MenuLabel>Add tracking</MenuLabel>
                    </MenuItem>
                    {item.shipping_address && (
                      <MenuItem
                        onAction={() =>
                          window.open(
                            `https://maps.google.com/?q=${encodeURIComponent(item.shipping_address)}`,
                            "_blank",
                          )
                        }
                      >
                        <MapPinIcon />
                        <MenuLabel>Open shipping address</MenuLabel>
                      </MenuItem>
                    )}

                    <MenuSeparator />

                    <MenuSubMenu>
                      <MenuItem>
                        <ClipboardIcon />
                        <MenuLabel>Copy</MenuLabel>
                      </MenuItem>
                      <MenuContent>
                        <MenuItem
                          onAction={() => navigator.clipboard.writeText(String(item.order_number))}
                        >
                          <ClipboardIcon />
                          <MenuLabel>Copy order number</MenuLabel>
                        </MenuItem>
                        <MenuItem
                          onAction={() =>
                            navigator.clipboard.writeText(String(item.customer_email))
                          }
                        >
                          <ClipboardIcon />
                          <MenuLabel>Copy customer email</MenuLabel>
                        </MenuItem>
                        <MenuItem
                          onAction={() => navigator.clipboard.writeText(String(item.total_price))}
                        >
                          <ClipboardIcon />
                          <MenuLabel>Copy total</MenuLabel>
                        </MenuItem>
                      </MenuContent>
                    </MenuSubMenu>

                    <MenuSeparator />

                    {item.status === "canceled" ? (
                      <MenuItem href={`/dashboard/orders/${item.id}/reopen`}>
                        <ArrowPathRoundedSquareIcon />
                        <MenuLabel>Reopen order</MenuLabel>
                      </MenuItem>
                    ) : (
                      <MenuItem href={`/dashboard/orders/${item.id}/cancel`}>
                        <NoSymbolIcon />
                        <MenuLabel>Cancel order</MenuLabel>
                      </MenuItem>
                    )}

                    <MenuItem href={`/dashboard/orders/${item.id}/archive`}>
                      <ArchiveBoxIcon />
                      <MenuLabel>Archive order</MenuLabel>
                    </MenuItem>
                    <MenuItem isDanger href={`/dashboard/orders/${item.id}/delete`}>
                      <TrashIcon />
                      <MenuLabel>Delete order</MenuLabel>
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Paginate from={41} to={50} total={125} />
    </>
  )
}
