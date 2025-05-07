"use client"

import { motion } from "framer-motion"
import { Handshake, TrendingUp, Zap, Globe } from "lucide-react"

export default function PartnersProgram() {
  const partnerTypes = [
    {
      icon: <Handshake className="h-10 w-10" />,
      title: "Technology Partners",
      description:
        "Integrate your technology with our platform to provide enhanced functionality and features to our users.",
      examples: "Wallet providers, KYC solutions, data analytics tools",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Referral Partners",
      description:
        "Earn commissions by referring new users to our platform through your network, content, or marketing channels.",
      examples: "Influencers, content creators, educational platforms",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Integration Partners",
      description:
        "Build on top of our API to create innovative applications and services that leverage our trading infrastructure.",
      examples: "Trading bots, portfolio trackers, mobile apps",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Strategic Partners",
      description:
        "Collaborate on joint initiatives, co-marketing, and business development opportunities to reach new markets.",
      examples: "Exchanges, financial institutions, media companies",
    },
  ]

  return (
    <section className="py-20 relative">
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
              Partnership
            </span>{" "}
            Programs
          </h2>
          <p className="text-gray-300 text-lg">
            We offer various partnership opportunities tailored to different business models and objectives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerTypes.map((type, index) => (
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 w-fit">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-gray-300 mb-4">{type.description}</p>
                <div>
                  <div className="text-sm font-medium text-purple-400 mb-2">Examples:</div>
                  <p className="text-gray-400">{type.examples}</p>
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
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
          <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Partner Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-purple-400">Growth</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Access to our user base of active traders</li>
                  <li>• Co-marketing opportunities</li>
                  <li>• Revenue sharing and commissions</li>
                  <li>• Joint promotional campaigns</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-purple-400">Support</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Dedicated partner manager</li>
                  <li>• Technical integration support</li>
                  <li>• Marketing and promotional resources</li>
                  <li>• Regular performance reviews</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-purple-400">Resources</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Comprehensive API documentation</li>
                  <li>• Partner portal access</li>
                  <li>• Marketing materials and brand assets</li>
                  <li>• Early access to new features</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
