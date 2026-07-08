import { createServer as createViteServer } from "vite";

export default async function globalSetup() {
  Object.assign(process.env, {
    NODE_ENV: "test",
    VITE_AUTH_MODE: "local",
    PULSATEACH_STORAGE: "json",
    PULSATEACH_ALLOW_LOCAL_IDENTITY: "true",
    PULSATEACH_ADMIN_KEY: "dev-admin-key",
    PULSATEACH_LOG_LEVEL: "silent",
    VITE_ADMIN_ACCESS_KEY: "dev-admin-key",
    VITE_API_URL: "http://127.0.0.1:4188",
    PORT: "4188"
  });

  const { default: app } = await import("../../server/index.js");
  const apiServer = await listen(app, 4188);
  const viteServer = await createViteServer({
    server: {
      host: "127.0.0.1",
      port: 5188,
      strictPort: true
    }
  });
  await viteServer.listen();
  await warmupRoutes(["/", "/about", "/catalog", "/glossary", "/learn/html/html-final-audit/html-09-final-exam"]);

  return async () => {
    await viteServer.close();
    apiServer.closeAllConnections?.();
    await new Promise((resolve) => apiServer.close(resolve));
  };
}

function listen(app, port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, "127.0.0.1", () => resolve(server));
    server.once("error", reject);
  });
}

async function warmupRoutes(routes) {
  await Promise.all(routes.map(async (route) => {
    const response = await fetch(`http://127.0.0.1:5188${route}`);
    if (!response.ok) throw new Error(`Unable to warm up ${route}: ${response.status}`);
    await response.text();
  }));
}
