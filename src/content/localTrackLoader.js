import { publicTrackCatalog } from "./publicTrackCatalog.js";

const trackLoaders = {
  html: () => import("./htmlTrack.js").then((module) => module.htmlTrack),
  css: () => import("./cssTrack.js").then((module) => module.cssTrack),
  javascript: () => import("./javascriptTrack.js").then((module) => module.javascriptTrack),
  git: () => import("./tracks/git.js").then((module) => module.gitTrack),
  accessibility: () => import("./tracks/accessibility.js").then((module) => module.accessibilityTrack),
  testing: () => import("./tracks/testing.js").then((module) => module.testingTrack),
  typescript: () => import("./tracks/typescript.js").then((module) => module.typescriptTrack),
  react: () => import("./tracks/react.js").then((module) => module.reactTrack),
  "node-api": () => import("./tracks/node-api.js").then((module) => module.nodeApiTrack),
  "sql-postgresql": () => import("./tracks/sql-postgresql.js").then((module) => module.sqlPostgresqlTrack),
  "web-security": () => import("./tracks/web-security.js").then((module) => module.webSecurityTrack),
  "web-performance": () => import("./tracks/web-performance.js").then((module) => module.webPerformanceTrack),
  "devops-deployment": () => import("./tracks/devops-deployment.js").then((module) => module.devopsDeploymentTrack)
};

export async function loadLocalTrack(trackId) {
  const load = trackLoaders[trackId];
  if (!load) throw new Error(`Unknown track ${trackId}`);
  return load();
}

export async function loadAllLocalTracks() {
  return Promise.all(publicTrackCatalog.map((track) => loadLocalTrack(track.id)));
}
