import { NextRequest, NextResponse } from "next/server";
import { intakeSchema } from "@/lib/intake-schema";
import { writeIntakeToNotion } from "@/lib/notion";
import { sendDossierEmail } from "@/lib/resend";
import { generateDossier } from "@/lib/dossier";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const intake = parsed.data;
  console.log("[intake] submission", JSON.stringify(intake));

  const dossier = generateDossier(intake);

  const [notionResult, emailResult] = await Promise.all([
    writeIntakeToNotion(intake, dossier),
    sendDossierEmail({
      to: process.env.NOTIFY_EMAIL || "irina@deltanova.io",
      subject: `[Deltanova intake] ${intake.companyName} — ${intake.qualificationVerdict}`,
      text: dossier,
    }),
  ]);

  return NextResponse.json({
    ok: true,
    verdict: intake.qualificationVerdict,
    notion: notionResult,
    email: emailResult,
  });
}
