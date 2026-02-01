'use client'

import { useState, useEffect, useRef } from 'react'

export default function AgendaSection() {
  const [activeDay, setActiveDay] = useState(0)
  const sectionRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  const agendaDays = [
    {
      day: 1,
      date: 'Fri 14.01.2025',
      schedule: [
        { time: '4 PM - 6 PM', activity: 'Check-In' },
        { time: '6 PM - 8 PM', activity: 'Opening Ceremony & Ice Breaking' },
        { time: '8 PM - 9 PM', activity: 'Ice Break Activities' },
        { time: '8 PM - 9 PM', activity: 'Diner' },
        { time: '9 PM - 11 PM', activity: 'Hacking Starts' },
        { time: '11 PM - 12 AM', activity: 'Break' },
      ],
    },
    {
      day: 2,
      date: 'Sat 15.01.2025',
      schedule: [
        { time: '4 PM - 6 PM', activity: 'Check-In' },
        { time: '6 PM - 8 PM', activity: 'Opening Ceremony & Ice Breaking' },
        { time: '8 PM - 9 PM', activity: 'Ice Break Activities' },
        { time: '8 PM - 9 PM', activity: 'Diner' },
        { time: '9 PM - 11 PM', activity: 'Hacking Starts' },
        { time: '11 PM - 12 AM', activity: 'Break' },
      ],
    },
    {
      day: 3,
      date: 'Sun 16.01.2025',
      schedule: [
        { time: '4 PM - 6 PM', activity: 'Check-In' },
        { time: '6 PM - 8 PM', activity: 'Opening Ceremony' },
        { time: '8 PM - 9 PM', activity: 'Final Presentations' },
        { time: '8 PM - 9 PM', activity: 'Awards Ceremony' },
        { time: '9 PM - 11 PM', activity: 'Closing Event' },
        { time: '11 PM - 12 AM', activity: 'Departure' },
      ],
    },
  ]

  useEffect(() => {
    const handleWheel = (e) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2
      if (!isInView) return

      if ((activeDay === agendaDays.length - 1 && e.deltaY > 0) || (activeDay === 0 && e.deltaY < 0)) {
        return
      }

      e.preventDefault()
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

      scrollTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          setActiveDay((prev) => Math.min(prev + 1, agendaDays.length - 1))
        } else {
          setActiveDay((prev) => Math.max(prev - 1, 0))
        }
      }, 50)
    }

    const section = sectionRef.current
    if (section) section.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      if (section) section.removeEventListener('wheel', handleWheel)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [agendaDays.length, activeDay])

  const getDayPosition = (index) => {
    if (index === activeDay) return 'center'
    if (index === activeDay - 1) return 'top-left'
    if (index === activeDay + 1) return 'bottom-right'
    return 'hidden'
  }

  const getDayStyles = (position) => {
    switch (position) {
      case 'center':
        return 'scale-75 opacity-100 z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
      case 'top-left':
        return 'scale-80 opacity-30 -left-48 -top-32 z-10 pointer-events-none'
      case 'bottom-right':
        return 'scale-80 opacity-30 -right-48 -bottom-32 z-10 pointer-events-none'
      default:
        return 'scale-0 opacity-0 z-0 pointer-events-none'
    }
  }

  return (
    <section
      id="agenda"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 z-30">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-virgo text-white tracking-wider">
          AGENDA
        </h1>
      </div>

      <div className="md:hidden w-full px-4 py-20 flex flex-col items-center justify-center min-h-screen space-y-4">
        {activeDay > 0 && (
          <button
            onClick={() => setActiveDay(activeDay - 1)}
            className="w-full max-w-sm bg-black/50 border border-[#C783FB]/30 rounded-lg p-4 transition-all hover:border-[#C783FB]/60"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
                DAY {agendaDays[activeDay - 1].day}
              </span>
              <span className="text-xs font-normal text-gray-500">
                {agendaDays[activeDay - 1].date}
              </span>
            </div>
          </button>
        )}

        <div className="w-full max-w-sm">
          <div className="mb-4 flex flex-row justify-between items-center">
            <h2 className="text-3xl font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
              DAY {agendaDays[activeDay].day}
            </h2>
            <p className="text-sm font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
              {agendaDays[activeDay].date}
            </p>
          </div>
          <div className="bg-black backdrop-blur-sm border-2 border-[#C783FB] rounded-lg p-6 relative overflow-hidden">
            <div className="space-y-3">
              {agendaDays[activeDay].schedule.map((item, idx) => (
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

        {activeDay < agendaDays.length - 1 && (
          <button
            onClick={() => setActiveDay(activeDay + 1)}
            className="w-full max-w-sm bg-black/50 border border-[#C783FB]/30 rounded-lg p-4 transition-all hover:border-[#C783FB]/60"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-normal bg-gradient-to-r from-[#C783FB] to-white/50 bg-clip-text text-transparent">
                DAY {agendaDays[activeDay + 1].day}
              </span>
              <span className="text-xs font-normal text-gray-500">
                {agendaDays[activeDay + 1].date}
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="hidden md:block relative w-full h-screen">
        {agendaDays.map((dayData, index) => {
          const position = getDayPosition(index)
          return (
            <div
              key={dayData.day}
              className={`absolute transition-all duration-1000 ease-out w-[650px] ${getDayStyles(position)}`}
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
            </div>
          )
        })}
      </div>

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
    </section>
  )
}
