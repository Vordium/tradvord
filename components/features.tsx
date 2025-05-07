"use client"

import { motion } from "framer-motion"
import { Shield, Zap, BarChart3, Wallet } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our high-performance infrastructure.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Ultra Secure",
      description: "Enterprise-grade security with multi-signature wallets and cold storage.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Advanced Analytics",
      description: "Real-time market data and AI-powered insights to optimize your trades.",
      color: "from-pink-500 to-orange-500",
    },
    {
      icon: <Wallet className="h-10 w-10" />,
      title: "Low Fees",
      description: "Competitive fee structure with volume-based discounts for active traders.",
      color: "from-green-500 to-cyan-500",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section id="features" className="py-20 relative">
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
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Why Choose Copto
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Revolutionary Features
            </span>{" "}
            for Modern Traders
          </h2>
          <p className="text-gray-300 text-lg">
            Our platform combines cutting-edge technology with intuitive design to provide the ultimate trading
            experience.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 w-fit`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
