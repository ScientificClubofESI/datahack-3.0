'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const navItems = [
  { id: 'about', name: 'About' },
  { id: 'workshops', name: 'Workshops' },
  { id: 'mentors', name: 'Mentors' },
  { id: 'agenda', name: 'Agenda' },
  { id: 'faq', name: 'FAQ' },
];

const Shape2Icon = ({ className = '' }) => (
  <div className={`shrink-0 ${className}`} style={{ width: 16, height: 14 }}>
    <Image src="/images/shape2.png" alt="icon" width={16} height={14} className="object-contain" priority />
  </div>
);

export default function Navbar() {
  const [activeSection, setActiveSection] = useState(null);
  const rafRef = useRef(null);
  const activeIndex = navItems.findIndex(item => item.id === activeSection);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const sections = ['hero', ...navItems.map(i => i.id), 'footer'];

        const sectionPositions = sections.map(id => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top, bottom: rect.bottom, height: rect.height };
        }).filter(Boolean);

        const viewportCenter = window.innerHeight / 2;
        let mostVisibleSection = null;
        let maxVisibility = 0;

        sectionPositions.forEach(section => {
          const visibleTop = Math.max(0, Math.min(section.bottom, window.innerHeight) - Math.max(section.top, 0));
          const visibility = visibleTop / section.height;
          const centerInSection = section.top <= viewportCenter && section.bottom >= viewportCenter;
          if (centerInSection && visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisibleSection = section.id;
          }
        });

        if (!mostVisibleSection) {
          let minDistance = Infinity;
          sectionPositions.forEach(section => {
            const distance = Math.min(Math.abs(section.top - viewportCenter), Math.abs(section.bottom - viewportCenter));
            if (distance < minDistance) {
              minDistance = distance;
              mostVisibleSection = section.id;
            }
          });
        }

        const newActiveSection = (mostVisibleSection === 'hero' || mostVisibleSection === 'footer') ? null : mostVisibleSection;
        setActiveSection(prev => prev !== newActiveSection ? newActiveSection : prev);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <nav className="hidden md:flex fixed bottom-12 left-0 right-0 z-70 justify-center px-4">
      <div className="w-full max-w-250 px-6">
        <div className="grid grid-cols-5 gap-4 items-end">
          {navItems.map((item, index) => {
            const isCurrent = activeSection === item.id;
            const isPassedOrCurrent = activeSection !== null && index <= activeIndex;
            return (
              <div key={item.id} onClick={() => scrollToSection(item.id)} className="group cursor-pointer flex flex-col relative">
                <div className="h-10 flex items-center px-1 relative">
                  {isCurrent ? (
                    <div className="flex items-center gap-2 text-white animate-in fade-in duration-300">
                      <Shape2Icon />
                      <span className="text-sm font-light tracking-wide uppercase">{item.name}</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center gap-2 px-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Shape2Icon />
                      <span className="text-sm font-light tracking-wide uppercase">{item.name}</span>
                    </div>
                  )}
                </div>
                <div
                  className={`h-px w-full transition-all duration-700 ${
                    isPassedOrCurrent ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-gray-600'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
