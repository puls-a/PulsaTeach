import { spawn } from "node:child_process";

const processes = [];
const apiUrl = process.env.API_URL || "http://127.0.0.1:4174";
const frontendUrl = process.env.FRONTEND_URL || "http://127.0.0.1:5173";
const adminKey = process.env.PULSATEACH_ADMIN_KEY || process.env.API_ADMIN_KEY || "dev-admin-key";

process.env.API_URL = apiUrl;
process.env.FRONTEND_URL = frontendUrl;
process.env.API_ADMIN_KEY = adminKey;
process.env.PULSATEACH_ADMIN_KEY = adminKey;

try {
  processes.push(start("api", "node", ["server/index.js"], {
    PORT: "4174",
    PULSATEACH_STORAGE: "json",
    PULSATEACH_ALLOW_LOCAL_IDENTITY: "true",
    PULSATEACH_ADMIN_KEY: adminKey
  }));
  processes.push(start("frontend", process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", "5173"]));

  await waitFor(`${apiUrl}/api/health`, "API");
  await waitFor(`${frontendUrl}/`, "frontend preview");
  await run("node", ["scripts/smoke.mjs"]);
} finally {
  await Promise.all(processes.map(stop));
}

function start(name, command, args, env = {}) {
  const child = spawn(command, args, {
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[${name}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[${name}] ${chunk}`));

  child.on("exit", (code) => {
    if (code !== null && code !== 0) {
      process.stderr.write(`[${name}] exited with code ${code}\n`);
    }
  });
  child.on("error", (error) => {
    process.stderr.write(`[${name}] failed to start: ${error.message}\n`);
  });

  return child;
}

async function waitFor(url, label) {
  const deadline = Date.now() + 30000;
  let lastError = "";

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.message;
    }
    await delay(500);
  }

  throw new Error(`Timed out waiting for ${label}: ${lastError}`);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: process.env,
      stdio: "inherit",
      windowsHide: true
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

function stop(child) {
  return new Promise((resolve) => {
    if (!child || child.killed || child.exitCode !== null) {
      resolve();
      return;
    }
    child.once("exit", resolve);
    child.kill();
    setTimeout(resolve, 1500);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
