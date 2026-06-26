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
  { href: "/", label: "داشبورد", icon: Home },
  { href: "/clients", label: "مشتریان", icon: Users },
  { href: "/campaigns", label: "کمپین‌ها", icon: Briefcase },
  { href: "/content-ideas", label: "ایده‌های محتوا", icon: FileText },
  { href: "/channels", label: "کانال‌ها", icon: Share2 },
  { href: "/calendar", label: "تقویم", icon: Calendar },
  { href: "/reviews", label: "بازبینی‌ها", icon: CheckSquare },
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
