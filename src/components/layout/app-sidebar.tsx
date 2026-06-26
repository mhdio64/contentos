import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppSidebarNav } from "./app-sidebar-nav"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-14 border-b border-sidebar-border px-4 flex items-center justify-center">
        <div className="flex items-center gap-2 w-full">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground shadow-sm">
            <span className="text-sm font-bold leading-none">C</span>
          </div>
          <span className="font-semibold tracking-tight text-sm">ContentOS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs tracking-tight">Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppSidebarNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="truncate text-sm font-medium leading-none">Jane Doe</span>
            <span className="truncate text-xs text-muted-foreground mt-1">jane@example.com</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
