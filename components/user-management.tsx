"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserPlus, Check, Search, X, RefreshCw, Mail, Phone } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { mockSchools, mockCounselors } from "@/lib/mock-data"

// Interface for counselor form data
interface CounselorFormData {
  name: string;
  email: string;
  phone: string;
  schoolId: string;
  departments: string[];
  password: string;
  confirmPassword: string;
  status: string;
}

export function UserManagement() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams?.get("action")
  
  const [isCreating, setIsCreating] = useState(action === "create")
  const [activeTab, setActiveTab] = useState("counselors")
  const [successMessage, setSuccessMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Form state
  const [formData, setFormData] = useState<CounselorFormData>({
    name: "",
    email: "",
    phone: "",
    schoolId: "",
    departments: [],
    password: "",
    confirmPassword: "",
    status: "active"
  })

  // Available departments based on selected school
  const [availableDepartments, setAvailableDepartments] = useState<{ id: string, name: string }[]>([])
  
  // Update available departments when school changes
  useEffect(() => {
    if (formData.schoolId) {
      const selectedSchool = mockSchools.find(school => school.id === formData.schoolId)
      if (selectedSchool) {
        setAvailableDepartments(selectedSchool.departments || [])
        // Reset departments when school changes
        setFormData(prev => ({ ...prev, departments: [] }))
      }
    } else {
      setAvailableDepartments([])
    }
  }, [formData.schoolId])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDepartmentToggle = (departmentId: string) => {
    setFormData(prev => {
      const departments = prev.departments.includes(departmentId)
        ? prev.departments.filter(id => id !== departmentId)
        : [...prev.departments, departmentId]
      
      return { ...prev, departments }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email || !formData.schoolId || formData.departments.length === 0) {
      alert("Please fill in all required fields and select at least one department")
      return
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    
    // Validate password strength
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }
    
    // In a real app, this would save to a database
    // For this demo, we'll simulate a successful submission after a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create a new counselor object
    const selectedSchool = mockSchools.find(school => school.id === formData.schoolId)
    
    const newCounselor = {
      id: `counselor_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      school: selectedSchool?.name || "",
      schoolId: formData.schoolId,
      departments: formData.departments,
      status: formData.status,
      students: 0,
      lastLogin: "Never"
    }
    
    // In a real app, you would update the database
    // For this demo, we'll just show a success message
    setSuccessMessage("Counselor account created successfully!")
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      schoolId: "",
      departments: [],
      password: "",
      confirmPassword: "",
      status: "active"
    })
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }
  
  const handleBack = () => {
    router.push("/dashboard?role=superadmin")
  }
  
  // Filter counselors based on search query
  const filteredCounselors = mockCounselors.filter(counselor => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      counselor.name.toLowerCase().includes(query) ||
      counselor.email.toLowerCase().includes(query) ||
      counselor.school.toLowerCase().includes(query)
    )
  })

  // Get active schools only
  const activeSchools = mockSchools.filter(school => school.status === "active")
  
  // For creating a new counselor account
  if (isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Create Counselor Account</h2>
        </div>
        
        {successMessage && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Counselor Information</CardTitle>
              <CardDescription>
                Create a new counselor account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schoolId">School <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.schoolId} 
                  onValueChange={(value) => handleSelectChange("schoolId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select school" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeSchools.map(school => (
                      <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Departments <span className="text-red-500">*</span></Label>
                <div className="border rounded-md p-4">
                  {availableDepartments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {formData.schoolId 
                        ? "No departments available for this school" 
                        : "Please select a school first"}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {availableDepartments.map(dept => (
                        <div key={dept.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`dept-${dept.id}`}
                            checked={formData.departments.includes(dept.id)}
                            onChange={() => handleDepartmentToggle(dept.id)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor={`dept-${dept.id}`} className="cursor-pointer">
                            {dept.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <p className="text-sm text-blue-700">
                  An email will be sent to the counselor with their login credentials.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button type="button" variant="outline" onClick={handleBack}>Cancel</Button>
              <Button type="submit">Create Account</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    )
  }
  
  // Default view - User listing
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage counselor accounts
          </p>
        </div>
        <Button onClick={() => router.push("/user-management?action=create")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Create Counselor Account
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="counselors">Counselors</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>
        
        <TabsContent value="counselors" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Counselor Accounts</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search counselors..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">School</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Last Login</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCounselors.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-muted-foreground">
                          No counselors found matching your search
                        </td>
                      </tr>
                    ) : (
                      filteredCounselors.map(counselor => (
                        <tr key={counselor.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="font-medium">{counselor.name}</div>
                          </td>
                          <td className="py-3 px-4">{counselor.email}</td>
                          <td className="py-3 px-4">{counselor.school}</td>
                          <td className="py-3 px-4">
                            <Badge variant={counselor.status === "active" ? "outline" : "secondary"}>
                              {counselor.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{counselor.lastLogin}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Reset Password
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Accounts</CardTitle>
              <CardDescription>
                Manage system administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Admin accounts have full access to the system
                </p>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Admin Account
                </Button>
              </div>
              
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Role</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Last Login</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">
                        <div className="font-medium">Super Admin</div>
                      </td>
                      <td className="py-3 px-4">superadmin@example.com</td>
                      <td className="py-3 px-4">Super Admin</td>
                      <td className="py-3 px-4">2023-11-10 10:15 AM</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Reset Password</Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 