export const PREVIEW_IFRAME_SANDBOX = "allow-scripts";

export const PREVIEW_CSP = [
  "default-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "object-src 'none'",
  "connect-src 'none'",
  "script-src 'unsafe-inline'",
  "style-src 'unsafe-inline'",
  "img-src data: blob:",
  "font-src 'none'",
  "media-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'"
].join("; ");

export function createPreviewCspMeta() {
  return `<meta http-equiv="Content-Security-Policy" content="${escapeHtmlAttribute(PREVIEW_CSP)}">`;
}

export function createPreviewErrorBridge(parentOrigin) {
  const targetOrigin = JSON.stringify(parentOrigin || "*");
  return `<script>
    (function () {
      const targetOrigin = ${targetOrigin};
      function notify(type, payload) {
        parent.postMessage(Object.assign({ type: type }, payload || {}), targetOrigin);
      }
      window.addEventListener("error", function (event) {
        notify("pulsateach-preview-error", { message: String(event.message || "Runtime error") });
      });
      window.addEventListener("unhandledrejection", function (event) {
        const reason = event.reason;
        notify("pulsateach-preview-error", { message: String(reason && reason.message ? reason.message : reason || "Unhandled rejection") });
      });
      notify("pulsateach-preview-ready");
    })();
  </script>`;
}

export function isAllowedPreviewMessage(event, iframeWindow) {
  if (!iframeWindow || event.source !== iframeWindow) return false;
  const type = event.data?.type;
  return type === "pulsateach-preview-error" || type === "pulsateach-preview-ready";
}

export function normalizePreviewErrorMessage(value) {
  const message = String(value || "Runtime error.").replace(/\s+/g, " ").trim();
  return message.slice(0, 240);
}

function escapeHtmlAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
