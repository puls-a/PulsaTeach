import { createServer as createViteServer } from "vite";

export default async function globalSetup() {
  Object.assign(process.env, {
    NODE_ENV: "test",
    VITE_AUTH_MODE: "local",
    PULSATEACH_STORAGE: "json",
    PULSATEACH_ALLOW_LOCAL_IDENTITY: "true",
    PULSATEACH_LOG_LEVEL: "silent",
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
