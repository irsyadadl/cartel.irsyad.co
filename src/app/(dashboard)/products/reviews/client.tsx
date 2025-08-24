"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchField } from "@/components/ui/search-field"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import { Button } from "@/components/ui/button"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import customers from "@/data/customers.json"
import products from "@/data/products.json"
import reviews from "@/data/reviews.json"
import { EllipsisHorizontalIcon, StarIcon as StarSolid } from "@heroicons/react/24/solid"
import { StarIcon as StarOutline } from "@heroicons/react/24/outline"
import { ProgressBar, ProgressBarTrack } from "@/components/ui/progress-bar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { formatDatetime } from "@/lib/date"
import { Link } from "@/components/ui/link"
import { GridLines } from "@/components/ui/grid-lines"
import { Paginate } from "@/components/paginate"

type ReviewStatus = "published" | "pending" | "flagged" | "rejected"

function Star({ value }: { value: number }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= Math.round(value) ? (
        <StarSolid key={i} className="size-4 text-primary" />
      ) : (
        <StarOutline key={i} className="size-4 text-primary" />
      ),
    )
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const map: Record<
    ReviewStatus,
    { label: string; intent: "primary" | "warning" | "secondary" | "danger" }
  > = {
    published: { label: "Published", intent: "primary" },
    pending: { label: "Pending", intent: "warning" },
    flagged: { label: "Flagged", intent: "secondary" },
    rejected: { label: "Rejected", intent: "danger" },
  }
  return (
    <Badge className="text-[11px]/4" intent={map[status].intent}>
      {map[status].label}
    </Badge>
  )
}

const productItems = [
  { id: "all", name: "All products" },
  ...products.map((p) => ({ id: String(p.id), name: p.name })),
]

const statusItems = [
  { id: "all", name: "All status" },
  { id: "published", name: "Published" },
  { id: "pending", name: "Pending" },
  { id: "flagged", name: "Flagged" },
  { id: "rejected", name: "Rejected" },
]

const ratingItems = [
  { id: "all", name: "All ratings" },
  ...[5, 4, 3, 2, 1].map((r) => ({ id: String(r), name: `${r} star` })),
]

