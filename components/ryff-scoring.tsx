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
import { AlertCircle, Calculator, Download, FileUp, Upload, Check, Info, Brain, Search, Filter, Eye, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"

// Ryff Scale dimensions
const dimensions = [
  "Autonomy",
  "Environmental Mastery",
  "Personal Growth",
  "Positive Relations",
  "Purpose in Life",
  "Self-Acceptance"
] as const;

// Type for dimension names
type DimensionName = typeof dimensions[number];

// Ryff Scale item mapping by dimension (for 42-item version)
const dimensionItems42: Record<DimensionName, number[]> = {
  "Autonomy": [1, 7, 13, 19, 25, 31, 37],
  "Environmental Mastery": [2, 8, 14, 20, 26, 32, 38],
  "Personal Growth": [3, 9, 15, 21, 27, 33, 39],
  "Positive Relations": [4, 10, 16, 22, 28, 34, 40],
  "Purpose in Life": [5, 11, 17, 23, 29, 35, 41],
  "Self-Acceptance": [6, 12, 18, 24, 30, 36, 42]
}

// Ryff Scale item mapping by dimension (for 54-item version)
const dimensionItems54: Record<DimensionName, number[]> = {
  "Autonomy": [1, 7, 13, 19, 25, 31, 37, 43, 49],
  "Environmental Mastery": [2, 8, 14, 20, 26, 32, 38, 44, 50],
  "Personal Growth": [3, 9, 15, 21, 27, 33, 39, 45, 51],
  "Positive Relations": [4, 10, 16, 22, 28, 34, 40, 46, 52],
  "Purpose in Life": [5, 11, 17, 23, 29, 35, 41, 47, 53],
  "Self-Acceptance": [6, 12, 18, 24, 30, 36, 42, 48, 54]
}

// Ryff Scale item mapping by dimension (for 84-item version)
const dimensionItems84: Record<DimensionName, number[]> = {
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
    [key in DimensionName]: number;
  };
  overallScore: number;
  riskLevel: string;
  riskDimensions: DimensionName[];
}

