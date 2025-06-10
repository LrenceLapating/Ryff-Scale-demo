"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Users, Send, Check, Calendar, History, FileText, Eye, Save, Search, Plus, Info, Filter, CheckSquare, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

const classYearSections = [
  "BSIT1A",
  "BSIT1B",
  "BSIT2A",
  "BSIT2B",
  "BSIT3A",
  "BSIT3B",
  "BSIT4A",
  "BSIT4B",
  "BSCS1A",
  "BSCS1B",
  "BSCS2A",
  "BSCS2B",
  "BSCS3A",
  "BSCS3B",
  "BSCS4A",
  "BSCS4B",
]

const departments = ["CCS", "CN", "CBA", "COE", "CAS"]

// Program sections by department with type definition
const departmentPrograms: Record<string, string[]> = {
  "CCS": ["BSIT", "BSCS", "BSDA", "BSIS"],
  "CN": ["BSN", "BSMT", "BSRT", "BSM"],
  "CBA": ["BSBA", "BSA", "BSTM", "BSEM"],
  "COE": ["BSCE", "BSEE", "BSME", "BSCHE"],
  "CAS": ["ABPS", "ABCOM", "BEED", "BSED"]
};

// Generate program sections with year and section
const generateProgramSections = (program: string, year: number): string[] => {
  // For each program and year, generate sections A and B
  return [`${program}-${year}A`, `${program}-${year}B`];
};

// Map for displaying year numbers
const yearMap: Record<string, number> = {
  "1st Year": 1,
  "2nd Year": 2,
  "3rd Year": 3,
  "4th Year": 4
};

const assignmentHistory = [
  { 
    id: 1, 
    name: "End of Semester Assessment", 
    target: "All Departments", 
    date: "2023-12-15", 
    recipients: 971, 
    completed: 823,
    departmentDetails: [
      { name: "CCS", recipients: 230, completed: 196 },
      { name: "CN", recipients: 185, completed: 157 },
      { name: "CBA", recipients: 210, completed: 179 },
      { name: "COE", recipients: 195, completed: 166 },
      { name: "CAS", recipients: 151, completed: 125 }
    ]
  },
  { 
    id: 2, 
    name: "Mid-term Evaluation", 
    target: "CCS, COE", 
    date: "2023-10-20", 
    recipients: 448, 
    completed: 402,
    departmentDetails: [
      { name: "CCS", recipients: 243, completed: 219 },
      { name: "COE", recipients: 205, completed: 183 }
    ]
  },
  { 
    id: 3, 
    name: "New Student Onboarding", 
    target: "BSIT1A, BSIT1B, BSCS1A, BSCS1B", 
    date: "2023-09-05", 
    recipients: 160, 
    completed: 142,
    departmentDetails: [
      { name: "BSIT1A", recipients: 40, completed: 36 },
      { name: "BSIT1B", recipients: 40, completed: 35 },
      { name: "BSCS1A", recipients: 40, completed: 38 },
      { name: "BSCS1B", recipients: 40, completed: 33 }
    ]
  },
  { 
    id: 4, 
    name: "Faculty Well-being Check", 
    target: "Faculty Members", 
    date: "2023-08-10", 
    recipients: 45, 
    completed: 38,
    departmentDetails: [
      { name: "Faculty Members", recipients: 45, completed: 38 }
    ]
  },
]

