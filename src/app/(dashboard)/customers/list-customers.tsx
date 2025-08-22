"use client"

import {
  ClipboardIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import customers from "@/data/customers.json"
import type { Selection } from "react-aria-components"

import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/date"
import { SearchField } from "@/components/ui/search-field"
import { useState } from "react"
import {
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { Paginate } from "@/components/paginate"

export function ListCustomers() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Customers</SectionTitle>
          <SectionDescription>
            List of registered customers with account status and role information.
          </SectionDescription>
        </SectionContent>
        <SectionAction>
          <SearchField className="Search..." />
        </SectionAction>
      </SectionHeader>

      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Customers"
      >
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Last order</TableColumn>
          <TableColumn>Total orders</TableColumn>
          <TableColumn>Total spent</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Joined at</TableColumn>
          <TableColumn className="sticky right-0 z-10 bg-linear-to-l from-60% from-white text-end" />
        </TableHeader>
        <TableBody items={customers}>
          {(user) => (
            <TableRow id={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.location}</TableCell>
              <TableCell>{formatDate(user.last_order)}</TableCell>
              <TableCell>{user.total_orders}</TableCell>
              <TableCell>{user.total_spent}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{formatDate(user.joined_at)}</TableCell>
              <TableCell className="sticky right-0 z-10 bg-linear-to-l from-60% from-bg text-end">
                <Menu>
                  <Button size="sq-sm" className="sm:size-6" intent="plain">
                    <EllipsisVerticalIcon />
                  </Button>
                  <MenuContent placement="left top" className="min-w-48">
                    <MenuItem href="#">
                      <IdentificationIcon />
                      <MenuLabel>View profile</MenuLabel>
                    </MenuItem>
                    <MenuItem href="#">
                      <PencilSquareIcon />
                      <MenuLabel>Edit user</MenuLabel>
                    </MenuItem>
                    <MenuItem href="#">
                      <Cog6ToothIcon />
                      <MenuLabel>Change role</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem href="#">
                      <ShieldCheckIcon />
                      <MenuLabel>Suspend user</MenuLabel>
                    </MenuItem>
                    <MenuItem href="#">
                      <EnvelopeIcon />
                      <MenuLabel>Resend invite</MenuLabel>
                    </MenuItem>
                    <MenuItem onAction={() => navigator.clipboard.writeText(user.email)}>
                      <ClipboardIcon />
                      <MenuLabel>Copy email</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem isDanger href="#">
                      <TrashIcon />
                      <MenuLabel>Delete user</MenuLabel>
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Paginate from={11} to={20} total={625} />
    </>
  )
}
