"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Mail, Settings } from "lucide-react"

const reminderLogs = [
  { id: 1, recipient: "John Doe", email: "john@example.com", sentAt: "2024-01-15 10:30", status: "Delivered" },
  { id: 2, recipient: "Jane Smith", email: "jane@example.com", sentAt: "2024-01-15 10:31", status: "Delivered" },
  { id: 3, recipient: "Mike Johnson", email: "mike@example.com", sentAt: "2024-01-15 10:32", status: "Failed" },
  { id: 4, recipient: "Sarah Wilson", email: "sarah@example.com", sentAt: "2024-01-15 10:33", status: "Delivered" },
]

export function AutoReminders() {
  const [reminderInterval, setReminderInterval] = useState("3")
  const [maxReminders, setMaxReminders] = useState("3")
  const [reminderTemplate, setReminderTemplate] = useState(
    "Hi [Name], you still have a pending well-being assessment. Please complete it as soon as possible. Your insights matter!",
  )
  const [globalEnabled, setGlobalEnabled] = useState(true)

  return (
    <div className="space-y-6">
      {/* Reminder Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Auto-Reminders Configuration
          </CardTitle>
          <CardDescription>
            Automatically notify users who haven't completed the assessment after a set period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Global Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Enable Auto-Reminders</Label>
              <p className="text-sm text-muted-foreground">Turn auto-reminders on or off globally</p>
            </div>
            <Switch checked={globalEnabled} onCheckedChange={setGlobalEnabled} />
          </div>

          {/* Reminder Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time Interval
              </Label>
              <Select value={reminderInterval} onValueChange={setReminderInterval}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day after assignment</SelectItem>
                  <SelectItem value="3">3 days after assignment</SelectItem>
                  <SelectItem value="7">1 week after assignment</SelectItem>
                  <SelectItem value="14">2 weeks after assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Maximum Reminders</Label>
              <Select value={maxReminders} onValueChange={setMaxReminders}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 reminder</SelectItem>
                  <SelectItem value="2">2 reminders</SelectItem>
                  <SelectItem value="3">3 reminders</SelectItem>
                  <SelectItem value="5">5 reminders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Template Editor */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Reminder Template
            </Label>
            <Textarea
              value={reminderTemplate}
              onChange={(e) => setReminderTemplate(e.target.value)}
              placeholder="Enter your reminder message template..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Use [Name] to personalize the message with the recipient's name
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Save Configuration
            </Button>
            <Button variant="outline">Test Reminder</Button>
          </div>
        </CardContent>
      </Card>

      {/* Reminder Log */}
      <Card>
        <CardHeader>
          <CardTitle>Reminder Log</CardTitle>
          <CardDescription>View logs of when reminders were sent and to whom</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminderLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.recipient}</TableCell>
                  <TableCell>{log.email}</TableCell>
                  <TableCell>{log.sentAt}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "Delivered" ? "default" : "destructive"}>{log.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
