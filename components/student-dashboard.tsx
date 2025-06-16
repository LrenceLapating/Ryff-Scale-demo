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

// Ryff Scale dimensions
const dimensions = [
  "Autonomy",
  "Environmental Mastery",
  "Personal Growth",
  "Positive Relations",
  "Purpose in Life",
  "Self-Acceptance"
];

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
    description: "Comprehensive psychological well-being assessment based on Ryff's six dimensions model (42-item version).",
    completedDate: ""
  },
  {
    id: "3",
    title: "Dimension-Specific Assessment: Self-Acceptance",
    status: "pending",
    dueDate: "2023-11-22",
    progress: 0,
    description: "Targeted assessment focusing on the Self-Acceptance dimension of well-being.",
    completedDate: ""
  }
]

// Add a result for the 42-item assessment
const mockResults = [
  {
    id: "1",
    title: "Ryff PWB Assessment (42-item)",
    completedDate: "2023-11-15",
    dimensions: [
      { name: "Autonomy", score: 75 },
      { name: "Environmental Mastery", score: 68 },
      { name: "Personal Growth", score: 80 },
      { name: "Positive Relations", score: 72 },
      { name: "Purpose in Life", score: 78 },
      { name: "Self-Acceptance", score: 55 },
    ],
    overallScore: 71,
    counselorNotes: "Your 42-item assessment results show strong scores in Personal Growth and Purpose in Life. Continue working on Self-Acceptance using the recommended exercises. Your overall psychological well-being score is in the healthy range.",
  }
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
  {
    id: "q11",
    text: "Some people wander aimlessly through life, but I am not one of them.",
    dimension: "Purpose in Life",
  },
  {
    id: "q12",
    text: "I like most parts of my personality.",
    dimension: "Self-Acceptance",
  },
  {
    id: "q13",
    text: "I judge myself by what I think is important, not by the values of what others think is important.",
    dimension: "Autonomy",
  },
  {
    id: "q14",
    text: "I gave up trying to make big improvements or changes in my life a long time ago.",
    dimension: "Personal Growth",
    reversed: true,
  },
  {
    id: "q15",
    text: "I am quite good at managing the many responsibilities of my daily life.",
    dimension: "Environmental Mastery",
  },
  {
    id: "q16",
    text: "I have not experienced many warm and trusting relationships with others.",
    dimension: "Positive Relations",
    reversed: true,
  },
  {
    id: "q17",
    text: "I have a sense of direction and purpose in life.",
    dimension: "Purpose in Life",
  },
  {
    id: "q18",
    text: "In general, I feel confident and positive about myself.",
    dimension: "Self-Acceptance",
  },
  {
    id: "q19",
    text: "I tend to be influenced by people with strong opinions.",
    dimension: "Autonomy",
    reversed: true,
  },
  {
    id: "q20",
    text: "I do not fit very well with the people and the community around me.",
    dimension: "Environmental Mastery",
    reversed: true,
  },
  {
    id: "q21",
    text: "I have the sense that I have developed a lot as a person over time.",
    dimension: "Personal Growth",
  },
  {
    id: "q22",
    text: "I often feel lonely because I have few close friends with whom to share my concerns.",
    dimension: "Positive Relations",
    reversed: true,
  },
  {
    id: "q23",
    text: "I have been able to build a living environment and a lifestyle for myself that is much to my liking.",
    dimension: "Environmental Mastery",
  },
  {
    id: "q24",
    text: "I tend to worry about what other people think of me.",
    dimension: "Autonomy",
    reversed: true,
  },
  {
    id: "q25",
    text: "I do not enjoy being in new situations that require me to change my old familiar ways of doing things.",
    dimension: "Personal Growth",
    reversed: true,
  },
  {
    id: "q26",
    text: "My daily activities often seem trivial and unimportant to me.",
    dimension: "Purpose in Life",
    reversed: true,
  },
  {
    id: "q27",
    text: "I know that I can trust my friends, and they know they can trust me.",
    dimension: "Positive Relations",
  },
  {
    id: "q28",
    text: "When I think about it, I haven't really improved much as a person over the years.",
    dimension: "Personal Growth",
    reversed: true,
  },
  {
    id: "q29",
    text: "I don't have a good sense of what it is I'm trying to accomplish in life.",
    dimension: "Purpose in Life",
    reversed: true,
  },
  {
    id: "q30",
    text: "I made some mistakes in the past, but I feel that all in all everything has worked out for the best.",
    dimension: "Self-Acceptance",
  },
  {
    id: "q31",
    text: "I have confidence in my opinions, even if they are contrary to the general consensus.",
    dimension: "Autonomy",
  },
  {
    id: "q32",
    text: "I generally do a good job of taking care of my personal finances and affairs.",
    dimension: "Environmental Mastery",
  },
  {
    id: "q33",
    text: "I used to set goals for myself, but that now seems like a waste of time.",
    dimension: "Purpose in Life",
    reversed: true,
  },
  {
    id: "q34",
    text: "I feel like many of the people I know have gotten more out of life than I have.",
    dimension: "Self-Acceptance",
    reversed: true,
  },
  {
    id: "q35",
    text: "I have difficulty arranging my life in a way that is satisfying to me.",
    dimension: "Environmental Mastery",
    reversed: true,
  },
  {
    id: "q36",
    text: "I enjoy personal and mutual conversations with family members or friends.",
    dimension: "Positive Relations",
  },
  {
    id: "q37",
    text: "I enjoy making plans for the future and working to make them a reality.",
    dimension: "Purpose in Life",
  },
  {
    id: "q38",
    text: "In many ways, I feel disappointed about my achievements in life.",
    dimension: "Self-Acceptance",
    reversed: true,
  },
  {
    id: "q39",
    text: "It's difficult for me to voice my own opinions on controversial matters.",
    dimension: "Autonomy",
    reversed: true,
  },
  {
    id: "q40",
    text: "I am good at juggling my time so that I can fit everything in that needs to be done.",
    dimension: "Environmental Mastery",
  },
  {
    id: "q41",
    text: "I have a sense that I have developed a lot as a person over time.",
    dimension: "Personal Growth",
  },
  {
    id: "q42",
    text: "I often feel overwhelmed by my responsibilities.",
    dimension: "Environmental Mastery",
    reversed: true,
  },
]

