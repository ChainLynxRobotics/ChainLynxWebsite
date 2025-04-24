'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const Navbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [toggled, setToggled] = useState(false);
  const nav = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        !(
          nav.current &&
          e.target instanceof Node &&
          nav.current.contains(e.target)
        )
      )
        setToggled(false);
    };
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  useEffect(() => {
    const closeDropdown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setToggled(false);
    };
    window.addEventListener('keydown', closeDropdown);
    return () => window.removeEventListener('keydown', closeDropdown);
  }, []);

  useEffect(() => {
    setToggled(false);
  }, [pathname]);

  return (
    <nav
      ref={nav}
      className="sticky top-0 right-0 left-0 z-[9999] border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="mx-auto flex max-w-screen-lg flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <img
            src="/imgs/nav_logo.png"
            className="mr-3 h-12"
            alt="ChainLynx Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ChainLynx
          </span>
        </Link>
        <button
          onClick={() => {
            setToggled(!toggled);
          }}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-neutral-500 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-200 focus:outline-none md:hidden dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
          aria-controls="navbar-dropdown"
          aria-expanded={toggled}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`md:static ${toggled ? 'max-h-screen' : 'max-h-0'} h-full w-full overflow-x-hidden transition-all duration-200 ease-in md:max-h-screen md:w-auto`}
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-neutral-100 bg-neutral-50 p-4 font-medium md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:bg-white md:p-0 dark:border-neutral-700 dark:bg-neutral-800 md:dark:bg-neutral-900">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
