'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import '../app/styles/localeSwitcher.css'; // ✅ Import CSS

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="icon" className="locale-btn">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="locale-dropdown-item" onClick={() => switchLocale('en')} disabled={locale === 'en'}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem className="locale-dropdown-item" onClick={() => switchLocale('hi')} disabled={locale === 'hi'}>
          हिंदी (Hindi)
        </DropdownMenuItem>
        <DropdownMenuItem className="locale-dropdown-item" onClick={() => switchLocale('or')} disabled={locale === 'or'}>
          ଓଡ଼ିଆ (Odia)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
