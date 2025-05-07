"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import WalletConnect from "@/components/wallet-connect"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center"
        >
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
          >
            copto.io
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-4">
          {[
            { name: "Home", path: "/" },
            { name: "Swap", path: "/swap" },
            { name: "CopySwap", path: "/copyswap" },
            { name: "Trending", path: "/trending" },
            { name: "Leaderboard", path: "/leaderboard" },
            { name: "Wallet Reputation", path: "/reputation" },
            { name: "Token Chat", path: "/token-chat" },
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                href={item.path}
                className={`transition-colors text-sm ${
                  isActive(item.path) ? "text-white font-medium" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:block"
        >
          <WalletConnect />
        </motion.div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/90 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {[
              { name: "Home", path: "/" },
              { name: "Swap", path: "/swap" },
              { name: "CopySwap", path: "/copyswap" },
              { name: "Trending", path: "/trending" },
              { name: "Leaderboard", path: "/leaderboard" },
              { name: "Wallet Reputation", path: "/reputation" },
              { name: "Token Chat", path: "/token-chat" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`py-2 transition-colors ${
                  isActive(item.path) ? "text-white font-medium" : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <WalletConnect />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
