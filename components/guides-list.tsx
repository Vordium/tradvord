"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowRight, BookOpen, TrendingUp, Zap, Shield, Wallet, BarChart3 } from "lucide-react"

export default function GuidesList() {
  const [activeCategory, setActiveCategory] = useState("all")

  const guides = [
    {
      title: "Getting Started with Trady",
      description: "Learn the basics of setting up your account and making your first trade.",
      icon: <BookOpen className="h-6 w-6" />,
      category: "beginner",
      readTime: "5 min read",
      link: "/guides/getting-started",
    },
    {
      title: "Understanding Market Orders vs. Limit Orders",
      description: "Learn the differences between market and limit orders and when to use each.",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "beginner",
      readTime: "7 min read",
      link: "/guides/order-types",
    },
    {
      title: "How to Read Candlestick Charts",
      description: "Master the art of reading candlestick patterns for better trading decisions.",
      icon: <BarChart3 className="h-6 w-6" />,
      category: "intermediate",
      readTime: "10 min read",
      link: "/guides/candlestick-charts",
    },
    {
      title: "Setting Up Two-Factor Authentication",
      description: "Secure your account with 2FA to protect your assets and personal information.",
      icon: <Shield className="h-6 w-6" />,
      category: "beginner",
      readTime: "3 min read",
      link: "/guides/two-factor-authentication",
    },
    {
      title: "Advanced Trading Strategies",
      description: "Explore sophisticated trading techniques used by professional traders.",
      icon: <Zap className="h-6 w-6" />,
      category: "advanced",
      readTime: "15 min read",
      link: "/guides/advanced-strategies",
    },
    {
      title: "Managing Your Crypto Portfolio",
      description: "Learn how to build and manage a diversified cryptocurrency portfolio.",
      icon: <Wallet className="h-6 w-6" />,
      category: "intermediate",
      readTime: "12 min read",
      link: "/guides/portfolio-management",
    },
    {
      title: "Technical Analysis Fundamentals",
      description: "Learn the basics of technical analysis to identify trends and patterns.",
      icon: <BarChart3 className="h-6 w-6" />,
      category: "intermediate",
      readTime: "8 min read",
      link: "/guides/technical-analysis",
    },
    {
      title: "Using Stop-Loss Orders to Manage Risk",
      description: "Protect your investments by implementing effective stop-loss strategies.",
      icon: <Shield className="h-6 w-6" />,
      category: "intermediate",
      readTime: "6 min read",
      link: "/guides/stop-loss-orders",
    },
    {
      title: "Building Trading Bots with the Trady API",
      description: "Create automated trading systems using our comprehensive API.",
      icon: <Zap className="h-6 w-6" />,
      category: "advanced",
      readTime: "20 min read",
      link: "/guides/trading-bots",
    },
  ]

  const filteredGuides = activeCategory === "all" ? guides : guides.filter((guide) => guide.category === activeCategory)

  return (
    <section className="py-12 pb-24 relative">
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex">
              <TabsTrigger value="all">All Guides</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 w-fit">
                  {guide.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-gray-400 mb-4">{guide.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-purple-400">{guide.readTime}</span>
                  <Link href={guide.link}>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                      Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 shadow-glow-purple">
            View All Guides
          </Button>
        </div>
      </div>
    </section>
  )
}
