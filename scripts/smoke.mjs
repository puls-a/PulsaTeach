const frontend = process.env.FRONTEND_URL || "http://127.0.0.1:5173";
const api = process.env.API_URL || "http://127.0.0.1:4174";
const adminKey = process.env.API_ADMIN_KEY || process.env.PULSATEACH_ADMIN_KEY || "";

const routes = [
  "",
  "catalog",
  "learn/html/html-foundations/html-01-document-skeleton",
  "learn/css/css-selectors/css-01-selectors",
  "learn/css/css-advanced-responsive/css-07-container-queries",
  "learn/javascript/js-basics/js-01-variables",
  "path",
  "dashboard",
  "profile",
  "projects",
  "certification",
  "playground",
  "world",
  "flexbox-arena",
  "js-arena",
  "studio",
  "author",
  "analytics",
  "admin",
  "roadmap",
  "settings",
  "auth",
  "signup"
];

const endpoints = [
  "/api/health",
  "/api/catalog",
  "/api/roadmap",
  "/api/stats",
  "/api/analytics",
  "/api/path/smoke-user",
  "/api/profile/smoke-user",
  "/api/users/smoke-user",
  "/api/certificates/smoke-user",
  "/api/submissions?userId=smoke-user",
  "/api/lesson-drafts",
  "/api/supabase/status"
];

const failures = [];

for (const route of routes) {
  await check(`${frontend}/#/${route}`, `route ${route || "home"}`);
}

for (const endpoint of endpoints) {
  await check(`${api}${endpoint}`, endpoint, isProtectedEndpoint(endpoint));
}

if (failures.length) {
  console.error(`Smoke test failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Smoke test passed: ${routes.length} routes and ${endpoints.length} API endpoints.`);

async function check(url, label, protectedEndpoint = false) {
  try {
    const headers = new Headers();
    if (protectedEndpoint && adminKey) headers.set("X-PulsaTeach-Admin-Key", adminKey);
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });
    if (!response.ok) failures.push(`${label}: HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

function isProtectedEndpoint(endpoint) {
  return [
    "/api/analytics",
    "/api/admin/export",
    "/api/lesson-drafts"
  ].some((prefix) => endpoint.startsWith(prefix));
}
