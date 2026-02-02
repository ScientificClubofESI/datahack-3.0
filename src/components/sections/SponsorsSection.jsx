import Image from 'next/image';

export default function SponsorsSection() {
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
          {/* Mobile Image */}
          <Image
            src="/images/sponsors/IMG_1540 1_mobile.svg"
            alt="Sponsor Logo"
            width={300}
            height={58}
            className="object-contain md:hidden"
          />
          {/* Desktop Image */}
          <Image
            src="/images/sponsors/sponsor.png"
            alt="Sponsor Logo"
            width={555}
            height={108}
            className="object-contain hidden md:block"
          />
        </div>
      </div>
    </section>
  )
}