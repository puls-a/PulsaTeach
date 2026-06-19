import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

Object.assign(process.env, {
  NODE_ENV: "test",
  VITE_AUTH_MODE: "local",
  PULSATEACH_STORAGE: "json",
  PULSATEACH_ALLOW_LOCAL_IDENTITY: "true",
  VITE_API_URL: "http://127.0.0.1:4188",
  PORT: "4188"
});

const { default: app } = await import("../server/index.js");
const apiServer = app.listen(4188, "127.0.0.1", () => {
  console.log("PulsaTeach E2E API ready on http://127.0.0.1:4188");
});
const viteServer = await createViteServer({
  root,
  server: {
    host: "127.0.0.1",
    port: 5188,
    strictPort: true
  }
});
await viteServer.listen();
viteServer.printUrls();

let stopping = false;

function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  void viteServer.close();
  apiServer.close();
  apiServer.closeAllConnections?.();
  setTimeout(() => process.exit(exitCode), 250);
}

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
process.on("SIGHUP", () => stop(0));
process.on("uncaughtException", (error) => {
  console.error(error);
  stop(1);
});
process.on("unhandledRejection", (error) => {
  console.error(error);
  stop(1);
});
