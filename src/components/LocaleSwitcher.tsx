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
import { Globe, Check } from 'lucide-react';
import '../app/styles/localeSwitcher.css';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
  ];

  const selectedLanguage = languages.find((lang) => lang.code === locale)?.name || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="locale-btn">
          <Globe className="locale-globe-icon" />
          <span>{selectedLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="locale-dropdown-content">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="locale-dropdown-item"
            onClick={() => switchLocale(lang.code)}
            disabled={locale === lang.code}
          >
            {lang.name}
            {locale === lang.code && <Check className="locale-check-icon" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}