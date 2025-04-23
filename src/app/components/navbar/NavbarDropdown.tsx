'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NavbarDropdown = ({
  title,
  href,
  pages,
  children,
}: {
  title: string;
  href?: string;
  pages?: string | string[];
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const [toggled, setToggled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        !(
          e.target instanceof Node &&
          button.current &&
          button.current.contains(e.target)
        )
      )
        setToggled(false);
    };
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const current = Array.isArray(pages)
    ? pages.includes(pathname)
    : pathname === pages || href === pathname;
  return (
    <li>
      <button
        ref={button}
        onClick={() => setToggled(!toggled)}
        className={`flex w-full items-center justify-between rounded py-2 pr-4 pl-3 md:border-0 ${current ? 'bg-blue-700 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:bg-blue-600 md:dark:bg-transparent md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'}`}
      >
        {href ? (
          <Link href={href} onClick={e => e.stopPropagation()}>
            {title}
          </Link>
        ) : (
          title
        )}
        <svg
          className="ml-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`${toggled ? '' : 'hidden'} absolute z-10 w-44 rounded-lg bg-white font-normal shadow dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
          {children}
        </ul>
      </div>
    </li>
  );
};

export default NavbarDropdown;
