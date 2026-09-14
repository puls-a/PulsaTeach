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

export function createComputedStyleBridge(parentOrigin) {
  const targetOrigin = JSON.stringify(parentOrigin || "*");
  return `<script>
    (function () {
      const targetOrigin = ${targetOrigin};
      window.addEventListener("message", function (event) {
        const data = event.data;
        if (data?.type !== "pulsateach-computed-style-request" || !Array.isArray(data.checks)) return;
        const results = data.checks.slice(0, 20).map(function (check) {
          const element = document.querySelector(check.selector);
          return { selector: check.selector, property: check.property, value: element ? getComputedStyle(element).getPropertyValue(check.property).trim() : null };
        });
        parent.postMessage({ type: "pulsateach-computed-style-result", requestId: data.requestId, results: results }, targetOrigin);
      });
    })();
  </script>`;
}

// srcdoc inherits the embedding page's base URL. Resolve local fragments inside
// the preview instead of accidentally navigating the frame to the application.
export function createPreviewNavigationBridge() {
  return `<script>
    document.addEventListener("click", function (event) {
      const link = event.target.closest && event.target.closest("a[href]");
      const href = link && link.getAttribute("href");
      if (!href || !href.startsWith("#") || event.defaultPrevented) return;
      event.preventDefault();
      let id;
      try { id = decodeURIComponent(href.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      if (!target.hasAttribute("tabindex") && !target.matches("a[href], button, input, select, textarea")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", function () { target.removeAttribute("tabindex"); }, { once: true });
      }
      target.focus({ preventScroll: true });
      target.scrollIntoView();
    });
  </script>`;
}

export function createPreviewFormBridge(locale) {
  const message = JSON.stringify(locale === "fr"
    ? "Simulation locale : formulaire valide. Aucune donnée envoyée. Champs : "
    : "Local simulation: valid form. No data sent. Fields: ");
  return `<script>
    (function () {
      const statuses = new WeakMap();
      function simulate(form, submitter) {
        if (!form || (!form.noValidate && !submitter?.formNoValidate && !form.reportValidity())) return;
        let status = statuses.get(form);
        if (!status) {
          status = document.createElement("p");
          status.setAttribute("role", "status");
          form.appendChild(status);
          statuses.set(form, status);
        }
        const fields = Array.from(new FormData(form, submitter || undefined).keys());
        status.textContent = ${message} + fields.join(", ");
      }
      document.addEventListener("click", function (event) {
        const control = event.target.closest && event.target.closest("button, input");
        if (!control?.form || !["submit", "image"].includes(control.type) || event.defaultPrevented) return;
        event.preventDefault();
        simulate(control.form, control);
      });
      document.addEventListener("keydown", function (event) {
        const control = event.target;
        if (event.key !== "Enter" || !control.matches("input") || !control.form || event.defaultPrevented) return;
        if (!["text", "email", "password", "search", "tel", "url", "number"].includes(control.type)) return;
        event.preventDefault();
        const submitter = Array.from(control.form.elements).find(function (element) { return element.type === "submit" && !element.disabled; });
        simulate(control.form, submitter);
      });
    })();
  </script>`;
}

export function isAllowedPreviewMessage(event, iframeWindow) {
  if (!iframeWindow || event.source !== iframeWindow) return false;
  const type = event.data?.type;
  return type === "pulsateach-preview-error" || type === "pulsateach-preview-ready" || type === "pulsateach-computed-style-result";
}

export function normalizePreviewErrorMessage(value) {
  const message = String(value || "Runtime error.").replace(/\s+/g, " ").trim();
  return message.slice(0, 240);
}

function escapeHtmlAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
