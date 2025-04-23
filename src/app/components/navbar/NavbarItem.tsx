'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarItem = ({ title, href }: { title: string; href: string }) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={`block rounded py-2 pr-4 pl-3 md:border-0 ${pathname === href ? 'bg-blue-700 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:bg-blue-600 md:dark:bg-transparent md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'}`}
        aria-current={pathname === href ? 'page' : undefined}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavbarItem;
