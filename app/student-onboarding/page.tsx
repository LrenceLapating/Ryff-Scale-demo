"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { mockSchools, School, Department, Program } from "@/lib/mock-data"

// Year levels for dropdown - 1st to 4th year only
const yearLevels = ["First Year", "Second Year", "Third Year", "Fourth Year"]

export default function StudentOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Student information state
  const [formData, setFormData] = useState({
    // Personal information
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    address: "",
    
    // Academic information
    studentId: "",
    school: "",
    department: "",
    course: "",
    yearLevel: "",
    section: "",
    
    // Additional information
    emergencyContactName: "",
    emergencyContactNumber: "",
    medicalConditions: "",
    accommodations: ""
  })

  // Filtered lists for cascading dropdowns
  const [availableDepartments, setAvailableDepartments] = useState<Department[]>([])
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>([])
  const [availableSections, setAvailableSections] = useState<string[]>([])

  // Filter departments based on selected school
  useEffect(() => {
    if (formData.school) {
      const selectedSchool = mockSchools.find(school => school.id === formData.school)
      if (selectedSchool) {
        setAvailableDepartments(selectedSchool.departments)
        // Reset department, course and section when school changes
        setFormData(prev => ({ ...prev, department: "", course: "", section: "" }))
        setAvailablePrograms([])
        setAvailableSections([])
      }
    } else {
      setAvailableDepartments([])
      setAvailablePrograms([])
      setAvailableSections([])
    }
  }, [formData.school])

  // Filter programs based on selected department
  useEffect(() => {
    if (formData.department) {
      const selectedSchool = mockSchools.find(school => school.id === formData.school)
      if (selectedSchool) {
        const selectedDepartment = selectedSchool.departments.find(dept => dept.id === formData.department)
        if (selectedDepartment) {
          setAvailablePrograms(selectedDepartment.programs)
          // Reset course and section when department changes
          setFormData(prev => ({ ...prev, course: "", section: "" }))
          setAvailableSections([])
        }
      }
    } else {
      setAvailablePrograms([])
      setAvailableSections([])
    }
  }, [formData.department, formData.school])

  // Filter sections based on selected course/program and add year level suffix
  useEffect(() => {
    if (formData.course && formData.yearLevel) {
      const selectedSchool = mockSchools.find(school => school.id === formData.school)
      if (selectedSchool) {
        const selectedDepartment = selectedSchool.departments.find(dept => dept.id === formData.department)
        if (selectedDepartment) {
          const selectedProgram = selectedDepartment.programs.find(prog => prog.id === formData.course)
          if (selectedProgram) {
            // Format sections to include year level suffix
            const yearSuffix = formData.yearLevel === "First Year" ? "-1" : 
                               formData.yearLevel === "Second Year" ? "-2" :
                               formData.yearLevel === "Third Year" ? "-3" : "-4";
            
            const formattedSections = selectedProgram.sections.map(section => `${section}${yearSuffix}`);
            setAvailableSections(formattedSections)
            
            // Reset section when course or year level changes
            setFormData(prev => ({ ...prev, section: "" }))
          }
        }
      }
    } else {
      setAvailableSections([])
    }
  }, [formData.course, formData.department, formData.school, formData.yearLevel])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would save this data to a database
      // For this demo, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to student dashboard
      router.push("/dashboard?role=student")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get active schools only
  const activeSchools = mockSchools.filter(school => school.status === "active")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>Ryff PWB</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-3xl">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
              <CardDescription className="text-center">
                Please provide the following information to complete your student profile
              </CardDescription>
              
              {/* Progress indicator */}
              <div className="w-full mt-4">
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${currentStep >= 1 ? "text-primary" : "text-gray-400"}`}>
                    Personal Information
                  </span>
                  <span className={`text-sm font-medium ${currentStep >= 2 ? "text-primary" : "text-gray-400"}`}>
                    Academic Details
                  </span>
                  <span className={`text-sm font-medium ${currentStep >= 3 ? "text-primary" : "text-gray-400"}`}>
                    Additional Information
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                        <RadioGroup 
                          value={formData.gender} 
                          onValueChange={(value) => handleSelectChange("gender", value)}
                          className="flex space-x-4"
                          required
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 2: Academic Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID <span className="text-red-500">*</span></Label>
                      <Input
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="school">School <span className="text-red-500">*</span></Label>
                        <Select 
                          value={formData.school} 
                          onValueChange={(value) => handleSelectChange("school", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your school" />
                          </SelectTrigger>
                          <SelectContent>
                            {activeSchools.map(school => (
                              <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                        <Select 
                          value={formData.department} 
                          onValueChange={(value) => handleSelectChange("department", value)}
                          disabled={!formData.school}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDepartments.map(dept => (
                              <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course">Course/Program <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.course} 
                        onValueChange={(value) => handleSelectChange("course", value)}
                        disabled={!formData.department}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your course/program" />
                        </SelectTrigger>
                        <SelectContent>
                          {availablePrograms.map(program => (
                            <SelectItem key={program.id} value={program.id}>{program.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="yearLevel">Year Level <span className="text-red-500">*</span></Label>
                        <Select 
                          value={formData.yearLevel} 
                          onValueChange={(value) => handleSelectChange("yearLevel", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your year level" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearLevels.map(year => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="section">Section <span className="text-red-500">*</span></Label>
                        <Select 
                          value={formData.section} 
                          onValueChange={(value) => handleSelectChange("section", value)}
                          disabled={!formData.course}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your section" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSections.map(section => (
                              <SelectItem key={section} value={section}>{section}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Emergency Contact Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="emergencyContactName"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactNumber">Emergency Contact Number <span className="text-red-500">*</span></Label>
                        <Input
                          id="emergencyContactNumber"
                          name="emergencyContactNumber"
                          value={formData.emergencyContactNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                      <Textarea
                        id="medicalConditions"
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleInputChange}
                        placeholder="Please list any medical conditions that may be relevant"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accommodations">Special Accommodations (if needed)</Label>
                      <Textarea
                        id="accommodations"
                        name="accommodations"
                        value={formData.accommodations}
                        onChange={handleInputChange}
                        placeholder="Please describe any accommodations you may need"
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-700">
                        By submitting this form, you confirm that all information provided is accurate and complete.
                        Your information will be used in accordance with our privacy policy.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="flex justify-between pt-4">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Previous
                    </Button>
                  ) : (
                    <div></div> // Empty div for spacing
                  )}
                  
                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Complete Registration"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-xs text-gray-500">
                Need help? Contact support at support@ryffpwb.com
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t text-center text-xs text-gray-500">
        © 2024 Ryff PWB Assessment System. All rights reserved.
      </footer>
    </div>
  )
} 