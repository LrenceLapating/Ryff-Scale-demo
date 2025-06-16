"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { UserManagement } from "@/components/user-management"

// Component that uses searchParams
function UserManagementContent() {
  const searchParams = useSearchParams()
  
  return <UserManagement />
}

export default function UserManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<div>Loading user management...</div>}>
        <UserManagementContent />
      </Suspense>
    </div>
  )
} 