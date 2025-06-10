"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, FileBarChart } from "lucide-react"

// Updated status data with section instead of role, and department instead of classDept
const statusData = [
  { id: 1, name: "John Doe", section: "BSIT3A", department: "CCS", status: "Completed", submissionDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", section: "BSIT3A", department: "CCS", status: "In Progress", submissionDate: "-" },
  { id: 3, name: "Mike Johnson", section: "BSCS2B", department: "CCS", status: "Not Started", submissionDate: "-" },
  { id: 4, name: "Sarah Wilson", section: "Faculty", department: "CCS", status: "Completed", submissionDate: "2024-01-14" },
  { id: 5, name: "Tom Brown", section: "BSIT4A", department: "CCS", status: "Not Started", submissionDate: "-" },
  { id: 6, name: "Lisa Davis", section: "BSCS1A", department: "CCS", status: "In Progress", submissionDate: "-" },
  { id: 7, name: "David Lee", section: "Faculty", department: "CN", status: "Completed", submissionDate: "2024-01-13" },
  {
    id: 8,
    name: "Emma Taylor",
    section: "BSIT2B",
    department: "CCS",
    status: "Completed",
    submissionDate: "2024-01-16",
  },
  { id: 9, name: "Robert Chen", section: "BSCE3A", department: "COE", status: "Completed", submissionDate: "2024-01-14" },
  { id: 10, name: "Maria Garcia", section: "BSCE2B", department: "COE", status: "In Progress", submissionDate: "-" },
  { id: 11, name: "James Wilson", section: "BSBA3A", department: "CBA", status: "Completed", submissionDate: "2024-01-15" },
  { id: 12, name: "Patricia Lopez", section: "BSBA2B", department: "CBA", status: "Not Started", submissionDate: "-" },
  { id: 13, name: "Michael Brown", section: "BSPS2A", department: "CAS", status: "Completed", submissionDate: "2024-01-16" },
  { id: 14, name: "Jennifer Davis", section: "BSED3B", department: "CAS", status: "In Progress", submissionDate: "-" },
]

// Extract unique departments and year-section combinations
const departments = Array.from(new Set(statusData.map(item => item.department)))
const yearSections = Array.from(new Set(statusData.map(item => item.section)))

export function StatusMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [yearSectionFilter, setYearSectionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const filteredData = statusData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYearSection = yearSectionFilter === "all" || item.section === yearSectionFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || item.department === departmentFilter

    return matchesSearch && matchesYearSection && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "In Progress":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>
      case "Not Started":
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Not Started</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <FileBarChart className="h-5 w-5 text-slate-600" />
            Assessment Status Monitor
          </CardTitle>
          <CardDescription>
            Monitor assessment completion progress across departments and sections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Summary Stats - Enhanced Version - Moved to top */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100 text-center">
              <div className="text-2xl font-bold text-green-700">
                {filteredData.filter((item) => item.status === "Completed").length}
              </div>
              <div className="text-sm text-green-600">Completed</div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {filteredData.filter((item) => item.status === "In Progress").length}
              </div>
              <div className="text-sm text-yellow-600">In Progress</div>
            </div>
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-center">
              <div className="text-2xl font-bold text-red-700">
                {filteredData.filter((item) => item.status === "Not Started").length}
              </div>
              <div className="text-sm text-red-600">Not Started</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {Math.round(
                  (filteredData.filter((item) => item.status === "Completed").length / filteredData.length) * 100
                ) || 0}
                %
              </div>
              <div className="text-sm text-blue-600">Completion Rate</div>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={yearSectionFilter} onValueChange={setYearSectionFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Year & Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {yearSections.map(section => (
                  <SelectItem key={section} value={section}>{section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.section}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.submissionDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No assessments found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
