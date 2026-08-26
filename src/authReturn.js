export function getSafeAuthReturn(search = window.location.search) {
  const value = new URLSearchParams(search).get("returnTo");
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "";
  try { const url = new URL(value, window.location.origin); return url.origin === window.location.origin ? `${url.pathname}${url.search}${url.hash}` : ""; } catch { return ""; }
}

export function pathWithAuthReturn(path, returnTo) { return returnTo ? `${path}${path.includes("?") ? "&" : "?"}returnTo=${encodeURIComponent(returnTo)}` : path; }
