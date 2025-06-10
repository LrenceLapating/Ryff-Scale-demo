"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { SchoolManagement } from "@/components/school-management"

export default function SchoolManagementPage() {
  const searchParams = useSearchParams()
  const id = searchParams?.get("id")
  
  return (
    <div className="container mx-auto py-6">
      <SchoolManagement schoolId={id || undefined} />
    </div>
  )
} 