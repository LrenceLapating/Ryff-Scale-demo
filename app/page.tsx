"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to landing page
    router.push('/landing')
  }, [router])
  
  return null
}
