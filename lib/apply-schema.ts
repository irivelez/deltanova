import { z } from "zod";

export const applySchema = z.object({
  name: z.string().min(1).max(120).describe("Applicant's full name"),
  email: z.string().email().describe("Applicant's email"),
  link: z
    .string()
    .url()
    .describe("Website, LinkedIn, X, or another public profile URL"),
  answer: z
    .string()
    .min(200)
    .max(2000)
    .describe("Filter-question answer"),
  locale: z.enum(["en", "es"]).default("en"),
});

export type Application = z.infer<typeof applySchema>;
