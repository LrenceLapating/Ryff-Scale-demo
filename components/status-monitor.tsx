"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Send, Eye, RefreshCw } from "lucide-react"

const statusData = [
  { id: 1, name: "John Doe", role: "Student", classDept: "BSIT3A", status: "Completed", submissionDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", role: "Student", classDept: "BSIT3A", status: "In Progress", submissionDate: "-" },
  { id: 3, name: "Mike Johnson", role: "Student", classDept: "BSCS2B", status: "Not Started", submissionDate: "-" },
  { id: 4, name: "Sarah Wilson", role: "Faculty", classDept: "CCS", status: "Completed", submissionDate: "2024-01-14" },
  { id: 5, name: "Tom Brown", role: "Student", classDept: "BSIT4A", status: "Not Started", submissionDate: "-" },
  { id: 6, name: "Lisa Davis", role: "Student", classDept: "BSCS1A", status: "In Progress", submissionDate: "-" },
  { id: 7, name: "David Lee", role: "Faculty", classDept: "CN", status: "Completed", submissionDate: "2024-01-13" },
  {
    id: 8,
    name: "Emma Taylor",
    role: "Student",
    classDept: "BSIT2B",
    status: "Completed",
    submissionDate: "2024-01-16",
  },
]

export function StatusMonitor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [groupFilter, setGroupFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const filteredData = statusData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.classDept.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || item.role === roleFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesGroup = groupFilter === "all" || item.classDept.includes(groupFilter)

    return matchesSearch && matchesRole && matchesStatus && matchesGroup
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredData.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default">Completed</Badge>
      case "In Progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "Not Started":
        return <Badge variant="destructive">Not Started</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assessment Status Monitor</CardTitle>
          <CardDescription>Monitor assessment completion progress across groups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Faculty">Faculty</SelectItem>
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
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="BSIT">BSIT</SelectItem>
                <SelectItem value="BSCS">BSCS</SelectItem>
                <SelectItem value="CCS">CCS</SelectItem>
                <SelectItem value="CN">CN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Resend Assessment
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          )}

          {/* Status Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Class/Dept</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.classDept}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.submissionDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {item.status === "Completed" ? (
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.filter((item) => item.status === "Completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredData.filter((item) => item.status === "In Progress").length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {filteredData.filter((item) => item.status === "Not Started").length}
              </div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  (filteredData.filter((item) => item.status === "Completed").length / filteredData.length) * 100,
                ) || 0}
                %
              </div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
