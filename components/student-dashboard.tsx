"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, ChevronRight, ArrowLeft, User, School, BookOpen, GraduationCap, Bell, X, Heart, Brain, Coffee, Moon, Smile, AlertCircle, MessageSquare, LogOut, BarChart, Edit } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "New Assessment Available",
    description: "Ryff PWB Assessment (42-item) is now available for completion.",
    date: "2023-11-10",
    read: false,
    type: "assessment"
  },
  {
    id: "2",
    title: "Appointment Confirmed",
    description: "Your appointment with Dr. Sarah Johnson has been confirmed for Nov 18 at 10:30 AM.",
    date: "2023-11-08",
    read: true,
    type: "appointment"
  },
  {
    id: "3",
    title: "New Message",
    description: "You have a new message from Dr. Sarah Johnson.",
    date: "2023-11-07",
    read: false,
    type: "message"
  },
  {
    id: "4",
    title: "Assessment Reminder",
    description: "Academic Stress Assessment is due in 10 days.",
    date: "2023-11-05",
    read: true,
    type: "reminder"
  }
];

// Mock wellness tracking data
const mockWellnessData = [
  { date: "Nov 1", sleep: 7, stress: 4, mood: 3, energy: 4 },
  { date: "Nov 2", sleep: 6, stress: 5, mood: 3, energy: 3 },
  { date: "Nov 3", sleep: 8, stress: 3, mood: 4, energy: 5 },
  { date: "Nov 4", sleep: 7, stress: 3, mood: 4, energy: 4 },
  { date: "Nov 5", sleep: 5, stress: 6, mood: 2, energy: 3 },
  { date: "Nov 6", sleep: 6, stress: 5, mood: 3, energy: 3 },
  { date: "Nov 7", sleep: 7, stress: 4, mood: 3, energy: 4 },
  { date: "Nov 8", sleep: 8, stress: 3, mood: 4, energy: 5 },
  { date: "Nov 9", sleep: 7, stress: 3, mood: 5, energy: 5 },
  { date: "Nov 10", sleep: 8, stress: 2, mood: 5, energy: 5 },
];

// Mock student profile data
const studentProfile = {
  id: "ST12345",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  department: "Computer Science",
  section: "CS-2B",
  year: "Sophomore",
  advisor: "Dr. Sarah Johnson",
  enrollmentDate: "2022-09-01",
  photo: "/avatars/student.png"
}

// Mock data for demonstration purposes
const mockAssessments = [
  {
    id: "1",
    title: "Ryff PWB Assessment (42-item)",
    status: "pending",
    dueDate: "2023-11-15",
    progress: 0,
  },
  {
    id: "2",
    title: "Semester Check-in",
    status: "completed",
    completedDate: "2023-10-05",
    progress: 100,
  },
  {
    id: "3",
    title: "Academic Stress Assessment",
    status: "in-progress",
    dueDate: "2023-11-20",
    progress: 45,
  },
]

const mockResults = [
  {
    id: "2",
    title: "Semester Check-in",
    completedDate: "2023-10-05",
    dimensions: [
      { name: "Autonomy", score: 78 },
      { name: "Environmental Mastery", score: 65 },
      { name: "Personal Growth", score: 82 },
      { name: "Positive Relations", score: 70 },
      { name: "Purpose in Life", score: 75 },
      { name: "Self-Acceptance", score: 68 },
    ],
    overallScore: 73,
    counselorNotes: "Good progress since last assessment. Consider focusing on Environmental Mastery strategies.",
  },
]

const mockAppointments = [
  {
    id: "1",
    counselorName: "Dr. Sarah Johnson",
    date: "2023-11-18",
    time: "10:30 AM",
    status: "confirmed",
  },
]

