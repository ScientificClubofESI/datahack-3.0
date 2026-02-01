'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/hero/background.png)' }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 min-h-screen px-4 sm:px-8 md:px-20 lg:px-24 py-16">
        <div className="w-full max-w-4xl flex justify-between items-center text-[#A3A3A3]/60 text-xs sm:text-sm md:text-base">
          <span>January 14th - 16th</span>
          <span>ESI Algiers</span>
        </div>

        <div className="relative w-full max-w-4xl h-24 sm:h-32 md:h-40 lg:h-56 my-2 md:my-4">
          <Image
            src="/images/hero/datahack.png"
            alt="DATAHACK"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-[#A3A3A3]/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl leading-relaxed text-center sm:text-left px-2 sm:px-0">
          Join us in a 3-day datathon where participants build and train AI solutions to solve real-world problems using practical datasets. Compete, innovate, and win!
        </p>

        <div className="w-full max-w-4xl my-6 sm:my-8 md:my-12">
          <div className="h-[1px] bg-[#A3A3A3]/30" />
        </div>

        <div className="w-full max-w-4xl">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => (window.location.href = "https://datahack-registration.cse.club/")}
            className="group relative inline-flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white text-base sm:text-lg md:text-xl transition-colors duration-300"
          >
            <span
              className={`transition-transform duration-500 ease-out ${
                isHovered ? 'translate-x-6 sm:translate-x-8' : 'translate-x-0'
              }`}
            >
              Register Now
            </span>

            <span
              className={`transition-transform duration-500 ease-out ${
                isHovered ? '-translate-x-28 sm:-translate-x-36' : 'translate-x-0'
              }`}
            >
              <svg
                width="20"
                height="20"
                className="sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
