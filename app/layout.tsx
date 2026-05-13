import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deltanova.io"),
  title: {
    default: "Deltanova — Existing businesses, reborn AI-native",
    template: "%s · Deltanova",
  },
  description:
    "Deltanova rebuilds existing businesses into AI-native operating models — transparently. Your customers see an instant upgrade. Your team works effortlessly. Your business compounds. Building with the first 10 design partners.",
  openGraph: {
    title: "Deltanova — Existing businesses, reborn AI-native",
    description:
      "We rebuild existing businesses into AI-native operating models — transparently. Without the AI-adoption project. Without your team, your clients, or your stakeholders noticing the change.",
    url: "https://deltanova.io",
    siteName: "Deltanova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deltanova — Existing businesses, reborn AI-native",
    description:
      "We rebuild existing businesses into AI-native operating models — transparently. Building with the first 10 design partners.",
  },
  alternates: {
    canonical: "https://deltanova.io",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
