"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpFaq() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
    },
    {
      question: "Why is my account verification pending?",
      answer:
        "Account verification typically takes 1-2 business days. If your verification has been pending for longer, please ensure all submitted documents meet our requirements. For assistance, contact our support team with your verification ID.",
    },
    {
      question: "How long do withdrawals take to process?",
      answer:
        "Cryptocurrency withdrawals are typically processed within 30 minutes, but may take up to 24 hours during high volume periods. Fiat withdrawals via bank transfer usually take 1-3 business days, depending on your bank and region.",
    },
    {
      question: "What are the trading fees?",
      answer:
        "Our trading fees start at 0.1% for makers and 0.2% for takers. Fee discounts are available based on your 30-day trading volume and Trady token holdings. For a detailed fee schedule, please visit our Pricing page.",
    },
    {
      question: "How do I enable two-factor authentication?",
      answer:
        "To enable two-factor authentication, go to your Account Settings > Security. Click on 'Enable 2FA' and follow the instructions to set up an authenticator app. We recommend using Google Authenticator or Authy for the best experience.",
    },
    {
      question: "Can I change my account email address?",
      answer:
        "Yes, you can change your email address in Account Settings > Profile. You'll need to verify both your old and new email addresses, and confirm the change with your 2FA code for security purposes.",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>

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
          <p className="text-gray-300 text-lg">Quick answers to common questions about using Trady.</p>
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
      </div>
    </section>
  )
}
