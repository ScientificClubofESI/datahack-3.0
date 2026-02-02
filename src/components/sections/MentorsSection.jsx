'use client';
import { useState, useRef, useEffect } from 'react';

export default function MentorsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [desktopActiveSlide, setDesktopActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const desktopScrollRef = useRef(null);

  const mentors = [
    {
      id: 1,
      name: "Badreddine Sayah",
      role: "3rd year computer science student at ESI Algiers. Ai Manager at CSE ",
      description: "Passionate AI enthusiast dedicated to advancing machine learning solutions. Leads innovative projects combining computer science theory with practical applications in artificial intelligence and data science.",
      image: "/images/mentors/IMG_7722 - SAYAH BADREDDINE.JPG",
    },
    {
      id: 2,
      name: "Hammani Abdeslem",
      role: "Fourth-year Intelligent Systems and Data student at ESI Algiers. Backend Developer at Ourquilane.Junior Data ScientistEx Vp at CSE",
      description: "Experienced backend developer with expertise in building scalable systems. Combines data science skills with robust software engineering to create intelligent, data-driven solutions.",
      image: "/images/mentors/IMG_0718 - HAMMANI ABDESLEM.jpeg",
    },
    {
      id: 3,
      name: "Achraf Abdelkebir",
      role: "Fifth year student at ESI. Data Science & BI Instructor. Former Vice President  at CSE",
      description: "Skilled data science instructor passionate about teaching business intelligence and analytics. Brings leadership experience and technical expertise to help students master data-driven decision making.",
      image: "/images/mentors/IMG_3057 - achraf aek.JPG",
    },
    {
      id: 4,
      name: "Djouider Mokhtar Anes",
      role: "Third year student at higher national school of computer science. Data Science and ML enthusiast. IA Co-Manager at CSE",
      description: "Machine learning enthusiast focused on developing innovative AI solutions. Actively contributes to research projects exploring neural networks, deep learning, and intelligent systems.",
      image: "/images/mentors/20260126_210721 - DJOUIDER MOKHTARANES.jpg",
    },
    {
      id: 5,
      name: "Lemtai Bahaeddine",
      role: "M1 Bioinformatics student and AI engineer at Edugato",
      description: "Bridges biology and technology through innovative bioinformatics solutions. Specializes in applying AI techniques to solve complex problems in computational biology and medical research.",
      image: "/images/mentors/my-image - Bahae.jpg",
    },
    {
      id: 6,
      name: "Boussebata issam",
      role: " Fifth-year student at ESI. Works at Ourquilane. Former President of the CSE Club",
      description: "Proven leader with extensive experience in software development and team management. Combines technical skills with strong organizational abilities to drive successful project outcomes.",
      image: "/images/mentors/1755689208073.jpeg",
    },
    {
      id: 7,
      name: "ikram Chouider",
      role: " 4th year Computer Systems student at ESfI / Dev Manager at CSE",
      description: "Development manager specializing in computer systems architecture and software engineering. Leads technical teams in building reliable, high-performance systems and mentoring aspiring developers.",
      image: "/images/mentors/2025 - CHOUIDER IKRAM (1).jpg",
    },
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

  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth / 4; // 4 cards visible
      const totalWidth = cardWidth * mentors.length;
      
      // Loop back when reaching the end
      if (scrollLeft >= totalWidth * 2) {
        container.scrollLeft = totalWidth;
      } else if (scrollLeft <= 0) {
        container.scrollLeft = totalWidth;
      }
      
      const currentIndex = Math.round((scrollLeft % totalWidth) / cardWidth) % mentors.length;
      setDesktopActiveSlide(currentIndex);
    };

    container.addEventListener('scroll', handleScroll);
    
    // Start at the middle copy
    const cardWidth = container.offsetWidth / 4;
    container.scrollLeft = cardWidth * mentors.length;
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [mentors.length]);

  const scrollToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth;
    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  const scrollToDesktopSlide = (index) => {
    const container = desktopScrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth / 4;
    const currentScroll = container.scrollLeft;
    const totalWidth = cardWidth * mentors.length;
    const currentSet = Math.floor(currentScroll / totalWidth);
    const targetScroll = (currentSet * totalWidth) + (cardWidth * index);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const nextSlide = () => {
    const container = desktopScrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth / 4;
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const prevSlide = () => {
    const container = desktopScrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth / 4;
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
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
            <div key={mentor.id} className="shrink-0 w-full snap-center px-2">
              <div className="flex flex-col bg-[#020203] rounded-2xl overflow-hidden border-2 border-gray-800">
                <div className="relative h-65 w-full">
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

        <div className="flex justify-center items-center gap-3 mt-6">
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

      <div className="hidden md:block max-w-7xl mx-auto relative px-16">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-purple-600/20 hover:bg-purple-600/40 backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 border border-purple-600/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-purple-600/20 hover:bg-purple-600/40 backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 border border-purple-600/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div
          ref={desktopScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Triple the mentors array for infinite scrolling */}
          {[...mentors, ...mentors, ...mentors].map((mentor, index) => (
            <div
              key={`${mentor.id}-${index}`}
              className="flex-shrink-0 w-[calc(25%-24px)] snap-start relative h-[350px] lg:h-[370px] cursor-pointer rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-purple-600 transition-all duration-300"
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
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
