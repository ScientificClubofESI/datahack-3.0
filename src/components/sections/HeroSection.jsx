"use client";
import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#04080A] flex flex-col items-center overflow-hidden">
      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(100px, -150px);
          }
          50% {
            transform: translate(-80px, 120px);
          }
          75% {
            transform: translate(130px, 50px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .purple-glow {
          position: absolute;
          background: radial-gradient(
            circle,
            #6f06c1 -40%,
            rgba(168, 85, 247, 0) 70%
          );
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.75;
          animation: drift 7s infinite alternate ease-in-out;
          pointer-events: none;
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div
          className="purple-glow w-87.5 h-87.5 md:w-175 md:h-175"
          style={{
            top: "-20%",
            left: "-10%",
            animationDelay: "0s",
          }}
        />
        <div
          className="purple-glow w-100 h-100 md:w-125 md:h-125"
          style={{
            top: "40%",
            right: "-10%",
            animationDelay: "2s",
          }}
        />

        <Image
          src="/images/hero/wave1.svg"
          alt="Background Wave Left"
          width={800}
          height={800}
          className="absolute top-0 left-0 w-1/2 md:w-1/3 opacity-80"
        />
        <Image
          src="/images/hero/wave0.svg"
          alt="Background Wave Right"
          width={800}
          height={800}
          className="absolute bottom-0 right-0 w-1/2 md:w-[22%] opacity-80"
        />
      </div>

      <div className="grow flex flex-col items-center justify-center w-full px-6 mb-8">
        <div className="w-full max-w-175 flex flex-col">
          <div className="w-full text-[#A3A3A3] flex justify-between items-center text-sm md:text-base font-normal mb-6 md:mb-8 px-1" style={{ fontFamily: '"Century Gothic", -apple-system, sans-serif' }}>
            <p>January 14th - 16th</p>
            <p>ESI Algiers</p>
          </div>

          <div className="relative w-full flex justify-center mb-6">
            <Image
              src="/images/hero/Datahack-full.png"
              alt="Data Hack 3.0"
              width={600}
              height={200}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <p className="text-[#A3A3A3] text-base md:text-lg font-normal text-center px-2 leading-relaxed" style={{ fontFamily: '"Century Gothic", -apple-system, sans-serif' }}>
            Join us in a 3-day datathon where participants build and train AI
            solutions to solve real-world problems using practical datasets.
            Compete, innovate, and win!
          </p>

          <div className="w-full border-t border-[#333333] my-8 md:my-10"></div>

          <button className="group flex items-center justify-center md:self-start gap-2 hover:gap-3 transition-all duration-300 cursor-pointer">
            <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
            <Image
              src="/images/hero/arrow.svg"
              alt="Arrow"
              width={20}
              height={20}
              className="translate-y-[30%] rotate-45 scale-0 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 duration-500 transition-transform"
            />
          </div>
          <span className="text-white text-2xl font-light" style={{ fontFamily: '"Century Gothic", -apple-system, sans-serif' }}>Register Now</span>
          <div className="w-5 group-hover:w-0 transition-all duration-300 overflow-hidden">
            <Image
              src="/images/hero/arrow.svg"
              alt="Arrow"
              width={20}
              height={20}
              className="group-hover:translate-y-[-50%] group-hover:rotate-45 group-hover:scale-0 duration-500 transition-transform"
            />
          </div>
          </button>
        </div>
      </div>
    </section>
  );
}
