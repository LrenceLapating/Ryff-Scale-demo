"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SchoolManagement } from "@/components/school-management"

// Component that uses searchParams
function SchoolManagementContent() {
  const searchParams = useSearchParams()
  const id = searchParams?.get("id")
  
  return <SchoolManagement schoolId={id || undefined} />
}

export default function SchoolManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<div>Loading school data...</div>}>
        <SchoolManagementContent />
      </Suspense>
    </div>
  )
} 