"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function BlogFeatured() {
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
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
          <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                <img src="/placeholder.svg?key=zddkl" alt="Featured blog post" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="bg-purple-900/30 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                    Market Analysis
                  </span>
                  <span className="text-gray-400 text-sm ml-3">May 5, 2025</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">The Future of DeFi: Trends to Watch in 2025</h2>
                <p className="text-gray-300 mb-4">
                  Explore the emerging trends in decentralized finance that are set to reshape the crypto landscape in
                  2025 and beyond. From cross-chain interoperability to institutional adoption, we analyze the key
                  developments that traders should be watching.
                </p>
                <div className="mt-auto">
                  <Link href="/blog/future-of-defi">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
