"use client"

import React, { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { BulkAssignment } from "@/components/bulk-assignment"
import { AutoReminders } from "@/components/auto-reminders"
import { StatusMonitor } from "@/components/status-monitor"
import { Reports } from "@/components/reports"
import { Settings } from "@/components/settings"
import { StudentDashboard } from "@/components/student-dashboard"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userRole, setUserRole] = useState("admin") // Can be "admin" or "student"

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleBackToAdmin = () => {
    setUserRole("admin")
    setCurrentPage("dashboard")
  }

  // Get the appropriate currentPage for the student dashboard
  const getStudentPage = () => {
    // If we're in the student role, use the currentPage directly
    // This allows navigation via the sidebar to work
    if (userRole === "student") {
      return currentPage;
    }
    
    // If we're in admin role but viewing the student view,
    // return a default page
    return "assessments";
  }

  const renderContent = () => {
    // For student role, only show student dashboard
    if (userRole === "student") {
      return <StudentDashboard onBack={handleBackToAdmin} currentPage={getStudentPage()} />
    }
    
    // For admin/counselor role, show all admin pages
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
      case "student-view":
        return <StudentDashboard onBack={() => setCurrentPage("dashboard")} />
      default:
        return <DashboardOverview />
    }
  }

  const getPageTitle = () => {
    if (userRole === "student") {
      return "Student Dashboard"
    }
    
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
      case "student-view":
        return "Student View"
      default:
        return "Dashboard"
    }
  }

  const getBreadcrumbPath = () => {
    if (userRole === "student") {
      return ["Student Dashboard"]
    }
    
    switch (currentPage) {
      case "bulk-assignment":
      case "auto-reminders":
        return ["Ryff Assessment", getPageTitle()]
      case "student-view":
        return ["Admin", "Student View"]
      default:
        return [getPageTitle()]
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        userRole={userRole}
      />
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
          
          {/* Role switcher for demo purposes */}
          {userRole === "admin" && (
            <div className="ml-auto mr-4">
              <Tabs defaultValue="admin" onValueChange={(value) => setUserRole(value)}>
                <TabsList>
                  <TabsTrigger value="admin">Counselor View</TabsTrigger>
                  <TabsTrigger value="student">Student View</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">{renderContent()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
