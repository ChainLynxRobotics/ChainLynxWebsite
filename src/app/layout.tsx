import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import NavbarItem from './components/navbar/NavbarItem';
import NavbarDropdown from './components/navbar/NavbarDropdown';
import NavbarDropdownItem from './components/navbar/NavbarDropdownItem';
import AppearanceToggle from './components/navbar/AppearenceToggle';
import { getConfig } from './util/configReader';

const font = Poppins({ weight: ['400', '600', '700'], subsets: ['latin-ext'] });

const globalConfig = getConfig('global.yml');

export const metadata: Metadata = {
  title: globalConfig.website_title,
  description: globalConfig.website_description,
  icons: globalConfig.website_icon,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutConfig = getConfig('about.yml');
  return (
    <html lang="en" className="dark">
      <body
        className={
          font.className +
          ' min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
        }
      >
        <Navbar>
          <NavbarItem title="Home" href="/"></NavbarItem>
          <NavbarDropdown title="About" pages="/about">
            {aboutConfig.sections.map(section => (
              <NavbarDropdownItem
                title={section.title}
                href={'/about#' + section.id}
                key={section.id}
              ></NavbarDropdownItem>
            ))}
          </NavbarDropdown>
          <NavbarItem title="Sponsors" href="/sponsors"></NavbarItem>
          <NavbarDropdown
            title="Resources"
            pages={['/robot', '/team', '/calendar']}
          >
            <NavbarDropdownItem
              title="Our Robot"
              href="/robot"
            ></NavbarDropdownItem>
            <NavbarDropdownItem
              title="Our Team"
              href="/team"
            ></NavbarDropdownItem>
            <NavbarDropdownItem
              title="Calendar"
              href="/calendar"
            ></NavbarDropdownItem>
          </NavbarDropdown>
          <NavbarItem title="Join" href="/join"></NavbarItem>
          <AppearanceToggle />
        </Navbar>
        {children}
      </body>
    </html>
  );
}
