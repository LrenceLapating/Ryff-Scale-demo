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
import { ChevronLeft, ChevronRight, ArrowLeft, User, School, BookOpen, GraduationCap, Bell, X, Heart, Brain, Coffee, Moon, Smile, AlertCircle, MessageSquare } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
  // Map URL paths from sidebar to tab values
  const mapUrlToTab = (url: string | undefined) => {
    if (!url) return "assessments";
    
    // Remove leading slash if present
    const path = url.startsWith("/") ? url.substring(1) : url;
    
    // Map paths to tabs
    switch (path) {
      case "assessments": return "assessments";
      case "results": return "results";
      case "appointments": return "appointments";
      case "messages": return "messages";
      case "resources": return "resources";
      case "wellness": return "wellness";
      case "profile": return "profile";
      default: return "assessments";
    }
  };
  
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
    // In a real app, we would update the state with the updated assessments
  }

  const filteredResources = resourceFilter === "all" 
    ? mockResources 
    : mockResources.filter(resource => resource.type.toLowerCase() === resourceFilter.toLowerCase())

  // Render the active assessment if one is in progress
  if (isAssessmentActive && activeAssessment) {
    const currentQuestion = mockAssessmentQuestions[currentQuestionIndex]
    const totalQuestions = mockAssessmentQuestions.length
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setIsAssessmentActive(false)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <Card>
          <CardHeader>
            <CardTitle>
              {mockAssessments.find(a => a.id === activeAssessment)?.title}
            </CardTitle>
            <CardDescription>
              Dimension: {currentQuestion.dimension}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg font-medium">{currentQuestion.text}</div>
              
              <RadioGroup 
                value={answers[currentQuestion.id]?.toString() || ""} 
                onValueChange={(value) => handleAnswerQuestion(currentQuestion.id, parseInt(value))}
              >
                <div className="grid grid-cols-1 gap-3 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="option-1" />
                    <Label htmlFor="option-1">Strongly Disagree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="option-2" />
                    <Label htmlFor="option-2">Disagree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="option-3" />
                    <Label htmlFor="option-3">Somewhat Disagree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="option-4" />
                    <Label htmlFor="option-4">Somewhat Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="option-5" />
                    <Label htmlFor="option-5">Agree</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6" id="option-6" />
                    <Label htmlFor="option-6">Strongly Agree</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button 
                onClick={handleSubmitAssessment}
                disabled={!answers[currentQuestion.id]}
              >
                Submit Assessment
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion.id]}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" onClick={onBack} size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
          </div>
          <p className="text-muted-foreground">
            Access your assessments, view results, and communicate with your guidance counselor.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-2 border-b flex justify-between items-center">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-xs"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="py-1">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-2 hover:bg-muted cursor-pointer ${notification.read ? '' : 'bg-muted/50'}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`mt-0.5 rounded-full p-1 ${
                              notification.type === 'assessment' ? 'bg-blue-100 text-blue-600' :
                              notification.type === 'appointment' ? 'bg-green-100 text-green-600' :
                              notification.type === 'message' ? 'bg-purple-100 text-purple-600' :
                              'bg-amber-100 text-amber-600'
                            }`}>
                              {notification.type === 'assessment' && <BookOpen className="h-3 w-3" />}
                              {notification.type === 'appointment' && <Calendar className="h-3 w-3" />}
                              {notification.type === 'message' && <MessageSquare className="h-3 w-3" />}
                              {notification.type === 'reminder' && <AlertCircle className="h-3 w-3" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                            </div>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Student Profile</DialogTitle>
                <DialogDescription>
                  Your personal and academic information
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center py-4">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={studentProfile.photo} />
                  <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{studentProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
              </div>
              <Separator />
              <div className="py-4 space-y-3">
                <div className="flex items-center">
                  <School className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium w-24">Department:</span>
                  <span className="text-sm">{studentProfile.department}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium w-24">Section:</span>
                  <span className="text-sm">{studentProfile.section}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium w-24">Year:</span>
                  <span className="text-sm">{studentProfile.year}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium w-24">Advisor:</span>
                  <span className="text-sm">{studentProfile.advisor}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsProfileOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Request Counselor Meeting</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Appointment</DialogTitle>
                <DialogDescription>
                  Request a meeting with your guidance counselor. Please select a date and provide a brief reason for the meeting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason for appointment</Label>
                  <Textarea
                    id="reason"
                    placeholder="Briefly describe why you'd like to meet..."
                    value={appointmentReason}
                    onChange={(e) => setAppointmentReason(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Preferred date</Label>
                  <Calendar
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    className="rounded-md border"
                    disabled={(date) => {
                      // Disable weekends and past dates
                      const day = date.getDay()
                      return day === 0 || day === 6 || date < new Date()
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Request Appointment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Back to Counselor View button */}
      {onBack && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Counselor View
          </Button>
        </div>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessments" className="space-y-4">
          <h3 className="text-lg font-medium">Your Assessments</h3>
          {mockAssessments.map((assessment) => (
            <Card key={assessment.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{assessment.title}</CardTitle>
                  {getStatusBadge(assessment.status)}
                </div>
                <CardDescription>
                  {assessment.status === "completed" 
                    ? `Completed on ${assessment.completedDate}` 
                    : `Due by ${assessment.dueDate}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{assessment.progress}%</span>
                  </div>
                  <Progress value={assessment.progress} />
                </div>
              </CardContent>
              <CardFooter>
                {assessment.status !== "completed" && (
                  <Button 
                    className="w-full" 
                    variant={assessment.status === "pending" ? "default" : "secondary"}
                    onClick={() => handleStartAssessment(assessment.id)}
                  >
                    {assessment.status === "pending" ? "Start Assessment" : "Continue Assessment"}
                  </Button>
                )}
                {assessment.status === "completed" && (
                  <Button className="w-full" variant="outline" onClick={() => setSelectedTab("results")}>
                    View Results
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <h3 className="text-lg font-medium">Assessment Results</h3>
          {mockResults.length > 0 ? (
            mockResults.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{result.title}</CardTitle>
                  <CardDescription>Completed on {result.completedDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm font-medium">{result.overallScore}/100</span>
                      </div>
                      <Progress value={result.overallScore} className="h-2" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Dimension Scores</h4>
                      {result.dimensions.map((dimension) => (
                        <div key={dimension.name} className="grid grid-cols-2 gap-2">
                          <div className="text-sm">{dimension.name}</div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={dimension.score} 
                              className="h-2" 
                            />
                            <span className="text-xs">{dimension.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {result.counselorNotes && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Counselor Notes</h4>
                          <div className="rounded-md bg-muted p-3 text-sm">
                            {result.counselorNotes}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">Request Follow-up Discussion</Button>
                  <Button variant="outline" className="flex-1">Download PDF Report</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No assessment results available yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Appointments</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Request New Appointment</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule Appointment</DialogTitle>
                  <DialogDescription>
                    Request a meeting with your guidance counselor. Please select a date and provide a brief reason for the meeting.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Reason for appointment</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe why you'd like to meet..."
                      value={appointmentReason}
                      onChange={(e) => setAppointmentReason(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Preferred date</Label>
                    <Calendar
                      mode="single"
                      selected={appointmentDate}
                      onSelect={setAppointmentDate}
                      className="rounded-md border"
                      disabled={(date) => {
                        // Disable weekends and past dates
                        const day = date.getDay()
                        return day === 0 || day === 6 || date < new Date()
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Request Appointment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {mockAppointments.length > 0 ? (
            mockAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Meeting with {appointment.counselorName}</CardTitle>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <CardDescription>
                    {appointment.date} at {appointment.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted p-3">
                    <h4 className="mb-2 text-sm font-medium">Appointment Details</h4>
                    <p className="text-sm">
                      This meeting will take place in the Counseling Center, Room 204. Please arrive 5 minutes early to check in.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="destructive">Cancel</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No upcoming appointments.</p>
                <Button className="mt-4" onClick={() => setSelectedTab("messages")}>
                  Message Your Counselor
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Your Counselor</CardTitle>
              <CardDescription>
                Send a direct message to your assigned guidance counselor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/avatars/counselor.png" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">
                          Hello! I noticed you've completed your semester check-in assessment. 
                          Would you like to schedule a follow-up meeting to discuss your results?
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">Yesterday, 2:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 justify-end">
                    <div className="space-y-1">
                      <div className="rounded-md bg-primary p-3 text-primary-foreground">
                        <p className="text-sm">
                          Yes, I would like to discuss my results. I'm particularly interested in understanding my Environmental Mastery score.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground text-right">Today, 9:15 AM</p>
                    </div>
                    <Avatar>
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/avatars/counselor.png" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">
                          Great! I have some availability this Friday at 10:30 AM or next Monday at 2:00 PM. Would either of those times work for you?
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">Today, 10:05 AM</p>
                    </div>
                  </div>
                </div>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Attach File</Button>
              <Button>Send Message</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Well-being Resources</h3>
            <div className="flex gap-2">
              <Button 
                variant={resourceFilter === "all" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setResourceFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={resourceFilter === "article" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setResourceFilter("article")}
              >
                Articles
              </Button>
              <Button 
                variant={resourceFilter === "video" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setResourceFilter("video")}
              >
                Videos
              </Button>
              <Button 
                variant={resourceFilter === "workshop" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setResourceFilter("workshop")}
              >
                Workshops
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{resource.title}</CardTitle>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <CardDescription>Source: {resource.source}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.type === "Workshop" && resource.date && (
                    <p className="text-sm mb-2">Date: {resource.date}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {resource.type === "Article" && "Read this article to learn more about psychological well-being concepts and strategies."}
                    {resource.type === "Video" && "Watch this video for practical demonstrations and expert advice."}
                    {resource.type === "Worksheet" && "Download this worksheet for guided exercises to improve your well-being."}
                    {resource.type === "Workshop" && "Attend this workshop to learn and practice well-being techniques with peers."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      {resource.type === "Article" && "Read Article"}
                      {resource.type === "Video" && "Watch Video"}
                      {resource.type === "Worksheet" && "Download Worksheet"}
                      {resource.type === "Workshop" && "Register for Workshop"}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="wellness" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Wellness Tracker</CardTitle>
                <CardDescription>Track your daily well-being metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sleep">Sleep (hours)</Label>
                      <span className="text-sm">{dailyWellnessData.sleep} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-muted-foreground" />
                      <input
                        id="sleep"
                        type="range"
                        min="0"
                        max="12"
                        step="0.5"
                        value={dailyWellnessData.sleep}
                        onChange={(e) => handleWellnessChange('sleep', parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stress">Stress Level</Label>
                      <span className="text-sm">{dailyWellnessData.stress} / 10</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <input
                        id="stress"
                        type="range"
                        min="1"
                        max="10"
                        value={dailyWellnessData.stress}
                        onChange={(e) => handleWellnessChange('stress', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mood">Mood</Label>
                      <span className="text-sm">{dailyWellnessData.mood} / 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smile className="h-4 w-4 text-muted-foreground" />
                      <input
                        id="mood"
                        type="range"
                        min="1"
                        max="5"
                        value={dailyWellnessData.mood}
                        onChange={(e) => handleWellnessChange('mood', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="energy">Energy Level</Label>
                      <span className="text-sm">{dailyWellnessData.energy} / 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <input
                        id="energy"
                        type="range"
                        min="1"
                        max="5"
                        value={dailyWellnessData.energy}
                        onChange={(e) => handleWellnessChange('energy', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Today's Entry</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Wellness Insights</CardTitle>
                <CardDescription>Track your well-being trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Metric to Display</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant={wellnessMetric === "mood" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setWellnessMetric("mood")}
                      >
                        Mood
                      </Button>
                      <Button 
                        variant={wellnessMetric === "sleep" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setWellnessMetric("sleep")}
                      >
                        Sleep
                      </Button>
                      <Button 
                        variant={wellnessMetric === "stress" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setWellnessMetric("stress")}
                      >
                        Stress
                      </Button>
                      <Button 
                        variant={wellnessMetric === "energy" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setWellnessMetric("energy")}
                      >
                        Energy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockWellnessData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis 
                          domain={wellnessMetric === "sleep" ? [0, 12] : wellnessMetric === "stress" ? [0, 10] : [0, 5]}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey={wellnessMetric}
                          stroke={
                            wellnessMetric === "mood" ? "#3b82f6" : 
                            wellnessMetric === "sleep" ? "#8b5cf6" : 
                            wellnessMetric === "stress" ? "#ef4444" : 
                            "#10b981"
                          }
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Detailed Report</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Wellness Recommendations</CardTitle>
                <CardDescription>Personalized suggestions based on your well-being data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Moon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Sleep Improvement</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your sleep pattern shows some inconsistency. Try to maintain a regular sleep schedule, 
                          aiming for 7-8 hours each night. Consider reducing screen time before bed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <Heart className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Stress Management</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your stress levels have been elevated recently. Consider incorporating mindfulness 
                          practices or short breaks during study sessions. The Stress Management workshop on 
                          November 25 might be helpful.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Mood Enhancement</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your mood has been improving over the past week. Continue engaging in activities 
                          that bring you joy and consider joining social events to maintain this positive trend.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Schedule Wellness Consultation</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic information and academic details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={studentProfile.photo} />
                    <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{studentProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
                  <p className="text-sm text-muted-foreground">ID: {studentProfile.id}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <School className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium w-24">Department:</span>
                    <span className="text-sm">{studentProfile.department}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium w-24">Section:</span>
                    <span className="text-sm">{studentProfile.section}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium w-24">Year:</span>
                    <span className="text-sm">{studentProfile.year}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium w-24">Advisor:</span>
                    <span className="text-sm">{studentProfile.advisor}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Your well-being assessment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Well-being Score Trend</h4>
                    <div className="h-[200px] rounded-md border p-4 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Well-being score chart would appear here</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Assessment Completion</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Completed Assessments</span>
                          <span>1 of 3</span>
                        </div>
                        <Progress value={33} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Department</h4>
                    <div className="rounded-md bg-muted p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{studentProfile.department}</span>
                        <Badge variant="outline">{studentProfile.section}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Academic Record</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled appointments and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Appointments</h4>
                      {mockAppointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center justify-between rounded-md border p-3 mb-2">
                          <div>
                            <p className="text-sm font-medium">Meeting with {appointment.counselorName}</p>
                            <p className="text-xs text-muted-foreground">{appointment.date} at {appointment.time}</p>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Upcoming Assessments</h4>
                    {mockAssessments
                      .filter(assessment => assessment.status !== "completed")
                      .map(assessment => (
                        <div key={assessment.id} className="flex items-center justify-between rounded-md border p-3 mb-2">
                          <div>
                            <p className="text-sm font-medium">{assessment.title}</p>
                            <p className="text-xs text-muted-foreground">Due by {assessment.dueDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 text-right">
                              <span className="text-xs">{assessment.progress}%</span>
                            </div>
                            {getStatusBadge(assessment.status)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 