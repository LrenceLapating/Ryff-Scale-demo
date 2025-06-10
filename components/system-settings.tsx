"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, AlertCircle, Database, Server, Mail, Shield, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [successMessage, setSuccessMessage] = useState("")
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "Ryff PWB Assessment System",
    supportEmail: "support@ryffpwb.com",
    maxFileSize: "10",
    defaultLanguage: "en",
    enableRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false
  })
  
  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "noreply@ryffpwb.com",
    smtpPassword: "••••••••••••",
    senderName: "Ryff PWB System",
    senderEmail: "noreply@ryffpwb.com",
    enableSsl: true
  })
  
  // Backup settings state
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: "30",
    backupLocation: "cloud",
    includeUploads: true
  })
  
  const handleGeneralChange = (field: string, value: string | boolean) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }))
  }
  
  const handleEmailChange = (field: string, value: string | boolean) => {
    setEmailSettings(prev => ({ ...prev, [field]: value }))
  }
  
  const handleBackupChange = (field: string, value: string | boolean) => {
    setBackupSettings(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would save to a database
    // For this demo, we'll simulate a successful save after a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSuccessMessage("Settings saved successfully!")
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }
  
  const handleTestEmailConnection = async () => {
    // In a real app, this would test the email connection
    // For this demo, we'll simulate a test after a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert("Email connection test successful!")
  }
  
  const handleBackupNow = async () => {
    // In a real app, this would trigger a backup
    // For this demo, we'll simulate a backup after a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert("Backup completed successfully!")
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Configure and manage system-wide settings
        </p>
      </div>
      
      {successMessage && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <form onSubmit={handleSaveSettings}>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={generalSettings.systemName}
                      onChange={(e) => handleGeneralChange("systemName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => handleGeneralChange("supportEmail", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Upload Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={generalSettings.maxFileSize}
                      onChange={(e) => handleGeneralChange("maxFileSize", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select
                      value={generalSettings.defaultLanguage}
                      onValueChange={(value) => handleGeneralChange("defaultLanguage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Behavior</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableRegistration">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register accounts
                      </p>
                    </div>
                    <Switch
                      id="enableRegistration"
                      checked={generalSettings.enableRegistration}
                      onCheckedChange={(checked) => handleGeneralChange("enableRegistration", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Users must verify their email address before accessing the system
                      </p>
                    </div>
                    <Switch
                      id="requireEmailVerification"
                      checked={generalSettings.requireEmailVerification}
                      onCheckedChange={(checked) => handleGeneralChange("requireEmailVerification", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode" className="text-red-500 font-medium">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the system in maintenance mode (only admins can access)
                      </p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleGeneralChange("maintenanceMode", checked)}
                    />
                  </div>
                </div>
                
                {generalSettings.maintenanceMode && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-800" />
                    <AlertDescription className="text-amber-800">
                      Enabling maintenance mode will prevent all non-admin users from accessing the system.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit">Save Settings</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        
        <TabsContent value="email">
          <form onSubmit={handleSaveSettings}>
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email server settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Email settings are used for sending notifications, password resets, and other system emails.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input
                      id="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={(e) => handleEmailChange("smtpServer", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => handleEmailChange("smtpPort", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => handleEmailChange("smtpUsername", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => handleEmailChange("smtpPassword", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) => handleEmailChange("senderName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => handleEmailChange("senderEmail", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableSsl"
                    checked={emailSettings.enableSsl}
                    onCheckedChange={(checked) => handleEmailChange("enableSsl", checked)}
                  />
                  <Label htmlFor="enableSsl">Enable SSL/TLS</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button type="button" variant="outline" onClick={handleTestEmailConnection}>
                  Test Connection
                </Button>
                <Button type="submit">Save Settings</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        
        <TabsContent value="backup">
          <form onSubmit={handleSaveSettings}>
            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>
                  Configure database backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Schedule regular backups of the system database
                    </p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => handleBackupChange("autoBackup", checked)}
                  />
                </div>
                
                {backupSettings.autoBackup && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Backup Frequency</Label>
                        <Select
                          value={backupSettings.backupFrequency}
                          onValueChange={(value) => handleBackupChange("backupFrequency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backupTime">Backup Time</Label>
                        <Input
                          id="backupTime"
                          type="time"
                          value={backupSettings.backupTime}
                          onChange={(e) => handleBackupChange("backupTime", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="retentionDays">Retention Period (days)</Label>
                        <Input
                          id="retentionDays"
                          type="number"
                          value={backupSettings.retentionDays}
                          onChange={(e) => handleBackupChange("retentionDays", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backupLocation">Backup Location</Label>
                        <Select
                          value={backupSettings.backupLocation}
                          onValueChange={(value) => handleBackupChange("backupLocation", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="local">Local Storage</SelectItem>
                            <SelectItem value="cloud">Cloud Storage</SelectItem>
                            <SelectItem value="both">Both Local & Cloud</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="includeUploads"
                        checked={backupSettings.includeUploads}
                        onCheckedChange={(checked) => handleBackupChange("includeUploads", checked)}
                      />
                      <Label htmlFor="includeUploads">Include uploaded files in backup</Label>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manual Backup & Restore</h3>
                  
                  <div className="flex flex-col space-y-2">
                    <Button onClick={handleBackupNow} className="w-full sm:w-auto">
                      <Database className="mr-2 h-4 w-4" />
                      Backup Now
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Create an immediate backup of the system database
                    </p>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download Latest Backup
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Restore from Backup
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Download or restore from a previous backup
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit">Save Settings</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure system security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md border border-blue-100">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700">
                  These settings control the security features of the system. Changes to these settings may require users to re-authenticate.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for all users
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out inactive users
                    </p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Requirements</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimum password complexity requirements
                    </p>
                  </div>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                      <SelectItem value="high">High (12+ chars, mixed case, numbers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Expiry</Label>
                    <p className="text-sm text-muted-foreground">
                      Force password change after period
                    </p>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Access</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow external systems to access the API
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">
                      Maximum requests per minute
                    </p>
                  </div>
                  <Input type="number" defaultValue="60" className="w-[180px]" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 