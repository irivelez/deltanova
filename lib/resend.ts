import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.NOTIFY_FROM_EMAIL || "Deltanova Intake <intake@deltanova.io>";

export type ResendResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "resend-disabled" | "resend-error" | "resend-exception"; error?: string };

export async function sendDossierEmail(opts: {
  to: string;
  subject: string;
  text: string;
}): Promise<ResendResult> {
  if (!resend) {
    console.warn("[resend] disabled — RESEND_API_KEY not set");
    return { ok: false, reason: "resend-disabled" };
  }

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
    });
    if (result.error) {
      console.error("[resend] send failed", result.error);
      return { ok: false, reason: "resend-error", error: result.error.message };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error("[resend] exception", err);
    return { ok: false, reason: "resend-exception", error: String(err) };
  }
}
