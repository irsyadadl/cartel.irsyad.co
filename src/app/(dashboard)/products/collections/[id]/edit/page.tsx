import { Client } from "./client"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import collections from "@/data/collections.json"
import { findById } from "@/lib/eloquent"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const collection = findById(collections, Number(id))
  return {
    title: `Order #${collection?.id ?? id}`,
  }
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const collection = findById(collections, Number(id))
  if (!collection) {
    return notFound()
  }
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Edit collection</SectionTitle>
          <SectionDescription>
            Edit the details of your collection. You can update the name, description, and the
            products included in this collection.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <Client collection={collection as unknown as Collection} />
    </>
  )
}
