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

export function Paginate({ from, to, total }: PaginateProps) {
  const itemsPerPage = to - from + 1
  const currentPage = Math.floor((from - 1) / itemsPerPage) + 1
  const totalPages = Math.ceil(total / itemsPerPage)
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => ({ value: i + 1 }))
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
            {totalPages}
          </PaginationItem>
        </PaginationSection>

        <PaginationSection aria-label="Pagination Segment" className="hidden lg:flex">
          {pages.map((item) => (
            <PaginationItem
              id={item.value.toString()}
              key={item.value}
              isCurrent={item.value === currentPage}
              href="#"
            >
              {item.value}
            </PaginationItem>
          ))}
          <PaginationItem segment="ellipsis" />
          <PaginationItem id={String(totalPages)} href="#">
            {totalPages}
          </PaginationItem>
        </PaginationSection>

        <PaginationItem segment="next" href="#" />
        <PaginationItem segment="last" href="#" />
      </PaginationList>
    </Pagination>
  )
}
