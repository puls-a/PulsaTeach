export function tableForStore(storeName) {
  return {
    "attempts.json": "attempts",
    "submissions.json": "submissions",
    "enrollments.json": "enrollments",
    "lesson-drafts.json": "lesson_drafts",
    "course-drafts.json": "course_drafts",
    "course-versions.json": "course_versions",
    "issued-certificates.json": "issued_certificates",
    "learning-events.json": "learning_events",
    "quiz-sessions.json": "quiz_sessions"
  }[storeName];
}

export function fromSupabaseProfileRow(row) {
  return {
    userId: row.local_user_id,
    displayName: row.display_name,
    goal: row.goal,
    weeklyMinutes: row.weekly_minutes,
    locale: row.locale,
    bio: row.bio || "",
    avatarUrl: row.avatar_url || "",
    onboardingCompleted: Boolean(row.onboarding_completed),
    roles: row.roles || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function toSupabaseProfileRow(user) {
  return {
    local_user_id: user.userId,
    display_name: user.displayName || "PulsaTeach Learner",
    goal: user.goal || "frontend-foundations",
    weekly_minutes: user.weeklyMinutes || 120,
    locale: user.locale || "en",
    bio: user.bio || "",
    avatar_url: user.avatarUrl || "",
    onboarding_completed: Boolean(user.onboardingCompleted),
    roles: user.roles || [],
    created_at: user.createdAt || new Date().toISOString(),
    updated_at: user.updatedAt || new Date().toISOString()
  };
}

export async function readSupabasePages(readPage, pageSize = 1000) {
  const rows = [];
  while (true) {
    const { data, error } = await readPage(rows.length, rows.length + pageSize - 1);
    if (error) throw error;
    rows.push(...(data || []));
    if (!data || data.length < pageSize) return rows;
  }
}
