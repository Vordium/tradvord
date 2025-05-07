"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Shield,
  CheckCircle,
  XCircle,
  ChevronRight,
  Fingerprint,
  CreditCard,
  Smartphone,
  Mail,
  FileText,
  Lock,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ReputationVerification() {
  const [walletConnected, setWalletConnected] = useState(false)

  // Check if wallet is connected (this would normally check the actual wallet state)
  useState(() => {
    try {
      // For demo purposes, we'll check localStorage
      const connected = localStorage.getItem("walletConnected") === "true"
      setWalletConnected(connected)
    } catch (error) {
      console.error("Error checking wallet connection:", error)
      setWalletConnected(false)
    }
  })

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 shadow-glow-lg">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold">Verification Status</h2>
            </div>

            <p className="text-gray-300 mb-8">
              Complete verification steps to improve your reputation score and unlock platform benefits. Each
              verification level adds to your overall trustworthiness.
            </p>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Verification Progress</span>
                <span className="text-sm font-medium">3/6 Complete</span>
              </div>
              <Progress value={50} className="h-2 bg-gray-800">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </Progress>
            </div>

            <div className="space-y-4">
              <VerificationItem
                icon={<Fingerprint className="h-5 w-5" />}
                title="Connect Wallet"
                description="Connect your wallet to verify ownership"
                status={walletConnected ? "completed" : "pending"}
              />

              <VerificationItem
                icon={<Mail className="h-5 w-5" />}
                title="Email Verification"
                description="Verify your email address"
                status="completed"
              />

              <VerificationItem
                icon={<Smartphone className="h-5 w-5" />}
                title="Two-Factor Authentication"
                description="Enable 2FA for enhanced security"
                status="completed"
              />

              <VerificationItem
                icon={<FileText className="h-5 w-5" />}
                title="KYC Verification"
                description="Complete identity verification"
                status="pending"
              />

              <VerificationItem
                icon={<CreditCard className="h-5 w-5" />}
                title="Payment Method"
                description="Add a verified payment method"
                status="pending"
              />

              <VerificationItem
                icon={<Lock className="h-5 w-5" />}
                title="Social Account Linking"
                description="Link your social media accounts"
                status="pending"
              />
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-lg shadow-glow-md">
                Continue Verification
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface VerificationItemProps {
  icon: React.ReactNode
  title: string
  description: string
  status: "completed" | "pending" | "failed"
}

function VerificationItem({ icon, title, description, status }: VerificationItemProps) {
  // Get status icon and color
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return <ChevronRight className="h-5 w-5 text-gray-400" />
    }
  }

  // Get background color based on status
  const getBackgroundColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 border-green-500/20"
      case "failed":
        return "bg-red-500/10 border-red-500/20"
      default:
        return "bg-gray-800/50 border-purple-500/10 hover:border-purple-500/30"
    }
  }

  return (
    <div className={`rounded-lg p-4 border ${getBackgroundColor()} transition-all cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-purple-500/10 rounded-lg mr-3">{icon}</div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div>{getStatusIcon()}</div>
      </div>
    </div>
  )
}
