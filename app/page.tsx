"use client"

import React, { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { BulkAssignment } from "@/components/bulk-assignment"
import { AutoReminders } from "@/components/auto-reminders"
import { StatusMonitor } from "@/components/status-monitor"
import { Reports } from "@/components/reports"
import { Settings } from "@/components/settings"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "bulk-assignment":
        return <BulkAssignment />
      case "auto-reminders":
        return <AutoReminders />
      case "status":
        return <StatusMonitor />
      case "reports":
        return <Reports />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard"
      case "bulk-assignment":
        return "Bulk Assignment"
      case "auto-reminders":
        return "Auto-Reminders"
      case "status":
        return "Status Monitor"
      case "reports":
        return "Reports"
      case "settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  const getBreadcrumbPath = () => {
    switch (currentPage) {
      case "bulk-assignment":
      case "auto-reminders":
        return ["Ryff Assessment", getPageTitle()]
      default:
        return [getPageTitle()]
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" onClick={() => handleNavigate("dashboard")} className="cursor-pointer">
                    Ryff PWB System
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {getBreadcrumbPath().map((item, index) => (
                  <React.Fragment key={item}>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      {index === getBreadcrumbPath().length - 1 ? (
                        <BreadcrumbPage>{item}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href="#" className="cursor-pointer">
                          {item}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">{renderContent()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
