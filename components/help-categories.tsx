"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CreditCard, Shield, Wallet, Users, Settings, HelpCircle, BookOpen, BarChart3, Zap } from "lucide-react"

export default function HelpCategories() {
  const categories = [
    {
      title: "Account & Security",
      icon: <Shield className="h-10 w-10" />,
      description: "Account verification, security settings, and password recovery",
      link: "/help/account",
    },
    {
      title: "Deposits & Withdrawals",
      icon: <Wallet className="h-10 w-10" />,
      description: "How to deposit and withdraw funds from your account",
      link: "/help/deposits",
    },
    {
      title: "Trading",
      icon: <BarChart3 className="h-10 w-10" />,
      description: "Order types, trading fees, and market information",
      link: "/help/trading",
    },
    {
      title: "API & Developers",
      icon: <Zap className="h-10 w-10" />,
      description: "API documentation, SDKs, and developer resources",
      link: "/help/api",
    },
    {
      title: "Payments & Billing",
      icon: <CreditCard className="h-10 w-10" />,
      description: "Payment methods, invoices, and subscription management",
      link: "/help/payments",
    },
    {
      title: "Getting Started",
      icon: <BookOpen className="h-10 w-10" />,
      description: "Guides for new users and platform basics",
      link: "/help/getting-started",
    },
    {
      title: "Referral Program",
      icon: <Users className="h-10 w-10" />,
      description: "How to refer friends and earn rewards",
      link: "/help/referrals",
    },
    {
      title: "Platform Settings",
      icon: <Settings className="h-10 w-10" />,
      description: "Customize your trading experience and preferences",
      link: "/help/settings",
    },
    {
      title: "General FAQ",
      icon: <HelpCircle className="h-10 w-10" />,
      description: "Answers to commonly asked questions",
      link: "/help/faq",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

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
              Browse Help
            </span>{" "}
            by Category
          </h2>
          <p className="text-gray-300 text-lg">Find the information you need by exploring our help categories below.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={item} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <Link href={category.link}>
                <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-purple-500/40 group-hover:translate-y-[-5px]">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 w-fit">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
