"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Professional Trader",
      image: "/1.svg?key=952em",
      content:
        "Copto.io has completely transformed my trading experience. The platform's speed and advanced analytics give me an edge in the market that I've never had before.",
    },
    {
      name: "Sarah Chen",
      role: "Crypto Investor",
      image: "/sarah.jpg?key=swce8",
      content:
        "I've tried many trading platforms, but none compare to the user experience and features of Copto. The real-time insights have helped me make better decisions.",
    },
    {
      name: "Michael Rodriguez",
      role: "DeFi Enthusiast",
      image: "/2.svg?key=rtku2",
      content:
        "The security features and low fees make Copto.io stand out from other platforms. I can trade with confidence knowing my assets are protected.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute -top-20 left-1/3 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/3 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              Trusted by Traders
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-gray-300 text-lg">
            Hear what our community has to say about their experience with our platform.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8 md:p-12">
            <div className="flex flex-col items-center">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.9,
                    position: activeIndex === index ? "relative" : "absolute",
                    zIndex: activeIndex === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full"
                >
                  <div className="mb-6">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md"></div>
                      <div className="relative rounded-full overflow-hidden border-2 border-purple-500">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </div>
                  <div className="relative">
                    <svg
                      className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6 h-12 w-12 text-purple-500/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-lg md:text-xl text-gray-300 italic relative z-10">{testimonial.content}</p>
                    <svg
                      className="absolute bottom-0 right-0 transform translate-x-6 translate-y-6 h-12 w-12 text-pink-500/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M14.048 28c4.8-3.456 8.256-9.12 8.256-15.36 0-5.088-3.072-8.064-6.624-8.064-3.36 0-5.856 2.688-5.856 5.856 0 3.168 2.208 5.472 5.088 5.472.576 0 1.344-.096 1.536-.192-.48 3.264-3.552 7.104-6.624 9.024L14.048 28zm-16.512 0c4.8-3.456 8.256-9.12 8.256-15.36 0-5.088-3.072-8.064-6.624-8.064-3.264 0-5.856 2.688-5.856 5.856 0 3.168 2.304 5.472 5.184 5.472.576 0 1.248-.096 1.44-.192-.48 3.264-3.456 7.104-6.528 9.024L-2.464 28z" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
