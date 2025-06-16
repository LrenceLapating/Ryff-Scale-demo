"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input" 
import { FileText, Download, Eye, BarChart3, Users, TrendingUp, Search, User, Calendar, FileSpreadsheet, Building } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"

// Import jsPDF correctly
import jsPDF from 'jspdf';
// Import autoTable (should be a default import)
import autoTable from 'jspdf-autotable';

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

// Mock scoring data from the Ryff scoring component
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

// Mock assessment data for graphs
const mockAssessmentHistory = [
  { date: "Jan 2023", autonomy: 65, environmental: 72, personal: 68, positive: 75, purpose: 80, self: 70 },
  { date: "Feb 2023", autonomy: 68, environmental: 75, personal: 72, positive: 78, purpose: 82, self: 73 },
  { date: "Mar 2023", autonomy: 70, environmental: 74, personal: 75, positive: 80, purpose: 79, self: 75 },
  { date: "Apr 2023", autonomy: 72, environmental: 76, personal: 78, positive: 82, purpose: 81, self: 77 },
  { date: "May 2023", autonomy: 75, environmental: 78, personal: 80, positive: 85, purpose: 83, self: 79 },
];

const reportTypes = [
  { id: "individual", name: "Individual Report", description: "Detailed well-being report for a specific person" },
  { id: "department", name: "Department Summary", description: "Department-wide well-being overview" },
]

const exportFormats = [
  { id: "pdf", name: "PDF", icon: FileText },
]

