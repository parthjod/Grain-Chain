'use client';

import { Link, pathnames } from '@/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from './LocaleSwitcher';
import '@/app/styles/navbar.css';
import { useEffect, useState } from 'react';

type AppPathnames = keyof typeof pathnames;

const navigation: { name: string; href: AppPathnames; role: string }[] = [
  { name: 'Farmer', href: '/farmer', role: 'farmer' },
  { name: 'Distributor', href: '/distributor', role: 'distributor' },
  { name: 'Retailer', href: '/retailer', role: 'retailer' },
  { name: 'Consumer', href: '/consumer', role: 'consumer' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo-link">
          <span className="navbar-logo">GrainChain</span>
        </Link>

        {/* Role Navigation */}
        <nav className="navbar-nav">
          {isClient ? navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  className={`navbar-btn navbar-btn-${item.role} ${
                    isActive ? 'navbar-btn-active' : ''
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            );
          }) : null}
        </nav>

        {/* Locale Switcher */}
        <div className="navbar-locale">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}