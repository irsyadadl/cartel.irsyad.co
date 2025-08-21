"use client"

import {
  Pagination,
  PaginationItem,
  PaginationList,
  PaginationSection,
} from "@/components/ui/pagination"

interface PaginateProps {
  from: number
  to: number
  total: number
}

const pages = Array.from({ length: 5 }, (_, i) => ({ value: i + 1 }))
export function Paginate({ from, to, total }: PaginateProps) {
  const currentPage = Number(from.toString()[0])
  return (
    <Pagination className="flex-col items-center gap-4 md:flex-row md:justify-between">
      <p className="text-muted-fg text-sm/6 *:[strong]:font-medium *:[strong]:text-fg">
        Showing <strong>{from}</strong> to <strong>{to}</strong> of <strong>{total}</strong> items
      </p>
      <PaginationList>
        <PaginationItem segment="first" href="#" />
        <PaginationItem segment="previous" href="#" />

        <PaginationSection aria-label="Pagination Segment" className="rounded-lg border lg:hidden">
          <PaginationItem segment="label">1</PaginationItem>
          <PaginationItem segment="separator" />
          <PaginationItem className="text-muted-fg" segment="label">
            {total}
          </PaginationItem>
        </PaginationSection>

        <PaginationSection aria-label="Pagination Segment" className="hidden lg:flex">
          {pages.map((item) => (
            <PaginationItem
              id={item.value.toString()}
              key={item.value}
              isCurrent={item.value === currentPage + 1}
              href="#"
            >
              {item.value}
            </PaginationItem>
          ))}
          <PaginationItem segment="ellipsis" />
          <PaginationItem id={String(total)} href="#">
            {total}
          </PaginationItem>
        </PaginationSection>

        <PaginationItem segment="next" href="#" />
        <PaginationItem segment="last" href="#" />
      </PaginationList>
    </Pagination>
  )
}