// Mock resources for students
const mockResources = [
  {
    id: "1",
    title: "Understanding the Six Dimensions of Well-being",
    type: "Article",
    source: "University Counseling Center",
    link: "#",
  },
  {
    id: "2",
    title: "Self-Acceptance: Exercises for Growth",
    type: "Worksheet",
    source: "Dr. Sarah Johnson",
    link: "#",
  },
  {
    id: "3",
    title: "Building Positive Relations Workshop",
    type: "Workshop",
    source: "Student Life Center",
    date: "November 25, 2023",
    link: "#",
  },
  {
    id: "4",
    title: "Purpose in Life: Finding Your Path",
    type: "Video",
    source: "Ryff Institute",
    link: "#",
  },
  {
    id: "5",
    title: "Personal Growth Journal Template",
    type: "Download",
    source: "Wellness Center",
    link: "#",
  },
]

// New - Ryff dimension goals for students
const mockDimensionGoals = [
  {
    id: "1",
    dimension: "Self-Acceptance",
    goal: "Practice positive self-affirmations daily",
    progress: 30,
    dueDate: "2023-12-01"
  },
  {
    id: "2",
    dimension: "Positive Relations",
    goal: "Have meaningful conversations with two friends each week",
    progress: 60,
    dueDate: "2023-11-30"
  },
  {
    id: "3",
    dimension: "Personal Growth",
    goal: "Read one personal development book this month",
    progress: 75,
    dueDate: "2023-11-20"
  }
]

// New - Ryff dimension-specific reflections
const mockReflections = [
  {
    id: "1",
    date: "2023-10-15",
    dimension: "Self-Acceptance",
    content: "Today I found it difficult to acknowledge my achievements. I need to work on recognizing my strengths more consistently.",
    mood: "😐"
  },
  {
    id: "2",
    date: "2023-10-25",
    dimension: "Personal Growth",
    content: "Tried a new skill today and enjoyed the learning process. Feeling proud of stepping out of my comfort zone.",
    mood: "😊"
  }
]

