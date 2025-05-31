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
import { Clock, Users, Send, Check, Calendar, History, FileText, Eye, Save, Search, Plus } from "lucide-react"
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

const assignmentHistory = [
  { id: 1, name: "End of Semester Assessment", target: "All Departments", date: "2023-12-15", recipients: 971, completed: 823 },
  { id: 2, name: "Mid-term Evaluation", target: "CCS, COE", date: "2023-10-20", recipients: 448, completed: 402 },
  { id: 3, name: "New Student Onboarding", target: "BSIT1A, BSIT1B, BSCS1A, BSCS1B", date: "2023-09-05", recipients: 160, completed: 142 },
  { id: 4, name: "Faculty Well-being Check", target: "Faculty Members", date: "2023-08-10", recipients: 45, completed: 38 },
]

const savedTemplates = [
  { id: 1, name: "Standard Assessment", description: "Default assessment with standard introduction", scale: "54" },
  { id: 2, name: "Quick Check-in", description: "Brief assessment for regular monitoring", scale: "42" },
  { id: 3, name: "Comprehensive Evaluation", description: "Full-scale detailed assessment", scale: "84" },
]

export function BulkAssignment() {
  const [activeTab, setActiveTab] = useState("create")
  const [targetGroup, setTargetGroup] = useState<string>("")
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
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

  const handleSectionChange = (section: string, checked: boolean) => {
    if (checked) {
      setSelectedSections([...selectedSections, section])
    } else {
      setSelectedSections(selectedSections.filter((s) => s !== section))
    }
  }

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department])
    } else {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== department))
    }
  }

  const getTotalRecipients = () => {
    if (targetGroup === "class") return selectedSections.length * 35 // Estimated 35 students per section
    if (targetGroup === "department") return selectedDepartments.length * 200 // Estimated 200 students per department
    return 0
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

  if (showSuccess) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Assignment Successful!</CardTitle>
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
                <Button onClick={() => setShowSuccess(false)}>Create New Assignment</Button>
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
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
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
                Bulk Assignment
              </CardTitle>
              <CardDescription>Distribute the Ryff assessment to target groups in one click</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Assignment Name */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Assignment Name</Label>
                <Input 
                  placeholder="Enter a name for this assignment" 
                  value={assignmentName} 
                  onChange={(e) => setAssignmentName(e.target.value)} 
                />
              </div>

              {/* Target Group Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Target Group</Label>
                <Select value={targetGroup} onValueChange={setTargetGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose target group type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Class Year & Section</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="custom">Custom Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Class Year & Section Selection */}
              {targetGroup === "class" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Class Sections</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {classYearSections.map((section) => (
                      <div key={section} className="flex items-center space-x-2">
                        <Checkbox
                          id={section}
                          checked={selectedSections.includes(section)}
                          onCheckedChange={(checked) => handleSectionChange(section, checked as boolean)}
                        />
                        <Label htmlFor={section} className="text-sm">
                          {section}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedSections.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedSections.map((section) => (
                        <Badge key={section} variant="secondary">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Department Selection */}
              {targetGroup === "department" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Departments</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {departments.map((dept) => (
                      <div key={dept} className="flex items-center space-x-2">
                        <Checkbox
                          id={dept}
                          checked={selectedDepartments.includes(dept)}
                          onCheckedChange={(checked) => handleDepartmentChange(dept, checked as boolean)}
                        />
                        <Label htmlFor={dept} className="text-sm">
                          {dept}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedDepartments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedDepartments.map((dept) => (
                        <Badge key={dept} variant="secondary">
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

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

              {/* Template Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2" onClick={saveAsTemplate}>
                  <Save className="h-4 w-4" />
                  Save as Template
                </Button>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => setActiveTab("templates")}>
                  <FileText className="h-4 w-4" />
                  Load Template
                </Button>
              </div>

              {/* Preview & Confirm */}
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Assessment Preview</DialogTitle>
                      <DialogDescription>Preview how your assessment will appear to recipients</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-medium mb-2">Email Subject: Ryff Psychological Well-being Assessment</h3>
                        <div className="p-4 bg-muted rounded-md">
                          <p className="whitespace-pre-line">{customMessage}</p>
                          <div className="mt-4 p-4 border border-dashed rounded-md">
                            <p className="font-medium mb-2">Assessment Details:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Type: Ryff Psychological Well-being Scale ({ryffScale} items)</li>
                              <li>Estimated completion time: {ryffScale === "84" ? "25-30" : ryffScale === "54" ? "15-20" : "10-15"} minutes</li>
                              <li>Due date: {schedule === "now" ? "As soon as possible" : new Date(scheduleDate).toLocaleDateString()}</li>
                            </ul>
                            <div className="mt-4">
                              <Button disabled>Take Assessment Now</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-medium mb-2">Sample Questions:</h3>
                        <div className="space-y-4">
                          <div className="p-3 bg-muted rounded-md">
                            <p className="font-medium">1. I enjoy making plans for the future and working to make them a reality.</p>
                            <div className="mt-2 grid grid-cols-6 gap-2 text-xs text-center">
                              <div>Strongly Disagree</div>
                              <div className="col-span-4"></div>
                              <div>Strongly Agree</div>
                            </div>
                            <div className="mt-1 grid grid-cols-6 gap-2">
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <div key={num} className="flex items-center justify-center">
                                  <div className="h-8 w-8 rounded-full border-2 flex items-center justify-center">{num}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-3 bg-muted rounded-md">
                            <p className="font-medium">2. I tend to worry about what others think of me.</p>
                            <div className="mt-2 grid grid-cols-6 gap-2 text-xs text-center">
                              <div>Strongly Disagree</div>
                              <div className="col-span-4"></div>
                              <div>Strongly Agree</div>
                            </div>
                            <div className="mt-1 grid grid-cols-6 gap-2">
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <div key={num} className="flex items-center justify-center">
                                  <div className="h-8 w-8 rounded-full border-2 flex items-center justify-center">{num}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                          <p className="text-sm font-medium">Assignment Name:</p>
                          <p className="text-sm">{assignmentName || "Unnamed Assignment"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Target Group:</p>
                          <p className="text-sm">
                            {targetGroup === "class"
                              ? `Class Sections (${selectedSections.length})`
                              : targetGroup === "department"
                                ? `Departments (${selectedDepartments.length})`
                                : "Custom Group"}
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

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Saved Templates
              </CardTitle>
              <CardDescription>Load or manage your saved assessment templates</CardDescription>
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
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => applyTemplate(template.id)}>
                        <FileText className="h-3.5 w-3.5" />
                        Use
                      </Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-full py-8">
                    <div className="rounded-full bg-muted p-3 mb-2">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">Create New Template</p>
                  </CardContent>
                </Card>
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
                    Assignment History
                  </CardTitle>
                  <CardDescription>View and manage past assessment distributions</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search assignments..." 
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
                    <TableHead>Assignment Name</TableHead>
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
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Send className="h-4 w-4" />
                          </Button>
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
