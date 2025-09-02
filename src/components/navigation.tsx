'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLocale } from 'next-intl';

const navigation = [
  { name: 'Farmer', href: '/farmer', description: 'Register new produce', color: 'bg-green-600 hover:bg-green-700' },
  { name: 'Distributor', href: '/distributor', description: 'Update logistics', color: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Retailer', href: '/retailer', description: 'Confirm arrival & set price', color: 'bg-purple-600 hover:bg-purple-700' },
  { name: 'Consumer', href: '/consumer', description: 'Trace product journey', color: 'bg-orange-600 hover:bg-orange-700' },
];

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(`/${newLocale}${pathname.substring(3)}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{locale.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => handleLocaleChange('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLocaleChange('hi')}>Hindi</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLocaleChange('or')}>Odia</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navigation() {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/en' || pathname === '/hi' || pathname === '/or') {
    return null;
  }


  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">GrainChain</h1>
          </Link>
          <div className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname.includes(item.href) ? "default" : "outline"}
                  className={pathname.includes(item.href) ? item.color : ""}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}