export function Client() {
  const customersById = useMemo(() => new Map(customers.map((c) => [c.id, c])), [customers])
  const productsById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products])

  const [query, setQuery] = useState("")
  const [productFilter, setProductFilter] = useState<number | "all">("all")
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all")
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all")

  const joined = useMemo(() => {
    return reviews.map((r) => {
      const product = productsById.get(r.product_id)
      const customer = customersById.get(r.customer_id)
      return {
        ...r,
        product_name: product?.name ?? "Unknown",
        product_thumbnail: product?.thumbnail ?? "",
        customer_name: customer?.name ?? "Unknown",
        customer_email: customer?.email ?? "",
      }
    })
  }, [reviews, productsById, customersById])

  const filtered = useMemo(() => {
    return joined.filter((r) => {
      if (productFilter !== "all" && r.product_id !== productFilter) return false
      if (statusFilter !== "all" && r.status !== statusFilter) return false
      if (ratingFilter !== "all" && Math.round(r.rating) !== ratingFilter) return false
      if (query) {
        const q = query.toLowerCase()
        const t =
          `${r.title} ${r.body} ${r.product_name} ${r.customer_name} ${r.customer_email}`.toLowerCase()
        if (!t.includes(q)) return false
      }
      return true
    })
  }, [joined, productFilter, statusFilter, ratingFilter, query])

  const metrics = useMemo(() => {
    const total = reviews.length
    const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0
    const published = reviews.filter((r) => r.status === "published").length
    const flagged = reviews.filter((r) => r.status === "flagged").length
    const dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Math.round(r.rating) === star).length,
    }))
    return { total, avg, published, flagged, dist }
  }, [reviews])

  function changeStatus(id: number, status: ReviewStatus) {
    const idx = reviews.findIndex((r) => r.id === id)
    if (idx === -1) return
    const next = reviews.slice()
    next[idx] = {
      ...next[idx],
      status,
      published_at: status === "published" ? new Date().toISOString() : next[idx].published_at,
    }
    ;(window as any).__setReviews?.(next)
  }

  return (
    <>
      <div className="relative isolate rounded-2xl border bg-secondary p-(--g) [--g:--spacing(2)]">
        <GridLines width={25} mask="none" height={25} />
        <div className="grid gap-(--g) *:data-[slot=card]:bg-white sm:grid-cols-2 lg:grid-cols-4 *:data-[slot=card]:[--gutter:--spacing(4)]">
          <Card>
            <CardHeader className="gap-0">
              <CardTitle className="text-sm/6">Total reviews</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold text-3xl">{metrics.total}</CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-0">
              <CardTitle className="text-sm/6">Average rating</CardTitle>
              <CardDescription>Across products</CardDescription>
            </CardHeader>
            <CardContent className="flex items-baseline gap-2">
              <div className="font-semibold text-3xl">{metrics.avg.toFixed(1)}</div>
              <Star value={metrics.avg} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-0">
              <CardTitle className="text-sm/6">Published</CardTitle>
              <CardDescription>Visible to customers</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold text-3xl">{metrics.published}</CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-0">
              <CardTitle className="text-sm/6">Flagged</CardTitle>
              <CardDescription>Needs attention</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold text-3xl">{metrics.flagged}</CardContent>
          </Card>
        </div>

        <Card className="mt-(--g) bg-white [--gutter:--spacing(4)]">
          <CardHeader>
            <CardTitle>Rating distribution</CardTitle>
            <CardDescription>Breakdown of customer ratings (all time)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {metrics.dist.map((d) => (
                <div key={d.star} className="flex items-center gap-3">
                  <div className="flex items-center gap-x-2">
                    <span className="font-semibold text-sm/6 tabular-nums">{d.star}</span>{" "}
                    <Star value={d.star} />
                  </div>
                  <div className="flex-1">
                    <ProgressBar value={d.count} minValue={0} maxValue={metrics.total}>
                      {(values) => <ProgressBarTrack {...values} className="mt-0" />}
                    </ProgressBar>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>Moderate and manage customer feedback</CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row">
          <SearchField
            placeholder="Search reviews"
            value={query}
            onChange={setQuery}
            className="lg:min-w-52"
          />
          <div className="flex items-center gap-x-2">
            <Select
              selectedKey={String(productFilter)}
              onSelectionChange={(key) => setProductFilter(key === "all" ? "all" : Number(key))}
              placeholder="All products"
            >
              <SelectTrigger />
              <SelectContent items={productItems}>
                {(item: { id: string; name: string }) => (
                  <SelectItem id={item.id}>
                    <SelectLabel>{item.name}</SelectLabel>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Select
              selectedKey={String(statusFilter)}
              onSelectionChange={(key) => setStatusFilter(key as typeof statusFilter)}
              placeholder="All status"
            >
              <SelectTrigger />
              <SelectContent items={statusItems}>
                {(item: { id: string; name: string }) => (
                  <SelectItem id={item.id}>
                    <SelectLabel>{item.name}</SelectLabel>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Select
              selectedKey={String(ratingFilter)}
              onSelectionChange={(key) => setRatingFilter(key === "all" ? "all" : Number(key))}
              placeholder="All ratings"
            >
              <SelectTrigger />
              <SelectContent items={ratingItems}>
                {(item: { id: string; name: string }) => (
                  <SelectItem id={item.id}>
                    <SelectLabel>{item.name}</SelectLabel>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-fg text-sm">No reviews found</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className="group relative overflow-hidden rounded-lg border border-border bg-secondary"
                >
                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      {r.product_thumbnail ? (
                        <img
                          src={r.product_thumbnail}
                          alt={r.product_name}
                          className="size-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="size-12 rounded-md bg-muted" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="truncate font-medium text-sm/5">{r.product_name}</div>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <Star value={r.rating} />
                          <span className="text-muted-fg">{r.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inset-shadow-2xs inset-shadow-gray-300 rounded-t-xl bg-white p-3">
                    <div>
                      <div className="flex w-full items-center justify-between gap-2">
                        <StatusBadge status={r.status as any} />
                        <Menu>
                          <Button
                            size="sq-sm"
                            className="h-6!"
                            isCircle
                            intent="plain"
                            aria-label="open action"
                          >
                            <EllipsisHorizontalIcon />
                          </Button>
                          <MenuContent placement="bottom end" className="min-w-36">
                            <MenuItem onAction={() => changeStatus(r.id, "published")}>
                              <CheckCircleIcon className="size-4" />
                              <MenuLabel>Publish</MenuLabel>
                            </MenuItem>
                            <MenuItem onAction={() => changeStatus(r.id, "flagged")}>
                              <ExclamationTriangleIcon className="size-4" />
                              <MenuLabel>Flag</MenuLabel>
                            </MenuItem>
                            <MenuItem onAction={() => changeStatus(r.id, "rejected")}>
                              <EyeSlashIcon className="size-4" />
                              <MenuLabel>Unpublish</MenuLabel>
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem isDanger onAction={() => changeStatus(r.id, "rejected")}>
                              <TrashIcon className="size-4" />
                              <MenuLabel>Delete</MenuLabel>
                            </MenuItem>
                          </MenuContent>
                        </Menu>
                      </div>

                      <CardHeader className="mt-2">
                        <CardTitle className="text-sm/6">{r.title}</CardTitle>
                        <p className="line-clamp-2 text-muted-fg text-xs/5">{r.body}</p>
                      </CardHeader>
                      <Link className="text-primary-subtle-fg text-xs/4 hover:underline" href="#">
                        Read more{" "}
                      </Link>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3 border-t border-dashed pt-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm">{r.customer_name}</div>
                        <div className="truncate text-muted-fg text-xs">{r.customer_email}</div>
                      </div>
                      <div className="text-right text-muted-fg text-xs">
                        {formatDatetime(r.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Paginate from={1} to={13} total={4001} />
    </>
  )
}
