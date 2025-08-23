"use client"

import {
  ArrowUturnLeftIcon,
  BanknotesIcon,
  ClipboardDocumentIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  LinkIcon,
  ReceiptRefundIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid"
import { Button, buttonStyles } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { Menu, MenuContent, MenuItem, MenuLabel } from "@/components/ui/menu"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { formatDate, formatDatetime } from "@/lib/date"
import { formatMoney } from "@/lib/number"
import { DetailLine, DetailLineItem } from "@/components/ui/details-line"
import { Avatar } from "@/components/ui/avatar"
import customers from "@/data/customers.json"
import { Square2StackIcon } from "@heroicons/react/16/solid"
import { GridLines } from "@/components/ui/grid-lines"
import {
  PaymentMethodAmexIcon,
  PaymentMethodDiscoverIcon,
  PaymentMethodMastercardIcon,
  PaymentMethodVisaIcon,
} from "@/components/icons/cc"

export function Client({ transaction }: { transaction: Transaction }) {
  const customer = customers[0]
  return (
    <div className="space-y-6">
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Transaction {transaction.order_number}</SectionTitle>
          <SectionDescription>ID {transaction.id}</SectionDescription>
        </SectionContent>
        <SectionAction>
          {transaction.status === "succeeded" && (
            <>
              <Menu>
                <Button intent="outline" size="sm">
                  Actions... <ChevronDownIcon />
                </Button>
                <MenuContent placement="bottom end">
                  <MenuItem onAction={() => navigator.clipboard.writeText(transaction.reference)}>
                    <ClipboardDocumentIcon />
                    <MenuLabel>Copy reference</MenuLabel>
                  </MenuItem>
                  <MenuItem href="/orders/41">
                    <ShoppingBagIcon />
                    <MenuLabel>View order</MenuLabel>
                  </MenuItem>
                  {transaction.metadata?.provider_dashboard_url && (
                    <MenuItem
                      className={buttonStyles({ size: "sm" })}
                      href={transaction.metadata.provider_dashboard_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkIcon />
                      <MenuLabel>Open in provider</MenuLabel>
                    </MenuItem>
                  )}
                </MenuContent>
              </Menu>
            </>
          )}
          {transaction.status === "pending" && (
            <>
              <Button size="sm">
                <CreditCardIcon />
                Capture
              </Button>
              <Button intent="outline" size="sm">
                <ArrowUturnLeftIcon />
                Void
              </Button>
            </>
          )}
          {(transaction.status === "succeeded" || transaction.status === "partially_refunded") && (
            <Button intent="outline" size="sm">
              <ReceiptRefundIcon />
              Refund
            </Button>
          )}
          {transaction.status === "disputed" && (
            <Button size="sm">
              <ShieldExclamationIcon />
              Manage dispute
            </Button>
          )}
        </SectionAction>
      </SectionHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative isolate [--gutter:--spacing(4)] lg:col-span-2">
          <GridLines mask="bottom_right" width={25} height={25} />
          <CardHeader>
            <CardTitle>Payment summary</CardTitle>
            <CardDescription>Amounts and currency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 *:bg-white *:shadow-xs sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-fg text-sm/6">Gross</span>
                  <CurrencyDollarIcon className="size-4 opacity-70" />
                </div>
                <div className="mt-1 font-semibold text-lg">
                  {formatMoney(transaction.amount.gross, transaction.amount.currency)}
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-fg text-sm/6">Fees</span>
                  <CreditCardIcon className="size-4 opacity-70" />
                </div>
                <div className="mt-1 font-semibold text-lg">
                  {formatMoney(transaction.amount.fee, transaction.amount.currency)}
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-fg text-sm/6">Net</span>
                  <BanknotesIcon className="size-4 opacity-70" />
                </div>
                <div className="mt-1 font-semibold text-lg">
                  {formatMoney(transaction.amount.net, transaction.amount.currency)}
                </div>
              </div>
            </div>
            <div className="relative mt-4 rounded-lg border bg-white p-4">
              <div className="flex gap-2 rounded-sm *:[svg]:size-10">
                {transaction.method === "card" && (
                  <>
                    {transaction.card?.brand === "visa" ? (
                      <PaymentMethodVisaIcon />
                    ) : transaction.card?.brand === "mastercard" ? (
                      <PaymentMethodMastercardIcon />
                    ) : transaction.card?.brand === "discover" ? (
                      <PaymentMethodDiscoverIcon />
                    ) : (
                      <PaymentMethodAmexIcon />
                    )}
                  </>
                )}
              </div>
              <div className="mt-1 font-medium capitalize">Card</div>
              {transaction.card && (
                <div className="mt-1 text-muted-fg text-sm">
                  {transaction.card.brand.toUpperCase()} •••• {transaction.card.last4} exp{" "}
                  {String(transaction.card.exp_month).padStart(2, "0")}/
                  {String(transaction.card.exp_year).slice(-2)}
                </div>
              )}
              {transaction.bank_transfer && (
                <div className="mt-1 text-muted-fg text-sm">
                  {transaction.bank_transfer.bank} {transaction.bank_transfer.reference}
                </div>
              )}
              {transaction.wallet && (
                <div className="mt-1 text-muted-fg text-sm capitalize">
                  {transaction.wallet.wallet.replaceAll("_", " ")}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="[--gutter:--spacing(4)]">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>Information about the customer</CardDescription>
            <CardAction>
              <Menu>
                <Button size="sq-md" intent="plain" aria-label="Actions">
                  <EllipsisVerticalIcon />
                </Button>
                <MenuContent placement="bottom end">
                  <MenuItem href={`/customers/${customer.id}`}>
                    <IdentificationIcon />
                    View customer
                  </MenuItem>
                  <MenuItem
                    onPress={() => navigator.clipboard.writeText(transaction.customer.email)}
                  >
                    <Square2StackIcon />
                    Copy email
                  </MenuItem>
                </MenuContent>
              </Menu>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center gap-3">
              <Avatar
                size="lg"
                isSquare
                alt={transaction.customer.name}
                src="https://irsyad.co/images/blocks/avatar/woman.webp"
              />
              <div>
                <div className="font-medium text-fg text-lg">{customer.name}</div>
                <div className="text-muted-fg text-sm">{customer.email}</div>
              </div>
            </div>
            <div className="mt-4 text-muted-fg text-sm">{customer.location}</div>
            <DetailLine className="mt-4">
              <DetailLineItem label="Total orders" description={customer.total_orders.toString()} />
              <DetailLineItem label="Total spent" description={`$${customer.total_spent}`} />
              <DetailLineItem
                label="Last order"
                description={formatDatetime(customer.last_order)}
              />
              <DetailLineItem label="Phone" description={customer.phone} />
            </DetailLine>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="[--card:--spacing(4)] [--gutter:var(--card)] lg:col-span-2">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Payment lifecycle</CardDescription>
          </CardHeader>
          <CardContent>
            <Table bleed className="[--gutter:var(--card)]">
              <TableHeader>
                <TableColumn isRowHeader>Event</TableColumn>
                <TableColumn>At</TableColumn>
                <TableColumn>Details</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Created</TableCell>
                  <TableCell>{formatDate(transaction.created_at)}</TableCell>
                  <TableCell>Reference {transaction.reference}</TableCell>
                </TableRow>
                {transaction.authorized_at && (
                  <TableRow>
                    <TableCell className="font-medium">Authorized</TableCell>
                    <TableCell>{formatDate(transaction.authorized_at)}</TableCell>
                    <TableCell>
                      Amount {formatMoney(transaction.amount.gross, transaction.amount.currency)}
                    </TableCell>
                  </TableRow>
                )}
                {transaction.captured_at && (
                  <TableRow>
                    <TableCell className="font-medium">Captured</TableCell>
                    <TableCell>{formatDate(transaction.captured_at)}</TableCell>
                    <TableCell>
                      Net {formatMoney(transaction.amount.net, transaction.amount.currency)}
                    </TableCell>
                  </TableRow>
                )}
                {transaction.settlement?.settled_at && (
                  <TableRow>
                    <TableCell className="font-medium">Settled</TableCell>
                    <TableCell>{formatDate(transaction.settlement.settled_at)}</TableCell>
                    <TableCell>
                      Settlement{" "}
                      {formatMoney(transaction.settlement.amount, transaction.settlement.currency)}
                    </TableCell>
                  </TableRow>
                )}
                {transaction.refunds && transaction.refunds.length > 0 && (
                  <TableRow>
                    <TableCell className="font-medium">Refunds</TableCell>
                    <TableCell>
                      {transaction.refunds[0] ? formatDate(transaction.refunds[0].created_at) : ""}
                    </TableCell>
                    <TableCell>
                      {transaction.refunds
                        .map((r) => `${formatMoney(r.amount, transaction.amount.currency)}`)
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="[--gutter:--spacing(4)]">
          <CardHeader>
            <CardTitle>Meta</CardTitle>
            <CardDescription>Identifiers and risk</CardDescription>
          </CardHeader>
          <CardContent>
            <DetailLine>
              <DetailLineItem label="Transaction ID" description={transaction.id} />
              <DetailLineItem label="Provider ref" description={transaction.reference} />
              <DetailLineItem label="Status" description={transaction.status} />
              <DetailLineItem label="Order" description={transaction.order_number} />
              <DetailLineItem label="IP" description={transaction.ip_address} />
              <DetailLineItem
                label="Risk score"
                description={transaction.risk_score?.toString() ?? "0"}
              />
            </DetailLine>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
