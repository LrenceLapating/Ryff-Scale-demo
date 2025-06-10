"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, UserPlus, Cog, Mail, School, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSchools, mockCounselors } from "@/lib/mock-data"

// Mock system alerts
const mockSystemAlerts = [
  {
    id: "1",
    title: "Database Backup Completed",
    description: "Daily database backup completed successfully",
    date: "2023-11-10",
    type: "info",
  },
  {
    id: "2",
    title: "System Update Available",
    description: "Version 2.3.4 is available for installation",
    date: "2023-11-09",
    type: "update",
  },
  {
    id: "3",
    title: "High Server Load Detected",
    description: "Server load exceeded 80% for more than 10 minutes",
    date: "2023-11-08",
    type: "warning",
  },
]

export function SuperAdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleCreateSchool = () => {
    router.push("/school-management?action=create")
  }

  const handleCreateCounselor = () => {
    router.push("/user-management?action=create")
  }

  const handleEditSchool = (schoolId: string) => {
    router.push(`/school-management?id=${schoolId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage schools, users, and system settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateSchool}>
            <Building className="mr-2 h-4 w-4" />
            Add School
          </Button>
          <Button onClick={handleCreateCounselor}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Counselor
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="counselors">Counselors</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSchools.length}</div>
                <p className="text-xs text-muted-foreground">
                  {mockSchools.filter(s => s.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Counselors</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCounselors.length}</div>
                <p className="text-xs text-muted-foreground">
                  {mockCounselors.filter(c => c.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockSchools.reduce((acc, school) => acc + school.students, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {mockSchools.filter(s => s.status === "active").length} schools
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-lg font-medium mt-6">Recent System Alerts</h3>
          <div className="space-y-4">
            {mockSystemAlerts.map(alert => (
              <Card key={alert.id}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">{alert.title}</CardTitle>
                    <Badge variant={alert.type === "warning" ? "destructive" : "secondary"}>
                      {alert.type}
                    </Badge>
                  </div>
                  <CardDescription>{alert.date}</CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm">{alert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="schools" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="text-lg font-medium">Registered Schools</h3>
              <p className="text-sm text-muted-foreground">
                Manage schools and their information
              </p>
            </div>
            <div className="border-t">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left text-sm font-medium">School Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Contact Person</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Counselors</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Students</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSchools.map(school => (
                    <tr key={school.id} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{school.name}</div>
                          <div className="text-sm text-muted-foreground">{school.address}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div>{school.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{school.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={school.status === "active" ? "outline" : "secondary"}>
                          {school.status === "active" ? "Active" : "Pending"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{school.counselors}</td>
                      <td className="py-3 px-4">{school.students}</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditSchool(school.id)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="counselors" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="text-lg font-medium">Registered Counselors</h3>
              <p className="text-sm text-muted-foreground">
                Manage counselor accounts
              </p>
            </div>
            <div className="border-t">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">School</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Students</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCounselors.map(counselor => (
                    <tr key={counselor.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="font-medium">{counselor.name}</div>
                      </td>
                      <td className="py-3 px-4">{counselor.email}</td>
                      <td className="py-3 px-4">{counselor.school}</td>
                      <td className="py-3 px-4">
                        <Badge variant={counselor.status === "active" ? "outline" : "secondary"}>
                          {counselor.status === "active" ? "Active" : "Pending"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{counselor.students}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Reset Password</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                View and manage system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">System Version</h4>
                  <p className="text-sm">2.3.3</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Last Updated</h4>
                  <p className="text-sm">2023-11-05</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Database Status</h4>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-sm">Healthy</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Storage Usage</h4>
                  <p className="text-sm">45.2 GB / 100 GB</p>
                </div>
              </div>
              
              <div className="rounded-md bg-amber-50 p-4 text-amber-800 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">System Update Available</h4>
                  <p className="text-sm">Version 2.3.4 is available for installation. Contains security patches and performance improvements.</p>
                  <Button size="sm" className="mt-2 bg-amber-800 hover:bg-amber-700">
                    Install Update
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">Backup System</Button>
              <Button variant="outline" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                Maintenance Mode
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 