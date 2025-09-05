'use client';

import { Link, pathnames } from '@/navigation'; // Use Link from next-intl
import { usePathname } from 'next/navigation'; // This is fine for getting the path
import { Button } from '@/components/ui/button';
import LocaleSwitcher from './LocaleSwitcher'; // Import the new switcher

type AppPathnames = keyof typeof pathnames;

const navigation: { name: string; href: AppPathnames; color: string }[] = [
  { name: 'Farmer', href: '/farmer', color: 'bg-green-600 hover:bg-green-700' },
  { name: 'Distributor', href: '/distributor', color: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Retailer', href: '/retailer', color: 'bg-purple-600 hover:bg-purple-700' },
  { name: 'Consumer', href: '/consumer', color: 'bg-orange-600 hover:bg-orange-700' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">GrainChain</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={pathname.includes(item.href) ? "text-foreground" : "text-foreground/60"}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add a search bar here if needed */}
          </div>
          <nav className="flex items-center">
            <LocaleSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}