"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Calculator, Download, FileUp, Upload, Check, Info, Brain, Search, Filter, Eye, ChevronDown, ChevronUp } from "lucide-react"

// Ryff Scale dimensions
const dimensions = [
  "Autonomy",
  "Environmental Mastery",
  "Personal Growth",
  "Positive Relations",
  "Purpose in Life",
  "Self-Acceptance"
]

// Ryff Scale item mapping by dimension (for 42-item version)
const dimensionItems42 = {
  "Autonomy": [1, 7, 13, 19, 25, 31, 37],
  "Environmental Mastery": [2, 8, 14, 20, 26, 32, 38],
  "Personal Growth": [3, 9, 15, 21, 27, 33, 39],
  "Positive Relations": [4, 10, 16, 22, 28, 34, 40],
  "Purpose in Life": [5, 11, 17, 23, 29, 35, 41],
  "Self-Acceptance": [6, 12, 18, 24, 30, 36, 42]
}

// Ryff Scale item mapping by dimension (for 54-item version)
const dimensionItems54 = {
  "Autonomy": [1, 7, 13, 19, 25, 31, 37, 43, 49],
  "Environmental Mastery": [2, 8, 14, 20, 26, 32, 38, 44, 50],
  "Personal Growth": [3, 9, 15, 21, 27, 33, 39, 45, 51],
  "Positive Relations": [4, 10, 16, 22, 28, 34, 40, 46, 52],
  "Purpose in Life": [5, 11, 17, 23, 29, 35, 41, 47, 53],
  "Self-Acceptance": [6, 12, 18, 24, 30, 36, 42, 48, 54]
}

// Ryff Scale item mapping by dimension (for 84-item version)
const dimensionItems84 = {
  "Autonomy": [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79],
  "Environmental Mastery": [2, 8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80],
  "Personal Growth": [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81],
  "Positive Relations": [4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82],
  "Purpose in Life": [5, 11, 17, 23, 29, 35, 41, 47, 53, 59, 65, 71, 77, 83],
  "Self-Acceptance": [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84]
}

// Reversed items for each version
const reversedItems42 = [4, 8, 10, 14, 16, 20, 22, 26, 28, 32, 34, 38, 40]
const reversedItems54 = [4, 8, 10, 14, 16, 20, 22, 26, 28, 32, 34, 38, 40, 44, 46, 50, 52]
const reversedItems84 = [4, 8, 10, 14, 16, 20, 22, 26, 28, 32, 34, 38, 40, 44, 46, 50, 52, 56, 58, 62, 64, 68, 70, 74, 76, 80, 82]

// Risk thresholds
const riskThresholds = {
  "low": 70,
  "medium": 50,
  "high": 40
}

interface ScoringResult {
  dimensions: {
    [key: string]: number;
  };
  overallScore: number;
  riskLevel: string;
  riskDimensions: string[];
}

