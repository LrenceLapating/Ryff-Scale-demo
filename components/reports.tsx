import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download, Eye, BarChart3, Users, TrendingUp } from "lucide-react"

const reportTypes = [
  { id: "individual", name: "Individual Report", description: "Detailed well-being report for a specific person" },
  { id: "group", name: "Group Report", description: "Aggregated well-being data for selected groups" },
  { id: "department", name: "Department Summary", description: "Department-wide well-being overview" },
  { id: "comparative", name: "Comparative Analysis", description: "Compare well-being across different groups" },
]

const exportFormats = [
  { id: "pdf", name: "PDF", icon: FileText },
  { id: "excel", name: "Excel", icon: BarChart3 },
  { id: "csv", name: "CSV", icon: FileText },
]

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </CardTitle>
          <CardDescription>Generate and export individual or group well-being reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Report Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type) => (
                <Card key={type.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id={type.id} />
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

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Date Range</Label>
            <DatePickerWithRange />
          </div>

          {/* Group Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="ccs">CCS</SelectItem>
                  <SelectItem value="cn">CN</SelectItem>
                  <SelectItem value="cba">CBA</SelectItem>
                  <SelectItem value="coe">COE</SelectItem>
                  <SelectItem value="cas">CAS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Class/Section</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="bsit3a">BSIT3A</SelectItem>
                  <SelectItem value="bsit3b">BSIT3B</SelectItem>
                  <SelectItem value="bscs2a">BSCS2A</SelectItem>
                  <SelectItem value="bscs2b">BSCS2B</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <Button className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate & Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Pre-configured reports for common use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium mb-1">Weekly Summary</h3>
                <p className="text-sm text-muted-foreground mb-3">Last 7 days assessment overview</p>
                <Button size="sm" variant="outline">
                  Generate
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium mb-1">Monthly Trends</h3>
                <p className="text-sm text-muted-foreground mb-3">Well-being trends over time</p>
                <Button size="sm" variant="outline">
                  Generate
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium mb-1">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground mb-3">High-risk individuals report</p>
                <Button size="sm" variant="outline">
                  Generate
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