// New - Wellness tips specific to Ryff dimensions
const wellnessTips = [
  {
    dimension: "Autonomy",
    tips: [
      "Practice making independent decisions daily",
      "Set boundaries in relationships",
      "Reflect on your personal values regularly"
    ]
  },
  {
    dimension: "Environmental Mastery",
    tips: [
      "Organize your physical space",
      "Create a weekly schedule that balances responsibilities",
      "Take control of one challenging situation this week"
    ]
  },
  {
    dimension: "Self-Acceptance",
    tips: [
      "Write down three things you like about yourself daily",
      "Practice self-compassion when facing setbacks",
      "Challenge negative self-talk with evidence"
    ]
  }
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
    if (url === "settings") return "settings";
    
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
  const [selectedWellnessTip, setSelectedWellnessTip] = useState<string>("Autonomy");
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionDimension, setReflectionDimension] = useState("Self-Acceptance");
  const [reflectionMood, setReflectionMood] = useState("😐");
  const [showReflectionDialog, setShowReflectionDialog] = useState(false);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDimension, setGoalDimension] = useState("Autonomy");
  const [goalDueDate, setGoalDueDate] = useState<Date | undefined>(undefined);
  
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
    
    // Add the 42-item assessment to mockResults42 if it doesn't exist yet
    if (!mockResults.some(result => result.id === activeAssessment)) {
      // In a real app, this would be calculated from the actual answers
      // For now, we'll just use the pre-defined mock result
    }
    
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

  // Add a function to handle reflection submission
  const handleSubmitReflection = () => {
    if (reflectionText.trim() === "") return;
    
    // In a real app, this would send the reflection to the server
    setShowReflectionDialog(false);
    setReflectionText("");
    
    // Show confirmation toast or notification in a real app
  };

  // Add a function to handle goal submission
  const handleSubmitGoal = () => {
    if (goalTitle.trim() === "") return;
    
    // In a real app, this would send the goal to the server
    setShowGoalDialog(false);
    setGoalTitle("");
    
    // Show confirmation toast or notification in a real app
  };

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
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <h3 className="font-medium mb-2">Instructions:</h3>
                <p>Circle one response below each statement to indicate how much you agree or disagree.</p>
                <p className="mt-2 font-medium">
                  1 = strongly disagree; 2 = disagree; 3 = somewhat disagree; 4 = somewhat agree; 5 = agree; 6 = strongly agree
                </p>
              </div>
              <div className="text-lg font-medium text-slate-800">{currentQuestionIndex + 1}. {currentQuestion.text}</div>
              
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
            <p className="text-xl text-slate-600">Thank you for completing the 42-item Ryff Psychological Well-being Assessment</p>
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
                <div className="text-sm text-slate-600 mb-4">
                  {assessment.description}
                </div>
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

          {/* New section for Dimension Goals */}
          <Card className="border-slate-200 shadow-sm overflow-hidden mt-8">
            <CardHeader className="bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800">Dimension Goals</CardTitle>
                  <CardDescription>Track your personal well-being dimension goals</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowGoalDialog(true)}>
                  Add Goal
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {mockDimensionGoals.map((goal) => (
                  <div key={goal.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{goal.goal}</h4>
                        <Badge variant="outline" className="mt-1">{goal.dimension}</Badge>
                      </div>
                      <div className="text-sm text-slate-500">Due {goal.dueDate}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* New Daily Reflection section */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800">Dimension Reflections</CardTitle>
                  <CardDescription>Record thoughts and progress on specific dimensions</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowReflectionDialog(true)}>
                  Add Reflection
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {mockReflections.length > 0 ? (
                <div className="space-y-4">
                  {mockReflections.map((reflection) => (
                    <div key={reflection.id} className="bg-slate-50 rounded-md p-4 border border-slate-200">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {reflection.dimension}
                          </Badge>
                          <span className="text-sm text-slate-500">{reflection.date}</span>
                        </div>
                        <div className="text-xl">{reflection.mood}</div>
                      </div>
                      <p className="text-sm mt-2">{reflection.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No reflections yet. Add your first reflection to track your well-being journey.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wellness Tips Section */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50">
              <CardTitle className="text-xl text-slate-800">Dimension Wellness Tips</CardTitle>
              <CardDescription>Practical strategies to improve specific dimensions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Label htmlFor="dimensionSelect">Select Dimension</Label>
                <select 
                  id="dimensionSelect" 
                  value={selectedWellnessTip}
                  onChange={(e) => setSelectedWellnessTip(e.target.value)}
                  className="w-full mt-1 rounded-md border border-slate-300 p-2"
                >
                  {wellnessTips.map(tip => (
                    <option key={tip.dimension} value={tip.dimension}>{tip.dimension}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Tips for {selectedWellnessTip}</h4>
                <ul className="space-y-2">
                  {wellnessTips.find(t => t.dimension === selectedWellnessTip)?.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
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
              <CardTitle className="text-xl text-slate-800">Guidance Feedback</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Review personalized guidance and intervention strategies for your well-being assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Overall Wellbeing Strategy */}
              <div className="border border-slate-200 rounded-md p-5">
                <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2 mb-3">
                  <Heart className="text-blue-600 h-5 w-5" />
                  Overall Wellbeing Strategy
                </h3>
                <p className="text-slate-700 mb-4">
                  Based on your assessment profile, focusing on building self-acceptance while leveraging your strength in purpose in life could significantly improve your overall psychological wellbeing.
                </p>
                
                <h4 className="text-sm font-medium mt-4 text-slate-700">Recommended Steps:</h4>
                <ul className="mt-2 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span className="text-slate-700">Schedule a one-on-one session with your counselor to discuss your assessment results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span className="text-slate-700">Set specific, measurable goals related to your areas of improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span className="text-slate-700">Track your progress weekly using the reflection journal provided by your counselor</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="font-semibold text-lg mt-4">Dimension-Specific Strategies</h3>
              
              {/* Building Self-Acceptance */}
              <div className="border border-slate-200 rounded-md p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-red-600 h-5 w-5" />
                  <h3 className="font-semibold text-lg">Building Self-Acceptance</h3>
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-sm inline-block mb-3">
                  Needs attention
                </div>
                
                <p className="text-slate-700 mb-4">
                  Your score in Self-Acceptance indicates an opportunity for growth. These strategies can help strengthen this dimension:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span className="text-slate-700">Practice daily self-compassion exercises</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span className="text-slate-700">Challenge negative self-talk with evidence-based alternatives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span className="text-slate-700">Create a list of your strengths and review it regularly</span>
                  </li>
                </ul>
              </div>

              {/* Enhancing Positive Relations */}
              <div className="border border-slate-200 rounded-md p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="text-amber-600 h-5 w-5" />
                  <h3 className="font-semibold text-lg">Enhancing Positive Relations</h3>
                </div>
                <div className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-sm inline-block mb-3">
                  Moderate
                </div>
                
                <p className="text-slate-700 mb-4">
                  Your score in Positive Relations shows a moderate level. These strategies can help strengthen this dimension further:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span className="text-slate-700">Deepen existing relationships through more meaningful conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span className="text-slate-700">Practice expressing appreciation to others regularly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span className="text-slate-700">Work on conflict resolution skills</span>
                  </li>
                </ul>
              </div>

              {/* Leveraging Your Strength in Personal Growth */}
              <div className="border border-slate-200 rounded-md p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="text-green-600 h-5 w-5" />
                  <h3 className="font-semibold text-lg">Leveraging Your Strength in Personal Growth</h3>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-sm inline-block mb-3">
                  Strength
                </div>
                
                <p className="text-slate-700 mb-4">
                  Your high score in Personal Growth indicates this is an area of strength. Consider these strategies to build on this foundation:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span className="text-slate-700">Set more challenging growth goals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span className="text-slate-700">Mentor others in their development journey</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span className="text-slate-700">Explore advanced opportunities in areas of interest</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add the dialog for adding new reflections */}
      <Dialog open={showReflectionDialog} onOpenChange={setShowReflectionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Dimension Reflection</DialogTitle>
            <DialogDescription>
              Record your thoughts and experiences related to a specific well-being dimension.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reflectionDimension">Choose Dimension</Label>
              <select
                id="reflectionDimension"
                value={reflectionDimension}
                onChange={(e) => setReflectionDimension(e.target.value)}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                {dimensions.map((dim) => (
                  <option key={dim} value={dim}>{dim}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reflectionMood">How are you feeling about this dimension?</Label>
              <div className="flex gap-4 mt-2">
                {["😔", "😐", "🙂", "😊", "😄"].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setReflectionMood(mood)}
                    className={`text-2xl p-2 rounded-full ${reflectionMood === mood ? "bg-blue-100" : ""}`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reflectionText">Your Reflection</Label>
              <Textarea
                id="reflectionText"
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Share your thoughts, challenges, or progress on this dimension..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReflectionDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitReflection}>Save Reflection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add the dialog for adding new goals */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Dimension Goal</DialogTitle>
            <DialogDescription>
              Create a new goal to improve a specific well-being dimension.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goalDimension">Choose Dimension</Label>
              <select
                id="goalDimension"
                value={goalDimension}
                onChange={(e) => setGoalDimension(e.target.value)}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                {dimensions.map((dim) => (
                  <option key={dim} value={dim}>{dim}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goalTitle">Goal Description</Label>
              <Input
                id="goalTitle"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="e.g., Practice mindfulness for 10 minutes daily"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goalDueDate">Due Date</Label>
              <div className="border rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={goalDueDate}
                  onSelect={setGoalDueDate}
                  initialFocus
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGoalDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitGoal}>Create Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 