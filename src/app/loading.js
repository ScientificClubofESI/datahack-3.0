'use client'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <style jsx>{`
        .glow-text {
          color: white;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(255, 255, 255, 0.6),
            0 0 30px rgba(255, 255, 255, 0.4),
            0 0 40px rgba(255, 255, 255, 0.2);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(255, 255, 255, 0.4),
              0 0 40px rgba(255, 255, 255, 0.2);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
            text-shadow: 
              0 0 20px rgba(255, 255, 255, 1),
              0 0 30px rgba(255, 255, 255, 0.8),
              0 0 40px rgba(255, 255, 255, 0.6),
              0 0 50px rgba(255, 255, 255, 0.4),
              0 0 60px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
      
      <div className="text-center">
        <h1 className="glow-text font-virgo text-3xl md:text-4xl lg:text-6xl font-bold tracking-wider">
          IN DATA
        </h1>
        <h1 className="glow-text font-virgo text-3xl md:text-4xl lg:text-6xl font-bold tracking-wider mt-2">
          WE TRUST
        </h1>
      </div>
    </div>
  )
}
