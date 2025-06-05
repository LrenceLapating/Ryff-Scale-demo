"use client"

import { useState } from "react"
import { Bell, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Mock data for at-risk students
const mockAtRiskStudents = [
  {
    id: "1",
    name: "John Doe",
    class: "BSIT3A",
    reason: "Low scores in Personal Growth and Purpose in Life dimensions",
    date: "2024-06-10",
    read: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    class: "BSCS2B",
    reason: "Significant decrease in overall wellbeing score",
    date: "2024-06-09",
    read: false,
  },
  {
    id: "3",
    name: "Mike Johnson",
    class: "BSIT4A",
    reason: "Critical score in Self-Acceptance dimension",
    date: "2024-06-08",
    read: true,
  },
]

interface NotificationsProps {
  onViewFeedback?: (studentId: string) => void;
}

export function Notifications({ onViewFeedback }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockAtRiskStudents)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter(notification => !notification.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
    onViewFeedback?.(id)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h4 className="font-semibold">At-Risk Student Alerts</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 text-left hover:bg-muted transition-colors border-b last:border-0",
                    !notification.read && "bg-muted/50"
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.name}</p>
                      <span className="text-xs text-muted-foreground">{notification.class}</span>
                      {!notification.read && (
                        <span className="ml-auto">
                          <Badge variant="destructive" className="h-1.5 w-1.5 rounded-full p-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.reason}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <p className="text-muted-foreground">No at-risk students detected</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 