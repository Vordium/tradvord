"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail, Phone } from "lucide-react"

export default function HelpContact() {
  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Still Need
            </span>{" "}
            Help?
          </h2>
          <p className="text-gray-300 text-lg">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 w-fit">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-gray-400 mb-4">Chat with our support team in real-time for immediate assistance.</p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
                Start Chat
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 w-fit">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
                Email Us
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 w-fit">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone Support</h3>
              <p className="text-gray-400 mb-4">
                Premium and enterprise users can access our dedicated phone support line.
              </p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
                Call Us
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 text-center">Submit a Support Ticket</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
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
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="deposit">Deposits & Withdrawals</SelectItem>
                      <SelectItem value="trading">Trading Problems</SelectItem>
                      <SelectItem value="api">API & Development</SelectItem>
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
                    placeholder="Describe your issue in detail"
                    className="bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-lg min-h-[150px]"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-6">
                  Submit Ticket
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
