import transactions from "@/data/transactions.json"
import { findById } from "@/lib/eloquent"
import { Client } from "./client"
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const transaction = findById(transactions, id)
  return (
    <div>
      <Client transaction={transaction as unknown as Transaction} />
    </div>
  )
}
