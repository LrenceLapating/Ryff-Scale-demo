"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MessageSquare, AlertCircle, User, Brain, Heart, Search, Filter, BarChart, PieChart, Users, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { StudentDimensionAnalysis, DimensionDistributionGraph } from "@/components/dimension-analysis"

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
    dimensionAnalysis: {
      "Autonomy": {
        interpretation: "John shows moderate autonomy. He generally makes his own decisions but may sometimes be influenced by peer pressure or external expectations.",
        intervention: "Encourage John to engage in decision-making exercises where he can practice asserting his preferences and boundaries. Reflective journaling about personal values could help strengthen his internal compass."
      },
      "Environmental Mastery": {
        interpretation: "John demonstrates good environmental mastery, indicating he generally feels in control of his daily life and responsibilities.",
        intervention: "Support continued development by discussing time management strategies and encouraging him to take on leadership roles in group projects where he can apply his organizational skills."
      },
      "Personal Growth": {
        interpretation: "The lower score in Personal Growth indicates John may feel stagnant or uncertain about his development path. He might struggle to see improvement in himself over time.",
        intervention: "Help John create a personal development plan with incremental goals. Encourage him to explore new skills or activities and regularly reflect on his progress. Career counseling could help identify growth opportunities."
      },
      "Positive Relations": {
        interpretation: "John has relatively healthy relationships with others, showing he can maintain meaningful connections and navigate social situations adequately.",
        intervention: "Continue to develop John's interpersonal skills through collaborative activities. Consider role-playing exercises for challenging social scenarios to further enhance his relationship-building abilities."
      },
      "Purpose in Life": {
        interpretation: "The low score in Purpose in Life suggests John is experiencing difficulty finding meaning or direction. He may feel his daily activities lack significance or connection to long-term goals.",
        intervention: "Work with John to explore his values and interests through targeted exercises. Help him connect his current studies to future aspirations and identify meaningful volunteer or extracurricular opportunities that align with his values."
      },
      "Self-Acceptance": {
        interpretation: "John shows moderate self-acceptance. While not overly self-critical, he may still struggle with aspects of his past or certain personal characteristics.",
        intervention: "Introduce self-compassion exercises and cognitive reframing techniques to address negative self-talk. Encourage John to acknowledge his achievements and the positive aspects of his personality."
      }
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
    dimensionAnalysis: {
      "Autonomy": {
        interpretation: "Jane shows strong autonomy, indicating she is confident in making her own decisions regardless of social pressure.",
        intervention: "Continue to foster Jane's independence while encouraging her to consider different perspectives in complex situations, enhancing her already strong decision-making abilities."
      },
      "Environmental Mastery": {
        interpretation: "Jane's moderate score in Environmental Mastery suggests some difficulty managing daily demands and feeling in control of her environment.",
        intervention: "Work with Jane on practical organizational strategies and help her break down complex tasks into manageable steps. Guided practice in prioritization could improve her sense of control."
      },
      "Personal Growth": {
        interpretation: "Jane demonstrates a good sense of personal development and openness to new experiences, seeing herself as growing and evolving.",
        intervention: "Encourage Jane to continue pursuing new learning opportunities and set regular reflection points to acknowledge her progress and adjustments to her growth goals."
      },
      "Positive Relations": {
        interpretation: "Jane's lower score in Positive Relations indicates she may struggle with trust or intimacy in relationships, potentially feeling isolated.",
        intervention: "Consider social skills training focusing on active listening and empathy. Group activities that foster cooperation and trust-building exercises could help Jane develop stronger connections."
      },
      "Purpose in Life": {
        interpretation: "Jane has a relatively clear sense of direction and purpose, understanding how her current activities connect to meaningful goals.",
        intervention: "Help Jane articulate her life goals more specifically and create a vision board or timeline connecting her current activities to her long-term aspirations."
      },
      "Self-Acceptance": {
        interpretation: "Jane's low Self-Acceptance score suggests significant self-criticism and possibly dwelling on perceived personal shortcomings.",
        intervention: "Implement structured cognitive-behavioral techniques to address negative self-talk. Consider strength-identification exercises and daily positive self-affirmations to build a more balanced self-perspective."
      }
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
    dimensionAnalysis: {
      "Autonomy": {
        interpretation: "Mike demonstrates good autonomy in his decision-making and resists social pressures well.",
        intervention: "Encourage Mike to mentor others in assertiveness and independent thinking, which will reinforce his own autonomy while developing leadership skills."
      },
      "Environmental Mastery": {
        interpretation: "Mike shows strong environmental mastery, effectively managing his responsibilities and daily activities.",
        intervention: "Challenge Mike with increasingly complex project management opportunities that allow him to further develop his organizational abilities and adaptability."
      },
      "Personal Growth": {
        interpretation: "Mike sees himself as developing and growing, open to new experiences and recognizing his potential.",
        intervention: "Support Mike's continued growth by connecting him with advanced learning opportunities or specialized training in areas of interest. Encourage reflection on how new experiences reshape his perspective."
      },
      "Positive Relations": {
        interpretation: "Mike maintains positive relationships with others, showing empathy and the ability to form close connections.",
        intervention: "Provide opportunities for Mike to take on peer support roles where he can apply his interpersonal strengths while developing deeper understanding of complex relationship dynamics."
      },
      "Purpose in Life": {
        interpretation: "Mike has a strong sense of direction and meaning in life, with clear goals and a sense that his activities are purposeful.",
        intervention: "Help Mike articulate his longer-term vision and create specific milestones. Encourage him to consider how his purpose might evolve and adapt over time as he gains new experiences."
      },
      "Self-Acceptance": {
        interpretation: "Mike's very low self-acceptance score indicates significant negative feelings about himself, possibly perfectionism or harsh self-judgment.",
        intervention: "Implement intensive self-compassion training and cognitive restructuring techniques. Create regular opportunities for Mike to acknowledge his strengths and achievements. Consider referral for individual therapy focused on self-acceptance."
      }
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
    dimensionAnalysis: {
      "Autonomy": {
        interpretation: "Sarah demonstrates good autonomy in her decision-making and resists social pressures well.",
        intervention: "Encourage Sarah to mentor others in assertiveness and independent thinking, which will reinforce her own autonomy while developing leadership skills."
      },
      "Environmental Mastery": {
        interpretation: "Sarah shows strong environmental mastery, effectively managing her responsibilities and daily activities.",
        intervention: "Challenge Sarah with increasingly complex project management opportunities that allow her to further develop her organizational abilities and adaptability."
      },
      "Personal Growth": {
        interpretation: "Sarah sees herself as developing and growing, open to new experiences and recognizing her potential.",
        intervention: "Support Sarah's continued growth by connecting her with advanced learning opportunities or specialized training in areas of interest. Encourage reflection on how new experiences reshape her perspective."
      },
      "Positive Relations": {
        interpretation: "Sarah maintains positive relationships with others, showing empathy and the ability to form close connections.",
        intervention: "Provide opportunities for Sarah to take on peer support roles where she can apply her interpersonal strengths while developing deeper understanding of complex relationship dynamics."
      },
      "Purpose in Life": {
        interpretation: "Sarah has a strong sense of direction and meaning in life, with clear goals and a sense that her activities are purposeful.",
        intervention: "Help Sarah articulate her longer-term vision and create specific milestones. Encourage her to consider how her purpose might evolve and adapt over time as she gains new experiences."
      },
      "Self-Acceptance": {
        interpretation: "Sarah's moderate self-acceptance score indicates a generally positive self-image, but she may still struggle with aspects of her past or certain personal characteristics.",
        intervention: "Introduce self-compassion exercises and cognitive reframing techniques to address any negative self-talk. Encourage Sarah to acknowledge her strengths and the positive aspects of her personality."
      }
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
    dimensionAnalysis: {
      "Autonomy": {
        interpretation: "David demonstrates strong autonomy in his decision-making and resists social pressures well.",
        intervention: "Continue to foster David's independence while encouraging him to consider different perspectives in complex situations, enhancing his already strong decision-making abilities."
      },
      "Environmental Mastery": {
        interpretation: "David shows strong environmental mastery, effectively managing his responsibilities and daily activities.",
        intervention: "Challenge David with increasingly complex project management opportunities that allow him to further develop his organizational abilities and adaptability."
      },
      "Personal Growth": {
        interpretation: "David demonstrates a good sense of personal development and openness to new experiences, seeing himself as growing and evolving.",
        intervention: "Encourage David to continue pursuing new learning opportunities and set regular reflection points to acknowledge his progress and adjustments to his growth goals."
      },
      "Positive Relations": {
        interpretation: "David maintains positive relationships with others, showing empathy and the ability to form close connections.",
        intervention: "Provide opportunities for David to take on peer support roles where he can apply his interpersonal strengths while developing deeper understanding of complex relationship dynamics."
      },
      "Purpose in Life": {
        interpretation: "David has a strong sense of direction and meaning in life, with clear goals and a sense that his activities are purposeful.",
        intervention: "Help David articulate his longer-term vision and create specific milestones. Encourage him to consider how his purpose might evolve and adapt over time as he gains new experiences."
      },
      "Self-Acceptance": {
        interpretation: "David's high self-acceptance score indicates a positive self-image and a strong sense of self-worth.",
        intervention: "Continue to support David's self-acceptance by encouraging him to acknowledge and celebrate his achievements. Consider introducing self-care practices to maintain his overall well-being."
      }
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

// Department-level AI feedback data
const mockDepartmentFeedback = {
  "Information Technology": {
    id: "IT",
    name: "Information Technology",
    studentCount: 85,
    assessmentsTaken: 72,
    completionRate: 85,
    assessmentDate: "June 2024",
    averageScores: {
      overall: 62,
      dimensions: [
        { name: "Autonomy", score: 68 },
        { name: "Environmental Mastery", score: 65 },
        { name: "Personal Growth", score: 58 },
        { name: "Positive Relations", score: 64 },
        { name: "Purpose in Life", score: 61 },
        { name: "Self-Acceptance", score: 56 },
      ]
    },
    // Add response distribution data for each dimension
    dimensionDistributions: {
      "Autonomy": [5, 12, 15, 18, 14, 8], // Strongly Disagree to Strongly Agree
      "Environmental Mastery": [3, 8, 14, 22, 18, 7],
      "Personal Growth": [8, 15, 20, 16, 9, 4],
      "Positive Relations": [4, 9, 12, 20, 18, 9],
      "Purpose in Life": [6, 10, 15, 17, 16, 8],
      "Self-Acceptance": [10, 14, 18, 15, 10, 5]
    },
    // Add dimension-specific AI recommendations
    dimensionRecommendations: {
      "Autonomy": "IT students show moderate autonomy levels. Consider offering more opportunities for independent project work to strengthen decision-making confidence and reduce susceptibility to peer pressure.",
      "Environmental Mastery": "Environmental Mastery scores suggest students may benefit from better time management strategies and workload distribution techniques, especially for complex technical projects.",
      "Personal Growth": "The lower Personal Growth scores indicate students may benefit from clearly defined skill progression paths and recognition of incremental learning achievements in technology areas.",
      "Positive Relations": "While showing moderate scores, Positive Relations could be enhanced through more collaborative coding projects and peer programming activities to build communication skills.",
      "Purpose in Life": "Students would benefit from clearer connections between coursework and industry applications, with guest speakers from tech companies to illustrate career paths.",
      "Self-Acceptance": "The notably lower Self-Acceptance scores suggest implementing programming workshops that normalize the debugging process and embrace mistakes as learning opportunities."
    },
    riskDistribution: {
      high: 12,
      medium: 24,
      low: 36
    },
    aiFeedback: [
      {
        id: "df1",
        text: "The Information Technology department shows moderate overall well-being, with Self-Acceptance and Personal Growth emerging as the lowest scoring dimensions across students.",
        type: "analysis",
      },
      {
        id: "df2",
        text: "The department has a concerning number of high-risk students (17%), particularly concentrated in the 3rd and 4th year levels. Stress related to industry preparation and job placement may be contributing factors.",
        type: "recommendation",
      },
      {
        id: "df3",
        text: "Consider implementing department-wide workshops focused on self-compassion and personal development. Targeted interventions for graduating students regarding career preparation and transition may help address underlying anxiety.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    yearLevelInsights: "Fourth-year students show significantly lower scores in Purpose in Life compared to other year levels, suggesting potential career anxiety.",
    trendInsights: "Overall departmental well-being has decreased by 8% compared to the previous semester."
  },
  "Computer Science": {
    id: "CS",
    name: "Computer Science",
    studentCount: 68,
    assessmentsTaken: 61,
    completionRate: 90,
    assessmentDate: "June 2024",
    averageScores: {
      overall: 59,
      dimensions: [
        { name: "Autonomy", score: 64 },
        { name: "Environmental Mastery", score: 55 },
        { name: "Personal Growth", score: 67 },
        { name: "Positive Relations", score: 52 },
        { name: "Purpose in Life", score: 65 },
        { name: "Self-Acceptance", score: 51 },
      ]
    },
    // Add response distribution data for each dimension
    dimensionDistributions: {
      "Autonomy": [6, 10, 14, 16, 10, 5], // Strongly Disagree to Strongly Agree
      "Environmental Mastery": [10, 15, 18, 10, 6, 2],
      "Personal Growth": [4, 8, 10, 15, 14, 10],
      "Positive Relations": [12, 16, 14, 10, 6, 3],
      "Purpose in Life": [5, 8, 10, 15, 13, 10],
      "Self-Acceptance": [13, 15, 16, 10, 5, 2]
    },
    // Add dimension-specific AI recommendations
    dimensionRecommendations: {
      "Autonomy": "Computer Science students would benefit from more independent study options and greater agency in choosing project topics to strengthen autonomy.",
      "Environmental Mastery": "The lower Environmental Mastery scores suggest a need for structured workload planning sessions and stress management techniques specific to programming challenges.",
      "Personal Growth": "While Personal Growth is a relative strength, continue fostering it through advanced topic workshops and student-led tech talks to maintain momentum.",
      "Positive Relations": "The concerning Positive Relations scores indicate a need for deliberate team-building activities and collaborative projects with defined communication protocols.",
      "Purpose in Life": "Consider incorporating more real-world applications and industry problems into coursework to strengthen students' sense of purpose.",
      "Self-Acceptance": "To address the low Self-Acceptance scores, implement programming competitions that emphasize personal improvement rather than comparative performance."
    },
    riskDistribution: {
      high: 15,
      medium: 28,
      low: 18
    },
    aiFeedback: [
      {
        id: "df1",
        text: "Computer Science students demonstrate notable challenges in Positive Relations and Self-Acceptance dimensions, which may reflect the competitive academic environment.",
        type: "analysis",
      },
      {
        id: "df2",
        text: "Environmental Mastery scores suggest students might be struggling with workload management and feeling overwhelmed by academic demands. This is especially pronounced in sophomore and junior students.",
        type: "recommendation",
      },
      {
        id: "df3",
        text: "Department-wide initiatives to foster collaboration rather than competition could improve the social dynamics. Consider implementing peer mentoring programs and time management workshops to address Environmental Mastery concerns.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    yearLevelInsights: "Second-year students show the highest risk levels, possibly indicating difficulties adjusting to more advanced coursework.",
    trendInsights: "While overall scores decreased slightly, Personal Growth scores have improved compared to previous assessments."
  },
  "Engineering": {
    id: "ENG",
    name: "Engineering",
    studentCount: 112,
    assessmentsTaken: 93,
    completionRate: 83,
    assessmentDate: "June 2024",
    averageScores: {
      overall: 66,
      dimensions: [
        { name: "Autonomy", score: 68 },
        { name: "Environmental Mastery", score: 61 },
        { name: "Personal Growth", score: 72 },
        { name: "Positive Relations", score: 63 },
        { name: "Purpose in Life", score: 74 },
        { name: "Self-Acceptance", score: 58 },
      ]
    },
    // Add response distribution data for each dimension
    dimensionDistributions: {
      "Autonomy": [4, 8, 15, 25, 28, 13], // Strongly Disagree to Strongly Agree
      "Environmental Mastery": [7, 13, 20, 25, 18, 10],
      "Personal Growth": [2, 6, 12, 25, 30, 18],
      "Positive Relations": [5, 10, 18, 28, 20, 12],
      "Purpose in Life": [2, 5, 12, 22, 32, 20],
      "Self-Acceptance": [10, 16, 22, 25, 12, 8]
    },
    // Add dimension-specific AI recommendations
    dimensionRecommendations: {
      "Autonomy": "Engineering students show good autonomy, but could benefit from additional self-directed learning opportunities in upper-level courses.",
      "Environmental Mastery": "To improve Environmental Mastery, consider workshops on managing complex engineering projects and balancing multiple technical requirements.",
      "Personal Growth": "Personal Growth is a strength area. Continue supporting this through advanced workshops and opportunities to apply engineering skills to novel problems.",
      "Positive Relations": "While generally positive, team dynamics could be further enhanced through structured peer reviews and collaborative design challenges.",
      "Purpose in Life": "Purpose in Life scores are strong, reflecting clear career paths. Further strengthen this by connecting coursework to societal impact and sustainability goals.",
      "Self-Acceptance": "To address lower Self-Acceptance scores, implement discussions about engineering failures as learning experiences and normalize the iterative design process."
    },
    riskDistribution: {
      high: 8,
      medium: 31,
      low: 54
    },
    aiFeedback: [
      {
        id: "df1",
        text: "Engineering students generally show strong Purpose in Life and Personal Growth scores, reflecting clear career paths and practical skill development inherent to the program.",
        type: "analysis",
      },
      {
        id: "df2",
        text: "Self-Acceptance remains the lowest dimension, potentially indicating perfectionism and high self-expectations common in engineering disciplines. Environmental Mastery scores suggest possible workload challenges.",
        type: "recommendation",
      },
      {
        id: "df3",
        text: "Consider developing department initiatives focused on work-life balance and healthy perfectionism. Creating opportunities for students to reflect on and celebrate incremental achievements may help improve Self-Acceptance.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    yearLevelInsights: "Third-year students show notable decreases in Environmental Mastery, likely corresponding with increased project complexity.",
    trendInsights: "Overall department well-being has remained relatively stable compared to previous assessments."
  }
}

// Define the types for our department data structure
type DimensionName = "Autonomy" | "Environmental Mastery" | "Personal Growth" | "Positive Relations" | "Purpose in Life" | "Self-Acceptance";

interface DimensionAnalysis {
  interpretation: string;
  intervention: string;
}

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

interface AIFeedbackProps {
  studentId?: string;
  onBack?: () => void;
}

export function AIFeedback({ studentId, onBack }: AIFeedbackProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
  const [selectedRiskStudent, setSelectedRiskStudent] = useState<string | undefined>(undefined)
  const [viewMode, setViewMode] = useState<"departments" | "department" | "atRiskStudents" | "studentDetail">("departments")
  const [counselorNotes, setCounselorNotes] = useState("")
  const [feedbackToSend, setFeedbackToSend] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [riskLevelFilter, setRiskLevelFilter] = useState("all")
  
  // Convert object to array for filtering
  const departmentsArray = Object.values(mockDepartmentFeedback) as DepartmentFeedback[]
  
  // Apply filters
  const filteredDepartments = departmentsArray.filter(department => {
    const matchesSearch = department.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Determine risk level based on high-risk percentage
    const highRiskPercentage = (department.riskDistribution.high / department.assessmentsTaken) * 100
    let departmentRiskLevel = "low"
    if (highRiskPercentage >= 20) {
      departmentRiskLevel = "high"
    } else if (highRiskPercentage >= 10) {
      departmentRiskLevel = "medium"
    }
    
    const matchesRiskLevel = riskLevelFilter === "all" || departmentRiskLevel === riskLevelFilter
    
    return matchesSearch && matchesRiskLevel
  })
  
  // Get the current department data based on selectedDepartment
  const currentDepartment = selectedDepartment ? mockDepartmentFeedback[selectedDepartment as keyof typeof mockDepartmentFeedback] as DepartmentFeedback : undefined
  
  // Get at-risk students for the current department
  const atRiskStudents = useMemo(() => {
    if (!currentDepartment) return [];
    
    return Object.values(mockStudentFeedback)
      .filter(student => 
        student.department === currentDepartment.name && 
        (student.riskLevel === "high" || student.riskLevel === "medium")
      )
      .sort((a, b) => {
        // Sort by risk level (high first)
        if (a.riskLevel === "high" && b.riskLevel !== "high") return -1;
        if (a.riskLevel !== "high" && b.riskLevel === "high") return 1;
        
        // Then by overall score (lowest first)
        return a.assessment.overallScore - b.assessment.overallScore;
      });
  }, [currentDepartment]);

  // Get selected student data
  const selectedStudent = selectedRiskStudent ? mockStudentFeedback[selectedRiskStudent as keyof typeof mockStudentFeedback] : undefined;
  
  // Update counselor notes when department changes
  useEffect(() => {
    if (currentDepartment) {
      setCounselorNotes(currentDepartment.counselorNotes)
    }
  }, [currentDepartment])
  
  const handleSaveNotes = () => {
    // In a real application, this would save to a database
    if (currentDepartment) {
      // Here we're just updating our mock data
      mockDepartmentFeedback[currentDepartment.name as keyof typeof mockDepartmentFeedback].counselorNotes = counselorNotes
      alert("Notes saved successfully")
    }
  }
  
  const handleSendFeedback = () => {
    if (feedbackToSend.trim()) {
      // In a real application, this would send the feedback to department heads
      alert(`Feedback sent to ${currentDepartment?.name} department heads`)
      setFeedbackToSend("")
    }
  }

  const getScoreColor = (score: number) => {
    if (score < 50) return "text-destructive"
    if (score < 70) return "text-yellow-600"
    return "text-green-600"
  }

  const getRiskBadge = (department: any) => {
    const highRiskPercentage = (department.riskDistribution.high / department.assessmentsTaken) * 100
    
    if (highRiskPercentage >= 20) {
      return <Badge variant="destructive">High Risk</Badge>
    } else if (highRiskPercentage >= 10) {
      return <Badge variant="secondary">Medium Risk</Badge>
    } else {
      return <Badge variant="outline">Low Risk</Badge>
    }
  }
  
  const getStudentRiskBadge = (risk: string) => {
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

  const handleSelectDepartment = (id: string) => {
    setSelectedDepartment(id)
    setSelectedRiskStudent(undefined)
    setViewMode("department")
  }
  
  const handleSelectRiskStudent = (id: string) => {
    setSelectedRiskStudent(id)
    setViewMode("studentDetail")
  }
  
  const handleViewAtRiskStudents = () => {
    setViewMode("atRiskStudents")
  }
  
  const handleBackToDepartment = () => {
    setViewMode("department")
    setSelectedRiskStudent(undefined)
  }

  const handleBackToDepartments = () => {
    setViewMode("departments")
    setSelectedDepartment(undefined)
    setSelectedRiskStudent(undefined)
  }

  const handleBackToStudentList = () => {
    setViewMode("atRiskStudents")
    setSelectedRiskStudent(undefined)
  }

  // If no department is selected, show the department list
  if (viewMode === "departments") {
    // Department list view code (unchanged)
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
            <CardTitle>Department AI Feedback</CardTitle>
            <CardDescription>
              Review AI-generated feedback and insights for academic departments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by department name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            
            {/* Department List */}
            {filteredDepartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredDepartments.map((department) => {
                  const highRiskPercentage = (department.riskDistribution.high / department.assessmentsTaken) * 100
                  let borderClass = ""
                  
                  if (highRiskPercentage >= 20) {
                    borderClass = "border-destructive/50"
                  } else if (highRiskPercentage >= 10) {
                    borderClass = "border-yellow-500/50"
                  }
                  
                  return (
                    <Card key={department.id} className={cn(
                      "cursor-pointer hover:border-primary transition-colors",
                      borderClass
                    )}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{department.name}</CardTitle>
                              <CardDescription>{department.studentCount} students</CardDescription>
                            </div>
                          </div>
                          {getRiskBadge(department)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Assessment Date:</span>
                            <span>{department.assessmentDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Completion Rate:</span>
                            <span>{department.completionRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Overall Score:</span>
                            <span className={getScoreColor(department.averageScores.overall)}>
                              {department.averageScores.overall}
                            </span>
                          </div>
                          <div className="mt-2 pt-2 border-t flex justify-between">
                            <span className="text-muted-foreground">Risk Distribution:</span>
                            <div className="flex gap-2">
                              <span className="text-destructive">{department.riskDistribution.high} high</span>
                              <span className="text-yellow-600">{department.riskDistribution.medium} med</span>
                              <span className="text-green-600">{department.riskDistribution.low} low</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="secondary" 
                          className="w-full" 
                          onClick={() => handleSelectDepartment(department.name)}
                        >
                          View Feedback
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Departments Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // If at-risk students view is selected
  if (viewMode === "atRiskStudents" && currentDepartment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBackToDepartment}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">At-Risk Students - {currentDepartment.name}</h1>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Students Requiring Attention
              </CardTitle>
              <Badge variant={atRiskStudents.length > 0 ? "secondary" : "outline"}>
                {atRiskStudents.length} students
              </Badge>
            </div>
            <CardDescription>
              Students with medium or high risk levels based on their assessment scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            {atRiskStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Section
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Level
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Overall Score
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Key Concern
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4">
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {atRiskStudents.map((student) => {
                          // Find the lowest scoring dimension
                          const lowestDimension = [...student.assessment.dimensions].sort((a, b) => a.score - b.score)[0];
                          
                          return (
                            <tr key={student.id} className="hover:bg-gray-50">
                              <td className="py-4 pl-4 pr-3 text-sm">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={student.photo} alt={student.name} />
                                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">{student.name}</div>
                                    <div className="text-gray-500">{student.class}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-4 text-sm text-gray-500">
                                {student.class}
                              </td>
                              <td className="px-3 py-4 text-sm">
                                {getStudentRiskBadge(student.riskLevel)}
                              </td>
                              <td className="px-3 py-4 text-sm">
                                <span className={getScoreColor(student.assessment.overallScore)}>
                                  {student.assessment.overallScore}
                                </span>
                              </td>
                              <td className="px-3 py-4 text-sm text-gray-500">
                                <span className="text-destructive font-medium">
                                  {lowestDimension.name}: {lowestDimension.score}
                                </span>
                              </td>
                              <td className="py-4 pl-3 pr-4 text-right text-sm font-medium">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleSelectRiskStudent(student.id)}
                                >
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No at-risk students found in this department</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleBackToDepartment}>
              Back to Department Analysis
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // If a risk student is selected, show student details
  if (viewMode === "studentDetail" && selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBackToStudentList}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Student Assessment Details</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={selectedStudent.photo} alt={selectedStudent.name} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
              <p className="text-muted-foreground">{selectedStudent.class}</p>
              <div className="mt-2">
                {getStudentRiskBadge(selectedStudent.riskLevel)}
              </div>
              
              <Separator className="my-4" />
              
              <div className="w-full">
                <h4 className="font-semibold mb-2">Assessment Results</h4>
                <p className="text-sm text-muted-foreground mb-2">{selectedStudent.assessment.title}</p>
                <p className="text-sm text-muted-foreground mb-4">Completed: {selectedStudent.assessment.completedDate}</p>
                
                <div className="space-y-2">
                  {selectedStudent.assessment.dimensions.map((dim) => (
                    <div key={dim.name} className="flex justify-between items-center">
                      <span className="text-sm">{dim.name}</span>
                      <span className={`font-semibold ${getScoreColor(dim.score)}`}>{dim.score}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Overall</span>
                    <span className={`font-semibold ${getScoreColor(selectedStudent.assessment.overallScore)}`}>
                      {selectedStudent.assessment.overallScore}
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
        
        {/* Dimension Analysis Section - New addition */}
        <div>
          <h2 className="text-xl font-bold mb-4">Dimension Analysis</h2>
          <div className="grid grid-cols-1 gap-6">
            {selectedStudent.assessment.dimensions.map((dimension) => {
              // Cast dimension name to DimensionName to ensure type safety
              const dimName = dimension.name as DimensionName;
              return (
                <StudentDimensionAnalysis
                  key={dimension.name}
                  dimensionName={dimension.name}
                  score={dimension.score}
                  analysis={selectedStudent.dimensionAnalysis[dimName]}
                />
              );
            })}
          </div>
        </div>
        
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
        </CardContent>
      </Card>
    </div>
  )
} 