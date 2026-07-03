const storage = createStorage();
const mockCatalogCourses = [
  { id: "html", title: "HTML interactif" },
  { id: "css", title: "CSS interactif" },
  { id: "javascript", title: "JavaScript interactif" },
  { id: "git", title: "Git et GitHub" },
  { id: "accessibility", title: "Accessibilité web" },
  { id: "testing", title: "Testing frontend" },
  { id: "typescript", title: "TypeScript professionnel" },
  { id: "react", title: "React pour applications métier" },
  { id: "node-api", title: "Node.js et API sécurisées" },
  { id: "sql-postgresql", title: "SQL et PostgreSQL" },
  { id: "web-security", title: "Sécurité web appliquée" },
  { id: "web-performance", title: "Performance web mesurable" },
  { id: "devops-deployment", title: "Déploiement et DevOps web" }
];

self.onmessage = async (event) => {
  const payload = event.data || {};

  try {
    if (payload.type === "expression") {
      self.postMessage({ ok: true, value: runExpression(payload.code, payload.expression) });
      return;
    }

    if (payload.type === "console") {
      const logs = await runConsole(payload.code);
      self.postMessage({ ok: true, logs });
      return;
    }

    if (payload.type === "aim") {
      self.postMessage({ ok: true, value: runAim(payload.code, payload.target) });
      return;
    }

    self.postMessage({ ok: false, error: "Unknown sandbox task." });
  } catch (error) {
    self.postMessage({ ok: false, error: error?.message || "Sandbox execution failed." });
  }
};

function runExpression(code, expression) {
  storage.clear();
  const silentConsole = { log() {}, info() {}, warn() {}, error() {} };
  return Boolean(new Function("console", "localStorage", `"use strict";\n${code}\n${expression}`)(silentConsole, storage));
}

async function runConsole(code) {
  storage.clear();
  const logs = [];
  const push = (level, items) => logs.push(`${level}${items.map(stringifyConsoleValue).join(" ")}`);
  const fakeConsole = {
    log: (...items) => push("", items),
    info: (...items) => push("[info] ", items),
    warn: (...items) => push("[attention] ", items),
    error: (...items) => push("[erreur] ", items)
  };
  const fakeFetch = async (url) => {
    const normalizedUrl = String(url || "");
    if (!["/api/catalog", "/api/courses", "mock:catalog"].includes(normalizedUrl)) {
      throw new Error("Network access is disabled inside PulsaTeach exercises.");
    }
    return {
      ok: true,
      status: 200,
      async json() {
        return { url: normalizedUrl, courses: mockCatalogCourses, tracks: mockCatalogCourses };
      }
    };
  };

  const execute = new Function("console", "localStorage", "fetch", `"use strict";\nreturn (async () => {\n${code}\n})();`);
  await execute(fakeConsole, storage, fakeFetch);
  return logs;
}

function runAim(code, target) {
  const aim = new Function(`${code}; return aim;`)();
  if (typeof aim !== "function") throw new Error("aim must be a function");
  return String(aim(target)).trim().toLowerCase();
}

function createStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(String(key)) ? values.get(String(key)) : null;
    },
    setItem(key, value) {
      values.set(String(key), String(value));
    },
    removeItem(key) {
      values.delete(String(key));
    },
    clear() {
      values.clear();
    }
  };
}

function stringifyConsoleValue(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
