// Apply SQL migrations from supabase/migrations/*.sql to the Postgres
// database referenced by POSTGRES_URL_NON_POOLING.
//
// Usage:
//   node --env-file=.env.local scripts/migrate.mjs
//
// Migrations are applied in lexical order and are not tracked — each file
// must be written as `create … if not exists` / `alter … add column if not
// exists` so reruns are safe.

import postgres from "postgres";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const migrationsDir = join(__dirname, "..", "supabase", "migrations");

const url = process.env.POSTGRES_URL_NON_POOLING;
if (!url) {
  console.error(
    "POSTGRES_URL_NON_POOLING not set. Run `vercel env pull .env.local --environment=production` first.",
  );
  process.exit(1);
}

const sql = postgres(url, { ssl: "require", max: 1 });

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  console.log("No migrations to run.");
  process.exit(0);
}

for (const file of files) {
  const path = join(migrationsDir, file);
  const content = readFileSync(path, "utf-8");
  console.log(`→ ${file}`);
  await sql.unsafe(content);
  console.log(`  ✓ applied`);
}

await sql.end();
console.log("\nMigrations complete.");
