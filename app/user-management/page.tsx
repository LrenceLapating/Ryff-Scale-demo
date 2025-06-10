"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { UserManagement } from "@/components/user-management"

export default function UserManagementPage() {
  const searchParams = useSearchParams()
  
  return (
    <div className="container mx-auto py-6">
      <UserManagement />
    </div>
  )
} 