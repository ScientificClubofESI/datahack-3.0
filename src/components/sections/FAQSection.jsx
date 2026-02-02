'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqData = [
  {
    question: "What is the DataHack event?",
    answer: "DataHack is a competitive datathon where participants collaborate to analyze real-world datasets and develop AI-driven solutions within 48 hours, fostering innovation, teamwork, and practical learning."
  },
  {
    question: "Who can participate in DataHack?",
    answer: "DataHack is open to students and technology enthusiasts interested in data science, artificial intelligence, and innovation. All skill levels are welcome."
  },
  {
    question: "Where and when will the event take place?",
    answer: "The 3rd edition of DataHack will be held at ESI from February 12 to 14, 2026."
  },
  {
    question: "How many participants are allowed per team?",
    answer: "Each team can have up to 5 participants. If you don’t have a team, we will help you join one."
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