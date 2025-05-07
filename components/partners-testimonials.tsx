"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function PartnersTestimonials() {
  const testimonials = [
    {
      quote:
        "Partnering with Trady has been a game-changer for our wallet service. The integration was smooth, and we've seen a significant increase in user adoption since becoming a partner.",
      author: "Sarah Chen",
      role: "CEO, CryptoWallet",
      image: "/placeholder.svg?key=ud8i1",
    },
    {
      quote:
        "The Trady team has been incredibly supportive throughout our partnership journey. Their API documentation is comprehensive, and their technical support team is always available to help.",
      author: "Michael Rodriguez",
      role: "CTO, DataMetrics",
      image: "/placeholder.svg?key=vqmx9",
    },
    {
      quote:
        "As a referral partner, we've been impressed by the conversion rates and the commission structure. Trady's platform sells itself, making it easy for us to recommend to our audience.",
      author: "Jessica Wang",
      role: "Founder, CryptoEducate",
      image: "/placeholder.svg?height=80&width=80&query=professional woman founder",
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
              Partner
            </span>{" "}
            Success Stories
          </h2>
          <p className="text-gray-300 text-lg">
            Hear what our partners have to say about their experience working with Trady.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
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
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">{testimonial.author}</h3>
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
                      <p className="text-lg md:text-xl text-gray-300 italic relative z-10">{testimonial.quote}</p>
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
      </div>
    </section>
  )
}