// Mock data for automatically scored assessments
const mockScoredAssessments = [
  {
    id: "1",
    studentName: "John Doe",
    studentId: "ST12345",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 58,
    riskLevel: "medium",
    riskDimensions: ["Personal Growth", "Purpose in Life"] as DimensionName[]
  },
  {
    id: "2",
    studentName: "Jane Smith",
    studentId: "ST12346",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 57,
    riskLevel: "medium",
    riskDimensions: ["Environmental Mastery", "Positive Relations", "Self-Acceptance"] as DimensionName[]
  },
  {
    id: "3",
    studentName: "Mike Johnson",
    studentId: "ST12347",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 64,
    riskLevel: "high",
    riskDimensions: ["Self-Acceptance"] as DimensionName[]
  },
  {
    id: "4",
    studentName: "Sarah Williams",
    studentId: "ST12348",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 56,
    riskLevel: "high",
    riskDimensions: ["Positive Relations"] as DimensionName[]
  },
  {
    id: "5",
    studentName: "David Lee",
    studentId: "ST12349",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 78,
    riskLevel: "low",
    riskDimensions: [] as DimensionName[]
  },
  {
    id: "6",
    studentName: "Emily Chen",
    studentId: "ST12350",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 71,
    riskLevel: "low",
    riskDimensions: [] as DimensionName[]
  },
  {
    id: "7",
    studentName: "Robert Brown",
    studentId: "ST12351",
    department: "COE",
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
    } as { [key in DimensionName]: number },
    overallScore: 58,
    riskLevel: "medium",
    riskDimensions: ["Purpose in Life", "Self-Acceptance"] as DimensionName[]
  },
  {
    id: "8",
    studentName: "Lisa Rodriguez",
    studentId: "ST12352",
    department: "COE",
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
    } as { [key in DimensionName]: number },
    overallScore: 80,
    riskLevel: "low",
    riskDimensions: [] as DimensionName[]
  },
  {
    id: "9",
    studentName: "Kevin Wong",
    studentId: "ST12353",
    department: "CCS",
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
    } as { [key in DimensionName]: number },
    overallScore: 50,
    riskLevel: "high",
    riskDimensions: ["Personal Growth", "Purpose in Life", "Self-Acceptance"] as DimensionName[]
  },
  {
    id: "10",
    studentName: "Jessica Martin",
    studentId: "ST12354",
    department: "CN",
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
    } as { [key in DimensionName]: number },
    overallScore: 68,
    riskLevel: "medium",
    riskDimensions: [] as DimensionName[]
  },
  {
    id: "11",
    studentName: "Alex Thompson",
    studentId: "ST12355",
    department: "CBA",
    section: "BSBA3A",
    submissionDate: "2024-06-02",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 66,
      "Environmental Mastery": 63,
      "Personal Growth": 69,
      "Positive Relations": 67,
      "Purpose in Life": 70,
      "Self-Acceptance": 55
    } as { [key in DimensionName]: number },
    overallScore: 65,
    riskLevel: "medium",
    riskDimensions: ["Self-Acceptance"] as DimensionName[]
  },
  {
    id: "12",
    studentName: "Sophia Garcia",
    studentId: "ST12356",
    department: "CAS",
    section: "BSPS2B",
    submissionDate: "2024-06-03",
    scaleVersion: "42",
    dimensions: {
      "Autonomy": 70,
      "Environmental Mastery": 62,
      "Personal Growth": 74,
      "Positive Relations": 69,
      "Purpose in Life": 65,
      "Self-Acceptance": 62
    } as { [key in DimensionName]: number },
    overallScore: 67,
    riskLevel: "medium",
    riskDimensions: [] as DimensionName[]
  }
];

