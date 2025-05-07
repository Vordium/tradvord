"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Home", href: "/" },
        { name: "Swap", href: "/swap" },
        { name: "CopySwap", href: "/copyswap" },
        { name: "Trending", href: "/trending" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "Wallet Reputation", href: "/reputation" },
        { name: "Token Chat", href: "/token-chat" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/documentation" },
        { name: "Guides", href: "/guides" },
        { name: "Help Center", href: "/help" },
        { name: "Blog", href: "/blog" },
        { name: "Status", href: "/status" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Partners", href: "/partners" },
        { name: "Legal", href: "/legal" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
  ]

  return (
    <footer className="relative pt-20 pb-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 inline-block mb-4"
            >
              LUMENORI
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              The next generation web3 trading platform with advanced analytics, minimal fees, and lightning-fast
              execution.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ y: -3 }}
                  className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-purple-500/30 p-2 rounded-full hover:border-purple-500/60 transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LUMENORI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/legal/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
