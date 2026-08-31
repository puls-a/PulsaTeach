import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = fileURLToPath(new URL("../supabase/migrations/", import.meta.url));
const files = (await readdir(directory)).filter((file) => file.endsWith(".sql")).sort();
const failures = [];

if (files.length < 5) failures.push(`Expected at least 5 versioned migrations, found ${files.length}.`);
if (new Set(files.map((file) => file.slice(0, 14))).size !== files.length) failures.push("Migration timestamps must be unique.");

let combined = "";
for (const file of files) {
  if (!/^\d{14}_[a-z0-9_]+\.sql$/.test(file)) failures.push(`${file}: invalid versioned migration name`);
  const sql = await readFile(join(directory, file), "utf8");
  if (!sql.trim()) failures.push(`${file}: empty migration`);
  combined += `\n${sql.toLowerCase()}`;
}

for (const requirement of [
  "create table if not exists public.course_versions",
  "create table if not exists public.quiz_sessions",
  "alter table public.course_drafts",
  "alter table public.submissions",
  "alter table public.issued_certificates",
  "review_revision",
  "submissions_user_project_version_uidx",
  "issued_certificates_user_issued_idx",
  "create_submission_atomic",
  "review_submission_atomic",
  "save_quiz_draft_atomic",
  "submit_quiz_session_atomic",
  "issue_certificate_atomic",
  "create table if not exists public.discord_links",
  "create table if not exists public.used_link_nonces",
  "consume_discord_link",
  "alter table public.discord_links enable row level security",
  "alter table public.used_link_nonces enable row level security",
  "pg_advisory_xact_lock",
  "enable row level security"
]) {
  if (!combined.includes(requirement)) failures.push(`Missing migration contract: ${requirement}`);
}
if (!/issue_certificate_atomic\s*\(\s*p_id uuid/.test(combined)) failures.push("Atomic certificate issuance must use the issued_certificates UUID id type.");
if (!combined.includes("draftquestionsetversion")) failures.push("Quiz drafts must persist their question-set version.");
if (!combined.includes("regexp_replace(v_definition, '''pt[0-9]{3}''', '''p0001'''")) failures.push("RPC business errors must not use PostgREST PTxxx HTTP status overrides.");

if (failures.length) {
  console.error(`Migration audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Migration audit passed: ${files.length} ordered SQL migrations cover the current persistence contracts.`);