const savedTemplates = [
  { id: 1, name: "Standard Assessment", description: "Default assessment with standard introduction", scale: "54" },
  { 
    id: 2, 
    name: "Quick Check-in (42 Items)", 
    description: "Brief assessment for regular monitoring", 
    scale: "42",
    questions: [
      "1. \"I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people.\"",
      "2. \"For me, life has been a continuous process of learning, changing, and growth.\"",
      "3. \"In general, I feel I am in charge of the situation in which I live.\"",
      "4. \"People would describe me as a giving person, willing to share my time with others.\"",
      "5. \"I am not interested in activities that will expand my horizons.\"",
      "6. \"I enjoy making plans for the future and working to make them a reality.\"",
      "7. \"Most people see me as loving and affectionate.\"",
      "8. \"In many ways I feel disappointed about my achievements in life.\"",
      "9. \"I live life one day at a time and don't really think about the future.\"",
      "10. \"I tend to worry about what other people think of me.\"",
      "11. \"When I look at the story of my life, I am pleased with how things have turned out.\"",
      "12. \"I have difficulty arranging my life in a way that is satisfying to me.\"",
      "13. \"My decisions are not usually influenced by what everyone else is doing.\"",
      "14. \"I gave up trying to make big improvements or changes in my life a long time ago.\"",
      "15. \"The demands of everyday life often get me down.\"",
      "16. \"I have not experienced many warm and trusting relationships with others.\"",
      "17. \"I think it is important to have new experiences that challenge how you think about yourself and the world.\"",
      "18. \"Maintaining close relationships has been difficult and frustrating for me.\"",
      "19. \"My attitude about myself is probably not as positive as most people feel about themselves.\"",
      "20. \"I have a sense of direction and purpose in life.\"",
      "21. \"I judge myself by what I think is important, not by the values of what others think is important.\"",
      "22. \"In general, I feel confident and positive about myself.\"",
      "23. \"I have been able to build a living environment and a lifestyle for myself that is much to my liking.\"",
      "24. \"I tend to be influenced by people with strong opinions.\"",
      "25. \"I do not enjoy being in new situations that require me to change my old familiar ways of doing things.\"",
      "26. \"I do not fit very well with the people and the community around me.\"",
      "27. \"I know that I can trust my friends, and they know they can trust me.\"",
      "28. \"When I think about it, I haven't really improved much as a person over the years.\"",
      "29. \"Some people wander aimlessly through life, but I am not one of them.\"",
      "30. \"I often feel lonely because I have few close friends with whom to share my concerns.\"",
      "31. \"When I compare myself to friends and acquaintances, it makes me feel good about who I am.\"",
      "32. \"I don't have a good sense of what it is I'm trying to accomplish in life.\"",
      "33. \"I sometimes feel as if I've done all there is to do in life.\"",
      "34. \"I feel like many of the people I know have gotten more out of life than I have.\"",
      "35. \"I have confidence in my opinions, even if they are contrary to the general consensus.\"",
      "36. \"I am quite good at managing the many responsibilities of my daily life.\"",
      "37. \"I have the sense that I have developed a lot as a person over time.\"",
      "38. \"I enjoy personal and mutual conversations with family members and friends.\"",
      "39. \"My daily activities often seem trivial and unimportant to me.\"",
      "40. \"I like most parts of my personality.\"",
      "41. \"It's difficult for me to voice my own opinions on controversial matters.\"",
      "42. \"I often feel overwhelmed by my responsibilities.\""
    ],
    scoring: "The Autonomy subscale items are Q1, Q13, Q24, Q35, Q41, Q10, and Q21. The Environmental Mastery subscale items are Q3, Q15, Q26, Q36, Q42, Q12, and Q23. The Personal Growth subscale items are Q5, Q17, Q28, Q37, Q2, Q14, and Q25. The Positive Relations with Others subscale items are Q7, Q18, Q30, Q38, Q4, Q16, and Q27. The Purpose in Life subscale items are Q9, Q20, Q32, Q39, Q6, Q29, and Q33. The Self-Acceptance subscale items are Q11, Q22, Q34, Q40, Q8, Q19, and Q31."
  },
  { id: 3, name: "Comprehensive Evaluation", description: "Full-scale detailed assessment", scale: "84" },
]

