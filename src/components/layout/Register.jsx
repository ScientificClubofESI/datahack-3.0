"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Register() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHidden(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Workshops", href: "#workshop" },
    { label: "Mentors", href: "#mentors" },
    { label: "Agenda", href: "#agenda" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleMenuClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-4 flex items-center justify-between z-70 transition-all duration-500 ease-out ${
          isHidden ? "opacity-0 -translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="w-full max-w-360 mx-auto px-4 sm:px-10 h-20 sm:h-24 flex items-center justify-between">
          <div className="relative flex items-center group cursor-pointer h-16 w-24">
            <div className="relative left-3 z-10 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/images/D.png"
                alt="D Layer"
                width={30}
                height={30}
                className="object-contain drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]"
              />
            </div>
            <div className="absolute z-20 left-7 top-6 transition-transform duration-500 group-hover:scale-110">
              <Image
                src="/images/H.png"
                alt="H Layer"
                width={30}
                height={30}
                className="object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
              />
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "https://datahack-registration.cse.club")}
            className="group hidden md:flex items-center gap-2 hover:gap-3 transition-all duration-300 cursor-pointer"
          >
            <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
              <Image
                src="/images/hero/arrow.svg"
                alt="Arrow"
                width={20}
                height={20}
                className="translate-y-[30%] rotate-45 scale-0 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 duration-500 transition-transform"
              />
            </div>
            <span className="text-white text-xl font-light">Register Now</span>
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white z-70"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative z-70">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "rotate-45 translate-y-2.25" : "rotate-0 translate-y-0"}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.25" : "rotate-0 translate-y-0"}`} />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-65 transition-all duration-500 ease-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-8">
          <nav className="flex flex-col items-center space-y-8">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleMenuClick(item.href); }}
                className={`text-3xl sm:text-4xl font-light text-white/80 hover:text-white transition-all duration-300 hover:tracking-wider ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50 + 100}ms` : "0ms" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
