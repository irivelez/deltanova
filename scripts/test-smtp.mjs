// Standalone SMTP connectivity probe. Tries to auth against Zoho without
// sending email — gives precise error messages so we can distinguish:
//   - wrong host / port / SSL
//   - wrong user / password
//   - SMTP access disabled on the account
//
// Usage: node scripts/test-smtp.mjs <user> <pass> [host] [port]

import nodemailer from "nodemailer";

const [, , user, pass, host = "smtp.zoho.com", port = "587"] = process.argv;
if (!user || !pass) {
  console.error(
    "Usage: node scripts/test-smtp.mjs <user> <pass> [host] [port]",
  );
  process.exit(1);
}

const portNum = Number(port);
const t = nodemailer.createTransport({
  host,
  port: portNum,
  secure: portNum === 465,
  auth: { user, pass },
});

console.log(`Probing ${host}:${portNum} as ${user} ...`);
try {
  await t.verify();
  console.log("✓ SMTP auth + connection succeeded");
  process.exit(0);
} catch (err) {
  console.error("✗ SMTP probe failed:");
  console.error(`  code:    ${err.code || "?"}`);
  console.error(`  command: ${err.command || "?"}`);
  console.error(`  response: ${err.response || "?"}`);
  console.error(`  full:    ${err.message}`);
  process.exit(2);
}
