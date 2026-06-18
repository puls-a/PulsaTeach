import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseEnabled = Boolean(supabaseUrl && serviceRoleKey);
export const requireSupabaseStorage = process.env.PULSATEACH_STORAGE === "supabase-strict";

export const supabaseAdmin = supabaseEnabled
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export async function getUserFromAccessToken(token) {
  if (!supabaseAdmin || !token) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error) return null;
  return data.user || null;
}

export async function getSupabaseStatus() {
  if (!supabaseAdmin) {
    return {
      enabled: false,
      mode: "json",
      message: "Supabase env vars are not configured. PulsaTeach is using local JSON storage."
    };
  }

  const tables = ["profiles", "progress", "attempts", "submissions", "enrollments", "lesson_drafts", "course_drafts", "issued_certificates", "learning_events"];
  const checks = await Promise.all(tables.map(async (table) => {
    const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true });
    return {
      table,
      ok: !error,
      count: count ?? 0,
      error: error?.message || null
    };
  }));

  return {
    enabled: true,
    mode: "supabase",
    ok: checks.every((check) => check.ok),
    checks
  };
}

export async function readSupabaseStore(storeName, fallback) {
  if (!supabaseAdmin) return fallback;

  if (storeName === "progress.json") {
    const { data, error } = await supabaseAdmin.from("progress").select("*");
    if (error) throw error;
    return Object.fromEntries((data || []).map((row) => [
      row.user_id,
      { ...(row.payload || {}), userId: row.user_id, updatedAt: row.updated_at }
    ]));
  }

  if (storeName === "users.json") {
    const { data, error } = await supabaseAdmin.from("profiles").select("*");
    if (error) throw error;
    return Object.fromEntries((data || []).filter((row) => row.local_user_id).map((row) => [
      row.local_user_id,
      {
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
      }
    ]));
  }

  const table = tableForStore(storeName);
  if (!table) return fallback;

  const orderColumn = table === "issued_certificates" ? "issued_at" : "created_at";
  const { data, error } = await supabaseAdmin.from(table).select("*").order(orderColumn, { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => fromSupabaseRow(table, row));
}

export async function writeSupabaseStore(storeName, store) {
  if (!supabaseAdmin) return false;

  if (storeName === "progress.json") {
    const rows = Object.entries(store || {}).map(([userId, payload]) => ({
      user_id: userId,
      payload,
      updated_at: payload.updatedAt || new Date().toISOString()
    }));
    if (rows.length === 0) return true;
    const { error } = await supabaseAdmin.from("progress").upsert(rows, { onConflict: "user_id" });
    if (error) throw error;
    return true;
  }

  if (storeName === "users.json") {
    const rows = Object.values(store || {}).map((user) => ({
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
    }));
    if (rows.length === 0) return true;
    const { error } = await supabaseAdmin.from("profiles").upsert(rows, { onConflict: "local_user_id" });
    if (error) throw error;
    return true;
  }

  const table = tableForStore(storeName);
  if (!table) return false;
  const rows = (store || []).map((item) => toSupabaseRow(table, item));
  if (rows.length === 0) return true;
  const { error } = await supabaseAdmin.from(table).upsert(rows, { onConflict: "id" });
  if (error) throw error;
  return true;
}

export async function deleteSupabaseRecord(storeName, id) {
  if (!supabaseAdmin) return false;
  const table = tableForStore(storeName);
  if (!table) return false;
  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) throw error;
  return true;
}

function tableForStore(storeName) {
  return {
    "attempts.json": "attempts",
    "submissions.json": "submissions",
    "enrollments.json": "enrollments",
    "lesson-drafts.json": "lesson_drafts",
    "course-drafts.json": "course_drafts",
    "issued-certificates.json": "issued_certificates",
    "learning-events.json": "learning_events"
  }[storeName];
}

