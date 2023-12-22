import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import NavbarItem from './components/navbar/NavbarItem'
import NavbarDropdown from './components/navbar/NavbarDropdown'
import NavbarDropdownItem from './components/navbar/NavbarDropdownItem'
import AppearanceToggle from './components/navbar/AppearenceToggle'

const font = Poppins({weight: ["400","600","700"], subsets: ["latin-ext"]})

export const metadata: Metadata = {
  title: 'ChainLynx 8248',
  description: 'ChainLynx 8248 is a FIRST Robotics team based at Lincoln High School, committed to providing a fun and collaborative environment for students to learn how to design, build, and code robots.',
  icons: "/imgs/nav_logo.png",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={font.className+' min-h-screen bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}>
        <Navbar>
          <NavbarItem title="Home" href="/"></NavbarItem>
          <NavbarItem title="About" href="/about"></NavbarItem>
          <NavbarItem title="Sponsors" href="/sponsors"></NavbarItem>
          <NavbarDropdown title="Resources" href={["/robot", "/team", "/calendar"]}>
            <NavbarDropdownItem title="Our Robot" href="/robot"></NavbarDropdownItem>
            <NavbarDropdownItem title="Our Team" href="/team"></NavbarDropdownItem>
            <NavbarDropdownItem title="Calendar" href="/calendar"></NavbarDropdownItem>
          </NavbarDropdown>
          <NavbarItem title="Join" href="/join"></NavbarItem>
          <AppearanceToggle />
        </Navbar>
        {children}
      </body>
    </html>
  )
}