// Mock data for automatically scored assessments
const mockScoredAssessments = [
  {
    id: "1",
    studentName: "John Doe",
    studentId: "ST12345",
    department: "Information Technology",
    section: "BSIT3A",
    submissionDate: "2024-06-10",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 65,
      "Environmental Mastery": 70,
      "Personal Growth": 45,
      "Positive Relations": 68,
      "Purpose in Life": 42,
      "Self-Acceptance": 60
    },
    overallScore: 58,
    riskLevel: "medium",
    riskDimensions: ["Personal Growth", "Purpose in Life"]
  },
  {
    id: "2",
    studentName: "Jane Smith",
    studentId: "ST12346",
    department: "Computer Science",
    section: "BSCS2B",
    submissionDate: "2024-06-09",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 72,
      "Environmental Mastery": 50,
      "Personal Growth": 63,
      "Positive Relations": 48,
      "Purpose in Life": 67,
      "Self-Acceptance": 45
    },
    overallScore: 57,
    riskLevel: "medium",
    riskDimensions: ["Environmental Mastery", "Positive Relations", "Self-Acceptance"]
  },
  {
    id: "3",
    studentName: "Mike Johnson",
    studentId: "ST12347",
    department: "Information Technology",
    section: "BSIT4A",
    submissionDate: "2024-06-08",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 68,
      "Environmental Mastery": 72,
      "Personal Growth": 70,
      "Positive Relations": 65,
      "Purpose in Life": 75,
      "Self-Acceptance": 35
    },
    overallScore: 64,
    riskLevel: "high",
    riskDimensions: ["Self-Acceptance"]
  },
  {
    id: "4",
    studentName: "Sarah Williams",
    studentId: "ST12348",
    department: "Computer Science",
    section: "BSCS3A",
    submissionDate: "2024-06-07",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 55,
      "Environmental Mastery": 60,
      "Personal Growth": 65,
      "Positive Relations": 40,
      "Purpose in Life": 58,
      "Self-Acceptance": 62
    },
    overallScore: 56,
    riskLevel: "high",
    riskDimensions: ["Positive Relations"]
  },
  {
    id: "5",
    studentName: "David Lee",
    studentId: "ST12349",
    department: "Information Technology",
    section: "BSIT2B",
    submissionDate: "2024-06-06",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 78,
      "Environmental Mastery": 75,
      "Personal Growth": 80,
      "Positive Relations": 76,
      "Purpose in Life": 82,
      "Self-Acceptance": 79
    },
    overallScore: 78,
    riskLevel: "low",
    riskDimensions: []
  },
  {
    id: "6",
    studentName: "Emily Chen",
    studentId: "ST12350",
    department: "Computer Science",
    section: "BSCS1A",
    submissionDate: "2024-06-05",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 71,
      "Environmental Mastery": 68,
      "Personal Growth": 74,
      "Positive Relations": 72,
      "Purpose in Life": 70,
      "Self-Acceptance": 73
    },
    overallScore: 71,
    riskLevel: "low",
    riskDimensions: []
  },
  {
    id: "7",
    studentName: "Robert Brown",
    studentId: "ST12351",
    department: "Engineering",
    section: "BSCE3B",
    submissionDate: "2024-06-04",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 62,
      "Environmental Mastery": 58,
      "Personal Growth": 65,
      "Positive Relations": 60,
      "Purpose in Life": 55,
      "Self-Acceptance": 48
    },
    overallScore: 58,
    riskLevel: "medium",
    riskDimensions: ["Purpose in Life", "Self-Acceptance"]
  },
  {
    id: "8",
    studentName: "Lisa Rodriguez",
    studentId: "ST12352",
    department: "Engineering",
    section: "BSCE2A",
    submissionDate: "2024-06-03",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 80,
      "Environmental Mastery": 75,
      "Personal Growth": 82,
      "Positive Relations": 78,
      "Purpose in Life": 85,
      "Self-Acceptance": 81
    },
    overallScore: 80,
    riskLevel: "low",
    riskDimensions: []
  },
  {
    id: "9",
    studentName: "Kevin Wong",
    studentId: "ST12353",
    department: "Information Technology",
    section: "BSIT3A",
    submissionDate: "2024-06-02",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 55,
      "Environmental Mastery": 52,
      "Personal Growth": 48,
      "Positive Relations": 51,
      "Purpose in Life": 47,
      "Self-Acceptance": 45
    },
    overallScore: 50,
    riskLevel: "high",
    riskDimensions: ["Personal Growth", "Purpose in Life", "Self-Acceptance"]
  },
  {
    id: "10",
    studentName: "Jessica Martin",
    studentId: "ST12354",
    department: "Computer Science",
    section: "BSCS2B",
    submissionDate: "2024-06-01",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 68,
      "Environmental Mastery": 65,
      "Personal Growth": 70,
      "Positive Relations": 67,
      "Purpose in Life": 72,
      "Self-Acceptance": 69
    },
    overallScore: 68,
    riskLevel: "medium",
    riskDimensions: []
  }
];

