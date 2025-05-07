"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("all")

  const blogPosts = [
    {
      title: "Understanding Market Volatility: How to Trade During Uncertain Times",
      excerpt:
        "Learn strategies for navigating volatile markets and protecting your portfolio during periods of uncertainty.",
      image: "/placeholder.svg?key=t10bj",
      category: "trading",
      author: "Sarah Chen",
      date: "May 3, 2025",
      readTime: "8 min read",
      slug: "understanding-market-volatility",
    },
    {
      title: "The Rise of Layer 2 Solutions: Scaling Blockchain for Mass Adoption",
      excerpt:
        "Explore how Layer 2 scaling solutions are addressing blockchain's scalability challenges and enabling new use cases.",
      image: "/placeholder.svg?key=8k5wi",
      category: "technology",
      author: "Michael Rodriguez",
      date: "April 28, 2025",
      readTime: "10 min read",
      slug: "rise-of-layer-2-solutions",
    },
    {
      title: "Crypto Tax Guide: What You Need to Know for the 2025 Tax Season",
      excerpt:
        "A comprehensive guide to understanding cryptocurrency taxation, reporting requirements, and strategies for tax efficiency.",
      image: "/placeholder.svg?key=0yjru",
      category: "education",
      author: "Alex Thompson",
      date: "April 22, 2025",
      readTime: "12 min read",
      slug: "crypto-tax-guide-2025",
    },
    {
      title: "NFTs Beyond Art: Exploring New Use Cases in Gaming and Real Estate",
      excerpt:
        "Discover how non-fungible tokens are evolving beyond digital art to transform gaming experiences and real estate transactions.",
      image: "/placeholder.svg?key=dhjgt",
      category: "technology",
      author: "Jessica Wang",
      date: "April 15, 2025",
      readTime: "9 min read",
      slug: "nfts-beyond-art",
    },
    {
      title: "Trady Platform Update: New Features and Improvements for Q2 2025",
      excerpt:
        "Learn about the latest features, improvements, and optimizations we've added to the Trady platform in our quarterly update.",
      image: "/placeholder.svg?height=300&width=500&query=trading platform update",
      category: "announcements",
      author: "David Park",
      date: "April 10, 2025",
      readTime: "5 min read",
      slug: "platform-update-q2-2025",
    },
    {
      title: "Technical Analysis Fundamentals: Chart Patterns Every Trader Should Know",
      excerpt:
        "Master the essential chart patterns that can help you identify potential trading opportunities and make more informed decisions.",
      image: "/placeholder.svg?height=300&width=500&query=crypto chart patterns",
      category: "trading",
      author: "Emma Johnson",
      date: "April 5, 2025",
      readTime: "11 min read",
      slug: "technical-analysis-fundamentals",
    },
  ]

  const filteredPosts =
    activeCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <section className="py-20 pb-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Latest Articles
              </span>
            </h2>
            <p className="text-gray-400">Stay up to date with our latest insights and updates</p>
          </motion.div>

          <div className="mt-4 md:mt-0">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="inline-flex">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trading">Trading</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-purple-900/30 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                    <span className="text-gray-400 text-sm ml-3">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-0">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 shadow-glow-purple">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
