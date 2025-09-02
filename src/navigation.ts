import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import locales from './i18n';

export const { Link, redirect, usePathname, useRouter } =
    createLocalizedPathnamesNavigation({
        locales,
        pathnames: {
            // Optional: add custom localized routes here
            // about: {
            //   en: '/about',
            //   hi: '/हमारे-बारे',
            //   or: '/ବିଷୟରେ',
            // },
        }
    });
