import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Building, Shield, Camera, Bell, Eye, Clock } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface SettingsProps {
  userRole?: string;
}

export function Settings({ userRole = "admin" }: SettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const isStudent = userRole === "student";

  // Mock data
  const userData = isStudent
    ? {
        firstName: "John",
        lastName: "Student",
        email: "john.student@university.edu",
        phone: "+1 (555) 987-6543",
        department: "Computer Science",
        section: "BSCS3A",
        studentId: "ST12345",
        avatar: "/placeholder-user.jpg"
      }
    : {
        firstName: "Admin",
        lastName: "User",
        email: "admin@university.edu",
        phone: "+1 (555) 123-4567",
        department: "Student Affairs",
        role: "System Administrator",
        avatar: "/placeholder-user.jpg"
      };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Manage your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="text-lg">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue={userData.firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={userData.lastName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" defaultValue={userData.email} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" type="tel" defaultValue={userData.phone} className="pl-10" />
              </div>
            </div>
            
            {isStudent ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="department" defaultValue={userData.department} className="pl-10" readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" defaultValue={userData.section} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" defaultValue={userData.studentId} readOnly />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="department" defaultValue={userData.department} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="default">System Administrator</Badge>
                  </div>
                </div>
              </>
            )}
          </div>

          {!isStudent && (
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Experienced administrator focused on student well-being and mental health initiatives."
                className="min-h-[100px]"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button>Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Security - Same for all users */}
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button>Update Password</Button>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences - For students */}
      {isStudent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Control how you receive notifications and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive assessment reminders via email</p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Assessment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new assessments are assigned</p>
                </div>
                <Switch 
                  checked={reminderNotifications}
                  onCheckedChange={setReminderNotifications}
                />
              </div>
            </div>
            
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      )}

      {/* Privacy Settings - For students */}
      {isStudent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy Preferences
            </CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Results to Counselors</Label>
                  <p className="text-sm text-muted-foreground">Allow counselors to view your assessment results</p>
                </div>
                <Switch 
                  checked={showResults}
                  onCheckedChange={setShowResults}
                />
              </div>
            </div>
            
            <Button>Save Privacy Settings</Button>
          </CardContent>
        </Card>
      )}

      {/* System Preferences - For admin/counselor users */}
      {!isStudent && (
        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Configure your dashboard and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" defaultValue="English (US)" />
              </div>
            </div>

            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
