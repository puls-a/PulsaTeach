export function navigate(path, { replace = false } = {}) {
  const target = normalizePath(path);
  window.history[replace ? "replaceState" : "pushState"](null, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function currentPathSegments() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return path ? path.split("/") : [];
}

export function migrateLegacyHashRoute() {
  const legacy = window.location.hash.match(/^#(\/.*)$/);
  if (!legacy) return false;
  window.history.replaceState(null, "", `${legacy[1]}${window.location.search}`);
  return true;
}

function normalizePath(path) {
  const value = String(path || "/");
  return value.startsWith("/") ? value : `/${value}`;
}