// First, update the RyffScoring component props to accept the onNavigate function
interface RyffScoringProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export function RyffScoring({ onNavigate }: RyffScoringProps) {
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
  const [viewMode, setViewMode] = useState<"student" | "department">("student")
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'ascending' | 'descending'}>({
    key: 'submissionDate',
    direction: 'descending'
  })
  
  // Check localStorage for department filter on component mount
  useEffect(() => {
    const savedDepartment = localStorage.getItem("selectedDepartmentFilter");
    if (savedDepartment) {
      setDepartmentFilter(savedDepartment);
      // Clear the localStorage item to prevent it from being applied on future visits
      localStorage.removeItem("selectedDepartmentFilter");
    }
  }, []);
  
  // Extract unique departments and sections from mock data
  const departments = Array.from(new Set(mockScoredAssessments.map(a => a.department)))
  
  // Get all sections and sections filtered by department
  const allSections = Array.from(new Set(mockScoredAssessments.map(a => a.section)))
  const filteredSections = departmentFilter === "all" 
    ? allSections 
    : Array.from(new Set(mockScoredAssessments
        .filter(a => a.department === departmentFilter)
        .map(a => a.section)))
  
  // Handle department filter change
  const handleDepartmentChange = (value: string) => {
    setDepartmentFilter(value)
    // Reset section filter when department changes
    setSectionFilter("all")
  }
  
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
    // When risk filter is "all", prioritize sorting by risk level (high, medium, low)
    if (riskFilter === "all") {
      // Define risk level priority: high (3), medium (2), low (1)
      const getRiskPriority = (risk: string): number => {
        if (risk === "high") return 3;
        if (risk === "medium") return 2;
        return 1; // low risk
      }
      
      const riskCompare = getRiskPriority(b.riskLevel) - getRiskPriority(a.riskLevel);
      if (riskCompare !== 0) return riskCompare;
    }
    
    // If risk levels are the same or a specific risk level is selected, use the normal sorting
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
    const dimensionScores = {} as { [key in DimensionName]: number }
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
  const sectionData = allSections.map(sect => {
    const sectAssessments = mockScoredAssessments.filter(a => a.section === sect)
    const totalScore = sectAssessments.reduce((sum, a) => sum + a.overallScore, 0)
    const avgScore = Math.round(totalScore / sectAssessments.length)
    
    // Get department
    const department = sectAssessments[0]?.department || ""
    
    // Calculate dimension averages
    const dimensionScores = {} as { [key in DimensionName]: number }
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
    const dimensionScores = {} as { [key in DimensionName]: number }
    let totalScore = 0
    let totalItems = 0
    
    for (const dimension of dimensions) {
      const items = dimensionItems[dimension]
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
    const riskDimensions: DimensionName[] = []
    
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
      setScoringResult(result as ScoringResult)
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

  // Add this function to generate AI recommendations based on assessment data
  const generateAIRecommendations = (assessment: any) => {
    // In a real implementation, this would call an AI service
    // For now, we'll use conditional logic based on the risk dimensions
    
    const recommendations = [];
    
    // Base recommendations on risk dimensions
    if (assessment.riskDimensions.includes("Self-Acceptance")) {
      recommendations.push({
        title: "Self-Acceptance",
        description: "Consider self-compassion exercises and positive affirmation techniques. Recommend journaling about personal strengths and achievements.",
        resources: ["Self-Compassion Workbook", "Positive Psychology Interventions"]
      });
    }
    
    if (assessment.riskDimensions.includes("Personal Growth")) {
      recommendations.push({
        title: "Personal Growth",
        description: "Focus on goal-setting exercises and skill development opportunities. Encourage exploration of new interests and learning experiences.",
        resources: ["Growth Mindset Workshop", "Personal Development Plan Template"]
      });
    }
    
    if (assessment.riskDimensions.includes("Purpose in Life")) {
      recommendations.push({
        title: "Purpose in Life",
        description: "Explore values clarification exercises and meaning-making activities. Consider volunteering or community engagement opportunities.",
        resources: ["Values Assessment Tool", "Finding Meaning Workshop"]
      });
    }
    
    if (assessment.riskDimensions.includes("Positive Relations")) {
      recommendations.push({
        title: "Positive Relations",
        description: "Practice active listening and communication skills. Consider social skills training and relationship-building activities.",
        resources: ["Communication Skills Workshop", "Building Healthy Relationships Guide"]
      });
    }
    
    if (assessment.riskDimensions.includes("Environmental Mastery")) {
      recommendations.push({
        title: "Environmental Mastery",
        description: "Work on time management and organizational skills. Focus on creating structured routines and managing daily responsibilities.",
        resources: ["Time Management Techniques", "Environmental Organization Strategies"]
      });
    }
    
    if (assessment.riskDimensions.includes("Autonomy")) {
      recommendations.push({
        title: "Autonomy",
        description: "Practice assertiveness training and decision-making skills. Encourage independent thinking and personal boundary setting.",
        resources: ["Assertiveness Training Guide", "Decision-Making Framework"]
      });
    }
    
    // Add general recommendation if no specific risk dimensions or overall score is low
    if (recommendations.length === 0 || assessment.overallScore < 60) {
      recommendations.push({
        title: "General Well-being",
        description: "Focus on holistic well-being practices including regular physical activity, mindfulness, and stress management techniques.",
        resources: ["Comprehensive Well-being Guide", "Stress Management Toolkit"]
      });
    }
    
    return recommendations;
  };

  // Add this function to navigate to AI Feedback with department filter
  const handleViewAIFeedback = (department: string, studentId?: string) => {
    if (onNavigate) {
      // Make sure to pass the studentId parameter to ensure we go directly to student details
      if (studentId) {
        onNavigate("ai-feedback", { 
          department, 
          studentId // Always include studentId when available
        });
      } else {
        onNavigate("ai-feedback", { department });
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Ryff Scale Automated Scoring
          </CardTitle>
          <CardDescription>
            View automatically scored assessments and monitor student well-being
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="automatic" className="space-y-4">
            <TabsContent value="automatic" className="space-y-4">
              {/* View Mode Selector */}
              <div className="flex justify-between items-center">
                <div>
                  <RadioGroup 
                    value={viewMode} 
                    onValueChange={(value) => setViewMode(value as "student" | "department")}
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
                        <Select value={departmentFilter} onValueChange={handleDepartmentChange}>
                          <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                            {!departments.includes("CBA") && <SelectItem value="CBA">CBA</SelectItem>}
                            {!departments.includes("CAS") && <SelectItem value="CAS">CAS</SelectItem>}
                          </SelectContent>
                        </Select>
                        
                        <Select value={sectionFilter} onValueChange={setSectionFilter}>
                          <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sections</SelectItem>
                            {filteredSections.map(sect => (
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
                  
                  {/* Department view - Enhanced version */}
                  {viewMode === "department" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {departmentData.map((dept) => (
                          <Card key={dept.department} className="overflow-hidden">
                            <CardHeader className="pb-2 bg-muted/20">
                              <CardTitle className="text-lg">{dept.department}</CardTitle>
                              <CardDescription>
                                {dept.studentCount} students assessed
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium">Overall Well-being Score</span>
                                  <span className={`text-lg font-bold ${getScoreColor(dept.overallScore)}`}>{dept.overallScore}</span>
                                </div>
                                <Progress value={dept.overallScore} className="h-3" />
                              </div>
                              
                              <div className="border rounded-md p-3 bg-muted/10">
                                <h4 className="text-sm font-medium mb-2">Risk Assessment</h4>
                                <div className="flex justify-between text-sm">
                                  <div className="flex flex-col items-center">
                                    <Badge variant="destructive" className="mb-2">
                                      {dept.highRisk}
                                    </Badge>
                                    <span className="text-xs">High Risk</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <Badge variant="secondary" className="mb-2">
                                      {dept.mediumRisk}
                                    </Badge>
                                    <span className="text-xs">Medium</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <Badge variant="outline" className="mb-2">
                                      {dept.lowRisk}
                                    </Badge>
                                    <span className="text-xs">Low</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Dimension Analysis</h4>
                                <div className="space-y-2">
                                  {dimensions.map(dim => {
                                    const score = dept.dimensions[dim];
                                    const isRisk = score <= riskThresholds.medium;
                                    
                                    return (
                                      <div key={dim} className="text-sm">
                                        <div className="flex justify-between mb-1">
                                          <span>{dim}</span>
                                          <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                                        </div>
                                        <div className="relative h-1.5">
                                          <div className="absolute inset-0 bg-muted rounded-full"></div>
                                          <div 
                                            className={`absolute inset-y-0 left-0 rounded-full ${
                                              score <= riskThresholds.high 
                                                ? 'bg-destructive' 
                                                : score <= riskThresholds.medium 
                                                  ? 'bg-yellow-500' 
                                                  : 'bg-green-500'
                                            }`}
                                            style={{ width: `${score}%` }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Department Comparison</CardTitle>
                          <CardDescription>Compare overall well-being scores across departments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {departmentData
                              .sort((a, b) => b.overallScore - a.overallScore)
                              .map((dept) => (
                                <div key={`chart-${dept.department}`} className="flex items-center gap-2">
                                  <div className="w-32 truncate font-medium">
                                    {dept.department}
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-6 bg-muted rounded-full overflow-hidden relative">
                                      <div
                                        className={`absolute inset-y-0 left-0 ${
                                          dept.overallScore <= riskThresholds.high 
                                            ? 'bg-destructive' 
                                            : dept.overallScore <= riskThresholds.medium 
                                              ? 'bg-yellow-500' 
                                              : 'bg-green-500'
                                        }`}
                                        style={{ width: `${dept.overallScore}%` }}
                                      />
                                      <div className="absolute inset-0 flex items-center justify-end pr-2">
                                        <span className="text-sm font-medium">{dept.overallScore}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
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
                                <Progress value={score} className={`h-2 ${
                                  score <= riskThresholds.high 
                                    ? 'bg-destructive' 
                                    : score <= riskThresholds.medium 
                                      ? 'bg-yellow-500' 
                                      : 'bg-green-500'
                                }`} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* AI Recommendations Section */}
                      <div>
                        <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Brain className="h-5 w-5 text-blue-500" />
                          AI Recommendations
                        </h4>
                        
                        <div className="space-y-4">
                          {generateAIRecommendations(currentAssessment).map((recommendation, index) => (
                            <Card key={index} className="border-l-4 border-l-blue-500">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{recommendation.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 pt-0">
                                <p className="text-sm">{recommendation.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <span className="text-xs font-medium text-muted-foreground">Recommended Resources:</span>
                                  {recommendation.resources.map((resource, i) => (
                                    <Badge key={i} variant="outline" className="bg-blue-50">
                                      {resource}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleViewAIFeedback(currentAssessment.department, currentAssessment.studentId)}
                            >
                              <Brain className="h-4 w-4" />
                              View Student AI Insights
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <MessageSquare className="h-4 w-4" />
                              Request Detailed AI Analysis
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Student Name</Label>
                      <Input 
                        id="studentName" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter student name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input 
                        id="studentId" 
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentClass">Class/Section</Label>
                      <Input 
                        id="studentClass" 
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scaleVersion">Scale Version</Label>
                      <Select value={scaleVersion} onValueChange={setScaleVersion}>
                        <SelectTrigger id="scaleVersion">
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="42">42-item</SelectItem>
                          <SelectItem value="54">54-item</SelectItem>
                          <SelectItem value="84">84-item</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="responses">Responses (1-6 for each item)</Label>
                    <Textarea 
                      id="responses" 
                      value={manualResponses}
                      onChange={(e) => setManualResponses(e.target.value)}
                      placeholder="Enter responses, one per line (e.g., '1: 4' or just '4')"
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <Button onClick={parseManualResponses} className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Scores
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {successMessage && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <Check className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  {scoringResult && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Scoring Results</CardTitle>
                        <CardDescription>
                          {studentName}'s psychological well-being assessment
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">Overall Score</span>
                            <span className={`text-xl font-bold ${getScoreColor(scoringResult.overallScore)}`}>
                              {scoringResult.overallScore}
                            </span>
                          </div>
                          <Progress 
                            value={scoringResult.overallScore} 
                            className="h-3"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Risk Level:</span>
                          {getRiskBadge(scoringResult.riskLevel)}
                        </div>
                        
                        {scoringResult.riskDimensions.length > 0 && (
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Risk Dimensions</AlertTitle>
                            <AlertDescription>
                              The following dimensions may require attention:
                              <div className="flex flex-wrap gap-2 mt-2">
                                {scoringResult.riskDimensions.map(dim => (
                                  <Badge key={dim} variant="outline">{dim}</Badge>
                                ))}
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-3">Dimension Scores</h4>
                          <div className="space-y-3">
                            {dimensions.map(dimension => {
                              const score = scoringResult.dimensions[dimension]
                              return (
                                <div key={dimension}>
                                  <div className="flex justify-between items-center mb-1">
                                    <span>{dimension}</span>
                                    <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                                  </div>
                                  <Progress 
                                    value={score} 
                                    className={`h-2 ${
                                      score <= riskThresholds.high 
                                        ? 'bg-destructive' 
                                        : score <= riskThresholds.medium 
                                          ? 'bg-yellow-500' 
                                          : 'bg-green-500'
                                    }`}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={saveResults} className="w-full">
                          <Check className="mr-2 h-4 w-4" />
                          Save to Student Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}