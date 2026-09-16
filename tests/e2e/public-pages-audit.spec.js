import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";

const sitemap = await readFile(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
const publicPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);

test("every public page renders without runtime, layout, or fragment errors", async ({ page }) => {
  test.setTimeout(10 * 60_000);
  const failures = [];
  let activePath = "/";

  page.on("pageerror", (error) => failures.push(`${activePath}: page error: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`${activePath}: console error: ${message.text()}`);
  });
  page.on("requestfailed", (request) => {
    const url = new URL(request.url());
    if (["127.0.0.1", "localhost"].includes(url.hostname)) failures.push(`${activePath}: request failed: ${url.pathname} (${request.failure()?.errorText || "unknown"})`);
  });

  for (const path of publicPaths) {
    activePath = path;
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    if (!response?.ok()) {
      failures.push(`${path}: HTTP ${response?.status() || "no response"}`);
      continue;
    }
    await page.locator("main").waitFor();
    await page.waitForLoadState("networkidle").catch(() => {});

    const result = await page.evaluate(() => {
      const brokenFragments = [...document.querySelectorAll('a[href^="#"]')]
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href) => href && href !== "#")
        .filter((href) => {
          try {
            return !document.getElementById(decodeURIComponent(href.slice(1)));
          } catch {
            return true;
          }
        });
      return {
        title: document.title.trim(),
        mainText: document.querySelector("main")?.textContent?.trim() || "",
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        brokenFragments: [...new Set(brokenFragments)]
      };
    });

    if (!result.title) failures.push(`${path}: missing document title`);
    if (!result.mainText) failures.push(`${path}: empty main content`);
    if (result.overflow > 1) failures.push(`${path}: horizontal overflow of ${result.overflow}px`);
    if (result.brokenFragments.length) failures.push(`${path}: broken fragments ${result.brokenFragments.join(", ")}`);
  }

  expect(failures, failures.join("\n")).toEqual([]);
});
