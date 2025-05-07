"use client"

import { Button } from "@/components/ui/button"

export default function CareersHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Help us build the future of decentralized finance</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            View Open Positions
          </Button>
        </div>
      </div>
    </section>
  )
}