export function RyffScoring() {
  const [activeTab, setActiveTab] = useState("automatic")
  const [scaleVersion, setScaleVersion] = useState("42")
  const [manualResponses, setManualResponses] = useState<string>("")
  const [studentName, setStudentName] = useState<string>("")
  const [studentId, setStudentId] = useState<string>("")
  const [studentClass, setStudentClass] = useState<string>("")
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // State for automatic scoring view
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"student" | "department" | "section">("student")
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'ascending' | 'descending'}>({
    key: 'submissionDate',
    direction: 'descending'
  })
  
  // Extract unique departments and sections from mock data
  const departments = Array.from(new Set(mockScoredAssessments.map(a => a.department)))
  const sections = Array.from(new Set(mockScoredAssessments.map(a => a.section)))
  
  // Filter assessments based on filters
  const filteredAssessments = mockScoredAssessments.filter(assessment => {
    const matchesSearch = 
      assessment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.section.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = departmentFilter === "all" || assessment.department === departmentFilter
    const matchesSection = sectionFilter === "all" || assessment.section === sectionFilter
    const matchesRisk = riskFilter === "all" || assessment.riskLevel === riskFilter
    
    return matchesSearch && matchesDepartment && matchesSection && matchesRisk
  })
  
  // Sort assessments
  const sortedAssessments = [...filteredAssessments].sort((a, b) => {
    if (sortConfig.key === 'submissionDate') {
      return sortConfig.direction === 'ascending' 
        ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
        : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
    } 
    
    if (sortConfig.key === 'overallScore') {
      return sortConfig.direction === 'ascending' 
        ? a.overallScore - b.overallScore
        : b.overallScore - a.overallScore
    }
    
    if (sortConfig.key === 'studentName') {
      return sortConfig.direction === 'ascending' 
        ? a.studentName.localeCompare(b.studentName)
        : b.studentName.localeCompare(a.studentName)
    }
    
    return 0
  })
  
  // Get the selected assessment
  const currentAssessment = selectedAssessment 
    ? mockScoredAssessments.find(a => a.id === selectedAssessment)
    : null
    
  // Calculate aggregated data for departments
  const departmentData = departments.map(dept => {
    const deptAssessments = mockScoredAssessments.filter(a => a.department === dept)
    const totalScore = deptAssessments.reduce((sum, a) => sum + a.overallScore, 0)
    const avgScore = Math.round(totalScore / deptAssessments.length)
    
    // Calculate dimension averages
    const dimensionScores: {[key: string]: number} = {}
    for (const dimension of dimensions) {
      const totalDimScore = deptAssessments.reduce((sum, a) => sum + a.dimensions[dimension], 0)
      dimensionScores[dimension] = Math.round(totalDimScore / deptAssessments.length)
    }
    
    // Count risk levels
    const highRisk = deptAssessments.filter(a => a.riskLevel === "high").length
    const mediumRisk = deptAssessments.filter(a => a.riskLevel === "medium").length
    const lowRisk = deptAssessments.filter(a => a.riskLevel === "low").length
    
    return {
      department: dept,
      studentCount: deptAssessments.length,
      overallScore: avgScore,
      dimensions: dimensionScores,
      highRisk,
      mediumRisk,
      lowRisk
    }
  })
  
  // Calculate aggregated data for sections
  const sectionData = sections.map(sect => {
    const sectAssessments = mockScoredAssessments.filter(a => a.section === sect)
    const totalScore = sectAssessments.reduce((sum, a) => sum + a.overallScore, 0)
    const avgScore = Math.round(totalScore / sectAssessments.length)
    
    // Get department
    const department = sectAssessments[0]?.department || ""
    
    // Calculate dimension averages
    const dimensionScores: {[key: string]: number} = {}
    for (const dimension of dimensions) {
      const totalDimScore = sectAssessments.reduce((sum, a) => sum + a.dimensions[dimension], 0)
      dimensionScores[dimension] = Math.round(totalDimScore / sectAssessments.length)
    }
    
    // Count risk levels
    const highRisk = sectAssessments.filter(a => a.riskLevel === "high").length
    const mediumRisk = sectAssessments.filter(a => a.riskLevel === "medium").length
    const lowRisk = sectAssessments.filter(a => a.riskLevel === "low").length
    
    return {
      section: sect,
      department,
      studentCount: sectAssessments.length,
      overallScore: avgScore,
      dimensions: dimensionScores,
      highRisk,
      mediumRisk,
      lowRisk
    }
  })
  
  // Handle sort change
  const handleSort = (key: string) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
      })
    } else {
      setSortConfig({
        key,
        direction: 'ascending'
      })
    }
  }

  // Calculate scores from responses
  const calculateScores = (responses: number[], version: string) => {
    // Determine which dimension mapping and reversed items to use
    const dimensionItems = version === "42" 
      ? dimensionItems42 
      : version === "54" 
        ? dimensionItems54 
        : dimensionItems84
    
    const reversedItems = version === "42" 
      ? reversedItems42 
      : version === "54" 
        ? reversedItems54 
        : reversedItems84
    
    // Calculate dimension scores
    const dimensionScores: { [key: string]: number } = {}
    let totalScore = 0
    let totalItems = 0
    
    for (const dimension of dimensions) {
      const items = dimensionItems[dimension as keyof typeof dimensionItems]
      let dimensionTotal = 0
      
      for (const itemNum of items) {
        // Adjust for 0-indexed array
        const index = itemNum - 1
        
        if (index < responses.length) {
          // Get response value (1-6)
          let value = responses[index]
          
          // Reverse score if needed (7 - score)
          if (reversedItems.includes(itemNum)) {
            value = 7 - value
          }
          
          dimensionTotal += value
          totalItems++
        }
      }
      
      // Calculate average score for dimension (0-100 scale)
      const itemCount = items.length
      const maxPossible = itemCount * 6 // 6 is max score per item
      const percentScore = Math.round((dimensionTotal / maxPossible) * 100)
      
      dimensionScores[dimension] = percentScore
      totalScore += dimensionTotal
    }
    
    // Calculate overall score (0-100 scale)
    const maxTotalPossible = totalItems * 6
    const overallScore = Math.round((totalScore / maxTotalPossible) * 100)
    
    // Determine risk level and risk dimensions
    let riskLevel = "low"
    const riskDimensions: string[] = []
    
    for (const dimension of dimensions) {
      const score = dimensionScores[dimension]
      
      if (score <= riskThresholds.high) {
        riskLevel = "high"
        riskDimensions.push(dimension)
      } else if (score <= riskThresholds.medium && riskLevel !== "high") {
        riskLevel = "medium"
        if (!riskDimensions.includes(dimension)) {
          riskDimensions.push(dimension)
        }
      }
    }
    
    return {
      dimensions: dimensionScores,
      overallScore,
      riskLevel,
      riskDimensions
    }
  }

  // Parse manual responses
  const parseManualResponses = () => {
    try {
      // Clear previous messages
      setError(null)
      setSuccessMessage(null)
      
      // Validate student info
      if (!studentName.trim()) {
        setError("Please enter a student name")
        return
      }
      
      // Parse responses from text
      const lines = manualResponses.trim().split(/\n+/)
      const responses: number[] = []
      
      for (const line of lines) {
        // Extract numbers from each line
        const match = line.match(/\d+\s*[:.,-]?\s*(\d+)/)
        if (match && match[1]) {
          const value = parseInt(match[1])
          if (value >= 1 && value <= 6) {
            responses.push(value)
          } else {
            setError(`Invalid response value: ${value}. Values must be between 1-6.`)
            return
          }
        }
      }
      
      // Check if we have enough responses
      const expectedItems = scaleVersion === "42" ? 42 : scaleVersion === "54" ? 54 : 84
      if (responses.length < expectedItems) {
        setError(`Not enough responses. Expected ${expectedItems}, got ${responses.length}.`)
        return
      }
      
      // Calculate scores
      const result = calculateScores(responses, scaleVersion)
      setScoringResult(result)
      setSuccessMessage("Scoring completed successfully!")
    } catch (err) {
      setError("Error parsing responses. Please check the format and try again.")
      console.error(err)
    }
  }

  // Get color for score display
  const getScoreColor = (score: number) => {
    if (score < riskThresholds.high) return "text-destructive"
    if (score < riskThresholds.medium) return "text-yellow-600"
    return "text-green-600"
  }

  // Get badge for risk level
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>
      case "low":
        return <Badge variant="outline">Low Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Save results to student profile
  const saveResults = () => {
    if (!scoringResult) return
    
    // In a real application, this would save to a database
    setSuccessMessage("Results saved to student profile!")
    
    // Reset form after saving
    setTimeout(() => {
      setManualResponses("")
      setStudentName("")
      setStudentId("")
      setStudentClass("")
      setScoringResult(null)
      setSuccessMessage(null)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Ryff Scale Automated Scoring
          </CardTitle>
          <CardDescription>
            View automatically scored assessments and calculate scores from manual responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="automatic">Automatic Scoring</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="upload">Upload Responses</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Processing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="automatic" className="space-y-4">
              {/* View Mode Selector */}
              <div className="flex justify-between items-center">
                <div>
                  <RadioGroup 
                    value={viewMode} 
                    onValueChange={(value) => setViewMode(value as "student" | "department" | "section")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student-view" />
                      <Label htmlFor="student-view">Student View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="department" id="department-view" />
                      <Label htmlFor="department-view">Department Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="section" id="section-view" />
                      <Label htmlFor="section-view">Section Summary</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Reset button if an assessment is selected */}
                {selectedAssessment && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedAssessment(null)}
                  >
                    Back to List
                  </Button>
                )}
              </div>
              
              {!selectedAssessment ? (
                // List view - different based on viewMode
                <>
                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, ID, or section..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {viewMode === "student" && (
                      <>
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
                        
                        <Select value={sectionFilter} onValueChange={setSectionFilter}>
                          <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sections</SelectItem>
                            {sections.map(sect => (
                              <SelectItem key={sect} value={sect}>{sect}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Select value={riskFilter} onValueChange={setRiskFilter}>
                          <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="Risk Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="high">High Risk</SelectItem>
                            <SelectItem value="medium">Medium Risk</SelectItem>
                            <SelectItem value="low">Low Risk</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>
                  
                  {/* Student view */}
                  {viewMode === "student" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('studentName')}>
                              <div className="flex items-center gap-1">
                                Student
                                {sortConfig.key === 'studentName' && (
                                  sortConfig.direction === 'ascending' ? 
                                    <ChevronUp className="h-4 w-4" /> : 
                                    <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort('submissionDate')}>
                              <div className="flex items-center gap-1">
                                Submission Date
                                {sortConfig.key === 'submissionDate' && (
                                  sortConfig.direction === 'ascending' ? 
                                    <ChevronUp className="h-4 w-4" /> : 
                                    <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </TableHead>
                            <TableHead className="text-right cursor-pointer" onClick={() => handleSort('overallScore')}>
                              <div className="flex items-center justify-end gap-1">
                                Overall Score
                                {sortConfig.key === 'overallScore' && (
                                  sortConfig.direction === 'ascending' ? 
                                    <ChevronUp className="h-4 w-4" /> : 
                                    <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedAssessments.length > 0 ? (
                            sortedAssessments.map((assessment) => (
                              <TableRow key={assessment.id}>
                                <TableCell className="font-medium">
                                  {assessment.studentName}
                                  <div className="text-xs text-muted-foreground">{assessment.studentId}</div>
                                </TableCell>
                                <TableCell>{assessment.department}</TableCell>
                                <TableCell>{assessment.section}</TableCell>
                                <TableCell>{assessment.submissionDate}</TableCell>
                                <TableCell className="text-right">
                                  <span className={getScoreColor(assessment.overallScore)}>
                                    {assessment.overallScore}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {getRiskBadge(assessment.riskLevel)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setSelectedAssessment(assessment.id)}
                                    className="gap-1"
                                  >
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4">
                                No assessments found matching the current filters
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {/* Department view */}
                  {viewMode === "department" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {departmentData.map((dept) => (
                        <Card key={dept.department}>
                          <CardHeader className="pb-2">
                            <CardTitle>{dept.department}</CardTitle>
                            <CardDescription>
                              {dept.studentCount} students assessed
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">Overall Average</span>
                                <span className={`font-bold ${getScoreColor(dept.overallScore)}`}>{dept.overallScore}</span>
                              </div>
                              <Progress value={dept.overallScore} className="h-2" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              {dimensions.map(dim => (
                                <div key={dim} className="text-sm">
                                  <div className="flex justify-between mb-1">
                                    <span>{dim}</span>
                                    <span className={getScoreColor(dept.dimensions[dim])}>{dept.dimensions[dim]}</span>
                                  </div>
                                  <Progress value={dept.dimensions[dim]} className="h-1" />
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between text-sm pt-2">
                              <div className="flex items-center gap-1">
                                <Badge variant="destructive" className="h-2 w-2 rounded-full p-0" />
                                <span>High Risk: {dept.highRisk}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                                <span>Medium: {dept.mediumRisk}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="h-2 w-2 rounded-full p-0" />
                                <span>Low: {dept.lowRisk}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* Section view */}
                  {viewMode === "section" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Section</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead className="text-center">Students</TableHead>
                            <TableHead className="text-center">Overall Avg</TableHead>
                            <TableHead className="text-center">High Risk</TableHead>
                            <TableHead className="text-center">Medium Risk</TableHead>
                            <TableHead className="text-center">Low Risk</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sectionData.map(section => (
                            <TableRow key={section.section}>
                              <TableCell className="font-medium">{section.section}</TableCell>
                              <TableCell>{section.department}</TableCell>
                              <TableCell className="text-center">{section.studentCount}</TableCell>
                              <TableCell className="text-center">
                                <span className={getScoreColor(section.overallScore)}>
                                  {section.overallScore}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">{section.highRisk}</TableCell>
                              <TableCell className="text-center">{section.mediumRisk}</TableCell>
                              <TableCell className="text-center">{section.lowRisk}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </>
              ) : (
                // Detailed assessment view
                <div className="space-y-6">
                  {currentAssessment && (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{currentAssessment.studentName}</h3>
                          <p className="text-muted-foreground">
                            {currentAssessment.studentId} • {currentAssessment.section} • {currentAssessment.department}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Submitted on {currentAssessment.submissionDate} • {currentAssessment.scaleVersion}-item scale
                          </p>
                        </div>
                        <div>
                          {getRiskBadge(currentAssessment.riskLevel)}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-2">Overall Psychological Well-Being Score</h4>
                        <div className="flex items-center gap-4">
                          <Progress value={currentAssessment.overallScore} className="h-4 flex-1" />
                          <span className={`text-xl font-bold ${getScoreColor(currentAssessment.overallScore)}`}>
                            {currentAssessment.overallScore}
                          </span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-lg font-medium mb-4">Dimension Scores</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {dimensions.map((dimension) => {
                            const score = currentAssessment.dimensions[dimension]
                            const isRiskDimension = currentAssessment.riskDimensions.includes(dimension)
                            
                            return (
                              <div key={dimension} className={`p-4 rounded-lg ${isRiskDimension ? 'bg-red-50/50' : 'bg-muted/30'}`}>
                                <div className="flex justify-between items-center mb-2">
                                  <h5 className="font-medium">{dimension}</h5>
                                  <span className={`font-bold ${getScoreColor(score)}`}>{score}</span>
                                </div>
                                <Progress value={score} className={`h-2 ${isRiskDimension ? 'bg-red-100' : ''}`} />
                                {isRiskDimension && (
                                  <p className="text-xs text-red-600 mt-2">
                                    {score <= riskThresholds.high ? "High risk area" : "Potential concern"}
                                  </p>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="p-4 rounded-lg bg-blue-50 flex items-start gap-3">
                        <Brain className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">AI Recommendation</h4>
                          <p className="text-sm text-blue-700">
                            {currentAssessment.riskLevel === "high" ? (
                              "This student shows significant risk factors that may require immediate attention. Consider scheduling a one-on-one counseling session to address the identified concerns."
                            ) : currentAssessment.riskLevel === "medium" ? (
                              "This student shows some potential areas of concern. Regular check-ins and targeted interventions for the identified dimensions may be beneficial."
                            ) : (
                              "This student appears to be maintaining good psychological well-being. Continue to provide general support and periodic assessment."
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export Report
                        </Button>
                        <Button>Contact Student</Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input 
                    id="studentName" 
                    value={studentName} 
                    onChange={(e) => setStudentName(e.target.value)} 
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID (Optional)</Label>
                  <Input 
                    id="studentId" 
                    value={studentId} 
                    onChange={(e) => setStudentId(e.target.value)} 
                    placeholder="Enter student ID"
                  />
                </div>
                <div>
                  <Label htmlFor="studentClass">Class/Section (Optional)</Label>
                  <Input 
                    id="studentClass" 
                    value={studentClass} 
                    onChange={(e) => setStudentClass(e.target.value)} 
                    placeholder="Enter class or section"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Ryff Scale Version</Label>
                <RadioGroup value={scaleVersion} onValueChange={setScaleVersion} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="42" id="r42" />
                    <Label htmlFor="r42">42 items</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="54" id="r54" />
                    <Label htmlFor="r54">54 items</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="84" id="r84" />
                    <Label htmlFor="r84">84 items</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="responses">Enter Responses (one per line, format: "1: 4" or just "4")</Label>
                <Textarea 
                  id="responses" 
                  value={manualResponses} 
                  onChange={(e) => setManualResponses(e.target.value)} 
                  placeholder="1: 4&#10;2: 5&#10;3: 3&#10;..."
                  className="min-h-[200px] font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Enter one response per line. Format can be "Question: Answer" or just the answer value (1-6).
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={parseManualResponses}>Calculate Scores</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Upload Response File</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload CSV or Excel files with assessment responses
                </p>
                <Button className="gap-2">
                  <FileUp className="h-4 w-4" />
                  Select File
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: .csv, .xlsx
                </p>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Coming Soon</AlertTitle>
                <AlertDescription>
                  File upload functionality is under development and will be available in a future update.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="bulk" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Bulk Score Processing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Process multiple assessments at once from a batch file
                </p>
                <Button className="gap-2">
                  <FileUp className="h-4 w-4" />
                  Upload Batch File
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Upload a CSV file with multiple student responses for batch processing
                </p>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Coming Soon</AlertTitle>
                <AlertDescription>
                  Bulk processing functionality is under development and will be available in a future update.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {successMessage && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {scoringResult && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Scoring Results</CardTitle>
                <CardDescription>
                  {studentName}{studentId ? ` (${studentId})` : ""}{studentClass ? ` - ${studentClass}` : ""}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {getRiskBadge(scoringResult.riskLevel)}
                <Badge variant="outline">{scaleVersion}-item scale</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div>
              <h3 className="text-lg font-medium mb-2">Overall Psychological Well-Being Score</h3>
              <div className="flex items-center gap-4">
                <Progress value={scoringResult.overallScore} className="h-4 flex-1" />
                <span className={`text-xl font-bold ${getScoreColor(scoringResult.overallScore)}`}>
                  {scoringResult.overallScore}
                </span>
              </div>
            </div>
            
            <Separator />
            
            {/* Dimension Scores */}
            <div>
              <h3 className="text-lg font-medium mb-4">Dimension Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dimensions.map((dimension) => {
                  const score = scoringResult.dimensions[dimension]
                  const isRiskDimension = scoringResult.riskDimensions.includes(dimension)
                  
                  return (
                    <div key={dimension} className={`p-4 rounded-lg ${isRiskDimension ? 'bg-red-50/50' : 'bg-muted/30'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{dimension}</h4>
                        <span className={`font-bold ${getScoreColor(score)}`}>{score}</span>
                      </div>
                      <Progress value={score} className={`h-2 ${isRiskDimension ? 'bg-red-100' : ''}`} />
                      {isRiskDimension && (
                        <p className="text-xs text-red-600 mt-2">
                          {score <= riskThresholds.high ? "High risk area" : "Potential concern"}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            
            <Separator />
            
            {/* Risk Assessment */}
            <div>
              <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
              <div className="p-4 rounded-lg bg-muted">
                <p className="mb-2">
                  <span className="font-medium">Risk Level:</span> {scoringResult.riskLevel.charAt(0).toUpperCase() + scoringResult.riskLevel.slice(1)}
                </p>
                {scoringResult.riskDimensions.length > 0 ? (
                  <>
                    <p className="font-medium mb-1">Areas of Concern:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {scoringResult.riskDimensions.map((dimension) => (
                        <li key={dimension} className="text-sm">
                          {dimension} ({scoringResult.dimensions[dimension]})
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-green-600">No significant risk areas detected</p>
                )}
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 flex items-start gap-3">
              <Brain className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">AI Recommendation</h4>
                <p className="text-sm text-blue-700">
                  {scoringResult.riskLevel === "high" ? (
                    "This student shows significant risk factors that may require immediate attention. Consider scheduling a one-on-one counseling session to address the identified concerns."
                  ) : scoringResult.riskLevel === "medium" ? (
                    "This student shows some potential areas of concern. Regular check-ins and targeted interventions for the identified dimensions may be beneficial."
                  ) : (
                    "This student appears to be maintaining good psychological well-being. Continue to provide general support and periodic assessment."
                  )}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Results
            </Button>
            <Button onClick={saveResults}>Save to Student Profile</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
} 