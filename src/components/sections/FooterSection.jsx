'use client'
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react' ;

export default function FooterSection() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <footer id="footer" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-8 mb-16">
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => (window.location.href = 'https://datahack-registration.cse.club/')}
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

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-virgo leading-tight">
              <span className="text-white">IN </span>
              <span className="text-[#B794F4]">DATA</span>
              <br />
              <span className="text-white">WE TRUST</span>
            </h2>
          </div>

          <div className="flex-shrink-0 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-end gap-6 mb-8">
              <img
                src="/images/footer/cse.png"
                alt="CSE Logo"
                className="w-16 h-16 md:w-32 md:h-32"
              />
              <img
                src="/images/footer/datahack_logo.png"
                alt="DataHack Logo"
                className="w-16 h-16 md:w-24 md:h-24"
              />
            </div>

            <div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Get in touch</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[#737373]">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left"
                >
                  Facebook
                </a>
                <a
                  href="https://cse.club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left"
                >
                  cse.club
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left"
                >
                  Instagram
                </a>
                <a
                  href="mailto:cse@esi.dz"
                  className="hover:text-white transition-colors text-left"
                >
                  cse@esi.dz
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left"
                >
                  LinkedIn
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left col-start-1"
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#737373]/30 pt-6">
          <p className="text-[#737373] text-sm text-center">
            Copyright © 2026 Club Scientifique de l'ESI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
