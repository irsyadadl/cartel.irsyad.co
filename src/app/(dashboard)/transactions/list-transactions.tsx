"use client"

import transactions from "@/data/transactions.json"

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowUturnLeftIcon,
  BanknotesIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  ReceiptRefundIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSubMenu,
} from "@/components/ui/menu"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/20/solid"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/number"
import { formatDate } from "@/lib/date"
import {
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SearchField } from "@/components/ui/search-field"
import { TransactionStats } from "@/app/(dashboard)/transactions/transactions-stats"

export function ListTransactions() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Transactions</SectionTitle>
          <SectionDescription>
            View and manage all your transactions, including payments, refunds, and disputes.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>

      <TransactionStats />

      <SectionHeader>
        <SectionContent>
          <Button>
            <PlusIcon />
            New
          </Button>
        </SectionContent>
        <SectionAction>
          <Select defaultSelectedKey="all" placeholder="All providers">
            <SelectTrigger />
            <SelectContent>
              <SelectItem id="all">All providers</SelectItem>
              <SelectItem id="stripe">Stripe</SelectItem>
              <SelectItem id="paypal">PayPal</SelectItem>
              <SelectItem id="adyen">Adyen</SelectItem>
              <SelectItem id="checkoutcom">Checkout.com</SelectItem>
              <SelectItem id="braintree">Braintree</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultSelectedKey="all" placeholder="All statuses">
            <SelectTrigger />
            <SelectContent>
              <SelectItem id="all">All statuses</SelectItem>
              <SelectItem id="succeeded">Succeeded</SelectItem>
              <SelectItem id="pending">Pending</SelectItem>
              <SelectItem id="refunded">Refunded</SelectItem>
              <SelectItem id="partially_refunded">Partially refunded</SelectItem>
              <SelectItem id="disputed">Disputed</SelectItem>
              <SelectItem id="failed">Failed</SelectItem>
              <SelectItem id="voided">Voided</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultSelectedKey="all" placeholder="All methods">
            <SelectTrigger />
            <SelectContent>
              <SelectItem id="all">All methods</SelectItem>
              <SelectItem id="card">Card</SelectItem>
              <SelectItem id="bank_transfer">Bank transfer</SelectItem>
              <SelectItem id="paypal">PayPal</SelectItem>
              <SelectItem id="apple_pay">Apple Pay</SelectItem>
              <SelectItem id="google_pay">Google Pay</SelectItem>
              <SelectItem id="klarna">Klarna</SelectItem>
              <SelectItem id="afterpay">Afterpay</SelectItem>
            </SelectContent>
          </Select>
          <Separator className="h-5" orientation="vertical" />
          <SearchField className="min-w-48" placeholder="Search" aria-label="Search transaction" />
        </SectionAction>
      </SectionHeader>

      <Table>
        <TableHeader>
          <TableColumn isRowHeader>Order number</TableColumn>
          <TableColumn>Customer</TableColumn>
          <TableColumn>Provider</TableColumn>
          <TableColumn>Method</TableColumn>
          <TableColumn>Card</TableColumn>
          <TableColumn className="text-end">Amount</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn>Authorized at</TableColumn>
          <TableColumn>Captured at</TableColumn>
          <TableColumn>Settled at</TableColumn>
          <TableColumn className="sticky right-0 z-10 bg-linear-to-l from-60% from-white text-end" />
        </TableHeader>
        <TableBody items={transactions}>
          {(item) => (
            <TableRow href={`/transactions/${item.id}`}>
              <TableCell>{item.order_number}</TableCell>
              <TableCell>
                {item.customer.name} ({item.customer.email})
              </TableCell>
              <TableCell>
                <Badge intent="secondary">{item.provider}</Badge>
              </TableCell>
              <TableCell>
                <Badge intent="secondary">{item.method}</Badge>
              </TableCell>
              <TableCell>
                {`${item.card.brand.toUpperCase()} **** **** **** ${item.card.last4}`}
              </TableCell>
              <TableCell className="text-end">
                {formatNumber(item.amount.gross, {
                  style: "currency",
                  currency: item.amount.currency,
                })}
              </TableCell>
              <TableCell>
                <Badge
                  intent={
                    item.status === "succeeded"
                      ? "success"
                      : item.status === "pending"
                        ? "warning"
                        : ["failed", "voided"].includes(item.status)
                          ? "danger"
                          : ["refunded", "partially_refunded"].includes(item.status)
                            ? "info"
                            : item.status === "disputed"
                              ? "secondary"
                              : "outline"
                  }
                >
                  {item.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(item.created_at)}</TableCell>
              <TableCell>{item.authorized_at ? formatDate(item.authorized_at) : "N/A"}</TableCell>
              <TableCell>{item.captured_at ? formatDate(item.captured_at) : "N/A"}</TableCell>
              <TableCell>{item.settled_at ? formatDate(item.settled_at) : "N/A"}</TableCell>
              <TableCell className="sticky right-0 z-10 bg-linear-to-l from-60% from-bg text-end">
                <Menu>
                  <Button size="sq-sm" className="sm:size-6" intent="plain">
                    <EllipsisVerticalIcon />
                  </Button>
                  <MenuContent placement="left top" className="min-w-48">
                    <MenuItem href={`/transactions/${item.id}`}>
                      <CreditCardIcon />
                      <MenuLabel>View transaction</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/orders/${item.order_number}`}>
                      <DocumentTextIcon />
                      <MenuLabel>View order</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    {item.status === "pending" && (
                      <>
                        <MenuItem>
                          <CheckCircleIcon />
                          <MenuLabel>Capture payment</MenuLabel>
                        </MenuItem>
                        <MenuItem>
                          <ArrowUturnLeftIcon />
                          <MenuLabel>Void authorization</MenuLabel>
                        </MenuItem>
                      </>
                    )}
                    {(item.status === "succeeded" || item.status === "partially_refunded") && (
                      <>
                        <MenuItem>
                          <ReceiptRefundIcon />
                          <MenuLabel>Refund full amount</MenuLabel>
                        </MenuItem>
                        <MenuItem>
                          <BanknotesIcon />
                          <MenuLabel>Refund partial</MenuLabel>
                        </MenuItem>
                        <MenuItem>
                          <DocumentDuplicateIcon />
                          <MenuLabel>Resend receipt</MenuLabel>
                        </MenuItem>
                      </>
                    )}
                    {item.status === "disputed" && (
                      <>
                        <MenuItem>
                          <ShieldExclamationIcon />
                          <MenuLabel>View dispute</MenuLabel>
                        </MenuItem>
                        <MenuItem>
                          <ClipboardDocumentIcon />
                          <MenuLabel>Submit evidence</MenuLabel>
                        </MenuItem>
                      </>
                    )}
                    <MenuSeparator />
                    <MenuSubMenu>
                      <MenuItem>
                        <ClipboardDocumentIcon />
                        <MenuLabel>Copy</MenuLabel>
                      </MenuItem>
                      <MenuContent>
                        <MenuItem onAction={() => navigator.clipboard.writeText(item.id)}>
                          <ClipboardIcon />
                          <MenuLabel>Copy transaction ID</MenuLabel>
                        </MenuItem>
                        <MenuItem onAction={() => navigator.clipboard.writeText(item.reference)}>
                          <ClipboardIcon />
                          <MenuLabel>Copy provider reference</MenuLabel>
                        </MenuItem>
                        <MenuItem onAction={() => navigator.clipboard.writeText(item.order_number)}>
                          <ClipboardIcon />
                          <MenuLabel>Copy order number</MenuLabel>
                        </MenuItem>
                        <MenuItem
                          onAction={() => navigator.clipboard.writeText(item.customer.email)}
                        >
                          <ClipboardIcon />
                          <MenuLabel>Copy customer email</MenuLabel>
                        </MenuItem>
                      </MenuContent>
                    </MenuSubMenu>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
