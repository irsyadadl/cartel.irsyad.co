"use client"

import { BellIcon, Cog6ToothIcon } from "@heroicons/react/16/solid"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Button, buttonStyles } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { SearchField } from "@/components/ui/search-field"
import { SidebarNav, SidebarTrigger } from "@/components/ui/sidebar"

export function AppSidebarNav() {
  return (
    <SidebarNav className="lg:hidden">
      <SidebarTrigger className="pressed:bg-gray-700 [--btn-icon-active:var(--color-white)] hover:bg-gray-700 *:data-[slot=icon]:text-gray-400" />
      <div className="hidden w-full sm:block">
        <SearchField
          aria-label="Search..."
          className="max-w-xl **:[[role=group]]:bg-secondary/50 focus:**:[[role=group]]:bg-primary/10"
        />
      </div>
      <div className="ml-auto flex w-full items-center justify-end gap-x-2">
        <Button
          className="pressed:bg-gray-700 [--btn-icon-active:var(--color-white)] hover:bg-gray-700 *:data-[slot=icon]:text-gray-400"
          intent="plain"
          isCircle
          size="sq-sm"
        >
          <MagnifyingGlassIcon />
        </Button>
        <Link
          href="#"
          className={buttonStyles({
            size: "sq-sm",
            intent: "plain",
            isCircle: true,
            className:
              "pressed:bg-gray-700 [--btn-icon-active:var(--color-white)] hover:bg-gray-700 *:data-[slot=icon]:text-gray-400",
          })}
        >
          <BellIcon />
        </Link>
        <Link
          href="#"
          className={buttonStyles({
            size: "sq-sm",
            intent: "plain",
            isCircle: true,
            className:
              "pressed:bg-gray-700 [--btn-icon-active:var(--color-white)] hover:bg-gray-700 *:data-[slot=icon]:text-gray-400",
          })}
        >
          <Cog6ToothIcon />
        </Link>
      </div>
    </SidebarNav>
  )
}
