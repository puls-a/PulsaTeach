// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { createPreview } from "../../src/lessonRuntime.js";
import { PREVIEW_CSP, PREVIEW_IFRAME_SANDBOX, createPreviewCspMeta, isAllowedPreviewMessage, normalizePreviewErrorMessage } from "../../src/security/sandboxPolicy.js";

describe("preview sandbox policy", () => {
  test("keeps iframe capabilities intentionally narrow", () => {
    expect(PREVIEW_IFRAME_SANDBOX).toBe("allow-scripts");
    expect(PREVIEW_IFRAME_SANDBOX).not.toContain("allow-same-origin");
    expect(PREVIEW_IFRAME_SANDBOX).not.toContain("allow-forms");
    expect(PREVIEW_IFRAME_SANDBOX).not.toContain("allow-modals");
    expect(PREVIEW_IFRAME_SANDBOX).not.toContain("allow-popups");
  });

  test("injects a restrictive CSP into generated previews", () => {
    const meta = createPreviewCspMeta();
    expect(PREVIEW_CSP).toContain("default-src 'none'");
    expect(PREVIEW_CSP).toContain("connect-src 'none'");
    expect(PREVIEW_CSP).toContain("form-action 'none'");
    expect(PREVIEW_CSP).toContain("object-src 'none'");
    expect(meta).toContain("Content-Security-Policy");

    const htmlPreview = createPreview({ type: "html" }, "<main>Hello</main>");
    const cssPreview = createPreview({ type: "css", previewHtml: "<main></main>" }, "main { color: red; }");
    expect(htmlPreview).toContain("connect-src 'none'");
    expect(cssPreview).toContain("connect-src 'none'");
  });

  test("accepts preview messages only from the controlled iframe window", () => {
    const iframeWindow = {};
    expect(isAllowedPreviewMessage({ source: iframeWindow, data: { type: "pulsateach-preview-ready" } }, iframeWindow)).toBe(true);
    expect(isAllowedPreviewMessage({ source: {}, data: { type: "pulsateach-preview-ready" } }, iframeWindow)).toBe(false);
    expect(isAllowedPreviewMessage({ source: iframeWindow, data: { type: "unknown" } }, iframeWindow)).toBe(false);
  });

  test("caps error messages surfaced from user code", () => {
    const message = normalizePreviewErrorMessage("x".repeat(500));
    expect(message).toHaveLength(240);
  });
});
