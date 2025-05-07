import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactHero from "@/components/contact-hero"
import ContactForm from "@/components/contact-form"
import ContactOffices from "@/components/contact-offices"
import ContactFaq from "@/components/contact-faq"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <ContactHero />
        <ContactForm />
        <ContactOffices />
        <ContactFaq />
        <Footer />
      </div>
    </main>
  )
}
