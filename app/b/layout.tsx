import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deltanova — Existing businesses, reborn AI-native",
  description:
    "Deltanova rebuilds existing businesses into AI-native operating models — transparently. Building with the first 10 design partners. 9 seats remaining.",
};

export default function BLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-screen scroll-smooth">{children}</div>;
}
