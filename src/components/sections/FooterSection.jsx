'use client'
import Image from 'next/image';
import { useState } from 'react';

export default function FooterSection() {
  const [showClosedMessage, setShowClosedMessage] = useState(false);

  const handleRegisterClick = () => {
    setShowClosedMessage(true);
    setTimeout(() => setShowClosedMessage(false), 3000);
  };

  return (
    <footer id="footer" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center gap-12 lg:gap-8 mb-16">
          {/* Left section */}
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start gap-8">
            <div className="relative">
              <button onClick={handleRegisterClick} className="group flex items-center justify-center lg:justify-start gap-2 hover:gap-3 transition-all duration-300 cursor-pointer">
                <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
                  <Image
                    src="/images/footer/arrow-up-right.svg"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="translate-y-[30%] rotate-45 scale-0 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 duration-500 transition-transform"
                    
                    
                  />
                </div>
                <span className="text-[#B794F4] text-lg sm:text-xl md:text-2xl font-light">Register Now</span>
                <div className="w-5 group-hover:w-0 transition-all duration-300 overflow-hidden">
                  <Image
                    src="/images/footer/arrow-up-right.svg"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="group-hover:translate-y-[-50%] group-hover:rotate-45 group-hover:scale-0 duration-500 transition-transform"
                    
                  />
                </div>
              </button>
              {showClosedMessage && (
                <div className="absolute left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 top-full mt-4 bg-purple-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-300">
                  <p className="text-sm whitespace-nowrap">Registrations are closed. Thank you for your interest!</p>
                </div>
              )}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-virgo leading-tight hidden lg:block">
              <span className="text-white">IN </span>
              <span className="text-[#B794F4]">DATA</span>
              <br />
              <span className="text-white">WE TRUST</span>
            </h2>
            <h2 className="text-3xl lg:hidden flex gap-4 font-normal" style={{ fontFamily: '"Century Gothic", -apple-system, sans-serif' }}>
              <span className="text-white">In</span>
              <span className="text-[#B794F4]">Data</span>
              <span className="text-white">We</span>
              <span className="text-white">Trust</span>
            </h2>
          </div>

          {/* Right section */}
          <div className="flex-shrink-0 text-center lg:text-right flex flex-col items-center lg:items-center gap-8">
            <div className="flex items-center justify-center lg:justify-end gap-6">
              <img
                src="/images/footer/cse.png"
                alt="CSE Logo"
                className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
              />
              <img
                src="/images/footer/datahack_logo.png"
                alt="DataHack Logo"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              />
            </div>
              <h3 className="text-white text-lg sm:text-2xl ">Get in touch</h3>
            <div className="w-full">
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#737373] text-sm sm:text-base">
                <a
                
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left lg:text-right"
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
                  className="hover:text-white transition-colors text-left lg:text-right"
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
                  className="hover:text-white transition-colors text-left lg:text-right"
                >
                  LinkedIn
                </a>
                <a
                
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left lg:text-right col-start-1"
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