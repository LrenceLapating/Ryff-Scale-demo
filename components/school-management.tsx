"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Mail, Phone, User, MapPin, Check, UserPlus, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { mockSchools, mockCounselors, Department, Program, School } from "@/lib/mock-data"

// Interface definitions
interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  status: string;
  departments: Department[];
}

interface SchoolManagementProps {
  schoolId?: string;
}

export function SchoolManagement({ schoolId }: SchoolManagementProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams?.get("action")
  
  const [isCreating, setIsCreating] = useState(action === "create")
  const [isEditing, setIsEditing] = useState(!!schoolId)
  const [activeTab, setActiveTab] = useState("details")
  const [successMessage, setSuccessMessage] = useState("")
  
  // School form state
  const [formData, setFormData] = useState<SchoolFormData>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    status: "pending",
    departments: []
  })

  // Department management
  const [departments, setDepartments] = useState<Department[]>([])
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  
  // Program management
  const [currentProgram, setCurrentProgram] = useState<{program: Program, departmentId: string} | null>(null)
  const [showProgramModal, setShowProgramModal] = useState(false)
  
  // Section management
  const [showAddSectionInput, setShowAddSectionInput] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  
  // Load school data if editing
  useEffect(() => {
    if (schoolId) {
      const school = mockSchools.find(s => s.id === schoolId)
      if (school) {
        setFormData({
          name: school.name,
          address: school.address,
          city: school.city,
          state: school.state,
          zip: school.zip,
          contactPerson: school.contactPerson,
          email: school.email,
          phone: school.phone,
          website: school.website,
          description: school.description,
          status: school.status,
          departments: school.departments || []
        })
        setDepartments(school.departments || [])
      }
    }
  }, [schoolId])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Department management functions
  const handleAddDepartment = () => {
    setCurrentDepartment({
      id: `dept_${Date.now()}`,
      name: "",
      programs: []
    })
    setShowDepartmentModal(true)
  }
  
  const handleEditDepartment = (department: Department) => {
    setCurrentDepartment({...department})
    setShowDepartmentModal(true)
  }
  
  const handleDeleteDepartment = (departmentId: string) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this department? This will also delete all programs within this department.")) {
      const updatedDepartments = departments.filter(dept => dept.id !== departmentId)
      setDepartments(updatedDepartments)
      setFormData(prev => ({...prev, departments: updatedDepartments}))
    }
  }
  
  const handleSaveDepartment = () => {
    if (!currentDepartment || !currentDepartment.name.trim()) {
      alert("Please enter a department name")
      return
    }
    
    const updatedDepartments = currentDepartment.id.startsWith('dept_') 
      ? [...departments, currentDepartment]
      : departments.map(dept => dept.id === currentDepartment.id ? currentDepartment : dept)
    
    setDepartments(updatedDepartments)
    setFormData(prev => ({...prev, departments: updatedDepartments}))
    setShowDepartmentModal(false)
    setCurrentDepartment(null)
  }
  
  // Program management functions
  const handleAddProgram = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId)
    if (!department) return
    
    setCurrentProgram({
      program: {
        id: `prog_${Date.now()}`,
        name: "",
        sections: []
      },
      departmentId
    })
    setShowProgramModal(true)
    // Show the section input by default for new programs
    setShowAddSectionInput(true)
    // Suggest section "A" for the first section
    setNewSectionName("")
  }
  
  const handleEditProgram = (program: Program, departmentId: string) => {
    setCurrentProgram({
      program: {...program},
      departmentId
    })
    setShowProgramModal(true)
    // Hide the section input by default when editing
    setShowAddSectionInput(false)
    setNewSectionName("")
  }
  
  const handleDeleteProgram = (programId: string, departmentId: string) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this program?")) {
      const updatedDepartments = departments.map(dept => {
        if (dept.id === departmentId) {
          return {
            ...dept,
            programs: dept.programs.filter(prog => prog.id !== programId)
          }
        }
        return dept
      })
      
      setDepartments(updatedDepartments)
      setFormData(prev => ({...prev, departments: updatedDepartments}))
    }
  }
  
  const handleSaveProgram = () => {
    if (!currentProgram || !currentProgram.program.name.trim()) {
      alert("Please enter a program name")
      return
    }
    
    if (currentProgram.program.sections.length === 0) {
      alert("Please add at least one section")
      return
    }
    
    const updatedDepartments = departments.map(dept => {
      if (dept.id === currentProgram.departmentId) {
        const updatedPrograms = currentProgram.program.id.startsWith('prog_')
          ? [...dept.programs, currentProgram.program]
          : dept.programs.map(prog => 
              prog.id === currentProgram.program.id ? currentProgram.program : prog
            )
        
        return {...dept, programs: updatedPrograms}
      }
      return dept
    })
    
    setDepartments(updatedDepartments)
    setFormData(prev => ({...prev, departments: updatedDepartments}))
    setShowProgramModal(false)
    setCurrentProgram(null)
  }
  
  // Section management functions
  const handleAddSection = () => {
    if (!currentProgram) return
    
    setShowAddSectionInput(true)
  }
  
  const handleRemoveSection = (section: string) => {
    if (!currentProgram) return
    
    setCurrentProgram({
      ...currentProgram,
      program: {
        ...currentProgram.program,
        sections: currentProgram.program.sections.filter(s => s !== section)
      }
    })
  }
  
  const handleSectionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSectionName(e.target.value)
  }
  
  const handleSectionInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSectionName.trim()) {
      addNewSection()
    }
  }
  
  const addNewSection = () => {
    if (!currentProgram || !newSectionName.trim()) return
    
    // Check if section already exists
    if (currentProgram.program.sections.includes(newSectionName.trim())) {
      alert("This section already exists")
      return
    }
    
    setCurrentProgram({
      ...currentProgram,
      program: {
        ...currentProgram.program,
        sections: [...currentProgram.program.sections, newSectionName.trim()]
      }
    })
    
    setNewSectionName("")
    setShowAddSectionInput(false)
  }
  
  // Helper function to get next section letter (for default suggestion)
  const getNextSectionLetter = (sections: string[]) => {
    if (sections.length === 0) return "A"
    
    // If sections are just letters, suggest next letter
    const lastSection = sections[sections.length - 1]
    if (lastSection.length === 1 && lastSection >= 'A' && lastSection <= 'Z') {
      return String.fromCharCode(lastSection.charCodeAt(0) + 1)
    }
    
    // Otherwise suggest a number
    return (sections.length + 1).toString()
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate the form data
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zip || 
        !formData.contactPerson || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }
    
    // Validate departments and programs
    if (departments.length === 0) {
      alert("Please add at least one department")
      return
    }
    
    // Check if all departments have at least one program
    const departmentsWithoutPrograms = departments.filter(dept => dept.programs.length === 0)
    if (departmentsWithoutPrograms.length > 0) {
      alert(`Please add at least one program to the following departments: ${departmentsWithoutPrograms.map(d => d.name).join(", ")}`)
      return
    }
    
    // In a real app, this would save to a database
    // For this demo, we'll simulate a successful submission after a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create a new school object with all the required fields
    const newSchool = {
      id: isCreating ? `school_${Date.now()}` : schoolId || "",
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      description: formData.description,
      status: formData.status,
      counselors: isCreating ? 0 : mockSchools.find(s => s.id === schoolId)?.counselors || 0,
      students: isCreating ? 0 : mockSchools.find(s => s.id === schoolId)?.students || 0,
      logo: isCreating ? "" : mockSchools.find(s => s.id === schoolId)?.logo || "",
      departments: formData.departments
    }
    
    // In a real app, you would update the database
    // For this demo, we'll update the mockSchools array
    if (isCreating) {
      // Add the new school to the mockSchools array
      mockSchools.push(newSchool)
    } else {
      // Update the existing school in the mockSchools array
      const schoolIndex = mockSchools.findIndex(s => s.id === schoolId)
      if (schoolIndex !== -1) {
        mockSchools[schoolIndex] = newSchool
      }
    }
    
    // Show success message
    setSuccessMessage(isCreating ? "School created successfully!" : "School updated successfully!")
    
    // Reset form if creating
    if (isCreating) {
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        description: "",
        status: "pending",
        departments: []
      })
      setDepartments([])
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }
  
  const handleBack = () => {
    router.push("/dashboard?role=superadmin")
  }
  
  // For creating a new school
  if (isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New School</h2>
        </div>
        
        {successMessage && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Enter the details for the new school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">School Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.edu"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code <span className="text-red-500">*</span></Label>
                  <Input
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">School Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person <span className="text-red-500">*</span></Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Departments and Programs Section */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Academic Structure <span className="text-red-500">*</span></h3>
                    <p className="text-sm text-muted-foreground">
                      Add departments and programs for this school
                    </p>
                  </div>
                  <Button type="button" onClick={handleAddDepartment} variant="outline" size="sm">
                    Add Department
                  </Button>
                </div>
                
                {departments.length === 0 ? (
                  <div className="text-center p-4 border border-dashed rounded-md border-red-300 bg-red-50">
                    <p className="text-muted-foreground">No departments added yet</p>
                    <p className="text-xs text-red-500 mt-1">
                      At least one department is required for student registration
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {departments.map(department => (
                      <Card key={department.id} className={department.programs.length === 0 ? "border-red-300" : ""}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">{department.name}</CardTitle>
                            <div className="flex gap-2">
                              <Button 
                                type="button" 
                                onClick={() => handleEditDepartment(department)} 
                                variant="outline" 
                                size="sm"
                              >
                                Edit
                              </Button>
                              <Button 
                                type="button" 
                                onClick={() => handleAddProgram(department.id)} 
                                variant="outline" 
                                size="sm"
                              >
                                Add Program
                              </Button>
                              <Button 
                                type="button" 
                                onClick={() => handleDeleteDepartment(department.id)} 
                                variant="outline" 
                                size="sm"
                                className="text-red-500 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          {department.programs.length === 0 ? (
                            <div className="text-center p-2 border border-dashed rounded-md border-red-300 bg-red-50">
                              <p className="text-sm text-red-500">At least one program is required</p>
                              <Button 
                                type="button" 
                                onClick={() => handleAddProgram(department.id)} 
                                variant="outline" 
                                size="sm"
                                className="mt-2"
                              >
                                Add Program
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {department.programs.map(program => (
                                <div key={program.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                  <div>
                                    <p className="font-medium">{program.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Sections: {program.sections.join(", ")}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      type="button" 
                                      onClick={() => handleEditProgram(program, department.id)} 
                                      variant="ghost" 
                                      size="sm"
                                    >
                                      Edit
                                    </Button>
                                    <Button 
                                      type="button" 
                                      onClick={() => handleDeleteProgram(program.id, department.id)} 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-red-500"
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button type="button" variant="outline" onClick={handleBack}>Cancel</Button>
              <Button type="submit">Create School</Button>
            </CardFooter>
          </Card>
        </form>
        
        {/* Department Modal */}
        {showDepartmentModal && currentDepartment && (
          <Dialog open={showDepartmentModal} onOpenChange={setShowDepartmentModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentDepartment.id.startsWith('dept_') ? 'Add Department' : 'Edit Department'}</DialogTitle>
                <DialogDescription>
                  Enter the department details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="departmentName">Department Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="departmentName" 
                    value={currentDepartment.name} 
                    onChange={(e) => setCurrentDepartment({...currentDepartment, name: e.target.value})}
                    placeholder="e.g. Science Department"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDepartmentModal(false)}>Cancel</Button>
                <Button type="button" onClick={handleSaveDepartment}>Save Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Program Modal */}
        {showProgramModal && currentProgram && (
          <Dialog 
            open={showProgramModal} 
            onOpenChange={(open) => {
              if (!open) {
                setShowProgramModal(false)
                setShowAddSectionInput(false)
                setNewSectionName("")
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentProgram.program.id.startsWith('prog_') ? 'Add Program' : 'Edit Program'}</DialogTitle>
                <DialogDescription>
                  Enter the program details and sections
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="programName">Program Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="programName" 
                    value={currentProgram.program.name} 
                    onChange={(e) => setCurrentProgram({
                      ...currentProgram, 
                      program: {...currentProgram.program, name: e.target.value}
                    })}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sections <span className="text-red-500">*</span></Label>
                      <p className="text-xs text-muted-foreground">Add all sections for this program (e.g. A, B, C or custom names)</p>
                    </div>
                    <Button 
                      type="button" 
                      onClick={handleAddSection} 
                      variant="outline" 
                      size="sm"
                    >
                      Add Section
                    </Button>
                  </div>
                  
                  {showAddSectionInput && (
                    <div className="flex gap-2 mt-2">
                      <Input 
                        value={newSectionName}
                        onChange={handleSectionInputChange}
                        onKeyDown={handleSectionInputKeyDown}
                        placeholder={`Suggested: ${getNextSectionLetter(currentProgram.program.sections)}`}
                        autoFocus
                      />
                      <Button 
                        type="button" 
                        onClick={addNewSection}
                        size="sm"
                      >
                        Add
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setShowAddSectionInput(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2 p-2 border rounded-md min-h-[60px]">
                    {currentProgram.program.sections.length === 0 ? (
                      <p className="text-xs text-red-500 w-full text-center">At least one section is required</p>
                    ) : (
                      currentProgram.program.sections.map(section => (
                        <Badge key={section} className="flex items-center gap-1 px-3 py-1.5">
                          {section}
                          <Button 
                            type="button" 
                            onClick={() => handleRemoveSection(section)} 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0 ml-1"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowProgramModal(false)}>Cancel</Button>
                <Button type="button" onClick={handleSaveProgram}>Save Program</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  }
  
  // For editing an existing school
  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit School</h2>
        </div>
        
        {successMessage && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">School Details</TabsTrigger>
            <TabsTrigger value="departments">Academic Structure</TabsTrigger>
            <TabsTrigger value="counselors">Counselors</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    Edit the details for this school
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">School Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://example.edu"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code <span className="text-red-500">*</span></Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">School Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person <span className="text-red-500">*</span></Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={handleBack}>Cancel</Button>
                  <Button type="submit">Update School</Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
          
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Academic Structure</CardTitle>
                    <CardDescription>
                      Manage departments, programs, and sections
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddDepartment} variant="outline" size="sm">
                    Add Department
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.length === 0 ? (
                  <div className="text-center p-4 border border-dashed rounded-md border-red-300 bg-red-50">
                    <p className="text-muted-foreground">No departments added yet</p>
                    <p className="text-xs text-red-500 mt-1">
                      At least one department is required for student registration
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {departments.map(department => (
                      <Card key={department.id} className={department.programs.length === 0 ? "border-red-300" : ""}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">{department.name}</CardTitle>
                            <div className="flex gap-2">
                              <Button 
                                type="button" 
                                onClick={() => handleEditDepartment(department)} 
                                variant="outline" 
                                size="sm"
                              >
                                Edit
                              </Button>
                              <Button 
                                type="button" 
                                onClick={() => handleAddProgram(department.id)} 
                                variant="outline" 
                                size="sm"
                              >
                                Add Program
                              </Button>
                              <Button 
                                type="button" 
                                onClick={() => handleDeleteDepartment(department.id)} 
                                variant="outline" 
                                size="sm"
                                className="text-red-500 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          {department.programs.length === 0 ? (
                            <div className="text-center p-2 border border-dashed rounded-md border-red-300 bg-red-50">
                              <p className="text-sm text-red-500">At least one program is required</p>
                              <Button 
                                type="button" 
                                onClick={() => handleAddProgram(department.id)} 
                                variant="outline" 
                                size="sm"
                                className="mt-2"
                              >
                                Add Program
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {department.programs.map(program => (
                                <div key={program.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                  <div>
                                    <p className="font-medium">{program.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Sections: {program.sections.join(", ")}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      type="button" 
                                      onClick={() => handleEditProgram(program, department.id)} 
                                      variant="ghost" 
                                      size="sm"
                                    >
                                      Edit
                                    </Button>
                                    <Button 
                                      type="button" 
                                      onClick={() => handleDeleteProgram(program.id, department.id)} 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-red-500"
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSubmit}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="counselors">
            <Card>
              <CardHeader>
                <CardTitle>School Counselors</CardTitle>
                <CardDescription>
                  Manage counselors for this school
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Counselor
                  </Button>
                  
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Students</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockSchools.find(s => s.id === schoolId)?.counselors === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-muted-foreground">
                              No counselors registered for this school
                            </td>
                          </tr>
                        ) : (
                          // Display counselors for this school
                          mockCounselors
                            .filter(c => c.school === mockSchools.find(s => s.id === schoolId)?.name)
                            .map(counselor => (
                              <tr key={counselor.id} className="border-b">
                                <td className="py-3 px-4">
                                  <div className="font-medium">{counselor.name}</div>
                                </td>
                                <td className="py-3 px-4">{counselor.email}</td>
                                <td className="py-3 px-4">{counselor.status}</td>
                                <td className="py-3 px-4">{counselor.students}</td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="outline" size="sm">Reset Password</Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>
                  View students enrolled in this school
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Student Enrollment</h3>
                      <p className="text-sm text-muted-foreground">
                        Total Students: {mockSchools.find(s => s.id === schoolId)?.students || 0}
                      </p>
                    </div>
                    <div>
                      <Button variant="outline">Export Student Data</Button>
                    </div>
                  </div>
                  
                  {mockSchools.find(s => s.id === schoolId)?.students === 0 ? (
                    <div className="rounded-md border p-4 text-center text-muted-foreground">
                      No students enrolled at this school
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Student data is available for export. For privacy reasons, individual student records are not displayed here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  
  // Default view - School listing
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">School Management</h2>
          <p className="text-muted-foreground">
            Add and manage schools in the system
          </p>
        </div>
        <Button onClick={() => router.push("/school-management?action=create")}>
          <Building className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>
      
      <div className="rounded-md border">
        <div className="p-4">
          <h3 className="text-lg font-medium">Registered Schools</h3>
          <p className="text-sm text-muted-foreground">
            Manage schools and their information
          </p>
        </div>
        <div className="border-t">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left text-sm font-medium">School Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Contact Person</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Counselors</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Students</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSchools.map(school => (
                <tr key={school.id} className="border-b">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{school.name}</div>
                      <div className="text-sm text-muted-foreground">{school.address}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div>{school.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{school.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{school.status}</td>
                  <td className="py-3 px-4">{school.counselors}</td>
                  <td className="py-3 px-4">{school.students}</td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/school-management?id=${school.id}`)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 