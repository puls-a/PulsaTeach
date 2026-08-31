export async function getSupabaseStatus(supabaseAdmin) {
  if (!supabaseAdmin) return { enabled: false, mode: "json", message: "Supabase env vars are not configured. PulsaTeach is using local JSON storage." };
  const tables = ["profiles", "progress", "attempts", "submissions", "enrollments", "lesson_drafts", "course_drafts", "course_versions", "issued_certificates", "learning_events", "quiz_sessions", "discord_links", "used_link_nonces"];
  const checks = await Promise.all(tables.map(async (table) => {
    const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true });
    return { table, ok: !error, count: count ?? 0, error: error?.message || null };
  }));
  return { enabled: true, mode: "supabase", ok: checks.every((check) => check.ok), checks };
}

export async function checkSupabaseReadiness(supabaseAdmin) {
  if (!supabaseAdmin) return { ok: false, latencyMs: 0, error: "Supabase is not configured." };
  const startedAt = Date.now();
  const { error } = await supabaseAdmin.from("profiles").select("id", { head: true, count: "exact" }).limit(1);
  return { ok: !error, latencyMs: Date.now() - startedAt, error: error?.message || null };
}
