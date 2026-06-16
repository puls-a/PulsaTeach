const defaultTimeoutMs = 3000;

export function runJavaScriptExpressionSandbox(code, expression, timeoutMs = defaultTimeoutMs) {
  return runSandboxTask({ type: "expression", code, expression }, timeoutMs);
}

export function runJavaScriptConsoleSandbox(code, timeoutMs = defaultTimeoutMs) {
  return runSandboxTask({ type: "console", code }, timeoutMs);
}

export function runAimFunctionSandbox(code, target, timeoutMs = defaultTimeoutMs) {
  return runSandboxTask({ type: "aim", code, target }, timeoutMs);
}

function runSandboxTask(payload, timeoutMs) {
  return new Promise((resolve) => {
    const worker = new Worker(new URL("./jsSandboxWorker.js", import.meta.url), { type: "module" });
    const timeout = window.setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, timedOut: true, error: "Execution timed out." });
    }, timeoutMs);

    worker.onmessage = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      resolve(event.data);
    };

    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      resolve({ ok: false, error: event.message || "Sandbox error." });
    };

    worker.postMessage(payload);
  });
}
