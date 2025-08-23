type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "SGD" | "BRL" | "INR" | "CHF"

type Provider = "stripe" | "braintree"

type Method =
  | "card"
  | "bank_transfer"
  | "paypal"
  | "apple_pay"
  | "google_pay"
  | "klarna"
  | "afterpay"

type TransactionStatus =
  | "succeeded"
  | "pending"
  | "refunded"
  | "partially_refunded"
  | "disputed"
  | "failed"
  | "voided"

interface Money {
  currency: Currency
  gross: number
  fee: number
  net: number
}

interface Settlement {
  currency: Currency
  amount: number
  exchange_rate: number
  settled_at?: string
}

interface CardDetails {
  brand: "visa" | "mastercard" | "amex" | "discover"
  last4: string
  exp_month: number
  exp_year: number
  country: string
}

interface BankTransferDetails {
  bank: string
  country: string
  reference: string
}

interface WalletDetails {
  wallet: "apple_pay" | "google_pay" | "paypal" | "klarna" | "afterpay"
}

interface Customer {
  id: string
  name: string
  email: string
  country: string
}

interface Refund {
  id: string
  amount: number
  reason: string
  created_at: string
}

interface Dispute {
  id: string
  status: "needs_response" | "won" | "lost" | "under_review"
  reason: string
  opened_at: string
}

interface Transaction {
  id: string
  reference: string
  order_id: string
  order_number: string
  customer: Customer
  provider: Provider
  method: Method
  card?: CardDetails
  bank_transfer?: BankTransferDetails
  wallet?: WalletDetails
  amount: Money
  settlement?: Settlement
  status: TransactionStatus
  created_at: string
  authorized_at?: string
  captured_at?: string
  settled_at?: string
  payout_batch_id?: string
  risk_score?: number
  ip_address?: string
  user_agent?: string
  refunds?: Refund[]
  dispute?: Dispute
  metadata?: Record<string, string>
}
