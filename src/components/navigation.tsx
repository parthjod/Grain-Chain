'use client';

import { Link, pathnames } from '@/navigation';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import '@/app/styles/navbar.css';
import { Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';

type AppPathnames = keyof typeof pathnames;

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const navigation: { name: string; href: AppPathnames }[] = [
    { name: t('home'), href: '/' },
    { name: t('farmer'), href: '/farmer' },
    { name: t('distributor'), href: '/distributor' },
    { name: t('retailer'), href: '/retailer' },
    { name: t('consumer'), href: '/consumer' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo-link">
          <Leaf className="navbar-logo-icon" />
          <span className="navbar-logo-text">GrainChain</span>
        </Link>

        <nav className="navbar-nav">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`navbar-link ${isActive ? 'navbar-link-active' : ''}`}>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-locale">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}