"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Check, Mail, MessageSquare, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
              <p className="text-white/70 max-w-2xl mx-auto">
                Have questions about Prime Phygital? Our team is here to help. Fill out the form below and we'll get
                back to you as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {!isSubmitted ? (
                  <Card className="glass-panel border-white/10">
                    <CardHeader>
                      <CardTitle>Send us a message</CardTitle>
                      <CardDescription>
                        Fill out the form below and our team will get back to you within 24 hours.
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                              First Name
                            </label>
                            <Input id="firstName" placeholder="John" required className="bg-white/5 border-white/10" />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                              Last Name
                            </label>
                            <Input id="lastName" placeholder="Doe" required className="bg-white/5 border-white/10" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="bg-white/5 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium">
                            Company
                          </label>
                          <Input id="company" placeholder="Your company name" className="bg-white/5 border-white/10" />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject
                          </label>
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent className="glass-panel border-white/10">
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="sales">Sales Question</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            placeholder="How can we help you?"
                            required
                            className="bg-white/5 border-white/10 min-h-[150px]"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                ) : (
                  <Card className="glass-panel border-white/10 text-center">
                    <CardContent className="pt-10 pb-10">
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neon-green/20">
                        <Check className="h-10 w-10 text-neon-green" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Message Sent Successfully!</h2>
                      <p className="text-white/70 mb-8">
                        Thank you for contacting Prime Phygital. Our team will review your message and get back to you
                        within 24 hours.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild variant="outline" className="border-white/10">
                          <Link href="/">Return to Home</Link>
                        </Button>
                        <Button asChild className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                          <Link href="/demo">
                            View Demo <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <Mail className="h-5 w-5 text-neon-purple" />
                      </div>
                      <CardTitle className="text-lg">Email Us</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-2">For general inquiries:</p>
                    <a href="mailto:info@primephygital.com" className="text-neon-blue hover:text-neon-purple">
                      info@primephygital.com
                    </a>

                    <p className="text-white/70 mt-4 mb-2">For sales questions:</p>
                    <a href="mailto:sales@primephygital.com" className="text-neon-blue hover:text-neon-purple">
                      sales@primephygital.com
                    </a>

                    <p className="text-white/70 mt-4 mb-2">For support:</p>
                    <a href="mailto:support@primephygital.com" className="text-neon-blue hover:text-neon-purple">
                      support@primephygital.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <Phone className="h-5 w-5 text-neon-blue" />
                      </div>
                      <CardTitle className="text-lg">Call Us</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-2">Main Office:</p>
                    <a href="tel:+18005551234" className="text-neon-blue hover:text-neon-purple">
                      +1 (800) 555-1234
                    </a>

                    <p className="text-white/70 mt-4 mb-2">Hours of Operation:</p>
                    <p className="text-sm">Monday - Friday: 9AM - 6PM EST</p>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-white/10 p-2">
                        <MessageSquare className="h-5 w-5 text-neon-green" />
                      </div>
                      <CardTitle className="text-lg">Live Chat</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">
                      Need immediate assistance? Chat with our support team during business hours.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-green hover:opacity-90">
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
