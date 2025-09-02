import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'hi', 'or'] as const;

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a string (which it always is here)
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    console.error(`Invalid locale: ${locale}`);
    notFound();
  }

  return {
    locale, // ✅ locale is known to be a string
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
