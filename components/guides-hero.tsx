"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function GuidesHero() {
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
              Learning Resources
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Step-by-Step
            </span>{" "}
            Guides
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Learn how to use Trady's features with our comprehensive guides, from beginner to advanced topics.
          </p>
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search guides..."
              className="pl-10 py-6 bg-black/60 border-purple-500/30 focus:border-purple-500/60 rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
