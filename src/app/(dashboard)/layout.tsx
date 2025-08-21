import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarNav } from "@/components/app-sidebar-nav"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="[--inset-x:4.2%] [--inset-y:calc(var(--inset-x)*1.5)] [--layout-gutter:--spacing(4)] lg:rounded-l-lg sm:[--layout-gutter:--spacing(12)]">
        <AppSidebarNav />
        <div className="flex flex-col gap-y-6 rounded-t-lg bg-white p-(--layout-gutter) text-gray-950">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
