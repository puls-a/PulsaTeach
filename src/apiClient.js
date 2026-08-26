import { getSupabaseAccessToken, isSupabaseBrowserConfigured } from "./supabaseClient.js";

const apiBase = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const adminAccessKey = import.meta.env.VITE_ADMIN_ACCESS_KEY;
const userIdKey = "pulsateach-user-id";
const localIdentityMode = import.meta.env.VITE_AUTH_MODE === "local";

export function getUserId() {
  const existing = localStorage.getItem(userIdKey);
  if (existing) return existing;
  const next = `guest-${crypto.randomUUID?.() || Date.now()}`;
  localStorage.setItem(userIdKey, next);
  return next;
}

export async function getApiHealth() {
  return request("/api/health");
}

export async function getAuthenticatedUser() {
  return request("/api/me");
}

export async function getSupabaseStatus() {
  return request("/api/supabase/status");
}

export async function getRoadmap() {
  return request("/api/roadmap");
}

export async function getCatalog({ fresh = false } = {}) {
  return request("/api/catalog", fresh ? { cache: "no-store" } : {});
}

export async function getTrack(trackId) {
  return request(`/api/catalog/${encodeURIComponent(trackId)}?publicVersion=2`, { cache: "no-store" });
}

export async function getGlossary() {
  return request("/api/glossary");
}

export async function getStats() {
  return request("/api/stats");
}

export async function getAnalytics() {
  return request("/api/analytics");
}

export async function exportAdminData() {
  return request("/api/admin/export");
}

export async function getStudyPlan(userId = getUserId()) {
  return request(`/api/path/${encodeURIComponent(userId)}`);
}

export async function getProfile(userId = getUserId()) {
  return request(`/api/profile/${encodeURIComponent(userId)}`);
}

export async function getUserSettings(userId = getUserId()) {
  return request(`/api/users/${encodeURIComponent(userId)}`);
}

export async function saveUserSettings(payload, userId = getUserId()) {
  return request(`/api/users/${encodeURIComponent(userId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function uploadAvatar(dataUrl) {
  return request("/api/account/avatar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl })
  });
}

export async function exportAccountData() {
  return request("/api/account/export");
}

export async function deleteAccount(confirmation) {
  return request("/api/account", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ confirmation })
  });
}

export async function loadRemoteProgress(userId = getUserId()) {
  return request(`/api/progress/${encodeURIComponent(userId)}`);
}

export async function saveRemoteProgress(progress, userId = getUserId()) {
  return request(`/api/progress/${encodeURIComponent(userId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(progress)
  });
}

export async function migrateLocalProgress(progress) {
  return request("/api/progress/migrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress })
  });
}

export async function getQuizSession(quizId) {
  return request(`/api/quizzes/${encodeURIComponent(quizId)}/session`);
}

export async function saveQuizSession(quizId, payload) {
  return request(`/api/quizzes/${encodeURIComponent(quizId)}/session`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function submitQuiz(quizId, payload) {
  return request(`/api/quizzes/${encodeURIComponent(quizId)}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listSubmissions(userId = getUserId()) {
  return request(`/api/submissions?userId=${encodeURIComponent(userId)}`);
}

export async function listProjectCatalog() {
  return request("/api/projects/catalog");
}

export async function listAllSubmissions() {
  return request("/api/submissions");
}

export async function createSubmission(payload, userId = getUserId()) {
  return request("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, userId })
  });
}

export async function reviewSubmission(id, review) {
  return request(`/api/submissions/${encodeURIComponent(id)}/review`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review)
  });
}

export async function getCertificates(userId = getUserId()) {
  return request(`/api/certificates/${encodeURIComponent(userId)}`);
}

export async function issueCertificate(certificateId) {
  return request(`/api/certificates/${encodeURIComponent(certificateId)}/issue`, { method: "POST" });
}

export async function getPublicCertificate(verificationCode) {
  return request(`/api/certificates/public/${encodeURIComponent(verificationCode)}`);
}

export async function recordLearningEvent(payload) {
  return request("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listCourses() {
  return request("/api/courses");
}

export async function createCourse(payload) {
  return request("/api/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function updateCourse(id, payload) {
  return request(`/api/courses/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listCourseVersions(id) {
  return request(`/api/courses/${encodeURIComponent(id)}/versions`);
}

export async function getCourseVersionDiff(id, version, against) {
  const query = against ? `?against=${encodeURIComponent(against)}` : "";
  return request(`/api/courses/${encodeURIComponent(id)}/versions/${encodeURIComponent(version)}/diff${query}`);
}

export async function rollbackCourse(id, version, comment) {
  return request(`/api/courses/${encodeURIComponent(id)}/rollback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version, comment })
  });
}

export async function deleteCourse(id) {
  return request(`/api/courses/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function listAdminUsers() {
  return request("/api/admin/users");
}

export async function updateUserRoles(id, roles) {
  return request(`/api/admin/users/${encodeURIComponent(id)}/roles`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roles })
  });
}

export async function listAttempts(userId = getUserId()) {
  return request(`/api/attempts?userId=${encodeURIComponent(userId)}`);
}

export async function recordAttempt(payload, userId = getUserId()) {
  return request("/api/attempts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, userId })
  });
}

export async function createEnrollment(payload) {
  return request("/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listLessonDrafts() {
  return request("/api/lesson-drafts");
}

export async function createLessonDraft(payload) {
  return request("/api/lesson-drafts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function updateLessonDraft(id, payload) {
  return request(`/api/lesson-drafts/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function deleteLessonDraft(id) {
  return request(`/api/lesson-drafts/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("X-PulsaTeach-User-Id", getUserId());
  let token = "";
  if (isSupabaseBrowserConfigured) {
    token = await getSupabaseAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  if (adminAccessKey) headers.set("X-PulsaTeach-Admin-Key", adminAccessKey);
  if (!token && !adminAccessKey && !localIdentityMode && requiresAuthentication(path, options.method)) {
    const error = new Error("Authentication required");
    error.code = "AUTH_REQUIRED";
    error.status = 401;
    throw error;
  }

  let response;
  try {
    response = await fetch(`${apiBase}${path}`, { ...options, headers });
  } catch (cause) {
    throw new Error("API PulsaTeach inaccessible. Lance le serveur avec « npm run dev:full ».", { cause });
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const apiError = payload.error;
    const error = new Error(typeof apiError === "string" ? apiError : apiError?.message || `API ${response.status}`);
    error.code = typeof apiError === "object" ? apiError.code : undefined;
    error.status = response.status;
    error.requestId = payload.requestId || response.headers.get("X-Request-Id");
    error.payload = payload;
    throw error;
  }
  return response.json();
}

function requiresAuthentication(path, method = "GET") {
  const normalizedMethod = String(method || "GET").toUpperCase();
  if (path.startsWith("/api/certificates/public/")) return false;
  if (path === "/api/courses" && normalizedMethod === "GET") return false;
  return [
    "/api/me",
    "/api/account",
    "/api/admin",
    "/api/analytics",
    "/api/attempts",
    "/api/certificates",
    "/api/events",
    "/api/lesson-drafts",
    "/api/path",
    "/api/profile",
    "/api/progress",
    "/api/quizzes",
    "/api/submissions",
    "/api/users"
  ].some((prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(`${prefix}?`))
    || (path.startsWith("/api/courses/") && (
      normalizedMethod !== "GET"
      || path.includes("/versions")
      || path.endsWith("/rollback")
    ))
    || (path === "/api/courses" && normalizedMethod !== "GET");
}
