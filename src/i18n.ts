import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'hi', 'or'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    console.error(`Invalid locale: ${locale}`);
    notFound();
  }

  return {
    locale, // ✅ Include locale
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
