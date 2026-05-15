import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import nodemailer from "nodemailer";
import { applySchema, type Application } from "@/lib/apply-schema";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

const notionToken = process.env.NOTION_TOKEN;
const notionDbId = process.env.NOTION_DB_ID;

const smtpHost = process.env.ZOHO_SMTP_HOST;
const smtpPort = Number(process.env.ZOHO_SMTP_PORT || "587");
const smtpUser = process.env.ZOHO_SMTP_USER;
const smtpPass = process.env.ZOHO_SMTP_PASS;
const fromEmail =
  process.env.ZOHO_FROM_EMAIL || "Deltanova Team <hello@deltanova.io>";
const replyTo = process.env.ZOHO_REPLY_TO || "hello@deltanova.io";
const founderEmail = process.env.NOTIFY_EMAIL || "irina@deltanova.io";
const enableApplicantAutoReply =
  process.env.ENABLE_APPLICANT_AUTOREPLY === "true";

const notion = notionToken ? new Client({ auth: notionToken }) : null;
const transporter =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      })
    : null;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-json" },
      { status: 400 },
    );
  }

  const cookieVariant = req.cookies.get("deltanova_variant")?.value;
  const variantFromCookie =
    cookieVariant === "a" || cookieVariant === "b" ? cookieVariant : undefined;

  const parsed = applySchema.safeParse({
    ...(typeof body === "object" && body !== null ? body : {}),
    variant: (body as { variant?: string })?.variant ?? variantFromCookie,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const app = parsed.data;
  console.log("[apply] submission", JSON.stringify(app));

  // Supabase is the canonical store. If it fails, return 500 so the client
  // can retry — we don't want submissions silently dropped.
  const supabaseResult = await writeToSupabase(app);
  if (!supabaseResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "persistence-failed",
        detail: supabaseResult,
      },
      { status: 500 },
    );
  }

  // Notion + SMTP are best-effort mirrors / notifications. Failures here are
  // logged but do not fail the request — the application is already safe.
  const [notionResult, founderNotify, applicantReply] = await Promise.all([
    writeToNotion(app),
    sendFounderNotification(app),
    enableApplicantAutoReply
      ? sendApplicantAutoReply(app)
      : Promise.resolve({ ok: false, reason: "autoreply-disabled" as const }),
  ]);

  return NextResponse.json({
    ok: true,
    id: supabaseResult.id,
    notion: notionResult,
    founderNotify,
    applicantReply,
  });
}

async function writeToSupabase(app: Application) {
  if (!supabase) {
    return { ok: false as const, reason: "supabase-disabled" };
  }
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        name: app.name,
        email: app.email,
        link: app.link,
        answer: app.answer,
        locale: app.locale,
        variant: app.variant,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[supabase] insert failed", error);
      return {
        ok: false as const,
        reason: "supabase-insert-failed",
        error: error.message,
      };
    }
    return { ok: true as const, id: data.id as string };
  } catch (err) {
    console.error("[supabase] exception", err);
    return {
      ok: false as const,
      reason: "supabase-exception",
      error: String(err),
    };
  }
}

async function writeToNotion(app: Application) {
  if (!notion || !notionDbId) {
    return { ok: false as const, reason: "notion-disabled" };
  }
  try {
    const response = await notion.pages.create({
      parent: { database_id: notionDbId },
      properties: {
        Name: { title: [{ text: { content: app.name } }] },
      },
      children: [
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ type: "text", text: { content: "Contact" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `${app.name} — ${app.email}\n${app.link}\nLocale: ${app.locale}`,
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [{ type: "text", text: { content: "Filter answer" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              { type: "text", text: { content: app.answer.slice(0, 1900) } },
            ],
          },
        },
      ],
    });
    return { ok: true as const, id: response.id };
  } catch (err) {
    console.error("[notion] application write failed", err);
    return {
      ok: false as const,
      reason: "notion-write-failed",
      error: String(err),
    };
  }
}

async function sendFounderNotification(app: Application) {
  if (!transporter) {
    return { ok: false as const, reason: "smtp-disabled" };
  }
  try {
    const subject = `[Deltanova] New application: ${app.name}`;
    const text = `${app.name} <${app.email}> just applied.

Their link: ${app.link}

Filter answer:
${app.answer}

Locale: ${app.locale}
`;
    const result = await transporter.sendMail({
      from: fromEmail,
      to: founderEmail,
      replyTo,
      subject,
      text,
    });
    return { ok: true as const, id: result.messageId };
  } catch (err) {
    console.error("[smtp] founder notification failed", err);
    return {
      ok: false as const,
      reason: "smtp-exception",
      error: String(err),
    };
  }
}

async function sendApplicantAutoReply(app: Application) {
  if (!transporter) {
    return { ok: false as const, reason: "smtp-disabled" };
  }
  try {
    const subject =
      app.locale === "es"
        ? "Tu aplicación a Deltanova"
        : "Your application landed — Deltanova";

    const text =
      app.locale === "es"
        ? `Hola ${app.name},

Recibimos tu aplicación al cohort de design partners de Deltanova.

Revisamos cada aplicación dentro de 48 horas. Vas a saber de nosotros — de cualquier forma.

Si encajas con el cohort actual (9 lugares disponibles), te enviaremos un enlace para una llamada de descubrimiento de 90 minutos. Si todavía no encajas, te lo diremos claramente.

Mientras tanto, esta es la tesis detrás de lo que construimos:
https://deltanova.io/#manifesto

— Deltanova
`
        : `Hi ${app.name},

We received your application to Deltanova's design-partner cohort.

We review every submission within 48 hours. You'll hear from us — either way.

If you're a fit for the current cohort (9 seats remaining), we'll send a 90-minute discovery-call link. If not yet a fit, we'll tell you why — clearly.

In the meantime, here's the thesis behind what we build:
https://deltanova.io/#manifesto

— Deltanova
`;

    const result = await transporter.sendMail({
      from: fromEmail,
      to: app.email,
      replyTo,
      subject,
      text,
    });
    return { ok: true as const, id: result.messageId };
  } catch (err) {
    console.error("[smtp] applicant auto-reply failed", err);
    return {
      ok: false as const,
      reason: "smtp-exception",
      error: String(err),
    };
  }
}
