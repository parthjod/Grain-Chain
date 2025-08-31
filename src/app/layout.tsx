import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
