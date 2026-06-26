import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <SidebarTrigger className="-ms-1" />
      
      <div className="w-full flex-1 flex items-center gap-4">
        <form className="hidden sm:block flex-1 max-w-md relative">
          <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="جستجو در محتوا و کمپین‌ها..."
            className="w-full bg-muted/40 ps-9 sm:text-sm h-9"
          />
        </form>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 relative text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 end-2.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span className="sr-only">اعلان‌ها</span>
        </Button>
      </div>
    </header>
  )
}
