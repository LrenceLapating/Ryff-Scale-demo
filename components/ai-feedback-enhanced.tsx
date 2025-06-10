"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MessageSquare, AlertCircle, User, Brain, Heart, Search, Filter, BarChart, PieChart, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { DimensionAnalysis } from "@/components/dimension-analysis"

// Type definitions for dimension names
type DimensionName = "Autonomy" | "Environmental Mastery" | "Personal Growth" | "Positive Relations" | "Purpose in Life" | "Self-Acceptance";

// Interface for dimension analysis
interface DimensionAnalysis {
  interpretation: string;
  intervention: string;
}

// Interface for department feedback
interface DepartmentFeedback {
  id: string;
  name: string;
  studentCount: number;
  assessmentsTaken: number;
  completionRate: number;
  assessmentDate: string;
  averageScores: {
    overall: number;
    dimensions: Array<{
      name: DimensionName;
      score: number;
    }>;
  };
  dimensionDistributions: Record<DimensionName, number[]>;
  dimensionRecommendations: Record<DimensionName, string>;
  riskDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  aiFeedback: Array<{
    id: string;
    text: string;
    type: string;
  }>;
  counselorNotes: string;
  yearLevelInsights: string;
  trendInsights: string;
}

// Interface for student data
interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  risk: string;
  lastAssessment: string;
  counselorNotes: string;
  aiFeedback: Array<{
    id: string;
    text: string;
    type: string;
  }>;
  assessment: {
    overall: number;
    dimensions: Array<{
      name: DimensionName;
      score: number;
    }>;
  };
  dimensionAnalysis: Record<DimensionName, DimensionAnalysis>;
}

// Props for AIFeedback component
interface AIFeedbackProps {
  studentId?: string;
  onBack?: () => void;
}

// Sample department data for demonstration
const departmentData: DepartmentFeedback[] = [
  // Department data would be here
];

// Sample at-risk students data
const atRiskStudents: Student[] = [
  // Student data would be here
];

