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
          <img
            src="/images/sponsors/sponsor.png"
            alt="Yalidine Express"
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto"
          />
        </div>
      </div>
    </section>
  )
}
