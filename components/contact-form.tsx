"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail, Phone, Clock } from "lucide-react"

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle form submission here
    setFormSubmitted(true)
  }

  return (
    <section className="py-12 relative">
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 text-green-400 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-300 mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            required
                            className="bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-lg"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            required
                            className="bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                          Subject
                        </label>
                        <Select>
                          <SelectTrigger className="bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-lg">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="account">Account Issues</SelectItem>
                            <SelectItem value="billing">Billing Questions</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          required
                          className="bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-lg min-h-[150px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg py-6"
                      >
                        Send Message
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email Us</h3>
                      <p className="text-gray-300 mb-1">General Inquiries:</p>
                      <a href="mailto:info@trady.so" className="text-purple-400 hover:text-purple-300">
                        info@trady.so
                      </a>
                      <p className="text-gray-300 mt-2 mb-1">Support:</p>
                      <a href="mailto:support@trady.so" className="text-purple-400 hover:text-purple-300">
                        support@trady.so
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Call Us</h3>
                      <p className="text-gray-300 mb-1">Support Hotline:</p>
                      <a href="tel:+18005551234" className="text-purple-400 hover:text-purple-300">
                        +1 (800) 555-1234
                      </a>
                      <p className="text-gray-300 mt-2 mb-1">International:</p>
                      <a href="tel:+442071234567" className="text-purple-400 hover:text-purple-300">
                        +44 20 7123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Live Chat</h3>
                      <p className="text-gray-300 mb-2">
                        Chat with our support team in real-time through our platform when logged in.
                      </p>
                      <Button
                        variant="outline"
                        className="border-purple-500/30 hover:bg-purple-900/20 text-purple-400"
                        size="sm"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Support Hours</h3>
                      <p className="text-gray-300 mb-1">24/7 Support Available</p>
                      <p className="text-gray-400 text-sm">
                        Our team is available around the clock to assist you with any questions or issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
