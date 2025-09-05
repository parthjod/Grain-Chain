import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale, getMessages } from 'next-intl/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    messages = {}; // Fallback to empty messages
  }

  console.log("Messages loaded in layout:", messages); // Debugging line

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
