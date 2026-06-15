import { supabase } from "./supabaseClient.js";

const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:4174";
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

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers
  });
  if (!response.ok) {
    throw new Error(`API ${response.status}`);
  }
  return response.json();
}
