'use client';
// import { Button } from '@/components/ui/Button';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
// import { MobileNavigation } from './MobileNavigation';
import { ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { NavLink } from './NavLink';

const DynamicLoginNavLink = dynamic(
  () => import('./LoginNavLink').then((module) => module.LoginNavLink),
  {
    ssr: false,
  }
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className={cn(' mx-auto w-full max-w-8xl flex justify-center ')}>
        <div
          className={cn(
            'hidden lg:flex items-center gap-8 mx-auto ',
            'relative '
          )}
        >
          <NavLink href="/" aria-label="Items">
            Home
          </NavLink>
          <Suspense fallback={<div> Loading ... </div>}>
            <DynamicLoginNavLink />
          </Suspense>
        </div>
        <div className="-my-5 mr-6 sm:mr-8 md:mr-0"></div>
        <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow"></div>
      </div>
    </header>
  );
}

import Link from 'next/link';
// import { ThemeToggle } from '@/components/tailwind/ThemeToggle';

export const ExternalNavigation = () => {
  return (
    <header className="container px-4 lg:px-6 h-16 mt-4 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        {/* <MountainIcon className="h-6 w-6" /> */}
        <span className="hidden lg:block ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <Image
            src="/images/autolectual-logo-komet.png"
            alt="autolectual Logo"
            width={250}
            height={175}
            className="inline-block"
          />
          {/* <span id="nav-logo-text" className=" text-[#1A3CB8] text-2xl mx-2">
            autolectual
          </span> */}
        </span>
        <span className="block lg:hidden ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          autolectual
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm hidden lg:block font-medium hover:underline underline-offset-4"
          href="/providers"
        >
          Providers
        </Link>
        <Link
          className="text-sm hidden lg:block font-medium hover:underline underline-offset-4"
          href="/"
        >
          Schools
        </Link>

        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/homework"
          target="_blank"
        >
          <button className="hidden inline-flex items-center gap-2 justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Preview <ExternalLinkIcon />
          </button>
        </Link>
      </nav>
    </header>
  );
};
// function MountainIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// }