export function Reports() {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Extract unique departments from mock data
  const departments = useMemo(() => 
    Array.from(new Set(mockScoredAssessments.map(a => a.department))),
    []
  );

  // Calculate aggregated data for departments
  const departmentData = useMemo(() => departments.map(dept => {
    const deptAssessments = mockScoredAssessments.filter(a => a.department === dept);
    const totalScore = deptAssessments.reduce((sum, a) => sum + a.overallScore, 0);
    const avgScore = Math.round(totalScore / deptAssessments.length);
    
    // Calculate dimension averages
    const dimensionScores = {} as { [key in DimensionName]: number };
    for (const dimension of dimensions) {
      const totalDimScore = deptAssessments.reduce((sum, a) => sum + a.dimensions[dimension], 0);
      dimensionScores[dimension] = Math.round(totalDimScore / deptAssessments.length);
    }
    
    // Count risk levels
    const highRisk = deptAssessments.filter(a => a.riskLevel === "high").length;
    const mediumRisk = deptAssessments.filter(a => a.riskLevel === "medium").length;
    const lowRisk = deptAssessments.filter(a => a.riskLevel === "low").length;
    
    return {
      department: dept,
      studentCount: deptAssessments.length,
      overallScore: avgScore,
      dimensions: dimensionScores,
      highRisk,
      mediumRisk,
      lowRisk
    };
  }), [departments]);

  // Prepare department data for charts
  const departmentChartData = useMemo(() => {
    if (!selectedDepartment) return [];
    
    const deptData = departmentData.find(d => d.department === selectedDepartment);
    if (!deptData) return [];
    
    return Object.entries(deptData.dimensions).map(([dimension, score]) => ({
      dimension,
      score
    }));
  }, [departmentData, selectedDepartment]);

  // Risk distribution data for pie chart
  const riskDistributionData = useMemo(() => {
    if (!selectedDepartment) return [];
    
    const deptData = departmentData.find(d => d.department === selectedDepartment);
    if (!deptData) return [];
    
    return [
      { name: "High Risk", value: deptData.highRisk, fill: "#ef4444" },
      { name: "Medium Risk", value: deptData.mediumRisk, fill: "#f97316" },
      { name: "Low Risk", value: deptData.lowRisk, fill: "#22c55e" }
    ];
  }, [departmentData, selectedDepartment]);

  // Handle report type selection
  const handleReportTypeSelect = (id: string) => {
    setSelectedReportType(id);
    if (id === "individual") {
      setShowStudentSearch(true);
      setSelectedDepartment(null);
    } else if (id === "department") {
      setShowStudentSearch(false);
      setSelectedStudent(null);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredStudents([]);
    } else {
      const filtered = mockScoredAssessments.filter(
        (student) =>
          student.studentName.toLowerCase().includes(query.toLowerCase()) ||
          student.studentId.toLowerCase().includes(query.toLowerCase()) ||
          student.department.toLowerCase().includes(query.toLowerCase()) ||
          student.section.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  // Handle student selection
  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
    setSearchQuery("");
    setFilteredStudents([]);
  };

  // Handle department selection
  const handleDepartmentSelect = (departmentName: string) => {
    setSelectedDepartment(departmentName);
  };

  // Generate and download PDF report
  const generatePDFReport = () => {
    if (!selectedStudent && !selectedDepartment) return;
    
    try {
      // Import jsPDF and jspdf-autotable dynamically
      import('jspdf').then(jsPDFModule => {
        const jsPDF = jsPDFModule.default;
        import('jspdf-autotable').then(autoTableModule => {
          const doc = new jsPDF();
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const margin = 15;
          let y = margin;
          
          // Add header
          doc.setFontSize(20);
          doc.setTextColor(14, 116, 144); // Teal color
          if (selectedStudent) {
            doc.text("Individual Student Report", pageWidth / 2, y, { align: 'center' });
          } else {
            doc.text("Department Summary Report", pageWidth / 2, y, { align: 'center' });
          }
          
          y += 15;
          doc.setFontSize(12);
          doc.setTextColor(60, 60, 60); // Dark gray
          doc.text("Ryff Psychological Well-Being Assessment", pageWidth / 2, y, { align: 'center' });
          doc.setLineWidth(0.5);
          doc.line(margin, y + 5, pageWidth - margin, y + 5);
          y += 15;
          
          if (selectedStudent) {
            // Individual Student Report
            doc.setFontSize(14);
            doc.text("Student Information", margin, y);
            y += 10;
            
            doc.setFontSize(11);
            doc.text(`Name: ${selectedStudent.studentName}`, margin, y);
            y += 6;
            doc.text(`ID: ${selectedStudent.studentId}`, margin, y);
            y += 6;
            doc.text(`Department: ${selectedStudent.department}`, margin, y);
            y += 6;
            doc.text(`Section: ${selectedStudent.section}`, margin, y);
            y += 6;
            doc.text(`Assessment Date: ${selectedStudent.submissionDate}`, margin, y);
            y += 6;
            doc.text(`Risk Level: ${selectedStudent.riskLevel.charAt(0).toUpperCase() + selectedStudent.riskLevel.slice(1)}`, margin, y);
            y += 15;
            
            // Overall Score
            doc.setFontSize(14);
            doc.text("Overall Psychological Well-Being Score", margin, y);
            y += 10;
            
            const overallScore = selectedStudent.overallScore;
            // Draw score bar
            doc.setFillColor(220, 220, 220); // Light gray background
            doc.rect(margin, y, pageWidth - 2 * margin, 10, 'F');
            doc.setFillColor(14, 116, 144); // Teal for the score
            doc.rect(margin, y, (pageWidth - 2 * margin) * (overallScore / 100), 10, 'F');
            
            // Add score text
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.text(overallScore.toString(), pageWidth - margin - 10, y + 7);
            y += 20;
            
            // Dimension Scores as simple text (without autoTable)
            doc.setFontSize(14);
            doc.text("Dimension Scores", margin, y);
            y += 10;
            
            // Header row
            doc.setFillColor(14, 116, 144);
            doc.rect(margin, y, 100, 8, 'F');
            doc.rect(margin + 100, y, 30, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text("Dimension", margin + 5, y + 5);
            doc.text("Score", margin + 110, y + 5);
            y += 8;
            
            // Dimension rows
            doc.setTextColor(60, 60, 60);
            Object.entries(selectedStudent.dimensions).forEach(([dimension, score], index) => {
              const isEven = index % 2 === 0;
              if (isEven) {
                doc.setFillColor(240, 240, 240);
                doc.rect(margin, y, 130, 8, 'F');
              }
              doc.text(dimension, margin + 5, y + 5);
              doc.text((score as number).toString(), margin + 110, y + 5);
              y += 8;
            });
            
            y += 10;
            
            // Risk Dimensions
            if (selectedStudent.riskDimensions.length > 0) {
              doc.setTextColor(220, 53, 69); // Red for risk
              doc.setFontSize(12);
              doc.text("Areas of Concern", margin, y);
              y += 8;
              
              selectedStudent.riskDimensions.forEach((dimension: string) => {
                doc.text(`- ${dimension}: ${selectedStudent.dimensions[dimension]}`, margin + 5, y);
                y += 6;
              });
              y += 10;
            }
            
            // Recommendations
            doc.setFontSize(14);
            doc.setTextColor(60, 60, 60); // Back to dark gray
            doc.text("Recommendations", margin, y);
            y += 10;
            
            doc.setFontSize(11);
            const recommendations = [];
            
            if (selectedStudent.riskDimensions.includes("Autonomy")) {
              recommendations.push("Consider activities that promote independent decision-making and self-determination");
            }
            if (selectedStudent.riskDimensions.includes("Environmental Mastery")) {
              recommendations.push("Work on developing skills for better management of daily responsibilities and environment");
            }
            if (selectedStudent.riskDimensions.includes("Personal Growth")) {
              recommendations.push("Explore new experiences that foster continued development and self-improvement");
            }
            if (selectedStudent.riskDimensions.includes("Positive Relations")) {
              recommendations.push("Focus on building meaningful and trusting relationships with others");
            }
            if (selectedStudent.riskDimensions.includes("Purpose in Life")) {
              recommendations.push("Work on setting meaningful goals and developing a clearer sense of direction");
            }
            if (selectedStudent.riskDimensions.includes("Self-Acceptance")) {
              recommendations.push("Practice self-compassion and develop a more positive attitude toward the self");
            }
            if (selectedStudent.riskLevel === "high") {
              recommendations.push("Consider referral for more in-depth psychological support");
            }
            if (selectedStudent.riskDimensions.length === 0) {
              recommendations.push("Maintain current well-being practices and continue supporting overall psychological health");
            }
            
            recommendations.forEach((rec, index) => {
              doc.text(`${index + 1}. ${rec}`, margin, y);
              y += 6;
            });
          } else if (selectedDepartment) {
            // Department Report
            const deptData = departmentData.find(d => d.department === selectedDepartment);
            if (!deptData) return;
            
            doc.setFontSize(14);
            doc.text("Department Information", margin, y);
            y += 10;
            
            doc.setFontSize(11);
            doc.text(`Department: ${selectedDepartment}`, margin, y);
            y += 6;
            doc.text(`Number of Students: ${deptData.studentCount}`, margin, y);
            y += 6;
            doc.text(`Average Score: ${deptData.overallScore}`, margin, y);
            y += 6;
            doc.text(`Risk Distribution: `, margin, y);
            doc.text(`High: ${deptData.highRisk} (${Math.round((deptData.highRisk / deptData.studentCount) * 100)}%)`, margin + 50, y);
            y += 6;
            doc.text(`Medium: ${deptData.mediumRisk} (${Math.round((deptData.mediumRisk / deptData.studentCount) * 100)}%)`, margin + 50, y);
            y += 6;
            doc.text(`Low: ${deptData.lowRisk} (${Math.round((deptData.lowRisk / deptData.studentCount) * 100)}%)`, margin + 50, y);
            y += 15;
            
            // Dimension Averages as simple text (without autoTable)
            doc.setFontSize(14);
            doc.text("Dimension Averages", margin, y);
            y += 10;
            
            // Header row
            doc.setFillColor(14, 116, 144);
            doc.rect(margin, y, 100, 8, 'F');
            doc.rect(margin + 100, y, 50, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text("Dimension", margin + 5, y + 5);
            doc.text("Average Score", margin + 110, y + 5);
            y += 8;
            
            // Dimension rows
            doc.setTextColor(60, 60, 60);
            Object.entries(deptData.dimensions).forEach(([dimension, score], index) => {
              const isEven = index % 2 === 0;
              if (isEven) {
                doc.setFillColor(240, 240, 240);
                doc.rect(margin, y, 150, 8, 'F');
              }
              doc.text(dimension, margin + 5, y + 5);
              doc.text((score as number).toString(), margin + 110, y + 5);
              y += 8;
            });
            
            y += 15;
            
            // Insights & Recommendations
            doc.setFontSize(14);
            doc.text("Department Insights", margin, y);
            y += 10;
            
            doc.setFontSize(11);
            
            // Find highest and lowest scoring dimensions
            const dimensions = Object.entries(deptData.dimensions);
            const highestDim = dimensions.reduce((prev, curr) => 
              (curr[1] > prev[1]) ? curr : prev
            );
            const lowestDim = dimensions.reduce((prev, curr) => 
              (curr[1] < prev[1]) ? curr : prev
            );
            
            // Risk level insights
            const highRiskPercentage = Math.round((deptData.highRisk / deptData.studentCount) * 100);
            const needsAttention = highRiskPercentage > 20 || deptData.overallScore < 60;
            
            doc.text("Key Insights:", margin, y);
            y += 8;
            doc.text(`• Highest scoring dimension: ${highestDim[0]} (${highestDim[1]})`, margin + 5, y);
            y += 6;
            doc.text(`• Lowest scoring dimension: ${lowestDim[0]} (${lowestDim[1]})`, margin + 5, y);
            y += 15;
            
            doc.text("Recommendations:", margin, y);
            y += 8;
            
            const recommendations = [];
            
            if ((lowestDim[1] as number) < 60) {
              recommendations.push(`Consider department-wide initiatives focusing on ${lowestDim[0]} development`);
            }
            if (deptData.highRisk > 0) {
              recommendations.push(`Provide targeted support for the ${deptData.highRisk} students identified as high-risk`);
            }
            if (deptData.overallScore < 60) {
              recommendations.push(`Schedule well-being workshops to improve overall psychological health`);
            }
            if ((highestDim[1] as number) > 70) {
              recommendations.push(`Consider peer-mentoring programs to leverage strengths in ${highestDim[0]}`);
            }
            if (!needsAttention) {
              recommendations.push(`Maintain current well-being support systems as they appear effective`);
            }
            
            recommendations.forEach((rec, index) => {
              doc.text(`${index + 1}. ${rec}`, margin + 5, y);
              y += 6;
            });
          }
          
          // Footer
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          const today = new Date().toLocaleDateString();
          doc.text(`Report generated on ${today}`, margin, pageHeight - 10);
          doc.text("Ryff PWB Assessment System", pageWidth - margin, pageHeight - 10, { align: 'right' });
          
          // Save PDF with appropriate filename
          if (selectedStudent) {
            doc.save(`${selectedStudent.studentName.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
          } else if (selectedDepartment) {
            doc.save(`${selectedDepartment}_Department_Report_${new Date().toISOString().split('T')[0]}.pdf`);
          }
        });
      }).catch(error => {
        console.error("Error loading PDF libraries:", error);
        alert("Error generating PDF. Please try again.");
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  // Get risk level color
  const getRiskLevelColor = (risk: string) => {
    switch(risk) {
      case "high": return "text-red-600";
      case "medium": return "text-amber-600";
      case "low": return "text-green-600";
      default: return "text-slate-600";
    }
  };
  
  // Get color based on score value
  const getScoreColor = (score: number) => {
    if (score < 40) return "text-red-600";
    if (score < 50) return "text-amber-600";
    if (score < 70) return "text-teal-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </CardTitle>
          <CardDescription>Generate and export individual or department well-being reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Report Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedReportType === type.id ? 'border-2 border-teal-600' : ''}`}
                  onClick={() => handleReportTypeSelect(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id={type.id} 
                        checked={selectedReportType === type.id} 
                        onCheckedChange={() => handleReportTypeSelect(type.id)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={type.id} className="font-medium cursor-pointer">
                          {type.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Department Selection (appears only when Department Report is selected) */}
          {selectedReportType === "department" && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Department</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentData.map((dept) => (
                  <Card 
                    key={dept.department} 
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedDepartment === dept.department ? 'border-2 border-teal-600' : ''}`}
                    onClick={() => handleDepartmentSelect(dept.department)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Building className="h-10 w-10 text-slate-600 mb-2" />
                        <h3 className="font-medium">{dept.department}</h3>
                        <div className="text-sm text-muted-foreground">{dept.studentCount} students</div>
                        <div className={`text-lg font-bold mt-2 ${getScoreColor(dept.overallScore)}`}>
                          {dept.overallScore}
                        </div>
                        <div className="text-xs">Average Score</div>
                        <div className="flex gap-2 mt-2">
                          {dept.highRisk > 0 && (
                            <div className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                              {dept.highRisk} High Risk
                            </div>
                          )}
                          {dept.mediumRisk > 0 && (
                            <div className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                              {dept.mediumRisk} Medium
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Department Summary Report */}
          {selectedDepartment && (
            <div className="space-y-6 pt-4 border-t">
              {/* Department Header */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-slate-200 rounded-lg flex items-center justify-center">
                  <Building className="h-8 w-8 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedDepartment} Department</h3>
                  <div className="text-sm text-muted-foreground">
                    {departmentData.find(d => d.department === selectedDepartment)?.studentCount} students assessed
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall Score: <span className={getScoreColor(departmentData.find(d => d.department === selectedDepartment)?.overallScore || 0)}>
                      {departmentData.find(d => d.department === selectedDepartment)?.overallScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Department Dimension Scores */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dimension Averages</h3>
                <Card className="p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentChartData} layout="vertical" margin={{ left: 120 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="dimension" type="category" width={120} />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="score" 
                          name="Average Score" 
                          fill="#0891b2" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Risk Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Risk Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['high', 'medium', 'low'].map(risk => {
                    const deptData = departmentData.find(d => d.department === selectedDepartment);
                    const count = risk === 'high' ? deptData?.highRisk : 
                                 risk === 'medium' ? deptData?.mediumRisk : 
                                 deptData?.lowRisk;
                    const total = deptData ? deptData.studentCount : 0;
                    const percentage = total ? Math.round((count || 0) / total * 100) : 0;
                    
                    return (
                      <Card key={risk}>
                        <CardContent className="p-4 text-center">
                          <h4 className={`text-lg font-bold mb-1 ${
                            risk === 'high' ? 'text-red-600' : 
                            risk === 'medium' ? 'text-amber-600' : 
                            'text-green-600'
                          }`}>
                            {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
                          </h4>
                          <div className="text-3xl font-bold">{count}</div>
                          <div className="text-sm text-muted-foreground">students ({percentage}%)</div>
                          <div className="mt-2 w-full bg-gray-100 rounded-full h-2.5">
                            <div 
                              className={`h-full rounded-full ${
                                risk === 'high' ? 'bg-red-600' : 
                                risk === 'medium' ? 'bg-amber-600' : 
                                'bg-green-600'
                              }`} 
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Department Insights */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Department Insights</h3>
                <Card className="p-6">
                  {(() => {
                    const deptData = departmentData.find(d => d.department === selectedDepartment);
                    if (!deptData) return null;
                    
                    // Find highest and lowest scoring dimensions
                    const dimensions = Object.entries(deptData.dimensions);
                    const highestDim = dimensions.reduce((prev, curr) => 
                      (curr[1] > prev[1]) ? curr : prev
                    );
                    const lowestDim = dimensions.reduce((prev, curr) => 
                      (curr[1] < prev[1]) ? curr : prev
                    );
                    
                    // Risk level insights
                    const highRiskPercentage = Math.round((deptData.highRisk / deptData.studentCount) * 100);
                    const needsAttention = highRiskPercentage > 20 || deptData.overallScore < 60;
                    
                    return (
                      <>
                        <h4 className="font-medium mb-2">Overall Assessment</h4>
                        <p className="text-slate-700 mb-4">
                          The {selectedDepartment} department shows an average psychological well-being score of {deptData.overallScore}, 
                          which indicates a {deptData.overallScore >= 70 ? "strong" : 
                            deptData.overallScore >= 60 ? "good" : 
                            deptData.overallScore >= 50 ? "moderate" : "concerning"} level of psychological well-being overall.
                        </p>
                        
                        <h4 className="font-medium mb-2">Strengths & Areas for Development</h4>
                        <p className="text-slate-700 mb-2">
                          <strong>Highest scoring dimension:</strong> {highestDim[0]} ({highestDim[1]}) - 
                          Students appear to have developed good {highestDim[0].toLowerCase()} skills.
                        </p>
                        <p className="text-slate-700 mb-4">
                          <strong>Lowest scoring dimension:</strong> {lowestDim[0]} ({lowestDim[1]}) - 
                          This area may need additional focus or interventions.
                        </p>
                        
                        <h4 className="font-medium mb-2">Risk Assessment</h4>
                        <p className="text-slate-700 mb-4">
                          {deptData.highRisk > 0 ? (
                            `${deptData.highRisk} students (${highRiskPercentage}%) are flagged as high risk, which ${
                              highRiskPercentage > 20 ? "is concerning and requires immediate attention" : 
                              "should be monitored closely"
                            }.`
                          ) : "No students are currently flagged as high risk, which is positive."}
                        </p>
                        
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="list-disc pl-5 text-slate-700">
                          {lowestDim[1] < 60 && (
                            <li>Consider department-wide initiatives focusing on {lowestDim[0]} development</li>
                          )}
                          {deptData.highRisk > 0 && (
                            <li>Provide targeted support for the {deptData.highRisk} students identified as high-risk</li>
                          )}
                          {deptData.overallScore < 60 && (
                            <li>Schedule well-being workshops to improve overall psychological health</li>
                          )}
                          {highestDim[1] > 70 && (
                            <li>Consider peer-mentoring programs to leverage strengths in {highestDim[0]}</li>
                          )}
                          {!needsAttention && (
                            <li>Maintain current well-being support systems as they appear effective</li>
                          )}
                        </ul>
                      </>
                    );
                  })()}
                </Card>
              </div>
            </div>
          )}

          {/* Search Student (appears only when Individual Report is selected) */}
          {showStudentSearch && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Search Student</Label>
              <div className="relative">
                <div className="flex items-center border rounded-md">
                  <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name, ID, department or section"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border-0 focus:ring-0"
                  />
                </div>
                {filteredStudents.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border max-h-60 overflow-auto">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectStudent(student)}
                      >
                        <div className="font-medium">{student.studentName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {student.studentId} | {student.department}, {student.section}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected Student Information */}
          {selectedStudent && (
            <div className="space-y-6 pt-4 border-t">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.studentName}</h3>
                  <div className="text-sm text-muted-foreground">ID: {selectedStudent.studentId}</div>
                  <div className="text-sm text-muted-foreground">{selectedStudent.department}, {selectedStudent.section}</div>
                  <div 
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      selectedStudent.riskLevel === "high" ? "bg-red-50 text-red-700 border-red-200" :
                      selectedStudent.riskLevel === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-green-50 text-green-700 border-green-200"
                    }`}>
                    Risk: {selectedStudent.riskLevel.charAt(0).toUpperCase() + selectedStudent.riskLevel.slice(1)}
                  </div>
                </div>
              </div>

              {/* Assessment Scores */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Overall Psychological Well-Being Score</h3>
                  <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-600" 
                      style={{ width: `${selectedStudent.overallScore}%` }}
                    ></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold text-sm">
                      {selectedStudent.overallScore}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">Dimension Scores</h3>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                      {/* Autonomy */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Autonomy</span>
                          <span className={`font-semibold ${selectedStudent.dimensions["Autonomy"] < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStudent.dimensions["Autonomy"]}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={selectedStudent.dimensions["Autonomy"] < 50 ? 'h-full bg-red-500' : 'h-full bg-teal-600'} 
                            style={{ width: `${selectedStudent.dimensions["Autonomy"]}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Environmental Mastery */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Environmental Mastery</span>
                          <span className={`font-semibold ${selectedStudent.dimensions["Environmental Mastery"] < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStudent.dimensions["Environmental Mastery"]}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={selectedStudent.dimensions["Environmental Mastery"] < 50 ? 'h-full bg-red-500' : 'h-full bg-teal-600'} 
                            style={{ width: `${selectedStudent.dimensions["Environmental Mastery"]}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Personal Growth */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Personal Growth</span>
                          <span className={`font-semibold ${selectedStudent.dimensions["Personal Growth"] < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStudent.dimensions["Personal Growth"]}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={selectedStudent.dimensions["Personal Growth"] < 50 ? 'h-full bg-red-500' : 'h-full bg-teal-600'} 
                            style={{ width: `${selectedStudent.dimensions["Personal Growth"]}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Positive Relations */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Positive Relations</span>
                          <span className={`font-semibold ${selectedStudent.dimensions["Positive Relations"] < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStudent.dimensions["Positive Relations"]}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={selectedStudent.dimensions["Positive Relations"] < 50 ? 'h-full bg-red-500' : 'h-full bg-teal-600'} 
                            style={{ width: `${selectedStudent.dimensions["Positive Relations"]}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Purpose in Life */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Purpose in Life</span>
                          <span className={`font-semibold ${selectedStudent.dimensions["Purpose in Life"] < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStudent.dimensions["Purpose in Life"]}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={selectedStudent.dimensions["Purpose in Life"] < 50 ? 'h-full bg-red-500' : 'h-full bg-teal-600'} 
                            style={{ width: `${selectedStudent.dimensions["Purpose in Life"]}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Self-Acceptance */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Self-Acceptance</span>
                          <span className={`font-semibold ${selectedStudent.dimensions["Self-Acceptance"] < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStudent.dimensions["Self-Acceptance"]}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={selectedStudent.dimensions["Self-Acceptance"] < 50 ? 'h-full bg-red-500' : 'h-full bg-teal-600'} 
                            style={{ width: `${selectedStudent.dimensions["Self-Acceptance"]}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Graph */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Performance Over Time</h3>
                <Card className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockAssessmentHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="autonomy" stroke="#0891b2" name="Autonomy" />
                        <Line type="monotone" dataKey="environmental" stroke="#0e7490" name="Environmental Mastery" />
                        <Line type="monotone" dataKey="personal" stroke="#0369a1" name="Personal Growth" />
                        <Line type="monotone" dataKey="positive" stroke="#0284c7" name="Positive Relations" />
                        <Line type="monotone" dataKey="purpose" stroke="#0ea5e9" name="Purpose in Life" />
                        <Line type="monotone" dataKey="self" stroke="#38bdf8" name="Self-Acceptance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Interpretation */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Assessment Interpretation</h3>
                <Card className="p-6">
                  <h4 className="font-medium mb-2">Overall Well-Being</h4>
                  <p className="text-slate-700 mb-4">
                    {selectedStudent.studentName}'s well-being profile indicates a {selectedStudent.overallScore >= 70 ? "highly positive" : 
                     selectedStudent.overallScore >= 60 ? "generally positive" : 
                     selectedStudent.overallScore >= 50 ? "moderate" : "concerning"} psychological state, 
                    with {selectedStudent.riskDimensions.length === 0 ? "balanced scores across all dimensions." : 
                    `potential concerns in ${selectedStudent.riskDimensions.join(", ")}.`}
                  </p>
                  
                  <h4 className="font-medium mb-2">Key Strengths</h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1 text-slate-700">
                    {Object.entries(selectedStudent.dimensions)
                      .filter(([_, score]) => (score as number) >= 70)
                      .map(([dimension, score]) => (
                        <li key={dimension}>{dimension}: Strong score of {score as number}</li>
                      ))}
                    {Object.entries(selectedStudent.dimensions).filter(([_, score]) => (score as number) >= 70).length === 0 && (
                      <li>No particular strengths identified (all dimension scores below 70)</li>
                    )}
                  </ul>
                  
                  <h4 className="font-medium mb-2">Areas for Development</h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1 text-slate-700">
                    {selectedStudent.riskDimensions.map((dimension: string) => (
                      <li key={dimension}>{dimension}: Low score of {selectedStudent.dimensions[dimension]}</li>
                    ))}
                    {selectedStudent.riskDimensions.length === 0 && (
                      <li>No major concerns identified in any dimension</li>
                    )}
                  </ul>
                  
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {selectedStudent.riskDimensions.includes("Autonomy") && (
                      <li>Consider activities that promote independent decision-making and self-determination</li>
                    )}
                    {selectedStudent.riskDimensions.includes("Environmental Mastery") && (
                      <li>Work on developing skills for better management of daily responsibilities and environment</li>
                    )}
                    {selectedStudent.riskDimensions.includes("Personal Growth") && (
                      <li>Explore new experiences that foster continued development and self-improvement</li>
                    )}
                    {selectedStudent.riskDimensions.includes("Positive Relations") && (
                      <li>Focus on building meaningful and trusting relationships with others</li>
                    )}
                    {selectedStudent.riskDimensions.includes("Purpose in Life") && (
                      <li>Work on setting meaningful goals and developing a clearer sense of direction</li>
                    )}
                    {selectedStudent.riskDimensions.includes("Self-Acceptance") && (
                      <li>Practice self-compassion and develop a more positive attitude toward the self</li>
                    )}
                    {selectedStudent.riskLevel === "high" && (
                      <li>Consider referral for more in-depth psychological support</li>
                    )}
                    {selectedStudent.riskDimensions.length === 0 && (
                      <li>Maintain current well-being practices and continue supporting overall psychological health</li>
                    )}
                  </ul>
                </Card>
              </div>
            </div>
          )}

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Date Range</Label>
            <DatePickerWithRange />
          </div>

          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Export Format</Label>
            <div className="flex gap-4">
              {exportFormats.map((format) => (
                <Card key={format.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <format.icon className="h-8 w-8 mx-auto mb-2" />
                    <Label className="cursor-pointer">{format.name}</Label>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="default" 
              className="flex items-center gap-2 w-full"
              disabled={!selectedStudent && !selectedDepartment} 
              onClick={generatePDFReport}
            >
              <Download className="h-4 w-4" />
              Generate & Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
