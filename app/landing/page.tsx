"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, ChartBar, Clock, Lock, Shield, Users, Mail, Phone } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-teal-600" />
          <span className="text-slate-800">Ryff PWB</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium text-slate-700 hover:text-teal-600 hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium text-slate-700 hover:text-teal-600 hover:underline underline-offset-4">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium text-slate-700 hover:text-teal-600 hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="/login">
            <Button variant="outline" className="text-sm font-medium bg-white text-teal-600 border-teal-200 hover:bg-teal-50">
              Log In
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-white to-slate-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl md:text-5xl lg:text-6xl">
                    Psychological Well-Being Assessment System
                  </h1>
                  <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Comprehensive platform for administering and analyzing psychological well-being assessments based on Ryff's six dimensions of well-being.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-2 bg-teal-600 hover:bg-teal-700 text-white">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-200">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] bg-gradient-to-tr from-teal-100 to-teal-50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-teal-600 text-2xl">78%</div>
                          <div className="text-sm text-slate-600">Completion Rate</div>
                        </div>
                      </div>
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-teal-600 text-2xl">62</div>
                          <div className="text-sm text-slate-600">Average Score</div>
                        </div>
                      </div>
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-teal-600 text-2xl">3</div>
                          <div className="text-sm text-slate-600">Departments</div>
                        </div>
                      </div>
                      <div className="h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-teal-600 text-2xl">265</div>
                          <div className="text-sm text-slate-600">Students</div>
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for psychological well-being assessment and analysis
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader>
                  <ChartBar className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle className="text-slate-800">Advanced Analytics</CardTitle>
                  <CardDescription className="text-slate-600">
                    Detailed analysis of assessment results with visualizations and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Track progress over time, identify patterns, and gain insights into psychological well-being across different dimensions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader>
                  <Brain className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle className="text-slate-800">AI-Powered Feedback</CardTitle>
                  <CardDescription className="text-slate-600">
                    Intelligent insights and personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Our AI system analyzes assessment results to provide tailored feedback and intervention strategies for students.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader>
                  <Users className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle className="text-slate-800">Department Analysis</CardTitle>
                  <CardDescription className="text-slate-600">
                    Comprehensive view of well-being across departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Compare results across different departments, identify at-risk groups, and develop targeted interventions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader>
                  <Clock className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle className="text-slate-800">Automated Reminders</CardTitle>
                  <CardDescription className="text-slate-600">
                    Scheduling and notification system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Set up automated reminders for assessments, follow-ups, and interventions to ensure timely completion.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader>
                  <Shield className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle className="text-slate-800">Data Security</CardTitle>
                  <CardDescription className="text-slate-600">
                    Secure handling of sensitive psychological data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Our platform ensures the highest level of data protection and compliance with privacy regulations.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader>
                  <Lock className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle className="text-slate-800">Role-Based Access</CardTitle>
                  <CardDescription className="text-slate-600">
                    Customized views for different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Different interfaces and permissions for administrators, counselors, and students to ensure appropriate access.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our platform and start improving student well-being today
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="gap-2 bg-teal-600 hover:bg-teal-700 text-white">
                    Log In Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-slate-700">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">About Ryff PWB</h2>
                <p className="text-slate-600 md:text-xl/relaxed">
                  The Ryff Psychological Well-Being (PWB) Assessment System is based on Carol Ryff's six-factor model of psychological well-being, providing a comprehensive framework for understanding and measuring well-being.
                </p>
                <p className="text-slate-600 md:text-xl/relaxed">
                  Our platform makes it easy to administer assessments, analyze results, and develop targeted interventions to improve student well-being across educational institutions.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">The Six Dimensions of Well-Being</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-600" />
                    <span className="text-slate-700">Autonomy - Independence and self-determination</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-600" />
                    <span className="text-slate-700">Environmental Mastery - Managing life and surroundings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-600" />
                    <span className="text-slate-700">Personal Growth - Development and realization of potential</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 