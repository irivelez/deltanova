import type { Intake } from "./intake-schema";

export function generateDossier(intake: Intake): string {
  const verdictBadge = {
    qualified: "✓ QUALIFIED",
    borderline: "~ BORDERLINE",
    "not-qualified": "✗ NOT QUALIFIED",
  }[intake.qualificationVerdict];

  const preCallMoves =
    intake.qualificationVerdict === "qualified"
      ? "• Book the 90-min discovery.\n• Open the call by re-stating their Tuesday answer back to them.\n• Probe: which single operational system, if rebuilt, would compound fastest?"
      : intake.qualificationVerdict === "borderline"
      ? `• Book the 90-min sync.\n• Open question to resolve: ${intake.qualificationReasoning}`
      : "• Do NOT book.\n• Add to nurture list for when our process matures.";

  return `[Deltanova Intake Dossier]

${verdictBadge}

Why:
${intake.qualificationReasoning}

— Contact ——————————————————————
Name:           ${intake.fullName}
Email:          ${intake.email}
Company:        ${intake.companyName}
${intake.geography ? `Country:        ${intake.geography}\n` : ""}${intake.websiteOrSocial ? `Web / social:   ${intake.websiteOrSocial}\n` : ""}
— Business snapshot ————————————————
What they do:   ${intake.businessDescription}
Industry:       ${intake.industry}
Revenue range:  ${intake.revenueRange}
Employees:      ${intake.employeeCount}
Owner-operated: ${intake.ownerOperated ? "yes" : "no"}
Legible (2×90): ${intake.operationallyLegible ? "yes" : "no"}
Regulatory:     ${intake.regulatoryBurden}
Growth:         ${intake.growthTrajectory}

— Operational pain ————————————————
${intake.primaryPainPoints}

— Time-recovery areas (Tuesday Q) ——
${intake.timeRecoveryAreas}

— Pre-call moves ————————————————
${preCallMoves}

— Raw intake (JSON) ————————————————
${JSON.stringify(intake, null, 2)}
`;
}
