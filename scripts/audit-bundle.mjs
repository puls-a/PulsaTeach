import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const KB = 1024;
const MB = 1024 * KB;
const distDir = path.join(process.cwd(), "dist");
const assetsDir = path.join(distDir, "assets");
const manifestPath = path.join(distDir, ".vite", "manifest.json");
const files = await listFiles(assetsDir);
const failures = [];
const warnings = [];
const perFileBudgets = {
  ".js": 250 * KB,
  ".css": 64 * KB
};
const dataChunkBudgets = {
  "content-html-": { raw: 350 * KB, gzip: 110 * KB }
};
const aggregateBudgets = {
  rawJs: budgetFromEnv("BUNDLE_BUDGET_RAW_JS_MB", 2.25 * MB),
  rawCss: budgetFromEnv("BUNDLE_BUDGET_RAW_CSS_KB", 70 * KB),
  gzipJs: budgetFromEnv("BUNDLE_BUDGET_GZIP_JS_KB", 700 * KB),
  initialGzip: budgetFromEnv("BUNDLE_BUDGET_INITIAL_GZIP_KB", 220 * KB),
  routeGzip: budgetFromEnv("BUNDLE_BUDGET_ROUTE_GZIP_KB", 350 * KB)
};
const metrics = new Map();

for (const absolutePath of files) {
  const extension = path.extname(absolutePath);
  const { size } = await stat(absolutePath);
  const bytes = await readFile(absolutePath);
  const relativePath = path.relative(distDir, absolutePath).split(path.sep).join("/");
  const metric = {
    path: relativePath,
    extension,
    raw: size,
    gzip: gzipSync(bytes, { level: 9 }).byteLength,
    brotli: brotliCompressSync(bytes).byteLength
  };
  metrics.set(relativePath, metric);

  const dataBudget = Object.entries(dataChunkBudgets).find(([prefix]) => path.basename(relativePath).startsWith(prefix))?.[1];
  const perFileBudget = dataBudget?.raw || perFileBudgets[extension];
  if (perFileBudget && size > perFileBudget) {
    failures.push(`${relativePath}: ${formatBytes(size)} raw exceeds ${formatBytes(perFileBudget)}`);
  }
  if (dataBudget?.gzip && metric.gzip > dataBudget.gzip) {
    failures.push(`${relativePath}: ${formatBytes(metric.gzip)} gzip exceeds ${formatBytes(dataBudget.gzip)}`);
  }
}

const jsMetrics = [...metrics.values()].filter((metric) => metric.extension === ".js");
const cssMetrics = [...metrics.values()].filter((metric) => metric.extension === ".css");
const rawJs = sum(jsMetrics, "raw");
const rawCss = sum(cssMetrics, "raw");
const gzipJs = sum(jsMetrics, "gzip");

checkBudget("Total JavaScript", rawJs, aggregateBudgets.rawJs);
checkBudget("Total CSS", rawCss, aggregateBudgets.rawCss);
checkBudget("Total gzip JavaScript", gzipJs, aggregateBudgets.gzipJs);

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const entryKeys = Object.entries(manifest)
  .filter(([, entry]) => entry.isEntry)
  .map(([key]) => key);
const initialAssets = collectAssets(entryKeys, manifest);
const initialGzip = sumAssets(initialAssets, metrics, "gzip");
checkBudget("Initial entry gzip", initialGzip, aggregateBudgets.initialGzip);

const dynamicKeys = new Set(
  Object.values(manifest).flatMap((entry) => entry.dynamicImports || [])
);
let largestRoute = { key: null, gzip: initialGzip };
for (const key of dynamicKeys) {
  const routeAssets = new Set([...initialAssets, ...collectAssets([key], manifest)]);
  const gzip = sumAssets(routeAssets, metrics, "gzip");
  if (gzip > largestRoute.gzip) largestRoute = { key, gzip };
}
checkBudget(
  `Largest initial + dynamic route gzip${largestRoute.key ? ` (${largestRoute.key})` : ""}`,
  largestRoute.gzip,
  aggregateBudgets.routeGzip
);

if (failures.length) {
  console.error(`Bundle budget failed:\n${failures.join("\n")}`);
  printReport();
  process.exit(1);
}

printReport();
if (warnings.length) console.warn(`Bundle budget warning:\n${warnings.join("\n")}`);

function collectAssets(keys, manifest) {
  const assets = new Set();
  const visited = new Set();

  function visit(key) {
    if (!key || visited.has(key)) return;
    visited.add(key);
    const entry = manifest[key];
    if (!entry) return;
    if (entry.file) assets.add(entry.file);
    for (const css of entry.css || []) assets.add(css);
    for (const imported of entry.imports || []) visit(imported);
  }

  for (const key of keys) visit(key);
  return assets;
}

function sumAssets(assetPaths, metrics, field) {
  return [...assetPaths].reduce((total, assetPath) => total + (metrics.get(assetPath)?.[field] || 0), 0);
}

function sum(items, field) {
  return items.reduce((total, item) => total + item[field], 0);
}

function checkBudget(label, actual, budget) {
  if (actual > budget) {
    failures.push(`${label}: ${formatBytes(actual)} exceeds ${formatBytes(budget)}`);
    return;
  }
  const remainingRatio = (budget - actual) / budget;
  if (remainingRatio < 0.1) warnings.push(`${label}: only ${formatBytes(budget - actual)} remains`);
}

function budgetFromEnv(name, fallback) {
  const value = Number(process.env[name]);
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return name.endsWith("_MB") ? value * MB : value * KB;
}

function formatBytes(bytes) {
  return bytes >= MB ? `${(bytes / MB).toFixed(2)} MB` : `${(bytes / KB).toFixed(1)} kB`;
}

function printReport() {
  const brotliJs = sum(jsMetrics, "brotli");
  console.log([
    `Bundle metrics for ${metrics.size} JS/CSS assets.`,
    `JavaScript: ${formatBytes(rawJs)} raw, ${formatBytes(gzipJs)} gzip, ${formatBytes(brotliJs)} brotli.`,
    `CSS: ${formatBytes(rawCss)} raw.`,
    `Initial entry: ${formatBytes(initialGzip)} gzip.`,
    `Largest initial + dynamic route: ${formatBytes(largestRoute.gzip)} gzip${largestRoute.key ? ` (${largestRoute.key})` : ""}.`
  ].join("\n"));
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolutePath) : [absolutePath];
  }));
  return nested.flat();
}
