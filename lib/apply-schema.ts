import { z } from "zod";

const FREE_EMAIL_DOMAINS = new Set<string>([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.fr",
  "yahoo.es",
  "yahoo.de",
  "yahoo.it",
  "yahoo.ca",
  "yahoo.com.br",
  "yahoo.com.mx",
  "yahoo.com.ar",
  "ymail.com",
  "outlook.com",
  "outlook.es",
  "outlook.fr",
  "outlook.de",
  "outlook.it",
  "outlook.com.br",
  "outlook.com.ar",
  "outlook.com.mx",
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.es",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.it",
  "hotmail.com.br",
  "hotmail.com.ar",
  "hotmail.com.mx",
  "live.com",
  "live.fr",
  "live.de",
  "live.com.mx",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "gmx.com",
  "gmx.de",
  "gmx.net",
  "gmx.es",
  "gmx.fr",
  "yandex.com",
  "yandex.ru",
  "mail.com",
  "mail.ru",
  "fastmail.com",
  "tutanota.com",
  "zoho.com",
  "inbox.com",
  "qq.com",
  "163.com",
  "126.com",
]);

export function isWorkEmail(email: string): boolean {
  const at = email.indexOf("@");
  if (at === -1) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

export const applySchema = z.object({
  email: z
    .string()
    .email()
    .refine(isWorkEmail, { message: "Please use a work email." }),
  name: z.string().min(1).max(120).optional(),
  link: z.string().url().optional(),
  answer: z.string().min(1).max(2000).optional(),
  locale: z.enum(["en", "es"]).default("en"),
  variant: z.enum(["a", "b"]).optional(),
});

export type Application = z.infer<typeof applySchema>;
