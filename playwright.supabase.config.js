import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "supabase-flow.spec.js",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report-supabase" }]],
  use: {
    baseURL: "http://127.0.0.1:5190",
    trace: "off",
    screenshot: "only-on-failure"
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev:e2e:supabase",
    url: "http://127.0.0.1:5190",
    reuseExistingServer: false,
    timeout: 120_000
  }
});
