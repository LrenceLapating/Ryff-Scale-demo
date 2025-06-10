"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, ChartBar, Clock, Lock, Shield, Users, Mail, Phone } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>Ryff PWB</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Log In
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Psychological Well-Being Assessment System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Comprehensive platform for administering and analyzing psychological well-being assessments based on Ryff's six dimensions of well-being.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-primary text-2xl">78%</div>
                          <div className="text-sm text-gray-500">Completion Rate</div>
                        </div>
                      </div>
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-primary text-2xl">62</div>
                          <div className="text-sm text-gray-500">Average Score</div>
                        </div>
                      </div>
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-primary text-2xl">3</div>
                          <div className="text-sm text-gray-500">Departments</div>
                        </div>
                      </div>
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-primary text-2xl">265</div>
                          <div className="text-sm text-gray-500">Students</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for psychological well-being assessment and analysis
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader>
                  <ChartBar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Detailed analysis of assessment results with visualizations and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Track progress over time, identify patterns, and gain insights into psychological well-being across different dimensions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Brain className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI-Powered Feedback</CardTitle>
                  <CardDescription>
                    Intelligent insights and personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our AI system analyzes assessment results to provide tailored feedback and intervention strategies for students.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Department Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive view of well-being across departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Compare results across different departments, identify at-risk groups, and develop targeted interventions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Automated Reminders</CardTitle>
                  <CardDescription>
                    Scheduling and notification system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Set up automated reminders for assessments, follow-ups, and interventions to ensure timely completion.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Data Security</CardTitle>
                  <CardDescription>
                    Secure handling of sensitive psychological data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our platform ensures the highest level of data protection and compliance with privacy regulations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Role-Based Access</CardTitle>
                  <CardDescription>
                    Customized views for different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Different interfaces and permissions for administrators, counselors, and students to ensure appropriate access.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our platform and start improving student well-being today
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Log In Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Ryff PWB</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  The Ryff Psychological Well-Being (PWB) Assessment System is based on Carol Ryff's six-factor model of psychological well-being, providing a comprehensive framework for understanding and measuring well-being.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our platform makes it easy to administer assessments, analyze results, and develop targeted interventions to improve student well-being across educational institutions.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">The Six Dimensions of Well-Being</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Autonomy - Independence and self-determination</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Environmental Mastery - Managing life and surroundings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Personal Growth - Development and realization of potential</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Positive Relations - Warm and trusting relationships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Purpose in Life - Goals and direction in life</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Self-Acceptance - Positive attitude toward oneself</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or need more information? Get in touch with our team.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Email Us</span>
                    <span className="text-sm text-gray-500">contact@ryffpwb.com</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">Call Us</span>
                    <span className="text-sm text-gray-500">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Ryff PWB Assessment System. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
} 