export function BulkAssignment() {
  const [activeTab, setActiveTab] = useState("create")
  const [targetGroup, setTargetGroup] = useState<string>("department")
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [departmentFilters, setDepartmentFilters] = useState<{[key: string]: {[key: string]: string[]}}>(
    // Initial empty filters structure for each department
    departments.reduce((acc, dept) => ({...acc, [dept]: {}}), {})
  )
  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<string>("now")
  const [scheduleDate, setScheduleDate] = useState<string>("")
  const [ryffScale, setRyffScale] = useState<string>("84")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [assignmentResults, setAssignmentResults] = useState({ total: 0, successful: 0, failed: 0 })
  const [assignmentName, setAssignmentName] = useState("")
  const [customMessage, setCustomMessage] = useState("Dear participant,\n\nYou have been selected to participate in our well-being assessment. Your insights will help us better understand and support the mental health needs of our community.\n\nThank you for your participation.")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingTemplateId, setViewingTemplateId] = useState<number | null>(null)
  const [questionResponses, setQuestionResponses] = useState<{[key: number]: number | null}>({})
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  
  // State variables for assignment viewing
  const [viewingAssignment, setViewingAssignment] = useState<number | null>(null)
  const [viewingDepartment, setViewingDepartment] = useState<string | null>(null)

  // State for temporary filters when customizing (before applying)
  const [tempDepartmentFilters, setTempDepartmentFilters] = useState<{[key: string]: {[key: string]: string[]}}>(
    departments.reduce((acc, dept) => ({...acc, [dept]: {}}), {})
  );

  const handleSectionChange = (section: string, checked: boolean) => {
    if (checked) {
      setSelectedSections([...selectedSections, section])
    } else {
      setSelectedSections(selectedSections.filter((s) => s !== section))
    }
  }

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department]);
      
      // Automatically select all sections for this department
      const allYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
      const updatedFilters = {...departmentFilters};
      
      // For each year, add all program sections
      allYears.forEach(year => {
        const yearNum = yearMap[year];
        const programsForDept = departmentPrograms[department] || [];
        
        // Generate all sections for this department and year
        programsForDept.forEach(program => {
          const sections = generateProgramSections(program, yearNum);
          sections.forEach(section => {
            // Initialize year object if it doesn't exist
            if (!updatedFilters[department][year]) {
              updatedFilters[department][year] = [];
            }
            
            // Add section if not already included
            if (!updatedFilters[department][year].includes(section)) {
              updatedFilters[department][year].push(section);
            }
          });
        });
      });
      
      setDepartmentFilters(updatedFilters);
    } else {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== department));
      // Clear filters for unselected department
      setDepartmentFilters(prev => ({
        ...prev,
        [department]: {}
      }));
    }
  }

  const getTotalRecipients = () => {
    let total = 0;
    
    selectedDepartments.forEach(dept => {
      const filters = departmentFilters[dept];
      const filterYears = Object.keys(filters);
      
      // Check if filters are applied
      if (filterYears.length > 0) {
        // Count based on the selected sections (filtered)
        let filteredTotal = 0;
        filterYears.forEach(year => {
          const sections = filters[year];
          filteredTotal += sections.length * 35; // 35 students per section
        });
        total += filteredTotal;
      } else {
        // Use default calculation for unfiltered departments
        const programCount = departmentPrograms[dept]?.length || 4; // Default to 4 programs if not specified
        const yearsCount = 4; // 4 years (1st to 4th)
        const sectionsPerYearProgram = 2; // A and B sections
        const studentsPerSection = 35; // Average students per section
        
        // Each department has: programs × years × sections × students per section
        const departmentTotal = programCount * yearsCount * sectionsPerYearProgram * studentsPerSection;
        total += departmentTotal;
      }
    });
    
    return total;
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    // Simulate API call
    setTimeout(() => {
      const total = getTotalRecipients()
      const successful = Math.floor(total * 0.95) // 95% success rate for simulation
      setAssignmentResults({
        total,
        successful,
        failed: total - successful,
      })
      setShowSuccess(true)
    }, 1000)
  }

  const applyTemplate = (templateId: number) => {
    const template = savedTemplates.find(t => t.id === templateId)
    if (template) {
      setRyffScale(template.scale)
      setSelectedTemplate(templateId)
      setAssignmentName(template.name)
      // In a real app, this would also load other template settings
    }
  }

  const saveAsTemplate = () => {
    // In a real app, this would save the current settings as a new template
    alert("Template saved successfully!")
  }

  const filteredHistory = assignmentHistory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.target.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Function to get assignment by ID
  const getAssignmentById = (id: number) => {
    return assignmentHistory.find(item => item.id === id) || null
  }

  // Function to handle view assignment
  const handleViewAssignment = (id: number) => {
    setViewingAssignment(id)
    setViewingDepartment(null) // Reset department view when viewing a new assignment
  }

  // Function to handle view department details
  const handleViewDepartment = (departmentName: string) => {
    setViewingDepartment(departmentName)
  }

  // Function to get department details
  const getDepartmentDetails = (assignmentId: number, departmentName: string) => {
    const assignment = getAssignmentById(assignmentId)
    if (!assignment) return null
    
    return assignment.departmentDetails.find(dept => dept.name === departmentName) || null
  }

  // Add a new helper function to expand "All Departments" into specific departments
  const expandTargetGroups = (target: string) => {
    if (target === "All Departments") {
      return departments;
    }
    return target.split(", ");
  };

  // Function to handle selecting a rating for a question
  const handleRatingSelect = (questionNumber: number, rating: number) => {
    setQuestionResponses(prev => ({
      ...prev,
      [questionNumber]: rating
    }));
  }

  // Function to handle form submission
  const handleSubmitAssessment = () => {
    // In a real app, this would send the responses to the server
    alert("Assessment submitted successfully!");
    
    // Close the dialog
    setOpenTemplateDialog(false);
    setViewingTemplateId(null);
    // Reset responses
    resetResponses();
  }

  // Function to calculate progress percentage
  const calculateProgress = () => {
    if (!viewingTemplateId) return 0;
    
    const template = getTemplateById(viewingTemplateId);
    if (!template || !template.questions) return 0;
    
    const totalQuestions = template.questions.length;
    const answeredQuestions = Object.keys(questionResponses).length;
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }

  // Function to reset responses when opening a new version
  const resetResponses = () => {
    setQuestionResponses({});
  }

  // Updated function to handle viewing version
  const handleViewTemplate = (templateId: number) => {
    setViewingTemplateId(templateId);
    setOpenTemplateDialog(true);
    resetResponses();
  }

  // Function to get version by ID
  const getTemplateById = (id: number) => {
    return savedTemplates.find(template => template.id === id) || null;
  }

  // Function to get the preview version based on selected scale
  const getPreviewTemplate = () => {
    let templateId = null;
    
    if (ryffScale === "42") {
      templateId = savedTemplates.find(t => t.scale === "42")?.id || null;
    } else if (ryffScale === "54") {
      templateId = savedTemplates.find(t => t.scale === "54")?.id || null;
    } else if (ryffScale === "84") {
      templateId = savedTemplates.find(t => t.scale === "84")?.id || null;
    }
    
    return templateId;
  }
  
  // Function to handle preview
  const handlePreview = () => {
    const templateId = getPreviewTemplate();
    if (templateId) {
      setViewingTemplateId(templateId);
      setPreviewDialogOpen(true);
      resetResponses();
    }
  }

  // Function to handle opening the department filter dialog
  const handleOpenDepartmentFilter = (department: string) => {
    setActiveDepartmentFilter(department);
    // Initialize temporary filters with current filters for this department
    setTempDepartmentFilters(prev => ({
      ...prev,
      [department]: JSON.parse(JSON.stringify(departmentFilters[department] || {}))
    }));
  }

  // Function to add year-section filter for a department (temporary)
  const handleAddYearSectionFilter = (department: string, year: string, section: string) => {
    setTempDepartmentFilters(prev => {
      const deptFilters = {...prev[department]};
      
      if (!deptFilters[year]) {
        deptFilters[year] = [section];
      } else if (!deptFilters[year].includes(section)) {
        deptFilters[year] = [...deptFilters[year], section];
      }
      
      return {
        ...prev,
        [department]: deptFilters
      };
    });
  }

  // Function to remove year-section filter for a department (temporary)
  const handleRemoveYearSectionFilter = (department: string, year: string, section: string) => {
    setTempDepartmentFilters(prev => {
      const deptFilters = {...prev[department]};
      
      if (deptFilters[year]) {
        deptFilters[year] = deptFilters[year].filter(s => s !== section);
        
        // Remove year if no sections are selected
        if (deptFilters[year].length === 0) {
          delete deptFilters[year];
        }
      }
      
      return {
        ...prev,
        [department]: deptFilters
      };
    });
  }

  // Function to clear all filters for a department (temporary)
  const handleClearDepartmentFilters = (department: string) => {
    setTempDepartmentFilters(prev => ({
      ...prev,
      [department]: {}
    }));
  }

  // Function to apply temporary filters to actual filters
  const handleApplyFilters = (department: string) => {
    setDepartmentFilters(prev => ({
      ...prev,
      [department]: JSON.parse(JSON.stringify(tempDepartmentFilters[department] || {}))
    }));
    setActiveDepartmentFilter(null);
  }

  // Generate a display summary of selected departments with their filters
  const getDepartmentSummary = () => {
    return selectedDepartments.map(dept => {
      const filters = departmentFilters[dept];
      const hasFilters = Object.keys(filters).length > 0;
      
      return {
        department: dept,
        hasFilters,
        filters
      };
    });
  }

  // Function to select all departments
  const handleSelectAllDepartments = () => {
    setSelectedDepartments([...departments]);
  }

  // Function to deselect all departments
  const handleDeselectAllDepartments = () => {
    setSelectedDepartments([]);
    // Clear all department filters
    const emptyFilters = departments.reduce((acc, dept) => ({...acc, [dept]: {}}), {});
    setDepartmentFilters(emptyFilters);
  }

  if (showSuccess) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Assessment Successful!</CardTitle>
            <CardDescription>Your Ryff assessment has been distributed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{assignmentResults.total}</div>
                <div className="text-sm text-muted-foreground">Total Recipients</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{assignmentResults.successful}</div>
                <div className="text-sm text-muted-foreground">Successfully Sent</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{assignmentResults.failed}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Notifications have been sent via email and in-app notifications. Recipients will receive their
                assessment links shortly.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => setShowSuccess(false)}>Create New Assessment</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveTab("history")
                    setShowSuccess(false)
                  }}
                >
                  View History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="versions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Versions
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Bulk Assessment
              </CardTitle>
              <CardDescription>Distribute the Ryff assessment to target groups in one click</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Assignment Name */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Assessment Name</Label>
                <Input 
                  placeholder="Enter a name for this assessment" 
                  value={assignmentName} 
                  onChange={(e) => setAssignmentName(e.target.value)} 
                />
              </div>

              {/* Department Selection with Filtering - Always shown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Select Departments</Label>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-departments"
                        checked={selectedDepartments.length === departments.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleSelectAllDepartments();
                          } else {
                            handleDeselectAllDepartments();
                          }
                        }}
                      />
                      <Label htmlFor="select-all-departments" className="text-sm">
                        Select All Departments
                      </Label>
              </div>
                  </div>
                </div>
                <div className="border rounded-md p-4 space-y-3">
                  {departments.map((dept) => (
                    <div key={dept} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={dept}
                          checked={selectedDepartments.includes(dept)}
                          onCheckedChange={(checked) => handleDepartmentChange(dept, checked as boolean)}
                        />
                        <Label htmlFor={dept} className="text-sm font-medium">
                          {dept}
                        </Label>
                      </div>
                      <Dialog open={activeDepartmentFilter === dept} onOpenChange={(open) => {
                        if (!open) setActiveDepartmentFilter(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 flex items-center gap-1 text-xs"
                            onClick={() => handleOpenDepartmentFilter(dept)}
                            disabled={!selectedDepartments.includes(dept)}
                          >
                            <Filter className="h-3.5 w-3.5" />
                            Customize
                            <ChevronDown className="h-3.5 w-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Filter {dept} Department</DialogTitle>
                            <DialogDescription>
                              Optionally select specific years and sections to target
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6 my-4">
                            {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year) => {
                              const yearNum = yearMap[year];
                              const sectionsInYear = tempDepartmentFilters[dept][year] || [];
                              
                              return (
                                <div key={year} className="space-y-2 border-b pb-4 last:border-0">
                                  <div className="flex items-center justify-between">
                                    <Collapsible className="w-full">
                                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                                        <div className="font-medium">{year}</div>
                                        <ChevronDown className="h-4 w-4" />
                                      </CollapsibleTrigger>
                                      <CollapsibleContent className="mt-2">
                                        <div className="grid grid-cols-2 gap-3">
                                          {departmentPrograms[dept]?.map((program: string) => {
                                            const programSections = generateProgramSections(program, yearNum);
                                            
                                            return (
                                              <div key={`${year}-${program}`} className="space-y-2">
                                                <div className="font-medium text-sm">{program}</div>
                                                <div className="space-y-1 pl-2">
                                                  {programSections.map((section) => {
                                                    const isSelected = tempDepartmentFilters[dept][year]?.includes(section) || false;
                                                    
                                                    return (
                      <div key={section} className="flex items-center space-x-2">
                        <Checkbox
                                                          id={`${dept}-${section}`}
                                                          checked={isSelected}
                                                          onCheckedChange={(checked) => {
                                                            if (checked) {
                                                              handleAddYearSectionFilter(dept, year, section);
                                                            } else {
                                                              handleRemoveYearSectionFilter(dept, year, section);
                                                            }
                                                          }}
                        />
                                                        <Label htmlFor={`${dept}-${section}`} className="text-sm">
                          {section}
                        </Label>
                      </div>
                                                    );
                                                  })}
                  </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </CollapsibleContent>
                                    </Collapsible>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 text-xs"
                                      onClick={() => {
                                        // Get all possible sections for this department and year
                                        const allSections = departmentPrograms[dept]?.flatMap((program: string) => 
                                          generateProgramSections(program, yearNum)
                                        ) || [];
                                        
                                        // Check if all sections are already selected
                                        const allSelected = allSections.length > 0 && 
                                          allSections.every(s => tempDepartmentFilters[dept][year]?.includes(s) || false);
                                        
                                        if (allSelected) {
                                          // Remove all sections for this year
                                          const updatedFilters = {...tempDepartmentFilters};
                                          delete updatedFilters[dept][year];
                                          setTempDepartmentFilters(updatedFilters);
                                        } else {
                                          // Add all sections for this year
                                          allSections.forEach(section => {
                                            handleAddYearSectionFilter(dept, year, section);
                                          });
                                        }
                                      }}
                                    >
                                      {(tempDepartmentFilters[dept][year]?.length || 0) === (departmentPrograms[dept]?.length || 0) * 2 
                                        ? "Deselect All" 
                                        : "Select All"}
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                            
                            {/* Selected sections summary */}
                            {Object.keys(tempDepartmentFilters[dept]).length > 0 && (
                              <div className="bg-muted/50 p-3 rounded-md space-y-2">
                                <div className="font-medium text-sm">Selected:</div>
                                {Object.entries(tempDepartmentFilters[dept]).map(([year, sections]) => (
                                  <div key={`summary-${year}`} className="flex flex-wrap gap-1 text-sm">
                                    <span className="font-medium">{year}:</span> 
                                    {sections.map(section => (
                                      <Badge key={section} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                                ))}
                </div>
              )}
                          </div>
                          
                          <DialogFooter className="flex justify-between items-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleClearDepartmentFilters(dept)}
                              disabled={Object.keys(tempDepartmentFilters[dept]).length === 0}
                            >
                              Clear Filters
                            </Button>
                            <Button onClick={() => handleApplyFilters(dept)}>
                              Apply Filters
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      </div>
                    ))}
                  </div>
                
                {/* Department selection summary - only show this when needed */}
                  {selectedDepartments.length > 0 && (
                  <div className="bg-muted/30 rounded-md p-4 space-y-3">
                    <h3 className="text-sm font-medium">Selected Departments:</h3>
                    {selectedDepartments.map(department => {
                      const filters = departmentFilters[department];
                      const hasFilters = Object.keys(filters).length > 0;
                      
                      // Sort years in ascending order (1st, 2nd, 3rd, 4th)
                      const sortedYears = Object.keys(filters).sort((a, b) => {
                        const yearOrder: Record<string, number> = {"1st Year": 1, "2nd Year": 2, "3rd Year": 3, "4th Year": 4};
                        return (yearOrder[a] || 99) - (yearOrder[b] || 99);
                      });
                      
                      return (
                        <div key={`summary-${department}`} className="space-y-1">
                          <div className="font-medium">{department}{hasFilters ? ' (Customized)' : ''}</div>
                          {hasFilters && (
                            <div className="pl-4 text-sm space-y-1">
                              {sortedYears.map(year => (
                                <div key={`${department}-${year}`}>
                                  • {year}: {filters[year].length} sections
                                </div>
                      ))}
                    </div>
                  )}
                        </div>
                      );
                    })}
                    
                    <div className="mt-2 pt-2 border-t flex justify-between">
                      <span className="text-sm font-medium">Total Estimated Recipients:</span>
                      <span className="font-bold">{getTotalRecipients()}</span>
                    </div>
                </div>
              )}
              </div>

              {/* Schedule Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Select Schedule
                </Label>
                <RadioGroup value={schedule} onValueChange={setSchedule}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now">Send Now (immediate dispatch)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="later" id="later" />
                    <Label htmlFor="later">Schedule Later</Label>
                  </div>
                </RadioGroup>
                {schedule === "later" && (
                  <div className="ml-6">
                    <Input
                      type="datetime-local"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-fit"
                    />
                  </div>
                )}
              </div>

              {/* Ryff Scale Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Ryff Scale PWB Test Items</Label>
                <RadioGroup value={ryffScale} onValueChange={setRyffScale}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="84" id="84" />
                    <Label htmlFor="84">84 items (Complete version)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="54" id="54" />
                    <Label htmlFor="54">54 items (Medium version)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="42" id="42" />
                    <Label htmlFor="42">42 items (Brief version)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Custom Message */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Custom Message (Optional)</Label>
                <Textarea 
                  placeholder="Enter a custom message to include with the assessment invitation"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">This message will be included in the email and notification sent to participants.</p>
              </div>

              {/* Version Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2" onClick={() => setActiveTab("versions")}>
                  <FileText className="h-4 w-4" />
                  View Versions
                </Button>
              </div>

              {/* Preview & Confirm */}
              <div className="flex flex-wrap gap-3">
                <Dialog open={previewDialogOpen} onOpenChange={(open) => {
                  if (!open) {
                    setPreviewDialogOpen(false);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2" onClick={handlePreview}>
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Assessment Preview - {ryffScale} Item Version</DialogTitle>
                      <DialogDescription>Preview how your assessment will appear to recipients</DialogDescription>
                    </DialogHeader>
                    
                    {viewingTemplateId && (
                      <div className="space-y-4 mt-4">
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 sticky top-0 z-10">
                          <h2 className="text-xl font-semibold mb-2">Ryff Psychological Well-being Scale</h2>
                          <div className="bg-blue-50 p-4 rounded-md mb-4">
                            <h3 className="font-medium mb-2">Instructions:</h3>
                            <p>Circle one response below each statement to indicate how much you agree or disagree.</p>
                            <p className="mt-2 font-medium">
                              1 = strongly agree; 2 = somewhat agree; 3 = a little agree; 4 = neither agree or disagree; 5 = a little disagree; 6 = somewhat disagree; 7 = strongly disagree.
                            </p>
                          </div>
                          
                          {/* Custom message from counselor */}
                          <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <h3 className="font-medium mb-2">Message from your counselor:</h3>
                          <p className="whitespace-pre-line">{customMessage}</p>
                            </div>
                          </div>
                        
                        <div className="space-y-6">
                          {getTemplateById(viewingTemplateId)?.questions?.slice(0, 3).map((question, index) => {
                            // Extract just the question text without the number prefix
                            const questionText = question.replace(/^\d+\.\s*/, '');
                            const questionNumber = index + 1;
                            
                            return (
                              <div key={index} className="bg-white rounded-lg shadow-sm border p-6" id={`question-${questionNumber}`}>
                                <div className="flex items-start gap-2">
                                  <div className="bg-blue-100 text-blue-800 h-7 min-w-7 rounded-full flex items-center justify-center font-medium text-sm">
                                    {questionNumber}
                        </div>
                                  <h3 className="font-medium">{questionText}</h3>
                      </div>
                                
                                <div className="grid grid-cols-7 gap-1 mt-6 md:mt-4">
                                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                                    <div key={rating} className="flex flex-col items-center">
                                      <div className="h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer mb-1 transition-colors hover:bg-blue-50">
                                        {rating}
                            </div>
                                      <div className="text-xs text-center hidden md:block">
                                        {rating === 1 && "Strongly agree"}
                                        {rating === 2 && "Somewhat agree"}
                                        {rating === 3 && "A little agree"}
                                        {rating === 4 && "Neither"}
                                        {rating === 5 && "A little disagree"}
                                        {rating === 6 && "Somewhat disagree"}
                                        {rating === 7 && "Strongly disagree"}
                                      </div>
                                </div>
                              ))}
                            </div>
                                
                                {/* Rating scale labels for mobile - more readable layout */}
                                <div className="mt-4 grid grid-cols-1 gap-1 md:hidden">
                                  <div className="flex justify-between text-xs">
                                    <span>1: Strongly agree</span>
                                    <span>7: Strongly disagree</span>
                          </div>
                            </div>
                                </div>
                            );
                          })}
                          
                          <div className="p-4 bg-gray-100 rounded-md text-center text-gray-600">
                            <p>+ {parseInt(ryffScale) - 3} more questions</p>
                            <p className="text-sm mt-1">Full assessment contains {ryffScale} questions total</p>
                            </div>
                          </div>
                        </div>
                    )}
                    
                    <DialogFooter>
                      <Button onClick={() => setPreviewDialogOpen(false)}>Close Preview</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {schedule === "now" ? "Send Now" : "Schedule"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Assessment Distribution</DialogTitle>
                      <DialogDescription>Please review the details before proceeding</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Assessment Name:</p>
                          <p className="text-sm">{assignmentName || "Unnamed Assessment"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Target Group:</p>
                          <p className="text-sm">
                            Departments ({selectedDepartments.length})
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Ryff Scale:</p>
                          <p className="text-sm">{ryffScale} items</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Schedule:</p>
                          <p className="text-sm">
                            {schedule === "now" ? "Immediate" : new Date(scheduleDate).toLocaleString()}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium">Selected Departments:</p>
                          <p className="text-sm">
                            {selectedDepartments.map(dept => {
                              const hasFilters = Object.keys(departmentFilters[dept]).length > 0;
                              return `${dept}${hasFilters ? ' (Customized)' : ''}`;
                            }).join(", ")}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium">Total Recipients:</p>
                          <p className="text-sm">{getTotalRecipients()} people</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleConfirm}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Saved Versions
              </CardTitle>
              <CardDescription>Select a version of the Ryff assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm">
                        <span className="font-medium">Scale:</span> {template.scale} items
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Dialog open={openTemplateDialog && viewingTemplateId === template.id} onOpenChange={(open) => {
                        if (!open) {
                          setOpenTemplateDialog(false);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleViewTemplate(template.id)}
                          >
                        <FileText className="h-3.5 w-3.5" />
                            View
                      </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>{template.description}</DialogDescription>
                          </DialogHeader>
                          
                          {template.questions && (
                            <div className="space-y-4 mt-4">
                              <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 sticky top-0 z-10">
                                <h2 className="text-xl font-semibold mb-2">Ryff Psychological Well-being Scale</h2>
                                <div className="bg-blue-50 p-4 rounded-md mb-4">
                                  <h3 className="font-medium mb-2">Instructions:</h3>
                                  <p>Circle one response below each statement to indicate how much you agree or disagree.</p>
                                  <p className="mt-2 font-medium">
                                    1 = strongly agree; 2 = somewhat agree; 3 = a little agree; 4 = neither agree or disagree; 5 = a little disagree; 6 = somewhat disagree; 7 = strongly disagree.
                                  </p>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="mt-4">
                                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                                    <span>Question Progress</span>
                                    <span>{Object.keys(questionResponses).length} of {template.questions.length} answered</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-500 rounded-full" 
                                      style={{ width: `${calculateProgress()}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-6">
                                {template.questions.map((question, index) => {
                                  // Extract just the question text without the number prefix
                                  const questionText = question.replace(/^\d+\.\s*/, '');
                                  const questionNumber = index + 1;
                                  const selectedRating = questionResponses[questionNumber] || null;
                                  
                                  return (
                                    <div key={index} className="bg-white rounded-lg shadow-sm border p-6" id={`question-${questionNumber}`}>
                                      <div className="flex items-start gap-2">
                                        <div className="bg-blue-100 text-blue-800 h-7 min-w-7 rounded-full flex items-center justify-center font-medium text-sm">
                                          {questionNumber}
                                        </div>
                                        <h3 className="font-medium">{questionText}</h3>
                                      </div>
                                      
                                      <div className="grid grid-cols-7 gap-1 mt-6 md:mt-4">
                                        {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                                          <div key={rating} className="flex flex-col items-center">
                                            <div 
                                              className={`h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer mb-1 transition-colors ${
                                                selectedRating === rating 
                                                  ? 'bg-blue-500 text-white border-blue-500' 
                                                  : 'hover:bg-blue-50 border-gray-200'
                                              }`}
                                              onClick={() => handleRatingSelect(questionNumber, rating)}
                                            >
                                              {rating}
                                            </div>
                                            <div className="text-xs text-center hidden md:block">
                                              {rating === 1 && "Strongly agree"}
                                              {rating === 2 && "Somewhat agree"}
                                              {rating === 3 && "A little agree"}
                                              {rating === 4 && "Neither"}
                                              {rating === 5 && "A little disagree"}
                                              {rating === 6 && "Somewhat disagree"}
                                              {rating === 7 && "Strongly disagree"}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      
                                      {/* Rating scale labels for mobile - more readable layout */}
                                      <div className="mt-4 grid grid-cols-1 gap-1 md:hidden">
                                        <div className="flex justify-between text-xs">
                                          <span>1: Strongly agree</span>
                                          <span>7: Strongly disagree</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                                
                                {/* Submit section */}
                                <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
                                  <h3 className="text-lg font-medium mb-4">Your response has been recorded</h3>
                                  <p className="text-gray-500 mb-6 text-center max-w-md">
                                    Thank you for completing the Ryff Psychological Well-being Scale assessment. 
                                    Your responses will help us better understand and support your well-being.
                                  </p>
                                  <Button 
                                    size="lg" 
                                    className="bg-blue-600 hover:bg-blue-700"
                                    disabled={Object.keys(questionResponses).length < template.questions.length}
                                    onClick={handleSubmitAssessment}
                                  >
                                    Submit
                                  </Button>
                                  
                                  {Object.keys(questionResponses).length < template.questions.length && (
                                    <p className="text-amber-600 mt-2 text-sm">
                                      Please answer all questions before submitting.
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              {template.scoring && (
                                <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
                                  <h3 className="text-lg font-medium mb-2">Scoring Information:</h3>
                                  <div className="text-sm p-4 bg-gray-50 rounded-md">
                                    {template.scoring}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Assessment History
                  </CardTitle>
                  <CardDescription>View and manage past assessment distributions</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search assessments..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-[250px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment Name</TableHead>
                    <TableHead>Target Group</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Recipients</TableHead>
                    <TableHead className="text-right">Completion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.target}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">{item.recipients}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${(item.completed / item.recipients) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm">{Math.round((item.completed / item.recipients) * 100)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewAssignment(item.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Assessment Details</DialogTitle>
                                <DialogDescription>Viewing details for {item.name}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Assessment Name:</p>
                                    <p className="text-sm">{item.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Date Sent:</p>
                                    <p className="text-sm">{item.date}</p>
                                  </div>
                                </div>
                                
                                {/* Target Groups with clickable badges */}
                                <div>
                                  <p className="text-sm font-medium mb-2">Target Groups:</p>
                                  <div className="p-2 bg-muted/50 rounded-md">
                                    {expandTargetGroups(item.target).map((group, index) => (
                                      <Badge 
                                        key={index} 
                                        variant={viewingDepartment === group ? "default" : "secondary"} 
                                        className="mr-1 mb-1 cursor-pointer hover:bg-muted"
                                        onClick={() => handleViewDepartment(group)}
                                      >
                                        {group}
                                      </Badge>
                                    ))}
                                    {viewingDepartment && (
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="ml-2 h-6 text-xs"
                                        onClick={() => setViewingDepartment(null)}
                                      >
                                        View All
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Department-specific or overall details */}
                                {viewingDepartment ? (
                                  // Show department-specific details
                                  (() => {
                                    const deptDetails = getDepartmentDetails(item.id, viewingDepartment)
                                    if (!deptDetails) return <p>No details available for this department.</p>
                                    
                                    return (
                                      <div className="p-3 border rounded-md">
                                        <h3 className="text-md font-medium mb-3">{viewingDepartment} Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm font-medium">Recipients:</p>
                                            <p className="text-sm">{deptDetails.recipients} people</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Completion Rate:</p>
                                            <p className="text-sm">{Math.round((deptDetails.completed / deptDetails.recipients) * 100)}%</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Completed:</p>
                                            <p className="text-sm">{deptDetails.completed} of {deptDetails.recipients}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Incomplete:</p>
                                            <p className="text-sm">{deptDetails.recipients - deptDetails.completed} of {deptDetails.recipients}</p>
                                          </div>
                                        </div>
                                        <div className="mt-4">
                                          <h4 className="text-sm font-medium mb-2">Completion Progress</h4>
                                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-green-500 rounded-full" 
                                              style={{ width: `${(deptDetails.completed / deptDetails.recipients) * 100}%` }}
                                            />
                                          </div>
                                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                            <span>0%</span>
                                            <span>50%</span>
                                            <span>100%</span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })()
                                ) : (
                                  // Show overall details
                                  <>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium">Recipients:</p>
                                        <p className="text-sm">{item.recipients} people</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Completion Rate:</p>
                                        <p className="text-sm">{Math.round((item.completed / item.recipients) * 100)}%</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Completed:</p>
                                        <p className="text-sm">{item.completed} of {item.recipients}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Incomplete:</p>
                                        <p className="text-sm">{item.recipients - item.completed} of {item.recipients}</p>
                                      </div>
                                    </div>
                                    <div className="pt-4 border-t">
                                      <h4 className="text-sm font-medium mb-2">Completion Progress</h4>
                                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-green-500 rounded-full" 
                                          style={{ width: `${(item.completed / item.recipients) * 100}%` }}
                                        />
                                      </div>
                                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                        <span>0%</span>
                                        <span>50%</span>
                                        <span>100%</span>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => {
                                  setViewingAssignment(null)
                                  setViewingDepartment(null)
                                }}>
                                  Close
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
