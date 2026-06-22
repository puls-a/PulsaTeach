import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import { preview as startPreview } from "vite";

const port = 4173;
const url = `http://127.0.0.1:${port}/catalog`;
Object.assign(process.env, {
  NODE_ENV: "test",
  PULSATEACH_STORAGE: "json",
  PULSATEACH_ALLOW_LOCAL_IDENTITY: "true"
});
const { default: app } = await import("../server/index.js");
const api = await new Promise((resolve) => {
  const server = app.listen(4174, "127.0.0.1", () => resolve(server));
});
const preview = await startPreview({
  preview: { host: "127.0.0.1", port, strictPort: true }
});
let chrome;

try {
  await waitFor(url);
  chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"]
  });
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
  });
  const report = result.lhr;
  const scores = Object.fromEntries(
    Object.entries(report.categories).map(([key, category]) => [key, Math.round(category.score * 100)])
  );
  const metrics = {
    lcp: Math.round(report.audits["largest-contentful-paint"].numericValue),
    cls: Number(report.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
    tbt: Math.round(report.audits["total-blocking-time"].numericValue)
  };

  assert(scores.performance >= 70, `performance score ${scores.performance} is below 70`);
  assert(scores.accessibility >= 90, `accessibility score ${scores.accessibility} is below 90`);
  assert(scores["best-practices"] >= 85, `best-practices score ${scores["best-practices"]} is below 85`);
  assert(scores.seo >= 90, `SEO score ${scores.seo} is below 90`);
  assert(metrics.cls <= 0.1, `CLS ${metrics.cls} exceeds 0.1`);

  console.log(
    `Lighthouse audit passed: performance ${scores.performance}, accessibility ${scores.accessibility}, best practices ${scores["best-practices"]}, SEO ${scores.seo}; LCP ${metrics.lcp}ms, CLS ${metrics.cls}, TBT ${metrics.tbt}ms.`
  );
} finally {
  await Promise.race([
    Promise.allSettled([
      stopChrome(chrome),
      preview.close(),
      new Promise((resolve) => api.close(resolve))
    ]),
    new Promise((resolve) => setTimeout(resolve, 2_000))
  ]);
}
process.exit(0);

async function waitFor(target) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(target);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Timed out waiting for ${target}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function stopChrome(instance) {
  if (!instance) return;
  try {
    await instance.kill();
  } catch (error) {
    if (error?.code !== "EPERM") throw error;
  }
}
