import { describe, expect, test } from "vitest";
import { validateRuntimeConfig } from "../../server/runtimeConfig.js";

describe("validateRuntimeConfig", () => {
  test("does not require CRON_SECRET in production", () => {
    expect(() => validateRuntimeConfig({
      NODE_ENV: "production",
      PULSATEACH_STORAGE: "supabase-strict",
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-role",
      PULSATEACH_ALLOWED_ORIGINS: "https://pulsateach.vercel.app",
      PULSATEACH_EXAM_SECRET: "exam-secret"
    })).not.toThrow();
  });

  test("still requires core production variables", () => {
    expect(() => validateRuntimeConfig({
      NODE_ENV: "production",
      PULSATEACH_STORAGE: "supabase-strict",
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-role",
      PULSATEACH_ALLOWED_ORIGINS: "https://pulsateach.vercel.app"
    })).toThrow(/PULSATEACH_EXAM_SECRET/);
  });
});
