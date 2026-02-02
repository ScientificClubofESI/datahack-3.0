'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AgendaSection() {
  const [activeDay, setActiveDay] = useState(0)
  const sectionRef = useRef(null)

  const agendaDays = [
    {
      day: 1,
      date: 'Fri 14.01.2025',
      schedule: [
        { time: '4 PM - 6 PM', activity: 'Check-In' },
        { time: '6 PM - 8 PM', activity: 'Opening Ceremony & Ice Breaking' },
        { time: '8 PM - 9 PM', activity: 'Ice Break Activities' },
        { time: '8 PM - 9 PM', activity: 'Dinner' },
        { time: '9 PM - 11 PM', activity: 'Hacking Starts' },
        { time: '11 PM - 12 AM', activity: 'Break' },
      ],
    },
    {
      day: 2,
      date: 'Sat 15.01.2025',
      schedule: [
        { time: '8 AM - 10 AM', activity: 'Hacking Continues' },
        { time: '10 AM - 12 PM', activity: 'Workshops & Mentoring' },
        { time: '12 PM - 2 PM', activity: 'Lunch Break' },
        { time: '2 PM - 4 PM', activity: 'More Hacking' },
        { time: '4 PM - 6 PM', activity: 'Midway Checkpoint' },
        { time: '6 PM - 8 PM', activity: 'Dinner' },
      ],
    },
    {
      day: 3,
      date: 'Sun 16.01.2025',
      schedule: [
        { time: '8 AM - 10 AM', activity: 'Final Touches' },
        { time: '10 AM - 12 PM', activity: 'Project Submission' },
        { time: '12 PM - 2 PM', activity: 'Lunch Break' },
        { time: '2 PM - 4 PM', activity: 'Final Presentations' },
        { time: '4 PM - 6 PM', activity: 'Judging' },
        { time: '6 PM - 8 PM', activity: 'Awards & Closing' },
      ],
    },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* 👉 GLOBAL diagonal movement for the WHOLE stack */
 const stackX = useTransform(scrollYProgress, [0, 0.66, 1], ['0%', '-100%', '-100%'])
const stackY = useTransform(scrollYProgress, [0, 0.66, 1], ['0%', '-100%', '-100%'])

  /* Active day based on scroll */
useEffect(() => {
  // Only change days on scroll for desktop
  if (window.innerWidth < 768) return

  const unsub = scrollYProgress.on('change', (v) => {
    if (v < 0.25) setActiveDay(0)
    else if (v < 0.5) setActiveDay(1)
    else setActiveDay(2)
  })

  return () => unsub()
}, [scrollYProgress])

  // Safety check
  const currentDay = agendaDays[activeDay]
  if (!currentDay) return null

  return (
    <section
      id="agenda"
      ref={sectionRef}
      className="relative md:h-[300vh]"
    >
      <div className="md:sticky md:top-0 h-auto md:h-screen flex items-center justify-center overflow-hidden">

        {/* Title */}
        <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 z-30">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-virgo text-white tracking-wider">
            AGENDA
          </h1>
        </div>

      {/* Mobile Version */}
<div className="md:hidden w-full px-4 py-20 flex flex-col items-center justify-center min-h-screen space-y-4">
  {/* Show all previous days ABOVE (in reverse order so closest day is nearest) */}
  {[...agendaDays.slice(0, activeDay)].map((day) => (
    <button
      key={`prev-${day.day}`}
      onClick={() => setActiveDay(day.day - 1)}
      className="w-full max-w-sm bg-black/50 border border-[#C783FB]/30 rounded-lg p-4 transition-all hover:border-[#C783FB]/60"
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
          DAY {day.day}
        </span>
        <span className="text-xs font-normal text-gray-500">
          {day.date}
        </span>
      </div>
    </button>
  ))}

  {/* Current Day */}
  <div className="w-full max-w-sm">
    <div className="mb-4 flex flex-row justify-between items-center">
      <h2 className="text-3xl font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
        DAY {currentDay.day}
      </h2>
      <p className="text-sm font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
        {currentDay.date}
      </p>
    </div>
    <div className="bg-black backdrop-blur-sm border-2 border-[#C783FB] rounded-lg p-6 relative overflow-hidden">
      <div className="space-y-3">
        {currentDay.schedule.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0"
          >
            <span className="text-white font-normal text-xs min-w-[100px]">
              {item.time}
            </span>
            <span className="text-[#A3A3A3] font-normal text-xs text-right flex-1">
              {item.activity}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Show all next days BELOW */}
  {agendaDays.slice(activeDay + 1).map((day) => (
    <button
      key={`next-${day.day}`}
      onClick={() => setActiveDay(day.day - 1)}
      className="w-full max-w-sm bg-black/50 border border-[#C783FB]/30 rounded-lg p-4 transition-all hover:border-[#C783FB]/60"
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
          DAY {day.day}
        </span>
        <span className="text-xs font-normal text-gray-500">
          {day.date}
        </span>
      </div>
    </button>
  ))}
</div>

        {/* DESKTOP - Diagonal Scroll Animation */}
        <motion.div
          className="hidden md:flex relative w-full h-screen" 
          style={{
            x: stackX,
            y: stackY,
            willChange: 'transform',
          }}
        >
          {agendaDays.map((dayData, index) => {
            const baseLeft = 50
            const baseTop = 50
            const spacing = 50

            return (
              <motion.div
                key={dayData.day}
                className="absolute w-[650px] mt-6"
                style={{
                  left: `${baseLeft + index * spacing}%`,
                  top: `${baseTop + index * spacing}%`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                animate={{
                  opacity: index === activeDay ? 1 : 0.35,
                  scale: index === activeDay ? 1 : 0.9,
                  zIndex: index === activeDay ? 20 : 10,
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
              >
                <div className="mb-5 flex flex-row justify-between items-center">
                  <h2 className="text-5xl font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
                    DAY {dayData.day}
                  </h2>
                  <p className="text-lg font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
                    {dayData.date}
                  </p>
                </div>
                <div className="bg-black backdrop-blur-sm border-2 border-[#C783FB] rounded-lg p-12 relative overflow-hidden">
                  <div className="space-y-4">
                    {dayData.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3 border-b border-gray-700/50 last:border-0"
                      >
                        <span className="text-white font-normal text-base min-w-[140px]">
                          {item.time}
                        </span>
                        <span className="text-[#A3A3A3] font-normal text-base text-right flex-1">
                          {item.activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Progress dots */}
        <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 gap-2 z-30">
          {agendaDays.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeDay ? 'bg-[#C783FB] scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}