"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { BulkAssignment } from "@/components/bulk-assignment"
import { AutoReminders } from "@/components/auto-reminders"
import { StatusMonitor } from "@/components/status-monitor"
import { Reports } from "@/components/reports"
import { Settings } from "@/components/settings"
import { StudentDashboard } from "@/components/student-dashboard"
import { AIFeedback } from "@/components/ai-feedback"
import { RyffScoring } from "@/components/ryff-scoring"
import { Notifications } from "@/components/notifications"
import { SuperAdminDashboard } from "@/components/super-admin-dashboard"
import { SchoolManagement } from "@/components/school-management"
import { UserManagement } from "@/components/user-management"
import { SystemSettings } from "@/components/system-settings"
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
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const roleParam = searchParams?.get("role")
  
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userRole, setUserRole] = useState(
    roleParam === "student" ? "student" : 
    roleParam === "superadmin" ? "superadmin" : "admin"
  ) // Set role based on URL param
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | undefined>(undefined)

  // Update role if URL parameter changes
  useEffect(() => {
    if (roleParam === "student") {
      setUserRole("student")
    } else if (roleParam === "superadmin") {
      setUserRole("superadmin")
    }
  }, [roleParam])

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    // Reset selected items when navigating
    if (page === "ai-feedback") {
      setSelectedStudentId(undefined)
    }
    if (page === "school-management") {
      setSelectedSchoolId(undefined)
    }
  }

  const handleNavigateWithParams = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page)
    
    // Handle specific parameters based on the page
    if (page === "scoring" && params?.department) {
      // Store the department filter for the Ryff Scoring page
      localStorage.setItem("selectedDepartmentFilter", params.department)
    }
    
    // Handle department parameter for AI Feedback
    if (page === "ai-feedback") {
      if (params?.department) {
        localStorage.setItem("selectedDepartmentFilter", params.department)
      }
      
      // Set the studentId if provided and make sure it's immediately available
      if (params?.studentId) {
        console.log("Setting studentId:", params.studentId);
        setSelectedStudentId(params.studentId)
      }
    }
    
    // Reset selected items when navigating to other pages
    if (page !== "ai-feedback") {
      setSelectedStudentId(undefined)
    }
    if (page !== "school-management") {
      setSelectedSchoolId(undefined)
    }
  }

  const handleBackToAdmin = () => {
    setUserRole("admin")
    setCurrentPage("dashboard")
    setSelectedStudentId(undefined)
  }

  const handleViewFeedback = (studentId: string) => {
    setSelectedStudentId(studentId)
    setCurrentPage("ai-feedback")
  }

  const handleEditSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId)
    setCurrentPage("school-management")
  }

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/cookies
    router.push("/landing")
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
    
    // For super admin role, show super admin pages
    if (userRole === "superadmin") {
      switch (currentPage) {
        case "dashboard":
          return <SuperAdminDashboard />
        case "school-management":
          return <SchoolManagement schoolId={selectedSchoolId} />
        case "user-management":
          return <UserManagement />
        case "system-settings":
          return <SystemSettings />
        default:
          return <SuperAdminDashboard />
      }
    }
    
    // For admin/counselor role, show all admin pages
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview onNavigate={handleNavigateWithParams} />
      case "bulk-assignment":
        return <BulkAssignment />
      case "auto-reminders":
        return <AutoReminders />
      case "scoring":
        return <RyffScoring onNavigate={handleNavigateWithParams} />
      case "status":
        return <StatusMonitor />
      case "reports":
        return <Reports />
      case "settings":
        return <Settings />
      case "ai-feedback":
        // Get department from localStorage if it was set during navigation
        const selectedDepartment = typeof window !== 'undefined' ? localStorage.getItem("selectedDepartmentFilter") : null;
        // Clear the localStorage item after retrieving it
        if (selectedDepartment) {
          localStorage.removeItem("selectedDepartmentFilter");
        }
        
        console.log("Rendering AIFeedback with studentId:", selectedStudentId);
        
        return <AIFeedback 
          studentId={selectedStudentId} 
          department={selectedDepartment || undefined}
          onBack={() => setCurrentPage("dashboard")} 
        />
      default:
        return <DashboardOverview onNavigate={handleNavigateWithParams} />
    }
  }

  const getPageTitle = () => {
    if (userRole === "student") {
      return "Student Dashboard"
    }
    
    if (userRole === "superadmin") {
      switch (currentPage) {
        case "dashboard":
          return "Super Admin Dashboard"
        case "school-management":
          return "School Management"
        case "user-management":
          return "User Management"
        case "system-settings":
          return "System Settings"
        default:
          return "Super Admin Dashboard"
      }
    }
    
    switch (currentPage) {
      case "dashboard":
        return "Dashboard"
      case "bulk-assignment":
        return "Bulk Assignment"
      case "auto-reminders":
        return "Auto-Reminders"
      case "scoring":
        return "Ryff Scoring"
      case "status":
        return "Status Monitor"
      case "reports":
        return "Reports"
      case "settings":
        return "Settings"
      case "ai-feedback":
        return "AI Feedback Review"
      default:
        return "Dashboard"
    }
  }

  const getBreadcrumbPath = () => {
    if (userRole === "student") {
      return ["Student Dashboard"]
    }
    
    if (userRole === "superadmin") {
      switch (currentPage) {
        case "dashboard":
          return ["Super Admin"]
        case "school-management":
          return ["Super Admin", "School Management"]
        case "user-management":
          return ["Super Admin", "User Management"]
        case "system-settings":
          return ["Super Admin", "System Settings"]
        default:
          return ["Super Admin"]
      }
    }
    
    switch (currentPage) {
      case "bulk-assignment":
      case "auto-reminders":
      case "scoring":
        return ["Ryff Assessment", getPageTitle()]
      case "ai-feedback":
        return ["Admin", "AI Feedback Review"]
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
          
          <div className="ml-auto flex items-center gap-4 mr-4">
            {userRole === "admin" && (
              <Notifications onViewFeedback={handleViewFeedback} />
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">{renderContent()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 