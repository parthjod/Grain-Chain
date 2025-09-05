import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'hi', 'or'] as const;

export const pathnames = {
    '/': '/',
    '/farmer': '/farmer',
    '/distributor': '/distributor',
    '/retailer': '/retailer',
    '/consumer': '/consumer',
    '/farmer/success': '/farmer/success',
    '/distributor/success': '/distributor/success',
    '/retailer/success': '/retailer/success'
};

export const { Link, redirect, usePathname, useRouter } =
    createLocalizedPathnamesNavigation({
        locales,
        pathnames
    });
