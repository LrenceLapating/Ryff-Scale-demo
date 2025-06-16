"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MessageSquare, AlertCircle, User, Brain, Heart, Search, Filter, BarChart, PieChart, Users, Plus, ArrowRight, Edit, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DimensionAnalysis } from "@/components/dimension-analysis"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
    department: "CCS",
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
    department: "CCS",
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
    department: "CCS",
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
    department: "CCS",
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
    department: "CCS",
  }
}

// Department-level AI feedback data
const mockDepartmentFeedback = {
  "CCS": {
    id: "CCS",
    name: "CCS",
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
  "CN": {
    id: "CN",
    name: "CN",
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
  "COE": {
    id: "COE",
    name: "COE",
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
  },
  "CBA": {
    id: "CBA",
    name: "CBA",
    studentCount: 95,
    assessmentsTaken: 82,
    completionRate: 86,
    assessmentDate: "June 2024",
    averageScores: {
      overall: 64,
      dimensions: [
        { name: "Autonomy", score: 66 },
        { name: "Environmental Mastery", score: 63 },
        { name: "Personal Growth", score: 69 },
        { name: "Positive Relations", score: 67 },
        { name: "Purpose in Life", score: 70 },
        { name: "Self-Acceptance", score: 55 },
      ]
    },
    dimensionDistributions: {
      "Autonomy": [5, 10, 16, 22, 18, 11],
      "Environmental Mastery": [6, 12, 18, 20, 16, 10],
      "Personal Growth": [3, 8, 14, 20, 22, 15],
      "Positive Relations": [4, 9, 15, 21, 20, 13],
      "Purpose in Life": [3, 7, 13, 22, 23, 14],
      "Self-Acceptance": [9, 15, 20, 18, 12, 8]
    },
    dimensionRecommendations: {
      "Autonomy": "CBA students show good autonomy levels but could benefit from more opportunities to apply business decision-making in real-world contexts.",
      "Environmental Mastery": "Consider implementing time management workshops specific to business project management to improve Environmental Mastery scores.",
      "Personal Growth": "Personal Growth is a strength area. Continue supporting this through industry mentorship programs and professional development opportunities.",
      "Positive Relations": "While generally positive, relationship-building could be enhanced through more structured networking events and collaborative business projects.",
      "Purpose in Life": "Purpose in Life scores are strong, reflecting clear career paths. Further strengthen this by connecting coursework to real business impact.",
      "Self-Acceptance": "To address lower Self-Acceptance scores, implement reflective practices that focus on personal growth rather than comparative achievement."
    },
    riskDistribution: {
      high: 10,
      medium: 27,
      low: 45
    },
    aiFeedback: [
      {
        id: "df1",
        text: "CBA students show good overall well-being, with Self-Acceptance emerging as the primary area of concern across the department.",
        type: "analysis",
      },
      {
        id: "df2",
        text: "The competitive nature of business education may be contributing to self-criticism and perfectionism among students, particularly in upper years.",
        type: "recommendation",
      },
      {
        id: "df3",
        text: "Consider implementing workshops on healthy achievement orientation and developing a growth mindset. Peer mentoring programs could also help address these concerns.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    yearLevelInsights: "Third and fourth-year students show increased concerns about Purpose in Life, possibly related to job market anxiety.",
    trendInsights: "Overall scores have remained stable, with slight improvements in Personal Growth compared to previous assessments."
  },
  "CAS": {
    id: "CAS",
    name: "CAS",
    studentCount: 78,
    assessmentsTaken: 65,
    completionRate: 83,
    assessmentDate: "June 2024",
    averageScores: {
      overall: 67,
      dimensions: [
        { name: "Autonomy", score: 70 },
        { name: "Environmental Mastery", score: 62 },
        { name: "Personal Growth", score: 74 },
        { name: "Positive Relations", score: 69 },
        { name: "Purpose in Life", score: 65 },
        { name: "Self-Acceptance", score: 62 },
      ]
    },
    dimensionDistributions: {
      "Autonomy": [4, 8, 12, 19, 20, 12],
      "Environmental Mastery": [7, 13, 17, 18, 14, 6],
      "Personal Growth": [2, 6, 10, 18, 24, 15],
      "Positive Relations": [3, 7, 12, 20, 18, 15],
      "Purpose in Life": [5, 10, 15, 18, 16, 11],
      "Self-Acceptance": [6, 12, 16, 19, 14, 8]
    },
    dimensionRecommendations: {
      "Autonomy": "CAS students demonstrate strong autonomy. Continue fostering this through independent research projects and creative expression opportunities.",
      "Environmental Mastery": "Environmental Mastery could be improved through workshops on balancing academic demands with creative pursuits and personal responsibilities.",
      "Personal Growth": "Personal Growth is a significant strength. Continue supporting this through interdisciplinary learning opportunities and exposure to diverse perspectives.",
      "Positive Relations": "Positive Relations scores are good. Further enhance through collaborative arts projects and structured peer feedback sessions.",
      "Purpose in Life": "While generally positive, some students may benefit from clearer connections between their studies and future career paths in arts and sciences.",
      "Self-Acceptance": "Self-Acceptance could be improved through reflective practices that emphasize the value of diverse talents and perspectives."
    },
    riskDistribution: {
      high: 7,
      medium: 22,
      low: 36
    },
    aiFeedback: [
      {
        id: "df1",
        text: "CAS students show strong overall well-being, with particularly high scores in Personal Growth and Autonomy, reflecting the creative and exploratory nature of their programs.",
        type: "analysis",
      },
      {
        id: "df2",
        text: "Environmental Mastery and Purpose in Life show slightly lower scores, suggesting some students may struggle with balancing diverse academic demands or connecting studies to career paths.",
        type: "recommendation",
      },
      {
        id: "df3",
        text: "Consider implementing structured career exploration workshops that highlight diverse paths for arts and sciences graduates, as well as time management strategies specific to creative and research pursuits.",
        type: "suggestion",
      }
    ],
    counselorNotes: "",
    yearLevelInsights: "First-year students show notably lower Environmental Mastery scores, suggesting adjustment challenges to university-level workload.",
    trendInsights: "Personal Growth scores have shown consistent improvement over the past three assessment periods."
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

interface GuidanceFeedbackProps {
  studentId?: string;
  department?: string;
  onBack?: () => void;
}

export function GuidanceFeedback({ studentId, department, onBack }: GuidanceFeedbackProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
  const [selectedRiskStudent, setSelectedRiskStudent] = useState<string | undefined>(undefined)
  const [viewMode, setViewMode] = useState<"departments" | "department" | "atRiskStudents" | "studentDetail">("departments")
  const [counselorNotes, setCounselorNotes] = useState("")
  const [feedbackToSend, setFeedbackToSend] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [riskLevelFilter, setRiskLevelFilter] = useState("all")
  const [selectedDimension, setSelectedDimension] = useState<DimensionName | null>(null)
  const [dimensionDialogOpen, setDimensionDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("analysis")
  
  // New state for managing edited interventions
  const [editedGeneralSteps, setEditedGeneralSteps] = useState<string[]>([])
  const [editedDimensionContent, setEditedDimensionContent] = useState<Record<string, {
    description: string;
    strategies: string[];
  }>>({})
  const [deselectedDimensions, setDeselectedDimensions] = useState<string[]>([])
  const [sendToStudentDialogOpen, setSendToStudentDialogOpen] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editedDescription, setEditedDescription] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [currentEditingDimension, setCurrentEditingDimension] = useState<{
    name: string;
    description: string;
    strategies: string[];
  } | null>(null)
  const [editingOverallStrategy, setEditingOverallStrategy] = useState(false)
  const [isOverallStrategyDeselected, setIsOverallStrategyDeselected] = useState(false)

  // Add useEffect to handle department parameter when component mounts
  useEffect(() => {
    // If studentId is provided, immediately set to student detail view
    if (studentId) {
      // Handle specific case for Mike Johnson
      if (studentId === "ST12347") {
        setSelectedRiskStudent("3"); // Mike Johnson's ID in mockStudentFeedback
        setViewMode("studentDetail");
        
        // Also set department if available
        if (department) {
          const departmentKey = Object.keys(mockDepartmentFeedback).find(
            key => key === department || mockDepartmentFeedback[key as keyof typeof mockDepartmentFeedback].name === department
          );
          if (departmentKey) {
            setSelectedDepartment(departmentKey);
          }
        }
        return;
      }
      
      // For other students, find by studentId
      const studentKey = Object.keys(mockStudentFeedback).find(key => {
        const student = mockStudentFeedback[key as keyof typeof mockStudentFeedback];
        // Check only the id property since studentId doesn't exist in the mockStudentFeedback objects
        return student.id === studentId;
      });
      
      if (studentKey) {
        setSelectedRiskStudent(studentKey);
        setViewMode("studentDetail");
        
        // Also set department if available
        if (department) {
          const departmentKey = Object.keys(mockDepartmentFeedback).find(
            key => key === department || mockDepartmentFeedback[key as keyof typeof mockDepartmentFeedback].name === department
          );
          if (departmentKey) {
            setSelectedDepartment(departmentKey);
          }
        }
        return;
      }
    }
    
    // Only proceed with department handling if no student was found
    if (department) {
      const departmentKey = Object.keys(mockDepartmentFeedback).find(
        key => key === department || mockDepartmentFeedback[key as keyof typeof mockDepartmentFeedback].name === department
      );
      
      if (departmentKey) {
        setSelectedDepartment(departmentKey);
        setViewMode("department");
      }
    }
  }, [department, studentId]);

  // Function to handle editing general steps
  const handleEditGeneralStep = (index: number, newText: string) => {
    const newSteps = [...(editedGeneralSteps.length > 0 ? editedGeneralSteps : personalizedInterventions.general[0].steps)]
    newSteps[index] = newText
    setEditedGeneralSteps(newSteps)
  }

  // Function to handle editing overall strategy
  const handleEditOverallStrategy = () => {
    setEditingOverallStrategy(true)
    setCurrentEditingDimension({
      name: "Overall Wellbeing Strategy",
      description: editedDescription || personalizedInterventions.general[0].description,
      strategies: editedGeneralSteps.length > 0 ? editedGeneralSteps : personalizedInterventions.general[0].steps
    })
    setEditModalOpen(true)
  }

  // Function to handle dimension deselection
  const handleToggleDimension = (dimensionName: string) => {
    setDeselectedDimensions(prev => {
      if (prev.includes(dimensionName)) {
        return prev.filter(d => d !== dimensionName)
      } else {
        return [...prev, dimensionName]
      }
    })
  }

  // Function to open edit modal for a dimension
  const handleEditDimension = (dimension: any) => {
    setCurrentEditingDimension({
      name: dimension.dimension,
      description: editedDimensionContent[dimension.dimension]?.description || dimension.description,
      strategies: editedDimensionContent[dimension.dimension]?.strategies || dimension.strategies
    })
    setEditModalOpen(true)
  }

  // Function to save edited dimension content
  const handleSaveEdit = () => {
    if (currentEditingDimension) {
      if (editingOverallStrategy) {
        setEditedDescription(currentEditingDimension.description)
        setEditedGeneralSteps(currentEditingDimension.strategies)
        setEditingOverallStrategy(false)
      } else {
        setEditedDimensionContent(prev => ({
          ...prev,
          [currentEditingDimension.name]: {
            description: currentEditingDimension.description,
            strategies: currentEditingDimension.strategies
          }
        }))
      }
      setEditModalOpen(false)
      setCurrentEditingDimension(null)
    }
  }

  // Function to handle sending to student
  const handleSendToStudent = () => {
    // In a real application, this would send the edited interventions to the student
    alert(`Interventions sent to ${selectedStudent?.name}`)
    setSendToStudentDialogOpen(false)
  }

  // Function to get strategies for a dimension (either edited or original)
  const getStrategiesForDimension = (dimensionName: string) => {
    return editedDimensionContent[dimensionName]?.strategies || 
      personalizedInterventions.dimensionSpecific.find(d => d.dimension === dimensionName)?.strategies || []
  }

  // Function to check if a strategy is deselected
  const isStrategyDeselected = (dimensionName: string, index: number) => {
    return (deselectedDimensions.includes(dimensionName))
  }
  
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
  
  // Create personalized intervention strategies based on dimension scores
  const getPersonalizedInterventions = (student: any) => {
    if (!student) return {
      general: [{
        title: "No data available",
        description: "Student data is not available.",
        steps: ["Please select a student to view personalized interventions."]
      }],
      dimensionSpecific: []
    };
    
    // Find the lowest and highest scoring dimensions
    const dimensions = [...student.assessment.dimensions];
    const lowestDimension = dimensions.sort((a, b) => a.score - b.score)[0];
    const highestDimension = dimensions.sort((a, b) => b.score - a.score)[0];
    
    // Generate personalized strategies based on scores
    const interventions = {
      general: [
        {
          title: "Overall Wellbeing Strategy",
          description: `Based on your assessment profile, focusing on building ${lowestDimension.name.toLowerCase()} while leveraging your strength in ${highestDimension.name.toLowerCase()} could significantly improve your overall psychological wellbeing.`,
          steps: [
            "Schedule a one-on-one session with your counselor to discuss your assessment results",
            "Set specific, measurable goals related to your areas of improvement",
            "Track your progress weekly using the reflection journal provided by your counselor"
          ]
        }
      ],
      dimensionSpecific: dimensions.map(dim => {
        let strategies;
        
        if (dim.score < 50) {
          // Low score interventions
          switch (dim.name) {
            case "Autonomy":
              strategies = [
                "Practice making small decisions independently each day",
                "Identify and challenge thoughts about needing others' approval",
                "Set boundaries in one relationship where you tend to defer to others"
              ];
              break;
            case "Environmental Mastery":
              strategies = [
                "Break down overwhelming tasks into smaller, manageable steps",
                "Create a structured daily routine with built-in flexibility",
                "Practice time management techniques like the Pomodoro method"
              ];
              break;
            case "Personal Growth":
              strategies = [
                "Try one new activity each week that challenges your comfort zone",
                "Keep a growth journal to document new skills and experiences",
                "Set learning goals rather than performance goals"
              ];
              break;
            case "Positive Relations":
              strategies = [
                "Practice active listening techniques in your conversations",
                "Schedule regular check-ins with friends or family members",
                "Join a student group or club aligned with your interests"
              ];
              break;
            case "Purpose in Life":
              strategies = [
                "Explore your values through guided reflection exercises",
                "Connect your daily activities to longer-term goals",
                "Volunteer for causes that feel meaningful to you"
              ];
              break;
            case "Self-Acceptance":
              strategies = [
                "Practice daily self-compassion exercises",
                "Challenge negative self-talk with evidence-based alternatives",
                "Create a list of your strengths and review it regularly"
              ];
              break;
            default:
              strategies = ["Discuss this dimension with your counselor"];
          }
          
          return {
            dimension: dim.name,
            score: dim.score,
            status: "Needs attention",
            title: `Building ${dim.name}`,
            description: `Your score in ${dim.name} indicates an opportunity for growth. These strategies can help strengthen this dimension:`,
            strategies
          };
        } else if (dim.score < 70) {
          // Moderate score interventions
          switch (dim.name) {
            case "Autonomy":
              strategies = [
                "Reflect on instances where you successfully asserted your values",
                "Practice respectfully disagreeing in low-stakes situations",
                "Identify one area where you can make more independent choices"
              ];
              break;
            case "Environmental Mastery":
              strategies = [
                "Enhance your organizational systems for managing responsibilities",
                "Practice problem-solving techniques for recurring challenges",
                "Set boundaries around commitments to prevent overwhelm"
              ];
              break;
            case "Personal Growth":
              strategies = [
                "Identify skills you'd like to develop further",
                "Seek feedback on areas where you can grow",
                "Create a personal development plan with short and long-term goals"
              ];
              break;
            case "Positive Relations":
              strategies = [
                "Deepen existing relationships through more meaningful conversations",
                "Practice expressing appreciation to others regularly",
                "Work on conflict resolution skills"
              ];
              break;
            case "Purpose in Life":
              strategies = [
                "Clarify how your current path aligns with your values",
                "Set meaningful goals for the next semester",
                "Explore how your strengths can contribute to causes you care about"
              ];
              break;
            case "Self-Acceptance":
              strategies = [
                "Practice acknowledging both strengths and areas for growth",
                "Develop a more balanced perspective on past mistakes",
                "Celebrate small wins and progress"
              ];
              break;
            default:
              strategies = ["Discuss this dimension with your counselor"];
          }
          
          return {
            dimension: dim.name,
            score: dim.score,
            status: "Moderate",
            title: `Enhancing ${dim.name}`,
            description: `Your score in ${dim.name} shows a moderate level. These strategies can help strengthen this dimension further:`,
            strategies
          };
        } else {
          // High score interventions (strengths)
          switch (dim.name) {
            case "Autonomy":
              strategies = [
                "Mentor others in developing their autonomy",
                "Use your independent thinking as a strength in group projects",
                "Continue practicing assertive communication"
              ];
              break;
            case "Environmental Mastery":
              strategies = [
                "Share your organizational techniques with peers",
                "Take on leadership roles that utilize this strength",
                "Apply your skills to increasingly complex challenges"
              ];
              break;
            case "Personal Growth":
              strategies = [
                "Set more challenging growth goals",
                "Mentor others in their development journey",
                "Explore advanced opportunities in areas of interest"
              ];
              break;
            case "Positive Relations":
              strategies = [
                "Deepen your understanding of relationship dynamics",
                "Consider peer support or mentoring roles",
                "Share your interpersonal skills through leadership opportunities"
              ];
              break;
            case "Purpose in Life":
              strategies = [
                "Refine your long-term vision and goals",
                "Help others connect with their sense of purpose",
                "Explore how to align your purpose with career aspirations"
              ];
              break;
            case "Self-Acceptance":
              strategies = [
                "Share your journey toward self-acceptance with others",
                "Practice maintaining self-compassion during challenges",
                "Use your self-awareness as a foundation for continued growth"
              ];
              break;
            default:
              strategies = ["Leverage this strength in your daily activities"];
          }
          
          return {
            dimension: dim.name,
            score: dim.score,
            status: "Strength",
            title: `Leveraging Your Strength in ${dim.name}`,
            description: `Your high score in ${dim.name} indicates this is an area of strength. Consider these strategies to build on this foundation:`,
            strategies
          };
        }
      })
    };
    
    return interventions;
  };

  // Generate personalized interventions for the current student
  const personalizedInterventions = useMemo(() => {
    return getPersonalizedInterventions(selectedStudent);
  }, [selectedStudent]);
  
  // Mock data for student dimension questions and responses
  const studentDimensionData = useMemo(() => {
    // Create mock data for each dimension with questions and responses
    const dimensions: Record<DimensionName, any> = {
      "Autonomy": {
        questions: [
          { id: 1, text: "I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people", score: 4 },
          { id: 2, text: "My decisions are not usually influenced by what everyone else is doing", score: 3 },
          { id: 3, text: "I have confidence in my opinions, even if they are contrary to the general consensus", score: 5 },
          { id: 4, text: "I tend to worry about what other people think of me", score: 2 },
          { id: 5, text: "Being happy with myself is more important to me than having others approve of me", score: 4 },
          { id: 6, text: "I tend to be influenced by people with strong opinions", score: 3 },
          { id: 7, text: "People rarely talk me into doing things I don't want to do", score: 4 }
        ],
        description: "Independence and self-determination in making decisions and regulating behavior."
      },
      "Environmental Mastery": {
        questions: [
          { id: 1, text: "In general, I feel I am in charge of the situation in which I live", score: 5 },
          { id: 2, text: "The demands of everyday life often get me down", score: 3 },
          { id: 3, text: "I am quite good at managing the many responsibilities of my daily life", score: 4 },
          { id: 4, text: "I often feel overwhelmed by my responsibilities", score: 2 },
          { id: 5, text: "I have difficulty arranging my life in a way that is satisfying to me", score: 3 },
          { id: 6, text: "I have been able to build a living environment and a lifestyle for myself that is much to my liking", score: 5 },
          { id: 7, text: "I generally do a good job of taking care of my personal finances and affairs", score: 4 }
        ],
        description: "Ability to manage one's life and surrounding world effectively."
      },
      "Personal Growth": {
        questions: [
          { id: 1, text: "I am not interested in activities that will expand my horizons", score: 3 },
          { id: 2, text: "I think it is important to have new experiences that challenge how you think about yourself and the world", score: 5 },
          { id: 3, text: "When I think about it, I haven't really improved much as a person over the years", score: 3 },
          { id: 4, text: "I have the sense that I have developed a lot as a person over time", score: 4 },
          { id: 5, text: "I do not enjoy being in new situations that require me to change my old familiar ways of doing things", score: 3 },
          { id: 6, text: "For me, life has been a continuous process of learning, changing, and growth", score: 5 },
          { id: 7, text: "I gave up trying to make big improvements or changes in my life a long time ago", score: 3 }
        ],
        description: "Feeling of continued development and realization of one's potential."
      },
      "Positive Relations": {
        questions: [
          { id: 1, text: "Most people see me as loving and affectionate", score: 4 },
          { id: 2, text: "Maintaining close relationships has been difficult and frustrating for me", score: 3 },
          { id: 3, text: "I often feel lonely because I have few close friends with whom to share my concerns", score: 2 },
          { id: 4, text: "I enjoy personal and mutual conversations with family members or friends", score: 4 },
          { id: 5, text: "People would describe me as a giving person, willing to share my time with others", score: 4 },
          { id: 6, text: "I have not experienced many warm and trusting relationships with others", score: 3 },
          { id: 7, text: "I know that I can trust my friends, and they know they can trust me", score: 4 }
        ],
        description: "Having warm, satisfying, trusting relationships with others."
      },
      "Purpose in Life": {
        questions: [
          { id: 1, text: "I live life one day at a time and don't really think about the future", score: 3 },
          { id: 2, text: "I have a sense of direction and purpose in life", score: 5 },
          { id: 3, text: "I don't have a good sense of what it is I'm trying to accomplish in life", score: 2 },
          { id: 4, text: "My daily activities often seem trivial and unimportant to me", score: 3 },
          { id: 5, text: "I enjoy making plans for the future and working to make them a reality", score: 5 },
          { id: 6, text: "Some people wander aimlessly through life, but I am not one of them", score: 4 },
          { id: 7, text: "I sometimes feel as if I've done all there is to do in life", score: 2 }
        ],
        description: "Having goals and a sense of direction in life; feeling that life has meaning."
      },
      "Self-Acceptance": {
        questions: [
          { id: 1, text: "When I look at the story of my life, I am pleased with how things have turned out", score: 2 },
          { id: 2, text: "In general, I feel confident and positive about myself", score: 2 },
          { id: 3, text: "I feel like many of the people I know have gotten more out of life than I have", score: 1 },
          { id: 4, text: "I like most aspects of my personality", score: 2 },
          { id: 5, text: "I made some mistakes in the past, but I feel that all in all everything has worked out for the best", score: 3 },
          { id: 6, text: "In many ways, I feel disappointed about my achievements in life", score: 1 },
          { id: 7, text: "My attitude about myself is probably not as positive as most people feel about themselves", score: 1 }
        ],
        description: "Positive attitude toward oneself and acceptance of one's good and bad qualities."
      }
    };
    
    return dimensions;
  }, []);
  
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
  
  // Function to get color for individual question score
  const getQuestionScoreColor = (score: number) => {
    if (score <= 2) return "text-destructive";
    if (score <= 4) return "text-yellow-600";
    return "text-green-600";
  };
  
  // Function to get bar color based on response type
  const getBarColor = (score: number) => {
    if (score <= 2) return "bg-red-400";
    if (score <= 4) return "bg-yellow-400";
    return "bg-green-400";
  };
  
  // Function to handle opening the dimension details dialog
  const handleViewDimensionDetails = (dimension: DimensionName) => {
    setSelectedDimension(dimension);
    setDimensionDialogOpen(true);
  };

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
        </Card>
      </div>
    );
  }
  
  // If a risk student is selected, show student details
  if (viewMode === "studentDetail" && selectedStudent) {
    // Use the personalizedInterventions generated at the top level
    // No hooks inside conditional blocks
  
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
                    <div 
                      key={dim.name} 
                      className="flex justify-between items-center p-2 hover:bg-muted rounded cursor-pointer"
                      onClick={() => handleViewDimensionDetails(dim.name as DimensionName)}
                    >
                      <span className="text-sm">{dim.name}</span>
                      <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getScoreColor(dim.score)}`}>{dim.score}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 p-0" aria-label="View details">
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
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

          {/* AI Feedback Card with Tabs */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                  AI Feedback
              </CardTitle>
              </div>
              <CardDescription>
                Review the AI-generated feedback and interventions for this student
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="analysis" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="intervention">Intervention</TabsTrigger>
                </TabsList>
                
                {/* Analysis Tab Content */}
                <TabsContent value="analysis" className="space-y-4 pt-4">
                  <div className="space-y-4">
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
                  </div>
                </TabsContent>
                
                {/* Intervention Tab Content */}
                <TabsContent value="intervention" className="space-y-6 pt-4">
                  {/* General Intervention Strategy */}
                  <div className={`p-4 rounded-lg bg-blue-50 border border-blue-100 ${isOverallStrategyDeselected ? 'opacity-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={!isOverallStrategyDeselected}
                          onCheckedChange={() => setIsOverallStrategyDeselected(!isOverallStrategyDeselected)}
                          className="mt-1"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-blue-600" />
                            {personalizedInterventions.general[0].title}
                          </h3>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={handleEditOverallStrategy}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="mt-2 mb-3 text-blue-700">{editedDescription || personalizedInterventions.general[0].description}</p>
                    
                    <h4 className="font-medium text-blue-800 mb-2">Recommended Steps:</h4>
                    <ul className="space-y-2">
                      {(editedGeneralSteps.length > 0 ? editedGeneralSteps : personalizedInterventions.general[0].steps).map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-blue-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Dimension-specific Interventions */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Dimension-Specific Strategies</h3>
                    </div>
                    
                    {/* Sort dimensions by score (lowest first) */}
                    {[...personalizedInterventions.dimensionSpecific]
                      .sort((a, b) => a.score - b.score)
                      .map((intervention, index) => {
                        // Determine card style based on status
                        let cardStyle = "bg-green-50 border-green-100";
                        let textColor = "text-green-800";
                        let iconColor = "text-green-600";
                        
                        if (intervention.status === "Needs attention") {
                          cardStyle = "bg-red-50 border-red-100";
                          textColor = "text-red-800";
                          iconColor = "text-red-600";
                        } else if (intervention.status === "Moderate") {
                          cardStyle = "bg-yellow-50 border-yellow-100";
                          textColor = "text-yellow-800";
                          iconColor = "text-yellow-600";
                        }

                        const isDeselected = deselectedDimensions.includes(intervention.dimension)
                        const editedContent = editedDimensionContent[intervention.dimension]
                        
              return (
                          <div key={index} className={`p-4 rounded-lg border ${cardStyle} ${isDeselected ? 'opacity-50' : ''}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <Checkbox
                                  checked={!isDeselected}
                                  onCheckedChange={() => handleToggleDimension(intervention.dimension)}
                                  className="mt-1"
                                />
                                <div>
                                  <h4 className={`font-semibold ${textColor} flex items-center gap-2`}>
                                    {intervention.status === "Needs attention" ? (
                                      <AlertCircle className={`h-5 w-5 ${iconColor}`} />
                                    ) : intervention.status === "Moderate" ? (
                                      <BarChart className={`h-5 w-5 ${iconColor}`} />
                                    ) : (
                                      <PieChart className={`h-5 w-5 ${iconColor}`} />
                                    )}
                                    {intervention.title}
                                  </h4>
                                  <Badge className={intervention.status === "Needs attention" ? "bg-red-200 text-red-800 hover:bg-red-300" : 
                                                intervention.status === "Moderate" ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300" : 
                                                "bg-green-200 text-green-800 hover:bg-green-300"}>
                                    {intervention.status}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditDimension(intervention)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <p className={`mt-2 mb-3 ${textColor.replace('800', '700')}`}>
                              {editedContent?.description || intervention.description}
                            </p>
                            
                            <ul className="space-y-2">
                              {(editedContent?.strategies || intervention.strategies).map((strategy, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className={`${cardStyle.replace('50', '200')} ${textColor} rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5`}>
                                    {idx + 1}
                                  </span>
                                  <span className={textColor.replace('800', '700')}>{strategy}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
              );
            })}
          </div>
                  
                  {/* Send to Student button at the bottom */}
                  <div className="flex justify-end mt-6">
                    <Button 
                      variant="default"
                      className="gap-2"
                      onClick={() => setSendToStudentDialogOpen(true)}
                    >
                      <Send className="h-4 w-4" />
                      Send to Student
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Dimension Details Dialog */}
        <Dialog open={dimensionDialogOpen} onOpenChange={setDimensionDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedDimension && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedDimension} - Student Response Analysis</DialogTitle>
                  <DialogDescription>
                    Review the student's responses to questions in this dimension
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">About this dimension</h3>
                    <p className="text-sm text-muted-foreground">
                      {studentDimensionData[selectedDimension]?.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Student's Responses</h3>
                    <div className="text-sm">
                      <Badge className={getScoreColor(selectedStudent.assessment.dimensions.find(d => d.name === selectedDimension)?.score || 0)}>
                        Score: {selectedStudent.assessment.dimensions.find(d => d.name === selectedDimension)?.score || 0}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {studentDimensionData[selectedDimension]?.questions.map((question: any) => (
                      <Card key={question.id} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">Question {question.id}</CardTitle>
                            <Badge className={getQuestionScoreColor(question.score)}>
                              Score: {question.score}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="font-medium">{question.text}</p>
                          
                          {/* Response visualization - Bar Graph with Likert Scale */}
                          <div className="pt-4">
                            <div className="flex flex-col space-y-1">
                              <div className="flex h-8 items-end">
                                {[1, 2, 3, 4, 5, 6].map((value) => (
                                  <div 
                                    key={value} 
                                    className={`flex-1 mx-0.5 ${
                                      value === question.score 
                                        ? getBarColor(question.score)
                                        : 'bg-gray-200'
                                    } border border-gray-300`}
                                    style={{ 
                                      height: value === question.score ? '100%' : '40%',
                                    }}
                                  />
                                ))}
                              </div>
                              
                              <div className="flex justify-between text-xs border-t pt-1">
                                <div className="text-center flex-1">Strongly<br/>Disagree</div>
                                <div className="text-center flex-1">Disagree</div>
                                <div className="text-center flex-1">Slightly<br/>Disagree</div>
                                <div className="text-center flex-1">Slightly<br/>Agree</div>
                                <div className="text-center flex-1">Agree</div>
                                <div className="text-center flex-1">Strongly<br/>Agree</div>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between text-sm">
                              <span>Strongly Disagree</span>
                              <span className="font-medium">
                                Score: <span className="px-2 py-0.5 bg-yellow-100 rounded-full border border-yellow-300 text-yellow-800">{question.score}</span>
                              </span>
                              <span>Strongly Agree</span>
                            </div>
                          </div>
                          
                          {/* AI Recommendation based on response */}
                          <div className={`p-3 rounded-md bg-yellow-50 border border-yellow-100 mt-4`}>
                            <div className="flex items-start gap-2">
                              <Brain className="h-4 w-4 mt-0.5 text-yellow-800 shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium mb-1">AI Recommendation</h4>
                                <p className="text-sm">{
                                  question.score <= 2 
                                    ? "Consider exploring factors contributing to this low score and providing targeted support."
                                    : question.score <= 4
                                      ? "This moderate response suggests potential for improvement with appropriate guidance."
                                      : "This is a strength area to acknowledge and build upon in counseling sessions."
                                }</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dimension Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit {editingOverallStrategy ? "Overall Strategy" : "Intervention Strategies"}</DialogTitle>
              <DialogDescription>
                Modify the description and strategies. All changes will be reviewed before sending to the student.
              </DialogDescription>
            </DialogHeader>
            
            {currentEditingDimension && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentEditingDimension.description}
                    onChange={(e) => setCurrentEditingDimension({
                      ...currentEditingDimension,
                      description: e.target.value
                    })}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Strategies</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        if (currentEditingDimension) {
                          setCurrentEditingDimension({
                            ...currentEditingDimension,
                            strategies: [...currentEditingDimension.strategies, "New strategy"]
                          })
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Add Strategy
                    </Button>
                  </div>
                  
                  {currentEditingDimension.strategies.map((strategy, idx) => (
                    <div key={idx} className="flex items-start gap-2 group">
                      <span className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 mt-2">
                        {idx + 1}
                      </span>
                      <div className="flex-1 flex gap-2">
                        <Textarea
                          value={strategy}
                          onChange={(e) => {
                            const newStrategies = [...currentEditingDimension.strategies]
                            newStrategies[idx] = e.target.value
                            setCurrentEditingDimension({
                              ...currentEditingDimension,
                              strategies: newStrategies
                            })
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newStrategies = currentEditingDimension.strategies.filter((_, i) => i !== idx)
                            setCurrentEditingDimension({
                              ...currentEditingDimension,
                              strategies: newStrategies
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setEditModalOpen(false)
                setCurrentEditingDimension(null)
                setEditingOverallStrategy(false)
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Send to Student Confirmation Dialog */}
        <Dialog open={sendToStudentDialogOpen} onOpenChange={setSendToStudentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Interventions to Student</DialogTitle>
              <DialogDescription>
                Are you sure you want to send these interventions to {selectedStudent.name}? This will make them visible in their student portal.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="text-sm text-muted-foreground">
                <p>The following will be sent:</p>
                <ul className="list-disc list-inside mt-2">
                  {!isOverallStrategyDeselected && (
                    <li>Overall wellbeing strategy with {editedGeneralSteps.length || personalizedInterventions.general[0].steps.length} steps</li>
                  )}
                  <li>
                    {personalizedInterventions.dimensionSpecific.length - deselectedDimensions.length} of {personalizedInterventions.dimensionSpecific.length} dimension-specific strategies
                    {deselectedDimensions.length > 0 && ` (${deselectedDimensions.length} excluded)`}
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSendToStudentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendToStudent}>
                Send to Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      {/* Top cards: At-Risk Students and Department Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* At-Risk Students Card */}
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

        {/* Department Profile Card - Compact Version */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentDepartment?.name}</h3>
                <p className="text-sm text-muted-foreground">{currentDepartment?.studentCount} students {currentDepartment && getRiskBadge(currentDepartment)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Assessment Overview</h4>
                <p className="text-xs text-muted-foreground mb-1">{currentDepartment?.assessmentDate}</p>
                <p className="text-xs text-muted-foreground mb-2">Completion Rate: {currentDepartment?.completionRate}%</p>
                
                <div className="space-y-1 text-sm">
                  {currentDepartment?.averageScores.dimensions.map((dim) => (
                    <div key={dim.name} className="flex justify-between items-center">
                      <span className="text-xs">{dim.name}</span>
                      <span className={`font-medium text-xs ${getScoreColor(dim.score)}`}>{dim.score}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center border-t pt-1 mt-1">
                    <span className="font-medium text-xs">Overall</span>
                    <span className={`font-medium text-xs ${getScoreColor(currentDepartment?.averageScores.overall || 0)}`}>
                      {currentDepartment?.averageScores.overall}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Risk Distribution</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-destructive">High Risk:</span>
                    <span className="text-xs font-medium">{currentDepartment?.riskDistribution.high}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-yellow-600">Medium Risk:</span>
                    <span className="text-xs font-medium">{currentDepartment?.riskDistribution.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-600">Low Risk:</span>
                    <span className="text-xs font-medium">{currentDepartment?.riskDistribution.low}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">Key Insights</h4>
                  <div className="text-xs bg-muted/30 p-2 rounded">
                    {currentDepartment?.yearLevelInsights}
                  </div>
                </div>
              </div>
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
    </div>
  )
} 

// Add a helper function to render the student dimension analysis
function StudentDimensionAnalysis({ dimensionName, score, analysis }: { 
  dimensionName: string, 
  score: number,
  analysis: DimensionAnalysis
}) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 50) return "text-destructive"
    if (score < 70) return "text-yellow-600"
    return "text-green-600"
  }
  
  // Determine background color based on score
  const getBackgroundColor = (score: number) => {
    if (score < 50) return "bg-red-50"
    if (score < 70) return "bg-yellow-50"
    return "bg-green-50"
  }
  
  return (
    <Card className={`${getBackgroundColor(score)} border-l-4 ${score < 50 ? 'border-l-red-500' : score < 70 ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{dimensionName}</CardTitle>
          <Badge className={getScoreColor(score)}>Score: {score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Brain className="h-4 w-4" /> Interpretation
          </h4>
          <p className="text-sm">{analysis.interpretation}</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Heart className="h-4 w-4" /> Recommended Intervention
          </h4>
          <p className="text-sm">{analysis.intervention}</p>
        </div>
        
        {/* Progress bar to visualize score */}
        <div className="pt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${score < 50 ? 'bg-red-500' : score < 70 ? 'bg-yellow-500' : 'bg-green-500'} rounded-full`} 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Add a helper function to render the dimension distribution graph with clickable functionality
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
  
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Generate realistic question data with response distributions based on the dimension data
  const questions = useMemo(() => {
    // This is just for the demo - in a real app, you would use the actual questions for each dimension
    const dimensionQuestionsText: Record<DimensionName, string[]> = {
      "Autonomy": [
        "I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people",
        "My decisions are not usually influenced by what everyone else is doing",
        "I have confidence in my opinions, even if they are contrary to the general consensus",
        "I tend to worry about what other people think of me",
        "Being happy with myself is more important to me than having others approve of me",
        "I tend to be influenced by people with strong opinions",
        "People rarely talk me into doing things I don't want to do"
      ],
      "Environmental Mastery": [
        "In general, I feel I am in charge of the situation in which I live",
        "The demands of everyday life often get me down",
        "I am quite good at managing the many responsibilities of my daily life",
        "I often feel overwhelmed by my responsibilities",
        "I have difficulty arranging my life in a way that is satisfying to me",
        "I have been able to build a living environment and a lifestyle for myself that is much to my liking",
        "I generally do a good job of taking care of my personal finances and affairs"
      ],
      "Personal Growth": [
        "I am not interested in activities that will expand my horizons",
        "I think it is important to have new experiences that challenge how you think about yourself and the world",
        "When I think about it, I haven't really improved much as a person over the years",
        "I have the sense that I have developed a lot as a person over time",
        "I do not enjoy being in new situations that require me to change my old familiar ways of doing things",
        "For me, life has been a continuous process of learning, changing, and growth",
        "I gave up trying to make big improvements or changes in my life a long time ago"
      ],
      "Positive Relations": [
        "Most people see me as loving and affectionate",
        "Maintaining close relationships has been difficult and frustrating for me",
        "I often feel lonely because I have few close friends with whom to share my concerns",
        "I enjoy personal and mutual conversations with family members or friends",
        "People would describe me as a giving person, willing to share my time with others",
        "I have not experienced many warm and trusting relationships with others",
        "I know that I can trust my friends, and they know they can trust me"
      ],
      "Purpose in Life": [
        "I live life one day at a time and don't really think about the future",
        "I have a sense of direction and purpose in life",
        "I don't have a good sense of what it is I'm trying to accomplish in life",
        "My daily activities often seem trivial and unimportant to me",
        "I enjoy making plans for the future and working to make them a reality",
        "Some people wander aimlessly through life, but I am not one of them",
        "I sometimes feel as if I've done all there is to do in life"
      ],
      "Self-Acceptance": [
        "When I look at the story of my life, I am pleased with how things have turned out",
        "In general, I feel confident and positive about myself",
        "I feel like many of the people I know have gotten more out of life than I have",
        "I like most aspects of my personality",
        "I made some mistakes in the past, but I feel that all in all everything has worked out for the best",
        "In many ways, I feel disappointed about my achievements in life",
        "My attitude about myself is probably not as positive as most people feel about themselves"
      ]
    };
    
    const recommendationTemplates = [
      "You may benefit from environments that encourage open dialogue and assertiveness training.",
      "Consider practicing decision-making exercises that strengthen your internal compass.",
      "Your confidence in your views is a strength; continue developing this through intellectual discussions.",
      "Working on self-validation techniques could help reduce concern about others' opinions.",
      "Continue prioritizing self-acceptance while maintaining healthy relationships.",
      "Developing critical thinking skills can help you evaluate others' opinions more objectively.",
      "Your boundary-setting is effective; continue practicing clear communication of your limits."
    ];
    
    // Generate realistic distributions for each question that sum up to match the overall dimension distribution
    const questionTexts = dimensionQuestionsText[dimensionName as DimensionName] || [];
    
    // Create questions with response distributions
    return questionTexts.map((text, index) => {
      // Create a distribution for this question that roughly follows the overall pattern
      // but with some variation to make it realistic
      const responseDistribution = [...data].map(count => {
        // Add some randomness but keep the general pattern
        const variation = Math.floor(Math.random() * (count * 0.4)) - Math.floor(count * 0.2);
        return Math.max(0, Math.min(count, count + variation));
      });
      
      // Normalize to ensure the sum matches the original data
      const distributionSum = responseDistribution.reduce((sum, val) => sum + val, 0);
      if (distributionSum > 0) {
        const scaleFactor = data.reduce((sum, val) => sum + val, 0) / distributionSum;
        responseDistribution.forEach((val, i) => {
          responseDistribution[i] = Math.round(val * scaleFactor);
        });
      }
      
      // Calculate the average score (weighted average)
      let weightedSum = 0;
      let totalWeight = 0;
      responseDistribution.forEach((count, i) => {
        weightedSum += count * (i + 1); // i+1 because scores are 1-6
        totalWeight += count;
      });
      
      const averageScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 3;
      
      return {
        id: index + 1,
        text,
        responseDistribution,
        averageScore,
        recommendation: recommendationTemplates[index % recommendationTemplates.length]
      };
    });
  }, [dimensionName, data]);
  
  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score <= 2) return "text-destructive";
    if (score <= 4) return "text-yellow-600";
    return "text-green-600";
  };
  
  // Function to get bar color based on response type
  const getBarColor = (index: number) => {
    if (index < 2) return "bg-red-400";
    if (index < 4) return "bg-yellow-400";
    return "bg-green-400";
  };
  
  // Function to get background color based on score
  const getScoreBackgroundColor = (score: number) => {
    if (score <= 2) return "bg-red-100";
    if (score <= 4) return "bg-yellow-100";
    return "bg-green-100";
  };
  
  return (
    <>
      <div 
        className="space-y-4 p-4 border rounded-lg bg-white shadow-sm hover:border-primary cursor-pointer transition-all"
        onClick={() => setDialogOpen(true)}
      >
        <div className="flex justify-between items-center">
      <h3 className="font-semibold text-lg">{dimensionName}</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
            e.stopPropagation();
            setDialogOpen(true);
          }}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      
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
      
      {/* Dimension Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{dimensionName} - Detailed Analysis</DialogTitle>
            <DialogDescription>
              Questions, responses, and AI recommendations for this dimension
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">About this dimension</h3>
              <p className="text-sm text-muted-foreground">
                {dimensionName === "Autonomy" && "Independence and self-determination in making decisions and regulating behavior."}
                {dimensionName === "Environmental Mastery" && "Ability to manage one's life and surrounding world effectively."}
                {dimensionName === "Personal Growth" && "Feeling of continued development and realization of one's potential."}
                {dimensionName === "Positive Relations" && "Having warm, satisfying, trusting relationships with others."}
                {dimensionName === "Purpose in Life" && "Having goals and a sense of direction in life; feeling that life has meaning."}
                {dimensionName === "Self-Acceptance" && "Positive attitude toward oneself and acceptance of one's good and bad qualities."}
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Questions & Responses</h3>
              <div className="text-sm text-muted-foreground">
                Distribution: {data.join(' - ')} responses
              </div>
            </div>
            
            <div className="space-y-6">
              {questions.map((question) => (
                <Card key={question.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Question {question.id}</CardTitle>
                      <Badge className={getScoreColor(question.averageScore)}>
                        Avg Score: {question.averageScore}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{question.text}</p>
                    
                    {/* Response visualization - Bar Graph with Likert Scale showing full distribution */}
                    <div className="pt-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex h-10 items-end">
                          {question.responseDistribution.map((count, index) => {
                            const maxCount = Math.max(...question.responseDistribution);
                            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                            
                            return (
                              <div 
                                key={index} 
                                className={`flex-1 mx-0.5 ${getBarColor(index)} border border-gray-300 relative`}
                                style={{ height: `${percentage}%` }}
                              >
                                {count > 0 && (
                                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                                    {count}
                                  </span>
                                )}
    </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between text-xs border-t pt-1">
                          <div className="text-center flex-1">Strongly<br/>Disagree</div>
                          <div className="text-center flex-1">Disagree</div>
                          <div className="text-center flex-1">Slightly<br/>Disagree</div>
                          <div className="text-center flex-1">Slightly<br/>Agree</div>
                          <div className="text-center flex-1">Agree</div>
                          <div className="text-center flex-1">Strongly<br/>Agree</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between text-sm">
                        <span>Strongly Disagree</span>
                        <span className="font-medium">
                          Average Score: <span className="px-2 py-0.5 bg-yellow-100 rounded-full border border-yellow-300 text-yellow-800">{question.averageScore}</span>
                        </span>
                        <span>Strongly Agree</span>
                      </div>
                    </div>
                    
                    {/* AI Recommendation */}
                    <div className={`p-3 rounded-md bg-yellow-50 border border-yellow-100 mt-4`}>
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 mt-0.5 text-yellow-800 shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium mb-1">AI Recommendation</h4>
                          <p className="text-sm">{question.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}