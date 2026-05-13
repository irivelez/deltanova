import { z } from "zod";

export const intakeSchema = z.object({
  fullName: z.string().describe("Full name of the business owner"),
  email: z.string().email().describe("Best email for follow-up"),
  companyName: z.string().describe("Company or business name"),
  geography: z.string().optional().describe("Country or region the business operates in"),
  websiteOrSocial: z.string().optional().describe("Website URL or main social handle if shared"),

  businessDescription: z.string().describe("What the business does in 1-2 sentences"),
  industry: z.string().describe("Industry or vertical"),

  revenueRange: z
    .enum(["under-100k", "100k-500k", "500k-1m", "1m-5m", "5m-plus", "undisclosed"])
    .describe("Annual revenue range in USD-equivalent"),
  employeeCount: z
    .enum(["1", "2-10", "11-25", "26-50", "51-100", "100-plus"])
    .describe("Total employee count including the owner"),

  ownerOperated: z
    .boolean()
    .describe("Is the owner actively running day-to-day operations?"),
  operationallyLegible: z
    .boolean()
    .describe(
      "Can the operator explain the entire business in two 90-minute conversations?",
    ),
  regulatoryBurden: z
    .enum(["low", "medium", "high"])
    .describe("Regulatory complexity in their industry"),
  growthTrajectory: z
    .enum(["growing", "flat", "declining"])
    .describe("Current demand trajectory"),

  primaryPainPoints: z
    .string()
    .describe("The operational pain points the owner described"),
  timeRecoveryAreas: z
    .string()
    .describe(
      "Where the owner said time goes that they cannot recover (the Tuesday question)",
    ),

  qualificationVerdict: z
    .enum(["qualified", "borderline", "not-qualified"])
    .describe("Agent's qualification assessment based on the criteria below"),
  qualificationReasoning: z
    .string()
    .describe("Why the agent made this assessment, with specific evidence"),

  conversationLanguage: z
    .enum(["en", "es"])
    .describe("Language the conversation was conducted in"),
});

export type Intake = z.infer<typeof intakeSchema>;
