"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactFaq() {
  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using our live chat feature for immediate assistance.",
    },
    {
      question: "Do you offer phone support?",
      answer:
        "Yes, we offer phone support for all users. Our support hotline is available 24/7 for urgent issues. For general inquiries, we recommend using email or the contact form for faster resolution.",
    },
    {
      question: "How can I report a bug or technical issue?",
      answer:
        "You can report bugs or technical issues through our support portal when logged in, or by emailing support@trady.so with details about the issue, including screenshots if possible.",
    },
    {
      question: "Can I schedule a demo of your platform?",
      answer:
        "We offer personalized demos for individuals and teams interested in our platform. Please fill out the contact form and select 'Request Demo' as the subject, and our team will reach out to schedule a convenient time.",
    },
    {
      question: "How do I apply for a job at Trady?",
      answer:
        "You can view our open positions on our Careers page and apply directly through the job listings. If you don't see a position that matches your skills, you can submit a general application.",
    },
    {
      question: "How can I request a feature or provide product feedback?",
      answer:
        "We value user feedback and feature requests! You can submit your ideas through our feedback portal when logged in, or by emailing feedback@trady.so with your suggestions.",
    },
  ]

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
              Frequently Asked
            </span>{" "}
            Questions
          </h2>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about contacting and working with us.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem value={`item-${index}`} className="border-purple-500/20">
                      <AccordionTrigger className="text-left hover:text-purple-400 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            Still have questions? <br className="md:hidden" />
            <a href="#contact-form" className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
              Contact our team for assistance →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
