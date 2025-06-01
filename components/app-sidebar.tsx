"use client"

import type * as React from "react"
import { BarChart3, FileText, Settings, Users, Calendar, ChevronDown, MessageSquare, BookOpen, User, Heart } from "lucide-react"
import { LucideIcon } from "lucide-react"

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

// Define types for navigation items
interface SubNavigationItem {
  title: string
  url: string
}

interface NavigationItem {
  title: string
  url?: string
  icon: LucideIcon
  items?: SubNavigationItem[]
}

// Counselor navigation items (previously admin)
const counselorNavigationItems: NavigationItem[] = [
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
  {
    title: "View As",
    icon: Users,
    items: [
      {
        title: "Student View",
        url: "/student-view",
      }
    ],
  },
]

// Student navigation items
const studentNavigationItems: NavigationItem[] = [
  {
    title: "Assessments",
    url: "/assessments",
    icon: BookOpen,
  },
  {
    title: "Results",
    url: "/results",
    icon: FileText,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: BookOpen,
  },
  {
    title: "Wellness",
    url: "/wellness",
    icon: Heart,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  }
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (page: string) => void
  currentPage?: string
  userRole?: string
}

export function AppSidebar({ onNavigate, currentPage, userRole = "admin", ...props }: AppSidebarProps) {
  // Select navigation items based on user role
  const navigationItems = 
    userRole === "student" ? studentNavigationItems : counselorNavigationItems

  // Handle navigation based on user role
  const handleNavigation = (url: string) => {
    // Remove leading slash if present
    const path = url.startsWith("/") ? url.substring(1) : url;
    
    // For student role, just use the path as is
    if (userRole === "student") {
      onNavigate?.(path);
    } else {
      // For counselor role, handle the nested paths
      onNavigate?.(path.replace("/ryff/", "").replace("/", ""));
    }
  };

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
                <span className="text-xs">
                  {userRole === "student" ? "Student Portal" : "Counselor Portal"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {userRole === "student" ? "Student Menu" : "Counselor Menu"}
          </SidebarGroupLabel>
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
                                onClick={() => handleNavigation(subItem.url)}
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
                      isActive={currentPage === item.url?.replace("/", "")}
                      onClick={() => item.url && handleNavigation(item.url)}
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
