import type { Metadata } from "next";
import { IntakeChat } from "@/components/IntakeChat";

export const metadata: Metadata = {
  title: "Apply — Design-partner cohort",
  description:
    "Entry point for Deltanova's design-partner cohort. 15-minute structured intake. Most aren't a fit. The ones who are, get our complete focus and resources.",
};

export default function ApplyPage() {
  return <IntakeChat />;
}
