import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/api/**/*.test.js", "tests/unit/**/*.test.js", "tests/components/**/*.test.{js,jsx}"],
    environment: "node",
    restoreMocks: true
  }
});

