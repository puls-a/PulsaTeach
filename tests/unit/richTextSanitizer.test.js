// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { sanitizeRichText } from "../../src/features/learn/richTextSanitizer.js";

describe("sanitizeRichText", () => {
  test("keeps safe lesson links and hardens target blank", () => {
    const html = sanitizeRichText("Open <a href='https://cursor.sh' target='_blank' onclick='x()'>cursor.sh</a>");
    expect(html).toContain('href="https://cursor.sh"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).not.toContain("onclick");
  });

  test("drops unsafe markup and external images", () => {
    const html = sanitizeRichText("<script>alert(1)</script><img src='https://example.com/a.svg' alt='Bad'><img src='/assets/tool-vscode.svg' alt='VS Code Logo'>");
    expect(html).not.toContain("script");
    expect(html).not.toContain("https://example.com");
    expect(html).toContain('src="/assets/tool-vscode.svg"');
    expect(html).toContain('loading="lazy"');
  });
});
