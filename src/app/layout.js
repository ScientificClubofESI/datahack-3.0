import Navbar from '@/components/layout/Navbar.jsx'
import Register from '@/components/layout/Register.jsx'
import LoadingScreen from './loading.js'
import HeroSection from '@/components/sections/HeroSection.jsx'
import './globals.css'

export const metadata = {
  title: 'Datahack 3.0',
  description: 'This is the official website of DataHack 3.0',
  icons: {
    icon: '/images/datahack_logo.png', 
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