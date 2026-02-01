'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import Image from 'next/image'

export default function AboutSection() {
  const images = useMemo(
    () => [
      { id: 1, src: '/images/about/first_c.png', alt: 'DATA HACK Event' },
      { id: 2, src: '/images/about/second_c.png', alt: 'Microsoft Workshop' },
      { id: 3, src: '/images/about/third_c.png', alt: 'Community Gathering' },
      { id: 4, src: '/images/about/forth_c.png', alt: 'University Event' },
    ],
    []
  )

  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['-120%', '0%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative z-10 w-full max-w-7xl px-8 py-20">
          <motion.div
            className="hidden md:flex flex-row gap-8 items-center justify-start mb-16 md:mb-24"
            style={{ x, willChange: 'transform' }}
          >
            {images.map((image, i) => (
              <div
                key={image.id}
                className="relative w-[260px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer flex-shrink-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={260}
                  height={i % 2 === 0 ? 320 : 400}
                  className={`w-full ${
                    i % 2 === 0 ? 'h-[320px]' : 'h-[400px]'
                  } object-cover grayscale group-hover:grayscale-0 transition-all duration-500`}
                  loading="lazy"
                  quality={85}
                />
              </div>
            ))}
          </motion.div>

          <div className="flex flex-row gap-4 items-center justify-center md:hidden">
            <div className="flex flex-col gap-4">
              <div className="relative w-[160px] h-[180px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={160}
                  height={180}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="relative w-[180px] h-[150px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  width={180}
                  height={150}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative w-[180px] h-[150px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  width={180}
                  height={150}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="relative w-[180px] h-[120px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={images[3].src}
                  alt={images[3].alt}
                  width={180}
                  height={120}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-12">
            <div className="max-w-4xl text-right">
              <div className="text-3xl md:text-5xl font-virgo text-white mb-6 tracking-tight">
                ABOUT CSE
              </div>
              <p className="text-gray-300 text-lg md:text-xl">
                The CSE is one of Algeria's largest scientific clubs. Active since
                2008, it aims to provide{' '}
                <span className="text-[#E2BFFD] font-semibold">
                  innovative
                </span>{' '}
                content through{' '}
                <span className="text-[#E2BFFD] font-semibold">
                  hackathons
                </span>
                ,{' '}
                <span className="text-[#E2BFFD] font-semibold">
                  workshops
                </span>
                ,{' '}
                <span className="text-[#E2BFFD] font-semibold">
                  training
                </span>
                , and social media, fostering a dynamic and engaging{' '}
                <span className="text-[#E2BFFD] font-semibold">
                  learning environment
                </span>{' '}
                for all passionate about{' '}
                <span className="text-[#E2BFFD] font-semibold">
                  technology and innovation
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
