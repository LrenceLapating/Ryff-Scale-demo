"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, FileBarChart, Upload, X, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample data - this would be replaced by uploaded CSV data in production
const initialStatusData = [
  { id: 1, name: "John Doe", section: "BSIT3A", department: "CCS", idNumber: "2020-10001", email: "john.doe@example.com", status: "Completed", submissionDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", section: "BSIT3A", department: "CCS", idNumber: "2020-10002", email: "jane.smith@example.com", status: "In Progress", submissionDate: "-" },
  { id: 3, name: "Mike Johnson", section: "BSCS2B", department: "CCS", idNumber: "2021-10003", email: "mike.johnson@example.com", status: "Not Started", submissionDate: "-" },
  { id: 4, name: "Sarah Wilson", section: "Faculty", department: "CCS", idNumber: "F-2018-001", email: "sarah.wilson@example.com", status: "Completed", submissionDate: "2024-01-14" },
  { id: 5, name: "Tom Brown", section: "BSIT4A", department: "CCS", idNumber: "2019-10005", email: "tom.brown@example.com", status: "Not Started", submissionDate: "-" },
  { id: 6, name: "Lisa Davis", section: "BSCS1A", department: "CCS", idNumber: "2022-10006", email: "lisa.davis@example.com", status: "In Progress", submissionDate: "-" },
  { id: 7, name: "David Lee", section: "Faculty", department: "CN", idNumber: "F-2019-007", email: "david.lee@example.com", status: "Completed", submissionDate: "2024-01-13" },
  { id: 8, name: "Emma Taylor", section: "BSIT2B", department: "CCS", idNumber: "2021-10008", email: "emma.taylor@example.com", status: "Completed", submissionDate: "2024-01-16" },
  { id: 9, name: "Robert Chen", section: "BSCE3A", department: "COE", idNumber: "2020-10009", email: "robert.chen@example.com", status: "Completed", submissionDate: "2024-01-14" },
  { id: 10, name: "Maria Garcia", section: "BSCE2B", department: "COE", idNumber: "2021-10010", email: "maria.garcia@example.com", status: "In Progress", submissionDate: "-" },
  { id: 11, name: "James Wilson", section: "BSBA3A", department: "CBA", idNumber: "2020-10011", email: "james.wilson@example.com", status: "Completed", submissionDate: "2024-01-15" },
  { id: 12, name: "Patricia Lopez", section: "BSBA2B", department: "CBA", idNumber: "2021-10012", email: "patricia.lopez@example.com", status: "Not Started", submissionDate: "-" },
  { id: 13, name: "Michael Brown", section: "BSPS2A", department: "CAS", idNumber: "2021-10013", email: "michael.brown@example.com", status: "Completed", submissionDate: "2024-01-16" },
  { id: 14, name: "Jennifer Davis", section: "BSED3B", department: "CAS", idNumber: "2020-10014", email: "jennifer.davis@example.com", status: "In Progress", submissionDate: "-" },
]

// Template data for CSV guidance
const templateData = [
  { Name: "John Doe", Section: "BSIT3A", Department: "CCS", "ID Number": "2020-10001", Email: "john.doe@example.com" },
  { Name: "Jane Smith", Section: "BSIT3A", Department: "CCS", "ID Number": "2020-10002", Email: "jane.smith@example.com" },
  { Name: "Mike Johnson", Section: "BSCS2B", Department: "CCS", "ID Number": "2021-10003", Email: "mike.johnson@example.com" }
];

export function StatusMonitor() {
  const [statusData, setStatusData] = useState(initialStatusData)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Group users by department and count them
  const departmentSummary = statusData.reduce((acc: { department: string; count: number }[], user) => {
    const existing = acc.find(item => item.department === user.department)
    if (existing) {
      existing.count++
    } else {
      acc.push({ department: user.department, count: 1 })
    }
    return acc
  }, [])

  // Get users for the selected department
  const departmentUsers = selectedDepartment 
    ? statusData.filter(user => user.department === selectedDepartment)
    : []

  // Filter users by search term when in detail view
  const filteredDepartmentUsers = searchTerm && selectedDepartment
    ? departmentUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : departmentUsers

  // Handle CSV file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string
        const parsedData = parseCSV(csvContent)
        if (parsedData.length > 0) {
          // Transform the CSV data to match our data structure
          let newUsers = parsedData.map((row, index) => ({
            id: Date.now() + index, // Use timestamp + index to create unique IDs
            name: row.Name || "",
            section: row.Section || "",
            department: row.Department || "",
            idNumber: row["ID Number"] || "",
            email: row.Email || "",
            status: "Not Started", // Default status for new users
            submissionDate: "-"
          }))
          
          // Check for duplicate ID numbers and filter them out
          const existingIdNumbers = statusData.map(user => user.idNumber)
          newUsers = newUsers.filter(user => !existingIdNumbers.includes(user.idNumber))
          
          // Merge new users with existing users
          setStatusData([...statusData, ...newUsers])
          
          setAlertMessage(`Successfully added ${newUsers.length} new users.`)
          setTimeout(() => setAlertMessage(null), 5000) // Clear message after 5 seconds
        } else {
          setAlertMessage("No valid data found in the CSV file.")
          setTimeout(() => setAlertMessage(null), 5000)
        }
      } catch (error) {
        console.error("Error parsing CSV:", error)
        setAlertMessage("Failed to parse CSV file. Please check the format.")
        setTimeout(() => setAlertMessage(null), 5000)
      }
    }
    reader.readAsText(file)
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Parse CSV content
  const parseCSV = (csvContent: string) => {
    const lines = csvContent.split('\n')
    if (lines.length < 2) return [] // Need at least header + 1 data row
    
    const headers = lines[0].split(',').map(h => h.trim())
    const requiredColumns = ["Name", "Section", "Department", "ID Number", "Email"]
    
    // Validate that all required columns are present
    const missingColumns = requiredColumns.filter(col => !headers.includes(col))
    if (missingColumns.length > 0) {
      setAlertMessage(`Missing required columns: ${missingColumns.join(", ")}`)
      return []
    }
    
    return lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',').map(v => v.trim())
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i] || ""
          return obj
        }, {} as Record<string, string>)
      })
  }

  // Export CSV template
  const exportCSVTemplate = () => {
    // Define CSV headers
    const headers = ["Name", "Section", "Department", "ID Number", "Email"];
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    
    // Add sample data rows
    templateData.forEach(row => {
      const values = headers.map(header => {
        // Escape commas and quotes in the data
        const value = String(row[header as keyof typeof row] || "").replace(/"/g, '""');
        return `"${value}"`;
      });
      csvContent += values.join(",") + "\n";
    });
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a download link and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "assessment_users_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setAlertMessage("Template CSV downloaded successfully.");
    setTimeout(() => setAlertMessage(null), 5000);
  };

  return (
    <div className="bg-slate-100 p-8 rounded-lg">
      {/* Title header that matches the screenshot */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-slate-800">
          <FileBarChart className="h-7 w-7 text-teal-600" />
            Assessment Status Monitor
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Monitor assessment completion progress across departments
        </p>
              </div>

      {selectedDepartment ? (
        // Detailed Department View
        <div className="space-y-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-medium text-slate-700">
              Department: <span className="font-bold text-slate-900">{selectedDepartment}</span>
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedDepartment(null)}
              className="flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
          
          {/* Search in Detail View */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
              placeholder="Search by name, ID number or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 bg-white"
            />
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700">Name</TableHead>
                  <TableHead className="text-slate-700">Section</TableHead>
                  <TableHead className="text-slate-700">ID Number</TableHead>
                  <TableHead className="text-slate-700">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartmentUsers.length > 0 ? (
                  filteredDepartmentUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50 border-slate-200">
                      <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                      <TableCell className="text-slate-600">{user.section}</TableCell>
                      <TableCell className="text-slate-600">{user.idNumber}</TableCell>
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                      No users found in this department
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        // Department Overview
        <div>
          {/* CSV Upload Section */}
          <div className="flex items-center gap-4 mb-8 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload} 
              ref={fileInputRef}
              className="hidden"
              id="csv-upload" 
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Upload className="h-4 w-4" />
              Upload CSV
            </Button>
            <Button 
              variant="outline"
              onClick={exportCSVTemplate}
              className="flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-200"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
            <span className="text-sm text-slate-600">
              Format: Name, Section, Department, ID Number, Email
            </span>
          </div>
          
          {/* Department Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-slate-200">
                  <TableHead className="w-[50%] text-slate-700 font-semibold">Department Name</TableHead>
                  <TableHead className="w-[30%] text-slate-700 font-semibold">Total Users</TableHead>
                  <TableHead className="w-[20%] text-slate-700 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentSummary.length > 0 ? (
                  departmentSummary.map((dept) => (
                    <TableRow key={dept.department} className="border-slate-200 hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-800">{dept.department}</TableCell>
                      <TableCell className="text-slate-600">{dept.count}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setSelectedDepartment(dept.department)
                            setSearchTerm("")
                          }}
                          className="bg-white text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-slate-200">
                    <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                      No departments found. Please upload CSV data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {/* Alert messages */}
      {alertMessage && (
        <div className="mt-5">
          <Alert className="bg-teal-50 text-teal-800 border-teal-200">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