// Sample assessment questions for the Ryff PWB Assessment
const mockAssessmentQuestions = [
  {
    id: "q1",
    text: "I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people.",
    dimension: "Autonomy",
  },
  {
    id: "q2",
    text: "In general, I feel I am in charge of the situation in which I live.",
    dimension: "Environmental Mastery",
  },
  {
    id: "q3",
    text: "I think it is important to have new experiences that challenge how you think about yourself and the world.",
    dimension: "Personal Growth",
  },
  {
    id: "q4",
    text: "Maintaining close relationships has been difficult and frustrating for me.",
    dimension: "Positive Relations",
    reversed: true,
  },
  {
    id: "q5",
    text: "I live life one day at a time and don't really think about the future.",
    dimension: "Purpose in Life",
    reversed: true,
  },
  {
    id: "q6",
    text: "When I look at the story of my life, I am pleased with how things have turned out.",
    dimension: "Self-Acceptance",
  },
  {
    id: "q7",
    text: "My decisions are not usually influenced by what everyone else is doing.",
    dimension: "Autonomy",
  },
  {
    id: "q8",
    text: "The demands of everyday life often get me down.",
    dimension: "Environmental Mastery",
    reversed: true,
  },
  {
    id: "q9",
    text: "For me, life has been a continuous process of learning, changing, and growth.",
    dimension: "Personal Growth",
  },
  {
    id: "q10",
    text: "People would describe me as a giving person, willing to share my time with others.",
    dimension: "Positive Relations",
  },
]

// Mock resources for students
const mockResources = [
  {
    id: "1",
    title: "Understanding Psychological Well-being",
    type: "Article",
    source: "University Counseling Center",
    link: "#",
  },
  {
    id: "2",
    title: "Stress Management Techniques",
    type: "Video",
    source: "Student Health Services",
    link: "#",
  },
  {
    id: "3",
    title: "Improving Environmental Mastery",
    type: "Worksheet",
    source: "Dr. Sarah Johnson",
    link: "#",
  },
  {
    id: "4",
    title: "Building Positive Relationships",
    type: "Workshop",
    source: "Student Life Center",
    date: "November 25, 2023",
    link: "#",
  },
]

interface StudentDashboardProps {
  onBack?: () => void;
  currentPage?: string;
}

