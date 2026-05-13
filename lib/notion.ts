import { Client } from "@notionhq/client";
import type { Intake } from "./intake-schema";

const token = process.env.NOTION_TOKEN;
const dbId = process.env.NOTION_DB_ID;

const notion = token ? new Client({ auth: token }) : null;

export type NotionResult =
  | { ok: true; id: string }
  | { ok: false; reason: "notion-disabled" | "notion-write-failed"; error?: string };

export async function writeIntakeToNotion(
  intake: Intake,
  dossier: string,
): Promise<NotionResult> {
  if (!notion || !dbId) {
    console.warn("[notion] disabled — set NOTION_TOKEN and NOTION_DB_ID to enable");
    return { ok: false, reason: "notion-disabled" };
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: { title: [{ text: { content: intake.companyName } }] },
      },
      children: [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [
              {
                type: "text",
                text: { content: `Verdict: ${intake.qualificationVerdict}` },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              { type: "text", text: { content: intake.qualificationReasoning } },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "plain text",
            rich_text: [
              { type: "text", text: { content: dossier.slice(0, 1900) } },
            ],
          },
        },
        {
          object: "block",
          type: "code",
          code: {
            language: "json",
            rich_text: [
              { type: "text", text: { content: JSON.stringify(intake, null, 2).slice(0, 1900) } },
            ],
          },
        },
      ],
    });
    return { ok: true, id: response.id };
  } catch (err) {
    console.error("[notion] write failed", err);
    return { ok: false, reason: "notion-write-failed", error: String(err) };
  }
}
