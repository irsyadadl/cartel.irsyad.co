"use client"

import {
  ClipboardDocumentIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import {
  ChevronDownIcon,
  PauseCircleIcon,
  RectangleStackIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid"
import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/16/solid"

import collections from "@/data/collections.json"

import { Badge } from "@/components/ui/badge"
import { Button, buttonStyles } from "@/components/ui/button"
import { CsvIcon } from "@/components/icons/csv-icon"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { Link } from "@/components/ui/link"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import { Paginate } from "@/components/paginate"
import { SearchField } from "@/components/ui/search-field"
import {
  SectionAction,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/section-header"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DetailLine,
  DetailLineDescription,
  DetailLineItem,
  DetailLineLabel,
} from "@/components/ui/details-line"

export function ListCollections() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Collections</SectionTitle>
          <SectionDescription>
            Group products into curated sets to improve browsing and merchandising.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>

      <SectionHeader>
        <SectionContent>
          <Link href="/products/collections/create" className={buttonStyles()}>
            <PlusIcon />
            New
          </Link>
        </SectionContent>

        <SectionAction>
          <SearchField className="Search..." />
          <Menu>
            <Button intent="outline">
              <ArrowUpTrayIcon />
              Export...
              <ChevronDownIcon />
            </Button>
            <MenuContent placement="bottom end">
              <MenuItem>
                <CsvIcon />
                <MenuLabel>Export as CSV</MenuLabel>
              </MenuItem>
              <MenuItem>
                <ExcelIcon />
                <MenuLabel>Export as Excel</MenuLabel>
              </MenuItem>
            </MenuContent>
          </Menu>
        </SectionAction>
      </SectionHeader>

      <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4">
        {collections.map((item) => (
          <Card
            className="gap-y-0 overflow-hidden bg-muted p-1 [--gutter:--spacing(0)]"
            key={item.id}
          >
            <div className="inset-ring inset-ring-gray-300 rounded-sm bg-white p-3 shadow-xs">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  Collection is a curated set of products that can be featured on your store.
                </CardDescription>
                <CardAction>
                  <Menu>
                    <Button size="sq-sm" intent="plain">
                      <EllipsisVerticalIcon />
                    </Button>
                    <MenuContent placement="left top" className="min-w-48">
                      <MenuItem href={`/collections/${item.id}`}>
                        <IdentificationIcon />
                        <MenuLabel>View collection</MenuLabel>
                      </MenuItem>
                      <MenuItem href={`/products/collections/${item.id}/edit`}>
                        <PencilSquareIcon />
                        <MenuLabel>Edit collection</MenuLabel>
                      </MenuItem>
                      <MenuItem href={`/collections/${item.id}/products`}>
                        <RectangleStackIcon />
                        <MenuLabel>Manage products</MenuLabel>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem onAction={() => navigator.clipboard.writeText(String(item.id))}>
                        <ClipboardDocumentIcon />
                        <MenuLabel>Copy collection ID</MenuLabel>
                      </MenuItem>
                      <MenuItem onAction={() => navigator.clipboard.writeText(item.slug ?? "")}>
                        <ClipboardIcon />
                        <MenuLabel>Copy slug</MenuLabel>
                      </MenuItem>
                      <MenuSeparator />
                      {item.visibility === "public" ? (
                        <MenuItem>
                          <PauseCircleIcon />
                          <MenuLabel>Unpublish</MenuLabel>
                        </MenuItem>
                      ) : (
                        <MenuItem>
                          <CheckCircleIcon />
                          <MenuLabel>Publish</MenuLabel>
                        </MenuItem>
                      )}
                      <MenuItem isDanger>
                        <TrashIcon />
                        <MenuLabel>Delete collection</MenuLabel>
                      </MenuItem>
                    </MenuContent>
                  </Menu>
                </CardAction>
              </CardHeader>
              <CardContent className="pt-3">
                <DetailLine>
                  <DetailLineItem>
                    <DetailLineLabel>Feature</DetailLineLabel>
                    <DetailLineDescription>
                      <Badge intent="secondary">{item.is_featured ? "Yes" : "No"}</Badge>
                    </DetailLineDescription>
                  </DetailLineItem>
                  <DetailLineItem label="Products" description={`${item.product_count} items`} />
                  <DetailLineItem label="Type" description={item.type} />
                  <DetailLineItem label="Visibility" description={item.visibility} />
                  <DetailLineItem
                    label="Sort order"
                    description={item.sort_order.replaceAll("_", " ")}
                  />
                </DetailLine>
              </CardContent>
            </div>
            <div className="flex gap-1 pt-1">
              {item.tags.map((t) => (
                <Badge key={t.id} intent="outline" className="rounded-sm bg-white">
                  {t.name}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Paginate from={1} to={9} total={36} />
    </>
  )
}
