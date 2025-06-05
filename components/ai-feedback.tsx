"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MessageSquare, AlertCircle, User, Brain, Heart, Search, Filter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock data for at-risk students with AI feedback
const mockStudentFeedback = {
  "1": {
    id: "1",
    name: "John Doe",
    class: "BSIT3A",
    photo: "/avatars/student.png",
    assessment: {
      title: "Ryff PWB Assessment (42-item)",
      completedDate: "2024-06-08",
      dimensions: [
        { name: "Autonomy", score: 65 },
        { name: "Environmental Mastery", score: 70 },
        { name: "Personal Growth", score: 45 },
        { name: "Positive Relations", score: 68 },
        { name: "Purpose in Life", score: 42 },
        { name: "Self-Acceptance", score: 60 },
      ],
      overallScore: 58,
    },
    aiFeedback: [
      {
        id: "f1",
        text: "John's scores indicate potential concerns in the Personal Growth and Purpose in Life dimensions. These lower scores may suggest challenges in finding meaning and direction in life, as well as difficulty in developing new skills or feeling a sense of improvement over time.",
        type: "analysis",
      },
      {
        id: "f2",
        text: "I recommend focusing on helping John explore his interests and values to develop a stronger sense of purpose. Consider suggesting activities that promote skill development and personal challenges that can foster a sense of growth.",
        type: "recommendation",
      },
      {
        id: "f3",
        text: "John might benefit from reflective exercises that help him identify his strengths and areas where he'd like to develop. Goal-setting activities focused on incremental progress could also be beneficial.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    riskLevel: "medium",
    department: "Information Technology",
  },
  "2": {
    id: "2",
    name: "Jane Smith",
    class: "BSCS2B",
    photo: "/avatars/student.png",
    assessment: {
      title: "Ryff PWB Assessment (42-item)",
      completedDate: "2024-06-07",
      dimensions: [
        { name: "Autonomy", score: 72 },
        { name: "Environmental Mastery", score: 50 },
        { name: "Personal Growth", score: 63 },
        { name: "Positive Relations", score: 48 },
        { name: "Purpose in Life", score: 67 },
        { name: "Self-Acceptance", score: 45 },
      ],
      overallScore: 57,
    },
    aiFeedback: [
      {
        id: "f1",
        text: "Jane's assessment shows a significant decrease in her overall wellbeing score compared to her previous assessment (down from 75 to 57). The most notable drops are in Environmental Mastery and Self-Acceptance.",
        type: "analysis",
      },
      {
        id: "f2",
        text: "I recommend exploring recent changes in Jane's environment or life circumstances that might be affecting her sense of control. The drop in Self-Acceptance might indicate emerging self-criticism or negative self-perception.",
        type: "recommendation",
      },
      {
        id: "f3",
        text: "Consider cognitive-behavioral approaches to address negative self-talk and practical strategies to help Jane regain a sense of control in her environment. A follow-up assessment in 4-6 weeks would be beneficial to track progress.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    riskLevel: "medium",
    department: "Computer Science",
  },
  "3": {
    id: "3",
    name: "Mike Johnson",
    class: "BSIT4A",
    photo: "/avatars/student.png",
    assessment: {
      title: "Ryff PWB Assessment (42-item)",
      completedDate: "2024-06-05",
      dimensions: [
        { name: "Autonomy", score: 68 },
        { name: "Environmental Mastery", score: 72 },
        { name: "Personal Growth", score: 70 },
        { name: "Positive Relations", score: 65 },
        { name: "Purpose in Life", score: 75 },
        { name: "Self-Acceptance", score: 35 },
      ],
      overallScore: 64,
    },
    aiFeedback: [
      {
        id: "f1",
        text: "Mike's assessment shows a critically low score in the Self-Acceptance dimension, which is significantly out of alignment with his otherwise moderate to high scores in other areas.",
        type: "analysis",
      },
      {
        id: "f2",
        text: "This pattern suggests Mike may be experiencing specific issues related to self-image, self-worth, or self-criticism, despite functioning well in other areas of psychological wellbeing.",
        type: "recommendation",
      },
      {
        id: "f3",
        text: "I recommend prioritizing a one-on-one session with Mike to explore the factors contributing to his low self-acceptance. Consider compassion-focused techniques and strengths-based approaches to help improve his relationship with himself.",
        type: "suggestion",
      }
    ],
    counselorNotes: "Had an initial meeting with Mike on 6/7. He mentioned academic pressure and comparison with peers. Scheduled follow-up for 6/15.",
    riskLevel: "high",
    department: "Information Technology",
  },
  "4": {
    id: "4",
    name: "Sarah Williams",
    class: "BSCS3A",
    photo: "/avatars/student.png",
    assessment: {
      title: "Ryff PWB Assessment (42-item)",
      completedDate: "2024-06-04",
      dimensions: [
        { name: "Autonomy", score: 55 },
        { name: "Environmental Mastery", score: 60 },
        { name: "Personal Growth", score: 65 },
        { name: "Positive Relations", score: 40 },
        { name: "Purpose in Life", score: 58 },
        { name: "Self-Acceptance", score: 62 },
      ],
      overallScore: 56,
    },
    aiFeedback: [
      {
        id: "f1",
        text: "Sarah's assessment reveals a notable concern in the Positive Relations dimension, suggesting potential difficulties in forming and maintaining meaningful connections with others.",
        type: "analysis",
      },
      {
        id: "f2",
        text: "I recommend exploring Sarah's social support network and interpersonal relationships. The low score in Positive Relations may indicate feelings of isolation or challenges with trust and intimacy.",
        type: "recommendation",
      },
      {
        id: "f3",
        text: "Consider suggesting social skills development activities and opportunities for building supportive relationships. Group counseling or peer support programs might be particularly beneficial.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    riskLevel: "medium",
    department: "Computer Science",
  },
  "5": {
    id: "5",
    name: "David Lee",
    class: "BSIT2B",
    photo: "/avatars/student.png",
    assessment: {
      title: "Ryff PWB Assessment (42-item)",
      completedDate: "2024-06-03",
      dimensions: [
        { name: "Autonomy", score: 78 },
        { name: "Environmental Mastery", score: 75 },
        { name: "Personal Growth", score: 80 },
        { name: "Positive Relations", score: 76 },
        { name: "Purpose in Life", score: 82 },
        { name: "Self-Acceptance", score: 79 },
      ],
      overallScore: 78,
    },
    aiFeedback: [
      {
        id: "f1",
        text: "David's assessment shows consistently high scores across all dimensions, indicating strong psychological well-being overall.",
        type: "analysis",
      },
      {
        id: "f2",
        text: "While no immediate concerns are evident, it's worth noting that sometimes high achievers may put pressure on themselves to maintain high standards, which could lead to stress over time.",
        type: "recommendation",
      },
      {
        id: "f3",
        text: "Consider checking in periodically to ensure David maintains a healthy balance and has strategies to manage academic and personal expectations.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    riskLevel: "low",
    department: "Information Technology",
  }
}

interface AIFeedbackProps {
  studentId?: string;
  onBack?: () => void;
}

export function AIFeedback({ studentId, onBack }: AIFeedbackProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | undefined>(studentId)
  const [counselorNotes, setCounselorNotes] = useState("")
  const [feedbackToSend, setFeedbackToSend] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [riskLevelFilter, setRiskLevelFilter] = useState("all")
  
  // Convert object to array for filtering
  const studentsArray = Object.values(mockStudentFeedback)
  
  // Apply filters
  const filteredStudents = studentsArray.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    const matchesRiskLevel = riskLevelFilter === "all" || student.riskLevel === riskLevelFilter
    
    return matchesSearch && matchesDepartment && matchesRiskLevel
  })
  
  // Get the current student data based on selectedStudent
  const currentStudent = selectedStudent ? mockStudentFeedback[selectedStudent as keyof typeof mockStudentFeedback] : undefined
  
  // Update counselor notes when student changes
  useEffect(() => {
    if (currentStudent) {
      setCounselorNotes(currentStudent.counselorNotes)
    }
  }, [currentStudent])
  
  const handleSaveNotes = () => {
    // In a real application, this would save to a database
    if (currentStudent) {
      // Here we're just updating our mock data
      mockStudentFeedback[currentStudent.id as keyof typeof mockStudentFeedback].counselorNotes = counselorNotes
      alert("Notes saved successfully")
    }
  }
  
  const handleSendFeedback = () => {
    if (feedbackToSend.trim()) {
      // In a real application, this would send the feedback to the student
      alert(`Feedback sent to ${currentStudent?.name}`)
      setFeedbackToSend("")
    }
  }

  const getScoreColor = (score: number) => {
    if (score < 50) return "text-destructive"
    if (score < 70) return "text-yellow-600"
    return "text-green-600"
  }

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

  const handleSelectStudent = (id: string) => {
    setSelectedStudent(id)
  }

  // If no student is selected and we have a list of students, show the student list
  if (!currentStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">AI Feedback Review</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Student AI Feedback</CardTitle>
            <CardDescription>
              Review AI-generated feedback for students who have completed assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskLevelFilter} onValueChange={setRiskLevelFilter}>
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
            </div>
            
            {/* Student List */}
            {filteredStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className={cn(
                    "cursor-pointer hover:border-primary transition-colors",
                    student.riskLevel === "high" && "border-destructive/50",
                    student.riskLevel === "medium" && "border-yellow-500/50"
                  )}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.photo} alt={student.name} />
                            <AvatarFallback>
                              <User className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{student.name}</CardTitle>
                            <CardDescription>{student.class}</CardDescription>
                          </div>
                        </div>
                        {getRiskBadge(student.riskLevel)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Department:</span>
                          <span>{student.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assessment:</span>
                          <span>{student.assessment.completedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Overall Score:</span>
                          <span className={getScoreColor(student.assessment.overallScore)}>
                            {student.assessment.overallScore}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="secondary" 
                        className="w-full" 
                        onClick={() => handleSelectStudent(student.id)}
                      >
                        View Feedback
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Students Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(undefined)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">AI Feedback Review</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={currentStudent.photo} alt={currentStudent.name} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{currentStudent.name}</h3>
            <p className="text-muted-foreground">{currentStudent.class}</p>
            <div className="mt-2">
              {getRiskBadge(currentStudent.riskLevel)}
            </div>
            
            <Separator className="my-4" />
            
            <div className="w-full">
              <h4 className="font-semibold mb-2">Assessment Results</h4>
              <p className="text-sm text-muted-foreground mb-2">{currentStudent.assessment.title}</p>
              <p className="text-sm text-muted-foreground mb-4">Completed: {currentStudent.assessment.completedDate}</p>
              
              <div className="space-y-2">
                {currentStudent.assessment.dimensions.map((dim) => (
                  <div key={dim.name} className="flex justify-between items-center">
                    <span className="text-sm">{dim.name}</span>
                    <span className={`font-semibold ${getScoreColor(dim.score)}`}>{dim.score}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Overall</span>
                  <span className={`font-semibold ${getScoreColor(currentStudent.assessment.overallScore)}`}>
                    {currentStudent.assessment.overallScore}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Feedback Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Feedback Analysis
            </CardTitle>
            <CardDescription>
              Review the AI-generated feedback before sharing with the student
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStudent.aiFeedback.map((feedback) => (
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
                value={counselorNotes} 
                onChange={(e) => setCounselorNotes(e.target.value)} 
                placeholder="Add your notes about this student here..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 border-t pt-4">
            <h4 className="font-semibold">Send Feedback to Student</h4>
            <div className="flex gap-2">
              <Textarea 
                value={feedbackToSend} 
                onChange={(e) => setFeedbackToSend(e.target.value)} 
                placeholder="Write your feedback to send to the student..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSendFeedback} className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send to Student
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 