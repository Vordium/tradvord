"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ApiHero() {
  return (
    <section className="pt-32 pb-16 relative">
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Developer Tools
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Powerful API
            </span>{" "}
            for Crypto Trading
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Integrate our comprehensive trading API into your applications and services with robust documentation and
            developer-friendly tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 shadow-glow-purple">
              Get API Keys
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 border-purple-500/50 hover:bg-purple-900/20">
              View Documentation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
