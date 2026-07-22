import { createServer as createViteServer } from "vite";
import { chromium } from "@playwright/test";

export default async function globalSetup() {
  const apiPort = Number(process.env.E2E_API_PORT || 4188);
  const webPort = Number(process.env.E2E_WEB_PORT || 5188);
  Object.assign(process.env, {
    NODE_ENV: "test",
    VITE_AUTH_MODE: "local",
    PULSATEACH_STORAGE: "json",
    PULSATEACH_ALLOW_LOCAL_IDENTITY: "true",
    PULSATEACH_ADMIN_KEY: "dev-admin-key",
    PULSATEACH_LOG_LEVEL: "silent",
    VITE_ADMIN_ACCESS_KEY: "dev-admin-key",
    VITE_API_URL: `http://127.0.0.1:${apiPort}`,
    PORT: String(apiPort)
  });

  const { default: app } = await import("../../server/index.js");
  const apiServer = await listen(app, apiPort, "E2E_API_PORT");
  let viteServer;
  try {
    viteServer = await startVite(webPort);
    await warmupModules(viteServer, [
      "/src/main.jsx",
      "/src/CurriculumHub.jsx",
      "/src/features/learn/LearnPage.jsx",
      "/src/features/learn/LessonWorkspace.jsx",
      "/src/features/learn/CodeMirrorEditor.jsx"
    ]);
    await warmupRoutes(["/", "/about", "/catalog", "/glossary", "/learn/html/html-final-audit/html-09-final-exam"]);
    await warmupBrowser(webPort);
  } catch (error) {
    await closeApiServer(apiServer);
    throw error;
  }

  return async () => {
    await viteServer?.close();
    await closeApiServer(apiServer);
  };
}

async function warmupModules(server, modules) {
  if (!server) return;
  for (const module of modules) await server.warmupRequest(module);
}

function listen(app, port, environmentVariable) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, "127.0.0.1", () => resolve(server));
    server.once("error", (error) => {
      if (isPortInUse(error)) reject(new Error(`Port ${port} is already in use. Set ${environmentVariable} to a free port.`));
      else reject(error);
    });
  });
}

async function startVite(port) {
  const viteServer = await createViteServer({
    define: {
      "import.meta.env.VITE_ADMIN_ACCESS_KEY": JSON.stringify(process.env.VITE_ADMIN_ACCESS_KEY),
      "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
      "import.meta.env.VITE_AUTH_MODE": JSON.stringify(process.env.VITE_AUTH_MODE)
    },
    server: { host: "127.0.0.1", port, strictPort: true }
  });
  try {
    await viteServer.listen();
    return viteServer;
  } catch (error) {
    await viteServer.close();
    if (isPortInUse(error)) throw new Error(`Port ${port} is already in use. Set E2E_WEB_PORT to a free port.`, { cause: error });
    throw error;
  }
}

async function closeApiServer(server) {
  server.closeAllConnections?.();
  await new Promise((resolve) => server.close(resolve));
}

function isPortInUse(error) {
  return error?.code === "EADDRINUSE" || String(error?.message || "").includes("is already in use");
}

async function warmupRoutes(routes) {
  await Promise.all(routes.map(async (route) => {
    const response = await fetch(`http://127.0.0.1:${process.env.E2E_WEB_PORT || 5188}${route}`);
    if (!response.ok) throw new Error(`Unable to warm up ${route}: ${response.status}`);
    await response.text();
  }));
}

async function warmupBrowser(port) {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send("Network.setCacheDisabled", { cacheDisabled: true });
    await retryWarmup(async () => {
      await page.goto(`http://127.0.0.1:${port}/catalog`);
      await page.getByRole("heading", { name: /Formations disponibles|Available courses/ }).waitFor({ timeout: 20_000 });
    });
    await retryWarmup(async () => {
      await page.goto(`http://127.0.0.1:${port}/learn/javascript/js-functions-scope/js-functions-scope-declare-function`);
      await page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ }).waitFor({ timeout: 20_000 });
    });
  } finally {
    await browser.close();
  }
}

async function retryWarmup(action) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await action();
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 750));
    }
  }
  throw lastError;
}
