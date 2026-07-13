import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { loadAllLocalTracks } from "../src/content/localTrackLoader.js";

const baseUrl = String(process.env.PULSATEACH_PRODUCTION_URL || "https://pulsateach.vercel.app").replace(/\/$/, "");
const captureDir = process.env.PULSATEACH_CAPTURE_DIR ? path.resolve(process.env.PULSATEACH_CAPTURE_DIR) : null;
const coreRoutes = [
  "/",
  "/catalog",
  "/glossary",
  "/review",
  "/projects",
  "/certification",
  "/studio"
];
const learningTracks = await loadAllLocalTracks();
const lessonRoutes = learningTracks.flatMap((track) => representativeLessonRoutes(track));
const routes = [...coreRoutes, ...lessonRoutes.map(({ route }) => route)];
if (captureDir) await mkdir(captureDir, { recursive: true });

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

    const initialResponse = await page.goto(baseUrl, { waitUntil: "networkidle" });
    if (!initialResponse?.ok()) failures.push(`${viewport.width}px /: HTTP ${initialResponse?.status() || "unknown"}`);

    for (const route of routes) {
      currentRoute = route;
      if (route !== "/") {
        await page.evaluate((nextRoute) => {
          window.history.pushState(null, "", nextRoute);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }, route);
        await page.waitForFunction((nextRoute) => window.location.pathname === nextRoute, route);
      }
      await page.waitForTimeout(250);
      const pageState = await page.evaluate(() => ({
        bodyText: document.body?.innerText?.trim() || "",
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      }));
      if (pageState.overflow) failures.push(`${viewport.width}px ${route}: horizontal overflow`);
      if (pageState.bodyText.length < 40) failures.push(`${viewport.width}px ${route}: page content is unexpectedly empty`);
      if (pageState.bodyText.includes("[object Object]")) failures.push(`${viewport.width}px ${route}: unresolved localized object`);

      const lesson = lessonRoutes.find((item) => item.route === route);
      if (lesson) {
        try {
          await page.getByText(lesson.title).first().waitFor({ state: "visible", timeout: 10_000 });
        } catch {
          failures.push(`${viewport.width}px ${route}: lesson title is not visible`);
        }
        const breadcrumbListStyle = await page.locator('nav[aria-label="Fil d\'Ariane"] ol').evaluate((element) => getComputedStyle(element).listStyleType).catch(() => "missing");
        if (breadcrumbListStyle !== "none") failures.push(`${viewport.width}px ${route}: breadcrumb list markers are visible`);
        if (/\b(?:easy|medium|hard|intermediate)\s*·/i.test(pageState.bodyText)) {
          failures.push(`${viewport.width}px ${route}: difficulty label is not localized`);
        }
      }
      if (captureDir && lesson?.capture) {
        await page.screenshot({ path: path.join(captureDir, `${viewport.width}-${lesson.trackId}.png`), fullPage: false });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) throw new Error(`Production smoke failed:\n${failures.join("\n")}`);
console.log(`Production smoke passed: ${coreRoutes.length} core routes and ${lessonRoutes.length} lessons across ${learningTracks.length} tracks at 375px and 1440px.`);

async function json(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert(response.ok, `${path} returned ${response.status}`);
  return response.json();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function representativeLessonRoutes(track) {
  const lessons = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson }))).filter(({ lesson }) => lesson.type !== "quiz");
  const selected = [lessons[0], lessons.at(-1)].filter(Boolean);
  return selected.map(({ module, lesson }, index) => ({
    capture: index === 0,
    route: `/learn/${track.id}/${module.id}/${lesson.id}`,
    title: lesson.title.fr,
    trackId: track.id
  }));
}
