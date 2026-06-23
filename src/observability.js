const telemetryUrl = "/api/telemetry";
const sentErrors = new Set();

export function startObservability() {
  if (import.meta.env.DEV || typeof window === "undefined") return;
  observeWebVitals();
  window.addEventListener("error", (event) => {
    reportClientError(event.error?.name || "Error", `${event.message || ""}:${event.filename || ""}:${event.lineno || 0}`);
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    reportClientError(reason?.name || "UnhandledRejection", String(reason?.message || reason || "unknown"));
  });
}

function observeWebVitals() {
  observe("largest-contentful-paint", (entries) => {
    const entry = entries.at(-1);
    if (entry) reportVital("LCP", entry.startTime, rate(entry.startTime, 2500, 4000));
  });
  observe("layout-shift", (entries) => {
    const value = entries.filter((entry) => !entry.hadRecentInput).reduce((sum, entry) => sum + entry.value, 0);
    if (value > 0) reportVital("CLS", value, rate(value, 0.1, 0.25));
  });
  observe("event", (entries) => {
    const latency = Math.max(0, ...entries.map((entry) => entry.duration || 0));
    if (latency > 0) reportVital("INP", latency, rate(latency, 200, 500));
  }, { durationThreshold: 40 });
}

function observe(type, callback, options = {}) {
  try {
    const observer = new PerformanceObserver((list) => callback(list.getEntries()));
    observer.observe({ type, buffered: true, ...options });
  } catch {
    // The browser does not expose this performance entry type.
  }
}

function reportVital(name, value, rating) {
  sendTelemetry({
    type: "web_vital",
    name,
    value: Math.round(value * (name === "CLS" ? 1000 : 1)) / (name === "CLS" ? 1000 : 1),
    rating,
    route: cleanRoute(),
    navigationType: performance.getEntriesByType("navigation")[0]?.type || "unknown"
  });
}

async function reportClientError(name, source) {
  const fingerprint = await sha256(`${name}:${source}`);
  if (sentErrors.has(fingerprint)) return;
  sentErrors.add(fingerprint);
  sendTelemetry({ type: "client_error", name: String(name).slice(0, 40), fingerprint, route: cleanRoute() });
}

function sendTelemetry(payload) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(telemetryUrl, new Blob([body], { type: "application/json" }));
    return;
  }
  fetch(telemetryUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
}

function cleanRoute() {
  return window.location.pathname.replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 300) || "/";
}

function rate(value, good, poor) {
  return value <= good ? "good" : value <= poor ? "needs-improvement" : "poor";
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 32);
}
