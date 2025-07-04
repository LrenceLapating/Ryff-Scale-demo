"use client"

import type * as React from "react"
import { BarChart3, FileText, Settings, Users, Calendar, ChevronDown, MessageSquare, BookOpen, User, Heart, Brain, Calculator, Building, UserPlus, Cog, School } from "lucide-react"
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
      {
        title: "Ryff Scoring",
        url: "/ryff/scoring",
      },
    ],
  },
  {
    title: "Status",
    url: "/status",
    icon: Users,
  },
  {
    title: "AI Feedback",
    url: "/ai-feedback",
    icon: Brain,
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
  }
]

// Super Admin navigation items
const superAdminNavigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "School Management",
    url: "/school-management",
    icon: Building,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: UserPlus,
  },
  {
    title: "System Settings",
    url: "/system-settings",
    icon: Cog,
  }
]

// Student navigation items
const studentNavigationItems: NavigationItem[] = [
  {
    title: "Assessment",
    url: "/assessment",
    icon: BookOpen,
  },
  {
    title: "Results",
    url: "/results",
    icon: FileText,
  },
  {
    title: "Guidance Feedback",
    url: "/feedback",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
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
    userRole === "student" ? studentNavigationItems : 
    userRole === "superadmin" ? superAdminNavigationItems :
    counselorNavigationItems

  // Handle navigation based on user role
  const handleNavigation = (url: string) => {
    // Remove leading slash if present
    const path = url.startsWith("/") ? url.substring(1) : url;
    
    // For student role, just use the path as is
    if (userRole === "student") {
      onNavigate?.(path);
    } else if (userRole === "superadmin") {
      // For super admin role, handle the paths
      onNavigate?.(path.replace("/", ""));
    } else {
      // For counselor role, handle the nested paths
      if (path.includes("ryff/")) {
        // Extract the last part of the path for Ryff Assessment subitems
        const subPath = path.split("/").pop() || "";
        onNavigate?.(subPath);
      } else {
        onNavigate?.(path.replace("/", ""));
      }
    }
  };

  // Get the appropriate role label
  const getRoleLabel = () => {
    switch (userRole) {
      case "student":
        return "Student Menu";
      case "superadmin":
        return "Super Admin Menu";
      default:
        return "Counselor Menu";
    }
  };

  return (
    <Sidebar className="border-r border-slate-200 bg-slate-800" {...props}>
      <SidebarHeader className="border-b border-slate-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => onNavigate?.("dashboard")} className="cursor-pointer hover:bg-slate-700">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden bg-teal-600">
                <Brain className="size-6 text-white" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-white">Ryff PWB</span>
                <span className="text-xs text-slate-300">
                  {userRole === "student" ? "Student Portal" : 
                   userRole === "superadmin" ? "Super Admin Portal" : 
                   "Counselor Portal"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-medium">
            {getRoleLabel()}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="text-slate-200 hover:bg-slate-700">
                          <item.icon className="text-slate-400" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 text-slate-400" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={currentPage === subItem.url.replace("/ryff/", "").replace("/", "")}
                                onClick={() => handleNavigation(subItem.url)}
                                className={`cursor-pointer hover:bg-slate-700 ${
                                  currentPage === subItem.url.replace("/ryff/", "").replace("/", "") 
                                  ? "bg-teal-700 text-white" 
                                  : "text-slate-300"
                                }`}
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
                      className={`cursor-pointer hover:bg-slate-700 ${
                        currentPage === item.url?.replace("/", "") 
                        ? "bg-teal-700 text-white" 
                        : "text-slate-200"
                      }`}
                    >
                      <item.icon className={currentPage === item.url?.replace("/", "") ? "text-white" : "text-slate-400"} />
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
