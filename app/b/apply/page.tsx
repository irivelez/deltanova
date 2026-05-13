import type { Metadata } from "next";
import { ApplyFormB } from "@/components/design-b/ApplyFormB";
import { FooterB } from "@/components/design-b/FooterB";

export const metadata: Metadata = {
  title: "Apply — Deltanova design-partner cohort",
  description:
    "Apply for access to Deltanova's design-partner cohort. Four fields. The fourth is the one that matters. Reviewed within 48 hours.",
};

export default function DesignBApply() {
  return (
    <main className="flex-1">
      <ApplyFormB />
      <FooterB />
    </main>
  );
}
