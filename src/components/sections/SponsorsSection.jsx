import Image from 'next/image';

export default function SponsorsSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <section
      id="sponsors"
      className="h-full flex items-center justify-center py-8 md:py-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-virgo text-white tracking-wider mb-12 sm:mb-16">
          SPONSORED BY
        </h2>
        <div className="flex items-center justify-center">
          <Image
            src="/images/sponsors/sponsor.png"
            alt="Sponsor Logo"
            width={isMobile ? 300 : 555}
            height={isMobile ? 58 : 108}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}