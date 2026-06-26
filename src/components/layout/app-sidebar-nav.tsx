"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Home,
  Users,
  Briefcase,
  FileText,
  Share2,
  Calendar,
  CheckSquare,
  type LucideIcon,
} from "lucide-react"

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/campaigns", label: "Campaigns", icon: Briefcase },
  { href: "/content-ideas", label: "Content Ideas", icon: FileText },
  { href: "/channels", label: "Channels", icon: Share2 },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/reviews", label: "Reviews", icon: CheckSquare },
]

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppSidebarNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {navItems.map(({ href, label, icon: Icon }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            asChild
            isActive={isNavActive(pathname, href)}
            className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium"
          >
            <Link href={href}>
              <Icon />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
