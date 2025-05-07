"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock } from "lucide-react"

export default function StatusIncidents() {
  const incidents = [
    {
      id: "incident-001",
      title: "API Rate Limiting Issues",
      status: "resolved",
      date: "May 1, 2025",
      updates: [
        {
          timestamp: "May 1, 2025 - 14:32 UTC",
          status: "resolved",
          message:
            "The issue has been fully resolved. API services are now operating normally with proper rate limiting.",
        },
        {
          timestamp: "May 1, 2025 - 13:45 UTC",
          status: "monitoring",
          message: "We've implemented a fix and are monitoring the system to ensure stability.",
        },
        {
          timestamp: "May 1, 2025 - 12:20 UTC",
          status: "identified",
          message:
            "We've identified an issue with our API rate limiting system that is causing some requests to be incorrectly throttled.",
        },
        {
          timestamp: "May 1, 2025 - 12:05 UTC",
          status: "investigating",
          message: "We're investigating reports of intermittent API timeouts and errors.",
        },
      ],
    },
    {
      id: "incident-002",
      title: "WebSocket Connection Disruptions",
      status: "resolved",
      date: "April 22, 2025",
      updates: [
        {
          timestamp: "April 22, 2025 - 09:15 UTC",
          status: "resolved",
          message: "All WebSocket connections have been restored. The issue has been fully resolved.",
        },
        {
          timestamp: "April 22, 2025 - 08:40 UTC",
          status: "monitoring",
          message: "We've implemented a fix for the WebSocket connection issues and are monitoring the system.",
        },
        {
          timestamp: "April 22, 2025 - 08:10 UTC",
          status: "identified",
          message: "We've identified a network configuration issue affecting WebSocket connections.",
        },
        {
          timestamp: "April 22, 2025 - 07:55 UTC",
          status: "investigating",
          message: "We're investigating reports of WebSocket connection disruptions affecting market data streams.",
        },
      ],
    },
    {
      id: "incident-003",
      title: "Wallet Service Degradation",
      status: "resolved",
      date: "April 15, 2025",
      updates: [
        {
          timestamp: "April 15, 2025 - 18:30 UTC",
          status: "resolved",
          message: "The wallet service has been fully restored and is operating normally.",
        },
        {
          timestamp: "April 15, 2025 - 17:45 UTC",
          status: "monitoring",
          message: "We've implemented a fix and are monitoring the system to ensure stability.",
        },
        {
          timestamp: "April 15, 2025 - 16:20 UTC",
          status: "identified",
          message: "We've identified a database performance issue affecting wallet balance updates.",
        },
        {
          timestamp: "April 15, 2025 - 16:05 UTC",
          status: "investigating",
          message: "We're investigating reports of delayed wallet balance updates and transaction processing.",
        },
      ],
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Recent Incidents
            </span>
          </h2>
          <p className="text-gray-400">History of recent service disruptions and their resolutions</p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
          <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={incident.id}
                    className="border border-purple-500/20 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-purple-900/20 data-[state=open]:bg-purple-900/20">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-sm text-gray-400 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {incident.date}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 bg-black/40">
                      <div className="space-y-4">
                        {incident.updates.map((update, updateIndex) => (
                          <div key={updateIndex} className="border-l-2 border-purple-500/30 pl-4 py-1">
                            <div className="text-sm font-medium text-gray-300">{update.timestamp}</div>
                            <div className="flex items-center mt-1 mb-2">
                              {update.status === "resolved" ? (
                                <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30">
                                  Resolved
                                </span>
                              ) : update.status === "monitoring" ? (
                                <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
                                  Monitoring
                                </span>
                              ) : update.status === "identified" ? (
                                <span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-0.5 rounded-full border border-yellow-500/30">
                                  Identified
                                </span>
                              ) : (
                                <span className="bg-red-900/30 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-500/30">
                                  Investigating
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">{update.message}</div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors">
            View full incident history
          </a>
        </div>
      </div>
    </section>
  )
}