export function StudentDashboard({ onBack, currentPage }: StudentDashboardProps) {
  const router = useRouter()
  
  // Map URL paths to tab values
  const mapUrlToTab = (url: string | undefined) => {
    if (!url) return "assessments";
    
    // Handle both old and new URL formats
    if (url === "assessment" || url === "assessments") return "assessments";
    if (url === "results") return "results";
    if (url === "feedback") return "feedback";
    
    // Default to assessments tab
    return "assessments";
  }
  
  const [selectedTab, setSelectedTab] = useState(mapUrlToTab(currentPage));
  const [messageText, setMessageText] = useState("")
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined)
  const [appointmentReason, setAppointmentReason] = useState("")
  const [isAssessmentActive, setIsAssessmentActive] = useState(false)
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [resourceFilter, setResourceFilter] = useState("all")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [wellnessMetric, setWellnessMetric] = useState("mood");
  const [dailyWellnessData, setDailyWellnessData] = useState({
    sleep: 8,
    stress: 3,
    mood: 4,
    energy: 4,
  });
  const [showCompletionScreen, setShowCompletionScreen] = useState(false)
  
  // Update selected tab when currentPage changes (from sidebar navigation)
  useEffect(() => {
    setSelectedTab(mapUrlToTab(currentPage));
  }, [currentPage]);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Handle wellness tracking input
  const handleWellnessChange = (metric: keyof typeof dailyWellnessData, value: number) => {
    setDailyWellnessData(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "confirmed":
        return <Badge variant="secondary">Confirmed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleStartAssessment = (assessmentId: string) => {
    setActiveAssessment(assessmentId)
    setIsAssessmentActive(true)
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswerQuestion = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockAssessmentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitAssessment = () => {
    // In a real app, this would submit the assessment to the server
    setIsAssessmentActive(false)
    setActiveAssessment(null)
    
    // Update the mock assessment to show as completed
    // This is just for demonstration purposes
    const updatedAssessments = mockAssessments.map(assessment => 
      assessment.id === activeAssessment 
        ? { ...assessment, status: "completed", progress: 100, completedDate: new Date().toISOString().split('T')[0] }
        : assessment
    )
    
    // Show completion screen
    setShowCompletionScreen(true)
    
    // In a real app, we would update the state with the updated assessments
  }

  const filteredResources = resourceFilter === "all" 
    ? mockResources 
    : mockResources.filter(resource => resource.type.toLowerCase() === resourceFilter.toLowerCase())

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/cookies
    router.push("/landing")
  }

  // Handle "View Results" button click on completion screen
  const handleViewResults = () => {
    setShowCompletionScreen(false)
    setSelectedTab("results")
  }
  
  // Handle "Back to Assessments" button click on completion screen
  const handleBackToAssessments = () => {
    setShowCompletionScreen(false)
    setSelectedTab("assessments")
  }

  // Render the active assessment if one is in progress
  if (isAssessmentActive && activeAssessment) {
    const currentQuestion = mockAssessmentQuestions[currentQuestionIndex]
    const totalQuestions = mockAssessmentQuestions.length
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

    return (
      <div className="container mx-auto max-w-4xl py-6 px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setIsAssessmentActive(false)} className="gap-2 hover:bg-slate-100">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="text-sm text-muted-foreground font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
        
        <Progress value={progress} className="h-2 mb-8" />
        
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">
              {mockAssessments.find(a => a.id === activeAssessment)?.title}
            </CardTitle>
            <CardDescription className="text-slate-500">
              Dimension: <span className="font-medium">{currentQuestion.dimension}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg font-medium text-slate-800">{currentQuestion.text}</div>
              
              <RadioGroup 
                value={answers[currentQuestion.id]?.toString() || ""} 
                onValueChange={(value) => handleAnswerQuestion(currentQuestion.id, parseInt(value))}
                className="pt-2"
              >
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-md cursor-pointer">
                    <RadioGroupItem value="1" id="option-1" />
                    <Label htmlFor="option-1" className="cursor-pointer font-medium">Strongly Disagree</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-md cursor-pointer">
                    <RadioGroupItem value="2" id="option-2" />
                    <Label htmlFor="option-2" className="cursor-pointer font-medium">Disagree</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-md cursor-pointer">
                    <RadioGroupItem value="3" id="option-3" />
                    <Label htmlFor="option-3" className="cursor-pointer font-medium">Somewhat Disagree</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-md cursor-pointer">
                    <RadioGroupItem value="4" id="option-4" />
                    <Label htmlFor="option-4" className="cursor-pointer font-medium">Somewhat Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-md cursor-pointer">
                    <RadioGroupItem value="5" id="option-5" />
                    <Label htmlFor="option-5" className="cursor-pointer font-medium">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-md cursor-pointer">
                    <RadioGroupItem value="6" id="option-6" />
                    <Label htmlFor="option-6" className="cursor-pointer font-medium">Strongly Agree</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion} 
              disabled={currentQuestionIndex === 0}
              className="border-slate-300"
            >
              Previous
            </Button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button onClick={handleSubmitAssessment}>
                Submit Assessment
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                Next Question
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  // If showing completion screen
  if (showCompletionScreen) {
    return (
      <div className="container mx-auto max-w-4xl py-10 px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping h-32 w-32 rounded-full bg-green-100 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-full p-4 border-4 border-green-100">
              <div className="rounded-full bg-green-50 p-6">
                <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900">Assessment Completed!</h1>
            <p className="text-xl text-slate-600">Thank you for completing your well-being assessment</p>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 w-full max-w-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">What's Next?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-slate-200 rounded-full p-1 mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-slate-700">Your responses have been recorded and are now being analyzed</p>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-200 rounded-full p-1 mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-slate-700">Your results will be available soon in the Results section</p>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-200 rounded-full p-1 mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-slate-700">Your counselor will review your assessment and provide guidance</p>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={handleBackToAssessments}
              className="border-slate-300"
            >
              Back to Assessments
            </Button>
            <Button onClick={handleViewResults}>
              View Results
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl py-6 px-4 md:px-8">
      {/* Back to Counselor View button (if onBack exists) */}
      {onBack && (
        <div className="flex justify-end mb-6">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="gap-2 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Counselor View
          </Button>
        </div>
      )}

      {/* Content based on currentPage */}
      {selectedTab === "assessments" && (
        <div className="grid gap-6">
          {mockAssessments.map((assessment) => (
            <Card key={assessment.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-slate-50 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-slate-800">{assessment.title}</CardTitle>
                  {getStatusBadge(assessment.status)}
                </div>
                <CardDescription className="text-slate-500 mt-1">
                  {assessment.status === "completed" 
                    ? `Completed on ${assessment.completedDate}` 
                    : `Due by ${assessment.dueDate}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Progress</span>
                    <span className="font-semibold text-slate-900">{assessment.progress}%</span>
                  </div>
                  <Progress value={assessment.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="bg-white pt-4 flex justify-end">
                {assessment.status !== "completed" && (
                  <Button 
                    onClick={() => handleStartAssessment(assessment.id)}
                    className="shadow-sm"
                  >
                    {assessment.progress > 0 ? "Continue" : "Start"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "results" && (
        <div className="grid gap-6">
          {mockResults.map((result) => (
            <Card key={result.id} className="overflow-hidden border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-slate-800">{result.title}</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                </div>
                <CardDescription className="text-slate-500 mt-1">
                  Completed on {result.completedDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                {/* Overall score */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">Overall Well-being Score</h4>
                    <span className="text-lg font-bold text-primary">{result.overallScore}<span className="text-sm text-slate-500 font-normal">/100</span></span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-100">
                      <div 
                        style={{ width: `${result.overallScore}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Dimension scores */}
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-5">Dimension Scores</h4>
                  <div className="space-y-4">
                    {result.dimensions.map((dimension) => (
                      <div key={dimension.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{dimension.name}</span>
                          <span className="font-semibold text-slate-900">{dimension.score}/100</span>
                        </div>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-200">
                            <div 
                              style={{ width: `${dimension.score}%` }} 
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full ${
                                dimension.score < 50 ? 'bg-red-500' :
                                dimension.score < 70 ? 'bg-amber-500' :
                                'bg-green-500'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Counselor Notes */}
                {result.counselorNotes && (
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h4 className="text-blue-800 font-medium flex items-center gap-2 mb-3">
                      <MessageSquare className="h-4 w-4" />
                      Counselor Notes
                    </h4>
                    <p className="text-blue-700">{result.counselorNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "feedback" && (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-100 pb-6">
            <div className="flex items-center mb-2">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-slate-800">AI Feedback</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Review the AI-generated feedback and interventions for your well-being assessment results
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="intervention">Intervention</TabsTrigger>
              </TabsList>

              {/* Analysis Tab Content */}
              <TabsContent value="analysis" className="mt-0 focus:outline-none">
                <div className="space-y-6">
                  <div className="bg-blue-50/50 rounded-md border border-blue-100 p-4">
                    <h3 className="text-md font-semibold mb-2">Analysis</h3>
                    <p className="text-sm">
                      Mike's assessment shows a critically low score in the Self-Acceptance dimension, which is significantly out of alignment with his otherwise moderate to high scores in other areas.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50/50 rounded-md border border-amber-100 p-4">
                    <h3 className="text-md font-semibold mb-2">Recommendation</h3>
                    <p className="text-sm">
                      This pattern suggests Mike may be experiencing specific issues related to self-image, self-worth, or self-criticism, despite functioning well in other areas of psychological wellbeing.
                    </p>
                  </div>
                  
                  <div className="bg-green-50/50 rounded-md border border-green-100 p-4">
                    <h3 className="text-md font-semibold mb-2">Suggestion</h3>
                    <p className="text-sm">
                      I recommend prioritizing a one-on-one session with Mike to explore the factors contributing to his low self-acceptance. Consider compassion-focused techniques and strengths-based approaches to help improve his relationship with himself.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Intervention Tab Content - Matching the counselor view exactly */}
              <TabsContent value="intervention" className="mt-0 focus:outline-none">
                <div className="space-y-8">
                  {/* Overall Wellbeing Strategy */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Heart className="text-blue-600 h-4 w-4" />
                            <h3 className="font-semibold">Overall Wellbeing Strategy</h3>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm mt-1">
                          Based on your assessment profile, focusing on building self-acceptance while leveraging your strength in purpose in life could significantly improve your overall psychological wellbeing.
                        </p>
                        
                        <h4 className="text-sm font-medium mt-4">Recommended Steps:</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-blue-100 text-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Schedule a one-on-one session with your counselor to discuss your assessment results</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-blue-100 text-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Set specific, measurable goals related to your areas of improvement</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-blue-100 text-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Track your progress weekly using the reflection journal provided by your counselor</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-4">Dimension-Specific Strategies</h3>
                  
                  {/* Building Self-Acceptance */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="text-red-600 h-4 w-4" />
                              <h3 className="font-semibold">Building Self-Acceptance</h3>
                            </div>
                            <div className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-sm inline-block mt-1">
                              Needs attention
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm mt-2">
                          Your score in Self-Acceptance indicates an opportunity for growth. These strategies can help strengthen this dimension:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-red-100 text-red-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Practice daily self-compassion exercises</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-red-100 text-red-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Challenge negative self-talk with evidence-based alternatives</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-red-100 text-red-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Create a list of your strengths and review it regularly</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhancing Positive Relations */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <BarChart className="text-amber-600 h-4 w-4" />
                              <h3 className="font-semibold">Enhancing Positive Relations</h3>
                            </div>
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-sm inline-block mt-1">
                              Moderate
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm mt-2">
                          Your score in Positive Relations shows a moderate level. These strategies can help strengthen this dimension further:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Deepen existing relationships through more meaningful conversations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Practice expressing appreciation to others regularly</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Work on conflict resolution skills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhancing Autonomy */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <BarChart className="text-amber-600 h-4 w-4" />
                              <h3 className="font-semibold">Enhancing Autonomy</h3>
                            </div>
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-sm inline-block mt-1">
                              Moderate
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm mt-2">
                          Your score in Autonomy shows a moderate level. These strategies can help strengthen this dimension further:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Reflect on instances where you successfully asserted your values</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Practice respectfully disagreeing in low-stakes situations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Identify one area where you can make more independent choices</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Leveraging Your Strength in Personal Growth */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Heart className="text-green-600 h-4 w-4" />
                              <h3 className="font-semibold">Leveraging Your Strength in Personal Growth</h3>
                            </div>
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-sm inline-block mt-1">
                              Strength
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm mt-2">
                          Your high score in Personal Growth indicates this is an area of strength. Consider these strategies to build on this foundation:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Set more challenging growth goals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Mentor others in their development journey</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Explore advanced opportunities in areas of interest</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Leveraging Your Strength in Environmental Mastery */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Heart className="text-green-600 h-4 w-4" />
                              <h3 className="font-semibold">Leveraging Your Strength in Environmental Mastery</h3>
                            </div>
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-sm inline-block mt-1">
                              Strength
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm mt-2">
                          Your high score in Environmental Mastery indicates this is an area of strength. Consider these strategies to build on this foundation:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Share your organizational techniques with peers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Take on leadership roles that utilize this strength</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Apply your skills to increasingly complex challenges</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Leveraging Your Strength in Purpose in Life */}
                  <div className="border border-slate-200 rounded-md">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <input type="checkbox" checked className="h-4 w-4" readOnly />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Heart className="text-green-600 h-4 w-4" />
                              <h3 className="font-semibold">Leveraging Your Strength in Purpose in Life</h3>
                            </div>
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-sm inline-block mt-1">
                              Strength
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm mt-2">
                          Your high score in Purpose in Life indicates this is an area of strength. Consider these strategies to build on this foundation:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <span className="text-sm">Refine your long-term vision and goals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <span className="text-sm">Help others connect with their sense of purpose</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <span className="text-sm">Explore how to align your purpose with career aspirations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 