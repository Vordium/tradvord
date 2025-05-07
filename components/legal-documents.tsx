"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FileText, Shield, Lock, Scale, AlertCircle, FileCheck } from "lucide-react"

// Add after the imports
const scrollbarHideClass = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

export default function LegalDocuments() {
  const [activeTab, setActiveTab] = useState("terms")

  const legalContent = {
    terms: {
      title: "Terms of Service",
      description: "The terms and conditions governing your use of Copto.io services.",
      icon: <FileText className="h-6 w-6" />,
      lastUpdated: "May 1, 2025",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-3">1. Introduction</h3>
            <p className="text-gray-300">
              Welcome to Copto.so. These Terms of Service ("Terms") govern your access to and use of the Copto.so
              website, mobile application, API, and all related services (collectively, the "Service"). By accessing or
              using the Service, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">2. Eligibility</h3>
            <p className="text-gray-300">
              To use the Service, you must be at least 18 years old and have the legal capacity to enter into a binding
              agreement. By using the Service, you represent and warrant that you meet these requirements.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">3. Account Registration</h3>
            <p className="text-gray-300">
              To access certain features of the Service, you may need to register for an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete.
            </p>
            <p className="text-gray-300 mt-2">
              You are responsible for safeguarding your account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">4. Trading and Financial Risk</h3>
            <p className="text-gray-300">
              Cryptocurrency trading involves significant risk, including the potential loss of principal. You should
              carefully consider your investment objectives, level of experience, and risk appetite before using our
              Service.
            </p>
            <p className="text-gray-300 mt-2">
              Past performance is not indicative of future results. Copto.so does not provide investment advice, and
              nothing on the Service should be construed as investment advice.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">5. Fees and Payments</h3>
            <p className="text-gray-300">
              Copto.so charges fees for certain services as described on our Fees page. We reserve the right to change
              our fee structure at any time. Changes to fees will be posted on the Fees page and will take effect when
              posted.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">6. Termination</h3>
            <p className="text-gray-300">
              We reserve the right to suspend or terminate your access to the Service at any time, with or without
              cause, and with or without notice. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">7. Changes to Terms</h3>
            <p className="text-gray-300">
              We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such as
              by sending an email, providing a notice through the Service, or updating the date at the top of these
              Terms. Your continued use of the Service following the posting of revised Terms means that you accept and
              agree to the changes.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">8. Contact Information</h3>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at legal@copto.so.
            </p>
          </section>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      description: "How Copto.io collects, uses, and protects your personal information.",
      icon: <Lock className="h-6 w-6" />,
      lastUpdated: "April 15, 2025",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-3">1. Introduction</h3>
            <p className="text-gray-300">
              This Privacy Policy describes how Copto.so ("we", "our", or "us") collects, uses, and shares your personal
              information when you use our website, mobile application, API, and all related services (collectively, the
              "Service").
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">2. Information We Collect</h3>
            <p className="text-gray-300">
              We collect several types of information from and about users of our Service:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>
                <strong>Personal Information:</strong> This includes information that can be used to identify you, such
                as your name, email address, phone number, and government-issued ID for KYC purposes.
              </li>
              <li>
                <strong>Financial Information:</strong> This includes information about your cryptocurrency holdings,
                trading history, and wallet addresses.
              </li>
              <li>
                <strong>Usage Data:</strong> This includes information about how you use the Service, such as your IP
                address, browser type, device information, and pages visited.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to collect
                information about your browsing activities.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">3. How We Use Your Information</h3>
            <p className="text-gray-300">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process transactions and send related information</li>
              <li>Verify your identity and prevent fraud</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with the Service</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">4. How We Share Your Information</h3>
            <p className="text-gray-300">We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>
                <strong>Service Providers:</strong> We share information with third-party vendors, consultants, and
                other service providers who need access to such information to carry out work on our behalf.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required to do so by law or in
                response to valid requests by public authorities.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share information in connection with a merger, sale of
                company assets, financing, or acquisition of all or a portion of our business.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share information with your consent or at your direction.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">5. Your Rights and Choices</h3>
            <p className="text-gray-300">
              Depending on your location, you may have certain rights regarding your personal information, such as the
              right to access, correct, delete, or restrict processing of your personal information.
            </p>
            <p className="text-gray-300 mt-2">
              To exercise these rights, please contact us at privacy@copto.so. We will respond to your request within a
              reasonable timeframe.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">6. Data Security</h3>
            <p className="text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">7. Changes to This Privacy Policy</h3>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
              email or through the Service prior to the change becoming effective.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">8. Contact Information</h3>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@copto.so.
            </p>
          </section>
        </div>
      ),
    },
    cookies: {
      title: "Cookie Policy",
      icon: <FileCheck className="h-6 w-6" />,
      lastUpdated: "April 10, 2025",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-3">1. Introduction</h3>
            <p className="text-gray-300">
              This Cookie Policy explains how Copto.so ("we", "our", or "us") uses cookies and similar technologies on
              our website, mobile application, and all related services (collectively, the "Service").
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">2. What Are Cookies</h3>
            <p className="text-gray-300">
              Cookies are small text files that are stored on your device when you visit a website. They are widely used
              to make websites work more efficiently and provide information to the website owners.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">3. Types of Cookies We Use</h3>
            <p className="text-gray-300">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the Service to function properly and
                cannot be switched off in our systems.
              </li>
              <li>
                <strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our Service.
              </li>
              <li>
                <strong>Functional Cookies:</strong> These cookies enable the Service to provide enhanced functionality
                and personalization.
              </li>
              <li>
                <strong>Targeting Cookies:</strong> These cookies may be set through our Service by our advertising
                partners to build a profile of your interests and show you relevant advertisements on other sites.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">4. How to Manage Cookies</h3>
            <p className="text-gray-300">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit
              the ability of websites to set cookies, you may not be able to use all the features of our Service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">5. Changes to This Cookie Policy</h3>
            <p className="text-gray-300">
              We may update this Cookie Policy from time to time. If we make material changes, we will notify you by
              email or through the Service prior to the change becoming effective.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">6. Contact Information</h3>
            <p className="text-gray-300">
              If you have any questions about this Cookie Policy, please contact us at privacy@copto.so.
            </p>
          </section>
        </div>
      ),
    },
    compliance: {
      title: "Compliance",
      icon: <Scale className="h-6 w-6" />,
      lastUpdated: "March 20, 2025",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-3">1. Regulatory Compliance</h3>
            <p className="text-gray-300">
              Copto.so is committed to complying with all applicable laws and regulations in the jurisdictions where we
              operate. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>Anti-Money Laundering (AML) laws</li>
              <li>Know Your Customer (KYC) requirements</li>
              <li>Counter-Terrorism Financing (CTF) regulations</li>
              <li>Data protection and privacy laws</li>
              <li>Securities and financial regulations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">2. AML/KYC Policy</h3>
            <p className="text-gray-300">
              We have implemented robust AML/KYC procedures to prevent money laundering, terrorist financing, and other
              illicit activities. These procedures include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>Identity verification of all users</li>
              <li>Ongoing monitoring of transactions</li>
              <li>Risk-based approach to customer due diligence</li>
              <li>Reporting of suspicious activities to relevant authorities</li>
              <li>Regular training of staff on AML/KYC procedures</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">3. Licenses and Registrations</h3>
            <p className="text-gray-300">Copto.so holds the following licenses and registrations:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>Money Services Business (MSB) registration with FinCEN (United States)</li>
              <li>Virtual Asset Service Provider (VASP) registration in applicable jurisdictions</li>
              <li>Digital Asset Business license in select jurisdictions</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Please note that our services may not be available in all jurisdictions due to regulatory restrictions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">4. Compliance Program</h3>
            <p className="text-gray-300">Our compliance program includes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>Dedicated compliance team led by experienced professionals</li>
              <li>Regular internal and external audits</li>
              <li>Ongoing monitoring and screening against sanctions lists</li>
              <li>Comprehensive policies and procedures</li>
              <li>Regular updates to adapt to changing regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">5. Reporting Concerns</h3>
            <p className="text-gray-300">
              If you have any concerns about potential violations of laws, regulations, or our policies, please contact
              our compliance team at compliance@copto.so.
            </p>
          </section>
        </div>
      ),
    },
    security: {
      title: "Security",
      icon: <Shield className="h-6 w-6" />,
      lastUpdated: "March 15, 2025",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-3">1. Security Measures</h3>
            <p className="text-gray-300">
              At Copto.so, we implement industry-leading security measures to protect your account and assets:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>
                <strong>Cold Storage:</strong> The majority of user funds (95%) are stored in offline, cold storage
                wallets that are not connected to the internet.
              </li>
              <li>
                <strong>Encryption:</strong> All sensitive data is encrypted both in transit and at rest using
                industry-standard encryption protocols.
              </li>
              <li>
                <strong>Multi-signature Technology:</strong> Withdrawals require multiple approvals from separate,
                secure devices.
              </li>
              <li>
                <strong>Regular Security Audits:</strong> We conduct regular security audits and penetration testing by
                independent third parties.
              </li>
              <li>
                <strong>24/7 Monitoring:</strong> Our security team monitors our systems 24/7 for any suspicious
                activity.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">2. Account Security</h3>
            <p className="text-gray-300">We provide several features to help you secure your account:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>
                <strong>Two-Factor Authentication (2FA):</strong> We strongly recommend enabling 2FA for an additional
                layer of security.
              </li>
              <li>
                <strong>Withdrawal Address Whitelisting:</strong> Limit withdrawals to pre-approved addresses only.
              </li>
              <li>
                <strong>Login Notifications:</strong> Receive email alerts for login attempts and critical account
                changes.
              </li>
              <li>
                <strong>Session Management:</strong> View and terminate active sessions from your account settings.
              </li>
              <li>
                <strong>IP Whitelisting:</strong> Restrict account access to specific IP addresses.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">3. Insurance Coverage</h3>
            <p className="text-gray-300">
              We maintain insurance coverage for digital assets held in our custody. This insurance policy covers losses
              due to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>External theft and internal collusion</li>
              <li>Physical loss or damage of private keys</li>
              <li>Cyber security breaches</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Please note that this insurance does not cover losses resulting from unauthorized access to your
              individual account due to personal credential compromise.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">4. Security Best Practices</h3>
            <p className="text-gray-300">We recommend the following security best practices:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
              <li>Enable two-factor authentication (2FA)</li>
              <li>Use a strong, unique password for your Copto.so account</li>
              <li>Be vigilant against phishing attempts</li>
              <li>Keep your devices and software updated</li>
              <li>Use a password manager to generate and store strong passwords</li>
              <li>Regularly review your account activity</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">5. Reporting Security Issues</h3>
            <p className="text-gray-300">
              If you discover a security vulnerability or suspect unauthorized access to your account, please contact
              our security team immediately at security@copto.so.
            </p>
          </section>
        </div>
      ),
    },
    disclaimers: {
      title: "Disclaimers",
      icon: <AlertCircle className="h-6 w-6" />,
      lastUpdated: "March 10, 2025",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold mb-3">1. Investment Risks</h3>
            <p className="text-gray-300">
              Cryptocurrency trading involves significant risk and is not suitable for all investors. The high degree of
              volatility can work against you as well as for you. Before deciding to trade cryptocurrencies, you should
              carefully consider your investment objectives, level of experience, and risk appetite.
            </p>
            <p className="text-gray-300 mt-2">
              The possibility exists that you could sustain a loss of some or all of your initial investment and
              therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks
              associated with cryptocurrency trading and seek advice from an independent financial advisor if you have
              any doubts.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">2. No Investment Advice</h3>
            <p className="text-gray-300">
              Copto.so does not provide investment, tax, legal, or accounting advice. The information provided on our
              platform is for general informational purposes only and is not intended to be, and should not be construed
              as, investment advice.
            </p>
            <p className="text-gray-300 mt-2">
              Any market analysis, trend predictions, or educational content provided on our platform is not a
              recommendation to buy, sell, or hold any digital asset. Past performance is not indicative of future
              results.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">3. Service Availability</h3>
            <p className="text-gray-300">
              While we strive to provide uninterrupted access to our platform, we cannot guarantee that the Service will
              be available at all times. The Service may be subject to limitations, delays, and other problems inherent
              in the use of the internet and electronic communications.
            </p>
            <p className="text-gray-300 mt-2">
              We are not responsible for any delays, delivery failures, or other damage resulting from such problems. We
              do not guarantee that the Service will be error-free or that defects will be corrected.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">4. Third-Party Links and Services</h3>
            <p className="text-gray-300">
              Our Service may contain links to third-party websites or services that are not owned or controlled by
              Copto.so. We have no control over, and assume no responsibility for, the content, privacy policies, or
              practices of any third-party websites or services.
            </p>
            <p className="text-gray-300 mt-2">
              You acknowledge and agree that Copto.so shall not be responsible or liable, directly or indirectly, for
              any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any
              such content, goods, or services available on or through any such websites or services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">5. Market Data</h3>
            <p className="text-gray-300">
              While we strive to provide accurate and timely market data, we cannot guarantee the accuracy,
              completeness, or timeliness of the information displayed on our platform. Market data is provided "as is"
              and "as available" without warranty of any kind.
            </p>
            <p className="text-gray-300 mt-2">
              You should verify all information before relying on it, and all decisions based on information contained
              on Copto.so are your sole responsibility and we shall have no liability for such decisions.
            </p>
          </section>
        </div>
      ),
    },
  }

  return (
    <>
      <style jsx global>
        {scrollbarHideClass}
      </style>
      <section className="py-12 pb-24 relative">
        <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="relative">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                <TabsList
                  className="relative flex flex-nowrap overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 mb-6 md:space-x-0.5 md:grid md:grid-cols-6 w-full bg-black/10 backdrop-blur-[2px] rounded-lg py-1"
                  aria-label="Legal document categories"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black to-transparent pointer-events-none z-10 md:hidden"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black to-transparent pointer-events-none z-10 md:hidden"></div>

                  {Object.entries(legalContent).map(([key, content]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="group flex flex-col items-center justify-center gap-1 py-3.5 px-3 min-w-[90px] snap-start snap-always rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
                      aria-label={`${content.title} tab`}
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/70 to-pink-500/70 rounded-full opacity-0 group-hover:opacity-20 group-data-[state=active]:opacity-70 blur-sm transition-opacity duration-300"></div>
                        <div className="relative p-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/10 group-data-[state=active]:bg-gradient-to-r group-data-[state=active]:from-purple-500/60 group-data-[state=active]:to-pink-500/60 transition-all duration-300">
                          {React.cloneElement(content.icon, { className: "h-4 w-4" })}
                        </div>
                      </div>
                      <span className="text-[11px] font-medium whitespace-nowrap opacity-70 group-hover:opacity-90 group-data-[state=active]:opacity-100 group-data-[state=active]:font-semibold">
                        {content.title}
                      </span>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-500/70 to-pink-500/70 scale-0 group-data-[state=active]:scale-100 transition-transform duration-300 ease-out"></div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {Object.entries(legalContent).map(([key, content]) => (
                <TabsContent key={key} value={key}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-purple-500/20 gap-4">
                        <div className="flex items-center">
                          <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 mr-3 sm:mr-4">
                            {content.icon}
                          </div>
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold">{content.title}</h2>
                            <p className="text-sm sm:text-base text-gray-400">Last updated: {content.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <a
                            href={`/legal/${key}.pdf`}
                            className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>

                      <div className="prose prose-invert max-w-none prose-headings:text-lg sm:prose-headings:text-xl prose-p:text-sm sm:prose-p:text-base">
                        {content.content}
                      </div>

                      <div className="mt-8 pt-6 border-t border-purple-500/20 md:hidden">
                        <a
                          href={`/legal/${key}.pdf`}
                          className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
                        >
                          Download PDF
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
