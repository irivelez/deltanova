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
    default: "Deltanova · AI-native operations, delivered transparent",
    template: "%s · Deltanova",
  },
  description:
    "Deltanova rebuilds existing businesses into AI-native operating models. Your customers feel an instant upgrade. Your team stops fighting the operation. Your business stops leaking time. Running with one design partner in field services. 9 seats open.",
  openGraph: {
    title: "Deltanova · AI-native operations, delivered transparent",
    description:
      "We rebuild existing businesses into AI-native operating models, transparently. Your customers feel an instant upgrade. Your team stops fighting the operation. Your business stops leaking time.",
    url: "https://deltanova.io",
    siteName: "Deltanova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deltanova · AI-native operations, delivered transparent",
    description:
      "We rebuild existing businesses into AI-native operating models, transparently. Running with one design partner in field services. 9 seats open.",
  },
  alternates: {
    canonical: "https://deltanova.io",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  colorScheme: "light",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
