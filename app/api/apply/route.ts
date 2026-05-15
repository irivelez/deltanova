import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { applySchema, type Application } from "@/lib/apply-schema";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

const notionToken = process.env.NOTION_TOKEN;
const notionDbId = process.env.NOTION_DB_ID;

const notion = notionToken ? new Client({ auth: notionToken }) : null;

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
  // can retry; we don't want submissions silently dropped.
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

  // Notion is a best-effort mirror; failures are logged but don't fail the
  // request because the submission is already safe in Supabase.
  const notionResult = await writeToNotion(app);

  return NextResponse.json({
    ok: true,
    id: supabaseResult.id,
    notion: notionResult,
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
        name: app.name ?? "",
        email: app.email,
        link: app.link ?? "",
        answer: app.answer ?? "",
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
    const title = app.name?.trim() || app.email;
    const response = await notion.pages.create({
      parent: { database_id: notionDbId },
      properties: {
        Name: { title: [{ text: { content: title } }] },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: { content: app.email },
              },
            ],
          },
        },
      ],
    });
    return { ok: true as const, id: response.id };
  } catch (err) {
    console.error("[notion] page write failed", err);
    return {
      ok: false as const,
      reason: "notion-write-failed",
      error: String(err),
    };
  }
}
