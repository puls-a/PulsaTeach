import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium, devices } from "@playwright/test";
import { preview as startPreview } from "vite";

const output = path.resolve("docs/media");
await mkdir(output, { recursive: true });
Object.assign(process.env, {
  NODE_ENV: "test",
  PULSATEACH_STORAGE: "json",
  PULSATEACH_ALLOW_LOCAL_IDENTITY: "true"
});
const { default: app } = await import("../server/index.js");
const api = await new Promise((resolve) => {
  const server = app.listen(4174, "127.0.0.1", () => resolve(server));
});
const frontend = await startPreview({
  preview: { host: "127.0.0.1", port: 4173, strictPort: true }
});
const browser = await chromium.launch();

try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    recordVideo: { dir: path.join(tmpdir(), "pulsateach-video"), size: { width: 1280, height: 720 } }
  });
  const page = await desktop.newPage();
  await page.goto("http://127.0.0.1:4173/catalog", { waitUntil: "networkidle" });
  await acceptConsent(page);
  await page.screenshot({ path: path.join(output, "catalog-desktop.png"), fullPage: true });
  await page.goto("http://127.0.0.1:4173/glossary", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.goto("http://127.0.0.1:4173/learn/react/react-components/react-01-component", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const video = page.video();
  await desktop.close();
  await video.saveAs(path.join(output, "pulsateach-demo.webm"));

  const mobile = await browser.newContext({ ...devices["Pixel 5"] });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto("http://127.0.0.1:4173/catalog", { waitUntil: "networkidle" });
  await acceptConsent(mobilePage);
  await mobilePage.screenshot({ path: path.join(output, "catalog-mobile.png"), fullPage: true });
  await mobile.close();
  console.log("Portfolio media captured in docs/media.");
} finally {
  await browser.close();
  await frontend.close();
  await new Promise((resolve) => api.close(resolve));
}

async function acceptConsent(page) {
  const button = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await button.isVisible()) await button.click();
}
