'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqData = [
  {
    question: "What is the DataHack event?",
    answer: "DataHack is a premier data science and analytics event that brings together data enthusiasts, professionals, and industry experts. It features workshops, competitions, networking opportunities, and hands-on sessions designed to enhance your data science skills and connect you with the community."
  },
  {
    question: "Who can participate in DataHack?",
    answer: "DataHack is open to everyone interested in data science, from beginners to experienced professionals. Whether you're a student, working professional, researcher, or entrepreneur, you're welcome to join and learn."
  },
  {
    question: "How do I register for the event?",
    answer: "Registration is simple! Click on the 'Register Now' button on our homepage, fill in your details, and complete the registration process. You'll receive a confirmation email with all the event details and access information."
  },
  {
    question: "What should I bring to the event?",
    answer: "Bring your laptop with necessary software pre-installed, a notebook for taking notes, your student/professional ID, and plenty of enthusiasm to learn and network. We'll provide WiFi, refreshments, and all the materials you need for workshops."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id='faq' className="min-h-screen py-16 px-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-virgo text-white tracking-tight">
            FAQ
          </h1>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border-b border-slate-700/50 pb-2"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left py-4 group hover:opacity-80 transition-opacity"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg sm:text-xl lg:text-2xl text-[#F7FAFF] font-normal pr-8">
                  {index + 1}. {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <Plus
                    className={`w-6 h-6 sm:w-7 sm:h-7 text-[#737373] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}
                  />
                </div>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-4 pt-2 pr-12">
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}