function fromSupabaseRow(table, row) {
  if (table === "attempts") {
    return {
      id: row.id,
      userId: row.user_id,
      lessonId: row.lesson_id,
      trackId: row.track_id || "",
      moduleId: row.module_id || "",
      passed: row.passed,
      total: row.total,
      success: row.success,
      createdAt: row.created_at
    };
  }
  if (table === "submissions") {
    return {
      id: row.id,
      userId: row.user_id,
      projectId: row.project_id,
      title: row.title,
      description: row.description || "",
      url: row.url || "",
      status: row.status,
      feedback: row.feedback || "",
      reviewer: row.reviewer || "",
      score: row.score,
      rubric: row.rubric || {},
      createdAt: row.created_at,
      reviewedAt: row.reviewed_at
    };
  }
  if (table === "enrollments") {
    return {
      id: row.id,
      email: row.email,
      locale: row.locale,
      source: row.source,
      status: row.status,
      createdAt: row.created_at
    };
  }
  if (table === "lesson_drafts") {
    return {
      id: row.id,
      trackId: row.track_id,
      moduleId: row.module_id,
      title: row.title,
      objective: row.objective,
      prompt: row.prompt,
      type: row.type,
      difficulty: row.difficulty,
      skills: row.skills || [],
      xp: row.xp,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  if (table === "course_drafts") {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      level: row.level,
      language: row.language,
      status: row.status,
      authorUserId: row.author_user_id,
      curriculum: row.curriculum || { modules: [] },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      publishedAt: row.published_at
    };
  }
  if (table === "issued_certificates") {
    return {
      id: row.id,
      verificationCode: row.verification_code,
      userId: row.user_id,
      certificateId: row.certificate_id,
      learnerName: row.learner_name,
      title: row.title,
      evidence: row.evidence || {},
      issuedAt: row.issued_at,
      revokedAt: row.revoked_at
    };
  }
  if (table === "learning_events") {
    return {
      id: row.id,
      userId: row.user_id,
      eventType: row.event_type,
      lessonId: row.lesson_id,
      trackId: row.track_id,
      payload: row.payload || {},
      requestId: row.request_id,
      createdAt: row.created_at
    };
  }
  return row;
}

function toSupabaseRow(table, item) {
  if (table === "attempts") {
    return {
      id: item.id,
      user_id: item.userId,
      lesson_id: item.lessonId,
      track_id: item.trackId,
      module_id: item.moduleId,
      passed: item.passed,
      total: item.total,
      success: item.success,
      created_at: item.createdAt
    };
  }
  if (table === "submissions") {
    return {
      id: item.id,
      user_id: item.userId,
      project_id: item.projectId,
      title: item.title,
      description: item.description || "",
      url: item.url || "",
      status: item.status || "submitted",
      feedback: item.feedback || null,
      reviewer: item.reviewer || null,
      score: item.score,
      rubric: item.rubric || {},
      created_at: item.createdAt,
      reviewed_at: item.reviewedAt || null
    };
  }
  if (table === "enrollments") {
    return {
      id: item.id,
      email: item.email,
      locale: item.locale || "en",
      source: item.source || "landing",
      status: item.status || "active",
      created_at: item.createdAt
    };
  }
  if (table === "lesson_drafts") {
    return {
      id: item.id,
      track_id: item.trackId,
      module_id: item.moduleId,
      title: item.title,
      objective: item.objective,
      prompt: item.prompt,
      type: item.type,
      difficulty: item.difficulty,
      skills: item.skills || [],
      xp: item.xp,
      status: item.status,
      created_at: item.createdAt,
      updated_at: item.updatedAt
    };
  }
  if (table === "course_drafts") {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.description || {},
      level: item.level || "beginner",
      language: item.language || "fr",
      status: item.status || "draft",
      author_user_id: item.authorUserId,
      curriculum: item.curriculum || { modules: [] },
      created_at: item.createdAt,
      updated_at: item.updatedAt,
      published_at: item.publishedAt || null
    };
  }
  if (table === "issued_certificates") {
    return {
      id: item.id,
      verification_code: item.verificationCode,
      user_id: item.userId,
      certificate_id: item.certificateId,
      learner_name: item.learnerName,
      title: item.title,
      evidence: item.evidence || {},
      issued_at: item.issuedAt,
      revoked_at: item.revokedAt || null
    };
  }
  if (table === "learning_events") {
    return {
      id: item.id,
      user_id: item.userId || null,
      event_type: item.eventType,
      lesson_id: item.lessonId || null,
      track_id: item.trackId || null,
      payload: item.payload || {},
      request_id: item.requestId || null,
      created_at: item.createdAt
    };
  }
  return item;
}
