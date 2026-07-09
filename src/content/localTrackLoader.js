import { publicTrackCatalog } from "./publicTrackCatalog.js";
import { cssFoundationModuleIds, cssResponsiveModuleIds, getCssNextDeferredGroup, orderCssModules, resolveCssGroup } from "./cssTrackMetadata.js";
import { htmlAdvancedModuleIds, htmlFoundationModuleIds, htmlHardeningModuleIds, htmlTrackMetadata, htmlWorkshopModuleIds } from "./htmlTrackMetadata.js";

const trackLoaders = {
  tools: () => import("./toolsTrack.js").then((module) => module.toolsTrack),
  html: () => loadFullHtmlTrack(),
  css: () => loadFullCssTrack(),
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

const htmlModuleLoaders = {
  foundation: () => import("./htmlModulesFoundation.js").then((module) => ({ ...htmlTrackMetadata, modules: module.htmlFoundationModules, loadedGroups: ["foundation"], isPartialTrack: true })),
  advanced: () => import("./htmlModulesAdvanced.js").then((module) => ({ ...htmlTrackMetadata, modules: module.htmlAdvancedModules, loadedGroups: ["advanced"], isPartialTrack: true })),
  workshop: () => import("./htmlModulesWorkshop.js").then((module) => ({ ...htmlTrackMetadata, modules: module.htmlWorkshopModules, loadedGroups: ["workshop"], isPartialTrack: true })),
  hardening: () => import("./htmlModulesHardening.js").then((module) => ({ ...htmlTrackMetadata, modules: module.htmlProductionHardeningModules, loadedGroups: ["hardening"], isPartialTrack: true }))
};

const cssModuleLoaders = {
  "css-selectors-colors": () => import("./cssTrackSelectorsColorsChunk.js").then((module) => module.cssTrackSelectorsColorsChunk),
  "css-box-type": () => import("./cssTrackBoxTypeChunk.js").then((module) => module.cssTrackBoxTypeChunk),
  "css-flex-layout": () => import("./cssTrackFlexLayoutChunk.js").then((module) => module.cssTrackFlexLayoutChunk),
  "css-grid-layout": () => import("./cssTrackGridLayoutChunk.js").then((module) => module.cssTrackGridLayoutChunk),
  "css-selectors": () => import("./cssTrackLegacyFoundationChunk.js").then((module) => module.cssTrackLegacyFoundationChunk),
  "css-box-model": () => import("./cssTrackLegacyFoundationChunk.js").then((module) => module.cssTrackLegacyFoundationChunk),
  "css-flexbox": () => import("./cssTrackLegacyFoundationChunk.js").then((module) => module.cssTrackLegacyFoundationChunk),
  "css-grid": () => import("./cssTrackLegacyFoundationChunk.js").then((module) => module.cssTrackLegacyFoundationChunk),
  "css-responsive": () => import("./cssTrackResponsiveChunk.js").then((module) => module.cssTrackResponsiveChunk),
  "css-a11y-states": () => import("./cssTrackResponsiveChunk.js").then((module) => module.cssTrackResponsiveChunk),
  "css-motion": () => import("./cssTrackResponsiveChunk.js").then((module) => module.cssTrackResponsiveChunk),
  "css-capstone": () => import("./cssTrackResponsiveChunk.js").then((module) => module.cssTrackResponsiveChunk),
  "css-responsive-motion": () => import("./cssTrackResponsiveChunk.js").then((module) => module.cssTrackResponsiveChunk),
  "css-advanced-responsive": () => import("./cssTrackResponsiveChunk.js").then((module) => module.cssTrackResponsiveChunk)
};

export async function loadLocalTrack(trackId, options = {}) {
  if (trackId === "html" && options.moduleId) {
    return loadHtmlTrack(options);
  }
  if (trackId === "css" && options.moduleId) {
    return loadCssTrack(options);
  }
  const load = trackLoaders[trackId];
  if (!load) throw new Error(`Unknown track ${trackId}`);
  return load();
}

async function loadHtmlTrack(options = {}) {
  if (!options.moduleId) return loadFullHtmlTrack();
  if (htmlFoundationModuleIds.includes(options.moduleId)) return htmlModuleLoaders.foundation();
  if (htmlAdvancedModuleIds.includes(options.moduleId)) return htmlModuleLoaders.advanced();
  if (htmlWorkshopModuleIds.includes(options.moduleId)) return htmlModuleLoaders.workshop();
  if (htmlHardeningModuleIds.includes(options.moduleId)) return htmlModuleLoaders.hardening();
  return htmlModuleLoaders.foundation();
}

async function loadFullHtmlTrack() {
  const tracks = await Promise.all([
    htmlModuleLoaders.foundation(),
    htmlModuleLoaders.advanced(),
    htmlModuleLoaders.workshop(),
    htmlModuleLoaders.hardening()
  ]);
  return tracks.reduce((merged, track) => mergeLoadedTrack(merged, track), null);
}

export async function loadAllLocalTracks() {
  return Promise.all(publicTrackCatalog.map((track) => loadLocalTrack(track.id)));
}

async function loadCssTrack(options = {}) {
  if (!options.moduleId) return loadFullCssTrack();
  const load = cssModuleLoaders[options.moduleId];
  if (load) return load();
  return resolveCssGroup(options.moduleId) === "responsive"
    ? cssModuleLoaders["css-responsive"]()
    : cssModuleLoaders["css-selectors-colors"]();
}

async function loadFullCssTrack() {
  const tracks = await Promise.all([
    cssModuleLoaders["css-selectors-colors"](),
    cssModuleLoaders["css-box-type"](),
    cssModuleLoaders["css-flex-layout"](),
    cssModuleLoaders["css-grid-layout"](),
    cssModuleLoaders["css-selectors"](),
    cssModuleLoaders["css-responsive"]()
  ]);
  return tracks.reduce((merged, track) => mergeLoadedTrack(merged, track), null);
}

export function mergeLoadedTrack(existing, incoming) {
  if (!existing || existing.id !== incoming.id) return incoming;
  if (incoming.id !== "css" && incoming.id !== "html") return incoming;
  const mergedGroups = [...new Set([...(existing.loadedGroups || []), ...(incoming.loadedGroups || [])])];
  const modules = [...(existing.modules || []), ...(incoming.modules || [])].filter((module, index, items) => items.findIndex((candidate) => candidate.id === module.id) === index);
  const mergedModules = incoming.id === "css" ? orderCssModules(modules) : modules;
  return {
    ...incoming,
    modules: mergedModules,
    loadedGroups: mergedGroups,
    isPartialTrack: incoming.id === "css" ? mergedGroups.length < 2 : mergedGroups.length < 4
  };
}

export function hasDeferredTrackGroup(track, moduleId) {
  return track?.id === "css" && Boolean(getCssNextDeferredGroup(moduleId, track.loadedGroups || []));
}

export function getDeferredTrackGroupModuleId(track, moduleId) {
  if (track?.id !== "css") return null;
  const nextGroup = getCssNextDeferredGroup(moduleId, track.loadedGroups || []);
  if (nextGroup === "responsive") return cssResponsiveModuleIds[0];
  if (nextGroup === "foundation") return cssFoundationModuleIds[0];
  return null;
}
