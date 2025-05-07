"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, MapPin, Clock } from "lucide-react"

export default function CareersOpenings() {
  const [activeCategory, setActiveCategory] = useState("all")

  const jobOpenings = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our frontend team to build intuitive and responsive user interfaces for our trading platform using React, Next.js, and TypeScript.",
      link: "/careers/senior-frontend-engineer",
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Develop and maintain high-performance backend services that power our trading platform using Node.js, Go, and PostgreSQL.",
      link: "/careers/backend-engineer",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description:
        "Create beautiful and intuitive user experiences for our web and mobile applications, working closely with our product and engineering teams.",
      link: "/careers/product-designer",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "Lead the development of new features and improvements to our trading platform, working with cross-functional teams to deliver exceptional user experiences.",
      link: "/careers/product-manager",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description:
        "Drive our marketing strategy and campaigns to increase brand awareness and user acquisition in the competitive crypto space.",
      link: "/careers/marketing-manager",
    },
    {
      title: "Customer Support Specialist",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      description:
        "Provide exceptional support to our users, helping them navigate our platform and resolve any issues they encounter.",
      link: "/careers/customer-support-specialist",
    },
    {
      title: "Blockchain Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Develop and maintain our blockchain integrations, ensuring secure and efficient transactions across multiple chains.",
      link: "/careers/blockchain-engineer",
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Remote",
      type: "Full-time",
      description:
        "Analyze user behavior and market data to derive insights that drive product decisions and trading features.",
      link: "/careers/data-scientist",
    },
  ]

  const filteredJobs =
    activeCategory === "all"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department.toLowerCase() === activeCategory)

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
              Open
            </span>{" "}
            Positions
          </h2>
          <p className="text-gray-300 text-lg">
            Join our team and help us build the future of crypto trading. We're always looking for talented individuals
            to join our mission.
          </p>
        </motion.div>

        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex">
              <TabsTrigger value="all">All Departments</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="text-purple-400">{job.department}</div>
                  </div>
                  <div className="bg-purple-900/30 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                    {job.type}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  <span>Posted 2 weeks ago</span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg"
                  asChild
                >
                  <a href={job.link}>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
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
          <p className="text-gray-300 mb-4">
            Don't see a position that matches your skills? We're always interested in talking to talented individuals.
          </p>
          <a href="/careers/general" className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
            Submit a general application →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
