import Navbar from '@/components/layout/Navbar.jsx'
import Register from '@/components/layout/Register.jsx'
import LoadingScreen from './loading.js'
import HeroSection from '@/components/sections/HeroSection.jsx'
import './globals.css'

export const metadata = {
  title: 'DataHack 3.0',
  description: 'Join DataHack 3.0, the premier data science and AI hackathon by CSE Club at ESI Algiers. Experience 3 days of innovation, workshops, mentorship, and competition with industry experts.',
  icons: {
    icon: '/images/datahack_logo.png', 
  },
  openGraph: {
    title: 'DataHack 3.0',
    description: 'Join DataHack 3.0, the premier data science and AI hackathon by CSE Club at ESI Algiers. Experience 3 days of innovation, workshops, mentorship, and competition with industry experts.',
    images: ['/images/image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataHack 3.0',
    description: 'Join DataHack 3.0, the premier data science and AI hackathon by CSE Club at ESI Algiers. Experience 3 days of innovation, workshops, mentorship, and competition with industry experts.',
    images: ['/images/image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <LoadingScreen />  
        <Register />
        {children}
        <Navbar />
      </body>
    </html>
  )
}