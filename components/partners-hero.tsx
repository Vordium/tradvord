"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function PartnersHero() {
  return (
    <section className="pt-32 pb-16 relative">
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Partnership Program
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                Partner with
              </span>{" "}
              Trady
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Join our ecosystem of partners and grow your business while providing value to crypto traders worldwide.
              Together, we can build the future of crypto trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 shadow-glow-purple">
                Become a Partner
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 border-purple-500/50 hover:bg-purple-900/20">
                Explore Benefits <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600&query=business partnership handshake"
                alt="Trady partnership"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  {["Exchanges", "Wallets", "Data Providers", "Payment Processors", "Fintechs"].map((tag, index) => (
                    <div
                      key={index}
                      className="bg-purple-900/40 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <p className="text-gray-300">
                  Join our network of 50+ partners across the crypto and fintech ecosystem.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
