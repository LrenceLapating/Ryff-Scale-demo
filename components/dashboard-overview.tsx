import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LineChart, Line, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowRight, Calendar, Download, RefreshCw, TrendingDown, TrendingUp } from "lucide-react"

const departmentData = [
  { department: "CCS", totalTestTakers: 245, lowScores: 32 },
  { department: "CN", totalTestTakers: 189, lowScores: 28 },
  { department: "CBA", totalTestTakers: 156, lowScores: 19 },
  { department: "COE", totalTestTakers: 203, lowScores: 41 },
  { department: "CAS", totalTestTakers: 178, lowScores: 23 },
]

const chartData = [
  {
    department: "CCS",
    autonomy: 4.2,
    selfAcceptance: 3.8,
    personalGrowth: 4.1,
    purpose: 3.9,
    environmental: 4.0,
    positive: 3.7,
  },
  {
    department: "CN",
    autonomy: 3.9,
    selfAcceptance: 4.1,
    personalGrowth: 3.8,
    purpose: 4.2,
    environmental: 3.9,
    positive: 4.0,
  },
  {
    department: "CBA",
    autonomy: 4.0,
    selfAcceptance: 3.9,
    personalGrowth: 4.0,
    purpose: 3.8,
    environmental: 4.1,
    positive: 3.9,
  },
  {
    department: "COE",
    autonomy: 3.7,
    selfAcceptance: 3.6,
    personalGrowth: 3.9,
    purpose: 3.7,
    environmental: 3.8,
    positive: 3.5,
  },
  {
    department: "CAS",
    autonomy: 4.1,
    selfAcceptance: 4.0,
    personalGrowth: 4.2,
    purpose: 4.0,
    environmental: 4.1,
    positive: 3.8,
  },
]

const trendData = [
  { month: "Jan", autonomy: 3.8, selfAcceptance: 3.6, personalGrowth: 3.9, purpose: 3.7, environmental: 3.8, positive: 3.5 },
  { month: "Feb", autonomy: 3.9, selfAcceptance: 3.7, personalGrowth: 4.0, purpose: 3.8, environmental: 3.9, positive: 3.6 },
  { month: "Mar", autonomy: 3.8, selfAcceptance: 3.8, personalGrowth: 4.0, purpose: 3.9, environmental: 3.9, positive: 3.5 },
  { month: "Apr", autonomy: 4.0, selfAcceptance: 3.9, personalGrowth: 4.1, purpose: 4.0, environmental: 4.0, positive: 3.7 },
  { month: "May", autonomy: 4.1, selfAcceptance: 3.9, personalGrowth: 4.2, purpose: 4.0, environmental: 4.1, positive: 3.6 },
  { month: "Jun", autonomy: 4.0, selfAcceptance: 3.8, personalGrowth: 4.1, purpose: 3.9, environmental: 4.0, positive: 3.7 },
]

const riskAlerts = [
  { id: 1, department: "COE", subscale: "Positive Relations", score: 3.5, change: -0.3, students: 41 },
  { id: 2, department: "CCS", subscale: "Self-Acceptance", score: 3.8, change: -0.2, students: 32 },
  { id: 3, department: "CN", subscale: "Purpose in Life", score: 3.8, change: -0.1, students: 28 },
]

