'use client'

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const workshops = [
  {
    id: 1,
    title: 'Foundations of Vision-Based Manipulation',
    subtitle: 'Pixel-to-World Mapping and Beyond',
    description:
      'Explore the fundamentals of vision-based robotic manipulation, from understanding camera calibration to transforming 2D pixel coordinates into 3D world space. Learn essential techniques for bridging the gap between visual perception and physical robot control.',
    isUpcoming: false,
  },
  {
    id: 2,
    title: 'Upcoming !!',
    subtitle: 'Upcoming !!',
    description: '',
    isUpcoming: true,
  },
]

export default function WorkshopsSection() {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const isAnimatingRef = useRef(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState({
    title: workshops[0].isUpcoming ? '' : workshops[0].title,
    subtitle: workshops[0].isUpcoming ? '' : workshops[0].subtitle,
    description: workshops[0].isUpcoming ? '' : workshops[0].description,
  })
  const [nextWorkshopText, setNextWorkshopText] = useState({
    title: workshops[1]?.title || '',
    subtitle: workshops[1]?.subtitle || '',
  })

  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0)
  const [mobileDisplayedText, setMobileDisplayedText] = useState({
    title: '',
    subtitle: '',
    description: '',
  })
  const [isTyping, setIsTyping] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize typing animation on mount for desktop
  useEffect(() => {
    if (isMobile) return
    
    const targetWorkshop = workshops[0]
    const nextWorkshop = workshops[1]

    let titleIndex = 0
    let subtitleIndex = 0
    let descIndex = 0
    let nextTitleIndex = 0
    let nextSubtitleIndex = 0

    const typeText = () => {
      const titleDone = titleIndex >= targetWorkshop.title.length
      const subtitleDone = subtitleIndex >= targetWorkshop.subtitle.length
      // For upcoming workshops, skip description animation since it's empty
      const descDone = targetWorkshop.isUpcoming || descIndex >= (targetWorkshop.description?.length || 0)
      const nextTitleDone = !nextWorkshop || nextTitleIndex >= nextWorkshop.title.length
      const nextSubtitleDone = !nextWorkshop || nextSubtitleIndex >= nextWorkshop.subtitle.length

      if (!titleDone || !subtitleDone || !descDone || !nextTitleDone || !nextSubtitleDone) {
        setDisplayedText({
          title: targetWorkshop.title.slice(0, titleIndex),
          subtitle: targetWorkshop.subtitle.slice(0, subtitleIndex),
          description: (targetWorkshop.description || '').slice(0, descIndex),
        })
        if (nextWorkshop) {
          setNextWorkshopText({
            title: nextWorkshop.title.slice(0, nextTitleIndex),
            subtitle: nextWorkshop.subtitle.slice(0, nextSubtitleIndex),
          })
        }
        if (!titleDone) titleIndex += 2
        if (titleDone && !subtitleDone) subtitleIndex += 2
        if (subtitleDone && !descDone && !targetWorkshop.isUpcoming) descIndex += 3
        if (subtitleDone && !nextTitleDone) nextTitleIndex += 2
        if (nextTitleDone && !nextSubtitleDone) nextSubtitleIndex += 2
        requestAnimationFrame(typeText)
      }
    }
    
    typeText()
  }, [isMobile])

  const activeIndex = useTransform(scrollYProgress, (progress) =>
    Math.min(Math.floor(progress * workshops.length), workshops.length - 1)
  )

  // Desktop scroll animation effect
  useEffect(() => {
    if (isMobile) return

    const unsubscribe = activeIndex.on('change', (latest) => {
      if (latest !== currentIndex && latest < workshops.length && !isAnimatingRef.current) {
        isAnimatingRef.current = true
        setCurrentIndex(latest)
        const targetWorkshop = workshops[latest]
        const nextWorkshop = workshops[latest + 1]
        
        // Reset displayed text immediately to prevent showing previous content
        setDisplayedText({
          title: '',
          subtitle: '',
          description: '',
        })
        setNextWorkshopText({
          title: '',
          subtitle: '',
        })

        let titleIndex = 0
        let subtitleIndex = 0
        let descIndex = 0
        let nextTitleIndex = 0
        let nextSubtitleIndex = 0

        const typeText = () => {
          const titleDone = titleIndex >= targetWorkshop.title.length
          const subtitleDone = subtitleIndex >= targetWorkshop.subtitle.length
          // For upcoming workshops, skip description animation since it's empty
          const descDone = targetWorkshop.isUpcoming || descIndex >= (targetWorkshop.description?.length || 0)
          const nextTitleDone = !nextWorkshop || nextTitleIndex >= nextWorkshop.title.length
          const nextSubtitleDone = !nextWorkshop || nextSubtitleIndex >= nextWorkshop.subtitle.length

          if (!titleDone || !subtitleDone || !descDone || !nextTitleDone || !nextSubtitleDone) {
            setDisplayedText({
              title: targetWorkshop.title.slice(0, titleIndex),
              subtitle: targetWorkshop.subtitle.slice(0, subtitleIndex),
              description: (targetWorkshop.description || '').slice(0, descIndex),
            })
            if (nextWorkshop) {
              setNextWorkshopText({
                title: nextWorkshop.title.slice(0, nextTitleIndex),
                subtitle: nextWorkshop.subtitle.slice(0, nextSubtitleIndex),
              })
            }
            if (!titleDone) titleIndex += 2
            if (titleDone && !subtitleDone) subtitleIndex += 2
            if (subtitleDone && !descDone && !targetWorkshop.isUpcoming) descIndex += 3
            if (subtitleDone && !nextTitleDone) nextTitleIndex += 2
            if (nextTitleDone && !nextSubtitleDone) nextSubtitleIndex += 2
            requestAnimationFrame(typeText)
          } else {
            // Animation complete, allow new animations
            isAnimatingRef.current = false
          }
        }
        typeText()
      }
    })

    return () => unsubscribe()
  }, [currentIndex, isMobile, activeIndex])

  // Mobile typing effect
  useEffect(() => {
    if (!isMobile) return

    setIsTyping(true)
    const targetWorkshop = workshops[mobileCurrentIndex]

    let titleIndex = 0
    let subtitleIndex = 0
    let descIndex = 0

    const typeText = () => {
      const titleDone = titleIndex >= targetWorkshop.title.length
      const subtitleDone = subtitleIndex >= targetWorkshop.subtitle.length
      const descDone = descIndex >= targetWorkshop.description.length

      if (!titleDone || !subtitleDone || !descDone) {
        setMobileDisplayedText({
          title: targetWorkshop.title.slice(0, titleIndex),
          subtitle: targetWorkshop.subtitle.slice(0, subtitleIndex),
          description: targetWorkshop.description.slice(0, descIndex),
        })
        if (!titleDone) titleIndex += 2
        if (titleDone && !subtitleDone) subtitleIndex += 2
        if (subtitleDone && !descDone) descIndex += 3
        requestAnimationFrame(typeText)
      } else {
        setIsTyping(false)
      }
    }

    typeText()
  }, [mobileCurrentIndex, isMobile])

  const next = () => {
    if (!isTyping && mobileCurrentIndex < workshops.length - 1) {
      setMobileCurrentIndex(mobileCurrentIndex + 1)
    }
  }

  const prev = () => {
    if (!isTyping && mobileCurrentIndex > 0) {
      setMobileCurrentIndex(mobileCurrentIndex - 1)
    }
  }

  const currentMobileWorkshop = workshops[mobileCurrentIndex]
  const currentDesktopWorkshop = workshops[currentIndex]

  return (
    <>
      <section
        id="workshop"
        className="md:hidden relative min-h-screen py-12 px-4 flex items-center"
      >
        
        <div className="max-w-lg mx-auto w-full flex flex-col justify-between min-h-[80vh]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white font-virgo text-4xl tracking-wider">WORKSHOPS</h2>
            <div className="text-white text-sm font-mono border border-white/30 px-3 py-1 rounded-lg">
              {currentMobileWorkshop.isUpcoming ? (
                <>
                  <span>!!</span>
                  <span className="text-white/50"> / {String(workshops.length).padStart(2, '0')}</span>
                </>
              ) : (
                <>
                  <span>{String(mobileCurrentIndex + 1).padStart(2, '0')}</span>
                  <span className="text-white/50"> / {String(workshops.length).padStart(2, '0')}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute -top-1 -left-1 w-8 h-8 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6F06C1] to-[#36D9FF]" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#6F06C1] to-[#36D9FF]" />
              </div>

              <div className="absolute -top-1 -right-1 w-8 h-8 z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#6F06C1] to-[#36D9FF]" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#6F06C1] to-[#36D9FF]" />
              </div>

              <div className="absolute -bottom-1 -left-1 w-8 h-8 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6F06C1] to-[#36D9FF]" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#6F06C1] to-[#36D9FF]" />
              </div>

              <div className="absolute -bottom-1 -right-1 w-8 h-8 z-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#6F06C1] to-[#36D9FF]" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#6F06C1] to-[#36D9FF]" />
              </div>

              <div className="bg-black/40 backdrop-blur-sm p-6">
                {currentMobileWorkshop.isUpcoming ? (
                  <div className="flex items-center justify-center min-h-[16rem]">
                    <h3 className="text-4xl font-bold text-white text-center">
                      {mobileDisplayedText.title}
                      {isTyping && mobileDisplayedText.title.length < 'Upcoming !!'.length && (
                        <span className="animate-pulse">|</span>
                      )}
                    </h3>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-2 min-h-[2rem]">
                      {mobileDisplayedText.title}
                      {isTyping &&
                        mobileDisplayedText.title.length <
                          workshops[mobileCurrentIndex].title.length && (
                          <span className="animate-pulse">|</span>
                        )}
                    </h3>
                    <p className="text-purple-400 text-lg mb-4 min-h-[1.75rem]">
                      {mobileDisplayedText.subtitle}
                    </p>
                    <p className="text-gray-300 text-base leading-relaxed min-h-[12rem]">
                      {mobileDisplayedText.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-0 mt-6">
            <button
              onClick={prev}
              disabled={isTyping}
              className="bg-[#1B1A22]/70 hover:bg-[#1B1A22] text-white px-4 py-2 transition disabled:opacity-50"
              aria-label="Previous workshop"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              disabled={isTyping}
              className="bg-[#1B1A22]/70 hover:bg-[#1B1A22] text-white px-4 py-2 transition disabled:opacity-50"
              aria-label="Next workshop"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>



      <section
        id="workshops"
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: `${workshops.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="w-full flex">
            <div className="w-1/3 relative h-screen flex flex-col justify-between py-20 px-8">
              <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                {workshops.map((workshop, index) => {
                  const yTransform = useTransform(
                    scrollYProgress,
                    [
                      0,
                      index / workshops.length,
                      (index + 1) / workshops.length,
                    ],
                    index === workshops.length - 1 ? ['50vh', '0vh', '0vh'] : ['50vh', '0vh', '-50vh']
                  )
                  
                  const opacityTransform = useTransform(
                    scrollYProgress,
                    [
                      Math.max(0, (index - 0.5) / workshops.length),
                      index / workshops.length,
                      Math.min(1, (index + 0.5) / workshops.length),
                    ],
                    index === workshops.length - 1 ? [0, 1, 1] : [0, 1, 0.3]
                  )
                  
                  const scaleTransform = useTransform(
                    scrollYProgress,
                    [
                      Math.max(0, (index - 0.3) / workshops.length),
                      index / workshops.length,
                      Math.min(1, (index + 0.3) / workshops.length),
                    ],
                    index === workshops.length - 1 ? [0.8, 1, 1] : [0.8, 1, 0.9]
                  )
                  
                  return (
                    <motion.div
                      key={workshop.id}
                      className="absolute text-white text-center"
                      style={{
                        y: yTransform,
                        opacity: opacityTransform,
                        scale: scaleTransform,
                      }}
                    >
                      <h2 className="text-3xl lg:text-4xl font-bold">
                        {workshop.isUpcoming ? 'Upcoming' : workshop.title}
                      </h2>
                    </motion.div>
                  )
                })}
              </div>
              <div className="relative flex items-center justify-start">
                <motion.div
                  className="text-white text-xl font-mono border border-white/30 px-4 py-2 rounded-lg"
                  style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0]) }}
                >
                  <motion.span style={{ display: 'inline-block' }}>
                    {useTransform(activeIndex, (latest) => {
                      const workshop = workshops[latest]
                      return workshop?.isUpcoming ? '!!' : String(latest + 1).padStart(2, '0')
                    })}
                  </motion.span>
                  <span className="text-white/50"> / {String(workshops.length).padStart(2, '0')}</span>
                </motion.div>
              </div>
            </div>

            <div className="w-2/3 relative h-screen flex flex-col justify-between py-20 pl-20 pr-4">
              <div className="relative flex-1 flex items-start pt-8 pb-18">
                <div className="relative w-full">
                  <div className="relative inline-block">
                    <div className="absolute -top-1 -left-1 w-8 h-8 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6F06C1] to-[#36D9FF]" />
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#6F06C1] to-[#36D9FF]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#6F06C1] to-[#36D9FF]" />
                      <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#6F06C1] to-[#36D9FF]" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 pointer-events-none">
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6F06C1] to-[#36D9FF]" />
                      <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#6F06C1] to-[#36D9FF]" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#6F06C1] to-[#36D9FF]" />
                      <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#6F06C1] to-[#36D9FF]" />
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm p-6 max-w-2xl" key={currentIndex}>
                      {currentDesktopWorkshop.isUpcoming ? (
                        <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
                          <h3 className="text-5xl lg:text-6xl font-bold text-white text-center">
                            {displayedText.title || ''}
                          </h3>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 min-h-[3rem]">{displayedText.title}</h3>
                          <p className="text-purple-400 text-lg lg:text-xl mb-4 min-h-[2rem]">{displayedText.subtitle}</p>
                          <p className="text-gray-300 text-base lg:text-lg leading-relaxed min-h-[8rem]">{displayedText.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

<div className="relative h-32 flex items-center">
  <div className="relative w-full">
    <div className="text-left">
      <p className="text-white/40 text-3xl lg:text-4xl font-bold mb-1 min-h-[2.5rem]">
        {currentDesktopWorkshop.isUpcoming
          ? 'Upcoming!!'
          : currentDesktopWorkshop.title}
      </p>
      <p className="text-purple-400/40 text-base lg:text-lg min-h-[1.75rem]">
        {currentDesktopWorkshop.isUpcoming
          ? 'Upcoming!!'
          : currentDesktopWorkshop.subtitle}
      </p>
    </div>
  </div>
</div>

              <div className="relative flex items-end justify-end pb-4">
                <h3 className="text-white font-virgo text-3xl lg:text-5xl font-bold tracking-wider">WORKSHOPS</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}