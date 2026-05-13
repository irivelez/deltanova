import { HeroB } from "@/components/design-b/HeroB";
import { ManifestoB } from "@/components/design-b/ManifestoB";
import { WhatWeLookFor } from "@/components/design-b/WhatWeLookFor";
import { WhatWereNot } from "@/components/design-b/WhatWereNot";
import { HowItWorks } from "@/components/design-b/HowItWorks";
import { CtaRepeat } from "@/components/design-b/CtaRepeat";
import { FooterB } from "@/components/design-b/FooterB";

export default function DesignBHome() {
  return (
    <main className="flex-1">
      <HeroB />
      <ManifestoB />
      <WhatWeLookFor />
      <WhatWereNot />
      <HowItWorks />
      <CtaRepeat />
      <FooterB />
    </main>
  );
}
