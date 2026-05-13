import {
  convertToModelMessages,
  streamText,
  stepCountIs,
  type UIMessage,
} from "ai";
import { intakeSchema } from "@/lib/intake-schema";
import { INTAKE_SYSTEM_PROMPT } from "@/lib/system-prompt";

export const maxDuration = 120;
export const runtime = "nodejs";

const CAL_URL =
  process.env.CAL_EVENT_URL || "https://cal.com/deltanova/discovery";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

function resolveBaseUrl(): string {
  if (BASE_URL.startsWith("http")) return BASE_URL;
  return `https://${BASE_URL}`;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    system: INTAKE_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: {
      submit_intake: {
        description:
          "Submit the completed intake when you have a confident qualification verdict. Pass all required fields per the schema.",
        inputSchema: intakeSchema,
        execute: async (intake) => {
          try {
            const res = await fetch(`${resolveBaseUrl()}/api/intake/submit`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(intake),
            });
            const data = await res.json();
            const verdict = intake.qualificationVerdict;
            return {
              success: data.ok === true,
              verdict,
              bookingUrl: verdict === "not-qualified" ? null : CAL_URL,
              message:
                verdict === "qualified"
                  ? "You qualify. Book the 90-minute discovery with Irina below."
                  : verdict === "borderline"
                    ? "You're borderline — there's one open question Irina wants to resolve in person. Book the call below."
                    : "We're not the right match for the current cohort. We'll keep you on file for when our process matures.",
            };
          } catch (err) {
            console.error("[intake/chat] submit tool failed", err);
            return { success: false, error: String(err) };
          }
        },
      },
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
