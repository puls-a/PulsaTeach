import { supabase } from "./supabaseClient.js";

const apiBase = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://127.0.0.1:4174");
const adminAccessKey = import.meta.env.VITE_ADMIN_ACCESS_KEY;
const userIdKey = "pulsateach-user-id";

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

export async function getCatalog() {
  return request("/api/catalog");
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

export async function listSubmissions(userId = getUserId()) {
  return request(`/api/submissions?userId=${encodeURIComponent(userId)}`);
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
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  if (adminAccessKey) headers.set("X-PulsaTeach-Admin-Key", adminAccessKey);

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(payload.error || `API ${response.status}`);
    error.status = response.status;
    error.requestId = payload.requestId || response.headers.get("X-Request-Id");
    error.payload = payload;
    throw error;
  }
  return response.json();
}
