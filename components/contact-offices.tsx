"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function ContactOffices() {
  const offices = [
    {
      city: "San Francisco",
      country: "United States",
      address: "123 Market Street, Suite 400, San Francisco, CA 94105",
      image: "/placeholder.svg?height=200&width=300&query=san francisco skyline",
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "45 Finsbury Square, London EC2A 1HP",
      image: "/placeholder.svg?height=200&width=300&query=london skyline",
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "80 Robinson Road, #08-01, Singapore 068898",
      image: "/placeholder.svg?height=200&width=300&query=singapore skyline",
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Our
            </span>{" "}
            Offices
          </h2>
          <p className="text-gray-300 text-lg">
            While we're primarily a remote-first company, we have offices in key locations around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden">
                  <img
                    src={office.image || "/placeholder.svg"}
                    alt={`${office.city} office`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{office.city}</h3>
                  <p className="text-purple-400 mb-3">{office.country}</p>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-gray-300">{office.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            Want to visit one of our offices? <br className="md:hidden" />
            <a href="/contact" className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
              Contact us to schedule an appointment →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