export function AIFeedback({ studentId, onBack }: AIFeedbackProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
  const [selectedView, setSelectedView] = useState<"departments" | "atRiskStudents" | "student">("departments")
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(studentId)
  const [counselorNotes, setCounselorNotes] = useState("")
  const [feedbackToSend, setFeedbackToSend] = useState("")

  // Set initial state based on props
  useEffect(() => {
    if (studentId) {
      setSelectedView("student")
      setSelectedStudentId(studentId)
    }
  }, [studentId])

  // Get current department based on selection
  const currentDepartment = useMemo(() => {
    return departmentData.find(dept => dept.id === selectedDepartment)
  }, [selectedDepartment])

  // Get current student based on selection
  const selectedStudent = useMemo(() => {
    return atRiskStudents.find(student => student.id === selectedStudentId) || atRiskStudents[0]
  }, [selectedStudentId])

  // Handler for saving notes
  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    alert("Notes saved successfully!")
  }

  // Handler for sending feedback
  const handleSendFeedback = () => {
    // In a real app, this would send feedback to department heads
    alert("Feedback sent to department heads!")
    setFeedbackToSend("")
  }

  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score < 50) return "text-destructive"
    if (score < 70) return "text-yellow-600"
    return "text-green-600"
  }

  // Helper function to get risk badge
  const getRiskBadge = (department: any) => {
    const riskRatio = department.riskDistribution.high / department.studentCount
    if (riskRatio > 0.2) {
      return <Badge variant="destructive">High Risk</Badge>
    } else if (riskRatio > 0.1) {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Medium Risk</Badge>
    } else {
      return <Badge variant="outline" className="text-green-600 border-green-600">Low Risk</Badge>
    }
  }

  // Helper function to get student risk badge
  const getStudentRiskBadge = (risk: string) => {
    if (risk === "high") {
      return <Badge variant="destructive">High Risk</Badge>
    } else if (risk === "medium") {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Medium Risk</Badge>
    } else {
      return <Badge variant="outline" className="text-green-600 border-green-600">Low Risk</Badge>
    }
  }

  // Handler for selecting department
  const handleSelectDepartment = (id: string) => {
    setSelectedDepartment(id)
    setCounselorNotes(departmentData.find(dept => dept.id === id)?.counselorNotes || "")
  }

  // Handler for selecting at-risk student
  const handleSelectRiskStudent = (id: string) => {
    setSelectedStudentId(id)
    setSelectedView("student")
  }

  // Handler for viewing at-risk students
  const handleViewAtRiskStudents = () => {
    setSelectedView("atRiskStudents")
  }

  // Handler for going back to department view
  const handleBackToDepartment = () => {
    setSelectedView("departments")
  }

  // Handler for going back to departments list
  const handleBackToDepartments = () => {
    setSelectedView("departments")
    setSelectedDepartment(undefined)
  }

  // Handler for going back to student list
  const handleBackToStudentList = () => {
    setSelectedView("atRiskStudents")
  }

  // Render student view
  if (selectedView === "student") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBackToStudentList}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Student AI Feedback</h1>
          <div className="ml-auto">
            {getStudentRiskBadge(selectedStudent.risk)}
          </div>
        </div>
        
        {/* Student Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://avatar.vercel.sh/${selectedStudent.id}`} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                <p className="text-muted-foreground">{selectedStudent.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{selectedStudent.department}</Badge>
                  <Badge variant="outline">Year {selectedStudent.year}</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Assessment</span>
                  <span className="text-sm font-medium">{selectedStudent.lastAssessment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <span className={`text-sm font-medium ${getScoreColor(selectedStudent.assessment.overall)}`}>
                    {selectedStudent.assessment.overall}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-semibold">Dimension Scores</h4>
                {selectedStudent.assessment.dimensions.map((dimension) => (
                  <div key={dimension.name} className="flex justify-between">
                    <span className="text-sm">{dimension.name}</span>
                    <span className={`text-sm font-medium ${getScoreColor(dimension.score)}`}>
                      {dimension.score}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Feedback Analysis
              </CardTitle>
              <CardDescription>
                Review the AI-generated feedback for this student
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedStudent.aiFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={feedback.type === "analysis" ? "outline" : feedback.type === "recommendation" ? "secondary" : "default"}>
                      {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                    </Badge>
                  </div>
                  <p>{feedback.text}</p>
                </div>
              ))}
              
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Counselor Notes</h4>
                <Textarea 
                  value={selectedStudent.counselorNotes} 
                  placeholder="Add your notes about this student here..."
                  className="min-h-[100px]"
                  readOnly
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Dimension Analysis Section - Enhanced with clickable dimensions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Dimension Analysis</CardTitle>
            <CardDescription>
              Click on any dimension to view detailed analysis with questions, responses, and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DimensionAnalysis />
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleBackToStudentList}>
            Back to At-Risk Students
          </Button>
        </div>
      </div>
    );
  }

  // Main department view
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBackToDepartments}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">AI Feedback Review</h1>
      </div>

      {/* At-Risk Students Button Card - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewAtRiskStudents}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white rounded-full">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                At-Risk Students
                <Badge className="ml-2">{atRiskStudents.length}</Badge>
              </h3>
              <p className="text-sm text-muted-foreground">View students who require immediate attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dimension Analysis */}
      <div>
        <h2 className="text-xl font-bold mb-4">Dimension Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentDepartment?.averageScores.dimensions.map((dimension) => (
            <DimensionDistributionGraph 
              key={dimension.name}
              data={currentDepartment.dimensionDistributions[dimension.name]}
              dimensionName={dimension.name}
              recommendation={currentDepartment.dimensionRecommendations[dimension.name]}
            />
          ))}
        </div>
      </div>

      {/* Department Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            {/* Department Info */}
            <div className="flex flex-col items-center text-center md:w-1/4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{currentDepartment?.name}</h3>
              <p className="text-muted-foreground">{currentDepartment?.studentCount} students</p>
              <div className="mt-2">
                {currentDepartment && getRiskBadge(currentDepartment)}
              </div>
            </div>
            
            <div className="md:w-2/4">
              <h4 className="font-semibold mb-2">Assessment Overview</h4>
              <p className="text-sm text-muted-foreground mb-2">{currentDepartment?.assessmentDate}</p>
              <p className="text-sm text-muted-foreground mb-4">Completion Rate: {currentDepartment?.completionRate}%</p>
              
              <div className="space-y-2">
                {currentDepartment?.averageScores.dimensions.map((dim) => (
                  <div key={dim.name} className="flex justify-between items-center">
                    <span className="text-sm">{dim.name}</span>
                    <span className={`font-semibold ${getScoreColor(dim.score)}`}>{dim.score}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Overall</span>
                  <span className={`font-semibold ${getScoreColor(currentDepartment?.averageScores.overall || 0)}`}>
                    {currentDepartment?.averageScores.overall}
                  </span>
                </div>
              </div>
              
              <div className="text-sm space-y-2 mt-4">
                <h4 className="font-semibold mb-1">Key Insights</h4>
                <div className="p-2 bg-muted/30 rounded text-left">
                  <p className="text-xs text-muted-foreground mb-1">Year Level Analysis:</p>
                  <p className="text-xs">{currentDepartment?.yearLevelInsights}</p>
                </div>
                <div className="p-2 bg-muted/30 rounded text-left">
                  <p className="text-xs text-muted-foreground mb-1">Trend Analysis:</p>
                  <p className="text-xs">{currentDepartment?.trendInsights}</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="font-semibold mb-2">Risk Distribution</h4>
              <div className="grid grid-cols-1 gap-2 mb-4">
                <div className="bg-red-50 p-2 rounded">
                  <div className="text-lg font-semibold text-destructive">{currentDepartment?.riskDistribution.high}</div>
                  <div className="text-xs text-muted-foreground">High Risk</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="text-lg font-semibold text-yellow-600">{currentDepartment?.riskDistribution.medium}</div>
                  <div className="text-xs text-muted-foreground">Medium Risk</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-lg font-semibold text-green-600">{currentDepartment?.riskDistribution.low}</div>
                  <div className="text-xs text-muted-foreground">Low Risk</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Department Notes</h4>
                <Textarea 
                  value={counselorNotes} 
                  onChange={(e) => setCounselorNotes(e.target.value)} 
                  placeholder="Add your notes about this department here..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Send Feedback to Department Heads</h4>
                <Textarea 
                  value={feedbackToSend} 
                  onChange={(e) => setFeedbackToSend(e.target.value)} 
                  placeholder="Write your feedback to send to department heads..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={handleSendFeedback} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send to Department
                  </Button>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Helper function to render the dimension distribution graph
function DimensionDistributionGraph({ data, dimensionName, recommendation }: { 
  data: number[], 
  dimensionName: string,
  recommendation: string
}) {
  // Define the response labels
  const responseLabels = ["Strongly Disagree", "Disagree", "Slightly Disagree", "Slightly Agree", "Agree", "Strongly Agree"];
  
  // Calculate the max value for proper scaling
  const maxValue = Math.max(...data);
  
  // Calculate total responses
  const totalResponses = data.reduce((sum, value) => sum + value, 0);
  
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg">{dimensionName}</h3>
      
      {/* Graph */}
      <div className="space-y-2">
        {data.map((value, index) => {
          const percentage = Math.round((value / totalResponses) * 100);
          
          // Determine bar color based on response type
          let barColor = "bg-gray-200";
          if (index < 2) {
            barColor = "bg-red-200";
          } else if (index < 4) {
            barColor = "bg-yellow-200";
          } else {
            barColor = "bg-green-200";
          }
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{responseLabels[index]}</span>
                <span>{value} responses ({percentage}%)</span>
              </div>
              <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${barColor} rounded-full`} 
                  style={{ width: `${(value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* AI Recommendation */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-2">
          <Brain className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">AI Recommendation</h4>
            <p className="text-sm text-blue-700">{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 