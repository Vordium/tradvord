"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function StatusDashboard() {
  const services = [
    {
      name: "Trading Engine",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None in the last 90 days",
    },
    {
      name: "API Services",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "May 1, 2025 (Resolved)",
    },
    {
      name: "Website & UI",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None in the last 90 days",
    },
    {
      name: "Wallet Services",
      status: "operational",
      uptime: "99.97%",
      lastIncident: "April 15, 2025 (Resolved)",
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None in the last 90 days",
    },
    {
      name: "Market Data",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "April 22, 2025 (Resolved)",
    },
    {
      name: "WebSocket Streams",
      status: "operational",
      uptime: "99.96%",
      lastIncident: "April 10, 2025 (Resolved)",
    },
    {
      name: "Payment Processing",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "March 28, 2025 (Resolved)",
    },
  ]

  return (
    <section className="py-12 relative">
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

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
              Service Status
            </span>
          </h2>
          <p className="text-gray-400">Current status of all Trady services</p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
          <div className="relative overflow-x-auto rounded-xl border border-purple-500/20 bg-black/60 backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="px-6 py-4 font-medium text-gray-300">Service</th>
                  <th className="px-6 py-4 font-medium text-gray-300">Status</th>
                  <th className="px-6 py-4 font-medium text-gray-300 hidden md:table-cell">Uptime (30 days)</th>
                  <th className="px-6 py-4 font-medium text-gray-300 hidden lg:table-cell">Last Incident</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-b border-purple-500/10"
                  >
                    <td className="px-6 py-4 font-medium">{service.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {service.status === "operational" ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                            <span className="text-green-400">Operational</span>
                          </>
                        ) : service.status === "degraded" ? (
                          <>
                            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                            <span className="text-yellow-400">Degraded</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                            <span className="text-red-400">Outage</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">{service.uptime}</td>
                    <td className="px-6 py-4 hidden lg:table-cell text-gray-400">{service.lastIncident}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Clock className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-gray-300">Last updated: May 6, 2025, 3:14 PM UTC</span>
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300">Operational</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-gray-300">Degraded</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-300">Outage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
