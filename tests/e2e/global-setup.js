import { createServer as createViteServer } from "vite";

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
  const apiServer = await listenIfAvailable(app, apiPort);
  const viteServer = await startViteIfAvailable(webPort);
  await warmupRoutes(["/", "/about", "/catalog", "/glossary", "/learn/html/html-final-audit/html-09-final-exam"]);

  return async () => {
    await viteServer?.close();
    if (apiServer) {
      apiServer.closeAllConnections?.();
      await new Promise((resolve) => apiServer.close(resolve));
    }
  };
}

function listenIfAvailable(app, port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, "127.0.0.1", () => resolve(server));
    server.once("error", (error) => {
      if (isPortInUse(error)) resolve(null);
      else reject(error);
    });
  });
}

async function startViteIfAvailable(port) {
  const viteServer = await createViteServer({ server: { host: "127.0.0.1", port, strictPort: true } });
  try {
    await viteServer.listen();
    return viteServer;
  } catch (error) {
    await viteServer.close();
    if (isPortInUse(error)) return null;
    throw error;
  }
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
