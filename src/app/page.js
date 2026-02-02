'use client'
import { memo } from 'react'
import HeroSection from '@/components/sections/HeroSection.jsx'
import AboutSection from '@/components/sections/AboutSection.jsx'
import WorkshopsSection from '@/components/sections/WorkshopsSection.jsx'
import MentorsSection from '@/components/sections/MentorsSection.jsx'
import AgendaSection from '@/components/sections/AgendaSection.jsx'
import FAQSection from '@/components/sections/FAQSection.jsx'
import SponsorsSection from '@/components/sections/SponsorsSection.jsx'
import FooterSection from '@/components/sections/FooterSection.jsx'

// This component NEVER re-renders - it's completely static
const StaticBackground = memo(function StaticBackground() {
  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        backgroundImage: 'url(/images/background_full.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden',
      }}
    />
  )
})

// Memoize each section to prevent unnecessary re-renders
const MemoizedAboutSection = memo(AboutSection)
const MemoizedWorkshopsSection = memo(WorkshopsSection)
const MemoizedMentorsSection = memo(MentorsSection)
const MemoizedAgendaSection = memo(AgendaSection)
const MemoizedFAQSection = memo(FAQSection)
const MemoizedSponsorsSection = memo(SponsorsSection)
const MemoizedFooterSection = memo(FooterSection)

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      
      {/* Static background - completely isolated, never re-renders */}
      <StaticBackground />
      
      {/* Content sections */}
      <div className="relative">
        <MemoizedAboutSection />
        <MemoizedWorkshopsSection />
        <MemoizedMentorsSection />
        <MemoizedAgendaSection />
        <MemoizedFAQSection />
        <MemoizedSponsorsSection />
        <MemoizedFooterSection />
      </div>
    </main>
  )
}