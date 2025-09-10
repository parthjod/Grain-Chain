import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@/app/styles/landing.css';
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale, getMessages } from 'next-intl/server';
import { locales } from "@/i18n";
import "../globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "GrainChain - Blockchain Supply Chain for Agriculture",
  description: "Complete transparency from farm to table with blockchain technology. Trace your food journey with GrainChain.",
  keywords: ["GrainChain", "Blockchain", "Supply Chain", "Agriculture", "Food Traceability", "Ethereum", "Smart Contracts"],
  authors: [{ name: "GrainChain Team" }],
  openGraph: {
    title: "GrainChain - Blockchain Supply Chain",
    description: "Complete transparency from farm to table with blockchain technology",
    url: "https://grainchain.example.com",
    siteName: "GrainChain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrainChain - Blockchain Supply Chain",
    description: "Complete transparency from farm to table with blockchain technology",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ✅ Fix: make params async and await its value before use
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // mark as Promise
}) {
  const { locale } = await params; // ✅ Await params

  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    messages = {}; // Fallback to empty messages
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
