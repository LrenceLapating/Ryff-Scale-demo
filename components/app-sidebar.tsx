"use client"

import type * as React from "react"
import { BarChart3, FileText, Settings, Users, Calendar, ChevronDown } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Ryff Assessment",
    icon: Calendar,
    items: [
      {
        title: "Bulk Assignment",
        url: "/ryff/bulk-assignment",
      },
      {
        title: "Auto-Reminders",
        url: "/ryff/auto-reminders",
      },
    ],
  },
  {
    title: "Status",
    url: "/status",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (page: string) => void
  currentPage?: string
}

export function AppSidebar({ onNavigate, currentPage, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => onNavigate?.("dashboard")} className="cursor-pointer">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/logo.png" alt="Logo" className="size-8 rounded-lg object-cover" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Ryff PWB</span>
                <span className="text-xs">Assessment System</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={currentPage === subItem.url.replace("/ryff/", "").replace("/", "")}
                                onClick={() => onNavigate?.(subItem.url.replace("/ryff/", "").replace("/", ""))}
                                className="cursor-pointer"
                              >
                                {subItem.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      isActive={currentPage === item.url.replace("/", "")}
                      onClick={() => onNavigate?.(item.url.replace("/", ""))}
                      className="cursor-pointer"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
