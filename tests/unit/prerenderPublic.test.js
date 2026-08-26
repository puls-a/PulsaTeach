import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";

const prerenderPath = new URL("../../scripts/prerender-public.mjs", import.meta.url);

describe("public prerender", () => {
  test("links the home HTML CTA to the published first lesson", async () => {
    const source = await readFile(prerenderPath, "utf8");

    expect(source).toContain('href="/learn/html/html-getting-started/html-00-what-html-does"');
    expect(source).not.toContain('href="/learn/html/html-foundations/html-01-document-skeleton"');
  });
});
