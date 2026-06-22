import { chromium } from "@playwright/test";

const baseUrl = String(process.env.PULSATEACH_PRODUCTION_URL || "https://pulsateach.vercel.app").replace(/\/$/, "");
const routes = [
  "/",
  "/catalog",
  "/glossary",
  "/review",
  "/projects",
  "/certification",
  "/studio",
  "/learn/html/html-foundations/html-01-document-skeleton"
];

const home = await fetch(baseUrl);
assert(home.ok, `Homepage returned ${home.status}`);
assert(home.headers.get("content-security-policy"), "Homepage is missing CSP");
assert(home.headers.get("x-content-type-options") === "nosniff", "Homepage is missing nosniff");

const health = await json("/api/health");
assert(health.storage === "supabase-strict", `Expected supabase-strict, received ${health.storage}`);

const catalog = await json("/api/catalog");
assert(catalog.tracks?.length >= 13, `Expected at least 13 tracks, received ${catalog.tracks?.length || 0}`);

const hostileCors = await fetch(`${baseUrl}/api/catalog`, { headers: { Origin: "https://evil.example" } });
assert(hostileCors.status === 403, `Hostile CORS origin returned ${hostileCors.status}`);

const anonymousWrite = await fetch(`${baseUrl}/api/courses`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({})
});
assert([401, 403].includes(anonymousWrite.status), `Anonymous Course Studio write returned ${anonymousWrite.status}`);

const browser = await chromium.launch();
const failures = [];
try {
  for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
    const page = await browser.newPage({ viewport });
    let currentRoute = "/";
    page.on("console", (message) => {
      if (message.type() === "error") failures.push(`${viewport.width}px ${currentRoute} console: ${message.text()}`);
    });
    page.on("pageerror", (error) => failures.push(`${viewport.width}px ${currentRoute} page: ${error.message}`));

    for (const route of routes) {
      currentRoute = route;
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      if (!response?.ok()) failures.push(`${viewport.width}px ${route}: HTTP ${response?.status() || "unknown"}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      if (overflow) failures.push(`${viewport.width}px ${route}: horizontal overflow`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) throw new Error(`Production smoke failed:\n${failures.join("\n")}`);
console.log(`Production smoke passed: ${routes.length} routes at 375px and 1440px, strict storage, security headers, CORS, and anonymous write protection.`);

async function json(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert(response.ok, `${path} returned ${response.status}`);
  return response.json();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
