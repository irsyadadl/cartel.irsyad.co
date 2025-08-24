import customers from "@/data/customers.json"
import { notFound } from "next/navigation"
import { findById } from "@/lib/eloquent"
import { Client } from "./client"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = findById(customers, Number(id))
  if (!customer) {
    return notFound()
  }
  return {
    title: customer.name,
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = findById(customers, Number(id))
  return (
    <>
      <Client customer={customer} />
    </>
  )
}