export function DashboardOverview() {
  const [timeRange, setTimeRange] = useState("month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [chartView, setChartView] = useState("bar")

  const refreshData = () => {
    // In a real app, this would fetch fresh data
    alert("Data refreshed!")
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor well-being metrics across departments</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon" variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Risk Alerts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Risk Alerts
          </CardTitle>
          <CardDescription className="text-red-700">
            Departments and subscales requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive" className="text-sm px-2 py-1">
                    {alert.department}
                  </Badge>
                  <div>
                    <p className="font-medium">{alert.subscale}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Score: {alert.score}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center text-red-600">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {alert.change}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{alert.students} students</p>
                  <p className="text-sm text-muted-foreground">at risk</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full text-red-800 border-red-200 hover:bg-red-100 hover:text-red-900">
            View Detailed Risk Report
          </Button>
        </CardFooter>
      </Card>

      {/* Highest Risk Subscale */}
      <Card>
        <CardHeader>
          <CardTitle>Highest-Risk Subscale</CardTitle>
          <CardDescription>The Ryff subscale with the highest concentration of low scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Positive Relations with Others
            </Badge>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">142 low scores</span> across all departments
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto flex items-center">
            View intervention strategies
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Department Statistics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Department Assessment Overview</CardTitle>
            <CardDescription>Assessment participation and low scores by department</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Total Test Takers</TableHead>
                <TableHead className="text-right">Low Scores</TableHead>
                <TableHead className="text-right">Risk Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentData.map((dept) => (
                <TableRow key={dept.department} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{dept.department}</TableCell>
                  <TableCell className="text-right">{dept.totalTestTakers}</TableCell>
                  <TableCell className="text-right">{dept.lowScores}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        (dept.lowScores / dept.totalTestTakers) * 100 > 15
                          ? "destructive"
                          : (dept.lowScores / dept.totalTestTakers) * 100 > 10
                            ? "secondary"
                            : "default"
                      }
                    >
                      {((dept.lowScores / dept.totalTestTakers) * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department vs Scores Chart */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Average Ryff Subscale Scores by Department</CardTitle>
              <CardDescription>Visual representation of well-being scores across departments</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="CCS">CCS</SelectItem>
                  <SelectItem value="CN">CN</SelectItem>
                  <SelectItem value="CBA">CBA</SelectItem>
                  <SelectItem value="COE">COE</SelectItem>
                  <SelectItem value="CAS">CAS</SelectItem>
                </SelectContent>
              </Select>
              <Tabs value={chartView} onValueChange={setChartView} className="w-[180px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  <TabsTrigger value="trend">Trend</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-6">
          {chartView === "bar" ? (
            <ChartContainer
              config={{
                autonomy: {
                  label: "Autonomy",
                  color: "hsl(var(--chart-1))",
                },
                selfAcceptance: {
                  label: "Self-Acceptance",
                  color: "hsl(var(--chart-2))",
                },
                personalGrowth: {
                  label: "Personal Growth",
                  color: "hsl(var(--chart-3))",
                },
                purpose: {
                  label: "Purpose in Life",
                  color: "hsl(var(--chart-4))",
                },
                environmental: {
                  label: "Environmental Mastery",
                  color: "hsl(var(--chart-5))",
                },
                positive: {
                  label: "Positive Relations",
                  color: "hsl(var(--destructive))",
                },
              }}
              className="h-[500px] w-full px-2"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={selectedDepartment === "all" ? chartData : chartData.filter(d => d.department === selectedDepartment)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barSize={25}
                  barGap={2}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                  <XAxis 
                    dataKey="department" 
                    tick={{ fontSize: 14, fontWeight: 500 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    domain={[0, 5]} 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    tickCount={6}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="autonomy" fill="var(--color-autonomy)" name="Autonomy" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="selfAcceptance" fill="var(--color-selfAcceptance)" name="Self-Acceptance" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="personalGrowth" fill="var(--color-personalGrowth)" name="Personal Growth" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="purpose" fill="var(--color-purpose)" name="Purpose in Life" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="environmental" fill="var(--color-environmental)" name="Environmental Mastery" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="positive" fill="var(--color-positive)" name="Positive Relations" radius={[2, 2, 0, 0]} />
                  <Legend content={<ChartLegendContent />} verticalAlign="top" height={36} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <ChartContainer
              config={{
                autonomy: {
                  label: "Autonomy",
                  color: "hsl(var(--chart-1))",
                },
                selfAcceptance: {
                  label: "Self-Acceptance",
                  color: "hsl(var(--chart-2))",
                },
                personalGrowth: {
                  label: "Personal Growth",
                  color: "hsl(var(--chart-3))",
                },
                purpose: {
                  label: "Purpose in Life",
                  color: "hsl(var(--chart-4))",
                },
                environmental: {
                  label: "Environmental Mastery",
                  color: "hsl(var(--chart-5))",
                },
                positive: {
                  label: "Positive Relations",
                  color: "hsl(var(--destructive))",
                },
              }}
              className="h-[500px] w-full px-2"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 14, fontWeight: 500 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    domain={[3, 5]} 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    tickCount={5}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="autonomy" stroke="var(--color-autonomy)" strokeWidth={2} />
                  <Line type="monotone" dataKey="selfAcceptance" stroke="var(--color-selfAcceptance)" strokeWidth={2} />
                  <Line type="monotone" dataKey="personalGrowth" stroke="var(--color-personalGrowth)" strokeWidth={2} />
                  <Line type="monotone" dataKey="purpose" stroke="var(--color-purpose)" strokeWidth={2} />
                  <Line type="monotone" dataKey="environmental" stroke="var(--color-environmental)" strokeWidth={2} />
                  <Line type="monotone" dataKey="positive" stroke="var(--color-positive)" strokeWidth={2} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
          
          {/* Explicit color legend for better clarity */}
          <div className="mt-6 mb-2 flex flex-wrap justify-center gap-6 text-sm px-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--color-autonomy)" }}></div>
              <span className="font-medium">Autonomy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--color-selfAcceptance)" }}></div>
              <span className="font-medium">Self-Acceptance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--color-personalGrowth)" }}></div>
              <span className="font-medium">Personal Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--color-purpose)" }}></div>
              <span className="font-medium">Purpose in Life</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--color-environmental)" }}></div>
              <span className="font-medium">Environmental Mastery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--color-positive)" }}></div>
              <span className="font-medium">Positive Relations</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">971</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to previous {timeRange}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">84.3%</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to previous {timeRange}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Well-being Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">3.9/5</div>
              <div className="text-sm text-red-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                -0.1
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to previous {timeRange}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
