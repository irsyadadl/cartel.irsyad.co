"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchField } from "@/components/ui/search-field"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchQuery({ qParam = "q", pageParam = "page", delay = 300 }) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const initial = sp.get(qParam) ?? ""
  const [value, setValue] = useState(initial)
  const debounced = useDebounce(value, delay)

  useEffect(() => setValue(initial), [initial])

  useEffect(() => {
    const v = String(debounced).trim()
    const params = new URLSearchParams(window.location.search)
    const currentQ = params.get(qParam) ?? ""
    if (v === currentQ) return
    if (v) params.set(qParam, v)
    else params.delete(qParam)
    if (params.has(pageParam)) params.set(pageParam, "1")
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [debounced, qParam, pageParam, pathname, router])

  return <SearchField placeholder="Search..." value={value} onChange={setValue} />
}
