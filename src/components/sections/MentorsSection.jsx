'use client';
import { useState, useRef, useEffect } from 'react';

export default function MentorsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const mentors = [
    { id: 1, name: 'AMINA AMINA', role: 'CS Student - ESI', description: 'Lorem ipsum dolor sit amet consectetur. Tortor tempor augue congue. Aliquam praesent rutrum malesuada viverra volutpat. Nec nisl massa odio ultrices. Condimentum ut imperdiet! Eu sapien dignissim convallis amet eu quis.', image: '/images/mentors/mentor.png' },
    { id: 2, name: 'AMINA AMINA', role: 'CS Student - ESI', description: 'Lorem ipsum dolor sit amet consectetur. Tortor tempor augue congue. Aliquam praesent rutrum malesuada viverra volutpat. Nec nisl massa odio ultrices. Condimentum ut imperdiet! Eu sapien dignissim convallis amet eu quis.', image: '/images/mentors/mentor.png' },
    { id: 3, name: 'AMINA AMINA', role: 'CS Student - ESI', description: 'Lorem ipsum dolor sit amet consectetur. Tortor tempor augue congue. Aliquam praesent rutrum malesuada viverra volutpat. Nec nisl massa odio ultrices. Condimentum ut imperdiet! Eu sapien dignissim convallis amet eu quis.', image: '/images/mentors/mentor.png' },
    { id: 4, name: 'AMINA AMINA', role: 'CS Student - ESI', description: 'Lorem ipsum dolor sit amet consectetur. Tortor tempor augue congue. Aliquam praesent rutrum malesuada viverra volutpat. Nec nisl massa odio ultrices. Condimentum ut imperdiet! Eu sapien dignissim convallis amet eu quis.', image: '/images/mentors/mentor.png' },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newActiveSlide = Math.round(scrollLeft / cardWidth);
      setActiveSlide(newActiveSlide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth;
    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  return (
    <section id="mentors" className="min-h-screen text-white py-16 px-6 md:px-16">
      <h1 className="text-4xl md:text-5xl font-virgo mb-16 tracking-wide">MENTORS</h1>

      <div className="md:hidden max-w-md mx-auto">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex-shrink-0 w-full snap-center px-2">
              <div className="flex flex-col bg-[#020203] rounded-2xl overflow-hidden border-2 border-gray-800">
                <div className="relative h-[260px] w-full">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-l font-bold mb-2 tracking-wide">{mentor.name}</h2>
                  <p className="text-purple-300 font-semibold mb-4 text-sm">{mentor.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{mentor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-4">
          {mentors.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className="transition-all duration-300"
            >
              <div
                className={`h-0.5 transition-all duration-300 ${
                  activeSlide === index ? 'w-12 bg-white' : 'w-8 bg-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="relative h-[350px] lg:h-[370px] cursor-pointer rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-purple-600 transition-all duration-300"
            onMouseEnter={() => setHoveredCard(mentor.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
            <div
              className={`absolute inset-0 border-purple-800 border-2 bg-[#020203] p-6 flex flex-col justify-center transition-opacity duration-300 ${
                hoveredCard === mentor.id ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 className="text-l font-bold mb-2 tracking-wide">{mentor.name}</h2>
              <p className="text-purple-300 font-semibold mb-3 text-sm">{mentor.role}</p>
              <p className="text-gray-200 text-sm leading-relaxed">{mentor.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
