"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// NOTE: the href prop is not used to link to anything, but rather is used to check if the current page is the same as the link
const NavbarDropdown = ({ title, href, children }: { title: string, href?: string|string[], children: React.ReactNode}) => {
    const pathname = usePathname()
    
    const [toggled, setToggled] = useState(false);
    const button = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (!(e.target instanceof Node && button.current && button.current.contains(e.target)))
                setToggled(false);
        }
        window.addEventListener('click', closeDropdown);
        return () => window.removeEventListener('click', closeDropdown);
    }, []);

    const current = Array.isArray(href) ? href.includes(pathname) : pathname === href;
    return (
        <li>
            <button ref={button} onClick={(e)=>setToggled(!toggled)} className={`flex items-center justify-between w-full py-2 pl-3 pr-4 rounded md:border-0 ${current ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>
                {title}
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div className={`${toggled ? '' : 'hidden'} absolute z-10 font-normal bg-white rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    {children}
                </ul>
            </div>
        </li>
    );
}

export default NavbarDropdown;